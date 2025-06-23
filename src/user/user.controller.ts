import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';


@ApiTags('user')
@Controller('user')
export class UserController {
  
   constructor(private readonly service:UserService){}
    

   //register
    @Post('/register')
    @ApiResponse({
        status:HttpStatus.CREATED,
        description:"user have been created successfully"
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description:"The email already exists"
    })
    @ApiResponse({
        status:HttpStatus.INTERNAL_SERVER_ERROR,
        description:"There is a problem with our server"
    })

    @ApiOperation({
        summary:"Register a user",
        description:"This is the endpoint of registering a user"
    })
   
 
    @ApiBody({type:CreateUserDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto){
        return this.service.create(createUserDto)
    }



    //login
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    
    @ApiResponse({
        status:200,
        description:"logged in successfully"
    })
    @ApiResponse({
        status:HttpStatus.BAD_REQUEST,
        description:"This email does not exist"
    })
    @ApiResponse({
        status:HttpStatus.INTERNAL_SERVER_ERROR,
        description:"There  is  a problem with our server"
    })



    @ApiBody({type:CreateUserDto})

    login(
        @Body() loginUserDto:CreateUserDto
    ):Promise<{user:User; token:string}>{
        return this.service.login(loginUserDto)
    }
}
