<template>
  <section id="owner" class="py-28 relative overflow-hidden">

    <!-- Decorative background blobs -->
    <div class="absolute -left-32 top-0 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none"></div>
    <div class="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

      <!-- ── Left: Animated Photo Card ─────────────────────────────────────── -->
      <div class="reveal-left flex justify-center lg:justify-start">
        <div class="relative" style="perspective: 1200px;">

          <!-- Outer rotating halo ring -->
          <div class="absolute -inset-6 rounded-full border border-dashed border-orange-500/20
                      animate-spin-slow pointer-events-none"></div>
          <!-- Inner pulsing ring -->
          <div class="absolute -inset-3 rounded-full border border-orange-500/30
                      animate-pulse pointer-events-none"></div>

          <!-- Floating award badges -->
          <div v-for="badge in floatBadges" :key="badge.label"
               class="absolute glass border border-white/10 rounded-xl px-3 py-2 text-xs flex items-center gap-1.5
                      shadow-lg hover:scale-105 transition-transform duration-300 z-20 animate-float"
               :style="badge.style">
            <span>{{ badge.icon }}</span>
            <span class="text-gray-200 whitespace-nowrap font-medium">{{ badge.label }}</span>
          </div>

          <!-- Photo frame -->
          <div class="relative w-72 h-80 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/20
                      border-2 border-orange-500/30 group"
               :class="photoLoaded ? '' : 'bg-gradient-to-br from-orange-500/10 to-amber-500/10'">

            <!-- Actual photo -->
            <img :src="'/dasvir.jpg'"
                 alt="Dasvir Singh – Khalsa HiTech Enterprises"
                 class="w-full h-full object-cover object-top transition-transform duration-700
                        group-hover:scale-105"
                 @load="photoLoaded = true"
                 @error="photoLoaded = false" />

            <!-- Fallback when photo not found -->
            <div v-if="!photoLoaded"
                 class="absolute inset-0 flex flex-col items-center justify-center
                        bg-gradient-to-br from-orange-500/20 to-amber-500/20">
              <div class="text-8xl mb-4">👳‍♂️</div>
              <p class="text-sm text-gray-300 font-medium">Dasvir Singh</p>
              <p class="text-xs text-gray-500 mt-1">Place dasvir.jpg in public/</p>
            </div>

            <!-- Gradient overlay at bottom -->
            <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent"></div>

            <!-- Name plate on photo -->
            <div class="absolute bottom-0 inset-x-0 px-5 py-4">
              <p class="font-bold text-white text-lg leading-tight">Dasvir Singh</p>
              <p class="text-orange-400 text-xs font-punjabi">ਦਸਵੀਰ ਸਿੰਘ · ਮਾਲਕ</p>
            </div>

            <!-- Shimmer sweep on hover -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        pointer-events-none"
                 style="background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%);
                        animation: shimmerSweep 1.5s ease forwards;"></div>
          </div>

          <!-- Bottom card: qualification -->
          <div class="absolute -bottom-5 -right-5 glass-strong px-4 py-3 rounded-2xl
                      border border-orange-500/30 shadow-xl z-20 max-w-[180px]">
            <p class="text-xs text-orange-400 font-semibold">🎓 Education</p>
            <p class="text-xs text-gray-200 leading-snug mt-0.5">B.Tech CSE<br/>Thapar University, Patiala</p>
          </div>
        </div>
      </div>

      <!-- ── Right: Info ────────────────────────────────────────────────────── -->
      <div class="reveal-right">
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-5
                    border border-orange-500/30">
          <span class="wave-hand inline-block">👋</span>
          <span class="text-sm text-gray-300">About the Founder</span>
        </div>

        <h2 class="text-4xl md:text-5xl font-black leading-tight mb-6">
          Meet <span class="gradient-text">Dasvir Singh</span><br />
          <span class="text-2xl text-gray-400 font-semibold">Your Digital Service Expert</span>
        </h2>

        <p class="text-gray-300 text-base leading-relaxed mb-8">
          ਮੈਂ ਹਾਂ <strong class="text-white">ਦਸਵੀਰ ਸਿੰਘ</strong> — B.Tech Computer Science, Thapar University.
          ਸਾਡਾ ਕੇਂਦਰ ਪਿੰਡ <strong class="text-orange-400">ਹਿਆਤਪੁਰ-ਕੋਟਲੀ ਖਾਸ</strong> ਵਿੱਚ ਹੈ।
          We bring <strong class="text-white">government & digital services</strong> to your doorstep
          with speed, transparency, and care.
        </p>

        <!-- Achievement cards -->
        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <div v-for="(ach, i) in achievements" :key="ach.title"
               class="glass p-4 rounded-2xl border border-white/5 group cursor-default
                      hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300"
               :style="{ transitionDelay: `${i * 0.05}s` }">
            <div class="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
              {{ ach.icon }}
            </div>
            <p class="font-bold text-white text-sm">{{ ach.title }}</p>
            <p class="text-gray-500 text-xs mt-0.5 leading-relaxed">{{ ach.desc }}</p>
          </div>
        </div>

        <!-- Contact CTA row -->
        <div class="glass-strong p-5 rounded-2xl border border-orange-500/20 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-white mb-0.5">📞 Direct Contact</p>
            <p class="text-orange-400 font-bold text-xl">70090-73061</p>
          </div>
          <div class="flex gap-3 flex-wrap">
            <a href="tel:+917009073061" class="btn-primary text-sm py-2.5 px-5">Call Now</a>
            <a href="https://wa.me/917009073061" target="_blank"
               class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white
                      bg-green-600 hover:bg-green-500 transition-colors">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const photoLoaded = ref(false)

const floatBadges = [
  {
    icon: '🏆',
    label: 'SIH 2023 Winner',
    style: { top: '-18px', right: '-10px', animationDelay: '0s', animationDuration: '5s' },
  },
  {
    icon: '💳',
    label: 'First Mini ATM',
    style: { bottom: '60px', left: '-20px', animationDelay: '1.5s', animationDuration: '6s' },
  },
  {
    icon: '🤖',
    label: 'AI Engineer',
    style: { top: '60px', right: '-25px', animationDelay: '0.8s', animationDuration: '7s' },
  },
]

const achievements = [
  { icon: '🏆', title: 'Smart India Hackathon 2023', desc: 'National-level winner · AI-powered govt services' },
  { icon: '🎓', title: 'B.Tech CSE – Thapar University', desc: 'Computer Science & Engineering, Patiala' },
  { icon: '💳', title: 'First Mini ATM in Area', desc: 'Brought cash withdrawal to Hiyatpur village' },
  { icon: '🤖', title: 'AI Software Engineer', desc: 'Building AI solutions for rural digital empowerment' },
  { icon: '📋', title: '20+ Digital Services', desc: 'Govt & private services under one roof' },
  { icon: '👥', title: '5000+ Happy Customers', desc: 'Trusted by families across Hoshiarpur district' },
]
</script>

<style scoped>
@keyframes shimmerSweep {
  from { transform: translateX(-100%); }
  to   { transform: translateX(200%); }
}
</style>
