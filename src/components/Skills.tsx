import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
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
}: {
  index: number
  skill: Skill
  theme: 'light' | 'dark'
  x: ReturnType<typeof useMotionValue<number>>
  containerWidth: number
  cardWidth: number
  pitch: number
  loopDistance: number
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
      className={`flex-shrink-0 p-6 sm:p-7 md:p-8 rounded-2xl transition-shadow duration-300 flex flex-col items-center justify-center gap-4 group min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-lg ${index % 2 === 0 ? 'bg-gray-50 dark:bg-black' : 'bg-gray-100 dark:bg-black'
        }`}
    >
      {skill.icon && (
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            style={{
              filter:
                theme === 'dark'
                  ? 'brightness(0) invert(1)'
                  : 'grayscale(100%) contrast(200%) brightness(0.1)',
              mixBlendMode: theme === 'dark' ? 'normal' : 'multiply',
            }}
          />
        </div>
      )}
      <span className="font-semibold text-sm sm:text-base text-black dark:text-gray-100 text-center leading-tight">
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
      skillCategories.flatMap((category) => [
        ...category.skills,
        ...(category.subcategories?.flatMap((sub) => sub.skills) || []),
      ]) as Skill[],
    [],
  )

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...allSkills, ...allSkills]
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

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const pitch = metrics.cardWidth + metrics.gap
  const loopDistance = pitch > 0 ? pitch * allSkills.length : 0

  useEffect(() => {
    if (!loopDistance) return
    x.set(0)
    const controls = animate(x, -loopDistance, {
      repeat: Infinity,
      repeatType: 'loop',
      duration: allSkills.length * 1.2,
      ease: 'linear',
    })
    return () => controls.stop()
  }, [allSkills.length, loopDistance, x])

  return (
    <div
      className="box-border px-6 sm:px-8 bg-white dark:bg-neutral-900 relative z-10 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-gray-100 dark:border-neutral-800"
      style={{
        height: '100vh',
        paddingTop: 'calc(var(--header-height, 0px) + 2rem)',
      }}
    >
      <div className="h-full max-w-7xl mx-auto flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-4 tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated collection of tools and technologies I work with
          </p>
        </motion.div>

        {/* Continuous Scrolling Skills Ticker */}
        <div className="relative -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-16">
          {/* Scrolling container */}
          <div ref={containerRef} className="flex overflow-hidden py-8" style={{ perspective: 1200 }}>
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
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
