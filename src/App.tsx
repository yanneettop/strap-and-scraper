import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Scissors,
  Clock,
  Star,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import './App.css'

const FRESHA_URL = 'https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810'
const GOOGLE_REVIEWS_URL = 'https://search.google.com/local/reviews?placeid=ChIJVVV8L8gcdkgRPPcUihoOCCI'

// ── Scroll reveal hook ──
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

// ── Navigation ──
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Merch', href: '#merch' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0f0c0a]/90 backdrop-blur-xl border-b border-[#c9a962]/8'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-18 lg:h-22" style={{ height: isScrolled ? '64px' : '80px', transition: 'height 0.5s ease' }}>
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-8 h-8 border border-[#c9a962]/40 rotate-45 flex items-center justify-center group-hover:border-[#c9a962] transition-colors duration-300">
                <Scissors className="w-4 h-4 text-[#c9a962] -rotate-45" />
              </div>
              <span className="font-display text-xl lg:text-2xl text-[#f5f0e8] tracking-wide" style={{ fontWeight: 400 }}>
                The <span className="text-shimmer" style={{ fontWeight: 600 }}>Groom</span> Room
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-[#b8b0a3] hover:text-[#f5f0e8] transition-colors duration-300 text-sm tracking-[0.15em] uppercase font-body"
                  style={{ fontWeight: 400, fontSize: '0.75rem' }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer">
                <button className="relative px-7 py-2.5 text-xs tracking-[0.2em] uppercase font-body text-[#0f0c0a] bg-[#c9a962] hover:bg-[#d4b876] transition-all duration-300 overflow-hidden group" style={{ fontWeight: 500 }}>
                  <span className="relative z-10">Book Now</span>
                </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#f5f0e8] p-2 hover:text-[#c9a962] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0f0c0a] transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              className="font-display text-4xl text-[#f5f0e8] hover:text-[#c9a962] transition-colors py-3"
              style={{
                fontWeight: 400,
                transitionDelay: isMobileMenuOpen ? `${i * 0.06}s` : '0s',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease, color 0.3s ease',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6"
          >
            <button className="px-10 py-4 bg-[#c9a962] text-[#0f0c0a] text-sm tracking-[0.2em] uppercase font-body" style={{ fontWeight: 500 }}>
              Book Now
            </button>
          </a>

          {/* Decorative diamond */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-3 h-3 border border-[#c9a962]/30 rotate-45" />
        </div>
      </div>
    </>
  )
}

// ── Hero Section ──
function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="The Groom Room Barbershop"
          className="w-full h-full object-cover scale-105"
          style={{
            transition: 'transform 8s ease-out, opacity 1.5s ease',
            transform: loaded ? 'scale(1)' : 'scale(1.1)',
            opacity: loaded ? 1 : 0,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c0a]/70 via-[#0f0c0a]/30 to-[#0f0c0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c0a]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto pt-20">
        {/* Decorative top element */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#c9a962]/60" />
          <div className="w-2 h-2 border border-[#c9a962]/60 rotate-45" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#c9a962]/60" />
        </div>

        <p
          className="text-[#c9a962] text-sm sm:text-base tracking-[0.4em] uppercase mb-6 font-body animate-fade-in-up"
          style={{ fontWeight: 300 }}
        >
          Shoreditch, London
        </p>

        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-[#f5f0e8] mb-6 leading-[0.95] animate-fade-in-up stagger-1"
          style={{ fontWeight: 400, letterSpacing: '-0.02em' }}
        >
          The Cut You
          <br />
          <span
            className="text-shimmer inline-block mt-2"
            style={{ fontWeight: 600, fontStyle: 'italic' }}
          >
            Deserve
          </span>
        </h1>

        <p className="text-[#b8b0a3] text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-12 animate-fade-in-up stagger-2 font-body" style={{ fontWeight: 300, lineHeight: 1.7 }}>
          Shoreditch barbering since 2018. Consultation first.
          <br className="hidden sm:block" />
          No rushed cuts. Product that works.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
          <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer">
            <button className="px-10 py-4 bg-[#c9a962] text-[#0f0c0a] text-sm tracking-[0.2em] uppercase font-body hover:bg-[#d4b876] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,98,0.3)]" style={{ fontWeight: 500 }}>
              Book Your Chair
            </button>
          </a>
          <a href="#services">
            <button className="px-10 py-4 border border-[#c9a962]/40 text-[#f5f0e8] text-sm tracking-[0.2em] uppercase font-body hover:border-[#c9a962] hover:bg-[#c9a962]/5 transition-all duration-300" style={{ fontWeight: 400 }}>
              View Services
            </button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[#b8b0a3] text-[10px] tracking-[0.3em] uppercase font-body" style={{ fontWeight: 300 }}>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#c9a962]/60 to-transparent animate-scroll-down" />
      </div>

      {/* Side text */}
      <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2">
        <p className="text-[#b8b0a3]/30 text-[10px] tracking-[0.5em] uppercase font-body" style={{ writingMode: 'vertical-rl', fontWeight: 300 }}>
          Est. 2018 — London
        </p>
      </div>
    </section>
  )
}

// ── Trust Bar ──
function TrustBar() {
  return (
    <section className="relative bg-[#1a1512] border-y border-[#c9a962]/8 py-6 overflow-hidden noise-overlay">
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#c9a962] text-[#c9a962]" />
              ))}
            </div>
            <span className="text-[#f5f0e8] font-body text-sm" style={{ fontWeight: 500 }}>5.0</span>
          </div>

          <div className="h-4 w-px bg-[#c9a962]/15 hidden sm:block" />

          <p className="text-[#b8b0a3] text-sm font-body" style={{ fontWeight: 300 }}>
            Rated <span className="text-[#f5f0e8]" style={{ fontWeight: 500 }}>5.0</span> by{' '}
            <span className="text-[#f5f0e8]" style={{ fontWeight: 500 }}>232+</span> Londoners on Google
          </p>

          <div className="h-4 w-px bg-[#c9a962]/15 hidden sm:block" />

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c9a962] hover:text-[#d4b876] text-xs font-body flex items-center gap-1.5 transition-colors tracking-[0.15em] uppercase"
            style={{ fontWeight: 400 }}
          >
            Read Reviews <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Section Header ──
function SectionHeader({ label, title, description }: { label: string; title: string; description?: string }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal text-center mb-16 lg:mb-20">
      <p className="text-[#c9a962] text-xs tracking-[0.4em] uppercase mb-5 font-body" style={{ fontWeight: 400 }}>{label}</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#f5f0e8] mb-3" style={{ fontWeight: 400, letterSpacing: '-0.01em' }}>
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-5 mb-5">
        <div className="w-8 h-px bg-[#c9a962]/30" />
        <div className="w-1.5 h-1.5 border border-[#c9a962]/40 rotate-45" />
        <div className="w-8 h-px bg-[#c9a962]/30" />
      </div>
      {description && (
        <p className="text-[#b8b0a3] max-w-xl mx-auto font-body text-base" style={{ fontWeight: 300, lineHeight: 1.7 }}>
          {description}
        </p>
      )}
    </div>
  )
}

// ── Services Section ──
function ServicesSection() {
  const services = [
    {
      name: 'S&S London Haircut',
      price: '£43.50',
      duration: '30 min',
      description: 'Wash, cut, and style. Finished with our product range and expert advice.',
      image: '/service-haircut.jpg',
    },
    {
      name: 'S&S London Skin Fade',
      price: '£48.50',
      duration: '45 min',
      description: 'Precision fade with seamless blending. Our signature service.',
      image: '/service-fade.jpg',
    },
    {
      name: 'S&S London Beard Sculpt',
      price: '£27.50',
      duration: '20 min',
      description: 'Shape and define with straight razor finish.',
      image: '/service-beard.jpg',
    },
    {
      name: 'Refresh Treatment',
      price: '£12.50',
      duration: '15 min',
      description: 'Hot towel facial to complete your visit.',
      image: '/service-facial.jpg',
    },
  ]

  return (
    <section id="services" className="relative py-24 lg:py-36 bg-[#0f0c0a] noise-overlay overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a962]/[0.02] rounded-full blur-[120px]" />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          label="What We Do"
          title="The Menu"
          description="Straightforward pricing. No surprises. Just quality cuts from barbers who care."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.map((service, index) => {
            const ref = useReveal(0.1)
            return (
              <div
                key={service.name}
                ref={ref}
                className="reveal group relative bg-[#1a1512] overflow-hidden border border-[#c9a962]/8 hover:border-[#c9a962]/25 transition-all duration-500 hover-lift"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1512] via-[#1a1512]/20 to-transparent" />

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-[#0f0c0a]/80 backdrop-blur-sm px-3 py-1.5 border border-[#c9a962]/20">
                    <span className="text-[#c9a962] font-body text-sm" style={{ fontWeight: 500 }}>{service.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-[#f5f0e8] mb-2" style={{ fontWeight: 500 }}>{service.name}</h3>
                  <div className="flex items-center gap-2 text-[#b8b0a3] text-xs mb-4 font-body" style={{ fontWeight: 300 }}>
                    <Clock className="w-3.5 h-3.5 text-[#c9a962]/60" />
                    <span>{service.duration}</span>
                  </div>
                  <p className="text-[#b8b0a3] text-sm mb-6 line-clamp-2 font-body" style={{ fontWeight: 300, lineHeight: 1.6 }}>
                    {service.description}
                  </p>
                  <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="w-full py-3 border border-[#c9a962]/25 text-[#f5f0e8] text-xs tracking-[0.15em] uppercase font-body hover:bg-[#c9a962] hover:text-[#0f0c0a] hover:border-[#c9a962] transition-all duration-300" style={{ fontWeight: 400 }}>
                      Book This
                    </button>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* View Full Menu */}
        <div className="text-center mt-14">
          <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer">
            <button className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#c9a962]/40 text-[#c9a962] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#c9a962] hover:text-[#0f0c0a] hover:border-[#c9a962] transition-all duration-300" style={{ fontWeight: 400 }}>
              View Full Menu
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Gallery Section ──
function GallerySection() {
  const images = [
    { src: '/gallery-1.jpg', alt: 'Barbershop interior' },
    { src: '/gallery-2.jpg', alt: 'Master barber' },
    { src: '/gallery-3.jpg', alt: 'Vintage tools' },
    { src: '/gallery-4.jpg', alt: 'Client satisfaction' },
    { src: '/gallery-5.jpg', alt: 'Shop atmosphere' },
    { src: '/gallery-6.jpg', alt: 'Product application' },
  ]

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (src: string, index: number) => {
    setSelectedImage(src)
    setCurrentIndex(index)
  }

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentIndex - 1 + images.length) % images.length
      : (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex].src)
  }, [currentIndex, images])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'ArrowRight') navigateLightbox('next')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedImage, navigateLightbox])

  return (
    <section id="gallery" className="relative py-24 lg:py-36 bg-[#1a1512] noise-overlay overflow-hidden">
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          label="Step Inside"
          title="The Shop"
          description="Where craft meets conversation. Take a look around our Shoreditch space."
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((image, index) => {
            const ref = useReveal(0.05)
            return (
              <div
                key={image.src}
                ref={ref}
                className={`reveal relative overflow-hidden cursor-pointer group ${
                  index === 0 || index === 3 ? 'md:row-span-2' : ''
                }`}
                style={{ transitionDelay: `${index * 0.06}s` }}
                onClick={() => openLightbox(image.src, index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-[#0f0c0a]/0 group-hover:bg-[#0f0c0a]/50 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-75 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 border border-[#c9a962]/60 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-[#c9a962]" />
                    </div>
                    <span className="text-[#f5f0e8] text-xs tracking-[0.2em] uppercase font-body" style={{ fontWeight: 300 }}>View</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0f0c0a]/97 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#b8b0a3] hover:text-[#c9a962] p-2 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-6 text-[#b8b0a3] hover:text-[#c9a962] p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev') }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="absolute right-6 text-[#b8b0a3] hover:text-[#c9a962] p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next') }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeIn 0.3s ease' }}
          />

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#b8b0a3] text-xs tracking-[0.2em] font-body" style={{ fontWeight: 300 }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}

// ── Reviews Section ──
function ReviewsSection() {
  const reviews = [
    {
      name: 'Rodrigo',
      rating: 5,
      text: 'Been going for years. Papi and Louis are masters of their trade. Always leave feeling sharp.',
      time: '5 months ago',
    },
    {
      name: 'Peter',
      rating: 5,
      text: 'Top-notch grooming with a modern yet classic touch. The barbers are skilled, attentive, and provide sharp, stylish cuts.',
      time: '5 months ago',
    },
    {
      name: 'Vad',
      rating: 5,
      text: 'Great cut and Louis is the sweetest guy you\'ll ever meet. The atmosphere is unmatched.',
      time: '6 months ago',
    },
  ]

  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="reviews" className="relative py-24 lg:py-36 bg-[#0f0c0a] noise-overlay overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 text-[#c9a962]/[0.03] font-display text-[20rem] leading-none select-none pointer-events-none" style={{ fontWeight: 300 }}>"</div>

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader label="Word on the Street" title="What London Says" />

        {/* Reviews */}
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="text-center py-8">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-8">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#c9a962] text-[#c9a962]" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-[#f5f0e8] mb-10 leading-relaxed" style={{ fontWeight: 300, fontStyle: 'italic' }}>
                      "{review.text}"
                    </blockquote>

                    {/* Attribution */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-6 h-px bg-[#c9a962]/30" />
                      <div>
                        <p className="text-[#c9a962] font-body text-sm tracking-[0.1em]" style={{ fontWeight: 500 }}>{review.name}</p>
                        <p className="text-[#b8b0a3]/60 font-body text-xs mt-1" style={{ fontWeight: 300 }}>{review.time}</p>
                      </div>
                      <div className="w-6 h-px bg-[#c9a962]/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-500 ${
                  index === currentReview
                    ? 'w-8 h-0.5 bg-[#c9a962]'
                    : 'w-2 h-0.5 bg-[#b8b0a3]/20 hover:bg-[#b8b0a3]/40'
                }`}
                onClick={() => setCurrentReview(index)}
                aria-label={`Review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google CTA */}
        <div className="text-center mt-14">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center gap-2 px-7 py-3 border border-[#c9a962]/20 text-[#b8b0a3] text-xs tracking-[0.15em] uppercase font-body hover:text-[#c9a962] hover:border-[#c9a962]/40 transition-all duration-300" style={{ fontWeight: 400 }}>
              Leave Your Review on Google
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Merch Section ──
function MerchSection() {
  const ref = useReveal()
  return (
    <section id="merch" className="relative py-24 lg:py-36 bg-[#221c17] noise-overlay overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c9a962]/[0.02] rounded-full blur-[100px]" />

      <div ref={ref} className="reveal relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative group">
            <img
              src="/merch-products.jpg"
              alt="S&S Products"
              className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Decorative frame corners */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t border-l border-[#c9a962]/25" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b border-r border-[#c9a962]/25" />
          </div>

          {/* Content */}
          <div>
            <p className="text-[#c9a962] text-xs tracking-[0.4em] uppercase mb-5 font-body" style={{ fontWeight: 400 }}>Limited Drops</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f0e8] mb-6" style={{ fontWeight: 400 }}>
              The Drop
            </h2>
            <div className="w-8 h-px bg-[#c9a962]/30 mb-6" />
            <p className="text-[#b8b0a3] text-base lg:text-lg mb-8 font-body" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              Made for the shop. Built for the street. Our pomades and grooming products are formulated
              for the modern Londoner who demands quality.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Professional-grade pomades',
                'Beard oils & balms',
                'S&S branded apparel',
                'Gift sets & bundles',
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 text-[#b8b0a3] font-body text-sm" style={{ fontWeight: 300 }}>
                  <div className="w-1.5 h-1.5 bg-[#c9a962] rotate-45 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="https://strapandscraperlondon.com/shop/">
              <button className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#c9a962] text-[#0f0c0a] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#d4b876] transition-all duration-300" style={{ fontWeight: 500 }}>
                <ShoppingBag className="w-4 h-4" />
                Shop Merch
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ──
function CTABanner() {
  const ref = useReveal()
  return (
    <section ref={ref} className="reveal relative py-16 lg:py-20 bg-[#c9a962] overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #0f0c0a 10px, #0f0c0a 11px)'
      }} />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#0f0c0a] mb-2" style={{ fontWeight: 500 }}>
              Walk-ins welcome. Bookings preferred.
            </h2>
            <p className="text-[#0f0c0a]/60 font-body text-sm" style={{ fontWeight: 400 }}>
              38 Cheshire Street, Shoreditch, London E2 6EH
            </p>
          </div>
          <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer">
            <button className="px-10 py-4 bg-[#0f0c0a] text-[#f5f0e8] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#1a1512] transition-all duration-300 whitespace-nowrap" style={{ fontWeight: 500 }}>
              Book Your Chair
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Contact Section ──
function ContactSection() {
  const ref = useReveal()
  return (
    <section id="contact" className="relative py-24 lg:py-36 bg-[#0f0c0a] noise-overlay overflow-hidden">
      <div ref={ref} className="reveal relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div>
            <p className="text-[#c9a962] text-xs tracking-[0.4em] uppercase mb-5 font-body" style={{ fontWeight: 400 }}>Find Us</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f5f0e8] mb-10" style={{ fontWeight: 400 }}>
              Visit the Shop
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#c9a962]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#c9a962]" />
                </div>
                <div>
                  <p className="text-[#f5f0e8] font-body text-sm mb-1" style={{ fontWeight: 500 }}>Address</p>
                  <p className="text-[#b8b0a3] font-body text-sm" style={{ fontWeight: 300 }}>38 Cheshire Street</p>
                  <p className="text-[#b8b0a3] font-body text-sm" style={{ fontWeight: 300 }}>Shoreditch, London E2 6EH</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#c9a962]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#c9a962]" />
                </div>
                <div>
                  <p className="text-[#f5f0e8] font-body text-sm mb-1" style={{ fontWeight: 500 }}>Phone</p>
                  <a href="tel:07747997189" className="text-[#b8b0a3] hover:text-[#c9a962] transition-colors font-body text-sm" style={{ fontWeight: 300 }}>
                    07747 997189
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#c9a962]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#c9a962]" />
                </div>
                <div>
                  <p className="text-[#f5f0e8] font-body text-sm mb-2" style={{ fontWeight: 500 }}>Opening Hours</p>
                  <div className="text-[#b8b0a3] font-body text-sm space-y-1.5" style={{ fontWeight: 300 }}>
                    <div className="flex justify-between gap-8">
                      <span>Monday</span><span className="text-[#f5f0e8]/60">10am – 12:30pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Tuesday</span><span className="text-[#f5f0e8]/60">10am – 6pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Wed – Fri</span><span className="text-[#f5f0e8]/60">10am – 8pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Saturday</span><span className="text-[#f5f0e8]/60">10am – 5pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Sunday</span><span className="text-[#f5f0e8]/60">10am – 3pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t border-l border-[#c9a962]/15 z-10" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b border-r border-[#c9a962]/15 z-10" />
            <div className="overflow-hidden border border-[#c9a962]/10 h-96 lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.432082741104!2d-0.07364868423158667!3d51.524633979637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cc82f7c5555%3A0x22080e1a8a14f73c!2s38%20Cheshire%20St%2C%20London%20E2%206EH!5e0!3m2!1sen!2suk!4v1709913600000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Groom Room Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ──
function Footer() {
  return (
    <footer className="bg-[#1a1512] border-t border-[#c9a962]/8 pt-16 pb-8">
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Logo */}
          <div>
            <a href="#" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-7 h-7 border border-[#c9a962]/30 rotate-45 flex items-center justify-center group-hover:border-[#c9a962]/60 transition-colors">
                <Scissors className="w-3.5 h-3.5 text-[#c9a962] -rotate-45" />
              </div>
              <span className="font-display text-xl text-[#f5f0e8]" style={{ fontWeight: 400 }}>
                The <span className="text-[#c9a962]" style={{ fontWeight: 600 }}>Groom</span> Room
              </span>
            </a>
            <p className="text-[#b8b0a3]/60 font-body text-sm" style={{ fontWeight: 300 }}>
              Victorian craft. Shoreditch soul.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#f5f0e8] font-body text-xs tracking-[0.2em] uppercase mb-6" style={{ fontWeight: 500 }}>Quick Links</h4>
            <ul className="space-y-3">
              {['Services', 'Book Now', 'Gallery', 'Merch', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={link === 'Book Now' ? FRESHA_URL : `#${link.toLowerCase().replace(' ', '-')}`}
                    target={link === 'Book Now' ? '_blank' : undefined}
                    rel={link === 'Book Now' ? 'noopener noreferrer' : undefined}
                    className="text-[#b8b0a3]/60 hover:text-[#c9a962] transition-colors font-body text-sm" style={{ fontWeight: 300 }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#f5f0e8] font-body text-xs tracking-[0.2em] uppercase mb-6" style={{ fontWeight: 500 }}>Connect</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com/strapandscraperlondon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#c9a962]/15 flex items-center justify-center text-[#b8b0a3] hover:text-[#c9a962] hover:border-[#c9a962]/40 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/strapandscraper"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#c9a962]/15 flex items-center justify-center text-[#b8b0a3] hover:text-[#c9a962] hover:border-[#c9a962]/40 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-2.5 bg-[#c9a962] text-[#0f0c0a] text-xs tracking-[0.15em] uppercase font-body hover:bg-[#d4b876] transition-all duration-300" style={{ fontWeight: 500 }}>
                Book Now
              </button>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#c9a962]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#b8b0a3]/40 text-xs font-body" style={{ fontWeight: 300 }}>
            &copy; 2024 Strap & Scraper London. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[#b8b0a3]/40 hover:text-[#c9a962] transition-colors text-xs font-body" style={{ fontWeight: 300 }}>
              Privacy Policy
            </a>
            <a href="#" className="text-[#b8b0a3]/40 hover:text-[#c9a962] transition-colors text-xs font-body" style={{ fontWeight: 300 }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Sticky Mobile CTA ──
function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#1a1512]/95 backdrop-blur-xl border-t border-[#c9a962]/10 p-4 lg:hidden transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="block">
        <button className="w-full py-4 bg-[#c9a962] text-[#0f0c0a] text-sm tracking-[0.15em] uppercase font-body hover:bg-[#d4b876] transition-all" style={{ fontWeight: 500 }}>
          Book Your Chair
        </button>
      </a>
    </div>
  )
}

// ── Main App ──
function App() {
  return (
    <div className="min-h-screen bg-[#0f0c0a]">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <GallerySection />
        <ReviewsSection />
        <MerchSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}

export default App
