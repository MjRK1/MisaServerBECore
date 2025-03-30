import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { Public } from '../decorators/isPublic.decorator';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Public()
  @Post('upload')
  async upload(@Body() fileData: any): Promise<any> {
    await this.kafkaService.sendMessage('file-uploaded', 'privet');
    return 'privet';
  }
}
