import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../hook/userproduct'

/* ─── Icons ─── */
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
)

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
)

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
)

const PackageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
)

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
)

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
)

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.78 0-.34-9m9.96-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
)

/* ─── Helper: Stat Card ─── */
function StatCard({ label, value, accent = false }) {
    return (
        <div className="rounded-xl px-5 py-4 flex flex-col gap-1" style={{ backgroundColor: '#0a0a0a' }}>
            <span className="text-[11px] font-medium tracking-widest uppercase text-[#6b6356]">{label}</span>
            <span className={`text-2xl font-bold tracking-tight ${accent ? 'text-[#6366f1]' : 'text-[#e5e2e1]'}`}>{value}</span>
        </div>
    )
}

/* ─── Helper: Variant Row ─── */
function VariantCard({ variant, onUpdateStock, onRemove, productId }) {
    const [localStock, setLocalStock] = useState(variant.stock || 0)
    const [updating, setUpdating] = useState(false)

    const formatPrice = (price) => {
        if (!price) return '—'
        const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' }
        return `${symbols[price.currency] || ''}${price.amount.toLocaleString('en-IN')}`
    }

    const adjustStock = async (delta) => {
        const next = Math.max(0, localStock + delta)
        setLocalStock(next)
        setUpdating(true)
        try {
            await onUpdateStock(productId, variant._id, next)
        } catch (err) {
            setLocalStock(variant.stock) // reset on error
        } finally {
            setUpdating(false)
        }
    }

    const handleBlur = async () => {
        if(localStock !== variant.stock) {
             setUpdating(true)
            try {
                await onUpdateStock(productId, variant._id, localStock)
            } catch (err) {
                setLocalStock(variant.stock) // reset on error
            } finally {
                setUpdating(false)
            }
        }
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-[#0a0a0a] transition-all hover:bg-[#212020] group">
            {/* Image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#0e0e0e] shrink-0">
                {variant.images?.[0]?.url ? (
                    <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#4e4633]">
                        <PackageIcon />
                    </div>
                )}
            </div>

            {/* Attributes */}
            <div className="flex-1 flex flex-wrap gap-2">
                {Object.entries(variant.attributes || {}).map(([key, value]) => (
                    <div key={key} className="px-3 py-1.5 rounded-lg bg-[#2a2a2a] text-[#e5e2e1] text-xs font-medium border border-[#3a3939]">
                        <span className="text-[#94a3b8] mr-1.5 uppercase tracking-tighter text-[10px]">{key}:</span>
                        {value}
                    </div>
                ))}
            </div>

            {/* Price */}
            <div className="shrink-0 text-right sm:text-left">
                <p className="text-[10px] text-[#6b6356] uppercase tracking-widest mb-1 font-medium">Price</p>
                <p className="text-lg font-bold text-[#6366f1]">{formatPrice(variant.price)}</p>
            </div>

            {/* Stock Control */}
            <div className="shrink-0 flex flex-col items-center sm:items-end gap-2">
                <p className="text-[10px] text-[#6b6356] uppercase tracking-widest font-medium">Stock Level</p>
                <div className="flex items-center gap-1 bg-[#0e0e0e] rounded-lg p-1 border border-[#2a2a2a]">
                    <button
                        onClick={() => adjustStock(-1)}
                        className="w-8 h-8 rounded flex items-center justify-center text-[#94a3b8] hover:text-[#6366f1] hover:bg-[#0a0a0a] transition-all"
                        disabled={updating || localStock <= 0}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={localStock}
                        onChange={(e) => setLocalStock(parseInt(e.target.value) || 0)}
                        onBlur={handleBlur}
                        className="w-12 bg-transparent text-center text-sm font-bold text-[#e5e2e1] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        onClick={() => adjustStock(1)}
                        className="w-8 h-8 rounded flex items-center justify-center text-[#94a3b8] hover:text-[#6366f1] hover:bg-[#0a0a0a] transition-all"
                        disabled={updating}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={() => onRemove(variant._id)}
                className="p-2.5 rounded-full text-[#6b6356] hover:text-[#ffb4ab] hover:bg-[#93000a]/10 opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Remove variant"
            >
                <TrashIcon />
            </button>
        </div>
    )
}

/* ─── Helper: Add Variant Modal ─── */
function AddVariantModal({ isOpen, onClose, onAdd, productId }) {
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        priceAmount: '',
        priceCurrency: 'INR',
        stock: 0,
        attributes: [{ key: 'Size', value: '' }],
        images: []
    })

    const update = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))

    const addAttr = () => setForm(p => ({ ...p, attributes: [...p.attributes, { key: '', value: '' }] }))
    const updateAttr = (i, k, v) => setForm(p => {
        const next = [...p.attributes]
        next[i] = { key: k, value: v }
        return { ...p, attributes: next }
    })
    const removeAttr = (i) => setForm(p => ({ ...p, attributes: p.attributes.filter((_, idx) => idx !== i) }))

    const handleFile = (e) => {
        const files = Array.from(e.target.files)
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = (ev) => {
                setForm(p => ({ ...p, images: [...p.images, { file, preview: ev.target.result }] }))
            }
            reader.readAsDataURL(file)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('priceAmount', form.priceAmount)
            formData.append('priceCurrency', form.priceCurrency)
            formData.append('stock', form.stock)

            // Convert attributes array to object for DB
            const attrObj = {}
            form.attributes.forEach(a => { if (a.key && a.value) attrObj[a.key] = a.value })
            formData.append('attributes', JSON.stringify(attrObj))

            form.images.forEach(img => formData.append('images', img.file))

            await onAdd(productId, formData)
            onClose()
            setForm({ priceAmount: '', priceCurrency: 'INR', stock: 0, attributes: [{ key: 'Size', value: '' }], images: [] })
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#131313] rounded-3xl p-8 border border-[#2a2a2a] shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[#e5e2e1]">Add New Variant</h2>
                    <button onClick={onClose} className="p-2 text-[#6b6356] hover:text-[#e5e2e1]"><CloseIcon /></button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Attributes */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold tracking-widest uppercase text-[#94a3b8]">Attributes</span>
                            <button type="button" onClick={addAttr} className="text-[10px] text-[#6366f1] hover:underline font-bold">+ ADD ATTRIBUTE</button>
                        </div>
                        {form.attributes.map((attr, i) => (
                            <div key={i} className="flex gap-3 animate-in fade-in duration-300">
                                <input
                                    placeholder="e.g. Size"
                                    value={attr.key}
                                    onChange={(e) => updateAttr(i, e.target.value, attr.value)}
                                    className="flex-1 bg-[#0e0e0e] rounded-lg px-4 py-3 text-sm text-[#e5e2e1] border border-transparent focus:border-[#6366f1]/30 outline-none"
                                />
                                <input
                                    placeholder="Value"
                                    value={attr.value}
                                    onChange={(e) => updateAttr(i, attr.key, e.target.value)}
                                    className="flex-1 bg-[#0e0e0e] rounded-lg px-4 py-3 text-sm text-[#e5e2e1] border border-transparent focus:border-[#6366f1]/30 outline-none"
                                />
                                {form.attributes.length > 1 && (
                                    <button type="button" onClick={() => removeAttr(i)} className="p-3 text-[#ffb4ab] hover:bg-[#93000a]/20 rounded-lg transition-colors"><TrashIcon /></button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-[#94a3b8]">Price (INR)</label>
                            <input
                                type="number"
                                value={form.priceAmount}
                                onChange={update('priceAmount')}
                                className="bg-[#0e0e0e] rounded-lg px-4 py-4 text-sm text-[#e5e2e1] border border-transparent focus:border-[#6366f1]/30 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-[#94a3b8]">Initial Stock</label>
                            <input
                                type="number"
                                value={form.stock}
                                onChange={update('stock')}
                                className="bg-[#0e0e0e] rounded-lg px-4 py-4 text-sm text-[#e5e2e1] border border-transparent focus:border-[#6366f1]/30 outline-none"
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold tracking-widest uppercase text-[#94a3b8]">Variant Images</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-32 rounded-2xl border-2 border-dashed border-[#2a2a2a] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#0a0a0a] transition-all"
                        >
                            <UploadIcon />
                            <span className="text-xs text-[#6b6356]">Upload variant specific images</span>
                            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFile} className="hidden" />
                        </div>
                        {form.images.length > 0 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {form.images.map((img, i) => (
                                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#2a2a2a]">
                                        <img src={img.preview} alt="prev" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setForm(p => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))}
                                            className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-[#ffb4ab] hover:bg-black"
                                        >
                                            <CloseIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 rounded-2xl font-bold text-sm text-[#ffffff] hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' }}
                    >
                        {loading ? 'CREATING...' : 'CREATE VARIANT'}
                    </button>
                </form>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   Main Component: SellerProductDetail
   ───────────────────────────────────────── */
const SellerProductDetail = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const { handleGetProductById, handleAddVariant, handleUpdateStock } = useProduct()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeImage, setActiveImage] = useState(0)
    
 const fetchProduct = async () => {
    try {
        setLoading(true)
        const data = await handleGetProductById(productId)
        setProduct(data.product || data)
    } catch (err) {
        setError('Failed to load product details.')
    } finally {
        setLoading(false)
    }
}
   useEffect(() => {
   



    fetchProduct()

  
}, [productId])


  const onUpdateStock = async (prodId, variantId, stock) => {
    try {
        await handleUpdateStock(prodId, variantId, stock)

        setProduct(prev => ({
            ...prev,
            variants: prev?.variants?.map(v =>
                v._id === variantId ? { ...v, stock } : v
            ) || []
        }))
    } catch (err) {
        console.error('Stock update failed', err)
    }
}

 const onAddVariant = async (pid, formData) => {
    try {
        const res = await handleAddVariant(pid, formData)
        await fetchProduct()
        return res   
    } catch (err) {
        console.error('Add variant failed', err)
        throw err    
    }
}

    if (loading) return (
        <div className="min-h-screen bg-[#131313] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#6366f1]/20 border-t-[#6366f1] rounded-full animate-spin" />
        </div>
    )

    if (error || !product) return (
        <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center p-8 text-center">
            <p className="text-[#ffb4ab] mb-6">{error || 'Product not found'}</p>
            <button onClick={() => navigate('/seller/dashboard')} className="text-[#6366f1] flex items-center gap-2 hover:underline">
                <ArrowLeftIcon /> Back to Dashboard
            </button>
        </div>
    )

    const totalStock = product.variants?.reduce((s, v) => s + (v.stock || 0), 0) || 0

    return (
        <div className="min-h-screen bg-[#000000] text-[#e5e2e1] font-['Outfit',_sans-serif] pb-20">
            {/* Header / Nav */}
            <div className="sticky top-0 z-40 bg-[#131313]/80 backdrop-blur-xl border-b border-[#2a2a2a] px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate('/seller/dashboard')} className="p-2 -ml-2 rounded-full hover:bg-[#0a0a0a] transition-all text-[#6b6356] hover:text-[#e5e2e1]">
                        <ArrowLeftIcon />
                    </button>
                    <div className="text-center flex-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6b6356]">Product Control</p>
                        <h2 className="text-sm font-semibold truncate max-w-xs mx-auto">{product.title}</h2>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-10">
                {/* Product Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    {/* Visuals */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="aspect-3/4 rounded-3xl overflow-hidden bg-[#0a0a0a] border border-[#2a2a2a]">
                            <img
                                src={product.images?.[activeImage]?.url}
                                alt={product.title}
                                className="w-full h-full object-cover transition-opacity duration-500"
                            />
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images?.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 transition-all ${activeImage === i ? 'ring-2 ring-[#6366f1] scale-95' : 'opacity-40 hover:opacity-100'}`}
                                >
                                    <img src={img.url} alt="thumb" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="lg:col-span-7 flex flex-col pt-4">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-[10px] font-bold tracking-widest uppercase">Active Catalog</span>
                            <div className="flex items-center gap-1.5 text-[#6b6356]">
                                <CalendarIcon />
                                <span className="text-xs">{new Date(product.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <h1 className="text-5xl font-black tracking-tight mb-4 leading-[0.9]">{product.title}</h1>
                        <p className="text-lg text-[#94a3b8] leading-relaxed mb-10 max-w-xl">{product.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                            <StatCard label="Base Price" value={`₹${product.price?.amount.toLocaleString('en-IN')}`} accent />
                            <StatCard label="Total Variants" value={product.variants?.length || 0} />
                            <StatCard label="Live Stock" value={totalStock} />
                        </div>
                    </div>
                </div>

                {/* Variants Header */}
                <div className="flex items-end justify-between mb-8 border-b border-[#2a2a2a] pb-6">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight">Active Variants</h3>
                        <p className="text-xs text-[#6b6356] mt-1">Manage stock and pricing for specific product configurations.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-[#ffffff] transition-all hover:brightness-105 active:scale-95"
                        style={{ background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' }}
                    >
                        <PlusIcon /> ADD VARIANT
                    </button>
                </div>

                {/* Variant List */}
                <div className="flex flex-col gap-4">
                    {product.variants?.length > 0 ? (
                        product.variants.map((v) => (
                            <VariantCard
                                key={v._id}
                                productId={product._id}
                                variant={v}
                                onUpdateStock={onUpdateStock}
                                onRemove={() => {}} // Placeholder
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] rounded-3xl border border-dashed border-[#2a2a2a]">
                            <PackageIcon />
                            <p className="mt-4 text-[#6b6356] font-medium text-sm">No variants configured for this product.</p>
                            <button onClick={() => setIsModalOpen(true)} className="mt-6 text-[#6366f1] text-sm font-bold hover:underline">Add first variant</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AddVariantModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={onAddVariant}
                productId={productId}
            />
        </div>
    )
}

export default SellerProductDetail