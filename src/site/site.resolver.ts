import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Site, Category, Featured } from './entities';
import {
  CreateSiteInput,
  UpdateSiteInput,
  GetSiteArgs,
  AddCategoryInput,
  AddFeaturedInput,
  GetFeaturesArgs,
} from './dto';
import { ListInput } from '../common/dto/list.input';
import { WearService } from 'src/ecommerce/service';
import { SiteService } from './site.service';
import { AddPageInput, AddSectionInput } from './dto/create-site.input';

@Resolver(() => Site)
export class SiteResolver {
  constructor(
    private readonly siteService: SiteService,
    private readonly wearService: WearService,
  ) {}
  @Mutation(() => Site)
  createSite(@Args('input') input: CreateSiteInput) {
    return this.siteService.createSite(input);
  }

  @Mutation(() => Site)
  updateSite(@Args() id: GetSiteArgs, @Args('input') input: UpdateSiteInput) {
    return this.siteService.updateSite(id, input);
  }

  @Mutation(() => String)
  removeSite(@Args() id: GetSiteArgs) {
    return this.siteService.removeSite(id);
  }

  @Query(() => Site, { name: 'site' })
  async getSite(@Args() getSiteArgs: GetSiteArgs) {
    return this.siteService.getSite(getSiteArgs);
  }

  @Query(() => [Site], { name: 'sites' })
  async getSites(
    @Args('input')
    listInput: ListInput,
  ) {
    return this.siteService.getSites(listInput);
  }

  @Mutation(() => Site)
  addPage(@Args() id: GetSiteArgs, @Args('input') input: AddPageInput) {
    return this.siteService.addPage(id, input);
  }

  @Mutation(() => Site)
  addSection(@Args() id: GetSiteArgs, @Args('input') input: AddSectionInput) {
    return this.siteService.addSection(id, input);
  }

  @Mutation(() => Site)
  addFeatured(@Args() id: GetSiteArgs, @Args('input') input: AddFeaturedInput) {
    return this.siteService.addFeatured(id, input);
  }
  // @Mutation(() => Site)
  // addItems(@Args() id: GetSiteArgs, @Args('input') input: AddPageInput) {
  //   return this.siteService.addItems(id, input);
  // }

  // @Mutation(() => Featured)
  // addFeatured(
  //   @Args() id: GetSiteArgs,
  //   @Args('category') category: string,
  //   @Args('input') input: AddFeaturedInput,
  // ) {
  //   return this.siteService.addFeatured(id, category, input);
  // }

  // @Mutation(() => Site)
  // updatePage(@Args() id: GetSiteArgs, @Args('input') input: CreatePageInput) {
  //   return this.siteService.updatePage(id, input);
  // }

  // @Mutation(() => Site)
  // // @UseGuards(GqlAuthGuard)
  // addSection(
  //   @Args() id: GetSiteArgs,
  //   @Args('input') input: CreateSectionInput,
  // ) {
  //   return this.siteService.addSection(id, input);
  // }

  // @ResolveField()
  // async wears(@Parent() parent: Site) {
  //   return this.wearService.findBySiteId(parent._id);
  // }

  // @Mutation(() => Site)
  // addSection(@Args('input') input: CreateSectionInput) {
  //   return this.siteService.addSection(input.domain, input.pageT, input);
  // }
}
