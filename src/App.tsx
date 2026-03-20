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
import './App.css'

const FRESHA_URL = 'https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810'
const GOOGLE_REVIEWS_URL = 'https://search.google.com/local/reviews?placeid=ChIJVVV8L8gcdkgRPPcUihoOCCI'
const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Merch', href: '#merch' },
  { name: 'Contact', href: '#contact' },
]

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
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (window.scrollY < window.innerHeight * 0.45) {
          setActiveSection('')
          return
        }

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-28% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#f3e7d7]/78 backdrop-blur-xl border-b border-[#8c6d35]/15 shadow-[0_12px_40px_-28px_rgba(36,26,20,0.28)]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-18 lg:h-22" style={{ height: isScrolled ? '64px' : '80px', transition: 'height 0.5s ease' }}>
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className={`w-8 h-8 rotate-45 flex items-center justify-center transition-colors duration-300 ${isScrolled ? 'border border-[#8c6d35]/35 group-hover:border-[#8c6d35]/65 bg-white/35' : 'border border-[#c9a962]/40 group-hover:border-[#c9a962]'}`}>
                <Scissors className="w-4 h-4 text-[#c9a962] -rotate-45" />
              </div>
              <span className={`font-display text-xl lg:text-2xl tracking-wide transition-colors duration-300 ${isScrolled ? 'text-[#241a14]' : 'text-[#f5f0e8]'}`} style={{ fontWeight: 400 }}>
                The <span className="text-shimmer" style={{ fontWeight: 600 }}>Groom</span> Room
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`group relative transition-colors duration-300 text-sm tracking-[0.15em] uppercase font-body ${
                      isScrolled ? 'text-[#6a5647] hover:text-[#241a14]' : 'text-[#b8b0a3] hover:text-[#f5f0e8]'
                    } ${isActive ? (isScrolled ? 'text-[#241a14]' : 'text-[#f5f0e8]') : ''}`}
                    style={{ fontWeight: 400, fontSize: '0.75rem' }}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-2 h-px bg-[#c9a962] transition-all duration-300 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                    />
                  </a>
                )
              })}
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
              className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-[#241a14] hover:text-[#8c6d35]' : 'text-[#f5f0e8] hover:text-[#c9a962]'}`}
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
        className={`fixed inset-0 z-40 bg-[linear-gradient(180deg,#17110d_0%,#0f0c0a_100%)] transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'radial-gradient(circle at top, rgba(201,169,98,0.22), transparent 30%)' }} />
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.name}
                href={link.href}
                className={`font-display text-4xl transition-colors py-3 ${isActive ? 'text-[#c9a962]' : 'text-[#f5f0e8] hover:text-[#c9a962]'}`}
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
            )
          })}
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#120d0b]/50 via-[#120d0b]/18 to-[#120d0b]/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120d0b]/28 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,240,232,0.12),transparent_32%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto pt-24 sm:pt-28">
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
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-[#f5f0e8] max-w-4xl mx-auto mb-6 leading-[0.92] animate-fade-in-up stagger-1"
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

        <p className="text-[#d2c7b7] text-[15px] sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-in-up stagger-2 font-body" style={{ fontWeight: 300, lineHeight: 1.8 }}>
          Shoreditch barbering since 2018. Consultation first.
          <br className="hidden sm:block" />
          No rushed cuts. Product that works.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3 sm:mt-2">
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
    <section className="relative bg-[linear-gradient(90deg,#241d18_0%,#2d261f_50%,#241d18_100%)] border-y border-[#c9a962]/10 py-6 overflow-hidden noise-overlay">
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
function SectionHeader({
  label,
  title,
  description,
  tone = 'dark',
}: {
  label: string
  title: string
  description?: string
  tone?: 'dark' | 'light'
}) {
  const ref = useReveal()
  const isLight = tone === 'light'
  return (
    <div ref={ref} className="reveal text-center mb-16 lg:mb-20">
      <p className="text-[#c9a962] text-xs tracking-[0.4em] uppercase mb-5 font-body" style={{ fontWeight: 400 }}>{label}</p>
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-3 ${isLight ? 'text-[#241a14]' : 'text-[#f5f0e8]'}`} style={{ fontWeight: 400, letterSpacing: '-0.01em' }}>
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-5 mb-5">
        <div className={`w-8 h-px ${isLight ? 'bg-[#8c6d35]/30' : 'bg-[#c9a962]/30'}`} />
        <div className={`w-1.5 h-1.5 rotate-45 ${isLight ? 'border border-[#8c6d35]/40' : 'border border-[#c9a962]/40'}`} />
        <div className={`w-8 h-px ${isLight ? 'bg-[#8c6d35]/30' : 'bg-[#c9a962]/30'}`} />
      </div>
      {description && (
        <p className={`max-w-xl mx-auto font-body text-base ${isLight ? 'text-[#5f4c3e]' : 'text-[#b8b0a3]'}`} style={{ fontWeight: 300, lineHeight: 1.7 }}>
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
    <section id="services" className="relative py-24 lg:py-36 bg-[radial-gradient(circle_at_top_right,rgba(201,169,98,0.13),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,240,232,0.06),transparent_34%),linear-gradient(180deg,#211913_0%,#16100d_55%,#120d0b_100%)] noise-overlay overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a962]/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f5f0e8]/[0.035] rounded-full blur-[110px]" />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          label="What We Do"
          title="The Menu"
          description="Cuts, fades, beard work, and quick reset treatments. The essentials, delivered with time, taste, and proper attention to detail."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 rounded-[2rem] border border-[#c9a962]/10 bg-[linear-gradient(180deg,rgba(255,244,230,0.04),rgba(255,244,230,0.015))] p-4 sm:p-5 lg:p-6">
          {services.map((service, index) => {
            const ref = useReveal(0.1)
            return (
              <div
                key={service.name}
                ref={ref}
                className="reveal group relative bg-[linear-gradient(180deg,rgba(70,58,49,0.98)_0%,rgba(38,31,26,0.99)_100%)] overflow-hidden border border-[#c9a962]/14 hover:border-[#c9a962]/34 transition-all duration-500 hover-lift shadow-[0_22px_60px_-30px_rgba(0,0,0,0.7)]"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b231d] via-[#2b231d]/20 to-transparent" />

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-[#1c1511]/68 backdrop-blur-sm px-3 py-1.5 border border-[#c9a962]/24 shadow-[0_10px_25px_-18px_rgba(0,0,0,0.8)]">
                    <span className="text-[#c9a962] font-body text-sm" style={{ fontWeight: 500 }}>{service.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-[#f5f0e8] mb-2" style={{ fontWeight: 500 }}>{service.name}</h3>
                  <div className="flex items-center gap-2 text-[#c7beb0] text-xs mb-4 font-body" style={{ fontWeight: 300 }}>
                    <Clock className="w-3.5 h-3.5 text-[#c9a962]/60" />
                    <span>{service.duration}</span>
                  </div>
                  <p className="text-[#d6cec2] text-sm mb-6 line-clamp-2 font-body" style={{ fontWeight: 300, lineHeight: 1.6 }}>
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
    <section id="gallery" className="relative py-24 lg:py-36 bg-[linear-gradient(180deg,#e9dcc7_0%,#d9c7af_100%)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'radial-gradient(circle at top left, rgba(201,169,98,0.28), transparent 28%), radial-gradient(circle at bottom right, rgba(96,71,48,0.12), transparent 30%)' }} />
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          label="Step Inside"
          title="The Shop"
          description="Where craft meets conversation. Take a look around our Shoreditch space."
          tone="light"
        />

        {/* Gallery Grid */}
        <div className="light-panel grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 rounded-[2rem] border border-[#8c6d35]/15 bg-[#f4eadb]/65 p-3 md:p-4 shadow-[0_28px_80px_-40px_rgba(36,26,20,0.35)] backdrop-blur-sm">
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
    <section id="reviews" className="relative py-24 lg:py-36 bg-[radial-gradient(circle_at_top_left,rgba(201,169,98,0.08),transparent_28%),linear-gradient(180deg,#1b1511_0%,#120d0b_100%)] noise-overlay overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 text-[#c9a962]/[0.03] font-display text-[20rem] leading-none select-none pointer-events-none" style={{ fontWeight: 300 }}>"</div>
      <div className="absolute inset-x-0 top-24 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent" />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader label="Word on the Street" title="What London Says" />

        {/* Reviews */}
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#c9a962]/15 bg-[linear-gradient(180deg,rgba(245,240,232,0.96)_0%,rgba(232,220,203,0.94)_100%)] px-5 py-8 sm:px-8 lg:px-10 shadow-[0_36px_100px_-56px_rgba(0,0,0,0.8)]">
            <div className="absolute left-8 top-8 text-[#c9a962]/30 font-display text-6xl leading-none select-none">“</div>
            <div className="absolute right-8 bottom-8 text-[#8c6d35]/20 font-display text-6xl leading-none rotate-180 select-none">“</div>
            <div
              className="flex transition-transform duration-700"
              style={{
                transform: `translateX(-${currentReview * 100}%)`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
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
                    <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-[#241a14] mb-10 leading-relaxed" style={{ fontWeight: 300, fontStyle: 'italic' }}>
                      "{review.text}"
                    </blockquote>

                    {/* Attribution */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-6 h-px bg-[#8c6d35]/35" />
                      <div>
                        <p className="text-[#c9a962] font-body text-sm tracking-[0.1em]" style={{ fontWeight: 500 }}>{review.name}</p>
                        <p className="text-[#5f4c3e]/70 font-body text-xs mt-1" style={{ fontWeight: 300 }}>{review.time}</p>
                      </div>
                      <div className="w-6 h-px bg-[#8c6d35]/35" />
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
            <button className="inline-flex items-center gap-2 px-7 py-3 border border-[#c9a962]/25 text-[#d8cfbf] text-xs tracking-[0.15em] uppercase font-body hover:text-[#f5f0e8] hover:border-[#c9a962]/45 transition-all duration-300" style={{ fontWeight: 400 }}>
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
    <section id="merch" className="relative py-24 lg:py-36 bg-[linear-gradient(180deg,#f1e6d6_0%,#dbc7ac_100%)] overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c9a962]/[0.12] rounded-full blur-[110px]" />

      <div ref={ref} className="reveal relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="light-panel grid lg:grid-cols-2 gap-12 lg:gap-20 items-center rounded-[2rem] border border-[#8c6d35]/15 bg-[#f7efe3]/78 px-6 py-8 sm:px-8 lg:px-10 lg:py-12 shadow-[0_30px_90px_-48px_rgba(36,26,20,0.35)] backdrop-blur-sm">
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
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#241a14] mb-6" style={{ fontWeight: 400 }}>
              The Drop
            </h2>
            <div className="w-8 h-px bg-[#8c6d35]/30 mb-6" />
            <p className="text-[#5f4c3e] text-base lg:text-lg mb-8 font-body" style={{ fontWeight: 300, lineHeight: 1.7 }}>
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
                <li key={item} className="flex items-center gap-4 text-[#5f4c3e] font-body text-sm" style={{ fontWeight: 300 }}>
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
    <section id="contact" className="relative py-24 lg:py-36 bg-[linear-gradient(180deg,#efe3d2_0%,#ddcab1_100%)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(circle at bottom right, rgba(201,169,98,0.28), transparent 30%), radial-gradient(circle at top left, rgba(120,88,58,0.10), transparent 26%)' }} />
      <div ref={ref} className="reveal relative z-10 w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="light-panel grid lg:grid-cols-2 gap-12 lg:gap-20 rounded-[2rem] border border-[#8c6d35]/15 bg-[#f8f0e4]/76 px-6 py-8 sm:px-8 lg:px-10 lg:py-12 shadow-[0_30px_90px_-48px_rgba(36,26,20,0.32)] backdrop-blur-sm">
          {/* Info */}
          <div>
            <p className="text-[#c9a962] text-xs tracking-[0.4em] uppercase mb-5 font-body" style={{ fontWeight: 400 }}>Find Us</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#241a14] mb-10" style={{ fontWeight: 400 }}>
              Visit the Shop
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#8c6d35]/20 bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#c9a962]" />
                </div>
                <div>
                  <p className="text-[#241a14] font-body text-sm mb-1" style={{ fontWeight: 500 }}>Address</p>
                  <p className="text-[#5f4c3e] font-body text-sm" style={{ fontWeight: 300 }}>38 Cheshire Street</p>
                  <p className="text-[#5f4c3e] font-body text-sm" style={{ fontWeight: 300 }}>Shoreditch, London E2 6EH</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#8c6d35]/20 bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#c9a962]" />
                </div>
                <div>
                  <p className="text-[#241a14] font-body text-sm mb-1" style={{ fontWeight: 500 }}>Phone</p>
                  <a href="tel:07747997189" className="text-[#5f4c3e] hover:text-[#c9a962] transition-colors font-body text-sm" style={{ fontWeight: 300 }}>
                    07747 997189
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-[#8c6d35]/20 bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#c9a962]" />
                </div>
                <div>
                  <p className="text-[#241a14] font-body text-sm mb-2" style={{ fontWeight: 500 }}>Opening Hours</p>
                  <div className="text-[#5f4c3e] font-body text-sm space-y-1.5" style={{ fontWeight: 300 }}>
                    <div className="flex justify-between gap-8">
                      <span>Monday</span><span className="text-[#241a14]/65">10am – 12:30pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Tuesday</span><span className="text-[#241a14]/65">10am – 6pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Wed – Fri</span><span className="text-[#241a14]/65">10am – 8pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Saturday</span><span className="text-[#241a14]/65">10am – 5pm</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Sunday</span><span className="text-[#241a14]/65">10am – 3pm</span>
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
            <div className="overflow-hidden border border-[#8c6d35]/12 bg-white/35 h-96 lg:h-full min-h-[400px] shadow-[0_22px_70px_-44px_rgba(36,26,20,0.4)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.432082741104!2d-0.07364868423158667!3d51.524633979637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cc82f7c5555%3A0x22080e1a8a14f73c!2s38%20Cheshire%20St%2C%20London%20E2%206EH!5e0!3m2!1sen!2suk!4v1709913600000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(78%) sepia(12%) brightness(1.03) contrast(0.9)' }}
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
    <footer className="bg-[#241d18] border-t border-[#c9a962]/10 pt-16 pb-8">
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
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#f6ecdd]/90 backdrop-blur-xl border-t border-[#8c6d35]/15 shadow-[0_-18px_55px_-30px_rgba(36,26,20,0.38)] p-4 lg:hidden transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="block">
        <button className="w-full py-4 bg-[#c9a962] text-[#0f0c0a] text-sm tracking-[0.15em] uppercase font-body hover:bg-[#d4b876] transition-all rounded-full shadow-[0_18px_40px_-24px_rgba(140,109,53,0.8)]" style={{ fontWeight: 500 }}>
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
