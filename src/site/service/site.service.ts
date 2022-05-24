import { Injectable } from '@nestjs/common';
import { CreateSiteInput, GetSiteArgs, UpdateSiteInput } from '../dto';
import { Site, SiteDocument } from '../entities';
import { SiteRepository } from '../repository';
import { ListInput } from '../../common/dto/list.input';
import { PagePrimary, PageSecondary } from '../entities/site.model';
import { capitalizar } from 'src/common/utils/function';

@Injectable()
export class SiteService {
  constructor(private readonly siteRepository: SiteRepository) {}
  async createSite(input: CreateSiteInput) {
    const dataDocument = await this.siteRepository.create(input);
    return this.toModel(dataDocument);
  }

  async updateSite(id: string, input: UpdateSiteInput) {
    const dataDocument = await this.siteRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async removeSite(id: string) {
    const dataDocument = await this.siteRepository.remove(id);
    return this.toModel(dataDocument);
  }

  async getSite(getsiteArgs: GetSiteArgs) {
    const dataDocument = await this.siteRepository.findOne(getsiteArgs);
    return this.toModel(dataDocument);
  }

  getSites(paginationQuery: ListInput) {
    return this.siteRepository.findAll(paginationQuery);
  }

  async addPage(domain: string, page: any) {
    const site: SiteDocument = await this.siteRepository.findOneAndUpdate(
      domain,
      {
        $push: {
          pagePrimary: page,
        },
      },
    );
    return site;
  }
  async addSection(domain: string, section: PageSecondary) {
    const site: SiteDocument = await this.siteRepository.findOneAndUpdate(
      domain,
      {
        $push: {
          pageSecondary: section,
          params: {
            category: capitalizar(section.category),
            subCategory: section.subCategory,
          },
        },
      },
    );
    return site;
  }

  // async addSection(id: string, pageT: string, section: any) {
  //   // const site = await this.siteRepository.update(
  //   //   { id, pages: { $elemMatch: pageT } },
  //   //   {
  //   //     $push: {
  //   //       'pages.$.sections': section,
  //   //     },
  //   //   },
  //   // );
  //   const site = await this.siteRepository.findOneAndUpdate(
  //     { id, pages: { $elemMatch: { title: pageT } } },
  //     {
  //       $push: {
  //         'pages.$.sections': { section },
  //       },
  //     },
  //   );
  //   return site;
  // }

  private toModel(siteDocument: SiteDocument): Site {
    return {
      _id: siteDocument._id.toHexString(),
      title: siteDocument.title,
      domain: siteDocument.domain,
      logo: siteDocument.logo,
      numberPhone: siteDocument.numberPhone,
      address: siteDocument.address,
      categoryPage: siteDocument.categoryPage,
      status: siteDocument.status,
      params: siteDocument.params,
      pagePrimary: siteDocument.pagePrimary,
      pageSecondary: siteDocument.pageSecondary,
    };
  }
}
