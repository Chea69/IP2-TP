import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './database/entities/receipts.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Receipt],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),

    ReceiptsModule,
    NotificationsModule,
    OrdersModule,
    CoreModule,
    CategoryModule,
    ProductModule,
    GraphqlModule,
  ],
})
export class AppModule {}
