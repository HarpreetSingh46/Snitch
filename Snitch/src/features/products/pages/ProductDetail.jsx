import React, { useEffect, useState, createContext, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProduct } from '../hook/userproduct'
import { useCart } from '../../cart/hook/useCart'
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
    border: 'rgba(255,255,255,0.08)',
    inputBg: '#0a0a0a',
    sizeActive: '#6366f1',
    sizeActiveTxt: '#ffffff',
    sizeIdle: '#0a0a0a',
    sizeIdleTxt: '#94a3b8',
    skeletonBg: '#0f172a',
    perkBg: '#0a0a0a',
    badgeBg: 'rgba(99,102,241,0.1)',
    starColor: '#6366f1',
    overlayBg: 'rgba(0,0,0,0.5)',
    gradientFrom: '#818cf8',
    gradientTo: '#6366f1',
  },
  light: {
    bg: '#ffffff',
    bgNav: 'rgba(255,255,255,0.9)',
    card: '#f8fafc',
    surface: '#f1f5f9',
    text: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    textPrice: '#1e293b',
    accent: '#4f46e5',
    accentDark: '#eef2ff',
    border: 'rgba(0,0,0,0.06)',
    inputBg: '#ffffff',
    sizeActive: '#4f46e5',
    sizeActiveTxt: '#ffffff',
    sizeIdle: '#f8fafc',
    sizeIdleTxt: '#475569',
    skeletonBg: '#e2e8f0',
    perkBg: '#f8fafc',
    badgeBg: 'rgba(79,70,229,0.1)',
    starColor: '#4f46e5',
    overlayBg: 'rgba(255,255,255,0.4)',
    gradientFrom: '#6366f1',
    gradientTo: '#4f46e5',
  },
}

/* ─── Icons ─── */
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
)
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
)
const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
)
const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
)
const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
  </svg>
)
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
)
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M8.25 18.75h6M3.375 14.25h10.875m0 0V6a.75.75 0 0 0-.75-.75H4.125A.75.75 0 0 0 3.375 6v8.25m10.875 0h2.625a.75.75 0 0 0 .688-.462l.866-2.075a.75.75 0 0 0-.688-1.038H14.25" />
  </svg>
)
const ReturnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </svg>
)
const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
)
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)
const StarIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
)
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
)
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
)

/* ─── Theme Toggle Pill ─── */
function ThemeToggle() {
  const { mode, toggle } = useTheme()
  const isDark = mode === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative w-14 h-7 rounded-full p-0.5 focus:outline-none transition-all duration-500"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
          : 'linear-gradient(135deg, #e0e7ff 0%, #f5f3ff 100%)',
        boxShadow: isDark
          ? 'inset 0 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(99,102,241,0.15)'
          : 'inset 0 1px 3px rgba(0,0,0,0.1), 0 0 8px rgba(79,70,229,0.1)',
      }}
    >
      {/* Stars in dark track */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        {isDark && (
          <>
            <span className="absolute w-0.5 h-0.5 rounded-full bg-white/40 top-2 left-2 animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="absolute w-0.75 h-0.75 rounded-full bg-white/30 top-4 left-5 animate-pulse" style={{ animationDelay: '400ms' }} />
            <span className="absolute w-0.5 h-0.5 rounded-full bg-white/50 top-1.5 left-8 animate-pulse" style={{ animationDelay: '800ms' }} />
          </>
        )}
      </div>
      {/* Sliding knob */}
      <div
        className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500"
        style={{
          transform: isDark ? 'translateX(0px)' : 'translateX(26px)',
          transitionTimingFunction: 'cubic-bezier(0.68,-0.55,0.265,1.55)',
          background: isDark
            ? 'linear-gradient(135deg,#F5C518 0%,#e0b400 100%)'
            : 'linear-gradient(135deg,#F5C518 0%,#f7d94c 100%)',
          boxShadow: isDark
            ? '0 0 12px rgba(245,197,24,0.6),0 2px 4px rgba(0,0,0,0.3)'
            : '0 0 12px rgba(245,197,24,0.4),0 2px 4px rgba(0,0,0,0.1)',
          color: '#241a00',
        }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </div>
    </button>
  )
}

function formatPrice(amount, currency = 'INR') {
  const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' }
  return `${symbols[currency] || currency}${Number(amount).toLocaleString('en-IN')}`
}

