import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  private categories = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find((category) => category.id === id);
  }

  create(data: { name: string }) {
    const category = {
      id: this.categories.length + 1,
      name: data.name,
    };

    this.categories.push(category);
    return category;
  }
}
