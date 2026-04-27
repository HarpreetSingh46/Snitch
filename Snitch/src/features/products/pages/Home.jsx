import React, { useEffect, useState, createContext, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/userproduct'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

/* ─── Theme Context ─── */
const ThemeContext = createContext()
const useTheme = () => useContext(ThemeContext)

/* ─── Theme Tokens ─── */
const themes = {
  dark: {
    bg: '#000000',
    bgNav: 'rgba(0,0,0,0.85)',
    card: '#0a0a0a',
    surface: '#050505',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    textPrice: '#cbd5e1',
    accent: '#6366f1',
    accentDark: '#1e1b4b',
    accentGlow: 'rgba(99,102,241,0.08)',
    accentBorder: 'rgba(99,102,241,0.4)',
    border: 'rgba(255,255,255,0.08)',
    gradientFrom: '#818cf8',
    gradientTo: '#6366f1',
    skeletonBg: '#0f172a',
    overlayBg: 'rgba(0,0,0,0.4)',
    searchBg: '#0a0a0a',
  },
  light: {
    bg: '#ffffff',
    bgNav: 'rgba(255,255,255,0.85)',
    card: '#f8fafc',
    surface: '#f1f5f9',
    text: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    textPrice: '#1e293b',
    accent: '#4f46e5',
    accentDark: '#eef2ff',
    accentGlow: 'rgba(79,70,229,0.08)',
    accentBorder: 'rgba(79,70,229,0.5)',
    border: 'rgba(0,0,0,0.06)',
    gradientFrom: '#6366f1',
    gradientTo: '#4f46e5',
    skeletonBg: '#e2e8f0',
    overlayBg: 'rgba(255,255,255,0.4)',
    searchBg: '#ffffff',
  },
}

/* ─── Icons ─── */
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
)

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
)

/* ─── Sun / Moon Toggle Icons ─── */
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
)

/* ─── Theme Toggle Button ─── */
function ThemeToggle() {
  const { mode, toggle } = useTheme()
  const isDark = mode === 'dark'

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full p-0.5 transition-colors duration-500 ease-out focus:outline-none"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1c1b1b 0%, #2a2520 100%)'
          : 'linear-gradient(135deg, #e0d8c8 0%, #f5f0e4 100%)',
        boxShadow: isDark
          ? 'inset 0 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(245,197,24,0.15)'
          : 'inset 0 1px 3px rgba(0,0,0,0.1), 0 0 8px rgba(212,168,16,0.2)',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Stars / Sun rays background */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Dark mode: tiny stars */}
        {isDark && (
          <>
            <span className="absolute w-0.5 h-0.5 rounded-full bg-white/40 top-2 left-2 animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="absolute w-[3px] h-[3px] rounded-full bg-white/30 top-4 left-5 animate-pulse" style={{ animationDelay: '400ms' }} />
            <span className="absolute w-0.5 h-0.5 rounded-full bg-white/50 top-1.5 left-8 animate-pulse" style={{ animationDelay: '800ms' }} />
          </>
        )}
      </div>

      {/* Sliding knob */}
      <div
        className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
        style={{
          transform: isDark ? 'translateX(0px)' : 'translateX(26px)',
          background: isDark
            ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          boxShadow: isDark
            ? '0 0 12px rgba(99,102,241,0.6), 0 2px 4px rgba(0,0,0,0.3)'
            : '0 0 12px rgba(79,70,229,0.4), 0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <span
          className="transition-all duration-500"
          style={{
            color: isDark ? '#ffffff' : '#ffffff',
            transform: isDark ? 'rotate(0deg)' : 'rotate(360deg)',
          }}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
      </div>
    </button>
  )
}

/* ─── Currency Formatter ─── */
function formatPrice(amount, currency = 'INR') {
  const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' }
  const symbol = symbols[currency] || currency
  return `${symbol}${Number(amount).toLocaleString('en-IN')}`
}

