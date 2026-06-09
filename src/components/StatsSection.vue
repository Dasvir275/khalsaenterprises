<template>
  <section class="relative py-16 overflow-hidden">
    <!-- Background stripe -->
    <div class="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-orange-500/5"></div>
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(stat, i) in stats" :key="stat.label"
             class="reveal text-center glass p-6 rounded-2xl border border-white/5
                    hover:border-orange-500/30 hover:scale-105 transition-all duration-300 card-glow"
             :style="{ '--glow-color': stat.glow, transitionDelay: `${i * 0.1}s` }"
             ref="statCards">
          <div class="text-4xl mb-3">{{ stat.icon }}</div>
          <div class="text-4xl font-black gradient-text mb-1">
            {{ counters[i] }}{{ stat.suffix }}
          </div>
          <div class="text-gray-400 text-sm">{{ stat.label }}</div>
          <div class="text-xs text-orange-400/70 mt-1">{{ stat.sub }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stats = [
  { icon: '👥', label: 'Happy Customers',  suffix: '+',  target: 5000, glow: 'rgba(249,115,22,0.2)', sub: 'Served with care' },
  { icon: '⚡', label: 'Services Offered', suffix: '+',  target: 20,   glow: 'rgba(139,92,246,0.2)', sub: 'Govt & Private both' },
  { icon: '🏆', label: 'Years Experience', suffix: '+',  target: 5,    glow: 'rgba(6,182,212,0.2)',  sub: 'Trusted since 2019' },
  { icon: '⭐', label: 'Customer Rating',  suffix: '/5', target: 4.9,  glow: 'rgba(245,158,11,0.2)', sub: 'Google & Word-of-mouth' },
]

const counters = ref(stats.map(() => 0))

function animateCounter(index, target, duration = 1800) {
  const isDecimal = target % 1 !== 0
  const start = performance.now()
  const step = (now) => {
    const elapsed  = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased    = 1 - Math.pow(1 - progress, 3)
    counters.value[index] = isDecimal
      ? (target * eased).toFixed(1)
      : Math.floor(target * eased)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        stats.forEach((s, i) => animateCounter(i, s.target))
        io.disconnect()
      }
    })
  }, { threshold: 0.3 })
  const section = document.querySelector('[ref="statCards"]')?.closest('section')
  if (section) io.observe(section)
  // Fallback
  setTimeout(() => stats.forEach((s, i) => { if (counters.value[i] === 0) animateCounter(i, s.target) }), 2000)
})
</script>
