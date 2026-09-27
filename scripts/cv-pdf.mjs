// Prints the CV viewer to a text-based A4 PDF in public/assets/cv using headless Chrome or Edge.
// Run with `npm run cv` after changing CV content in src/data/portfolio.ts, then commit the PDF.
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { preview } from 'vite'

const output = 'public/assets/cv/MNSBaanu_CV.pdf'
const debugPort = 9334

const browserPaths = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]
const browserPath = browserPaths.find((path) => path && existsSync(path))
if (!browserPath) {
  console.error('Chrome or Edge was not found. Set CHROME_PATH to the browser executable.')
  process.exit(1)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const server = await preview({ preview: { port: 4174 } })
const siteUrl = server.resolvedUrls.local[0]
const profile = mkdtempSync(join(tmpdir(), 'cv-pdf-'))
const browser = spawn(browserPath, ['--headless=new', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, 'about:blank'])

try {
  let targets = []
  for (let attempt = 0; attempt < 40 && !targets.length; attempt++) {
    await sleep(250)
    targets = await fetch(`http://127.0.0.1:${debugPort}/json`).then((res) => res.json()).catch(() => [])
  }
  const page = targets.find((target) => target.type === 'page')
  if (!page) throw new Error('Could not connect to the browser')

  const socket = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve) => socket.addEventListener('open', resolve))
  let id = 0
  const pending = new Map()
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message.result)
      pending.delete(message.id)
    }
  })
  const send = (method, params = {}) => new Promise((resolve) => {
    id++
    pending.set(id, resolve)
    socket.send(JSON.stringify({ id, method, params }))
  })
  const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result.value

  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: siteUrl })
  await sleep(2000)
  const opened = await evaluate(`(() => {
    const button = [...document.querySelectorAll('button')].find((item) => item.textContent.includes('View CV'))
    button?.click()
    return Boolean(button)
  })()`)
  if (!opened) throw new Error('The View CV button was not found')
  await sleep(1500)
  if (!(await evaluate(`Boolean(document.getElementById('cv-content'))`))) throw new Error('The CV did not open')

  const { data } = await send('Page.printToPDF', { preferCSSPageSize: true, printBackground: true })
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, Buffer.from(data, 'base64'))
  console.log(`CV saved to ${output}`)
  socket.close()
} finally {
  browser.kill()
  server.httpServer.close()
  await sleep(500)
  rmSync(profile, { recursive: true, force: true, maxRetries: 3 })
}
