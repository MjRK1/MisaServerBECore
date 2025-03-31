import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;


  private producer: Producer;


  constructor(private configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: 'misaserver',
      brokers: [`${process.env.KAFKA_HOST}:9092`]
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }]
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
