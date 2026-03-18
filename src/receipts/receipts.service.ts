import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Injectable()
export class ReceiptsService {
  findAll() {
    return [];
  }

  findOne(id: string) {
    return { message: `Find receipt ${id}` };
  }

  create(dto: CreateReceiptDto) {
    return { message: 'Receipt created', data: dto };
  }

  update(id: string, dto: UpdateReceiptDto) {
    return { message: `Receipt ${id} updated`, data: dto };
  }

  remove(id: string) {
    return { message: `Receipt ${id} deleted` };
  }
}
