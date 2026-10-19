'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Gender,
  Product,
  CartItem,
  WishlistItem,
  CustomerOrder,
  OrderStatus,
  ProductColor,
} from '@/types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '@/data/products';

interface ThemeTokens {
  primary: string;
  primaryHover: string;
  charcoalOrBurgundy: string;
  accentGold: string;
  canvasBg: string;
  surfaceBg: string;
  borderTone: string;
  badgeBg: string;
  textMuted: string;
  name: string;
}

interface StoreContextType {
  gender: Gender;
  setGender: (g: Gender) => void;
  theme: ThemeTokens;
  products: Product[];
  currentProducts: Product[];
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  cartSubtotal: number;
  cartCount: number;
  deliveryCharge: number;
  deliveryZone: 'inside-dhaka' | 'outside-dhaka';
  setDeliveryZone: (zone: 'inside-dhaka' | 'outside-dhaka') => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountAmount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  finalTotal: number;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: CustomerOrder[];
  createOrder: (
    data: Omit<CustomerOrder, 'id' | 'createdAt' | 'status' | 'finalTotal' | 'deliveryCharge' | 'discount' | 'subtotal'>
  ) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedCollection: string;
  setSelectedCollection: (col: string) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const MEN_THEME: ThemeTokens = {
  name: 'men',
  primary: '#17382F', // Forest Green
  primaryHover: '#122c25',
  charcoalOrBurgundy: '#101715', // Deep Charcoal
  accentGold: '#D4B779', // Antique Gold
  canvasBg: '#F7F4EC', // Warm Off-White
  surfaceBg: '#FFFFFF',
  borderTone: 'rgba(23, 56, 47, 0.12)',
  badgeBg: '#17382F',
  textMuted: '#52605B',
};

const WOMEN_THEME: ThemeTokens = {
  name: 'women',
  primary: '#6B2838', // Deep Burgundy
  primaryHover: '#541f2c',
  charcoalOrBurgundy: '#3F1620',
  accentGold: '#C6A16B', // Muted Gold
  canvasBg: '#F7EFE6', // Warm Ivory
  surfaceBg: '#FFFFFF',
  borderTone: 'rgba(107, 40, 56, 0.14)',
  badgeBg: '#6B2838',
  textMuted: '#6E5C58',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gender, setGender] = useState<Gender>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bunon_gender');
        if (saved === 'men' || saved === 'women') return saved;
      } catch {}
    }
    return 'men';
  });
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bunon_products_v3');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_PRODUCTS;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bunon_cart');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bunon_wishlist');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bunon_orders');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_ORDERS;
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [deliveryZone, setDeliveryZone] = useState<'inside-dhaka' | 'outside-dhaka'>('inside-dhaka');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSetGender = (g: Gender) => {
    setGender(g);
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSearchQuery('');
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bunon_gender', gender);
    } catch {}
  }, [gender]);

  useEffect(() => {
    try {
      localStorage.setItem('bunon_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bunon_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('bunon_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('bunon_products_v3', JSON.stringify(products));
    } catch {}
  }, [products]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const theme = gender === 'men' ? MEN_THEME : WOMEN_THEME;

  const currentProducts = products.filter((p) => p.gender === gender);

  // Cart operations
  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const effectiveSize = size || (product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    const itemId = `${product.id}-${color.name}-${effectiveSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        const updatedQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: updatedQty } : item
        );
      } else {
        const initialQty = Math.min(product.stock, quantity);
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            product,
            selectedColor: color,
            selectedSize: effectiveSize,
            quantity: initialQty,
          },
        ];
      }
    });

    showNotification(`Added ${product.name} to shopping bag.`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showNotification('Item removed from shopping bag.');
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const clampedQty = Math.min(item.product.stock, newQty);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Delivery calculation: Free for ৳5000+; otherwise ৳80 inside Dhaka, ৳150 outside Dhaka
  const deliveryCharge =
    cartSubtotal === 0 ? 0 : cartSubtotal >= 5000 ? 0 : deliveryZone === 'inside-dhaka' ? 80 : 150;

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + deliveryCharge);

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BUNONFIRST' || cleanCode === 'EID2026') {
      setPromoCode(cleanCode);
      setDiscountPercent(10);
      showNotification('Coupon applied! 10% discount added.');
      return { success: true, message: '10% discount applied to your order!' };
    }
    return { success: false, message: 'Invalid promo code. Try BUNONFIRST' };
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.productId === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.productId !== product.id));
      showNotification(`Removed from saved collection.`);
    } else {
      setWishlist((prev) => [
        ...prev,
        { productId: product.id, product, addedAt: new Date().toISOString() },
      ]);
      showNotification(`Saved ${product.name} to wishlist.`);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // Order creation
  const createOrder = (
    orderData: Omit<
      CustomerOrder,
      'id' | 'createdAt' | 'status' | 'finalTotal' | 'deliveryCharge' | 'discount' | 'subtotal'
    >
  ): CustomerOrder => {
    const newOrderId = `BN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: CustomerOrder = {
      ...orderData,
      id: newOrderId,
      subtotal: cartSubtotal,
      deliveryCharge,
      discount: discountAmount,
      finalTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    showNotification(`Order ${orderId} status updated to ${status}.`);
  };

  // Admin product management
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showNotification(`New product ${newProduct.name} added to catalog.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showNotification(`Product updated successfully.`);
  };

  return (
    <StoreContext.Provider
      value={{
        gender,
        setGender: handleSetGender,
        theme,
        products,
        currentProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartSubtotal,
        cartCount,
        deliveryCharge,
        deliveryZone,
        setDeliveryZone,
        promoCode,
        setPromoCode,
        discountAmount,
        applyPromoCode,
        finalTotal,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        createOrder,
        updateOrderStatus,
        isAdminOpen,
        setIsAdminOpen,
        addProduct,
        updateProduct,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCollection,
        setSelectedCollection,
        notification,
        showNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
