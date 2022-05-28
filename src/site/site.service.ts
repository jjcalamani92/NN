import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateSiteInput, GetSiteArgs, UpdateSiteInput } from './dto';
import {
  // Category,
  Featured,
  Page,
  Section,
  Site,
  SiteDocument,
} from './entities';
import { ListInput } from '../common/dto/list.input';
import { capitalizar, slug } from 'src/common/utils/function';
import { SiteRepository } from './site.repository';
// import { GetFeaturesArgs, AddPageInput } from './dto/create-site.input';

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

  async addFeatured(id: GetSiteArgs, featured: Featured) {
    await this.validateData(id);
    const site: SiteDocument = await this.siteRepository.findOneAndUpdate(
      {
        _id: id._id,
      },
      {
        $addToSet: {
          featured: {
            ...featured,
            name: capitalizar(featured.name),
            href: slug(featured.href),
            imageSrc: featured.imageSrc,
            imageAlt: featured.imageAlt,
          },
        },
      },
    );
    return site;
  }
  async addSection(id: GetSiteArgs, sections: Section) {
    await this.validateData(id);
    const site: SiteDocument = await this.siteRepository.findOneAndUpdate(
      {
        _id: id._id,
      },
      {
        $addToSet: {
          sections: {
            ...sections,
            section: capitalizar(sections.section),
            href_s: slug(sections.section),
            name: capitalizar(sections.name),
            href_n: slug(sections.name),
          },
        },
      },
    );
    return site;
  }

  // async addItems(id: GetSiteArgs, pages: AddPageInput) {
  //   await this.validateData(id);
  //   // const sites = await this.siteRepository.fin
  //   const site: SiteDocument = await this.siteRepository.findOneAndUpdate(
  //     id,
  //     {
  //       $push: {
  //         'sections.$.items': {
  //           ...pages,
  //           name: capitalizar(pages.name),
  //           href: capitalizar(pages.name),
  //         },
  //       },
  //     },
  //     {
  //       arrayFilters: [{ 'sections.name': pages.name }],
  //     },
  //   );
  //   return site;
  // }

  async addPage(id: GetSiteArgs, pages: Page) {
    await this.validateData(id);
    const site: SiteDocument = await this.siteRepository.findOneAndUpdate(
      {
        _id: id._id,
      },
      {
        $addToSet: {
          pages: {
            name: pages.name,
            href: slug(pages.name),
          },
        },
      },
    );
    return site;
  }

  // async addFeatured(id: GetSiteArgs, category: string, featured: Featured) {
  //   // await this.validateData(id);
  //   const site: SiteDocument = await this.siteRepository.findOneAndUpdate(
  //     id,
  //     {
  //       $addToSet: {
  //         'categories.$[categories].featured': {
  //           name: featured.name,
  //           href: featured.href,
  //           imageSrc: featured.imageSrc,
  //           imageAlt: featured.imageAlt,
  //         },
  //       },
  //     },
  //     {
  //       arrayFilters: [{ 'categories.name': category }],
  //     },
  //   );
  //   return site;
  // }

  // async addFeatured(id: GetSiteArgs, featured: Featured) {
  //   await this.validateData(id);
  //   const site: SiteDocument = await this.siteRepository.findOneAndUpdate(id, {
  //     $push: {
  //       categories: {
  //         $each: [
  //           {
  //             ...categories,
  //             name: capitalizar(categories.name),
  //           },
  //         ],
  //         $position: 0,
  //       },
  //       // paramsOne: { $each: [{ pages: `/${slug(page.title)}` }], $position: 0 },
  //     },
  //   });
  //   return site;
  // }

  // async updatePage(id: GetSiteArgs, page: PagePrimary) {
  //   await this.validateData(id);
  //   const site: SiteDocument = await this.siteRepository.findOneAndUpdate(
  //     {
  //       _id: id,
  //       pagePrimary: { $elemMatch: { title: capitalizar(page.title) } },
  //     },
  //     {
  //       $set: {
  //         'pagePrimary.$.title': {
  //           ...page,
  //           title: capitalizar(page.title),
  //           href: `/${slug(page.title)}`,
  //         },
  //         // paramsOne: {
  //         //   $each: [{ pages: `/${slug(page.title)}` }],
  //         //   $position: 0,
  //         // },
  //       },
  //     },
  //   );
  //   return site;
  // }
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

  // async addSection(id: GetSiteArgs, section: PageSecondary) {
  //   await this.validateData(id);
  //   const site: SiteDocument = await this.siteRepository.findOneAndUpdate(id, {
  //     $push: {
  //       pageSecondary: {
  //         $each: [
  //           {
  //             ...section,
  //             category: capitalizar(section.category),
  //             subCategory: capitalizar(section.subCategory),
  //             hrefCategory: slug(section.category),
  //             hrefSubCategory: slug(section.subCategory),
  //           },
  //         ],
  //         $position: 0,
  //       },
  //       paramsTwo: {
  //         $each: [
  //           {
  //             category: slug(section.category),
  //             subCategory: slug(section.subCategory),
  //           },
  //         ],
  //         $position: 0,
  //       },
  //     },
  //   });
  //   return site;
  // }

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
      featured: siteDocument.featured,
      sections: siteDocument.sections,
      pages: siteDocument.pages,
      wears: siteDocument.wears,
    };
  }
}
