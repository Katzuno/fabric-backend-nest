import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RabbitMqPublisherService } from './rabbit-mq-publisher/rabbit-mq-publisher.service';
import { OmdbApiService } from './omdb-api/omdb-api.service';

describe('AppController', () => {
  let appController: AppController;
  let mockRabbitMqPublisherService = {
    send: jest.fn(),
  };
  let mockOmdbApiService = {
    getMovieByImdbId: jest.fn(),
    searchMovieByTitle: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: RabbitMqPublisherService,
          useValue: mockRabbitMqPublisherService,
        },
        {
          provide: OmdbApiService,
          useValue: mockOmdbApiService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('handleRecordsToAnalyze', () => {
    it('should send enriched data if imdb_id exists', async () => {
      mockOmdbApiService.getMovieByImdbId.mockResolvedValue({ Response: 'True' });

      const context = {
        getChannelRef: jest.fn(),
        getMessage: jest.fn(),
      };

      await appController.handleRecordsToAnalyze({ imdb_id: 'some_id' }, context as any);

      expect(mockRabbitMqPublisherService.send).toHaveBeenCalledWith('records_analyzed', expect.anything());
    });

    // Add other cases, such as:
    // - When the imdb_id does not exist.
    // - When the searchMovieByTitle finds results.
    // - When the searchMovieByTitle does not find results.
    // ... and so on.
  });
});
