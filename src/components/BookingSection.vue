<template>
  <!-- Used both as a standalone section and as a modal -->
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4"
       @click.self="$emit('close')">

    <div class="absolute inset-0 bg-black/75 backdrop-blur-md"></div>

    <div class="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto glass-strong rounded-3xl
                border border-orange-500/20 shadow-2xl shadow-orange-500/10">

      <!-- Header -->
      <div class="sticky top-0 z-10 glass-strong border-b border-white/5 px-6 py-4 flex items-center justify-between rounded-t-3xl">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400
                      flex items-center justify-center text-xl">
            📅
          </div>
          <div>
            <h2 class="font-bold text-white text-lg">Book a Consultation</h2>
            <p class="text-xs text-gray-400">Online (Google Meet) or In-Person at Hiyatpur-Kotli Khass</p>
          </div>
        </div>
        <button @click="$emit('close')"
                class="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center
                       hover:border-orange-500/40 hover:text-orange-400 transition-all text-gray-400 text-lg">
          ✕
        </button>
      </div>

      <div class="p-6">
        <!-- Step indicator -->
        <div class="flex items-center justify-center gap-3 mb-8">
          <div v-for="(step, i) in steps" :key="i"
               class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                 :class="currentStep >= i
                   ? 'bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/30'
                   : 'glass border border-white/20 text-gray-500'">
              {{ i + 1 }}
            </div>
            <span class="text-xs hidden sm:block"
                  :class="currentStep >= i ? 'text-orange-400' : 'text-gray-600'">
              {{ step }}
            </span>
            <div v-if="i < steps.length - 1" class="w-6 sm:w-12 h-px bg-white/10 mx-1"></div>
          </div>
        </div>

        <!-- STEP 1: Meeting type & service -->
        <div v-if="currentStep === 0">
          <h3 class="text-lg font-bold text-white mb-6 text-center">Choose Meeting Type & Service</h3>

          <div class="grid sm:grid-cols-2 gap-4 mb-8">
            <div v-for="mtype in meetingTypes" :key="mtype.id"
                 @click="booking.meetingType = mtype.id"
                 class="glass p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1"
                 :class="booking.meetingType === mtype.id
                   ? 'border-orange-500/60 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                   : 'border-white/10 hover:border-orange-500/30'">
              <div class="text-3xl mb-3">{{ mtype.icon }}</div>
              <h4 class="font-bold text-white mb-1">{{ mtype.label }}</h4>
              <p class="text-gray-400 text-sm">{{ mtype.desc }}</p>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm text-gray-300 mb-2">What service do you need? *</label>
            <select v-model="booking.service" class="select-field" required>
              <option value="">Select a service...</option>
              <option v-for="s in allServiceNames" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <button @click="currentStep = 1" :disabled="!booking.meetingType || !booking.service"
                  class="btn-primary w-full justify-center py-4 disabled:opacity-40 disabled:cursor-not-allowed">
            Continue → Select Date & Time
          </button>
        </div>

        <!-- STEP 2: Date & Time -->
        <div v-if="currentStep === 1">
          <h3 class="text-lg font-bold text-white mb-6 text-center">Select Date & Time Slot</h3>

          <!-- Google Calendar embed option -->
          <div v-if="showCalendarEmbed" class="mb-6">
            <div class="glass rounded-2xl overflow-hidden border border-orange-500/20 aspect-video">
              <iframe :src="GOOGLE_MEET_BOOKING_URL" width="100%" height="100%"
                      frameborder="0" class="w-full h-full" style="min-height:420px">
              </iframe>
            </div>
            <p class="text-center text-gray-400 text-sm mt-3">
              Book directly via Google Calendar or use the manual form below.
            </p>
            <button @click="showCalendarEmbed = false"
                    class="btn-outline w-full justify-center mt-3 text-sm py-2.5">
              Use Manual Booking Form Instead
            </button>
          </div>

          <div v-else>
            <!-- Date picker -->
            <div class="mb-6">
              <label class="block text-sm text-gray-300 mb-2">Preferred Date *</label>
              <input v-model="booking.date" type="date" :min="minDate" class="input-field" required />
            </div>

            <!-- Time slots -->
            <div class="mb-6">
              <label class="block text-sm text-gray-300 mb-3">Preferred Time Slot *</label>
              <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                <button v-for="slot in timeSlots" :key="slot"
                        type="button"
                        @click="booking.time = slot"
                        class="py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                        :class="booking.time === slot
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30'
                          : 'glass border border-white/10 text-gray-300 hover:border-orange-500/30 hover:text-orange-400'">
                  {{ slot }}
                </button>
              </div>
            </div>

            <div class="flex gap-3">
              <button @click="currentStep = 0" class="btn-outline flex-1 justify-center py-4 text-sm">
                ← Back
              </button>
              <button @click="currentStep = 2"
                      :disabled="!booking.date || !booking.time"
                      class="btn-primary flex-[2] justify-center py-4 disabled:opacity-40">
                Continue → Your Details
              </button>
            </div>
          </div>
        </div>

        <!-- STEP 3: Personal details -->
        <div v-if="currentStep === 2">
          <h3 class="text-lg font-bold text-white mb-6 text-center">Your Details</h3>

          <div class="space-y-4 mb-6">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-400 mb-1">Full Name *</label>
                <input v-model="booking.name" type="text" placeholder="Gurpreet Singh" class="input-field" required />
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1">Phone Number *</label>
                <input v-model="booking.phone" type="tel" placeholder="98765 XXXXX" class="input-field" required />
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-1">Email Address</label>
              <input v-model="booking.email" type="email" placeholder="your@email.com" class="input-field" />
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-1">Additional Notes</label>
              <textarea v-model="booking.notes" rows="3"
                        placeholder="Any specific queries or documents you want to bring?"
                        class="input-field resize-none"></textarea>
            </div>
          </div>

          <!-- Summary card -->
          <div class="glass p-5 rounded-2xl border border-orange-500/20 mb-6">
            <p class="text-sm font-semibold text-orange-400 mb-3">📋 Booking Summary</p>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="flex justify-between"><span class="text-gray-500">Service:</span><span>{{ booking.service }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Meeting Type:</span><span>{{ booking.meetingType === 'online' ? '🎥 Google Meet (Online)' : '🏪 In-Person Visit' }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Date:</span><span>{{ booking.date }}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Time:</span><span>{{ booking.time }}</span></div>
              <div class="flex justify-between font-semibold border-t border-white/5 pt-2 mt-2">
                <span class="text-gray-400">Consultation Fee:</span>
                <span class="text-orange-400">{{ consultationFee === 0 ? 'FREE' : `₹${consultationFee}` }}</span>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="currentStep = 1" class="btn-outline flex-1 justify-center py-4 text-sm">
              ← Back
            </button>
            <button @click="proceedToPayment"
                    :disabled="!booking.name || !booking.phone"
                    class="btn-primary flex-[2] justify-center py-4 disabled:opacity-40">
              {{ consultationFee > 0 ? `💳 Pay ₹${consultationFee} & Confirm` : '✅ Confirm Booking' }}
            </button>
          </div>
        </div>

        <!-- STEP 4: Confirmation -->
        <div v-if="currentStep === 3" class="text-center py-8">
          <div class="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500
                      flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce-gentle">
            ✅
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
          <p class="text-gray-400 mb-6">
            Your meeting has been booked for <strong class="text-orange-400">{{ booking.date }}</strong>
            at <strong class="text-orange-400">{{ booking.time }}</strong>.
          </p>

          <div class="glass p-5 rounded-2xl border border-green-500/20 mb-6 text-left max-w-sm mx-auto">
            <div class="text-sm text-gray-400 space-y-2">
              <p>📱 We will call you at <strong class="text-white">{{ booking.phone }}</strong></p>
              <p v-if="booking.meetingType === 'online'">
                🎥 Google Meet link will be sent to you before the meeting.
              </p>
              <p v-else>
                📍 Visit: Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur
              </p>
            </div>
          </div>

          <div class="flex gap-3 justify-center">
            <a href="https://wa.me/917009073061" target="_blank" class="btn-primary">
              💬 Chat on WhatsApp
            </a>
            <button @click="$emit('close')" class="btn-outline">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, RAZORPAY_KEY_ID, GOOGLE_MEET_BOOKING_URL, CONTACT } from '@/config.js'

defineEmits(['close'])

const currentStep       = ref(0)
const showCalendarEmbed = ref(false)

const booking = ref({
  meetingType: '',
  service:     '',
  date:        '',
  time:        '',
  name:        '',
  phone:       '',
  email:       '',
  notes:       '',
})

const steps = ['Meeting Type', 'Date & Time', 'Your Details', 'Confirmed']

const meetingTypes = [
  { id: 'online',    icon: '🎥', label: 'Online (Google Meet)', desc: 'Video call from your home. Link sent on WhatsApp.' },
  { id: 'in-person', icon: '🏪', label: 'In-Person Visit',      desc: 'Visit our centre at Hiyatpur-Kotli Khass.' },
]

const timeSlots = [
  '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '12:00 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM',
  '4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM',
]

const allServiceNames = [
  'Banking Services','IRCTC Rail Ticket','Aadhaar & PAN Card','HSRP Number Plate',
  'NEFT/RTGS Transfer','Health Card Apply','Kisan ID Card','Voter Card Services',
  'Ration Card Services','Certificates Apply','Online Forms','Sewa Kendra Services',
  'Vehicle Services','Flight & Bus Booking','Website & App Building','Video Production',
  'Printing Services','FASTag & Recharges','General Enquiry / Consultation',
]

const minDate = computed(() => new Date().toISOString().split('T')[0])
const consultationFee = computed(() => booking.value.meetingType === 'online' ? 99 : 0)

async function confirmBooking() {
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email:    CONTACT.email,
        subject:     `📅 New Booking from ${booking.value.name} – ${booking.value.service}`,
        from_name:   booking.value.name,
        from_phone:  booking.value.phone,
        service:     booking.value.service,
        message:     `Meeting Type: ${booking.value.meetingType === 'online' ? 'Google Meet (Online)' : 'In-Person'}\nDate: ${booking.value.date}\nTime: ${booking.value.time}\nNotes: ${booking.value.notes || '—'}`,
        type:        'Meeting Booking',
      },
      EMAILJS_PUBLIC_KEY,
    )
  } catch { /* silent – booking still proceeds */ }
  currentStep.value = 3
}

function proceedToPayment() {
  if (consultationFee.value > 0) {
    const rzp = new window.Razorpay({
      key:         RAZORPAY_KEY_ID,
      amount:      consultationFee.value * 100,
      currency:    'INR',
      name:        'Khalsa HiTech Enterprises',
      description: `Consultation Booking – ${booking.value.service}`,
      prefill: {
        name:    booking.value.name,
        contact: booking.value.phone,
        email:   booking.value.email,
      },
      theme: { color: '#f97316' },
      handler() { confirmBooking() },
    })
    rzp.open()
  } else {
    confirmBooking()
  }
}
</script>
