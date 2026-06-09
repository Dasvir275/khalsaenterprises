<template>
  <!-- ── Floating Trigger Button ─────────────────────────────────────────── -->
  <div class="fixed bottom-12 right-5 z-50">
    <div class="relative">
      <!-- Pulse rings behind the button -->
      <span v-if="!isOpen"
            class="absolute inset-0 rounded-full bg-orange-500/30 animate-ripple pointer-events-none" />
      <span v-if="!isOpen"
            class="absolute inset-0 rounded-full bg-orange-500/20 animate-ripple pointer-events-none"
            style="animation-delay:0.6s" />

      <button @click="toggleChat"
              class="relative w-14 h-14 rounded-full flex items-center justify-center text-2xl
                     bg-gradient-to-br from-orange-500 to-amber-400 text-white
                     shadow-2xl shadow-orange-500/50 hover:scale-110 transition-transform duration-300 animate-glow">
        <Transition name="icon-flip">
          <span :key="isOpen ? 'close' : 'chat'">{{ isOpen ? '✕' : '🤖' }}</span>
        </Transition>
      </button>

      <!-- Unread badge -->
      <span v-if="!isOpen && unread > 0"
            class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs
                   flex items-center justify-center font-bold animate-bounce">
        {{ unread }}
      </span>
    </div>
  </div>

  <!-- ── Chat Window ─────────────────────────────────────────────────────── -->
  <Transition name="chat-window">
    <div v-if="isOpen"
         class="fixed bottom-32 right-5 z-50 w-[22rem] sm:w-96 flex flex-col glass-strong rounded-3xl
                border border-orange-500/20 shadow-2xl shadow-orange-500/15 overflow-hidden"
         style="height: 560px; max-height: 80vh;">

      <!-- Header -->
      <div class="flex items-center gap-3 px-4 py-3.5 border-b border-white/5
                  bg-gradient-to-r from-orange-500/10 to-amber-500/5 shrink-0">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-400
                      flex items-center justify-center text-lg shadow-lg shadow-orange-500/30">
            🤖
          </div>
          <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#14142a]"></span>
        </div>
        <div class="flex-1">
          <p class="font-bold text-sm text-white">HiTech Bot</p>
          <p class="text-xs text-green-400">{{ isTyping ? 'typing…' : 'Online · Powered by AI' }}</p>
        </div>
        <!-- Language toggle -->
        <button @click="langPunjabi = !langPunjabi"
                class="text-xs px-2 py-1 rounded-full glass border border-white/10 text-gray-400
                       hover:border-orange-500/30 hover:text-orange-400 transition-colors mr-1">
          {{ langPunjabi ? 'EN' : 'ਪੰ' }}
        </button>
        <button @click="isOpen = false"
                class="text-gray-400 hover:text-white transition-colors text-lg">✕</button>
      </div>

      <!-- Messages -->
      <div ref="msgContainer"
           class="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
           style="scrollbar-width: thin; scrollbar-color: #f97316 transparent;">

        <!-- Welcome / suggestions (shown when no messages) -->
        <div v-if="messages.length === 0" class="space-y-3">
          <div class="chat-bubble-bot px-4 py-3 text-sm text-gray-200 msg-in">
            <p class="font-medium mb-1">👋 ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! Hello!</p>
            <p>I'm HiTech Bot, your digital services assistant at <strong>Khalsa HiTech Enterprises</strong>, Hiyatpur-Kotli Khass.</p>
            <p class="mt-2 text-xs text-gray-400">Ask me about IRCTC tickets, Aadhaar, health cards, banking, HSRP, or any digital service!</p>
          </div>

          <p class="text-xs text-gray-500 text-center">Suggested questions:</p>
          <div class="flex flex-wrap gap-2">
            <button v-for="q in suggestions" :key="q"
                    @click="sendSuggestion(q)"
                    class="text-xs px-3 py-1.5 rounded-full glass border border-orange-500/20 text-orange-300
                           hover:bg-orange-500/15 hover:border-orange-500/40 transition-all duration-200">
              {{ q }}
            </button>
          </div>
        </div>

        <!-- Message bubbles -->
        <div v-for="(msg, i) in messages" :key="i" class="space-y-1">
          <div :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start gap-2'">
            <!-- Bot avatar -->
            <div v-if="msg.role === 'assistant'"
                 class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-400
                        flex items-center justify-center text-sm shrink-0 mt-0.5">
              🤖
            </div>

            <div class="max-w-[80%] space-y-2">
              <!-- Text bubble -->
              <div class="px-4 py-3 text-sm leading-relaxed msg-in"
                   :class="msg.role === 'user' ? 'chat-bubble-user text-white' : 'chat-bubble-bot text-gray-200'">
                {{ msg.content }}
              </div>

              <!-- Inline payment button (when AI suggests it) -->
              <div v-if="msg.payment" class="msg-in">
                <button @click="openInlinePayment(msg.payment)"
                        class="w-full py-2.5 px-4 rounded-2xl text-sm font-semibold
                               bg-gradient-to-r from-blue-600 to-violet-600 text-white
                               hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all
                               flex items-center justify-center gap-2">
                  💳 Pay ₹{{ msg.payment.amount }} – {{ msg.payment.label }}
                </button>
              </div>

              <!-- Payment success badge -->
              <div v-if="msg.paymentDone"
                   class="px-3 py-2 rounded-xl bg-green-500/15 border border-green-500/30
                          text-green-400 text-xs flex items-center gap-2 msg-in">
                ✅ Payment confirmed! ID: {{ msg.paymentId }}
              </div>
            </div>
          </div>

          <!-- Timestamp -->
          <p class="text-[10px] text-gray-600" :class="msg.role === 'user' ? 'text-right' : 'text-left ml-9'">
            {{ msg.time }}
          </p>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="flex items-end gap-2">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-400
                      flex items-center justify-center text-sm">
            🤖
          </div>
          <div class="chat-bubble-bot px-4 py-3 flex items-center gap-1.5">
            <span v-for="j in 3" :key="j"
                  class="w-2 h-2 rounded-full bg-gray-400"
                  :style="{ animation: `bounce 1.2s ${(j-1)*0.2}s ease-in-out infinite` }"></span>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="shrink-0 border-t border-white/5 p-3 space-y-2">
        <!-- Voice status bar -->
        <div v-if="isRecording"
             class="flex items-center justify-center gap-2 py-2 px-3 rounded-xl
                    bg-red-500/15 border border-red-500/30 text-red-400 text-xs">
          <span class="w-2 h-2 rounded-full bg-red-400 mic-recording"></span>
          Recording… tap mic to stop
        </div>

        <div class="flex items-end gap-2">
          <!-- Text input -->
          <textarea v-model="inputText"
                    @keydown.enter.exact.prevent="send"
                    rows="1"
                    placeholder="Type or speak your question…"
                    class="flex-1 input-field py-2.5 text-sm resize-none min-h-[40px] max-h-24"
                    style="field-sizing: content;"
                    ref="inputRef" />

          <!-- Mic button (Sarvam STT) -->
          <button @mousedown="startRec" @mouseup="stopRec" @touchstart.prevent="startRec" @touchend.prevent="stopRec"
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all"
                  :class="isRecording
                    ? 'bg-red-500/80 text-white shadow-lg shadow-red-500/40 scale-110 mic-recording'
                    : 'glass border border-white/10 text-gray-400 hover:border-orange-500/30 hover:text-orange-400'"
                  :title="isRecording ? 'Release to send' : 'Hold to speak (Punjabi/Hindi/English)'">
            🎙️
          </button>

          <!-- Send button -->
          <button @click="send" :disabled="!inputText.trim() || isTyping"
                  class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all
                         bg-gradient-to-br from-orange-500 to-amber-400 text-white
                         hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105
                         disabled:opacity-40 disabled:cursor-not-allowed">
            ➤
          </button>
        </div>

        <p class="text-center text-[10px] text-gray-600">
          HiTech Bot · AI by OpenAI · Voice by Sarvam AI · Payments by Razorpay
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { OPENAI_API_KEY, SARVAM_API_KEY, RAZORPAY_KEY_ID, CONTACT } from '@/config.js'

