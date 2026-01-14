import {
  Camera,
  Eye,
  Gift,
  Heart,
  MailIcon,
  Package,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  UserIcon,
} from 'lucide-react';
import { BiCabinet, BiComment, BiDiamond, BiHeart, BiSolidDiscount } from 'react-icons/bi';
import { BsPerson, BsQuestion } from 'react-icons/bs';
import { CgShoppingCart } from 'react-icons/cg';
import {
  FaClipboardCheck,
  FaFacebook,
  FaHandHoldingUsd,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { TiMessages } from 'react-icons/ti';

import {
  ICartHighlightsData,
  IDescItems,
  IEliteItems,
  IFooterAplication,
  IFooterCertificate,
  IFooterIcons,
  IFooterLinks,
  IFooterPayIcons,
  IHeaderLinks,
  IHelpItem,
  IHighlightsData,
  INavItem,
  IProductBadge,
  IUserMenu,
  IWidgetContent,
  OrderStatusType,
} from '@/types/types';

// --- CONSTANTS --

export const HEADER_LINKS: IHeaderLinks[] = [
  {
    title: 'Giriş Yap',
    icon: BsPerson,
    href: '/login',
  },
  {
    title: 'Favorilerim',
    icon: BiHeart,
    href: '/favorites',
  },
  {
    title: 'Sepetim',
    icon: CgShoppingCart,
    href: '/cart',
  },
];

export const FOOTER_LINKS: IFooterLinks[] = [
  {
    title: 'Trendyol',
    link1: 'Biz Kimiz',
    link2: 'Kariyer',
    link3: 'Sürdürülebilirlik',
    link4: 'İletişim',
  },
  {
    title: 'Kampanyalar',
    link1: 'Kampanyalar',
    link2: 'Alışveriş Kredisi',
    link3: 'Elit Üyelik',
    link4: 'Hediye Fikirleri',
  },
  {
    title: 'Satıcı',
    link1: "Trendyol'da Satış Yap",
    link2: 'Temel Kavramlar',
    link3: 'Trendyol Akademi',
    link4: "Trendyol'da Güvenlik",
  },
  {
    title: 'Yardım',
    link1: 'Sıkça Sorulan Sorular',
    link2: 'Canlı Yardım / Asistan',
    link3: 'Nasıl İade Edebilirim',
    link4: 'İşlem Rehberi',
  },
];

export const FOOTER_ICONS: IFooterIcons[] = [
  {
    icon: FaFacebook,
    href: 'https://www.facebook.com/Trendyol',
  },
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/trendyolcom/',
  },
  {
    icon: FaYoutube,
    href: 'https://www.youtube.com/trendyol',
  },
  {
    icon: FaX,
    href: 'https://x.com/trendyol',
  },
];

export const FOOTER_APPLICATION: IFooterAplication[] = [
  {
    id: 1,
    image: '/footerimages/app-store-tr.webp',
  },
  {
    id: 2,
    image: '/footerimages/appgallery-tr.webp',
  },
  {
    id: 3,
    image: '/footerimages/google-play.webp',
  },
];

export const FOOTER_PAY_IMAGE: IFooterPayIcons[] = [
  { id: 1, image: '/footerimages/mastercard.webp' },
  { id: 2, image: '/footerimages/americanexpress.webp' },
  { id: 3, image: '/footerimages/visa.webp' },
  { id: 4, image: '/footerimages/troy.webp' },
];

export const FOOTER_CERTIFICATE: IFooterCertificate[] = [
  {
    id: 1,
    image: '/footerimages/footer-etbis.webp',
  },
  {
    id: 2,
    image: '/footerimages/footer-iso.webp',
  },
  {
    id: 3,
    image: '/footerimages/footer-pci-dss.webp',
  },
  {
    id: 4,
    image: '/footerimages/footer-trust-stamp.webp',
  },
];

