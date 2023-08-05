import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OmdbApiService {
  private API_KEY = '720c3666';
  private url = `http://www.omdbapi.com/?apikey=${this.API_KEY}`;

  async getMovieByImdbId(imdbId: string) {
    const response = await axios.get(`${this.url}&i=${imdbId}`);
    return response.data;
  }
}
