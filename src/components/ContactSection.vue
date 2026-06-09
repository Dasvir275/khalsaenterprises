<template>
  <section id="contact" class="py-24 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/3 to-transparent pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 reveal">
        <h2 class="section-title">Get in <span class="gradient-text">Touch</span></h2>
        <p class="section-subtitle">Visit us, call us or WhatsApp – we're always here to help.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact cards -->
        <div class="reveal-left space-y-5">
          <div v-for="item in contactItems" :key="item.label"
               class="glass p-5 rounded-2xl border border-white/5 flex items-center gap-5
                      hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0
                        bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30
                        group-hover:scale-110 transition-transform duration-300">
              {{ item.icon }}
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-0.5">{{ item.label }}</p>
              <a v-if="item.href" :href="item.href"
                 class="font-semibold text-white hover:text-orange-400 transition-colors">
                {{ item.value }}
              </a>
              <p v-else class="font-semibold text-white">{{ item.value }}</p>
              <p v-if="item.sub" class="text-xs text-gray-400 mt-0.5">{{ item.sub }}</p>
            </div>
          </div>

          <!-- Map embed -->
          <div class="glass rounded-2xl overflow-hidden border border-white/5 aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d4002.753521566739!2d75.63428805650278!3d32.04607460771282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shiyatpur%20kotli%20khass!5e0!3m2!1sen!2sin!4v1781034959444!5m2!1sen!2sin"
              width="100%" height="100%"
              style="border:0;"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              title="Khalsa HiTech Enterprises – Hiyatpur Kotli Khass">
            </iframe>
          </div>
        </div>

        <!-- Quick contact form -->
        <div class="reveal-right">
          <div class="glass-strong p-8 rounded-3xl border border-orange-500/20">
            <h3 class="text-2xl font-bold text-white mb-2">Send a Message</h3>
            <p class="text-gray-400 text-sm mb-6">We'll get back to you within a few hours.</p>

            <form @submit.prevent="submitContact" class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Your Name *</label>
                  <input v-model="form.name" type="text" placeholder="Gurpreet Singh"
                         class="input-field" required />
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Phone Number *</label>
                  <input v-model="form.phone" type="tel" placeholder="98765 XXXXX"
                         class="input-field" required />
                </div>
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1">Service Needed</label>
                <select v-model="form.service" class="select-field">
                  <option value="">Select a service...</option>
                  <option v-for="s in serviceNames" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1">Message</label>
                <textarea v-model="form.message" rows="4"
                          placeholder="Tell us how we can help you..."
                          class="input-field resize-none"></textarea>
              </div>

              <button type="submit" :disabled="sending"
                      class="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                <span v-if="sending" class="loader"></span>
                <span v-else>📨 Send Message</span>
              </button>

              <Transition name="fade">
                <div v-if="sent" class="text-center py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm">
                  ✅ Message sent! We'll contact you soon.
                </div>
              </Transition>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const sending = ref(false)
const sent    = ref(false)
const form    = ref({ name: '', phone: '', service: '', message: '' })

const serviceNames = [
  'Banking Services','IRCTC Rail Ticket','Aadhaar / PAN Card',
  'Health Card','HSRP Number Plate','NEFT / RTGS Transfer',
  'Kisan ID Card','Voter Card','Ration Card','Certificates',
  'Sewa Kendra','Vehicle Services','Website & App','Other',
]

const contactItems = [
  { icon: '📞', label: 'Phone / WhatsApp', value: '70090-73061',               href: 'tel:+917009073061',                                        sub: 'Monday – Saturday, 9 AM – 7 PM' },
  { icon: '✉️', label: 'Email',            value: 'dasvirsingh07@gmail.com',   href: 'mailto:dasvirsingh07@gmail.com',                           sub: 'Response within 2–4 hours' },
  { icon: '🌐', label: 'Website',          value: 'www.khalsaenterprises.com', href: 'http://www.khalsaenterprises.com',                         sub: null },
  { icon: '📍', label: 'Address',          value: 'Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur, Punjab', href: null, sub: 'Pincode: 144211' },
  { icon: '⏰', label: 'Business Hours',   value: 'Monday – Saturday: 9:00 AM – 7:00 PM', href: null, sub: 'Sundays: Closed (emergency call welcome)' },
]

async function submitContact() {
  sending.value = true
  try {
    const res = await fetch('/api/send-notification', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type:    'Contact Enquiry',
        name:    form.value.name,
        phone:   form.value.phone,
        service: form.value.service || 'General Enquiry',
        message: form.value.message,
      }),
    })
    if (!res.ok) throw new Error()
    sent.value = true
    form.value = { name: '', phone: '', service: '', message: '' }
    setTimeout(() => { sent.value = false }, 5000)
  } catch {
    alert('Failed to send message. Please call 70090-73061 directly.')
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