export const HEADER_NAV_ITEMS: INavItem[] = [
  {
    id: 'kadin',
    label: 'Kadın',
    path: '/category/kadin',
  },
  {
    id: 'erkek',
    label: 'Erkek',
    path: '/category/erkek',
  },
  {
    id: 'anne-cocuk',
    label: 'Anne & Çocuk',
    path: '/category/anne-cocuk',
  },
  {
    id: 'ev-yasam',
    label: 'Ev & Yaşam',
    path: '/category/ev-yasam',
  },
  {
    id: 'supermarket',
    label: 'Süpermarket',
    path: '/category/supermarket',
  },
  {
    id: 'kozmetik',
    label: 'Kozmetik',
    path: '/category/kozmetik',
  },
  {
    id: 'ayakkabi-canta',
    label: 'Ayakkabı & Çanta',
    path: '/category/ayakkabi-canta',
  },
  {
    id: 'elektronik',
    label: 'Elektronik',
    path: '/category/elektronik',
  },
  {
    id: 'flas-urunler',
    label: 'Flaş Ürünler',
    path: '/category/flas-urunler',
    badge: 'Yeni',
    isHighlighted: true,
  },
  {
    id: 'cok-satanlar',
    label: 'Çok Satanlar',
    path: '/category/cok-satanlar',
    badge: 'Yeni',
    isHighlighted: true,
  },
];

export const USER_MENU: IUserMenu[] = [
  {
    id: 'orders',
    icon: Package,
    title: 'Tüm Siparişlerim',
    url: '/account/orders',
  },
  {
    id: 'reviews',
    icon: BiComment,
    title: 'Değerlendirmelerim',
    url: '/account/reviews',
  },
  {
    id: 'messages',
    icon: MailIcon,
    title: 'Satıcı Mesajlarım',
    url: '#',
  },
  {
    id: 'credits',
    icon: FaHandHoldingUsd,
    title: 'Krediler',
    url: '#',
  },
  {
    id: 'giveaway',
    icon: Gift,
    title: 'Şanslı Çekiliş',
    url: '#',
  },
  {
    id: 'coupons',
    icon: BiSolidDiscount,
    title: 'İndirim Kuponlarım',
    url: '/account/coupons',
  },
  {
    id: 'accountinfo',
    icon: UserIcon,
    title: 'Kullanıcı Bilgilerim',
    url: '/account/info',
  },
  {
    id: 'plus',
    icon: Plus,
    title: 'Trendyol Plus',
    url: '#',
  },
  {
    id: 'elite',
    icon: BiDiamond,
    title: 'Trendyol Elit',
    url: '/account/elite',
  },
  {
    id: 'help',
    icon: BsQuestion,
    title: 'Yardım',
    url: '/help',
  },
];

export const ORDER_TABS: { id: OrderStatusType; label: string }[] = [
  { id: 'all', label: 'Tüm Siparişlerim' },
  { id: 'continuing', label: 'Devam Eden Siparişler' },
  { id: 'returns', label: 'İadeler' },
  { id: 'canceled', label: 'İptaller' },
];

export const HIGHLIGHTS_DATA: IHighlightsData[] = [
  {
    id: 1,
    text: 'Son 24 saatte 9.2k kişi inceledi!',
    icon: Eye,
  },
  {
    id: 2,
    text: '500+ kişinin sepetinde, kaçırma!',
    icon: ShoppingBag,
  },
  {
    id: 3,
    text: '7k kişi favoriledi!',
    icon: Heart,
  },
  {
    id: 4,
    text: 'Hızlı Teslimat yapılıyor',
    icon: Truck,
  },
];
export const CART_HIGHLIGHTS_DATA: ICartHighlightsData[] = [
  {
    id: 1,
    text: 'Sepetindeki ürünler son 3 günde 20 adet satıldı!',
    icon: CgShoppingCart,
  },
  {
    id: 2,
    text: '20 saat 36 dakika içinde sipariş ver, ürünlerini hızlı teslim al!',
    icon: Package,
  },
];

export const PRODUCT_BADGES: IProductBadge[] = [
  { id: '1', text: 'Kargo Bedava', icon: Package },
  { id: '2', text: 'Kupon Fırsatı', icon: BiSolidDiscount },
];

