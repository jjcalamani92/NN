import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';
// import { Page, Category, Featured } from '../entities/site.model';
import { Wear } from '../../ecommerce/entities/wear.model';
import { Category, Featured, Page, Section } from '../entities';

@InputType()
export class CreateSiteInput {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  domain: string;

  @Field(() => String)
  @IsString()
  logo: string;

  @Field(() => String)
  @IsString()
  numberPhone: string;

  @Field(() => String)
  @IsString()
  address: string;

  @Field(() => String)
  @IsString()
  categoryPage: string;

  featured: Featured[];
  sections: Section[];
  pages: Page[];
  wears: Wear[];

  @Field({ nullable: true })
  status: boolean;
}

@InputType()
export class UpdateSiteInput extends PartialType(CreateSiteInput) {}

@ArgsType()
export class GetSiteArgs {
  @Field()
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  _id: string;
}

@ArgsType()
export class GetFeaturesArgs {
  @Field()
  title: string;
  @Field()
  categoryName: string;
}

@InputType()
export class AddCategoryInput {
  @Field()
  name: string;
  featured: Featured[];
  sections: Section[];
}

@InputType()
export class AddFeaturedInput {
  @Field()
  name: string;
  href: string;
  @Field()
  imageSrc: string;
  @Field()
  imageAlt: string;
}

@InputType()
export class AddSectionInput {
  @Field()
  section: string;
  href_s: string;
  @Field()
  name: string;
  href_n: string;
}

@InputType()
export class AddPageInput {
  @Field()
  name: string;
  href: string;
}
