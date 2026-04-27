import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCart } from '../hook/useCart.js';
import CartItem from '../components/CartItem.jsx';
import CartSummary from '../components/CartSummary.jsx';
import { ShoppingCart, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
const Cart = () => {
    const { items, total, totalItems } = useSelector((state) => state.cart);
    const { handleGetCart, handleUpdateQuantity, handleRemoveItem, loading, error } = useCart();
    useEffect(() => {
        handleGetCart();
    }, [handleGetCart]);
    

    if (loading && items.length === 0) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-20">
                <Loader2 className="text-indigo-500 animate-spin mb-4" size={48} />
                <p className="text-zinc-400 animate-pulse">Loading your premium collection...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                            <ShoppingCart className="text-indigo-500" size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight">Your Cart</h1>
                            <p className="text-zinc-500">{totalItems} luxury items waiting for you</p>
                        </div>
                    </div>
                    <Link 
                        to="/" 
                        className="hidden sm:flex items-center gap-2 text-zinc-400 hover:text-indigo-500 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Continue Shopping
                    </Link>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                        {error}
                    </div>
                )}

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl backdrop-blur-sm">
                        <div className="relative mb-6">
                            <ShoppingBag size={120} className="text-zinc-800" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold text-zinc-600">?</span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-zinc-500 mb-8 max-w-xs text-center">
                            Explore our latest collections and find something extraordinary today.
                        </p>
                        <Link 
                            to="/"
                            className="bg-indigo-500 hover:bg-indigo-600 text-black px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <CartItem 
                                        key={`${item.productId?._id || item.productId}-${item.variantId}`} 
                                        item={item}
                                        onUpdateQuantity={(pid, vid, qty) => handleUpdateQuantity({ productId: pid, variantId: vid, quantity: qty })}
                                        onRemove={(pid, vid) => handleRemoveItem({ productId: pid, variantId: vid })}
                                    />
                                ))}
                            </div>
                            
                            <div className="flex sm:hidden">
                                <Link 
                                    to="/" 
                                    className="flex items-center gap-2 text-zinc-400 hover:text-indigo-500 transition-colors"
                                >
                                    <ArrowLeft size={20} />
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <CartSummary 
                                total={total} 
                                totalItems={totalItems} 
                                onCheckout={() => console.log('Proceeding to checkout...')}
                            />
                            
                            <div className="mt-8 grid grid-cols-3 gap-4 text-center opacity-50">
                                <div className="space-y-2">
                                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Free Delivery</div>
                                    <p className="text-[10px]">Over ₹1000</p>
                                </div>
                                <div className="space-y-2 border-x border-zinc-800">
                                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Easy Returns</div>
                                    <p className="text-[10px]">30-Day Policy</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Secure</div>
                                    <p className="text-[10px]">Encrypted Payment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;