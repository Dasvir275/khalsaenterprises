<template>
  <!-- Fixed news ticker at the very bottom, just above the chat button -->
  <div class="fixed bottom-0 left-0 right-0 z-40 overflow-hidden"
       style="height: 38px; background: linear-gradient(90deg, #0a0a12 0%, #1a0a00 30%, #0f0500 70%, #0a0a12 100%);">

    <!-- Top highlight line -->
    <div class="absolute top-0 left-0 right-0 h-px"
         style="background: linear-gradient(90deg, transparent, #f97316, #fbbf24, #f97316, transparent);"></div>

    <div class="flex items-center h-full">

      <!-- Left "LIVE" badge – always visible -->
      <div class="shrink-0 flex items-center gap-0 h-full z-10"
           style="background: linear-gradient(135deg, #f97316, #dc2626); min-width: 88px;">
        <div class="flex items-center gap-1.5 px-3 h-full">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
          <span class="text-white text-xs font-black tracking-wider">LIVE</span>
        </div>
      </div>

      <!-- Brand label -->
      <div class="shrink-0 flex items-center gap-1.5 px-3 h-full border-r border-orange-500/30"
           style="background: rgba(249,115,22,0.12);">
        <span class="text-orange-400 font-bold text-xs tracking-wide whitespace-nowrap">☬ KHALSA HITECH</span>
      </div>

      <!-- Scrolling ticker track -->
      <div class="flex-1 overflow-hidden relative h-full flex items-center">
        <!-- Fade gradients on edges -->
        <div class="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
             style="background: linear-gradient(90deg, #0f0500, transparent);"></div>
        <div class="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
             style="background: linear-gradient(-90deg, #0f0500, transparent);"></div>

        <!-- The scrolling content (duplicated for seamless loop) -->
        <div class="ticker-track flex items-center gap-0 whitespace-nowrap"
             :style="{ animationDuration: speed + 's' }"
             @mouseenter="paused = true"
             @mouseleave="paused = false"
             :class="paused ? 'ticker-paused' : ''">

          <!-- Items shown twice for seamless infinite scroll -->
          <template v-for="pass in 2" :key="pass">
            <template v-for="(item, i) in tickerItems" :key="`${pass}-${i}`">
              <!-- Service item -->
              <div class="flex items-center gap-2 px-5 h-full shrink-0 group cursor-default">
                <span class="text-base">{{ item.icon }}</span>
                <span class="text-xs font-medium"
                      :style="{ color: item.color || '#e5e7eb' }">
                  {{ item.text }}
                </span>
                <span v-if="item.price"
                      class="text-xs px-2 py-0.5 rounded-full font-semibold ml-1"
                      style="background: rgba(249,115,22,0.2); color: #fbbf24; border: 1px solid rgba(249,115,22,0.3);">
                  {{ item.price }}
                </span>
              </div>

              <!-- Divider dot -->
              <span class="text-orange-500/40 shrink-0 text-lg select-none">◆</span>
            </template>
          </template>
        </div>
      </div>

      <!-- Right: call to action -->
      <a href="tel:+917009073061"
         class="shrink-0 flex items-center gap-2 px-4 h-full text-xs font-bold text-white
                hover:opacity-80 transition-opacity"
         style="background: rgba(249,115,22,0.2); border-left: 1px solid rgba(249,115,22,0.3);">
        📞 <span class="hidden sm:inline">70090-73061</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const paused = ref(false)
const speed  = ref(50) // seconds for one full scroll – increase to slow down

const tickerItems = [
  { icon: '🚂', text: 'IRCTC Rail Ticket Booking',          price: '₹30',    color: '#fca5a5' },
  { icon: '🪪', text: 'Aadhaar Card Update / New',          price: '₹100',   color: '#93c5fd' },
  { icon: '🏥', text: 'Ayushman Health Card Apply',         price: '₹100',   color: '#f9a8d4' },
  { icon: '🚗', text: 'HSRP Number Plate',                  price: '₹400',   color: '#fb923c' },
  { icon: '💸', text: 'NEFT / RTGS Money Transfer',         price: '₹20',    color: '#86efac' },
  { icon: '💳', text: 'Mini ATM – Cash Withdrawal',         price: 'Free',   color: '#fde68a' },
  { icon: '🏦', text: 'Bank Account Opening (All Banks)',   price: '₹100',   color: '#7dd3fc' },
  { icon: '🗳️', text: 'Voter ID Card Apply / Correction',  price: '₹100',   color: '#c4b5fd' },
  { icon: '🌾', text: 'Kisan ID / PM Kisan Registration',  price: '₹100',   color: '#86efac' },
  { icon: '📋', text: 'Ration Card New / Correction',       price: '₹150',   color: '#fcd34d' },
  { icon: '🪪', text: 'PAN Card New / Correction',          price: '₹100',   color: '#93c5fd' },
  { icon: '📜', text: 'Birth / Death / Caste Certificate',  price: '₹100',   color: '#e2e8f0' },
  { icon: '✈️', text: 'Flight & Bus Ticket Booking',        price: '₹50',    color: '#bfdbfe' },
  { icon: '🏛️', text: 'Sewa Kendra – DL / RC / Fard',     price: '₹200',   color: '#a5f3fc' },
  { icon: '📝', text: 'Passport / ITR / GST Online Forms', price: '₹50',    color: '#fde68a' },
  { icon: '💻', text: 'Website & App Development',          price: '₹5000',  color: '#d8b4fe' },
  { icon: '🎬', text: 'Video Production & Editing',         price: '₹500',   color: '#fca5a5' },
  { icon: '🖨️', text: 'B&W Printing',                      price: '₹2/pg',  color: '#d1d5db' },
  { icon: '🏷️', text: 'FASTag New / Recharge',             price: '₹10',    color: '#67e8f9' },
  { icon: '🛡️', text: 'Insurance & Credit Card Apply',     price: 'Free',   color: '#bfdbfe' },
  { icon: '📅', text: '📅 Book Free Consultation',          price: null,     color: '#fbbf24' },
  { icon: '📞', text: 'Call Us: 70090-73061',               price: null,     color: '#f97316' },
]
</script>

<style scoped>
@keyframes tickerScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.ticker-track {
  animation: tickerScroll linear infinite;
  will-change: transform;
}
.ticker-paused {
  animation-play-state: paused;
}
</style>
