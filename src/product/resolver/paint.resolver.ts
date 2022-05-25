import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Paint } from '../entities/paint.model';
import { PaintService } from '../service';
import { CreatePaintInput, UpdatePaintInput, GetPaintArgs } from '../dto';
import { Site } from '../../site/entities/site.model';
import { SiteService } from '../../site/site.service';

@Resolver(() => Paint)
export class PaintResolver {
  constructor(
    private readonly paintService: PaintService,
    private readonly siteService: SiteService,
  ) {}
  @Mutation(() => Paint)
  createPaint(@Args('input') input: CreatePaintInput) {
    return this.paintService.createPaint(input);
  }

  @Mutation(() => Paint)
  updatePaint(
    @Args() id: GetPaintArgs,
    @Args('input') input: UpdatePaintInput,
  ) {
    return this.paintService.updatePaint(id, input);
  }

  @Mutation(() => String)
  removePaint(@Args() id: GetPaintArgs) {
    return this.paintService.removePaint(id);
  }

  @Query(() => Paint, { name: 'paint' })
  async getPaint(@Args() id: GetPaintArgs) {
    return this.paintService.getPaint(id);
  }

  @Query(() => [Paint], { name: 'paints' })
  async getPaints() {
    return this.paintService.findAll();
  }

  @ResolveField(() => Site)
  async site(@Parent() paint: any) {
    return this.siteService.getSite(paint.site);
  }
}
