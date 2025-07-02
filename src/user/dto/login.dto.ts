import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email:string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @IsStrongPassword()
    password:string;
}