// ── State ────────────────────────────────────────────────────────────────────
const isOpen      = ref(false)
const isTyping    = ref(false)
const isRecording = ref(false)
const langPunjabi = ref(false)
const unread      = ref(1)
const inputText   = ref('')
const messages    = ref([])
const msgContainer = ref(null)
const inputRef    = ref(null)

let mediaRecorder = null
let audioChunks   = []

// ── Suggestions ───────────────────────────────────────────────────────────────
const suggestions = [
  '🚂 IRCTC train ticket',
  '🪪 Aadhaar card update',
  '🏥 Health card apply',
  '🚗 HSRP number plate',
  '💸 NEFT/RTGS transfer',
  '💳 Mini ATM services',
  '📅 Book meeting',
]

// ── System prompt (context about the business) ────────────────────────────────
const SYSTEM_PROMPT = `You are HiTech Bot, the friendly AI assistant for Khalsa HiTech Enterprises, a Digital Seva Kendra.

BUSINESS INFO:
- Name: Khalsa HiTech Enterprises (ਖਾਲਸਾ ਇੰਟਰਪ੍ਰਾਈਜ਼)
- Tagline: ਡਿਜੀਟਲ ਸੇਵਾ ਕੇਂਦਰ – ਸੰਪੂਰਨ ਡਿਜੀਟਲ ਹੱਲ (Digital Seva Kendra – Complete Digital Solution)
- Owner: Dasvir Singh (B.Tech CSE, Thapar University | Smart India Hackathon 2023 Winner)
- Location: Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur, Punjab
- Phone: 70090-73061
- Email: dasvirsingh07@gmail.com
- Hours: Monday–Saturday 9 AM – 7 PM

SERVICES & PRICES:
1. Banking Services (SBI/HDFC/PNB/AXIS) – from ₹100
2. Mini ATM (FIRST IN AREA) – cash withdrawal, balance, statement
3. NEFT/RTGS/IMPS Transfer – from ₹20
4. IRCTC Rail Ticket Booking – service ₹30
5. Flight & Bus Booking – from ₹50
6. Aadhaar Card new/update/download – from ₹100
7. PAN Card new/correction – from ₹100
8. Voter Card apply/correction – from ₹100
9. Ration Card apply/correction – from ₹150
10. Kisan ID Card / PM Kisan – from ₹100
11. Ayushman / ABHA Health Card – from ₹100
12. CM Sehat Card Punjab – from ₹100
13. HSRP Number Plate – from ₹400
14. Vehicle RC/Insurance/FASTag – from ₹200
15. Sewa Kendra (DL/Mutation/Fard) – from ₹200
16. Certificates (Birth/Caste/Income etc.) – from ₹100
17. Online Forms (Passport/ITR/GST) – from ₹50
18. Insurance & Investment Services – Free consultation
19. Website & App Building – from ₹5,000
20. Video Production – from ₹500
21. Printing & Scanning – B&W ₹2/page

IMPORTANT INSTRUCTIONS:
- Respond in a friendly, helpful mix of Punjabi and English (Hinglish style) unless user writes in pure English.
- Always be helpful and positive.
- For payment-required actions, include a special tag at the END of your response: [PAY:AMOUNT:LABEL]
  Example: [PAY:30:IRCTC Rail Ticket Booking] or [PAY:100:Aadhaar Card Update]
- Only include the PAY tag if the user is clearly ready to proceed with a service.
- For meeting bookings, mention the Google Calendar booking option.
- Always mention calling 70090-73061 for urgent matters.
- Keep responses concise (under 150 words).`

