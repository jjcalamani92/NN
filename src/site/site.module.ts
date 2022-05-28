import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Site, SiteSchema } from './entities';

import { WearService } from '../ecommerce/service/wear.service';
import { WearRepository } from 'src/ecommerce/repository';
import { Wear } from '../ecommerce/entities/wear.model';
import { WearSchema } from 'src/ecommerce/entities';
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
