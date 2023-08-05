import { Module } from '@nestjs/common';
import { OmdbApiService } from './omdb-api.service';

@Module({
  imports: [],
  providers: [OmdbApiService],
  exports: [OmdbApiService],
})
export class OmdbApiModule {}
