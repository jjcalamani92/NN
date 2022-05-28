import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput, GetUserArgs, UpdateUserInput } from './dto';
import { User, UserDocument } from './entities';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserInput) {
    await this.validateDataUser(input);
    const dataDocument = await this.userRepository.create({
      ...input,
      password: await bcrypt.hash(input.password, 10),
    });
    return this.toModel(dataDocument);
  }

  private async validateDataUser(input: CreateUserInput) {
    const data = await this.userRepository.find({
      email: input.email,
      status: true,
    });
    if (data.length !== 0) {
      throw new BadRequestException(
        `El email ${input.email} ya esta registrado`,
      );
    }
  }

  async getUser(getuserArgs: GetUserArgs) {
    const dataDocument = await this.userRepository.findOne(getuserArgs);
    return this.toModel(dataDocument);
  }

  async updateUser(id: GetUserArgs, input: UpdateUserInput) {
    await this.validateData(id);
    const dataDocument = await this.userRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async removeUser(id: GetUserArgs) {
    await this.validateData(id);
    await this.userRepository.findOneAndUpdate(id, {
      status: false,
    });
    return 'usuario elmininado';
  }

  findAll() {
    return this.userRepository.find({});
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return this.toModel(userDocument);
  }

  private async validateData(id: GetUserArgs) {
    const data = await this.userRepository.find({
      _id: id,
      status: true,
    });
    if (data.length === 0) {
      throw new UnprocessableEntityException(`El data con ${id} no existe`);
    }
  }

  private toModel(userDocument: UserDocument): User {
    return {
      _id: userDocument._id.toHexString(),
      email: userDocument.email,
      role: userDocument.role,
      sites: userDocument.sites,
      google: userDocument.google,
      status: userDocument.status,
    };
  }
}
