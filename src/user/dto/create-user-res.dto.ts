import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResDto {
   @ApiProperty()
   id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password:string;
}