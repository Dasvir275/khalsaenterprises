<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

    <div class="relative z-10 w-full max-w-6xl max-h-[95vh] overflow-hidden glass-strong rounded-3xl
                border border-orange-500/30 shadow-2xl shadow-orange-500/10 flex flex-col">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400
                      flex items-center justify-center text-xl">✉️</div>
          <div>
            <h2 class="font-bold text-white text-lg">Email Composer</h2>
            <p class="text-xs text-gray-400">Send branded email to client · from dasvirsingh07@gmail.com</p>
          </div>
        </div>
        <button @click="$emit('close')"
                class="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center
                       hover:border-orange-500/40 hover:text-orange-400 transition-all text-gray-400 text-lg">
          ✕
        </button>
      </div>

      <!-- Two-column body -->
      <div class="flex flex-1 overflow-hidden">

        <!-- LEFT: Compose form -->
        <div class="w-full lg:w-1/2 flex flex-col border-r border-white/10 overflow-y-auto">
          <div class="p-6 space-y-4">

            <!-- To -->
            <div>
              <label class="block text-xs text-gray-400 mb-1">To (client email) *</label>
              <input v-model="form.to" type="email" placeholder="client@example.com" class="input-field" />
            </div>

            <!-- Subject -->
            <div>
              <label class="block text-xs text-gray-400 mb-1">Subject *</label>
              <input v-model="form.subject" type="text"
                     placeholder="Your documents are ready | Khalsa HiTech"
                     class="input-field" />
            </div>

            <!-- Quick templates -->
            <div>
              <label class="block text-xs text-gray-400 mb-2">Quick Templates</label>
              <div class="grid grid-cols-2 gap-2">
                <button v-for="t in templates" :key="t.label"
                        type="button" @click="applyTemplate(t)"
                        class="text-left px-3 py-2 rounded-xl text-xs glass border border-white/10
                               hover:border-orange-500/40 hover:text-orange-400 transition-all text-gray-300">
                  {{ t.label }}
                </button>
              </div>
            </div>

            <!-- Message body -->
            <div>
              <label class="block text-xs text-gray-400 mb-1">Message *</label>
              <textarea v-model="form.body" rows="10"
                        placeholder="Write your message here..."
                        class="input-field resize-none font-mono text-sm"></textarea>
            </div>

            <!-- Photo attachment -->
            <div>
              <label class="block text-xs text-gray-400 mb-1">Attach Photo / Document</label>
              <div class="relative">
                <input ref="fileInput" type="file"
                       accept="image/*,.pdf,.doc,.docx"
                       @change="handleFile"
                       class="hidden" />
                <button type="button" @click="fileInput.click()"
                        class="w-full py-3 rounded-xl border-2 border-dashed border-white/20
                               hover:border-orange-500/50 text-gray-400 hover:text-orange-400
                               text-sm transition-all flex items-center justify-center gap-2">
                  <span class="text-xl">📎</span>
                  <span>{{ attachment ? attachment.name : 'Click to attach file (image, PDF, doc)' }}</span>
                </button>
                <button v-if="attachment" type="button" @click="attachment = null"
                        class="absolute top-2 right-3 text-red-400 hover:text-red-300 text-xs">✕ Remove</button>
              </div>
              <p v-if="attachment" class="text-xs text-orange-400 mt-1">
                📎 {{ attachment.name }} ({{ (attachment.size / 1024).toFixed(1) }} KB)
              </p>
            </div>

            <!-- Send button -->
            <button @click="sendEmail" :disabled="sending || !form.to || !form.subject || !form.body"
                    class="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="sending" class="loader mr-2"></span>
              <span>{{ sending ? 'Sending…' : '📨 Send Email' }}</span>
            </button>

            <!-- Status -->
            <Transition name="fade">
              <div v-if="status === 'sent'"
                   class="text-center py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm">
                ✅ Email sent successfully to {{ lastSentTo }}!
              </div>
              <div v-else-if="status === 'error'"
                   class="py-3 px-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm space-y-1">
                <p class="font-semibold">❌ Failed to send</p>
                <p class="text-xs text-red-300 break-all">{{ errorMsg }}</p>
                <p v-if="errorMsg.includes('credential') || errorMsg.includes('env')" class="text-xs text-yellow-400 mt-1">
                  ⚠️ Add EMAIL_USER and EMAIL_PASS in Vercel Dashboard → Settings → Environment Variables, then redeploy.
                </p>
                <p v-if="errorMsg.includes('404') || errorMsg.includes('fetch')" class="text-xs text-yellow-400 mt-1">
                  ⚠️ API routes only work on Vercel. Run <code class="bg-black/30 px-1 rounded">vercel dev</code> locally instead of <code class="bg-black/30 px-1 rounded">npm run dev</code>.
                </p>
              </div>
            </Transition>

          </div>
        </div>

        <!-- RIGHT: Live preview -->
        <div class="hidden lg:flex lg:w-1/2 flex-col overflow-hidden">
          <div class="px-6 py-3 border-b border-white/10 flex items-center gap-2 shrink-0">
            <span class="text-xs text-gray-500 uppercase tracking-widest">Email Preview</span>
            <span class="ml-auto text-xs text-gray-600">as seen by client</span>
          </div>
          <div class="flex-1 overflow-y-auto bg-[#f4f4f4] p-4">
            <!-- Preview email card -->
            <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);font-family:Arial,sans-serif;">

              <!-- Header gradient -->
              <div style="background:linear-gradient(135deg,#f97316,#f59e0b);padding:28px 24px;text-align:center;">
                <div style="width:52px;height:52px;background:rgba(255,255,255,0.2);border-radius:12px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:52px;">🏢</div>
                <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">Khalsa HiTech Enterprises</h1>
                <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:12px;">Technology &amp; Government Services</p>
              </div>

              <!-- Subject bar -->
              <div style="background:#fff7ed;padding:10px 24px;border-bottom:2px solid #fed7aa;">
                <p style="margin:0;font-size:11px;color:#9a3412;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">
                  Re: {{ form.subject || 'Your Subject Here' }}
                </p>
              </div>

              <!-- Body -->
              <div style="padding:24px;background:#fff;">
                <p v-if="form.body" style="margin:0 0 20px;font-size:14px;color:#1a1a1a;line-height:1.75;white-space:pre-wrap;">{{ form.body }}</p>
                <p v-else style="margin:0 0 20px;font-size:14px;color:#aaa;font-style:italic;">Your message will appear here…</p>

                <div style="display:flex;gap:10px;">
                  <span style="display:inline-block;padding:10px 18px;background:linear-gradient(135deg,#f97316,#f59e0b);color:#fff;border-radius:7px;font-size:12px;font-weight:600;">📞 Call Us</span>
                  <span style="display:inline-block;padding:10px 18px;background:#25d366;color:#fff;border-radius:7px;font-size:12px;font-weight:600;">💬 WhatsApp</span>
                </div>

                <div v-if="attachment" style="margin-top:14px;padding:10px 14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;font-size:12px;color:#9a3412;">
                  📎 Attachment: {{ attachment.name }}
                </div>
              </div>

              <!-- Company details -->
              <div style="padding:16px 24px;background:#fafafa;border-top:1px solid #eee;">
                <table style="width:100%;">
                  <tr>
                    <td style="vertical-align:top;">
                      <p style="margin:0 0 3px;font-size:12px;font-weight:700;color:#1a1a1a;">Dasvir Singh</p>
                      <p style="margin:0 0 2px;font-size:11px;color:#666;">B.Tech CSE, Thapar University</p>
                      <p style="margin:0;font-size:11px;color:#f97316;font-weight:600;">SIH 2023 Winner · AI Engineer</p>
                    </td>
                    <td style="vertical-align:top;text-align:right;">
                      <p style="margin:0 0 2px;font-size:11px;color:#555;">📞 70090-73061</p>
                      <p style="margin:0 0 2px;font-size:11px;color:#555;">✉️ dasvirsingh07@gmail.com</p>
                      <p style="margin:0;font-size:11px;color:#555;">🌐 www.khalsaenterprises.com</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Address -->
              <div style="background:#111;padding:14px 24px;text-align:center;">
                <p style="margin:0 0 3px;color:#666;font-size:10px;">📍 Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur, Punjab – 144211</p>
                <p style="margin:0;color:#444;font-size:10px;">⏰ Monday – Saturday: 9:00 AM – 7:00 PM</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['close'])

