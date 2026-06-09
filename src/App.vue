<template>
  <div class="min-h-screen bg-[#0a0a12] text-white font-poppins overflow-x-hidden pb-10">
    <!-- Scroll progress bar -->
    <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>

    <!-- Ambient background orbs -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div v-for="orb in orbs" :key="orb.id"
           class="absolute rounded-full opacity-30 blur-3xl animate-orb"
           :style="orb.style" />
    </div>

    <!-- Floating particles -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div v-for="p in particles" :key="p.id"
           class="absolute rounded-full animate-particle"
           :style="p.style" />
    </div>

    <!-- Navigation -->
    <NavBar @open-booking="showBooking = true" />

    <!-- Main content -->
    <main>
      <HeroSection @open-booking="showBooking = true" @scroll-services="scrollTo('#services')" />
      <StatsSection />
      <ServicesSection @open-service="openService" />
      <VideoSection />
      <OwnerSection />
      <BookingSection v-if="false" /><!-- rendered via modal below -->
      <ContactSection />
    </main>

    <FooterSection />

    <!-- Chat bot -->
    <ChatBot />

    <!-- News ticker (fixed bottom) -->
    <NewsTicker />

    <!-- Service modal -->
    <Transition name="modal">
      <ServiceModal v-if="activeService"
                    :service="activeService"
                    @close="activeService = null" />
    </Transition>

    <!-- Booking modal -->
    <Transition name="modal">
      <BookingSection v-if="showBooking" @close="showBooking = false" />
    </Transition>

    <!-- Email Composer (Ctrl+Shift+M) -->
    <Transition name="modal">
      <EmailComposer v-if="showEmailComposer" @close="showEmailComposer = false" />
    </Transition>

    <!-- Scroll to top -->
    <Transition name="fade">
      <button v-if="showTop"
              @click="scrollToTop"
              class="fixed bottom-14 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center btn-primary shadow-xl"
              aria-label="Scroll to top">
        ↑
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import NavBar        from './components/NavBar.vue'
import HeroSection   from './components/HeroSection.vue'
import StatsSection  from './components/StatsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import VideoSection  from './components/VideoSection.vue'
import OwnerSection  from './components/OwnerSection.vue'
import BookingSection from './components/BookingSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import ChatBot       from './components/ChatBot.vue'
import ServiceModal  from './components/ServiceModal.vue'
import NewsTicker    from './components/NewsTicker.vue'
import EmailComposer from './components/EmailComposer.vue'

const activeService   = ref(null)
const showBooking     = ref(false)
const showEmailComposer = ref(false)
const showTop         = ref(false)
const scrollY         = ref(0)

const scrollProgress = computed(() => {
  const total = document.documentElement.scrollHeight - window.innerHeight
  return total > 0 ? (scrollY.value / total) * 100 : 0
})

function openService(service) {
  activeService.value = service
  document.body.style.overflow = 'hidden'
}

function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  scrollY.value = window.scrollY
  showTop.value  = window.scrollY > 600
}

// Ambient orbs
const orbs = [
  { id: 1, style: { width:'500px', height:'500px', left:'-100px', top:'-100px', background:'radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)', '--dur':'14s', '--delay':'0s' } },
  { id: 2, style: { width:'400px', height:'400px', right:'-80px', top:'40%', background:'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)', '--dur':'18s', '--delay':'-6s' } },
  { id: 3, style: { width:'350px', height:'350px', left:'30%', bottom:'-50px', background:'radial-gradient(circle, rgba(6,182,212,0.10), transparent 70%)', '--dur':'16s', '--delay':'-3s' } },
]

// Floating particles
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  style: {
    width:  `${2 + (i % 4)}px`,
    height: `${2 + (i % 4)}px`,
    left:   `${(i * 4.1) % 100}%`,
    top:    `${(i * 3.7) % 100}%`,
    background: ['#f97316','#fbbf24','#8b5cf6','#06b6d4','#ec4899'][i % 5],
    boxShadow: `0 0 ${6 + i % 8}px currentColor`,
    '--dur':   `${6 + (i % 5) * 2}s`,
    '--delay': `${(i * 0.5) % 4}s`,
    opacity: 0.5,
  },
}))

function onKeydown(e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'M') {
    e.preventDefault()
    showEmailComposer.value = !showEmailComposer.value
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
