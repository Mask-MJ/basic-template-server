import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class OnlineIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  @Inject(ConfigService)
  private configService: ConfigService;

  private redisClient: Redis;

  onApplicationBootstrap() {
    const host = this.configService.get('REDIS_HOST');
    const port = this.configService.get('REDIS_PORT');
    this.redisClient = new Redis({ host, port, lazyConnect: true });
  }

  // 当程序退出时, 关闭 redis 客户端
  onApplicationShutdown() {
    return this.redisClient.quit();
  }

  async findAll() {
    // 获取所有的以 user- 开头的 key
    const keys = await this.redisClient.keys('user-*');
    // 根据 key 获取所有的值
    const values = await Promise.all(
      keys.map((key) => this.redisClient.hgetall(key)),
    );
    return values;
  }

  remove(id: number) {
    // 删除 redis 中 id 对应的数据
    return this.redisClient.del(`user-${id}`);
  }
}
