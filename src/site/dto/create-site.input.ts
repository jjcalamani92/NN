import { InputType, Field, PartialType, ID, ArgsType } from '@nestjs/graphql';
import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';
// import { GetPageArgs } from './create-page.input';
import { Page } from '../entities/page.model';
import { Section } from '../entities/section.model';
import { ParamsTwo } from '../entities';
import { PagePrimary, PageSecondary, ParamsOne } from '../entities/site.model';
import { Wear } from '../../product/entities/wear.model';

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
  
  // @Field(() => [PagePrimary], { nullable: true })
  pagePrimary: PagePrimary[];
  pageSecondary: PageSecondary[];
  paramsOne: ParamsOne[];
  paramsTwo: ParamsTwo[];
  wears: Wear[];

  @Field({ nullable: true })
  status: boolean;
}

@InputType()
export class UpdateSiteInput extends PartialType(CreateSiteInput) {
  @Field({ nullable: true })
  status: boolean;
}
@ArgsType()
export class GetSiteArgs {
  @Field()
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  _id: string;
}
