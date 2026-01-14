import { IOrder, OrderStatusType } from '@/types/types';
import path from 'path';
import { promises as fs } from 'fs';

export const db = {
  async getOrders(status?: OrderStatusType | null): Promise<IOrder[]> {
    try {
      const jsonDirectory = path.join(process.cwd(), 'db.json');
      const fileContents = await fs.readFile(jsonDirectory, 'utf8');
      const dbData = JSON.parse(fileContents);

      let orders: IOrder[] = dbData.orders || dbData;

      if (status && status !== 'all') {
        const targetStatus = status.toLowerCase().trim();

        orders = orders.filter((order) => {
          const currentStatus = order.status ? order.status.toLowerCase().trim() : '';
          return currentStatus === targetStatus;
        });

        console.log(`"${targetStatus}" için Filtrelenen Sayı:`, orders.length);
      }

      orders.sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
        const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
        return dateB - dateA;
      });

      return orders;
    } catch (error) {
      console.error('DB Read Error:', error);
      return [];
    }
  },
};