// ── Toggle chat ────────────────────────────────────────────────────────────
function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) { unread.value = 0; nextTick(() => inputRef.value?.focus()) }
}

// ── Auto-scroll ───────────────────────────────────────────────────────────
watch(messages, () => { nextTick(scrollBottom) }, { deep: true })
watch(isTyping,  () => { nextTick(scrollBottom) })
function scrollBottom() {
  if (msgContainer.value)
    msgContainer.value.scrollTop = msgContainer.value.scrollHeight
}

// ── Helpers ───────────────────────────────────────────────────────────────
function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

function parsePayTag(text) {
  const m = text.match(/\[PAY:(\d+):([^\]]+)\]/)
  if (!m) return { clean: text, payment: null }
  return { clean: text.replace(/\[PAY:\d+:[^\]]+\]/, '').trim(), payment: { amount: parseInt(m[1]), label: m[2] } }
}

// ── Send suggestion ────────────────────────────────────────────────────────
function sendSuggestion(q) {
  inputText.value = q
  send()
}

// ── Send message ──────────────────────────────────────────────────────────
async function send() {
  const text = inputText.value.trim()
  if (!text || isTyping.value) return
  inputText.value = ''

  messages.value.push({ role: 'user', content: text, time: now() })
  isTyping.value = true

  try {
    const history = messages.value
      .filter(m => m.role !== 'system')
      .map(m => ({ role: m.role, content: m.content }))

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    if (!res.ok) throw new Error(`OpenAI error ${res.status}`)
    const data = await res.json()
    const raw  = data.choices?.[0]?.message?.content || 'Sorry, I could not process that.'
    const { clean, payment } = parsePayTag(raw)

    messages.value.push({ role: 'assistant', content: clean, payment, time: now() })
  } catch (err) {
    console.error('Chat error:', err)
    messages.value.push({
      role: 'assistant',
      content: 'Sorry, I had a connection issue. Please call us directly at 70090-73061 or WhatsApp.',
      payment: null,
      time: now(),
    })
  } finally {
    isTyping.value = false
  }
}

