import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsController } from './receipts/receipts.controller';
import { ReceiptsModule } from './receipts/receipts.module';

@Module({
  imports: [ReceiptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
