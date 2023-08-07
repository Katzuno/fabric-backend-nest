import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMqPublisherModule } from './rabbit-mq-publisher/rabbit-mq-publisher.module';
import { OmdbApiService } from './omdb-api/omdb-api.service';
import { OmdbApiModule } from './omdb-api/omdb-api.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(), RabbitMqPublisherModule, OmdbApiModule],
  controllers: [AppController],
  providers: [AppService, OmdbApiService],
})
export class AppModule {}
