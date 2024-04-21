import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: Number(this.configService.get<string>('MINIO_PORT', '9000')),
      useSSL: false,
      accessKey: this.configService.get<string>(
        'MINIO_ACCESS_KEY',
        '2xxSbNXQ3ayClsBEH1hZ',
      ),
      secretKey: this.configService.get<string>(
        'MINIO_SECRET_KEY',
        'vfXhVR3UgWg6zt7JmRpB3v58i7qfFBUh64YaUUNP',
      ),
    });
  }

  async uploadFile(bucketName: string, objectName: string, data: Buffer) {
    await this.minioClient.putObject(bucketName, objectName, data);
  }
}
