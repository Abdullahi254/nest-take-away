import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Object])
  getUsers(@Args('limit', { type: () => Number, nullable: true }) limit?: number) {
    return this.usersService.getUsers(limit);
  }
}
