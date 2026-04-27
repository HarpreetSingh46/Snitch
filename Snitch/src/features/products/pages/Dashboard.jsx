import React, { useEffect, useState } from 'react'
import { useProduct } from '../hook/userproduct'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

/* ─── Icons ─── */
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
)

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
)

const PackageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
)

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
)

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
)

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
)

const EmptyBoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
)

/* ─── Image Carousel ─── */
function ImageCarousel({ images, title }) {
    const [current, setCurrent] = useState(0)
    const hasMultiple = images && images.length > 1

    const next = (e) => {
        e.stopPropagation()
        setCurrent((prev) => (prev + 1) % images.length)
    }

    const prev = (e) => {
        e.stopPropagation()
        setCurrent((prev) => (prev - 1 + images.length) % images.length)
    }

    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-[4/5] bg-[#0e0e0e] rounded-xl flex items-center justify-center">
                <PackageIcon />
            </div>
        )
    }

    return (
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden group/carousel bg-[#0e0e0e]">
            {/* Image */}
            <img
                src={images[current].url}
                alt={`${title} — ${current + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Nav arrows */}
            {hasMultiple && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#131313]/70 backdrop-blur-sm text-[#e5e2e1] flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-[#6366f1]/20 hover:text-[#6366f1] transition-all duration-200"
                        aria-label="Previous image"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#131313]/70 backdrop-blur-sm text-[#e5e2e1] flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-[#6366f1]/20 hover:text-[#6366f1] transition-all duration-200"
                        aria-label="Next image"
                    >
                        <ChevronRightIcon />
                    </button>
                </>
            )}

            {/* Dot indicators */}
            {hasMultiple && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current
                                ? 'bg-[#6366f1] w-4'
                                : 'bg-white/40 hover:bg-white/70'
                                }`}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

/* ─── Product Card ─── */
function ProductCard({ product }) {
    const formatPrice = (price) => {
        if (!price) return '—'
        const symbol = price.currency === 'INR' ? '₹' : price.currency === 'USD' ? '$' : price.currency === 'EUR' ? '€' : price.currency === 'GBP' ? '£' : ''
        return `${symbol}${price.amount.toLocaleString('en-IN')}`
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(245,197,24,0.06)]"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            {/* Image */}
            <div className="p-3 pb-0">
                <ImageCarousel images={product.images} title={product.title} />
            </div>

            {/* Details */}
            <div className="p-4 pt-3 flex flex-col gap-2.5">
                {/* Title + Price */}
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[#e5e2e1] font-semibold text-sm tracking-tight leading-snug line-clamp-2 flex-1">
                        {product.title}
                    </h3>
                    <span
                        className="text-sm font-bold tracking-tight whitespace-nowrap shrink-0"
                        style={{ color: '#6366f1' }}
                    >
                        {formatPrice(product.price)}
                    </span>
                </div>

                {/* Description */}
                {product.description && (
                    <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Footer: date + image count */}
                <div className="flex items-center justify-between pt-1.5 border-t border-[#2a2a2a]">
                    <div className="flex items-center gap-1.5 text-[#6b6356]">
                        <CalendarIcon />
                        <span className="text-[11px]">{formatDate(product.createdAt)}</span>
                    </div>
                    {product.images && product.images.length > 0 && (
                        <span className="text-[11px] text-[#6b6356]">
                            {product.images.length} {product.images.length === 1 ? 'image' : 'images'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

/* ─── Stat Card ─── */
function StatCard({ label, value, accent = false }) {
    return (
        <div
            className="rounded-xl px-5 py-4 flex flex-col gap-1"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#6b6356]">
                {label}
            </span>
            <span
                className={`text-2xl font-bold tracking-tight ${accent ? 'text-[#6366f1]' : 'text-[#e5e2e1]'}`}
            >
                {value}
            </span>
        </div>
    )
}

/* ─── Loading Skeleton ─── */
function SkeletonCard() {
    return (
        <div className="rounded-2xl overflow-hidden animate-pulse" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="p-3 pb-0">
                <div className="w-full aspect-[4/5] rounded-xl bg-[#2a2a2a]" />
            </div>
            <div className="p-4 pt-3 flex flex-col gap-3">
                <div className="flex justify-between">
                    <div className="h-4 bg-[#2a2a2a] rounded w-2/3" />
                    <div className="h-4 bg-[#2a2a2a] rounded w-16" />
                </div>
                <div className="h-3 bg-[#2a2a2a] rounded w-full" />
                <div className="h-3 bg-[#2a2a2a] rounded w-4/5" />
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   Main Dashboard Component
   ───────────────────────────────────────── */
const Dashboard = () => {
    const navigate = useNavigate()
    const { handleGetSellerProduct } = useProduct()
    const sellerProducts = useSelector((state) => state.product.sellerProducts)
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                await handleGetSellerProduct()
            } catch (err) {
                console.error('Failed to fetch products:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    /* ── Derived data ── */
    const products = sellerProducts || []
    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalValue = products.reduce((sum, p) => sum + (p.price?.amount || 0), 0)

    return (
        <div
            className="min-h-screen px-4 py-10 sm:px-8 lg:px-16"
            style={{ backgroundColor: '#000000', fontFamily: "'Outfit', sans-serif" }}
        >
            <div className="max-w-7xl mx-auto">

                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
                    <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-[#6b6356] mb-2">
                            Seller Portal
                        </p>
                        <h1
                            className="text-3xl sm:text-4xl font-bold text-[#e5e2e1]"
                            style={{ letterSpacing: '-0.03em' }}
                        >
                            Your Products
                        </h1>
                        <p className="mt-2 text-sm text-[#94a3b8] leading-relaxed max-w-md">
                            Manage, track, and organize everything in your Snitch catalog.
                        </p>
                    </div>

                    {/* Add Product Button */}
                    <button
                        id="add-product-btn"
                        onClick={() => navigate('/seller/products/create')}
                        className="
              flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#ffffff]
              transition-all duration-200 hover:brightness-105 active:scale-[0.97]
              shrink-0 self-start sm:self-auto
            "
                        style={{
                            background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                        }}
                    >
                        <PlusIcon />
                        Add Product
                    </button>
                </div>

                {/* ── Stats Bar ── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    <StatCard label="Total Products" value={products.length} accent />
                    <StatCard label="Catalog Value" value={`₹${totalValue.toLocaleString('en-IN')}`} />
                    <StatCard
                        label="Total Images"
                        value={products.reduce((sum, p) => sum + (p.images?.length || 0), 0)}
                    />
                </div>

                {/* ── Search Bar ── */}
                <div className="mb-8">
                    <div className="relative max-w-md group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6356] group-focus-within:text-[#6366f1] transition-colors duration-200">
                            <SearchIcon />
                        </span>
                        <input
                            id="search-products"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products…"
                            autoComplete="off"
                            className="
                w-full bg-[#0a0a0a] text-[#e5e2e1] placeholder-[#4e4633]
                pl-11 pr-5 py-3.5 rounded-xl text-sm
                border border-transparent
                focus:outline-none focus:border-[#6366f1]/30 focus:ring-0
                transition-colors duration-200
              "
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6356] hover:text-[#e5e2e1] transition-colors"
                                aria-label="Clear search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Product Grid ── */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <>
                        {searchQuery && (
                            <p className="text-xs text-[#6b6356] mb-4">
                                Showing {filteredProducts.length} of {products.length} products
                            </p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredProducts.map((product) => (
                                <div key={product._id} onClick={() => navigate(`/seller/product/${product._id}`)} className="cursor-pointer">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* ── Empty State ── */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="text-[#2a2a2a] mb-6">
                            <EmptyBoxIcon />
                        </div>
                        {searchQuery ? (
                            <>
                                <h2 className="text-lg font-semibold text-[#e5e2e1] mb-2">
                                    No matches found
                                </h2>
                                <p className="text-sm text-[#6b6356] max-w-sm">
                                    No products match "<span className="text-[#94a3b8]">{searchQuery}</span>". Try a different search term.
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-lg font-semibold text-[#e5e2e1] mb-2">
                                    No products yet
                                </h2>
                                <p className="text-sm text-[#6b6356] max-w-sm mb-6">
                                    Start building your catalog by adding your first product.
                                </p>
                                <button
                                    onClick={() => navigate('/seller/products/create')}
                                    className="
                    flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#ffffff]
                    transition-all duration-200 hover:brightness-105 active:scale-[0.97]
                  "
                                    style={{
                                        background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                                    }}
                                >
                                    <PlusIcon />
                                    Create Your First Product
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard