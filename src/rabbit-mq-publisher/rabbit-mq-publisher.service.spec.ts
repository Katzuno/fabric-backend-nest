import {RabbitMqPublisherService} from "./rabbit-mq-publisher.service";
import {Test, TestingModule} from "@nestjs/testing";
import {ClientProxy} from "@nestjs/microservices";

describe('RabbitMqPublisherService', () => {
  let service: RabbitMqPublisherService;
  let mockClientProxy: Partial<ClientProxy>;

  beforeEach(async () => {
    mockClientProxy = {
      send: jest.fn().mockReturnValue({
        toPromise: jest.fn()
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RabbitMqPublisherService,
        { provide: 'rabbit-mq-module', useValue: mockClientProxy },
      ],
    }).compile();

    service = module.get<RabbitMqPublisherService>(RabbitMqPublisherService);
  });

  it('should send a message using client proxy', () => {
    service.send('test-pattern', {});
    expect(mockClientProxy.send).toHaveBeenCalled();
  });
});

