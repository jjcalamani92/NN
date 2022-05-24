import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Page,
  PageSchema,
  Section,
  SectionSchema,
  Site,
  SiteSchema,
} from './entities';
import {
  PageRepository,
  SectionRepository,
  SiteRepository,
} from './repository';
import { SiteResolver, PageResolver, SectionResolver } from './resolver';
import { SiteService, PageService, SectionService } from './service';
import { WearService } from '../product/service/wear.service';
import { WearRepository } from 'src/product/repository';
import { Wear } from '../product/entities/wear.model';
import { WearSchema } from 'src/product/entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Site.name,
        schema: SiteSchema,
      },
      {
        name: Page.name,
        schema: PageSchema,
      },
      {
        name: Section.name,
        schema: SectionSchema,
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
    PageRepository,
    PageResolver,
    PageService,
    SectionRepository,
    SectionResolver,
    SectionService,
    WearService,
    WearRepository,
  ],
  exports: [SiteRepository, SiteService],
})
export class SiteModule {}
