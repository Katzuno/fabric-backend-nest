import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqPublisherService } from './rabbit-mq-publisher.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@fabric-rabbitmq/'],
          queue: 'records_analyzed',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMqPublisherService],
  exports: [RabbitMqPublisherService],
})
export class RabbitMqPublisherModule {}
