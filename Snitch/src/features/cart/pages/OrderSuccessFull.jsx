import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Home, ShoppingBag, Truck } from 'lucide-react';

const OrderSuccessFull = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-2xl w-full relative z-10">
                <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center">
                    {/* Success Icon */}
                    <div className="relative mb-8 inline-block">
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-ping" />
                        <div className="relative bg-gradient-to-tr from-indigo-600 to-indigo-400 p-6 rounded-full shadow-lg shadow-indigo-500/40">
                            <CheckCircle2 size={64} className="text-black" strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Order <span className="text-indigo-500">Confirmed</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-md mx-auto">
                            Thank you for your purchase. Your premium collection items are being prepared for shipment.
                        </p>
                    </div>

                    {/* Order Details Preview (Static/Placeholder) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-5 flex items-center gap-4 group hover:bg-zinc-800/60 transition-colors">
                            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500 group-hover:scale-110 transition-transform">
                                <Package size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Order ID</p>
                                <p className="text-sm font-semibold text-zinc-200">#SN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-5 flex items-center gap-4 group hover:bg-zinc-800/60 transition-colors">
                            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500 group-hover:scale-110 transition-transform">
                                <Truck size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Estimated Delivery</p>
                                <p className="text-sm font-semibold text-zinc-200">3-5 Business Days</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/" 
                            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-black font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/20"
                        >
                            <ShoppingBag size={20} />
                            Continue Shopping
                        </Link>
                        <Link 
                            to="/seller/dashboard" 
                            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] border border-zinc-700"
                        >
                            <Home size={20} />
                            Go to Dashboard
                        </Link>
                    </div>

                    {/* Footer note */}
                    <p className="mt-8 text-zinc-500 text-sm">
                        A confirmation email has been sent to your registered address.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessFull;
