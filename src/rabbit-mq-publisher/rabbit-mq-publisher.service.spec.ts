import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMqPublisherService } from './rabbit-mq-publisher.service';

describe('RabbitMqService', () => {
  let service: RabbitMqPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMqPublisherService],
    }).compile();

    service = module.get<RabbitMqPublisherService>(RabbitMqPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
