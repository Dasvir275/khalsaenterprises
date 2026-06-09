<template>
  <section id="videos" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-orange-500/30">
          <span>🎬</span>
          <span class="text-sm text-gray-300">Digital India Initiative</span>
        </div>
        <h2 class="section-title">
          Learn About <span class="gradient-text">Our Services</span>
        </h2>
        <p class="section-subtitle">
          Watch these helpful videos to understand government digital services available at Khalsa HiTech Enterprises.
        </p>
      </div>

      <!-- Video grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div v-for="(video, i) in videos" :key="video.id"
             class="reveal video-card glass border border-white/5 hover:border-orange-500/30 transition-all duration-300
                    hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10"
             :style="{ transitionDelay: `${i * 0.1}s` }">

          <!-- YouTube embed -->
          <div class="relative overflow-hidden rounded-t-2xl bg-black/50 aspect-video"
               @click="playVideo(i)">
            <img v-if="!playing[i]"
                 :src="`https://img.youtube.com/vi/${video.ytId}/maxresdefault.jpg`"
                 :alt="video.title"
                 class="w-full h-full object-cover opacity-80"
                 @error="$event.target.src = `https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`" />
            <div v-if="!playing[i]"
                 class="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group">
              <div class="w-16 h-16 rounded-full bg-orange-500/90 flex items-center justify-center
                          group-hover:bg-orange-400 group-hover:scale-110 transition-all duration-300
                          shadow-lg shadow-orange-500/40">
                <svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <iframe v-if="playing[i]"
                    :src="`https://www.youtube.com/embed/${video.ytId}?autoplay=1&rel=0`"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowfullscreen />
          </div>

          <!-- Card info -->
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xl">{{ video.icon }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">
                {{ video.category }}
              </span>
            </div>
            <h3 class="font-bold text-white mb-1">{{ video.title }}</h3>
            <p class="text-gray-400 text-sm">{{ video.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Animated info cards row -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(card, i) in infoCards" :key="card.title"
             class="reveal glass p-6 rounded-2xl border border-white/5 text-center
                    hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300"
             :style="{ transitionDelay: `${i * 0.1}s` }">
          <div class="text-3xl mb-3">{{ card.icon }}</div>
          <h4 class="font-bold text-white mb-1">{{ card.title }}</h4>
          <p class="text-gray-400 text-sm">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const playing = ref([false, false, false])
function playVideo(i) { playing.value[i] = true }

// Replace ytId values with actual relevant YouTube video IDs
const videos = [
  {
    id: 1,
    ytId:     'tCZh-5U2KZE', // Replace with actual Digital India video ID
    icon:     '🇮🇳',
    category: 'Digital India',
    title:    'Digital India – सेवाएँ घर बैठे',
    desc:     'How Digital India is transforming government services for every citizen.',
  },
  {
    id: 2,
    ytId:     'kqp8oqeG6w4', // Replace with IRCTC tutorial video ID
    icon:     '🚂',
    category: 'IRCTC Booking',
    title:    'IRCTC Online Rail Ticket Booking',
    desc:     'Step-by-step guide to book train tickets online at Khalsa Enterprises.',
  },
  {
    id: 3,
    ytId:     'N8UuH9b7YxM', // Replace with Ayushman Bharat / health card video ID
    icon:     '🏥',
    category: 'Health Card',
    title:    'Ayushman Bharat – ₹5 Lakh Free Healthcare',
    desc:     'Apply for your Ayushman Bharat PM-JAY health card and get free medical cover.',
  },
]

const infoCards = [
  { icon: '⚡', title: 'Instant Processing',   desc: 'Most services completed same day' },
  { icon: '🔒', title: 'Safe & Secure',        desc: 'All documents handled confidentially' },
  { icon: '📱', title: 'Digital Delivery',     desc: 'Get soft copies on WhatsApp/email' },
  { icon: '🤝', title: 'Trusted & Certified',  desc: 'Govt-authorised service provider' },
]
</script>