// ── Sarvam Speech-to-Text ─────────────────────────────────────────────────
async function startRec() {
  if (isRecording.value) return
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    audioChunks   = []
    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) audioChunks.push(e.data) }
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop())
      const blob = new Blob(audioChunks, { type: 'audio/webm' })
      await transcribe(blob)
    }
    mediaRecorder.start()
    isRecording.value = true
  } catch (e) {
    alert('Microphone access denied. Please allow microphone access.')
  }
}

function stopRec() {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop()
    isRecording.value = false
  }
}

async function transcribe(audioBlob) {
  isTyping.value = true
  try {
    const formData = new FormData()
    formData.append('file', audioBlob, 'recording.webm')
    formData.append('language_code', 'pa-IN')    // Punjabi primary
    formData.append('model', 'saarika:v2')

    const res = await fetch('https://api.sarvam.ai/speech-to-text', {
      method:  'POST',
      headers: { 'api-subscription-key': SARVAM_API_KEY },
      body:    formData,
    })

    if (!res.ok) throw new Error(`Sarvam error ${res.status}`)
    const data = await res.json()
    const transcript = data.transcript || ''

    if (transcript.trim()) {
      inputText.value = transcript
      await send()
    } else {
      messages.value.push({
        role: 'assistant',
        content: 'Sorry, I could not understand the audio. Please try again or type your question.',
        time: now(),
      })
    }
  } catch (e) {
    console.error('Sarvam STT error:', e)
    // Fallback: try Web Speech API
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      useWebSpeech()
    } else {
      messages.value.push({
        role: 'assistant',
        content: 'Voice recognition unavailable. Please type your question.',
        time: now(),
      })
    }
  } finally {
    isTyping.value = false
  }
}

function useWebSpeech() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  const rec = new SR()
  rec.lang = 'pa-IN'
  rec.onresult = e => {
    inputText.value = e.results[0][0].transcript
    send()
  }
  rec.start()
}

// ── Inline Razorpay from chat ─────────────────────────────────────────────
function openInlinePayment({ amount, label }) {
  const rzp = new window.Razorpay({
    key:         RAZORPAY_KEY_ID,
    amount:      amount * 100,
    currency:    'INR',
    name:        'Khalsa HiTech Enterprises',
    description: label,
    theme:       { color: '#f97316' },
    handler(response) {
      const lastMsg = messages.value[messages.value.length - 1]
      if (lastMsg) {
        lastMsg.payment    = null
        lastMsg.paymentDone = true
        lastMsg.paymentId   = response.razorpay_payment_id
      }
      messages.value.push({
        role: 'assistant',
        content: `✅ Payment of ₹${amount} for "${label}" confirmed! Payment ID: ${response.razorpay_payment_id}. We will contact you at your registered number shortly. Thank you for choosing Khalsa HiTech Enterprises! 🙏`,
        time: now(),
      })
    },
  })
  rzp.open()
}
</script>

<style scoped>
/* Chat window enter/leave */
.chat-window-enter-active { transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); }
.chat-window-leave-active { transition: all 0.25s ease; }
.chat-window-enter-from   { opacity: 0; transform: scale(0.8) translateY(20px) translateX(20px); transform-origin: bottom right; }
.chat-window-leave-to     { opacity: 0; transform: scale(0.9) translateY(10px); }

/* Icon flip */
.icon-flip-enter-active, .icon-flip-leave-active { transition: all 0.2s; }
.icon-flip-enter-from { transform: rotate(-90deg) scale(0); opacity: 0; }
.icon-flip-leave-to   { transform: rotate(90deg) scale(0); opacity: 0; }

/* Bounce dots for typing indicator */
@keyframes bounce {
  0%,60%,100% { transform: translateY(0); }
  30%          { transform: translateY(-6px); }
}
</style>
