import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { OmdbApiService } from './omdb-api.service';

// Mock the axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OmdbApiService', () => {
  let service: OmdbApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmdbApiService],
    }).compile();

    service = module.get<OmdbApiService>(OmdbApiService);
  });

  afterEach(() => {
    // Clear all jest mocks after each test to ensure there are no clashes between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch movie by IMDB ID', async () => {
    const mockResponse = { data: { title: 'Test Movie' } };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getMovieByImdbId('test-id');
    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://www.omdbapi.com/?apikey=720c3666&i=test-id');
  });

  it('should fetch movie by IMDB ID', async () => {
    const mockResponse = { data: { title: 'Test Movie' } };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await service.getMovieByImdbId('test-id');
    expect(result).toEqual(mockResponse.data);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://www.omdbapi.com/?apikey=720c3666&i=test-id');
  });


});
