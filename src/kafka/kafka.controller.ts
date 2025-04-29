import { Controller, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { Public } from '../decorators/isPublic.decorator';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Public()
  @Post('upload')
  async upload(): Promise<any> {
    await this.kafkaService.sendMessage('file-uploaded', 'privet');
    return 'privet';
  }
}
