<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4"
       @click.self="$emit('close')">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/75 backdrop-blur-md"></div>

    <!-- Modal panel -->
    <div class="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl
                border border-orange-500/20 shadow-2xl shadow-orange-500/10">

      <!-- Header bar -->
      <div class="sticky top-0 z-10 glass-strong border-b border-white/5 px-6 py-4 flex items-center justify-between rounded-t-3xl">
        <div class="flex items-center gap-3">
          <span class="text-3xl">{{ service.icon }}</span>
          <div>
            <h2 class="font-bold text-white text-lg">{{ service.title }}</h2>
            <p class="text-xs text-gray-400 font-punjabi">{{ service.titlePunjabi }}</p>
          </div>
        </div>
        <button @click="$emit('close')"
                class="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center
                       hover:border-orange-500/40 hover:text-orange-400 transition-all text-gray-400 text-lg">
          ✕
        </button>
      </div>

      <div class="p-6 grid md:grid-cols-2 gap-8">

        <!-- Left: Service info -->
        <div>
          <!-- Gradient header card -->
          <div class="rounded-2xl p-6 mb-6 relative overflow-hidden"
               :style="{ background: `linear-gradient(135deg, ${service.glowColor.replace('0.25','0.4')}, rgba(0,0,0,0.5))` }">
            <div class="text-5xl mb-3">{{ service.icon }}</div>
            <h3 class="text-xl font-bold text-white mb-2">{{ service.title }}</h3>
            <p class="text-gray-300 text-sm">{{ service.description }}</p>
            <div class="mt-4 flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-black/30 text-orange-400 text-xs font-semibold border border-orange-500/30">
                {{ service.price }}
              </span>
              <span v-if="service.badge"
                    class="px-3 py-1 rounded-full bg-black/30 text-green-400 text-xs font-semibold border border-green-500/30">
                {{ service.badge }}
              </span>
            </div>
          </div>

          <!-- Features list -->
          <div class="space-y-2 mb-6">
            <p class="text-sm font-semibold text-gray-300 mb-3">✅ What we provide:</p>
            <div v-for="detail in service.details" :key="detail"
                 class="flex items-start gap-3 glass p-3 rounded-xl border border-white/5">
              <span class="text-green-400 mt-0.5 shrink-0">✓</span>
              <span class="text-sm text-gray-300">{{ detail }}</span>
            </div>
          </div>

          <!-- Quick contact -->
          <div class="glass p-4 rounded-2xl border border-orange-500/20">
            <p class="text-sm text-orange-400 font-medium mb-3">📞 Quick Contact</p>
            <div class="flex flex-col gap-2">
              <a href="tel:+917009073061"
                 class="btn-outline text-sm py-2 justify-center">
                📞 Call: 70090-73061
              </a>
              <a href="https://wa.me/917009073061"
                 target="_blank"
                 class="flex items-center justify-center gap-2 py-2 rounded-full text-sm font-semibold
                        bg-green-600/80 hover:bg-green-500 text-white transition-colors border border-green-500/30">
                💬 WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div>
          <h3 class="text-lg font-bold text-white mb-1">Book This Service</h3>
          <p class="text-gray-400 text-sm mb-5">Fill the form and we'll contact you within a few hours.</p>

          <form @submit.prevent="submitForm" class="space-y-4">
            <template v-for="field in service.formFields" :key="field.id">

              <!-- Text / Tel / Email / Number / Date -->
              <div v-if="['text','tel','email','number','date'].includes(field.type)">
                <label class="block text-xs text-gray-400 mb-1">
                  {{ field.label }} <span v-if="field.required" class="text-orange-400">*</span>
                </label>
                <input v-model="formData[field.id]"
                       :type="field.type"
                       :placeholder="field.label"
                       :required="field.required"
                       class="input-field" />
              </div>

              <!-- Select -->
              <div v-else-if="field.type === 'select'">
                <label class="block text-xs text-gray-400 mb-1">
                  {{ field.label }} <span v-if="field.required" class="text-orange-400">*</span>
                </label>
                <select v-model="formData[field.id]"
                        :required="field.required"
                        class="select-field">
                  <option value="">Select {{ field.label }}...</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                </select>
              </div>

              <!-- Textarea -->
              <div v-else-if="field.type === 'textarea'">
                <label class="block text-xs text-gray-400 mb-1">{{ field.label }}</label>
                <textarea v-model="formData[field.id]"
                          rows="3"
                          :placeholder="field.label"
                          class="input-field resize-none"></textarea>
              </div>
            </template>

            <!-- Submit + Pay buttons -->
            <div class="space-y-3 pt-2">
              <button type="submit" :disabled="sending"
                      class="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                <span v-if="sending" class="loader"></span>
                <span v-else>📨 Submit Request</span>
              </button>

              <button type="button" @click="payWithRazorpay"
                      :disabled="!canPay"
                      class="w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300
                             flex items-center justify-center gap-2
                             bg-gradient-to-r from-blue-600 to-violet-600 text-white
                             hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105
                             disabled:opacity-40 disabled:cursor-not-allowed">
                💳 Pay Consultation Fee (₹{{ service.consultationFee }})
              </button>
            </div>

            <!-- Success / Error messages -->
            <Transition name="fade">
              <div v-if="submitted"
                   class="p-4 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm text-center">
                ✅ Request submitted! We'll contact you at {{ formData.phone || 'your number' }} shortly.
              </div>
            </Transition>
            <Transition name="fade">
              <div v-if="paymentSuccess"
                   class="p-4 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 text-sm text-center">
                💳 Payment successful! Payment ID: {{ paymentId }}
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, RAZORPAY_KEY_ID, CONTACT } from '@/config.js'

const props = defineProps({ service: { type: Object, required: true } })
const emit  = defineEmits(['close'])

const sending        = ref(false)
const submitted      = ref(false)
const paymentSuccess = ref(false)
const paymentId      = ref('')

const formData = reactive({})

onMounted(() => {
  // Initialise formData keys
  props.service.formFields.forEach(f => { formData[f.id] = '' })
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => { document.body.style.overflow = '' })

const canPay = computed(() => props.service.consultationFee > 0)

async function submitForm() {
  sending.value = true
  try {
    const fields = Object.entries(formData)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        service_name: props.service.title,
        from_name:    formData.name  || 'Customer',
        from_phone:   formData.phone || 'N/A',
        from_email:   formData.email || 'N/A',
        message:      fields,
        to_email:     CONTACT.email,
      },
      EMAILJS_PUBLIC_KEY,
    )
    submitted.value = true
    setTimeout(() => { submitted.value = false }, 6000)
  } catch {
    alert('Could not send request. Please call 70090-73061 directly.')
  } finally {
    sending.value = false
  }
}

function payWithRazorpay() {
  const options = {
    key:         RAZORPAY_KEY_ID,
    amount:      props.service.consultationFee * 100,
    currency:    'INR',
    name:        'Khalsa HiTech Enterprises',
    description: `${props.service.title} – Consultation Fee`,
    image:       '',
    prefill: {
      name:    formData.name  || '',
      contact: formData.phone || '',
      email:   formData.email || '',
    },
    theme: { color: '#f97316' },
    handler(response) {
      paymentId.value      = response.razorpay_payment_id
      paymentSuccess.value = true
      // Also auto-submit the form
      submitForm()
    },
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
