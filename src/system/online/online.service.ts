import { Injectable } from '@nestjs/common';
import { OnlineIdsStorage } from './online-ids.storage';

@Injectable()
export class OnlineService {
  constructor(private readonly onlineIdsStorage: OnlineIdsStorage) {}

  findAll() {
    this.onlineIdsStorage.findAll();
    return `This action returns all online`;
  }

  remove(id: number) {
    return `This action removes a #${id} online`;
  }
}