/* ─── Product Card ─── */
function ProductCard({ product, index }) {
  const { t } = useTheme()
  const [currentImg, setCurrentImg] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const images = product.images || []
  const price = product.price || {}

  return (
    <div
      className="group relative flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setCurrentImg(0) }}
    >
      {/* Image Container */}
      <div
        className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
        style={{ backgroundColor: t.card }}
      >
        {images.length > 0 ? (
          <img
            src={images[currentImg]?.url}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: t.card }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" style={{ color: t.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted) }}
          className={`
            absolute top-3 right-3 z-10
            w-9 h-9 rounded-full
            flex items-center justify-center
            backdrop-blur-md
            transition-all duration-300 ease-out
            ${isWishlisted
              ? 'scale-100'
              : 'hover:bg-black/50 scale-0 group-hover:scale-100'
            }
          `}
          style={{
            background: isWishlisted ? `${t.accent}33` : t.overlayBg,
            color: isWishlisted ? t.accent : 'rgba(255,255,255,0.7)',
          }}
          aria-label="Add to wishlist"
        >
          <HeartIcon filled={isWishlisted} />
        </button>

        {/* Image Dots Navigator */}
        {images.length > 1 && isHovered && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImg(i) }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentImg ? '20px' : '6px',
                  height: '6px',
                  background: i === currentImg ? t.accent : 'rgba(255,255,255,0.5)',
                }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quick View on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <button
            className="w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            style={{ background: t.accent, color: t.accentDark }}
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 px-1 flex flex-col gap-1.5">
        <h3
          className="text-sm font-medium truncate transition-colors duration-300"
          style={{ color: t.text }}
          onMouseEnter={(e) => e.target.style.color = t.accent}
          onMouseLeave={(e) => e.target.style.color = t.text}
        >
          {product.title}
        </h3>
        <p className="text-xs line-clamp-1" style={{ color: t.textSecondary }}>
          {product.description}
        </p>
        <p className="text-sm font-semibold mt-0.5" style={{ color: t.textPrice }}>
          {formatPrice(price.amount, price.currency)}
        </p>
      </div>
    </div>
  )
}

