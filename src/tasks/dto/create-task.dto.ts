
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';




export enum TaskStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED ='CANCELLED'
}

export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string;


    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    description:string;



    @ApiProperty({enum: TaskStatus, default:TaskStatus.PENDING, required:true })
    @IsEnum(TaskStatus)
    status:TaskStatus;


    @ApiProperty({type:String, format:'date-time'})
    @IsDateString()
    dueDate:string;
}
