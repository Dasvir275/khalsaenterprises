// ─────────────────────────────────────────────────────────────────────────────
// ⚠️  SECURITY NOTICE
// API keys below are visible to anyone who views your page source.
// For production, proxy these calls through a backend or serverless function.
// ─────────────────────────────────────────────────────────────────────────────

// OpenAI – used by HiTech Bot chat agent
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''

// Sarvam AI – speech-to-text (Punjabi/Hindi/English)
export const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY || ''

// Razorpay – PUBLIC key only (secret key must NEVER appear in frontend)
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || ''

// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Setup (required for service forms → email to you)
// 1. Sign up at https://www.emailjs.com/
// 2. Add Email Service → Gmail → use dasvirsingh07@gmail.com
//    App Password: abcd fgtyu tyui  (enter in EmailJS dashboard, NOT here)
// 3. Create Email Template – add variables: {{service_name}}, {{from_name}},
//    {{from_phone}}, {{from_email}}, {{message}}, {{to_email}}
// 4. Copy Service ID, Template ID, Public Key below
// ─────────────────────────────────────────────────────────────────────────────
export const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // e.g. service_abc123
export const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. template_xyz789
export const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // e.g. aBcDeFgHiJkLmNop

// ─────────────────────────────────────────────────────────────────────────────
// Google Meet Booking
// 1. Go to Google Calendar → Settings → Appointment schedules
// 2. Create a schedule with your availability
// 3. Paste the booking page URL below
// ─────────────────────────────────────────────────────────────────────────────
export const GOOGLE_MEET_BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/YOUR_SCHEDULE_ID'

export const CONTACT = {
  name:          'Dasvir Singh',
  phone:         '70090-73061',
  whatsapp:      '7009073061',
  email:         'dasvirsingh07@gmail.com',
  website:       'www.khalsaenterprises.com',
  address:       'Village Hiyatpur-Kotli Khass, Tehsil Mukerian, Hoshiarpur, Punjab',
  pincode:       '144211',
  hours:         'Monday – Saturday: 9:00 AM – 7:00 PM',
  qualification: 'B.Tech CSE, Thapar University, Patiala',
  achievement:   'Smart India Hackathon 2023 Winner | AI Software Engineer',
}
