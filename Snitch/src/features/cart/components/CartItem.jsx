import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const product = item.productId;
    const variantId = item.variantId;
    
    // Find variant details for image and attributes if needed
    // Assuming product.variants is available because it's populated or we can handle it
    const variant = product?.variants?.find(v => v._id === variantId) || {};
    const imageUrl = variant?.images?.[0]?.url || product?.images?.[0]?.url || 'https://via.placeholder.com/150';

    return (
        <div className="flex items-center gap-4 p-4 mb-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-indigo-500/30 transition-all duration-300">
            {/* Product Image */}
            <div className="w-24 h-32 flex-shrink-0 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
                <img 
                    src={imageUrl} 
                    alt={product?.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="flex-grow flex flex-col justify-between h-32">
                <div>
                    <h3 className="text-lg font-medium text-white truncate max-w-[200px]">
                        {product?.title || 'Unknown Product'}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {variant?.attributes && Object.entries(variant.attributes).map(([key, value]) => (
                            <span key={key} className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-md">
                                {key}: {value}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-zinc-800/80 rounded-lg p-1 border border-zinc-700">
                        <button 
                            onClick={() => onUpdateQuantity(product._id, variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 hover:text-indigo-500 disabled:opacity-30 transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity(product._id, variantId, item.quantity + 1)}
                            className="p-1 hover:text-indigo-500 transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-indigo-500">
                            {item.price?.currency || '₹'}{item.price?.amount * item.quantity}
                        </span>
                        <button 
                            onClick={() => onRemove(product._id, variantId)}
                            className="text-zinc-500 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
