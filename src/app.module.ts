import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './database/entities/receipts.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Receipt],
      synchronize: true,
    }),
    ReceiptsModule,
    NotificationsModule,
    OrdersModule,
  ],
})
export class AppModule {}
