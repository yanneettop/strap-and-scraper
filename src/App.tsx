import { useState, useEffect } from 'react'
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
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import './App.css'

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-gold/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <span className="font-display text-xl lg:text-2xl text-brand-cream tracking-wide">
                The <span style={{ color: '#c9a962' }}>Groom</span> Room
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-brand-muted hover:text-brand-gold transition-colors duration-200 text-sm font-medium tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a 
                href="https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  className="bg-brand-gold text-brand-dark hover:bg-brand-gold-hover font-semibold px-6 tracking-wide"
                >
                  Book Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-brand-cream p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-brand-dark/98 backdrop-blur-lg transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-display text-brand-cream hover:text-brand-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Button 
              className="bg-brand-gold text-brand-dark hover:bg-brand-gold-hover font-semibold px-8 py-6 text-lg mt-4"
            >
              Book Now
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/hero-bg.jpg" 
          alt="The Groom Room Barbershop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-20">
        <p className="text-brand-gold text-base sm:text-lg tracking-[0.35em] uppercase mb-4 animate-fade-in-up" style={{letterSpacing: '0.25em'}}>
          SHOREDITCH, LONDON
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-cream mb-6 leading-tight animate-fade-in-up stagger-1" style={{fontWeight: 600, letterSpacing: '-0.01em'}}>
          The Cut You
          <br />
          <span className="text-brand-gold block text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{fontWeight: 700, letterSpacing: '-0.01em'}}>Deserve</span>
        </h1>
        <p className="text-brand-muted text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 animate-fade-in-up stagger-2">
          Shoreditch barbering since 2018. Consultation first. No rushed cuts. Product that works.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
          <a 
            href="https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              size="lg"
              className="bg-brand-gold text-brand-dark hover:bg-brand-gold-hover font-semibold px-8 py-6 text-base tracking-wide hover:scale-105 transition-transform"
            >
              Book Your Chair
            </Button>
          </a>
          <a href="#services">
            <Button 
              size="lg"
              variant="outline"
              className="border-brand-gold/50 text-brand-cream hover:bg-brand-gold/10 hover:border-brand-gold px-8 py-6 text-base"
            >
              View Services
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-gold/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-brand-gold rounded-full" />
        </div>
      </div>
    </section>
  )
}

// Trust Bar Section
function TrustBar() {
  return (
    <section className="bg-brand-secondary border-y border-brand-gold/10 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <span className="text-brand-cream font-semibold">5.0</span>
          </div>
          <div className="h-8 w-px bg-brand-gold/20 hidden sm:block" />
          <p className="text-brand-muted text-center sm:text-left">
            Rated <span className="text-brand-cream font-semibold">5.0</span> by{' '}
            <span className="text-brand-cream font-semibold">232+</span> Londoners on Google
          </p>
          <div className="h-8 w-px bg-brand-gold/20 hidden sm:block" />
          <a 
            href="https://search.google.com/local/reviews?placeid=ChIJVVV8L8gcdkgRPPcUihoOCCI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:text-brand-gold-hover text-sm font-medium flex items-center gap-1 transition-colors"
          >
            Read Reviews <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// Services Section
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
    <section id="services" className="py-20 lg:py-32 bg-brand-dark">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-4">What We Do</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-cream mb-4">
            The Menu
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto">
            Straightforward pricing. No surprises. Just quality cuts from barbers who care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.name}
              className="group bg-brand-secondary rounded-lg overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg text-brand-cream">{service.name}</h3>
                  <span className="text-brand-gold font-semibold">{service.price}</span>
                </div>
                <div className="flex items-center gap-2 text-brand-muted text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <p className="text-brand-muted text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <a 
                  href="https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button 
                    variant="outline"
                    className="w-full border-brand-gold/30 text-brand-cream hover:bg-brand-gold hover:text-brand-dark transition-all"
                  >
                    Book This
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline"
              className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark px-8"
            >
              View Full Menu <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

// Gallery Section
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

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + images.length) % images.length
      : (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex].src)
  }

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-brand-secondary">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-4">Step Inside</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-cream mb-4">
            The Shop
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto">
            Where craft meets conversation. Take a look around our Shoreditch space.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={image.src}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(image.src, index)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-brand-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-brand-dark/95 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-brand-cream hover:text-brand-gold p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <button 
            className="absolute left-4 text-brand-cream hover:text-brand-gold p-2"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            className="absolute right-4 text-brand-cream hover:text-brand-gold p-2"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Gallery"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

