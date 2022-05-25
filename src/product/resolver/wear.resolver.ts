import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Wear } from '../entities/wear.model';
import { WearService } from '../service';
import { CreateWearInput, UpdateWearInput, GetWearArgs } from '../dto';
import { Site } from '../../site/entities/site.model';
import { SiteService } from '../../site/site.service';

@Resolver(() => Wear)
export class WearResolver {
  constructor(
    private readonly wearService: WearService,
    private readonly siteService: SiteService,
  ) {}
  @Mutation(() => Wear)
  createWear(@Args('input') input: CreateWearInput) {
    return this.wearService.createWear(input);
  }

  @Mutation(() => Wear)
  updateWear(@Args() id: GetWearArgs, @Args('input') input: UpdateWearInput) {
    return this.wearService.updateWear(id, input);
  }

  @Mutation(() => String)
  removeWear(@Args() id: GetWearArgs) {
    return this.wearService.removeWear(id);
  }

  @Query(() => Wear, { name: 'wear' })
  async getWear(@Args() id: GetWearArgs) {
    return this.wearService.getWear(id);
  }

  @Query(() => [Wear], { name: 'wears' })
  async getWears() {
    return this.wearService.findAll();
  }

  @ResolveField(() => Site)
  async site(@Parent() wear: any) {
    return this.siteService.getSite(wear.site);
  }
}
