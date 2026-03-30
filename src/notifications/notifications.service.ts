import { Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly ordersService: OrdersService) {} // ❌ creates a circle

  notify(event: string, payload: any) {
    console.log(`[NOTIFY] ${event}`, payload);

    // Example: call OrdersService for extra info (fake)
    // this.ordersService.deleteOrder(); // don't actually do it, just for illustration

    return { ok: true };
  }
}
