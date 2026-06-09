<template>
  <section id="services" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-12 reveal">
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 border border-orange-500/30">
          <span>⚡</span>
          <span class="text-sm text-gray-300">20+ Digital Services</span>
        </div>
        <h2 class="section-title">
          Our <span class="gradient-text">Services</span>
        </h2>
        <p class="section-subtitle">
          From government documents to banking, travel bookings to technology – all under one roof in Hiyatpur-Kotli Khass.
        </p>
      </div>

      <!-- Category filter -->
      <div class="flex flex-wrap gap-3 justify-center mb-10 reveal">
        <button v-for="cat in categories" :key="cat.id"
                @click="activeCategory = cat.id"
                class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                :class="activeCategory === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                  : 'glass border border-white/10 text-gray-300 hover:border-orange-500/30 hover:text-orange-400'">
          {{ cat.icon }} {{ cat.label }}
        </button>
      </div>

      <!-- Services grid -->
      <TransitionGroup name="service-grid" tag="div"
                       class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="(service, i) in filteredServices" :key="service.id"
             @click="$emit('open-service', service)"
             class="service-card gradient-border rounded-2xl p-5 cursor-pointer select-none"
             :style="{ '--glow-color': service.glowColor }">

          <!-- Top row -->
          <div class="flex items-start justify-between mb-4">
            <!-- Icon -->
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg
                        bg-gradient-to-br transition-transform duration-300 group-hover:scale-110"
                 :class="`bg-gradient-to-br ${service.gradient} bg-opacity-20`"
                 :style="{ background: `linear-gradient(135deg, ${service.glowColor.replace('0.25','0.15')}, rgba(0,0,0,0))` }">
              {{ service.icon }}
            </div>
            <!-- Badge -->
            <span v-if="service.badge"
                  class="text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap"
                  :class="service.badge.includes('NEW') ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : service.badge.includes('FIRST') ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'">
              {{ service.badge }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-bold text-white text-base mb-0.5">{{ service.title }}</h3>
          <p class="text-xs text-gray-500 font-punjabi mb-3">{{ service.titlePunjabi }}</p>

          <!-- Description -->
          <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {{ service.description }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-3 border-t border-white/5">
            <span class="text-xs font-semibold text-orange-400">{{ service.price }}</span>
            <span class="text-xs text-gray-500 flex items-center gap-1 group-hover:text-orange-400 transition-colors">
              Get Service →
            </span>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty state -->
      <div v-if="filteredServices.length === 0" class="text-center py-16 text-gray-500">
        No services found for this category.
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-14 reveal">
        <p class="text-gray-400 mb-4">Can't find what you need? Contact us directly.</p>
        <div class="flex flex-wrap gap-4 justify-center">
          <a href="tel:+917009073061" class="btn-primary">
            📞 Call: 70090-73061
          </a>
          <a href="https://wa.me/917009073061?text=Hello! I need help with digital services."
             target="_blank" class="btn-outline">
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { services, categories } from '@/data/services.js'

defineEmits(['open-service'])

const activeCategory = ref('all')

const filteredServices = computed(() => {
  if (activeCategory.value === 'all') return services
  return services.filter(s => s.category === activeCategory.value)
})
</script>

<style scoped>
.service-grid-enter-active { transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); }
.service-grid-leave-active { transition: all 0.25s ease; }
.service-grid-enter-from   { opacity: 0; transform: scale(0.85) translateY(20px); }
.service-grid-leave-to     { opacity: 0; transform: scale(0.9); }
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
