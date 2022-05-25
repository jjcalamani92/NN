import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { slug } from 'src/common/utils/function';
import { CreatePaintInput, GetPaintArgs, UpdatePaintInput } from '../dto';
import { Paint, PaintDocument } from '../entities';
import { PaintRepository } from '../repository';

@Injectable()
export class PaintService {
  constructor(private readonly paintRepository: PaintRepository) {}
  async createPaint(input: CreatePaintInput) {
    await this.validateSlug(input);
    const dataDocument = await this.paintRepository.create(input);
    return this.toModel(dataDocument);
  }

  async getPaint(id: GetPaintArgs) {
    await this.validateData(id);
    const dataDocument = await this.paintRepository.findOne(id);
    return this.toModel(dataDocument);
  }

  async updatePaint(id: GetPaintArgs, input: UpdatePaintInput) {
    await this.validateData(id);
    const dataDocument = await this.paintRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async removePaint(id: GetPaintArgs) {
    await this.validateData(id);
    await this.paintRepository.findOneAndUpdate(id, {
      status: false,
    });
    return 'producto elmininado';
  }

  findAll() {
    return this.paintRepository.find({});
  }

  async findBySiteId(siteId) {
    return this.paintRepository.find({ site: siteId });
  }

  private async validateData(id: GetPaintArgs) {
    const data = await this.paintRepository.find({
      _id: id,
      status: true,
    });
    if (data.length === 0) {
      throw new UnprocessableEntityException(`El data con ${id} no existe`);
    }
  }

  private async validateSlug(input: CreatePaintInput) {
    const data = await this.paintRepository.find({
      slug: slug(input.title),
      site: input.site,
    });
    if (data.length !== 0) {
      // console.log('el producto ya existe')
      throw new UnprocessableEntityException(`El data conno existe`);
    }
  }

  private toModel(paintDocument: PaintDocument): Paint {
    return {
      _id: paintDocument._id.toHexString(),
      title: paintDocument.title,
      brand: paintDocument.brand,
      description: paintDocument.description,
      image: paintDocument.image,
      inStock: paintDocument.inStock,
      slug: paintDocument.slug,
      category: paintDocument.category,
      subCategory: paintDocument.subCategory,
      price: paintDocument.price,
      tags: paintDocument.tags,
      use: paintDocument.use,
      color: paintDocument.color,
      status: paintDocument.status,
      site: paintDocument.site,
    };
  }
}