// --- WIDGET & CATEGORY DATA ---

export const WIDGET_ITEMS: IWidgetContent[] = [
  { title: 'Sanat Eserleri', image: '/image/banner1.webp', link: '/' },
  { title: 'Krediler', image: '/image/banner2.webp', link: '/' },
  { title: 'Yeni Gelenler', image: '/image/banner3.webp', link: '/' },
  { title: 'Özetim', image: '/image/banner4.webp', link: '/' },
  { title: 'Evlilik Paketi', image: '/image/banner5.webp', link: '/' },
  { title: 'Kuponlarım', image: '/image/banner6.webp', link: '/' },
  { title: 'İyi Fiyat', image: '/image/banner7.webp', link: '/' },
  { title: 'Kampanyalar', image: '/image/banner8.webp', link: '/' },
  { title: 'Ayrıcalıklar', image: '/image/banner9.webp', link: '/' },
  { title: 'Fiyatı Düşenler', image: '/image/banner10.webp', link: '/' },
];

export const CATEGORY_ITEMS: IWidgetContent[] = [
  { title: 'Kadın Giyim', image: '/caregoryimages/kadingiyim.webp', link: '/category/kadin' },
  { title: 'Erkek Giyim', image: '/caregoryimages/erkekgiyim.webp', link: '/category/erkek' },
  {
    title: 'Süpermarket',
    image: '/caregoryimages/süpermarket.webp',
    link: '/category/supermarket',
  },
  { title: 'Elektronik', image: '/caregoryimages/elektronik.webp', link: '/category/elektronik' },
  { title: 'Spor & Outdoor', image: '/caregoryimages/sporoutdoor.webp', link: '/' },
  { title: 'Anne & Çocuk', image: '/caregoryimages/annecocuk.webp', link: '/category/anne-cocuk' },
  { title: 'Kozmetik', image: '/caregoryimages/kozmetik.webp', link: '/category/kozmetik' },
  { title: 'Ev Ürünleri', image: '/caregoryimages/evürünleri.webp', link: '/category/ev-yasam' },
  {
    title: 'Ayakkabı & Çanta',
    image: '/caregoryimages/ayakkabicanta.webp',
    link: '/category/ayakkabi-canta',
  },
  { title: 'Mobilya', image: '/caregoryimages/mobilya.webp', link: '/' },
  { title: 'Kitap & Kırtasiye', image: '/caregoryimages/kitap.webp', link: '/' },
  { title: 'Oto & Yapı Market', image: '/caregoryimages/otoyapımarket.webp', link: '/' },
];

export const DISCOUNT_ITEMS: IWidgetContent[] = [
  { title: 'Kadın Giyim', image: '/discountimage/avva.webp', link: '/' },
  { title: 'Erkek Giyim', image: '/discountimage/calvinklein.webp', link: '/' },
  { title: 'Mobilya', image: '/discountimage/casio.webp', link: '/' },
  { title: 'Süpermarket', image: '/discountimage/elektrikevaleti.webp', link: '/' },
  { title: 'Elektronik', image: '/discountimage/hobieğlence.webp', link: '/' },
  { title: 'Spor & Outdoor', image: '/discountimage/jackjones.webp', link: '/' },
  { title: 'Anne & Çocuk', image: '/discountimage/lufian.webp', link: '/' },
  { title: 'Kozmetik', image: '/discountimage/madamecoco.webp', link: '/' },
  { title: 'Ev Ürünleri', image: '/discountimage/mavi.webp', link: '/' },
  { title: 'Kitap & Kırtasiye', image: '/discountimage/mediamarkt.webp', link: '/' },
  { title: 'Ayakkabı & Çanta', image: '/discountimage/polo.webp', link: '/' },
  { title: 'Oto & Yapı Market', image: '/discountimage/puma.webp', link: '/' },
];

