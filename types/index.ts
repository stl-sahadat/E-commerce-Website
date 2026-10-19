export type Gender = 'men' | 'women';

export type MenCategory =
  | 'all'
  | 'panjabi'
  | 'kabli-kurta'
  | 'pajama-sets'
  | 'waistcoats';

export type WomenCategory =
  | 'all'
  | 'sarees'
  | 'jamdani-saree'
  | 'silk-saree'
  | 'cotton-saree'
  | 'tant-saree'
  | 'party-wedding-saree'
  | 'three-piece'
  | 'salwar-kameez'
  | 'kurtis'
  | 'lehenga'
  | 'hijab'
  | 'dupatta-orna'
  | 'new-arrivals'
  | 'best-sellers'
  | 'eid'
  | 'wedding';

export interface ProductColor {
  name: string;
  hex: string;
  secondaryHex?: string;
  bgTone?: string;
}

export type GarmentSilhouette =
  | 'panjabi-straight'
  | 'panjabi-embroidered'
  | 'kabli-suit'
  | 'waistcoat-koti'
  | 'pajama'
  | 'saree-jamdani'
  | 'saree-silk'
  | 'saree-cotton'
  | 'saree-tant'
  | 'three-piece'
  | 'salwar-kameez'
  | 'kurti'
  | 'lehenga'
  | 'hijab'
  | 'dupatta-orna';

export interface Product {
  id: string;
  name: string;
  banglaName?: string;
  gender: Gender;
  category: string;
  subCategory: string;
  price: number; // in BDT (৳)
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  collection: 'regular' | 'eid' | 'wedding' | 'festival';
  colors: ProductColor[];
  sizes: string[]; // e.g. ['38', '40', '42', '44', '46'] or empty for sarees/hijabs/dupattas
  fabric: string;
  weavingOrWork: string;
  description: string;
  careInstructions: string[];
  silhouetteType: GarmentSilhouette;
  patternDetail: string;
  details: {
    collarOrNeck?: string;
    fit?: string;
    length?: string;
    sleeve?: string;
    weaveOrigin?: string;
    palluDetail?: string;
    includedPieces?: string;
  };
  image?: string;
  images?: string[];
}

export interface CartItem {
  id: string; // unique item id = productId + color + size
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface OrderItem {
  productId: string;
  productName: string;
  colorName: string;
  size: string;
  price: number;
  quantity: number;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  district: string;
  deliveryZone: 'inside-dhaka' | 'outside-dhaka';
  orderNotes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  finalTotal: number;
  paymentMethod: 'Cash on Delivery (COD)';
  status: OrderStatus;
  createdAt: string;
}

export interface CatalogFilterState {
  searchQuery: string;
  category: string;
  subCategory?: string;
  priceRange: [number, number];
  selectedColors: string[];
  selectedSizes: string[];
  collectionFilter: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}
