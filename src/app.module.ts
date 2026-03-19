import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './database/entities/receipts.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Receipt],
      synchronize: true,
    }),
    ReceiptsModule,
  ],
})
export class AppModule {}