/* ─── Skeleton Card ─── */
function SkeletonCard() {
  const { t } = useTheme()
  return (
    <div className="flex flex-col animate-pulse">
      <div className="aspect-[3/4] rounded-xl" style={{ backgroundColor: t.skeletonBg }} />
      <div className="mt-4 px-1 flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded" style={{ backgroundColor: t.skeletonBg }} />
        <div className="h-3 w-1/2 rounded" style={{ backgroundColor: t.skeletonBg }} />
        <div className="h-4 w-1/4 rounded" style={{ backgroundColor: t.skeletonBg }} />
      </div>
    </div>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const { t, mode } = useTheme()
  const user = useSelector((state) => state.auth.user)
  const { totalItems } = useSelector((state) => state.cart)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl transition-colors duration-500"
      style={{ backgroundColor: t.bgNav, borderBottom: `1px solid ${t.border}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="text-xl font-bold tracking-tight transition-colors duration-300"
              style={{ letterSpacing: '-0.03em', color: t.text }}
              onMouseEnter={(e) => e.target.style.color = t.accent}
              onMouseLeave={(e) => e.target.style.color = t.text}
            >
              SNITCH
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform duration-300"
              style={{ backgroundColor: t.accent }}
            />
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['New Arrivals', 'Collections', 'Trending'].map((item) => (
              <button
                key={item}
                className="text-xs font-medium uppercase tracking-widest transition-colors duration-300 relative group/link"
                style={{ color: t.textSecondary }}
                onMouseEnter={(e) => e.target.style.color = t.accent}
                onMouseLeave={(e) => e.target.style.color = t.textSecondary}
              >
                {item}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover/link:w-full transition-all duration-300"
                  style={{ backgroundColor: t.accent }}
                />
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ color: t.textSecondary }}
              onMouseEnter={(e) => { e.currentTarget.style.color = t.accent; e.currentTarget.style.backgroundColor = `${t.accent}0d` }}
              onMouseLeave={(e) => { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.backgroundColor = 'transparent' }}
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Bag */}
            <Link
              to="/cart"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 relative"
              style={{ color: t.textSecondary }}
              onMouseEnter={(e) => { e.currentTarget.style.color = t.accent; e.currentTarget.style.backgroundColor = `${t.accent}0d` }}
              onMouseLeave={(e) => { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.backgroundColor = 'transparent' }}
              aria-label="Shopping bag"
            >
              <BagIcon />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: t.accent, color: t.accentDark }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User / Login */}
            {user ? (
              <Link
                to="/seller/dashboard"
                className="flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: `${t.accent}1a`, color: t.accent }}
                aria-label="Profile"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {user.username?.split(' ')[0]}
                </span>
                <UserIcon />
              </Link>
            ) : (
              <Link
                to="/login"
                className="ml-1 px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-[0.97] transition-all duration-200"
                style={{ backgroundColor: t.accent, color: t.accentDark }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Search Bar (expandable) */}
        <div
          className={`overflow-hidden transition-all duration-400 ease-out ${searchOpen ? 'max-h-20 pb-4' : 'max-h-0'}`}
        >
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: t.textSecondary }}>
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search products…"
              className="w-full pl-12 pr-5 py-3 rounded-xl text-sm border border-transparent focus:outline-none transition-colors duration-200"
              style={{
                backgroundColor: t.searchBg,
                color: t.text,
                '--tw-placeholder-color': t.textMuted,
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero Banner ─── */
function HeroBanner() {
  const { t, mode } = useTheme()

  return (
    <section className="relative overflow-hidden transition-colors duration-500">
      {/* Background pattern */}
      <div className="absolute inset-0"
        style={{
          opacity: mode === 'dark' ? 0.03 : 0.04,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${t.accent} 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: t.accentGlow }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-4 flex items-center gap-2" style={{ color: t.accent }}>
            <span className="w-8 h-px" style={{ backgroundColor: t.accent }} />
            New Season 2026
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight transition-colors duration-500"
            style={{ letterSpacing: '-0.03em', color: t.text }}
          >
            Elevate Your
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${t.accent}, ${t.gradientFrom}, ${t.accent})` }}
            >
              Street Style
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed max-w-lg transition-colors duration-500" style={{ color: t.textSecondary }}>
            Discover our curated collection of premium streetwear crafted for those who dare to stand out.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="group/btn px-8 py-3.5 rounded-xl font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all duration-200 flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${t.gradientFrom} 0%, ${t.gradientTo} 100%)`,
                color: t.accentDark,
              }}
            >
              Shop Collection
              <span className="group-hover/btn:translate-x-1 transition-transform duration-200">
                <ArrowRightIcon />
              </span>
            </button>
            <button
              className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                color: t.textPrice,
                border: `1px solid ${t.textMuted}80`,
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = t.accentBorder; e.target.style.color = t.accent }}
              onMouseLeave={(e) => { e.target.style.borderColor = `${t.textMuted}80`; e.target.style.color = t.textPrice }}
            >
              View Lookbook
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Main Home Component ─── */
const Home = () => {
  const products = useSelector((state) => state.product.products)
  const { handleGetAllProducts } = useProduct()
  const navigate = useNavigate()  
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('snitch-theme') || 'dark'
    }
    return 'dark'
  })

  const toggle = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('snitch-theme', next)
      return next
    })
  }

  const t = themes[mode]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await handleGetAllProducts()
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <ThemeContext.Provider value={{ mode, toggle, t }}>
      <div
        className="min-h-screen transition-colors duration-500"
        style={{ backgroundColor: t.bg, fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <HeroBanner />

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] mb-2 flex items-center gap-2" style={{ color: t.accent }}>
                <span className="w-8 h-px" style={{ backgroundColor: t.accent }} />
                Curated For You
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-500"
                style={{ letterSpacing: '-0.02em', color: t.text }}
              >
                All Products
              </h2>
            </div>
            <button
              className="hidden sm:flex items-center gap-2 text-xs font-medium uppercase tracking-widest transition-colors duration-300 group/view"
              style={{ color: t.textSecondary }}
              onMouseEnter={(e) => e.currentTarget.style.color = t.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = t.textSecondary}
            >
              View All
              <span className="group-hover/view:translate-x-1 transition-transform duration-200">
                <ArrowRightIcon />
              </span>
            </button>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div
             
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {products.map((product, index) => (
                <div onClick={() => navigate(`/product/${product._id}`)} >
                  
                <ProductCard key={product._id} product={product} index={index} />
                </div>
              ))}
            </div>    
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500"
                style={{ backgroundColor: t.card }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" style={{ color: t.textMuted }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 transition-colors duration-500" style={{ color: t.text }}>
                No products yet
              </h3>
              <p className="text-sm max-w-sm transition-colors duration-500" style={{ color: t.textSecondary }}>
                Check back soon — our sellers are adding fresh styles every day.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="transition-colors duration-500" style={{ borderTop: `1px solid ${t.border}` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span
                  className="text-lg font-bold tracking-tight transition-colors duration-500"
                  style={{ letterSpacing: '-0.03em', color: t.text }}
                >
                  SNITCH
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.accent }} />
              </div>
              <div className="flex items-center gap-6">
                {['About', 'Contact', 'Terms', 'Privacy'].map((item) => (
                  <button
                    key={item}
                    className="text-xs transition-colors duration-200"
                    style={{ color: t.textSecondary }}
                    onMouseEnter={(e) => e.target.style.color = t.textPrice}
                    onMouseLeave={(e) => e.target.style.color = t.textSecondary}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p className="text-xs transition-colors duration-500" style={{ color: t.textMuted }}>
                © 2026 Snitch. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  )
}

export default Home