export const ELITE_ITEMS: IEliteItems[] = [
  {
    iconTop: Package,
    headTop: "3 Adet 10'lu",
    color: 'text-green-500',
    titleTop: 'Trendyol Pass',
    description: ['Ayrıca Kargo Ücreti Ödeme', 'Sepet Alt Limit Yok'],
    dotColor: 'border-green-500 bg-green-500',
  },

  {
    iconTop: BiSolidDiscount,
    headTop: '500 TL',
    color: 'text-red-500',
    titleTop: 'İndirim Kuponu',
    description: 'Elite üyelere özel 500 TL kupon tanımlanır.',
    dotColor: 'border-red-500 bg-red-500',
  },
  {
    iconTop: TiMessages,
    headTop: 'Müşteri Hakkında',
    color: 'text-orange-500',
    titleTop: 'Öncelik',
    description: 'Trendyol elite üyeleri müşteri temsilcisine daha hızlı ulaşır.',
    dotColor: 'border-orange-500 bg-orange-500',
  },
  {
    icon: Package,
    iconColor: 'bg-yellow-500 text-white',
    titleBottom: "Her 250 TL'lik alışverişinde",
    star: Star,
    point: '25 Puan',
  },
  {
    icon: BiComment,
    iconColor: 'bg-red-500 text-white',
    titleBottom: 'Yorum Yapma',
    star: Star,
    point: '10 Puan',
  },
  {
    icon: FaClipboardCheck,
    iconColor: 'bg-purple-500 text-white',
    titleBottom: 'Trendyol Seni Dinliyor Anketi',
    star: Star,
    point: '5 Puan',
  },
  {
    icon: BiCabinet,
    iconColor: 'bg-green-500 text-white',
    titleBottom: "Her 250 TL'lik Dolap alışverişinde",
    star: Star,
    point: '25 Puan',
  },
  {
    icon: Camera,
    iconColor: 'bg-blue-500 text-white',
    titleBottom: 'Fotoğraflı yorum yapma',
    star: Star,
    point: '20 Puan',
  },
];

export const HELP_ITEMS: IHelpItem[] = [
  {
    id: 1,
    title: 'Popüler Sorular',
  },
  {
    id: 2,
    title: 'İade',
  },
  {
    id: 3,
    title: 'Kargo ve Teslimat',
  },
  {
    id: 4,
    title: 'Siparişler',
  },
  {
    id: 5,
    title: 'trendyol.com Hakkında',
  },
  {
    id: 6,
    title: 'Hesabım',
  },
  {
    id: 7,
    title: 'Ürün & Alışveriş',
  },
  {
    id: 8,
    title: 'İşlem Rehberi',
  },
  {
    id: 9,
    title: 'İletişim',
  },
  {
    id: 10,
    title: 'Dolap nedir? Nasıl Kullanılır?',
  },
  {
    id: 11,
    title: 'Şanslı Çekiliş',
  },
  {
    id: 12,
    title: 'Kurumsal Fatura',
  },
  {
    id: 13,
    title: 'Trendyol Sigorta',
  },
  {
    id: 14,
    title: 'Ürün Geri Çağırmaları ve Ürün Güvenliği Bildirimleri',
  },
];

