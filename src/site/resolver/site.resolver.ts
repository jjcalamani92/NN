import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Site, PagePrimary } from '../entities/site.model';
import { SiteService } from '../service';
import {
  CreateSiteInput,
  UpdateSiteInput,
  GetSiteArgs,
  CreatePageInput,
  CreateSectionInput,
} from '../dto';
import { ListInput } from '../../common/dto/list.input';
import { Page } from '../entities/page.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';

@Resolver(() => Site)
export class SiteResolver {
  constructor(private readonly siteService: SiteService) {}
  @Mutation(() => Site)
  createSite(@Args('input') input: CreateSiteInput) {
    return this.siteService.createSite(input);
  }

  @Mutation(() => Site)
  updateSite(@Args('input') input: UpdateSiteInput) {
    return this.siteService.updateSite(input._id, input);
  }

  @Mutation(() => Site)
  removeSite(@Args('input') input: UpdateSiteInput) {
    return this.siteService.removeSite(input._id);
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

  @Mutation(() => PagePrimary)
  addPage(@Args('input') input: CreatePageInput) {
    return this.siteService.addPage(input.site, input);
  }
  @Mutation(() => Site)
  @UseGuards(GqlAuthGuard)
  addSection(@Args('input') input: CreateSectionInput) {
    return this.siteService.addSection(input.site, input);
  }
  // @Mutation(() => Site)
  // addSection(@Args('input') input: CreateSectionInput) {
  //   return this.siteService.addSection(input.domain, input.pageT, input);
  // }
}
