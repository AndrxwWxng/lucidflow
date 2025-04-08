import Link from "next/link";
import {
  Brain,
  Clock,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Rocket,
  BarChartHorizontal,
  Laptop,
  Music,
  Bot,
  BookOpen,
  CircleCheck,
  ArrowUpRight,
  Layers,
  Gauge,
  Zap,
  Blocks,
  GraduationCap,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 -right-80 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-40 -left-80 w-[700px] h-[700px] bg-cyan-300/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-4000 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-300/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header with refined glass effect */}
      <header className="bg-background/5 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-3 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full animate-pulse"></div>
              <Brain size={32} className="text-primary relative animate-pulse-glow" />
            </div>
            <h1 className="mt-2 text-2xl font-bold gradient-text font-manjari">lucidflow</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="#features">
                <Button variant="ghost" className="font-medium">Features</Button>
              </Link>
              <Link href="#benefits">
                <Button variant="ghost" className="font-medium">Benefits</Button>
              </Link>
              <Link href="#testimonials">
                <Button variant="ghost" className="font-medium">Testimonials</Button>
              </Link>
            </nav>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
            <Link href="/dashboard" className="mr-2">
              <Button variant="ghost" className="font-medium hover:text-black transition-colors">
                Dashboard
                <ArrowUpRight size={14} className="ml-1" />
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section with enhanced visuals */}
      <section className="relative pt-16 md:pt-64 pb-20 md:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 mb-8">
            <Sparkles size={14} className="text-primary mr-2" />
            <span className="text-sm">AI-Powered Study Environment</span>
          </div>
          
          <div className="relative">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Supercharge</span> Your <br />
              Study Sessions
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              The all-in-one AI-powered study companion that helps you learn faster, 
              focus better, and achieve more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="px-8 py-6 rounded-full font-medium text-lg group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-100 group-hover:opacity-90 transition-opacity"></span>
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="px-8 py-6 rounded-full font-medium text-lg border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating cards preview */}
          <div className="mt-16 md:mt-24 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none h-full rounded-b-lg"></div>
            <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
              <div className="glass-card p-4 rounded-xl transform hover:-translate-y-2 transition-transform md:col-span-1 opacity-90 hover:opacity-100 h-32 hidden md:flex items-center justify-center">
                <Clock size={24} className="text-primary mr-2" />
                <span className="text-lg font-medium">Focus Timer</span>
              </div>
              <div className="glass-card p-4 rounded-xl transform hover:-translate-y-2 transition-transform col-span-3 md:col-span-1 opacity-90 hover:opacity-100 h-32 flex items-center justify-center">
                <Bot size={24} className="text-primary mr-2" />
                <span className="text-lg font-medium">AI Assistant</span>
              </div>
              <div className="glass-card p-4 rounded-xl transform hover:-translate-y-2 transition-transform md:col-span-1 opacity-90 hover:opacity-100 h-32 hidden md:flex items-center justify-center">
                <Layers size={24} className="text-primary mr-2" />
                <span className="text-lg font-medium">Task Board</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key benefits section */}
      <section id="benefits" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Students <span className="gradient-text">Love LucidFlow</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Our platform is designed to optimize your study experience and help you achieve your academic goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Gauge className="text-primary" size={24} />}
              title="Improved Productivity"
              description="Students report 40% better focus and time management using our specialized focus tools."
            />
            <BenefitCard 
              icon={<Zap className="text-primary" size={24} />}
              title="Faster Learning"
              description="AI-powered learning assistants help you grasp difficult concepts more quickly."
            />
            <BenefitCard 
              icon={<Blocks className="text-primary" size={24} />}
              title="Better Organization"
              description="Keep all your study materials and tasks in one place with our integrated tools."
            />
          </div>
        </div>
      </section>

      {/* Features Section with improved design */}
      <section id="features" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 mb-4">
              <Blocks size={14} className="text-primary mr-2" />
              <span className="text-sm">Feature-rich Platform</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smart Tools for <span className="gradient-text">Smart Studying</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Everything you need to optimize your learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <FeatureCard 
              icon={<Clock className="text-primary" size={28} />}
              title="Pomodoro Timer"
              description="Stay focused with customizable focus and break intervals to maximize productivity."
            />
            <FeatureCard 
              icon={<Bot className="text-primary" size={28} />}
              title="AI Study Assistant"
              description="Get instant help with difficult concepts and personalized explanations."
            />
            <FeatureCard 
              icon={<BarChartHorizontal className="text-primary" size={28} />}
              title="Kanban Tasks"
              description="Organize your study tasks with a visual board to track your progress."
            />
            <FeatureCard 
              icon={<Music className="text-primary" size={28} />}
              title="Study Music"
              description="Access focus-enhancing music to create the perfect study atmosphere."
            />
            <FeatureCard 
              icon={<BookOpen className="text-primary" size={28} />}
              title="Smart Notes"
              description="Take and organize notes with rich formatting and search capabilities."
            />
            <FeatureCard 
              icon={<Laptop className="text-primary" size={28} />}
              title="Study Planner"
              description="Plan your study sessions with detailed analytics to optimize your time."
            />
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 mb-4">
              <GraduationCap size={14} className="text-primary mr-2" />
              <span className="text-sm">Student Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Students</span> Worldwide
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Hear from students who have transformed their study habits with LucidFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="LucidFlow is the best study tool I&apos;ve ever used. It constantly helps me stay on track and focused even when I&apos;m feeling lazy."
              author="Sarthak M."
              role="High School Student"
            />
            <TestimonialCard
              quote="LucidFlow has completely transformed how I study. The AI assistant is like having a personal tutor available 24/7."
              author="Agneya T."
              role="High School Student"
            />
            <TestimonialCard
              quote="The Pomodoro timer and task board have doubled my productivity. I can actually see my progress and stay motivated."
              author="Alex W."
              role="High School Student"
            />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-background to-background/95">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center mb-6 bg-primary/20 p-4 rounded-full">
              <Lightbulb className="text-primary w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Study Habits?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have improved their learning efficiency with LucidFlow.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="px-8 py-6 rounded-full font-medium text-lg relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Start Studying Now <Rocket className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-100 group-hover:opacity-90 transition-opacity"></span>
              </Button>
            </Link>
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-foreground/60">
              <div className="flex items-center">
                <CircleCheck size={16} className="text-primary mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="hidden md:block h-4 w-[1px] bg-white/10"></div>
              <div className="flex items-center">
                <CircleCheck size={16} className="text-primary mr-2" />
                <span>Free to get started</span>
              </div>
              <div className="hidden md:block h-4 w-[1px] bg-white/10"></div>
              <div className="flex items-center">
                <CircleCheck size={16} className="text-primary mr-2" />
                <span>Works on all devices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-white/10 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain size={24} className="text-primary" />
              <span className="pt-2 text-xl font-bold gradient-text font-manjari">lucidflow</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-foreground/60">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <div className="text-sm text-foreground/60">
                © {new Date().getFullYear()} LucidFlow. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <div className="rounded-xl p-6 bg-card/20 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group transform hover:-translate-y-1">
      <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}

// Benefit Card Component
function BenefitCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <div className="rounded-xl p-6 bg-card/10 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col items-center text-center">
      <div className="p-4 rounded-full bg-primary/10 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ quote, author, role }: { 
  quote: string, 
  author: string,
  role: string
}) {
  return (
    <div className="rounded-xl p-6 bg-card/10 backdrop-blur-sm border border-white/5 hover:border-primary/10 transition-all duration-300">
      <div className="text-primary mb-4">&quot;</div>
      <p className="mb-6 text-foreground/80 italic">{quote}</p>
      <div className="flex flex-col">
        <span className="font-medium">{author}</span>
        <span className="text-sm text-foreground/60">{role}</span>
      </div>
    </div>
  );
}
