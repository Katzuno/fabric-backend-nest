import { Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMqPublisherService } from './rabbit-mq-publisher/rabbit-mq-publisher.service';
import { OmdbApiService } from './omdb-api/omdb-api.service';
import { Message } from 'amqplib';

@Controller()
export class AppController {
  private readonly logger = new Logger('Records to analyze Consumer');

  constructor(
    private readonly rabbitMqPublisherService: RabbitMqPublisherService,
    private readonly omdbApiService: OmdbApiService,
  ) {}

  @MessagePattern('records_to_analyze')
  async handleRecordsToAnalyze(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (data?.imdb_id) {
      const movieDetails = await this.omdbApiService.getMovieByImdbId(
        data.imdb_id,
      );

      this.rabbitMqPublisherService.send('records_analyzed', {
        initialRecord: data,
        enrichData: movieDetails,
      });
      channel.ack(originalMsg as Message);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    }
  }
}