const fileInput  = ref(null)
const sending    = ref(false)
const status     = ref('')
const errorMsg   = ref('')
const lastSentTo = ref('')
const attachment = ref(null)

const form = ref({ to: '', subject: '', body: '' })

const templates = [
  {
    label: '📄 Documents Ready',
    subject: 'Your Documents are Ready | Khalsa HiTech',
    body: `Dear Customer,

Your documents have been processed and are ready for pickup at our centre.

Please bring your original ID proof when you come to collect them.

Working Hours: Monday – Saturday, 9:00 AM – 7:00 PM

For any queries, please call us at 70090-73061 or reply to this email.

Thank you for choosing Khalsa HiTech Enterprises!

Warm regards,
Dasvir Singh`,
  },
  {
    label: '📅 Appointment Confirmed',
    subject: 'Your Appointment is Confirmed | Khalsa HiTech',
    body: `Dear Customer,

Your appointment with Khalsa HiTech Enterprises has been confirmed.

We look forward to serving you. Please arrive a few minutes early and carry all relevant documents.

If you need to reschedule, call us at 70090-73061.

Warm regards,
Dasvir Singh`,
  },
  {
    label: '💳 Payment Receipt',
    subject: 'Payment Received – Thank You | Khalsa HiTech',
    body: `Dear Customer,

We have received your payment. Thank you!

Your service request is now being processed and we will update you shortly.

For any queries call 70090-73061 or WhatsApp us.

Warm regards,
Dasvir Singh`,
  },
  {
    label: '🔔 Service Update',
    subject: 'Service Status Update | Khalsa HiTech',
    body: `Dear Customer,

We wanted to update you on the status of your service request.

[Write the status/update here]

We will inform you as soon as the process is complete. Thank you for your patience.

Warm regards,
Dasvir Singh`,
  },
]

function applyTemplate(t) {
  form.value.subject = t.subject
  form.value.body    = t.body
}

function handleFile(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    attachment.value = {
      name: file.name,
      size: file.size,
      type: file.type,
      data: reader.result.split(',')[1], // base64 only
    }
  }
  reader.readAsDataURL(file)
}

async function sendEmail() {
  sending.value = true
  status.value  = ''
  errorMsg.value = ''
  try {
    const res  = await fetch('/api/send-client-email', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        to:         form.value.to,
        subject:    form.value.subject,
        body:       form.value.body,
        attachment: attachment.value,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || `Server error ${res.status}`)
    lastSentTo.value = form.value.to
    status.value     = 'sent'
    form.value       = { to: '', subject: '', body: '' }
    attachment.value = null
    setTimeout(() => { status.value = '' }, 6000)
  } catch (err) {
    status.value   = 'error'
    errorMsg.value = err.message || 'Unknown error'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
