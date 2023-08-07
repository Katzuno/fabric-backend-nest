import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqPublisherService } from './rabbit-mq-publisher.service';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}/`],
          queue: process.env.QUEUE_ANALYZED,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMqPublisherService],
  exports: [RabbitMqPublisherService],
})
export class RabbitMqPublisherModule {}
