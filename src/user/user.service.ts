import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { generateToken } from 'src/util/jwtutil';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService:DatabaseService
    ){}
    async create(
        createUserDto:CreateUserDto,
    ):Promise<{user:User|null;} > {
        const user = await this.prismaService.user.findUnique({
            where:{email:createUserDto.email}
        })
        if(user)
            throw new BadRequestException(
        "user with this email already exists, log in"
        );
    const hashedPassword = await argon2.hash(createUserDto.password)
    const newUser = await this.prismaService.user.create({
        data:{
            firstName:'Amani',
            lastName:'Samuel',
            email:createUserDto.email,
            password:hashedPassword,
        }
    })
         return { user: newUser};
    }

    async login(
        createUserDto: CreateUserDto,
    ): Promise<{ user: User; token: string }> {
      // check if the user already exists
      const user = await this.prismaService.user.findUnique({
        where:{ email: createUserDto.email}
      });


      if(!user){
        throw new BadRequestException('This email does not exist')
      }
      const isPasswordSame = await argon2.verify(
        user.password,
        createUserDto.password,
      )
      if(!isPasswordSame) throw new BadRequestException('Invalid Credentials')



      const token = await generateToken(user.email , user.id)
      return {user: {...user}, token}
    }
}
