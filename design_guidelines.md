# Design Guidelines for Khalsa Hitech Enterprises

## Design Approach
**Reference-Based Approach** drawing inspiration from Indian digital service platforms (Paytm, PhonePe) and government service portals to create familiarity and trust with village customers. Professional, clean aesthetic that balances modernity with accessibility for all age groups.

## Core Design Principles
1. **Trust & Credibility**: Professional appearance with clear service organization
2. **Cultural Resonance**: Punjabi-English bilingual design with appropriate cultural elements
3. **Service Clarity**: Easy-to-scan service categories with visual hierarchy
4. **Accessibility**: Large touch targets, readable fonts for all demographics

## Typography
- **Primary Font**: Poppins (Google Fonts) - clean, modern, supports both English and Devanagari
- **Secondary Font**: Noto Sans Punjabi (Google Fonts) - for Punjabi text
- **Hierarchy**:
  - Hero/Main Headings: 3xl to 5xl, font-bold
  - Section Headings: 2xl to 3xl, font-semibold
  - Service Titles: lg to xl, font-medium
  - Body Text: base, font-normal
  - Small Print/Contact: sm, font-normal

## Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Section padding: py-12 (mobile), py-16 to py-20 (desktop)
- Component spacing: gap-4 to gap-8
- Container: max-w-7xl with px-4 to px-8

## Page Structure

### Homepage

**Hero Section** (80vh):
- Large hero image showing modern computer cafe interior with customers
- Overlaid company name "KHALSA HITECH ENTERPRISES" (5xl, bold)
- Bilingual tagline (Punjabi/English): "ਤੁਹਾਡੀ ਡਿਜੀਟਲ ਸੇਵਾ | Your Digital Service Partner"
- Village name and primary contact prominently displayed
- Blurred background button: "View All Services" with subtle hover glow

**Owner Profile Section**:
- Two-column layout (image left, credentials right on desktop; stacked mobile)
- Professional photo with rounded corners and subtle shadow
- Qualifications clearly listed with icons
- Brief introduction in both languages

**Services Showcase** (Multi-column Grid):
- 3-column grid on desktop (2-col tablet, 1-col mobile)
- Service category cards with:
  - Icon (Heroicons) at top
  - Bilingual category heading
  - 3-4 key services listed
  - Subtle hover elevation effect
- Categories: Banking & Finance, Travel Bookings, Sewa Kendra, Legal Services, Digital Services, Document Services, Insurance & Investment, Mini ATM (highlighted as "First in Area")

**Special Features Highlight Section**:
- Horizontal cards showcasing unique offerings:
  - AI-Powered Services (website/app building, movie making)
  - Mini ATM (prominently featured as area-first)
  - Document services with AI features
- Each card includes brief description in both languages

**HiTech Bot Preview Section**:
- Centered introduction to AI chatbot
- Chat interface mockup showing sample Punjab-specific queries
- "Chat Now" call-to-action button

**Contact Section**:
- Full-width banner with gradient background
- Contact number in extra-large text (3xl+)
- Address and operating hours in both languages
- Quick contact button (WhatsApp integration if possible)

### Online Services Page

**Coming Soon Section**:
- Full-height centered content
- Animated gradient background (subtle, professional)
- Large "Coming Soon" text in both languages
- Animated loading dots or pulsing effect
- Notification signup form (email/phone)
- Return to homepage link

## Component Library

**Service Cards**:
- White background with subtle border
- Icon (2xl) in brand accent color
- Padding: p-6
- Rounded corners: rounded-lg
- Hover: subtle shadow elevation, scale-105 transform

**Contact Buttons**:
- Large, rounded-full design
- Blurred glass effect when over images
- Clear padding: px-8 py-3
- Icon + text combination

**Language Toggle**:
- Compact switch in header
- "ਪੰਜਾਬੀ | English" indicator

**HiTech Bot Widget**:
- Fixed bottom-right position
- Circular chat icon with notification badge
- Expands to chat interface overlay
- Bilingual interface with auto-detect

## Images

**Required Images**:
1. **Hero Image**: Modern computer cafe interior showing workstations, customers being served, clean and professional environment (full-width, 80vh)
2. **Owner Photo**: Professional portrait against neutral background (provided by user - WhatsApp image)
3. **Mini ATM Feature**: Photo of Mini ATM device/setup (highlight card)
4. **Service Icons**: Use Heroicons for all service category icons - banking, travel, document, education, etc.

**Image Treatment**:
- Hero: Subtle dark overlay (20-30% opacity) for text readability
- Cards: None required, use icons instead
- Profile: Subtle shadow, rounded-lg corners

## Animations
Use very sparingly:
- Hero text fade-in on load
- Service cards subtle hover elevation
- Coming Soon page: gentle pulsing animation on text/dots
- Scroll-triggered fade-ins for sections (optional, keep subtle)

## Accessibility
- All interactive elements minimum 44x44px touch target
- High contrast text on all backgrounds
- Alt text for all images in both languages
- Keyboard navigation support
- Screen reader friendly structure

## Bilingual Implementation
- Header/Section titles: Punjabi on top, English below (or side-by-side on desktop)
- Service descriptions: English primary with Punjabi translations
- Buttons/CTAs: Bilingual labels
- Maintain consistent translation positioning throughout