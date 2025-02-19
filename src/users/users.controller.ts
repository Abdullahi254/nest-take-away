import { Controller, Post, Get, Patch, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @Get()
    getUsers(@Query('limit') limit = 10, @Query('cursor') cursor?: string) {
        return this.usersService.getUsers(Number(limit), cursor);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(id, dto);
    }
}

