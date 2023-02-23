import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {UserDocument} from "./schemas/user.schema";
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('login')
  async login(@Body() params:UserDocument , @Session() session) {
    if(!params.name || !params.password)  return {error:'no_auth', authorized:false}
    const user = await this.userService.validate(params);
    if (user.length === 1) {
      session.userId = user[0].id;
      session.userRole = user[0].role;
      return {user, authorized:user[0].role}
    }
    return {error:'no_auth', authorized:false}
  }
   @Post('logout')
    logout(@Session() session){
     session.destroy()
    }
    @Post('sid')
      sid(@Session() session){
      console.log(session.userId, session.userRole)
    }

  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
