import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  Globe, 
  Cpu, 
  Bot,
  Rocket,
  Star
} from "lucide-react";

export default function OnlineServices() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="absolute top-8 left-8 text-white/70 hover:text-white hover:bg-white/10"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        {/* AI Icon */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 relative"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-80 blur-xl" />
          <motion.div 
            className="relative w-full h-full bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl"
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Bot className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-1.5">
            <Sparkles className="w-3 h-3 mr-2" />
            AI-Powered Features Coming
            <Sparkles className="w-3 h-3 ml-2" />
          </Badge>
        </motion.div>
        
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Online Services
        </motion.h1>
        
        <motion.p
          className="text-2xl md:text-3xl font-semibold text-orange-400 mb-6"
          style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          ਔਨਲਾਈਨ ਸੇਵਾਵਾਂ
        </motion.p>
        
        {/* Coming Soon with Animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-8 py-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Rocket className="w-6 h-6 text-orange-400" />
            </motion.div>
            <span className="text-2xl md:text-3xl font-bold text-white">
              Coming Soon
            </span>
            <motion.div
              className="flex gap-1"
              initial="hidden"
              animate="visible"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-orange-400 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Description */}
        <motion.p
          className="text-lg text-slate-300 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          We're building something amazing! Soon you'll be able to access all our services online with AI-powered features.
        </motion.p>
        
        <motion.p
          className="text-lg text-slate-400 mb-12"
          style={{ fontFamily: 'Noto Sans Gurmukhi, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          ਅਸੀਂ ਕੁਝ ਸ਼ਾਨਦਾਰ ਬਣਾ ਰਹੇ ਹਾਂ! ਜਲਦੀ ਹੀ ਤੁਸੀਂ AI-ਸੰਚਾਲਿਤ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਨਾਲ ਸਾਡੀਆਂ ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਔਨਲਾਈਨ ਐਕਸੈਸ ਕਰ ਸਕੋਗੇ।
        </motion.p>
        
        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <Cpu className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-slate-300">AI Processing</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <Globe className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-slate-300">24/7 Access</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-slate-300">Instant Results</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <Star className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-slate-300">Premium Quality</span>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg"
              data-testid="button-return-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div
          className="mt-12 text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>For immediate assistance, call us at</p>
          <a href="tel:7009073061" className="text-orange-400 font-semibold text-lg hover:text-orange-300 transition-colors">
            7009073061
          </a>
        </motion.div>
      </div>
    </div>
  );
}
