import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

// Compile the real TypeScript modules in memory; API calls use a stub.
const cache = new Map()
let providerRequest
function load(relative) {
  const filename = path.resolve(relative)
  if (cache.has(filename)) return cache.get(filename)
  const exports = {}
  cache.set(filename, exports)
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  vm.runInNewContext(outputText, {
    exports,
    require: (specifier) => load(path.resolve(path.dirname(filename), `${specifier}.ts`)),
    URL, AbortSignal, console,
    process: { env: { GEMINI_API_KEY: 'test-placeholder' } },
    fetch: async (_url, options) => {
      providerRequest = JSON.parse(options.body)
      return { ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: 'Test reply' }] } }] }) }
    },
  }, { filename })
  return exports
}

const { answerQuestion, matchOffline } = load('src/lib/portfolioAssistant.ts')
assert.match(answerQuestion('Is ShareLanka completed?'), /ShareLanka: Completed/)
assert.match(answerQuestion('What was the contribution to ShareLanka?'), /frontend and backend/)
assert.match(answerQuestion('Was AromaCafe POS solo?'), /Solo project/)
assert.match(answerQuestion('Is SmartBee finished?'), /not specified/)
assert.match(answerQuestion('Is it completed?', [{ role: 'user', text: 'Tell me about ShareLanka' }]), /ShareLanka: Completed/)
assert.match(answerQuestion('Give me its code link', [{ role: 'user', text: 'Tell me about SmartBee' }]), /github.com\/MNSBaanu\/SmartBee/)
assert.match(answerQuestion('Which projects use .NET?'), /SmartMed/)
assert.match(answerQuestion('Which projects use .NET?'), /GadgetHub/)
assert.match(answerQuestion('Which projects are completed?'), /ShareLanka/)
assert.match(answerQuestion('Which projects are in development?'), /LocalGro/)
assert.match(answerQuestion('Compare SmartBee and ShareLanka'), /SmartBee[\s\S]*ShareLanka/)
assert.match(matchOffline('Experience with .NET required'), /2 projects/)
assert.match(matchOffline('Experience with COBOL required'), /doesn't name technologies/)

const { default: handler } = load('api/chat.ts')
let status
let body
await handler({ method: 'POST', headers: { origin: 'http://127.0.0.1:5173' }, body: { messages: [{ role: 'user', content: 'Is ShareLanka completed?' }] } }, {
  status: (code) => { status = code; return { json: (value) => { body = value } } },
})
assert.equal(status, 200)
assert.equal(body.reply, 'Test reply')
const prompt = providerRequest.system_instruction.parts[0].text
assert.match(prompt, /Status: Completed \| Collaboration: Team project/)
assert.match(prompt, /Contributed across frontend and backend development/)
assert.match(prompt, /Dates, academic labels and missing demo links do not establish completion/)
assert.doesNotMatch(prompt, /period ending in "Present" means/)
console.log('Assistant checks passed: status, contributions, follow-ups, links, technology matches and API knowledge.')
