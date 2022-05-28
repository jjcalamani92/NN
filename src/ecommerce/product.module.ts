import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Paint, PaintSchema, Wear, WearSchema } from './entities';
import { PaintRepository, WearRepository } from './repository';
import { WearResolver, PaintResolver } from './resolver';
import { PaintService, WearService } from './service';
import { SiteService } from '../site/site.service';
import { Site } from '../site/entities/site.model';
import { SiteSchema } from '../site/entities/site.schema';
import { SiteRepository } from '../site/site.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Paint.name,
        schema: PaintSchema,
      },
      {
        name: Wear.name,
        schema: WearSchema,
      },
      {
        name: Site.name,
        schema: SiteSchema,
      },
    ]),
  ],
  providers: [
    WearRepository,
    WearResolver,
    WearService,
    PaintRepository,
    PaintResolver,
    PaintService,
    SiteService,
    SiteRepository,
  ],
  exports: [WearRepository, WearService],
})
export class ProductModule {}
