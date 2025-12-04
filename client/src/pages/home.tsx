import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Phone, 
  MapPin, 
  Banknote, 
  Plane, 
  Car, 
  FileText, 
  CreditCard,
  Printer,
  Globe,
  Film,
  FileCheck,
  Shield,
  TrendingUp,
  Building,
  Fuel,
  Smartphone,
  Bot,
  Sparkles,
  ChevronRight,
  Clock,
  Star,
  Zap,
  Users
} from "lucide-react";
import ownerPhoto from "@assets/WhatsApp_Image_2025-12-04_at_20.52.37_1764861776550.jpeg";
import heroImage from "@assets/generated_images/modern_computer_cafe_interior.png";

const services = [
  {
    icon: Banknote,
    title: "Banking Services",
    titlePunjabi: "ਬੈਂਕਿੰਗ ਸੇਵਾਵਾਂ",
    services: [
      "Online Bank Account Open (SBI, HDFC, PNB, AXIS, etc.)",
      "Net Banking Setup & Support",
      "Account Related Services"
    ],
    highlight: false
  },
  {
    icon: Plane,
    title: "Travel Bookings",
    titlePunjabi: "ਯਾਤਰਾ ਬੁਕਿੰਗ",
    services: [
      "Flight Ticket Booking",
      "Train Booking (Tatkal, Vande Bharat)",
      "Volvo Bus Booking"
    ],
    highlight: false
  },
  {
    icon: Car,
    title: "Sewa Kendra Services",
    titlePunjabi: "ਸੇਵਾ ਕੇਂਦਰ",
    services: [
      "Driving Licence Apply/Renew",
      "Learner License",
      "Vehicle RC Services"
    ],
    highlight: false
  },
  {
    icon: FileText,
    title: "Legal & Registry",
    titlePunjabi: "ਕਾਨੂੰਨੀ ਸੇਵਾਵਾਂ",
    services: [
      "Online Registry",
      "Fard (Land Record)",
      "Intikal Fard"
    ],
    highlight: false
  },
  {
    icon: CreditCard,
    title: "Mini ATM",
    titlePunjabi: "ਮਿਨੀ ਏਟੀਐਮ",
    services: [
      "Cash Withdrawal with ATM Card",
      "Google Pay / PhonePe Accepted",
      "Quick & Secure Transactions"
    ],
    highlight: true,
    badge: "First in Area"
  },
  {
    icon: Banknote,
    title: "Money Transfer",
    titlePunjabi: "ਪੈਸੇ ਟ੍ਰਾਂਸਫਰ",
    services: [
      "NEFT Transfer",
      "RTGS Transfer",
      "IMPS Instant Transfer"
    ],
    highlight: false
  },
  {
    icon: Printer,
    title: "Printing Services",
    titlePunjabi: "ਪ੍ਰਿੰਟਿੰਗ ਸੇਵਾਵਾਂ",
    services: [
      "Laser Printing",
      "Document Scanning",
      "Photocopying"
    ],
    highlight: false
  },
  {
    icon: Globe,
    title: "Website & App Building",
    titlePunjabi: "ਵੈੱਬਸਾਈਟ ਅਤੇ ਐਪ",
    services: [
      "Custom Website Development",
      "Mobile App Building",
      "Free Cloud Support with AI Features"
    ],
    highlight: true,
    badge: "AI Powered"
  },
  {
    icon: Film,
    title: "Video Production",
    titlePunjabi: "ਵੀਡੀਓ ਪ੍ਰੋਡਕਸ਼ਨ",
    services: [
      "Short Movie Making",
      "AI-Enhanced Editing",
      "Professional Quality Output"
    ],
    highlight: false
  },
  {
    icon: FileCheck,
    title: "Document Services",
    titlePunjabi: "ਦਸਤਾਵੇਜ਼ ਸੇਵਾਵਾਂ",
    services: [
      "Aadhaar Card Services",
      "PAN Card Apply/Update",
      "Duplicate Documents (AI-Enabled)"
    ],
    highlight: false
  },
  {
    icon: Shield,
    title: "Insurance & Cards",
    titlePunjabi: "ਬੀਮਾ ਅਤੇ ਕਾਰਡ",
    services: [
      "Ayushman Card",
      "Health Insurance (ICICI, Max, HDFC)",
      "Car Insurance Policy"
    ],
    highlight: false
  },
  {
    icon: TrendingUp,
    title: "Investment Services",
    titlePunjabi: "ਨਿਵੇਸ਼ ਸੇਵਾਵਾਂ",
    services: [
      "Mutual Funds Guidance",
      "Stock Investment Support",
      "Post Office & Bank Schemes"
    ],
    highlight: false
  },
  {
    icon: Building,
    title: "Government Forms",
    titlePunjabi: "ਸਰਕਾਰੀ ਫਾਰਮ",
    services: [
      "Govt/Non-Govt Competitive Exams",
      "New Government Scheme Applications",
      "Online Form Filling"
    ],
    highlight: false
  },
  {
    icon: Fuel,
    title: "FASTag & Recharge",
    titlePunjabi: "ਫਾਸਟੈਗ ਅਤੇ ਰੀਚਾਰਜ",
    services: [
      "FASTag Recharge",
      "Mobile Recharge",
      "DTH Recharge"
    ],
    highlight: false
  },
  {
    icon: Smartphone,
    title: "Number Plate",
    titlePunjabi: "ਨੰਬਰ ਪਲੇਟ",
    services: [
      "Online Car Number Plate",
      "High Security Registration Plate",
      "HSRP Services"
    ],
    highlight: false
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
          data-testid="img-hero-background"
        />
        {/* Dark Wash Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm" data-testid="badge-digital-service">
              ਡਿਜੀਟਲ ਸੇਵਾ ਕੇਂਦਰ | Digital Service Center
            </Badge>
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight" data-testid="text-company-name">
            KHALSA HITECH
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-amber-200" data-testid="text-company-name-2">
            ENTERPRISES
          </h2>
          
          <p className="text-xl md:text-2xl mb-2 font-medium" style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }} data-testid="text-tagline-punjabi">
            ਤੁਹਾਡੀ ਡਿਜੀਟਲ ਸੇਵਾ ਦਾ ਭਰੋਸੇਮੰਦ ਸਾਥੀ
          </p>
          <p className="text-lg md:text-xl mb-8 text-amber-100" data-testid="text-tagline-english">
            Your Trusted Digital Service Partner
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full" data-testid="text-location">
              <MapPin className="w-5 h-5 text-amber-300" />
              <span className="font-medium">Village Hardhokhundpur</span>
            </div>
            <a 
              href="tel:7009073061" 
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-lg hover:bg-white/30 transition-colors"
              data-testid="link-phone-hero"
            >
              <Phone className="w-5 h-5" />
              <span>7009073061</span>
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#services">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-amber-50 font-semibold" data-testid="button-view-services">
                View All Services
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
            <Link href="/online-services">
              <Button size="lg" variant="outline" className="border-white/50 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20" data-testid="button-online-services">
                <Zap className="w-4 h-4 mr-2" />
                Online Services
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Owner Profile Section */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-owner-profile">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-sm opacity-75" />
                  <Avatar className="relative w-48 h-48 md:w-56 md:h-56 border-4 border-white shadow-xl" data-testid="img-owner-photo">
                    <AvatarImage src={ownerPhoto} alt="Owner - Khalsa Hitech Enterprises" />
                    <AvatarFallback className="text-4xl font-bold bg-orange-100 text-orange-600">KH</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200" data-testid="badge-founder">
                  <Star className="w-3 h-3 mr-1" />
                  Founder & Technical Expert
                </Badge>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2" data-testid="text-meet-expert">
                  Meet Our Expert
                </h3>
                <p className="text-lg text-muted-foreground mb-4" style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }} data-testid="text-meet-expert-punjabi">
                  ਸਾਡੇ ਮਾਹਰ ਨੂੰ ਮਿਲੋ
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 justify-center md:justify-start" data-testid="text-qualification-1">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Building className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">B.Tech CSE 2025</p>
                      <p className="text-sm text-muted-foreground">Thapar University, Patiala</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-center md:justify-start" data-testid="text-qualification-2">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">AI Software Engineer</p>
                      <p className="text-sm text-muted-foreground">Project Studio</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-center md:justify-start" data-testid="text-qualification-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">Expert in Computer Field</p>
                      <p className="text-sm text-muted-foreground">AI Services Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Features Section */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20" data-testid="section-special-features">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-orange-200 bg-gradient-to-br from-orange-500 to-amber-500 text-white" data-testid="card-feature-mini-atm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CreditCard className="w-8 h-8" />
                </div>
                <Badge className="mb-3 bg-white/20 text-white border-white/30">First in Area</Badge>
                <h4 className="text-xl font-bold mb-2">Mini ATM</h4>
                <p className="text-sm text-orange-100" style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }}>
                  ਏਟੀਐਮ ਕਾਰਡ, ਗੂਗਲ ਪੇ, ਫੋਨਪੇ ਸਵੀਕਾਰ
                </p>
                <p className="text-sm text-orange-100 mt-1">
                  ATM Card, Google Pay, PhonePe Accepted
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-gradient-to-br from-blue-500 to-indigo-500 text-white" data-testid="card-feature-website">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Globe className="w-8 h-8" />
                </div>
                <Badge className="mb-3 bg-white/20 text-white border-white/30">AI Powered</Badge>
                <h4 className="text-xl font-bold mb-2">Website & App Building</h4>
                <p className="text-sm text-blue-100" style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }}>
                  ਨਵੀਨਤਮ AI ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਨਾਲ
                </p>
                <p className="text-sm text-blue-100 mt-1">
                  Latest AI Features + Free Cloud Support
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 bg-gradient-to-br from-purple-500 to-pink-500 text-white" data-testid="card-feature-documents">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FileCheck className="w-8 h-8" />
                </div>
                <Badge className="mb-3 bg-white/20 text-white border-white/30">AI Enhanced</Badge>
                <h4 className="text-xl font-bold mb-2">Duplicate Documents</h4>
                <p className="text-sm text-purple-100" style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }}>
                  AI ਵਰਗੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਸਮਰੱਥ
                </p>
                <p className="text-sm text-purple-100 mt-1">
                  AI-Like Features Enabled
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section className="py-16 md:py-20 bg-background" id="services" data-testid="section-all-services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200" data-testid="badge-all-services">
              <Users className="w-3 h-3 mr-1" />
              ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ | All Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="text-services-title">
              Our Complete Services
            </h2>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }} data-testid="text-services-subtitle-punjabi">
              ਔਨਲਾਈਨ ਅਤੇ ਔਫਲਾਈਨ ਦੋਵੇਂ ਸੇਵਾਵਾਂ ਉਪਲਬਧ
            </p>
            <p className="text-muted-foreground" data-testid="text-services-subtitle-english">
              Both Online & Offline Services Available
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`hover-elevate transition-all duration-300 ${
                  service.highlight 
                    ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30' 
                    : ''
                }`}
                data-testid={`card-service-${index}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      service.highlight 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-foreground" data-testid={`text-service-title-${index}`}>{service.title}</h3>
                        {service.badge && (
                          <Badge size="sm" className="bg-orange-500 text-white border-orange-500 text-xs" data-testid={`badge-service-${index}`}>
                            {service.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }} data-testid={`text-service-punjabi-${index}`}>
                        {service.titlePunjabi}
                      </p>
                      <ul className="space-y-1.5">
                        {service.services.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <ChevronRight className="w-3 h-3 mt-1 text-orange-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HiTech Bot Preview */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white" data-testid="section-hitech-bot">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            
            <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30" data-testid="badge-ai-assistant">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered Assistant
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-hitech-bot-title">
              Meet HiTech Bot
            </h2>
            <p className="text-lg text-slate-300 mb-2" style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }} data-testid="text-hitech-bot-desc-punjabi">
              ਪੰਜਾਬ ਵਿੱਚ ਕੰਪਿਊਟਰ ਸੇਵਾਵਾਂ ਬਾਰੇ ਸਵਾਲ ਪੁੱਛੋ
            </p>
            <p className="text-slate-400 mb-8" data-testid="text-hitech-bot-desc-english">
              Ask questions about computer services, online applications, and government schemes in Punjab
            </p>
            
            <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700">
              <p className="text-sm text-slate-400 mb-4">Example questions:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600" data-testid="badge-example-1">
                  How to apply for driving licence?
                </Badge>
                <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600" data-testid="badge-example-2">
                  Fard kaise check kare?
                </Badge>
                <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600" data-testid="badge-example-3">
                  PAN card online apply
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-slate-400" data-testid="text-chat-cta">
              Click the chat icon in the bottom right corner to start chatting!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white" data-testid="section-contact">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-contact-title">
              ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ
            </h2>
            <p className="text-xl text-orange-100 mb-8" data-testid="text-contact-subtitle">Contact Us Today</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl" data-testid="text-address">
                <MapPin className="w-6 h-6 text-amber-200" />
                <div className="text-left">
                  <p className="font-semibold">Village Hardhokhundpur</p>
                  <p className="text-sm text-orange-100">Punjab, India</p>
                </div>
              </div>
              
              <a 
                href="tel:7009073061" 
                className="flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-xl hover:bg-amber-50 transition-colors shadow-lg"
                data-testid="link-phone-contact"
              >
                <Phone className="w-6 h-6" />
                <span>7009073061</span>
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-orange-100" data-testid="text-hours">
              <Clock className="w-5 h-5" />
              <span>Open 7 Days a Week | ਹਫ਼ਤੇ ਦੇ 7 ਦਿਨ ਖੁੱਲ੍ਹਾ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400" data-testid="section-footer">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold text-white mb-2" data-testid="text-footer-name">
            Khalsa Hitech Enterprises
          </p>
          <p className="text-sm mb-4" data-testid="text-footer-tagline">
            Your One-Stop Digital Service Center | ਤੁਹਾਡਾ ਵਨ-ਸਟਾਪ ਡਿਜੀਟਲ ਸੇਵਾ ਕੇਂਦਰ
          </p>
          <p className="text-xs text-slate-500" data-testid="text-footer-note">
            All government schemes and new services available on demand
          </p>
        </div>
      </footer>
    </div>
  );
}