// Reviews Section
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
    <section id="reviews" className="py-20 lg:py-32 bg-brand-dark">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-4">Word on the Street</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-cream mb-4">
            What London Says
          </h2>
        </div>

        {/* Reviews Slider */}
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-brand-secondary rounded-lg p-8 md:p-12 border border-brand-gold/10 text-center">
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-brand-cream text-lg md:text-xl mb-6 italic">
                      "{review.text}"
                    </p>
                    <div>
                      <p className="text-brand-gold font-semibold">{review.name}</p>
                      <p className="text-brand-muted text-sm">{review.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentReview ? 'bg-brand-gold' : 'bg-brand-muted/30'
                }`}
                onClick={() => setCurrentReview(index)}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-12">
          <a 
            href="https://search.google.com/local/reviews?placeid=ChIJVVV8L8gcdkgRPPcUihoOCCI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline"
              className="border-brand-gold/30 text-brand-muted hover:text-brand-gold hover:border-brand-gold"
            >
              Leave Your Review on Google
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

// Merch Teaser Section
function MerchSection() {
  return (
    <section id="merch" className="py-20 lg:py-32 bg-brand-tertiary">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img 
              src="/merch-products.jpg" 
              alt="S&S Products"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div>
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-4">Limited Drops</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-cream mb-6">
              The Drop
            </h2>
            <p className="text-brand-muted text-lg mb-6">
              Made for the shop. Built for the street. Our pomades and grooming products are formulated 
              for the modern Londoner who demands quality.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Professional-grade pomades',
                'Beard oils & balms',
                'S&S branded apparel',
                'Gift sets & bundles',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-brand-muted">
                  <Scissors className="w-4 h-4 text-brand-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="https://strapandscraperlondon.com/shop/">
              <Button 
                className="bg-brand-gold text-brand-dark hover:bg-brand-gold-hover font-semibold px-8"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Merch
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Banner Section
function CTABanner() {
  return (
    <section className="py-16 bg-brand-gold">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl sm:text-3xl text-brand-dark mb-2">
              Walk-ins welcome. Bookings preferred.
            </h2>
            <p className="text-brand-dark/70">
              38 Cheshire Street, Shoreditch, London E2 6EH
            </p>
          </div>
          <a 
            href="https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              size="lg"
              className="bg-brand-dark text-brand-cream hover:bg-brand-secondary px-8"
            >
              Book Your Chair
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-brand-dark">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-4">Find Us</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-cream mb-8">
              Visit the Shop
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-gold mt-1" />
                <div>
                  <p className="text-brand-cream font-medium">Address</p>
                  <p className="text-brand-muted">38 Cheshire Street</p>
                  <p className="text-brand-muted">Shoreditch, London E2 6EH</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-brand-gold mt-1" />
                <div>
                  <p className="text-brand-cream font-medium">Phone</p>
                  <a href="tel:07747997189" className="text-brand-muted hover:text-brand-gold transition-colors">
                    07747 997189
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-brand-gold mt-1" />
                <div>
                  <p className="text-brand-cream font-medium">Opening Hours</p>
                  <div className="text-brand-muted space-y-1">
                    <p>Mon: 10am - 12:30pm</p>
                    <p>Tue: 10am - 6pm</p>
                    <p>Wed - Fri: 10am - 8pm</p>
                    <p>Sat: 10am - 5pm</p>
                    <p>Sun: 10am - 3pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden border border-brand-gold/10 h-96 lg:h-auto">
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
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-brand-secondary border-t border-brand-gold/10 py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div>
            <a href="#" className="inline-block mb-4">
              <span className="font-display text-2xl text-brand-cream">
                The <span style={{ color: '#c9a962' }}>Groom</span> Room
              </span>
            </a>
            <p className="text-brand-muted text-sm">
              Victorian craft. Shoreditch soul.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brand-cream font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Services', 'Book Now', 'Gallery', 'Merch', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-brand-muted hover:text-brand-gold transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-brand-cream font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a 
                href="https://instagram.com/strapandscraperlondon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/strapandscraper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-muted hover:text-brand-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <a 
              href="https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="sm"
                className="bg-brand-gold text-brand-dark hover:bg-brand-gold-hover"
              >
                Book Now
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-sm">
            © 2024 Strap & Scraper London. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-brand-muted hover:text-brand-gold transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-brand-muted hover:text-brand-gold transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Sticky Mobile CTA
function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-secondary/95 backdrop-blur-md border-t border-brand-gold/20 p-4 lg:hidden">
      <a 
        href="https://www.fresha.com/book-now/strap-and-scraper-london-hgr4gb4s/all-offer?share=true&pId=539810"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <Button 
          className="w-full bg-brand-gold text-brand-dark hover:bg-brand-gold-hover font-semibold py-6"
        >
          Book Your Chair
        </Button>
      </a>
    </div>
  )
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-brand-dark">
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
