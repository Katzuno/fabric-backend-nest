import { Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMqPublisherService } from './rabbit-mq-publisher/rabbit-mq-publisher.service';
import { OmdbApiService } from './omdb-api/omdb-api.service';

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

    this.logger.log('Received Message records_to_analyze');

    if (data?.imdb_id) {
      const movieDetails = await this.omdbApiService.getMovieByImdbId(
        data.imdb_id,
      );

      if (movieDetails?.Response === "True") {
        await this.rabbitMqPublisherService.send('records_analyzed', {
          initialRecord: data,
          enrichData: movieDetails,
        });
      }

    } else {
      const movieSearchDetails = await this.omdbApiService.searchMovieByTitle(
          data.title,
          data.release_year
      );

      if (movieSearchDetails?.Search && movieSearchDetails?.Search.length > 0)  {
        // Get first position in this sketch, probably the best chance for a match
        const firstMatch = movieSearchDetails.Search[0];
        const movieDetails = await this.omdbApiService.getMovieByImdbId(firstMatch.imdbID);


        if (movieDetails?.Response === "True")  {

          await this.rabbitMqPublisherService.send('records_analyzed', {
            initialRecord: data,
            enrichData: movieDetails,
          });
        }
      }
    }
  }
}
