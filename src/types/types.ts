import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

// --- GENEL TİPLER ---
export type AppIcon = IconType | LucideIcon;

export type OrderStatusType =
  | 'all'
  | 'continuing'
  | 'returns'
  | 'canceled'
  | 'processing'
  | 'shipped'
  | 'delivered';

export type CardFocused = 'number' | 'expiry' | 'cvc' | 'name' | '';

// --- ADRES & KULLANICI ---
export interface IAddress {
  id: number;
  title: string;
  fullName?: string;
  city: string;
  district: string;
  fullAddress: string;
  phone?: string;
}

export interface IUsers {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  favorites: number[];
  addresses: IAddress[];
}

// --- KATEGORİ & MARKA & SATICI ---
export interface ICategory {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  level: number;
}

export interface IBrand {
  id: number;
  name: string;
  slug: string;
}

export interface ISeller {
  id: number;
  name: string;
  rating: number;
  followerCount: number;
}

// --- ÜRÜNLER ---
export interface IVariant {
  size: string;
  stock: number;
  color: string;
}

export interface IProductFeature {
  key: string;
  value: string;
}

export interface IProducts {
  id: string | number;
  title: string;
  price: number;
  discountPrice: number | null;
  currency: 'TRY' | 'USD';
  categoryId: number;
  brandId: number;
  brandName: string;
  sellerId: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isFreeShipping: boolean;
  badges: string[];
  variants: IVariant[];
  shortDescription: string;
  description: string;
  numberComments?: number;
  features?: IProductFeature[];
  extraDetails?: string[];
  slug?: string;
}

// --- YORUMLAR (REVIEWS) ---
export interface IReview {
  id: number | string;
  productId: number;
  userId: string;
  userFullName: string;
  rating: number;
  comment: string;
  date: string;
  product: string;
  isVerifiedPurchase: boolean;
  status: string;
}

// --- SİPARİŞLER (ORDERS) ---
export interface IOrderItem {
  productId: number | string;
  productName: string;
  title?: string;
  quantity: number;
  price: number;
  image: string;
  slug?: string;
  selectedVariant?: IVariant;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  userId: string;
  orderDate: string;
  status: OrderStatusType;
  totalAmount: number;
  currency: string;
  items: IOrderItem[];
  shippingAddress?: IAddress;
  paymentMethod?: string;
  title?: string;
}

// --- KUPONLAR (COUPONS) ---
export interface ICoupon {
  id: string;
  userId: string;
  code: string;
  type: 'fixed' | 'percentage';
  discountAmount?: number;
  discountPercentage?: number;
  minCartAmount: number;
  description?: string;
  expirationDate?: string;
  isActive: boolean;
}

// --- WIDGETS ---
export interface IWidgetContent {
  id?: number;
  image: string;
  link: string;
  title: string;
}

export interface IWidget {
  id: number;
  type: 'slider' | 'banner_grid' | 'stories';
  title: string;
  content: IWidgetContent[];
}

// --- UI COMPONENT TYPES ---
export interface IHeaderLinks {
  title: string;
  icon: AppIcon;
  href: string;
  badge?: string;
  id?: string;
}

export interface IFooterLinks {
  title: string;
  link1: string;
  link2: string;
  link3: string;
  link4: string;
}

export interface IFooterIcons {
  icon: AppIcon;
  href: string;
}

export interface IFooterPayIcons {
  id: number;
  image: string;
}

export interface IFooterCertificate {
  id: number;
  image: string;
}
export interface IFooterAplication {
  id: number;
  image: string;
}

export interface INavItem {
  id: string;
  label: string;
  path: string;
  badge?: string;
  isHighlighted?: boolean;
}

// --- AUTH ---
export interface ILoginValues {
  email: string;
  password: string;
}

export interface IRegisterValues {
  fullName: string;
  email: string;
  password: string;
}

export interface IUserMenu {
  id: string;
  icon: AppIcon;
  title: string;
  url?: string;
}

export interface IHighlightsData {
  id: number | string;
  text: string;
  icon: AppIcon;
}
export interface ICartHighlightsData {
  id: number;
  text: string;
  icon: AppIcon;
}

export interface IProductBadge {
  id: string;
  text: string;
  icon: AppIcon;
}

// --- SEPET (CART) ---
export interface ICartItem {
  id: string;
  productId: number | string;
  title: string;
  price: number;
  image: string;
  userId: string;
  quantity: number;
  brandName: string;
  rating: number;
  description: string;
  stock?: number;
  selectedVariant: IVariant;
}

export interface IPaymentState {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: CardFocused;
}

export interface IEliteItems {
  icon?: AppIcon;
  iconTop?: AppIcon;
  headTop?: string;
  titleTop?: string;
  color?: string;
  dotColor?: string;
  iconColor?: string;
  description?: string | string[];
  titleBottom?: string;
  star?: AppIcon;
  point?: string;
}

export interface IHelpItem {
  id: number;
  title: string;
}

export interface IMemberShipFormValues {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDay: string;
}

export interface IUpdatePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IDescItems {
  id: number;
  title: string;
  description: string;
}
