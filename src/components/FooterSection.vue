<template>
  <footer class="relative pt-16 pb-8 border-t border-white/5 overflow-hidden">
    <!-- Top gradient line -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-400
                        flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">
              ☬
            </div>
            <div>
              <p class="font-bold text-lg text-white">Khalsa HiTech</p>
              <p class="text-xs text-orange-400 font-punjabi">Enterprises</p>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-5">
            ਡਿਜੀਟਲ ਸੇਵਾ ਕੇਂਦਰ – ਸੰਪੂਰਨ ਡਿਜੀਟਲ ਹੱਲ<br />
            Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur, Punjab.
          </p>
          <!-- Social -->
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.name"
               :href="social.href" target="_blank"
               class="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-sm
                      hover:border-orange-500/40 hover:scale-110 transition-all duration-300">
              {{ social.icon }}
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-semibold text-white mb-4">Services</h4>
          <ul class="space-y-2">
            <li v-for="link in serviceLinks" :key="link">
              <a href="#services" class="text-gray-400 text-sm hover:text-orange-400 transition-colors flex items-center gap-1.5">
                <span class="w-1 h-1 rounded-full bg-orange-500/60"></span>{{ link }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.label">
              <a :href="link.href" class="text-gray-400 text-sm hover:text-orange-400 transition-colors flex items-center gap-1.5">
                <span class="w-1 h-1 rounded-full bg-orange-500/60"></span>{{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-white mb-4">Contact</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-2 text-sm text-gray-400">
              <span class="mt-0.5">📍</span>
              <span>Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur, Punjab 144211</span>
            </li>
            <li>
              <a href="tel:+917009073061" class="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors">
                📞 70090-73061
              </a>
            </li>
            <li>
              <a href="mailto:dasvirsingh07@gmail.com" class="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors">
                ✉️ dasvirsingh07@gmail.com
              </a>
            </li>
            <li class="flex items-center gap-2 text-sm text-gray-400">
              ⏰ Mon–Sat: 9:00 AM – 7:00 PM
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} Khalsa HiTech Enterprises. All rights reserved.
        </p>
        <p class="text-gray-600 text-xs">
          Designed with ❤️ by <span class="text-orange-400">Dasvir Singh</span> · Powered by AI
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { name: 'WhatsApp', icon: '💬', href: 'https://wa.me/917009073061' },
  { name: 'Facebook', icon: '👤', href: '#' },
  { name: 'YouTube',  icon: '▶️', href: '#' },
  { name: 'Instagram',icon: '📷', href: '#' },
]
const serviceLinks = [
  'Banking Services','IRCTC Rail Ticket','Aadhaar & PAN Card',
  'HSRP Number Plate','NEFT/RTGS Transfer','Health Card Apply',
  'Kisan ID Card','Voter Card','Certificates',
]
const quickLinks = [
  { label: 'Home',           href: '#home' },
  { label: 'All Services',   href: '#services' },
  { label: 'Book Meeting',   href: '#contact' },
  { label: 'About Owner',    href: '#owner' },
  { label: 'Contact Us',     href: '#contact' },
  { label: 'WhatsApp Chat',  href: 'https://wa.me/917009073061' },
]
</script>
