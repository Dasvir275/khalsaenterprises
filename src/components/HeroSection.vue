<template>
  <section id="home" class="relative min-h-screen flex items-center hero-bg pt-16 overflow-hidden">

    <!-- Ripple rings behind hero text -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div v-for="i in 4" :key="i"
           class="absolute rounded-full border border-orange-500/10 animate-ripple"
           :style="{ width: `${200 * i}px`, height: `${200 * i}px`, top: `${-100 * i}px`, left: `${-100 * i}px`, animationDelay: `${i * 0.6}s` }" />
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center py-20">

      <!-- Left: Text content -->
      <div class="relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-orange-500/30
                    animate-slide-up" style="animation-delay:0.1s; opacity:0; animation-fill-mode:forwards">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="text-sm text-orange-300 font-medium">ਖੁਸ਼ਖਬਰੀ! Digital Seva Kendra – Open Now</span>
        </div>

        <!-- Main heading -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4
                   animate-slide-up" style="animation-delay:0.2s; opacity:0; animation-fill-mode:forwards">
          <span class="gradient-text">ਖਾਲਸਾ</span><br />
          <span class="text-white">HiTech</span><br />
          <span class="text-gray-300 text-3xl sm:text-4xl font-bold">Enterprises</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-gray-300 font-punjabi text-lg mb-2
                  animate-slide-up" style="animation-delay:0.3s; opacity:0; animation-fill-mode:forwards">
          ਡਿਜੀਟਲ ਸੇਵਾ ਕੇਂਦਰ – ਸੰਪੂਰਨ ਡਿਜੀਟਲ ਹੱਲ
        </p>
        <p class="text-gray-400 text-base mb-2
                  animate-slide-up" style="animation-delay:0.35s; opacity:0; animation-fill-mode:forwards">
          Digital Seva Kendra – Complete Digital Solution
        </p>
        <p class="text-orange-400 text-sm mb-8
                  animate-slide-up" style="animation-delay:0.4s; opacity:0; animation-fill-mode:forwards">
          📍 Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur, Punjab
        </p>

        <!-- Typed tagline -->
        <p class="text-gray-300 text-lg mb-8 min-h-[2rem]
                  animate-slide-up" style="animation-delay:0.5s; opacity:0; animation-fill-mode:forwards">
          <span class="text-orange-400 font-semibold">{{ typedText }}</span>
          <span class="cursor-blink text-orange-400">|</span>
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4 mb-10
                    animate-slide-up" style="animation-delay:0.6s; opacity:0; animation-fill-mode:forwards">
          <button @click="$emit('open-booking')" class="btn-primary text-base px-8 py-4">
            📅 Book Free Meeting
          </button>
          <button @click="$emit('scroll-services')" class="btn-outline text-base px-8 py-4">
            🔍 Explore Services
          </button>
          <a href="https://wa.me/917009073061?text=Hello! I need help with digital services."
             target="_blank"
             class="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white transition-all duration-300
                    bg-green-600 hover:bg-green-500 hover:scale-105 shadow-lg shadow-green-700/30">
            💬 WhatsApp
          </a>
        </div>

        <!-- Quick stats row -->
        <div class="flex flex-wrap gap-6
                    animate-slide-up" style="animation-delay:0.7s; opacity:0; animation-fill-mode:forwards">
          <div v-for="stat in quickStats" :key="stat.label" class="text-center">
            <p class="text-2xl font-black gradient-text">{{ stat.value }}</p>
            <p class="text-xs text-gray-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Right: Service float cards -->
      <div class="relative hidden lg:flex items-center justify-center h-[480px]">
        <!-- Central glowing circle -->
        <div class="absolute w-48 h-48 rounded-full border-2 border-orange-500/30 animate-spin-slow"></div>
        <div class="absolute w-64 h-64 rounded-full border border-orange-500/10 animate-spin-slow"
             style="animation-direction: reverse; animation-duration: 18s;"></div>

        <!-- Center icon -->
        <div class="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-amber-400
                    flex items-center justify-center text-5xl shadow-2xl shadow-orange-500/40
                    animate-bounce-gentle">
          ☬
        </div>

        <!-- Orbiting service bubbles -->
        <div v-for="(item, i) in floatingServices" :key="item.icon"
             class="absolute glass border border-white/10 rounded-2xl px-3 py-2 flex items-center gap-2
                    hover:border-orange-500/40 hover:scale-110 transition-all duration-300 cursor-default"
             :style="getOrbitStyle(i, floatingServices.length)">
          <span class="text-xl">{{ item.icon }}</span>
          <span class="text-xs font-medium text-gray-200 whitespace-nowrap">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle">
      <span class="text-xs text-gray-500">Scroll Down</span>
      <div class="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
        <div class="w-1 h-3 rounded-full bg-orange-400 animate-bounce"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineEmits(['open-booking', 'scroll-services'])

const quickStats = [
  { value: '20+', label: 'Services' },
  { value: '5000+', label: 'Customers' },
  { value: '5+', label: 'Years Exp' },
  { value: '4.9★', label: 'Rating' },
]

const floatingServices = [
  { icon: '🏦', label: 'Banking' },
  { icon: '🚂', label: 'IRCTC' },
  { icon: '🪪', label: 'Aadhaar/PAN' },
  { icon: '🏥', label: 'Health Card' },
  { icon: '🚗', label: 'HSRP Plate' },
  { icon: '💸', label: 'NEFT/RTGS' },
  { icon: '📜', label: 'Certificates' },
  { icon: '💻', label: 'Website' },
]

function getOrbitStyle(index, total) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const radius = 190
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  return {
    transform: `translate(${x}px, ${y}px)`,
    left: '50%',
    top: '50%',
    marginLeft: '-60px',
    marginTop: '-20px',
  }
}

// Typing animation
const phrases = [
  'ਆਨਲਾਈਨ ਅਤੇ ਆਫਲਾਈਨ ਸੇਵਾਵਾਂ ਇੱਕ ਛੱਤ ਹੇਠ',
  'Online & Offline Services Under One Roof',
  'IRCTC • HSRP • Banking • Aadhaar • Health Card',
  'ਹਰ ਸੇਵਾ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੇ',
  'Every Service at Your Doorstep',
]
const typedText = ref('')
let phraseIdx = 0
let charIdx   = 0
let isDeleting = false
let timer = null

function type() {
  const full = phrases[phraseIdx]
  typedText.value = isDeleting
    ? full.substring(0, charIdx--)
    : full.substring(0, charIdx++)

  if (!isDeleting && charIdx > full.length) {
    isDeleting = true
    clearTimeout(timer)
    timer = setTimeout(type, 1800)
    return
  }
  if (isDeleting && charIdx === 0) {
    isDeleting = false
    phraseIdx = (phraseIdx + 1) % phrases.length
  }
  timer = setTimeout(type, isDeleting ? 40 : 70)
}

onMounted(() => { timer = setTimeout(type, 800) })
onUnmounted(() => clearTimeout(timer))
</script>
