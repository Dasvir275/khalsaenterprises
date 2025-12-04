# Khalsa Hitech Enterprises - Digital Service Platform

## Overview

Khalsa Hitech Enterprises is a bilingual (Punjabi-English) digital service platform for a computer cafe and service center located in Village Hardhokhundpur, Punjab, India. The application serves as a customer-facing website showcasing comprehensive digital services including banking, travel bookings, government services (Sewa Kendra), document processing, insurance, and AI-powered assistance. The platform is designed with cultural resonance and accessibility in mind, targeting village customers with a familiar, trust-building interface inspired by popular Indian digital service platforms like Paytm and PhonePe.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool. The application follows a component-based architecture with client-side routing using Wouter.

**UI Component System**: Built on shadcn/ui component library (New York style variant) with Radix UI primitives. The design system is heavily customized for the business context with:
- Tailwind CSS for styling with custom color scheme and spacing primitives
- CSS custom properties for theme variables supporting light/dark modes
- Poppins as primary font and Noto Sans Gurmukhi for Punjabi text
- Responsive design with mobile-first approach (breakpoint at 768px)

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. No global state management library is used; component-level state with hooks suffices for the current scope.

**Key Design Decisions**:
- Bilingual UI (Punjabi/English) throughout to serve local demographic
- Large touch targets and readable fonts for accessibility across age groups
- Cultural design elements (orange/saffron color scheme reflecting Khalsa identity)
- Service-focused grid layouts optimized for scanning and discovery

### Backend Architecture

**Runtime**: Node.js with Express.js web framework running in production mode.

**API Structure**: RESTful API with a single endpoint currently implemented:
- `POST /api/chat` - AI chatbot interaction endpoint with request validation using Zod schemas

**Build System**: Custom build script using esbuild for server bundling and Vite for client bundling. The server dependencies are selectively bundled (allowlist approach) to reduce syscalls and improve cold start performance.

**Session & Storage**: 
- In-memory storage implementation (MemStorage) for user data with CRUD interface
- Designed to be database-agnostic with future PostgreSQL migration planned
- User schema defined with Drizzle ORM but currently using memory storage

**Logging**: Custom request/response logging middleware tracking method, path, status code, duration, and response bodies for API routes.

### External Dependencies

**AI Integration**: Google Gemini AI (via @google/genai) powers the "HiTech Bot" chatbot assistant. The bot is configured with extensive domain knowledge about:
- Punjab government services and portals (Sewa Kendra, land records, e-District)
- Banking and financial services
- Travel booking procedures
- Document processing requirements
- Local business context and contact information

The system prompt is carefully crafted to provide helpful, culturally appropriate responses mixing Punjabi and English naturally.

**Planned Database Integration**: 
- Drizzle ORM configured for PostgreSQL (dialect: "postgresql")
- Schema defined in shared/schema.ts with users table
- Migration system configured with drizzle-kit (output to ./migrations directory)
- Database connection awaits DATABASE_URL environment variable

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components (accordion, dialog, dropdown, etc.)
- Embla Carousel for image carousels
- Framer Motion for animations (used in online-services page and chatbot)
- Lucide React for iconography

**Styling Dependencies**:
- Tailwind CSS with PostCSS and Autoprefixer
- class-variance-authority for component variant management
- clsx and tailwind-merge for conditional className composition

**Development Tools**:
- TypeScript for type safety across client and server
- Replit-specific plugins for development (runtime error overlay, cartographer, dev banner)
- Path aliases configured for clean imports (@/ for client/src, @shared for shared code)

**Security Considerations**:
- Input validation using Zod schemas on API endpoints
- Environment variable management for sensitive keys (GEMINI_API_KEY, DATABASE_URL)
- Express middleware configured with JSON body parsing and raw body capture for webhook support

**Asset Management**: Static assets stored in attached_assets directory with Vite alias configuration (@assets) for easy importing. Images include owner photos and hero images for the homepage.

## Vercel Deployment

The application is configured for deployment to Vercel with the following structure:

**Frontend**: Static site built with Vite, deployed to Vercel's CDN
**Backend**: Serverless function in `/api/chat.ts` for HiTech Bot AI integration

**Key Files for Vercel**:
- `vercel.json` - Vercel configuration with build settings and rewrites
- `api/chat.ts` - Serverless function handling chat requests with Gemini AI
- `VERCEL_DEPLOYMENT.md` - Detailed deployment instructions

**Environment Variables for Vercel**:
- `GEMINI_API_KEY` - Required for HiTech Bot chatbot functionality (set in Vercel dashboard)

**Build Command**: `npx vite build`
**Output Directory**: `dist/public`