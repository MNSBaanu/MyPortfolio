import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { skillCategories } from '../data/portfolio'
import { useTheme } from '../context/ThemeContext'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

type Skill = { name: string; icon?: string }

function SkillCard({
  index,
  skill,
  theme,
  x,
  containerWidth,
  cardWidth,
  pitch,
  loopDistance,
  duplicate,
}: {
  index: number
  skill: Skill
  theme: 'light' | 'dark'
  x: ReturnType<typeof useMotionValue<number>>
  containerWidth: number
  cardWidth: number
  pitch: number
  loopDistance: number
  duplicate: boolean
}) {
  const scale = useTransform(x, (latest) => {
    if (containerWidth <= 0 || cardWidth <= 0 || pitch <= 0 || loopDistance <= 0) return 1
    const center = containerWidth / 2
    const normalized = ((index * pitch + latest) % loopDistance + loopDistance) % loopDistance
    const cardCenter = normalized + cardWidth / 2
    const distance = Math.min(Math.abs(cardCenter - center), center)
    const t = 1 - distance / center
    return 0.86 + t * 0.34
  })

  const rotateY = useTransform(x, (latest) => {
    if (containerWidth <= 0 || cardWidth <= 0 || pitch <= 0 || loopDistance <= 0) return 0
    const center = containerWidth / 2
    const normalized = ((index * pitch + latest) % loopDistance + loopDistance) % loopDistance
    const cardCenter = normalized + cardWidth / 2
    const delta = (cardCenter - center) / center
    return delta * 14
  })

  const z = useTransform(x, (latest) => {
    if (containerWidth <= 0 || cardWidth <= 0 || pitch <= 0 || loopDistance <= 0) return 0
    const center = containerWidth / 2
    const normalized = ((index * pitch + latest) % loopDistance + loopDistance) % loopDistance
    const cardCenter = normalized + cardWidth / 2
    const distance = Math.min(Math.abs(cardCenter - center), center)
    const t = 1 - distance / center
    return t * 60
  })

  const rotateX = useTransform(x, (latest) => {
    if (containerWidth <= 0 || cardWidth <= 0 || pitch <= 0 || loopDistance <= 0) return 0
    const center = containerWidth / 2
    const normalized = ((index * pitch + latest) % loopDistance + loopDistance) % loopDistance
    const cardCenter = normalized + cardWidth / 2
    const distance = Math.min(Math.abs(cardCenter - center), center)
    const t = 1 - distance / center
    return -t * 6
  })

  return (
    <motion.div
      style={{ scale, rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
      aria-hidden={duplicate || undefined}
      className="flex-shrink-0 p-6 sm:p-7 md:p-8 rounded-2xl transition-shadow duration-300 flex flex-col items-center justify-center gap-4 group min-w-[140px] sm:min-w-[160px] md:min-w-[180px] bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md"
    >
      {skill.icon && (
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
          <img
            src={skill.icon}
            alt=""
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            style={{
              filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
            }}
          />
        </div>
      )}
      <span className="font-semibold text-sm sm:text-base text-gray-700 dark:text-gray-100 text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const { theme } = useTheme()

  // Flatten all skills from all categories into one array
  const allSkills = useMemo(
    () =>
      skillCategories.flatMap((category) => category.skills) as Skill[],
    [],
  )

  const prefersReducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null)

  // Duplicate skills for seamless loop
  const duplicatedSkills = prefersReducedMotion ? allSkills : [...allSkills, ...allSkills]
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [metrics, setMetrics] = useState({ containerWidth: 0, cardWidth: 0, gap: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0
      const first = trackRef.current?.firstElementChild as HTMLElement | null
      const cardWidth = first?.offsetWidth ?? 0
      const gap = trackRef.current
        ? parseFloat(getComputedStyle(trackRef.current).columnGap || getComputedStyle(trackRef.current).gap || '0')
        : 0

      setMetrics({ containerWidth, cardWidth, gap })
    }

    // ⚡ Bolt: Debounce the window resize event to prevent layout thrashing
    // and high CPU usage from repeatedly reading DOM properties during resizing.
    let timeoutId: number
    const debouncedMeasure = () => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(measure, 150)
    }

    measure()
    window.addEventListener('resize', debouncedMeasure)
    return () => {
      window.removeEventListener('resize', debouncedMeasure)
      window.clearTimeout(timeoutId)
    }
  }, [])

  const pitch = metrics.cardWidth + metrics.gap
  const loopDistance = pitch > 0 ? pitch * allSkills.length : 0

  useEffect(() => {
    if (!loopDistance || prefersReducedMotion) return
    x.set(0)
    const controls = animate(x, -loopDistance, {
      repeat: Infinity,
      repeatType: 'loop',
      duration: allSkills.length * 1.2,
      ease: 'linear',
    })
    controlsRef.current = controls
    return () => {
      controls.stop()
      controlsRef.current = null
    }
  }, [allSkills.length, loopDistance, x, prefersReducedMotion])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    if (paused || hovered) controls.pause()
    else controls.play()
  }, [paused, hovered, loopDistance, prefersReducedMotion])

  return (
    <div
      className="box-border md:h-[100svh] pb-20 md:pb-0 px-6 sm:px-8 bg-slate-100 dark:bg-neutral-900 relative z-40 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-200/50 dark:border-neutral-800 shadow-[0_-10px_50px_rgba(0,0,0,0.08)]"
      style={{
                paddingTop: 'calc(var(--header-height, 0px) + 2rem)',
      }}
    >
      <div className="h-full max-w-7xl mx-auto flex flex-col min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center shrink-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated collection of tools and technologies I work with
          </p>
          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 dark:border-neutral-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-neutral-500 transition-colors"
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              {paused ? 'Play animation' : 'Pause animation'}
            </button>
          )}
        </motion.div>

        {/* Continuous Scrolling Skills Ticker */}
        <div className="relative -mx-6 sm:-mx-8 flex-1 min-h-0 flex items-center">
          {/* Scrolling container */}
          <div
            ref={containerRef}
            className={`flex w-full py-10 ${prefersReducedMotion ? 'overflow-x-auto' : 'overflow-hidden'}`}
            style={{ perspective: 1200 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <motion.div
              ref={trackRef}
              className="flex gap-6 sm:gap-8"
              style={{ x, transformStyle: 'preserve-3d' }}
            >
              {duplicatedSkills.map((skill, index) => (
                <SkillCard
                  key={`${skill.name}-${index}`}
                  index={index}
                  skill={skill}
                  theme={theme}
                  x={x}
                  containerWidth={metrics.containerWidth}
                  cardWidth={metrics.cardWidth}
                  pitch={pitch}
                  loopDistance={loopDistance}
                  duplicate={index >= allSkills.length}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
