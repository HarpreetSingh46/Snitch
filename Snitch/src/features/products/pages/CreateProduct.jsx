import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../hook/userproduct'
/* ─── Icons ─── */
  
const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
    </svg>
)
const CurrencyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
    </svg>
)
const TextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
)
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
)
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
)
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
)
/* ─── Reusable InputField ─── */
function InputField({ id, label, type = 'text', icon, value, onChange, placeholder }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-xs font-medium tracking-widest uppercase text-[#94a3b8]">
                {label}
            </label>
            <div className="relative flex items-center group">
                <span className="absolute left-4 text-[#94a3b8] group-focus-within:text-[#6366f1] transition-colors duration-200">
                    {icon}
                </span>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="
            w-full bg-[#0e0e0e] text-[#e5e2e1] placeholder-[#4e4633]
            pl-12 pr-5 py-4 rounded-lg text-sm
            border border-transparent
            focus:outline-none focus:border-[#6366f1]/40 focus:ring-0
            transition-colors duration-200
          "
                />
            </div>
        </div>
    )
}
/* ─── TextareaField ─── */
function TextareaField({ id, label, icon, value, onChange, placeholder, rows = 4 }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-xs font-medium tracking-widest uppercase text-[#94a3b8]">
                {label}
            </label>
            <div className="relative group">
                <span className="absolute left-4 top-4 text-[#94a3b8] group-focus-within:text-[#6366f1] transition-colors duration-200">
                    {icon}
                </span>
                <textarea
                    id={id}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="
            w-full bg-[#0e0e0e] text-[#e5e2e1] placeholder-[#4e4633]
            pl-12 pr-5 py-4 rounded-lg text-sm resize-none
            border border-transparent
            focus:outline-none focus:border-[#6366f1]/40 focus:ring-0
            transition-colors duration-200 leading-relaxed
          "
                />
            </div>
        </div>
    )
}
/* ─── Main Component ─── */
const CreateProduct = () => {
    const { handleCreateProduct } = useProduct() 
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const [form, setForm] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    })
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isDragOver, setIsDragOver] = useState(false)
    const MAX_IMAGES = 7
    const update = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
    /* ── Image handling ── */
    const processFiles = useCallback((files) => {
        const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
        const remaining = MAX_IMAGES - images.length
        const toAdd = validFiles.slice(0, remaining)
        toAdd.forEach((file) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImages((prev) => {
                    if (prev.length >= MAX_IMAGES) return prev
                    return [...prev, { file, preview: e.target.result }]
                })
            }
            reader.readAsDataURL(file)
        })
    }, [images.length])
    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragOver(true)
    }
    const handleDragLeave = () => setIsDragOver(false)
    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)
        processFiles(e.dataTransfer.files)
    }
    const handleFileInput = (e) => {
        processFiles(e.target.files)
        e.target.value = ''
    }
    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }
    /* ── Submit ── */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            // Build FormData for API call
            const formData = new FormData()
            formData.append('title', form.title)
            formData.append('description', form.description)
            formData.append('priceAmount', form.priceAmount)
            formData.append('priceCurrency', form.priceCurrency)
            images.forEach((img) => formData.append('images', img.file))
            // TODO: Replace with actual API call
             //await createProduct(formData)
              await handleCreateProduct(formData) 
            console.log('Submitting product:', { ...form, imageCount: images.length })
            navigate('/')
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || 'Failed to create product')
        } finally {
            setLoading(false)
        }
    }
    const currencies = [
        { code: 'INR', symbol: '₹' },
        { code: 'USD', symbol: '$' },
        { code: 'EUR', symbol: '€' },
        { code: 'GBP', symbol: '£' },
    ]
    return (
        <div
            className="min-h-screen flex items-start justify-center px-4 py-16 sm:py-24"
            style={{ backgroundColor: '#000000', fontFamily: "'Outfit', sans-serif" }}
        >
            {/* Card */}
            <div
                className="w-full max-w-2xl rounded-2xl px-8 py-14 sm:px-12"
                style={{ backgroundColor: '#0a0a0a' }}
            >
                {/* Header */}
                <div className="mb-12">
                    <h1
                        className="text-3xl font-bold text-[#e5e2e1] tracking-tight"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Create Product
                    </h1>
                    <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
                        Add a new product to your Snitch catalog.
                    </p>
                </div>
                {/* Error banner */}
                {error && (
                    <div className="mb-8 px-4 py-3 rounded-lg bg-[#93000a]/30 text-[#ffb4ab] text-sm">
                        {error}
                    </div>
                )}
                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                    {/* Title */}
                    <InputField
                        id="product-title"
                        label="Title"
                        placeholder="e.g. Classic Oversized Tee"
                        icon={<TagIcon />}
                        value={form.title}
                        onChange={update('title')}
                    />
                    {/* Description */}
                    <TextareaField
                        id="product-description"
                        label="Description"
                        placeholder="Describe your product — material, fit, style…"
                        icon={<TextIcon />}
                        value={form.description}
                        onChange={update('description')}
                        rows={5}
                    />
                    {/* Price Row */}
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium tracking-widest uppercase text-[#94a3b8]">
                            Pricing
                        </span>
                        <div className="flex gap-4">
                            {/* Amount */}
                            <div className="relative flex items-center group flex-1">
                                <span className="absolute left-4 text-[#94a3b8] group-focus-within:text-[#6366f1] transition-colors duration-200">
                                    <CurrencyIcon />
                                </span>
                                <input
                                    id="price-amount"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.priceAmount}
                                    onChange={update('priceAmount')}
                                    placeholder="0.00"
                                    autoComplete="off"
                                    className="
                    w-full bg-[#0e0e0e] text-[#e5e2e1] placeholder-[#4e4633]
                    pl-12 pr-5 py-4 rounded-lg text-sm
                    border border-transparent
                    focus:outline-none focus:border-[#6366f1]/40 focus:ring-0
                    transition-colors duration-200
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                  "
                                />
                            </div>
                            {/* Currency */}
                            <div className="relative group w-36">
                                <select
                                    id="price-currency"
                                    value={form.priceCurrency}
                                    onChange={update('priceCurrency')}
                                    className="
                    w-full bg-[#0e0e0e] text-[#e5e2e1]
                    pl-5 pr-10 py-4 rounded-lg text-sm
                    border border-transparent appearance-none cursor-pointer
                    focus:outline-none focus:border-[#6366f1]/40 focus:ring-0
                    transition-colors duration-200
                  "
                                >
                                    {currencies.map(({ code, symbol }) => (
                                        <option key={code} value={code} className="bg-[#0e0e0e] text-[#e5e2e1]">
                                            {symbol}  {code}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                                    <ChevronDownIcon />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Image Upload */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-medium tracking-widest uppercase text-[#94a3b8]">
                            Product Images
                            <span className="ml-2 normal-case tracking-normal text-[#4e4633] font-normal">
                                ({images.length}/{MAX_IMAGES})
                            </span>
                        </span>
                        {/* Drop zone */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => images.length < MAX_IMAGES && fileInputRef.current?.click()}
                            className={`
                flex flex-col items-center justify-center gap-3 py-12
                rounded-lg cursor-pointer
                transition-all duration-300 ease-out
                ${isDragOver
                                    ? 'bg-[#6366f1]/5 border-[#6366f1]/40'
                                    : 'bg-[#0e0e0e] border-[#4e4633]/30 hover:border-[#94a3b8]/30'
                                }
                ${images.length >= MAX_IMAGES
                                    ? 'opacity-40 cursor-not-allowed'
                                    : ''
                                }
              `}
                            style={{ border: '1.5px dashed' }}
                        >
                            <span className={`transition-colors duration-200 ${isDragOver ? 'text-[#6366f1]' : 'text-[#94a3b8]'}`}>
                                <UploadIcon />
                            </span>
                            <div className="text-center">
                                <p className="text-sm text-[#d1c5ac]">
                                    Drag and drop high-res visuals or{' '}
                                    <span className="text-[#6366f1] font-medium">browse</span>
                                </p>
                                <p className="text-xs text-[#4e4633] mt-1.5">
                                    PNG, JPG, or WEBP — up to 7 images
                                </p>
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        {/* Thumbnail grid */}
                        {images.length > 0 && (
                            <div className="flex gap-3 mt-2 flex-wrap">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative group/thumb w-20 h-20 rounded-lg overflow-hidden bg-[#0e0e0e] flex-shrink-0"
                                    >
                                        <img
                                            src={img.preview}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200" />
                                        {/* Remove button */}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeImage(index) }}
                                            className="
                        absolute top-1.5 right-1.5
                        w-5 h-5 rounded-full
                        bg-[#131313]/80 text-[#ffb4ab]
                        flex items-center justify-center
                        opacity-0 group-hover/thumb:opacity-100
                        hover:bg-[#93000a]/60
                        transition-all duration-200
                      "
                                            aria-label={`Remove image ${index + 1}`}
                                        >
                                            <CloseIcon />
                                        </button>
                                    </div>
                                ))}
                                {/* Empty placeholders */}
                                {Array.from({ length: MAX_IMAGES - images.length }).map((_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="
                      w-20 h-20 rounded-lg
                      bg-[#0e0e0e] cursor-pointer
                      flex items-center justify-center
                      hover:bg-[#1c1b1b] transition-colors duration-200
                    "
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#4e4633]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Show all empty placeholders when no images */}
                        {images.length === 0 && (
                            <div className="flex gap-3 mt-2">
                                {Array.from({ length: MAX_IMAGES }).map((_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="
                      w-20 h-20 rounded-lg
                      bg-[#0e0e0e] cursor-pointer
                      flex items-center justify-center
                      hover:bg-[#1c1b1b] transition-colors duration-200
                    "
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#4e4633]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
              mt-4 w-full py-4 rounded-lg font-semibold text-sm text-[#ffffff]
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:brightness-105 active:scale-[0.98]
            "
                        style={{
                            background: loading
                                ? '#6366f1'
                                : 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                        }}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Publishing…
                            </span>
                        ) : (
                            'Publish Product'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default CreateProduct