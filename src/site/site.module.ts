import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Site, SiteSchema } from './entities';

import { WearService } from '../product/service/wear.service';
import { WearRepository } from 'src/product/repository';
import { Wear } from '../product/entities/wear.model';
import { WearSchema } from 'src/product/entities';
import { SiteRepository } from './site.repository';
import { SiteResolver } from './site.resolver';
import { SiteService } from './site.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Site.name,
        schema: SiteSchema,
      },
      {
        name: Wear.name,
        schema: WearSchema,
      },
    ]),
  ],
  providers: [
    SiteRepository,
    SiteResolver,
    SiteService,
    WearService,
    WearRepository,
  ],
  exports: [SiteRepository, SiteService],
})
export class SiteModule {}
