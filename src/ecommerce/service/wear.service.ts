import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { request } from 'express';
import { slug } from 'src/common/utils/function';
import { CreateWearInput, GetWearArgs, UpdateWearInput } from '../dto';
import { Wear, WearDocument } from '../entities';
import { WearRepository } from '../repository';

@Injectable()
export class WearService {
  constructor(private readonly wearRepository: WearRepository) {}
  async createWear(input: CreateWearInput) {
    // const cookie = request.cookies('Authentication');
    // console.log(cookie);
    // await this.validateProductData(input);
    await this.validateSlug(input);
    const dataDocument = await this.wearRepository.create(input);
    return this.toModel(dataDocument);
  }

  // private async validateProductData(input: CreateWearInput) {
  //   const data = await this.wearRepository.find({
  //     slug: slug(input.title),
  //     site: input.site,
  //     status: false,
  //   });
  //   if (data.length !== 0) {
  //     throw new UnprocessableEntityException(
  //       `El email con ${input.title} no existe`,
  //     );
  //   }
  //   console.log(data.length)
  // }

  async getWear(id: GetWearArgs) {
    await this.validateData(id);
    const dataDocument = await this.wearRepository.findOne(id);
    return this.toModel(dataDocument);
  }

  async updateWear(id: GetWearArgs, input: UpdateWearInput) {
    await this.validateData(id);
    const dataDocument = await this.wearRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async removeWear(id: GetWearArgs) {
    await this.validateData(id);
    await this.wearRepository.findOneAndUpdate(id, {
      status: false,
    });
    return 'producto elmininado';
  }

  findAll() {
    return this.wearRepository.find({});
  }

  async findBySiteId(siteId) {
    return this.wearRepository.find({ site: siteId });
  }

  private async validateData(id: GetWearArgs) {
    const data = await this.wearRepository.find({
      _id: id,
      status: true,
    });
    if (data.length === 0) {
      throw new UnprocessableEntityException(`El data con ${id} no existe`);
    }
  }

  private async validateSlug(input: CreateWearInput) {
    const data = await this.wearRepository.find({
      slug: slug(input.title),
      site: input.site,
    });
    if (data.length !== 0) {
      // console.log('el producto ya existe')
      throw new UnprocessableEntityException(`El data conno existe`);
    }
  }

  private toModel(wearDocument: WearDocument): Wear {
    return {
      _id: wearDocument._id.toHexString(),
      title: wearDocument.title,
      brand: wearDocument.brand,
      description: wearDocument.description,
      image: wearDocument.image,
      inStock: wearDocument.inStock,
      slug: wearDocument.slug,
      category: wearDocument.category,
      subCategory: wearDocument.subCategory,
      price: wearDocument.price,
      tags: wearDocument.tags,
      color: wearDocument.color,
      sizes: wearDocument.sizes,
      status: wearDocument.status,
      site: wearDocument.site,
    };
  }
}
