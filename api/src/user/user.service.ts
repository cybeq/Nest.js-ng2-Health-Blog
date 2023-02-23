import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import {User, UserDocument} from "./schemas/user.schema";
import {Connection, HydratedDocument, Model} from 'mongoose';

import {InjectModel} from '@nestjs/mongoose';
// import {makeLogger} from "ts-loader/dist/logger";
@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>) {
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

    validate(params: any) {
      return this.userModel.find(params).exec();
    }


}
