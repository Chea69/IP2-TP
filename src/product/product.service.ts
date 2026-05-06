import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    { id: 1, name: 'MacBook', price: 1200, categoryId: 1 },
    { id: 2, name: 'iPhone', price: 900, categoryId: 2 },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  create(data: { name: string; price: number; categoryId: number }) {
    const product = {
      id: this.products.length + 1,
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
    };

    this.products.push(product);
    return product;
  }
}
