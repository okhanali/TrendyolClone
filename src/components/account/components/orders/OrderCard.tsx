import { formatDate } from '@/lib/formatdate';
import { IOrder, OrderStatusType } from '@/types/types';
import { CheckCircle, ChevronRight, Clock, RefreshCcw, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  order: IOrder;
}

const getStatusConfig = (status: OrderStatusType) => {
  switch (status) {
    case 'continuing':
    case 'processing':
      return {
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        icon: <Clock size={16} />,
        label: 'İşlem Alındı / Yolda',
      };
    case 'shipped':
      return {
        color: 'text-purple-600 bg-purple-50 border-purple-200',
        icon: <Clock size={16} />,
        label: 'Kargoya Verildi',
      };
    case 'returns':
      return {
        color: 'text-orange-600 bg-orange-50 border-orange-200',
        icon: <RefreshCcw size={16} />,
        label: 'İade Talebi',
      };
    case 'canceled':
      return {
        color: 'text-red-600 bg-red-50 border-red-200',
        icon: <XCircle size={16} />,
        label: 'İptal Edildi',
      };
    case 'delivered':
    default:
      return {
        color: 'text-green-600 bg-green-50 border-green-200',
        icon: <CheckCircle size={16} />,
        label: 'Tamamlandı',
      };
  }
};

const OrderCard: FC<Props> = ({ order }) => {
  const statusConfig = getStatusConfig(order.status);

  return (
    <div className="border border-gray-200 rounded-xl bg-white hover:shadow-md transition-shadow duration-200 overflow-hidden mb-4">
      {/* Header Kısım */}
      <div className="bg-gray-50/80 px-4 py-3 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
        <div className="flex gap-6 flex-wrap">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Sipariş Tarihi
            </p>
            <p className="text-sm font-semibold text-gray-700">{formatDate(order.orderDate)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Alıcı</p>
            <p className="text-sm font-semibold text-gray-700">
              {order.shippingAddress?.fullName ?? 'Kullanıcı'}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Toplam</p>
            <p className="text-sm font-bold text-gray-900">
              {order.totalAmount.toLocaleString('tr-TR', {
                style: 'currency',
                currency: order.currency || 'TRY',
              })}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Sipariş No
            </p>
            <p className="text-sm font-mono text-gray-600">{order.orderNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${statusConfig.color}`}
          >
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Ürünler Listesi */}
      <div className="p-4 flex flex-col gap-4">
        {order.items.map((item, index) => {
          const displayTitle = item.productName || item.title || 'Ürün Adı Belirtilmemiş';

          return (
            <div key={`${order.id}-${index}`} className="flex items-center gap-4 group">
              {/* Ürün Resmi */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 shrink-0 flex items-center justify-center text-gray-400 overflow-hidden relative">
                <Image
                  src={item.image || '/placeholder.png'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  alt={displayTitle}
                />
              </div>

              {/* Ürün Bilgisi */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{displayTitle}</h4>

                {/* Varyant Bilgisi  */}
                {item.selectedVariant && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.selectedVariant.size} Beden{' '}
                    {item.selectedVariant.color && `- ${item.selectedVariant.color}`}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Adet: {item.quantity}
                  </span>
                  <span className="text-sm font-semibold text-orange-600">
                    {item.price.toLocaleString('tr-TR')} TL
                  </span>
                </div>
              </div>

              {/* Detay Butonu */}
              <Link
                href={`/product/${item.productId}`}
                className="hidden sm:flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-3 py-2 rounded transition-colors"
              >
                Ürüne Git
                <ChevronRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderCard;
