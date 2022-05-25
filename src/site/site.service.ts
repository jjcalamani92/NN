import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateSiteInput, GetSiteArgs, UpdateSiteInput } from './dto';
import { Site, SiteDocument } from './entities';
import { ListInput } from '../common/dto/list.input';
import { PagePrimary, PageSecondary } from './entities/site.model';
import { capitalizar, slug } from 'src/common/utils/function';
import { SiteRepository } from './site.repository';

@Injectable()
export class SiteService {
  constructor(private readonly siteRepository: SiteRepository) {}
  async createSite(input: CreateSiteInput) {
    const dataDocument = await this.siteRepository.create(input);
    return this.toModel(dataDocument);
  }

  async updateSite(id: GetSiteArgs, input: UpdateSiteInput) {
    await this.validateData(id);
    const dataDocument = await this.siteRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async removeSite(id: GetSiteArgs) {
    await this.validateData(id);
    await this.siteRepository.findOneAndUpdate(id, {
      status: false,
    });
    return 'sitio elmininado';
  }

  async getSite(id: GetSiteArgs) {
    await this.validateData(id);
    const dataDocument = await this.siteRepository.findOne(id);
    return this.toModel(dataDocument);
  }

  getSites(paginationQuery: ListInput) {
    return this.siteRepository.findAll(paginationQuery);
  }

  async addPage(id: GetSiteArgs, page: PagePrimary) {
    await this.validateData(id);
    const site: SiteDocument = await this.siteRepository.findOneAndUpdate(id, {
      $push: {
        pagePrimary: {
          $each: [
            {
              ...page,
              title: capitalizar(page.title),
              href:
                page.title === 'home' || 'inicio'
                  ? `/`
                  : `/${slug(page.title)}`,
            },
          ],
          $position: 0,
        },
        paramsOne: { $each: [{ pages: `/${slug(page.title)}` }], $position: 0 },
      },
    });
    return site;
  }
  // async deletePage(id: GetSiteArgs, page: PagePrimary) {
  //   await this.validateData(id);
  //   const site: SiteDocument = await this.siteRepository.findOneAndUpdate(id, {
  //     $pull: {
  //       pagePrimary: {
  //         $each: [
  //           {
  //             ...page,
  //             title: capitalizar(page.title),
  //             href: `/${slug(page.title)}`,
  //           },
  //         ],
  //         $position: 0,
  //       },
  //       paramsOne: { $each: [{ pages: `/${slug(page.title)}` }], $position: 0 },
  //     },
  //   });
  //   return site;
  // }
  async addSection(id: GetSiteArgs, section: PageSecondary) {
    await this.validateData(id);
    const site: SiteDocument = await this.siteRepository.findOneAndUpdate(id, {
      $push: {
        pageSecondary: {
          $each: [
            {
              ...section,
              category: capitalizar(section.category),
              subCategory: capitalizar(section.subCategory),
              hrefCategory: slug(section.category),
              hrefSubCategory: slug(section.subCategory),
            },
          ],
          $position: 0,
        },
        paramsTwo: {
          $each: [
            {
              category: slug(section.category),
              subCategory: slug(section.subCategory),
            },
          ],
          $position: 0,
        },
      },
    });
    return site;
  }

  private async validateData(id: GetSiteArgs) {
    const data = await this.siteRepository.find({
      _id: id,
      status: true,
    });
    if (data.length === 0) {
      throw new UnprocessableEntityException(`El data con ${id} no existe`);
    }
  }

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
      pagePrimary: siteDocument.pagePrimary,
      pageSecondary: siteDocument.pageSecondary,
      wears: siteDocument.wears,
      paramsOne: siteDocument.paramsOne,
      paramsTwo: siteDocument.paramsTwo,
    };
  }
}