/* ─── Utils ─── */
const getAttrValue = (variant, key) => {
  if (!variant?.attributes) return null
  if (typeof variant.attributes.get === 'function') return variant.attributes.get(key)
  return variant.attributes[key]
}

/* ─── Skeleton ─── */
function Skeleton() {
  const { t } = useTheme()
  return (
    <div className="animate-pulse" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-5 w-32 rounded mb-8" style={{ backgroundColor: t.skeletonBg }} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {[...Array(4)].map((_, i) => <div key={i} className="w-16 h-20 rounded-lg" style={{ backgroundColor: t.skeletonBg }} />)}
            </div>
            <div className="flex-1 aspect-3/4 rounded-2xl" style={{ backgroundColor: t.skeletonBg }} />
          </div>
          <div className="flex flex-col gap-6">
            {[['2/3', 8], ['full', 4], ['3/4', 4], ['1/3', 10]].map(([w, h], i) => (
              <div key={i} className={`h-${h} w-${w} rounded`} style={{ backgroundColor: t.skeletonBg }} />
            ))}
            <div className="flex gap-2">{[...Array(6)].map((_, i) => <div key={i} className="w-12 h-12 rounded-lg" style={{ backgroundColor: t.skeletonBg }} />)}</div>
            <div className="h-14 w-full rounded-xl" style={{ backgroundColor: t.skeletonBg }} />
            <div className="h-14 w-full rounded-xl" style={{ backgroundColor: t.skeletonBg }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Navbar ─── */
function Navbar({ wishlisted, setWishlisted }) {
  const { t } = useTheme()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const { totalItems } = useSelector((state) => state.cart)
  return (
    <nav
      className="sticky top-0 z-40 backdrop-blur-xl transition-colors duration-500"
      style={{ backgroundColor: t.bgNav, borderBottom: `1px solid ${t.border}` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm transition-colors duration-300 group"
          style={{ color: t.textSecondary }}
          onMouseEnter={e => e.currentTarget.style.color = t.accent}
          onMouseLeave={e => e.currentTarget.style.color = t.textSecondary}
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300"><ArrowLeftIcon /></span>
          Back
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-lg font-bold transition-colors duration-500" style={{ letterSpacing: '-0.03em', color: t.text }}>SNITCH</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.accent }} />
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Wishlist */}
          <button
            onClick={() => setWishlisted(w => !w)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              color: wishlisted ? t.accent : t.textSecondary,
              backgroundColor: wishlisted ? `${t.accent}1a` : 'transparent',
            }}
            aria-label="Wishlist"
          >
            <HeartIcon filled={wishlisted} />
          </button>

          {/* Share */}
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ color: t.textSecondary }}
            onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.backgroundColor = `${t.accent}0d` }}
            onMouseLeave={e => { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.backgroundColor = 'transparent' }}
            aria-label="Share"
          >
            <ShareIcon />
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
            <CartIcon />
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
              className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.97] transition-all duration-200"
              style={{ backgroundColor: t.accent, color: t.accentDark }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

/* ─── Main Component ─── */
const ProductDetailInner = () => {
  const { productId } = useParams()
  const { handleGetProductById } = useProduct()
  const { t, mode } = useTheme()
  const { handleAddItem } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await handleGetProductById(productId)
        setProduct(data.product || data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [productId])

  const availableAttributes = React.useMemo(() => {
    if (!product?.variants) return {}
    const attrs = {}
    product.variants.forEach(v => {
      Object.entries(v.attributes || {}).forEach(([key, value]) => {
        if (!attrs[key]) attrs[key] = new Set()
        attrs[key].add(value)
      })
    })
    const result = {}
    Object.keys(attrs).forEach(key => {
      result[key] = Array.from(attrs[key])
    })
    return result
  }, [product])

  const selectedVariant = React.useMemo(() => {
    if (!product?.variants || product.variants.length === 0) return null
    
    // 1. Try to find a perfect match (all selected attributes match the variant exactly)
    const perfectMatch = product.variants.find(v => {
      const vAttrs = v.attributes || {}
      const vKeys = Object.keys(vAttrs)
      const selectedKeys = Object.keys(selectedAttributes)
      
      // Must match all currently selected attributes
      const matchesSelection = selectedKeys.every(key => {
        const vVal = getAttrValue(v, key)
        return vVal?.toString().toLowerCase() === selectedAttributes[key]?.toString().toLowerCase()
      })
      if (!matchesSelection) return false

      // Ideally, it should also have no extra attributes that we haven't selected
      // but if it's the only one matching the selection so far, it's our best bet.
      return true
    })

    return perfectMatch
  }, [product, selectedAttributes])

  const isSelectionComplete = React.useMemo(() => {
    if (!selectedVariant) return false
    // A selection is complete if the selectedVariant has no attributes that aren't in selectedAttributes
    const vAttrs = selectedVariant.attributes || {}
    return Object.keys(vAttrs).every(key => !!selectedAttributes[key])
  }, [selectedVariant, selectedAttributes])

  const images = React.useMemo(() => {
    const baseImages = product?.images || []
    const variantImages = selectedVariant?.images || []
    const combined = [...baseImages, ...variantImages]
    return combined.length > 0 ? combined : [{ url: 'placeholder', _id: 'p1' }] // Fallback
  }, [product, selectedVariant])

  // Security check for active image bounds
  useEffect(() => {
    if (activeImg >= images.length) {
      setActiveImg(0)
    }
  }, [images.length])

  useEffect(() => {
    if (isSelectionComplete && selectedVariant?.images?.length > 0) {
      const baseImagesCount = product?.images?.length || 0
      setActiveImg(baseImagesCount)
    }
  }, [selectedVariant, isSelectionComplete, product?.images?.length])

  const isOptionAvailable = (attrKey, val) => {
    if (!product?.variants) return true
    return product.variants.some(v => {
      return Object.entries(selectedAttributes).every(([k, vVal]) => {
        if (k === attrKey) return true
        const attrVal = getAttrValue(v, k)
        return attrVal?.toString().toLowerCase() === vVal?.toString().toLowerCase()
      }) && getAttrValue(v, attrKey)?.toString().toLowerCase() === val?.toString().toLowerCase()
    })
  }

  const handleAttributeClick = (key, val) => {
    setSelectedAttributes(prev => {
      if (prev[key] === val) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: val }
    })
  }
  




  const handleAddToCart = async () => {
    if (!isSelectionComplete) {
      // Determine which attribute is missing for the CURRENTLY matched best variant
      const missingAttr = selectedVariant 
        ? Object.keys(selectedVariant.attributes || {}).find(k => !selectedAttributes[k])
        : Object.keys(availableAttributes)[0]
      
      alert(`Please select ${missingAttr || 'all options'}`)
      return
    }

    if (!selectedVariant) {
      alert("Selected combination is not available")
      return
    }

    if (selectedVariant.stock <= 0) {
      alert("This variant is out of stock")
      return
    }

    await handleAddItem({
      productId: product._id,
      variantId: selectedVariant._id,
      quantity,
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

 

  if (loading) return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: t.bg }}>
      <Navbar wishlisted={wishlisted} setWishlisted={setWishlisted} />
      <Skeleton />
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: t.bg, fontFamily: "'Outfit', sans-serif" }}>
      <div className="text-center">
        <p className="text-lg mb-4" style={{ color: t.textSecondary }}>Product not found.</p>
        <Link to="/" className="text-sm hover:underline" style={{ color: t.accent }}>← Back to Home</Link>
      </div>
    </div>
  )

  const price = product.price || {}

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: t.bg, fontFamily: "'Outfit', sans-serif" }}>
      <Navbar wishlisted={wishlisted} setWishlisted={setWishlisted} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-8" style={{ color: t.textMuted }}>
          <Link to="/" className="transition-colors duration-200 hover:underline" style={{ color: t.textMuted }}
            onMouseEnter={e => e.target.style.color = t.accent}
            onMouseLeave={e => e.target.style.color = t.textMuted}
          >Home</Link>
          <span>/</span>
          <span className="capitalize" style={{ color: t.textSecondary }}>{product.title}</span>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── LEFT — Image Gallery ── */}
          <div className="flex gap-3 sm:gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex flex-col gap-2.5 shrink-0">
                {images.map((img, i) => (
                  <button
                    key={img._id}
                    onClick={() => setActiveImg(i)}
                    className="w-14 sm:w-16 h-18 sm:h-20 rounded-lg overflow-hidden shrink-0 transition-all duration-300"
                    style={{
                      border: `2px solid ${i === activeImg ? t.accent : 'transparent'}`,
                      opacity: i === activeImg ? 1 : 0.6,
                      transform: i === activeImg ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    <img src={img.url} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div
              className="relative flex-1 aspect-3/4 rounded-2xl overflow-hidden transition-colors duration-500"
              style={{ backgroundColor: t.card }}
            >
                <img
                  src={images[activeImg]?.url === 'placeholder' ? '/placeholder-product.png' : images[activeImg]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=No+Image' }}
                />

              {/* Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/80">
                  {activeImg + 1} / {images.length}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT — Product Info ── */}
          <div className="flex flex-col gap-6">

            {/* Title + Stars */}
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold leading-tight capitalize transition-colors duration-500"
                style={{ letterSpacing: '-0.02em', color: t.text }}
              >
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex" style={{ color: t.starColor }}>
                  {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= 4} />)}
                </div>
                <span className="text-xs" style={{ color: t.textSecondary }}>
                  4.0 <span style={{ color: t.textMuted }}>(128 reviews)</span>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold" style={{ color: t.accent, letterSpacing: '-0.02em' }}>
                {formatPrice(selectedVariant?.price?.amount || price.amount, selectedVariant?.price?.currency || price.currency)}
              </span>
              {(selectedVariant?.price?.amount || price.amount) < (price.amount * 1.25) && (
                <span className="text-sm line-through" style={{ color: t.textMuted }}>
                  {formatPrice(Math.round((selectedVariant?.price?.amount || price.amount) * 1.25), selectedVariant?.price?.currency || price.currency)}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold transition-colors duration-500"
                style={{ backgroundColor: t.badgeBg, color: t.accent }}>
                20% OFF
              </span>
            </div>

            <div className="w-full h-px transition-colors duration-500" style={{ backgroundColor: t.border }} />

            {/* Description */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-2 transition-colors duration-500" style={{ color: t.textSecondary }}>
                Description
              </p>
              <p className="text-sm leading-relaxed transition-colors duration-500" style={{ color: t.textPrice }}>
                {product.description}
              </p>
            </div>

            {/* Dynamic Variant Selectors */}
            <div className="flex flex-col gap-6">
              {Object.entries(availableAttributes).map(([attrKey, attrValues]) => (
                <div key={attrKey}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium uppercase tracking-widest transition-colors duration-500" style={{ color: t.textSecondary }}>
                      Select {attrKey}
                    </p>
                    {attrKey.toLowerCase() === 'size' && (
                      <button className="text-xs underline underline-offset-2 transition-colors duration-300" style={{ color: `${t.accent}b3` }}
                        onMouseEnter={e => e.target.style.color = t.accent}
                        onMouseLeave={e => e.target.style.color = `${t.accent}b3`}
                      >
                        Size Guide
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {attrValues.map(val => {
                      const isSelected = selectedAttributes[attrKey] === val
                      const isAvailable = isOptionAvailable(attrKey, val)
                      
                      return (
                        <button
                          key={val}
                          onClick={() => handleAttributeClick(attrKey, val)}
                          disabled={!isAvailable}
                          className="min-w-[3rem] h-12 px-3 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: isSelected ? t.sizeActive : t.sizeIdle,
                            color: isSelected ? t.sizeActiveTxt : t.sizeIdleTxt,
                            transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: isSelected ? `0 0 16px ${t.accent}4d` : 'none',
                            border: `1px solid ${isSelected ? 'transparent' : t.border}`,
                          }}
                        >
                          {val}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {/* Selected Variant Stock Status */}
              {selectedVariant && (
                <div className="flex items-center gap-2 -mt-2">
                  <div className={`w-2 h-2 rounded-full ${selectedVariant.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs" style={{ color: t.textSecondary }}>
                    {selectedVariant.stock > 0
                      ? `${selectedVariant.stock} items left in stock`
                      : 'Out of Stock'}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-3 transition-colors duration-500" style={{ color: t.textSecondary }}>
                Quantity
              </p>
              <div className="flex items-center w-fit rounded-xl overflow-hidden" style={{ border: `1px solid ${t.border}` }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-11 h-11 flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                  style={{ backgroundColor: t.card, color: t.textSecondary }}
                  onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.backgroundColor = t.surface }}
                  onMouseLeave={e => { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.backgroundColor = t.card }}
                >
                  <MinusIcon />
                </button>
                <span className="w-12 h-11 flex items-center justify-center text-sm font-semibold transition-colors duration-500"
                  style={{ backgroundColor: t.surface, color: t.text }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  className="w-11 h-11 flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                  style={{ backgroundColor: t.card, color: t.textSecondary }}
                  onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.backgroundColor = t.surface }}
                  onMouseLeave={e => { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.backgroundColor = t.card }}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>

            {/* ── CTA Buttons ── */}
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              {/* Add to Cart */}
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider border-2 transition-all duration-300 active:scale-[0.97]"
                style={{
                  borderColor: addedToCart ? t.accent : `${t.accent}66`,
                  backgroundColor: addedToCart ? `${t.accent}1a` : 'transparent',
                  color: t.accent,
                }}
              >
                <CartIcon />
                {addedToCart ? 'Added ✓' : 'Add to Cart'}
              </button>

              {/* Buy Now */}
              <button
                id="buy-now-btn"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.97] transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${t.gradientFrom} 0%, ${t.gradientTo} 100%)`,
                  color: t.accentDark,
                  boxShadow: `0 0 24px ${t.accent}33`,
                }}
              >
                <BoltIcon />
                Buy Now
              </button>
            </div>

            <div className="w-full h-px transition-colors duration-500" style={{ backgroundColor: t.border }} />

            {/* Perks */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <TruckIcon />, title: 'Free Delivery', sub: 'On orders above ₹999' },
                { icon: <ReturnIcon />, title: 'Easy Returns', sub: '7 day return policy' },
                { icon: <ShieldIcon />, title: 'Authentic', sub: '100% genuine products' },
              ].map(perk => (
                <div
                  key={perk.title}
                  className="flex flex-col items-center text-center gap-1.5 px-2 py-4 rounded-xl transition-colors duration-500"
                  style={{ backgroundColor: t.perkBg, border: `1px solid ${t.border}` }}
                >
                  <span style={{ color: t.accent }}>{perk.icon}</span>
                  <p className="text-xs font-semibold transition-colors duration-500" style={{ color: t.text }}>{perk.title}</p>
                  <p className="text-[10px] transition-colors duration-500" style={{ color: t.textMuted }}>{perk.sub}</p>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs transition-colors duration-500" style={{ color: t.textMuted }}>
              <span>SKU: <span style={{ color: t.textSecondary }}>{product._id?.slice(-8).toUpperCase()}</span></span>
              <span>Listed:{' '}
                <span style={{ color: t.textSecondary }}>
                  {new Date(product.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Mobile Image Strip ── */}
        {images.length > 1 && (
          <div className="mt-14 lg:hidden">
            <p className="text-xs font-medium uppercase tracking-widest mb-4 transition-colors duration-500" style={{ color: t.textSecondary }}>
              All Images
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
              {images.map((img, i) => (
                <button
                  key={img._id}
                  onClick={() => { setActiveImg(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="shrink-0 snap-center w-28 h-36 rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    border: `2px solid ${i === activeImg ? t.accent : 'transparent'}`,
                    opacity: i === activeImg ? 1 : 0.7,
                  }}
                >
                  <img src={img.url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky Mobile CTA ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl px-4 py-3 transition-colors duration-500"
        style={{ backgroundColor: `${t.bg}f0`, borderTop: `1px solid ${t.border}` }}
      >
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider border-2 transition-all duration-300"
            style={{
              borderColor: addedToCart ? t.accent : `${t.accent}66`,
              backgroundColor: addedToCart ? `${t.accent}1a` : 'transparent',
              color: t.accent,
            }}
          >
            {addedToCart ? 'Added ✓' : 'Add to Cart'}
          </button>
          <button
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.97] transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${t.gradientFrom} 0%, ${t.gradientTo} 100%)`,
              color: t.accentDark,
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="h-24 lg:hidden" />
    </div>
  )
}

/* ─── Root with Theme Provider ─── */
const ProductDetail = () => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('snitch-theme') || 'dark'
    }
    return 'dark'
  })

  const toggle = () => {
    setMode(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('snitch-theme', next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ mode, toggle, t: themes[mode] }}>
      <ProductDetailInner />
    </ThemeContext.Provider>
  )
}

export default ProductDetail