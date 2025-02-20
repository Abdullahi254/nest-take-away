import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Query all users with pagination
  @Query(() => [UserType])
  getUsers(
    @Args('limit', { type: () => Number, nullable: true }) limit?: number,
    @Args('cursor', { type: () => String, nullable: true }) cursor?: string
  ) {
    return this.usersService.getUsers(limit, cursor);
  }

  // Query a single user
  @Query(() => UserType)
  getUserById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.getUserById(id);
  }

  // Mutation: Create a new user
  @Mutation(() => UserType)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('phone') phone: string
  ) {
    return this.usersService.createUser({
      name,
      email,
      phone
    });
  }

  // Mutation: Update a user
  @Mutation(() => UserType)
  updateUser(
    @Args('id') id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('phone', { nullable: true }) phone?: string
  ) {
    return this.usersService.updateUser(id, { name, phone });
  }
}