export const DESC_ITEMS: IDescItems[] = [
  {
    id: 1,
    title: 'Tüm İhtiyaçlarınız İçin Tek İhtiyacınız Trendyol!',
    description:
      'Türkiye’nin önemli online alışveriş adreslerinden biri olan Trendyol, 2010 yılında modayı herkes için ulaşılabilir kılmak amacıyla kuruldu. Giyimden aksesuara, ayakkabıdan kozmetiğe kadar pek çok ürünle beğeni kazanır. Firma, gelişen pazar hacminde büyük söz sahibi olur. Hem farklı zevklere hem de bütçelere hitap eder. Kolay ve güvenli bir deneyim sunar. Üst ve alt giyim kategorilerinde çeşitli modeller hazırlanır. Bu koleksiyonlar uygun fiyat avantajıyla sunulur. Her mevsime uygun ürün seçenekleri bulunur. Kışlık seçimlerde kazak, mont, hırka, ceket gibi ürünleri baskındır. Yaz kombinlerinde renkli ve sade tişört modelleri sıklıkla kullanılır. İnce kumaştan üretilen jeanlar ve kapriler de yine yaz ayları için ideal bir seçimler olarak değerlendirilir. Yaz tatili için de bikini takımlarından satın alabiliriz. Geniş beden aralığı sayesinde istediğimiz ürünü tercih edebiliriz.',
  },
  {
    id: 2,
    title: 'Modern Tasarımlarıyla Dikkat Çeken Trendyol Markaları',
    description:
      'Kıyafet kombinleri seçilen ayakkabıyla tamamlanır. Günlük ayakkabı, spor ayakkabı, topuklu ayakkabı, sandalet, bot ve çizme olmak üzere geniş bir ürün skalası hazırlanır. Kıyafet tasarımları ise hedef kitlenin beklentilerine göre şekillendirilir. Elbiseden gömleğe, tunikten eşofman takımına kadar pek çok kategoride üretim yapılır. Sade, modern, kaliteli ve şık tasarımlar ilgiyle takip edilir. Sezonun trend renkleri ve modelleri hazırlanan kreasyonlarda hissedilir. Üretici markalar çocuklar için farklı tasarımlara imza atarlar. Birbirinden rahat, renkli ve eğlenceli modeller hazırlanır. Kız ve erkek çocukları için farklı kategoriler bulunur. Mevcut çeşitlilik beklentilerin karşılanması noktasında önemlidir. Giyim markaları arasından kendiniz veya çocuğunuz için ideal ürünleri seçebilirsiniz.',
  },
  {
    id: 3,
    title: 'Trendyol Özel Gün İndirimleriyle Kaçırılmayacak Fırsatlar',
    description:
      'Toplumdaki sosyal bilincin oluşmasına katkı sağlayan Trendyol, Sepette İyilik uygulamasıyla farklı kategorilerde faaliyet gösteren sivil toplum kuruluşlarına ait ürünlerin satışını yapar. Böylece yardım zinciri oluşturulur. Yapılan tüm alışverişlerde avantaj elde etmek için ise devreye Trendyol Elite fırsatı girer. Özel hizmet ve ayrıcalıklar ilgi çekici bulunur. Bu ayrıcalıkları kullanarak mutfak alışverişinizi Trendyol Hızlı Market ile yapabilirsiniz. Temel gıdadan atıştırmalıklara, sebzeden meyveye pek çok kategoride istediğiniz ürünleri hızlı market ile bulabilirsiniz. Evden çıkmadan yapacağınız mutfak alışverişi yanında Trendyol Yemek ile de akşam yemeklerinizi pratik şekilde halledebilirsiniz. Yoğun iş temposunda yapamadığınız akşam yemeklerini bu uygulama sayesinde dert etmenize gerek kalmaz. Trendyol tarafından düzenlenen indirimler sayesinde alışveriş fırsatlarını değerlendirmek mümkündür.',
  },
  {
    id: 4,
    title: 'Modaya Uygun Trend Parçalar',
    description:
      'Ev yaşam ürünlerinde, giyimde, kozmetikte, elektronikte, oyuncu ekipmanlarında, pratik mutfak eşyalarında, bebek & çocuk ürünlerinde ve süpermarket kategorilerinde yapacağınız alışverişlerde uygun fiyat avantajından yararlanabilirsiniz. Belirli zamanlarda yapılan kampanyalar sayesinde sezonun moda kıyafetlerine ulaşabilir ve evinizin ihtiyaçlarını tamamlayabilirsiniz. Yaz tatilinin bitmesiyle başlayan okul telaşı Trendyol ile sorun olmaktan çıkar. Okul öncesi, ilkokul, ortaokul, lise, üniversite olarak kategorilere ayrılan kırtasiye ürünleri ihtiyaçların karşılanması için listelenir. Aynı zamanda mevsim geçişlerinde yapılan alışverişler için de çeşitli fırsatlar oluşturulur. Mevcut fırsatlar sayesinde hazırlık yapabilir, eksiklerinizi tamamlayabilirsiniz. Yapılan indirimlerde yer alan ürün çeşitliliği oldukça fazladır. Gram altın seçeneklerine dahi ulaşmak mümkündür. Hediye veya yatırım amaçlı üretilen çeşitler mevcuttur. Çeyrek altın sık tercih edilen ürünlerin başında gelir.',
  },
  {
    id: 5,
    title: 'Elektronik Eşyalarda Uygun Fiyatlar',
    description:
      'Ayakkabı & Çanta ürünleri ile günlük kombinlere şıklık katmak mümkündür. Sneaker, casual, topuklu ayakkabı, bot, çizme, kol ve sırt çantası modelleri başta olmak üzere geniş bir tasarım yelpazesi oluşturulur. Spor & Outdoor kategorisinde yer alan parçalar da aynı şekilde sahip oldukları çeşitlilikle dikkat çekerler. Giyim eşyaları ve ekipmanlar farklı başlıklar altında gruplandırılır. Yapılan gruplandırmada hedef kitlenin özellikleri belirleyici kriter olarak kabul edilir. İlgili kategoride farklı markaların ürünlerinin olması öncelikle seçim kolaylığı sağlar. Sonraki aşamada ise farklı bütçelere hitap edilmesini destekler. Karar aşamasında kişinin üründen ne beklediğini belirlemesi gerekir. Ayrıca kaliteli markaların tercih edilmesi, kullanım konforu açısından önemlidir. Üretim aşamasında seçilen malzemelerin, tasarım çizgilerinin ve işçiliğin göz önüne alınması tavsiye edilir. Nitelikli ürün seçimi sayesinde kullanım konforu yükselir. Hem kendiniz hem de sevdikleriniz için tercihinizi rahat, şık ve kaliteli modellerden yana kullanabilirsiniz.',
  },
  {
    id: 6,
    title: 'Tüm İhtiyaçların Trendyol’da!',
    description:
      'Ev & Mobilya kategorisinde yer alan ev tekstili, sofra & mutfak, aydınlatma, banyo, ev dekorasyon, mobilya, ev gereçleri, hobi, kırtasiye & ofis, yapı & market, oto & motosiklet ürünlerini indirim günlerinde yapılan kampanyalarla uygun fiyata satın alabilirsiniz. Bu kategori, yeni evlenecek çiftler ve evini yenilemek isteyenler için farklı markaları ve ürün çeşitlerini bir arada sunar. Bu sayede ihtiyaçlar kolay bir şekilde tamamlanır. Elektronik kategori içerisinde ise beyaz eşya, küçük ev aletleri, Tv & görüntü, ses, giyilebilir teknoloji, tablet & bilgisayar, elektronik aksesuarlar, kişisel bakım aletleri, oyunculara özel ürünler yer alır. İlgili başlık altında satılan akıllı cep telefonları da geniş model yelpazeleri ile ön plana çıkar. iPhone 17 sıklıkla tercih edilen cihazların başında gelir. iPhone 17 Pro Max modeli de tasarımı ve performansıyla etki alanını genişletir. Dikkat çeken bir diğeri ise iPhone 17 Air modelidir ve teknik özellikleri sayesinde adından sıkça söz ettirir. Model çeşitliliği fiyat noktasında da kendini gösterir. İndirim günlerini takip ederek yapılan ayrıcalıklardan yararlanabilirsiniz. Kişisel bakımınızı da kozmetik kategorisinde yer alan makyaj, cilt bakımı, parfüm & deodorant, saç bakımı, epilasyon & tıraş ve genel bakım ürünleri sayesinde yerine getirebilirsiniz. Marka çeşitliliği bu kategori için de geçerlidir. Teknolojik ürünlerin haricinde hazırlanan Saat & Aksesuar grubu da ilgiyle takip edilir. Kadın, erkek ve çocuklar için üretilen birçok tasarım mevcuttur.',
  },
];
