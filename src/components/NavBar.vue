<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
          :class="scrolled ? 'nav-scrolled' : 'nav-transparent'">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

      <!-- Logo -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-full flex items-center justify-center text-2xl
                    bg-gradient-to-br from-orange-500 to-amber-400 shadow-lg shadow-orange-500/30
                    group-hover:scale-110 transition-transform duration-300">
          ☬
        </div>
        <div class="leading-tight">
          <p class="font-bold text-base text-white">Khalsa HiTech</p>
          <p class="text-xs text-orange-400 font-punjabi">ਡਿਜੀਟਲ ਸੇਵਾ ਕੇਂਦਰ</p>
        </div>
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-6">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href"
             class="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200 relative group">
            {{ link.label }}
            <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <div class="hidden md:flex items-center gap-3">
        <a href="tel:+917009073061"
           class="flex items-center gap-2 text-sm text-gray-300 hover:text-orange-400 transition-colors">
          📞 70090-73061
        </a>
        <button @click="$emit('open-booking')"
                class="btn-primary text-sm py-2.5 px-5">
          📅 Book Meeting
        </button>
      </div>

      <!-- Mobile hamburger -->
      <button @click="menuOpen = !menuOpen"
              class="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 relative z-50">
        <span class="w-6 h-0.5 bg-white transition-all duration-300"
              :class="menuOpen ? 'rotate-45 translate-y-2' : ''" />
        <span class="w-6 h-0.5 bg-white transition-all duration-300"
              :class="menuOpen ? 'opacity-0' : ''" />
        <span class="w-6 h-0.5 bg-white transition-all duration-300"
              :class="menuOpen ? '-rotate-45 -translate-y-2' : ''" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen"
           class="md:hidden absolute top-16 left-0 right-0 glass-strong border-t border-orange-500/20 py-6 px-6">
        <ul class="flex flex-col gap-4 mb-6">
          <li v-for="link in navLinks" :key="link.href">
            <a :href="link.href"
               @click="menuOpen = false"
               class="block text-gray-200 hover:text-orange-400 py-2 transition-colors text-base">
              {{ link.label }}
            </a>
          </li>
        </ul>
        <div class="flex flex-col gap-3">
          <a href="tel:+917009073061" class="btn-outline text-sm py-2.5 justify-center">
            📞 Call: 70090-73061
          </a>
          <button @click="$emit('open-booking'); menuOpen = false"
                  class="btn-primary text-sm py-2.5 justify-center">
            📅 Book Meeting
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineEmits(['open-booking'])

const scrolled  = ref(false)
const menuOpen  = ref(false)

const navLinks = [
  { href: '#home',     label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#videos',   label: 'About' },
  { href: '#owner',    label: 'Owner' },
  { href: '#contact',  label: 'Contact' },
]

function onScroll() { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav-transparent { background: transparent; }
.nav-scrolled {
  background: rgba(10, 10, 18, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(249, 115, 22, 0.15);
  box-shadow: 0 4px 30px rgba(0,0,0,0.4);
}
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: all 0.3s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
