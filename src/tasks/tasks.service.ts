import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(
   private readonly prismaService: DatabaseService

  ){}
 async create(dto: CreateTaskDto,userId: string) {
  if (!dto.title) {
    throw new BadRequestException('Title is required');
  }
  return this.prismaService.task.create({
    data: {
      title: dto.title,
      description: dto.description,
      status: dto.status ?? 'PENDING',
      dueDate: dto.dueDate,
      user: {
        connect: { id: userId }
      }
    }
  });
}

  async findAll(userId: string) {
    const tasks = await this.prismaService.task.findMany({
      where:{
        userId:userId
      }
    })
    return tasks;
  }

  async findOne(id: string) {
    const task = await this.prismaService.task.findUnique({
      where: { id }
    })
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prismaService.task.update({
      where: { id },
      data: updateTaskDto
    })
    return task;
  }

  async remove(id: string) {
    const task = await this.prismaService.task.delete({
      where: { id }
    })
  }
}


