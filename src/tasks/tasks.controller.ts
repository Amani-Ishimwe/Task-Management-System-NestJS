import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt')) 
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new task',
    description: 'This endpoint creates a new task for the authenticated user.'
  })

  @ApiResponse({
    status:201,
    description:"Task Created Successfully"
  })

  @ApiResponse({
    status:400,
    description:"Bad Request"
  })

  @ApiResponse({
    status:500,
    description:"Internal Server Error"
  })

  @ApiBody({ type: CreateTaskDto })
  @HttpCode(201)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
  return this.tasksService.create(createTaskDto, req.user.id);
}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all tasks for a user',
    description: 'This endpoint retrieves all tasks for the authenticated user.'
  })
  @ApiResponse({
    status:200,
    description:"Tasks Retrieved Successfully"
  })

  @ApiResponse({
    status:404,
    description:"Tasks Not Found"
  })

  @ApiResponse({
    status:500,
    description:"Internal Server Error"
  })

  findAll(@Param('userId') userId: string) {
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a task by ID',
    description: 'This endpoint retrieves a specific task by its ID.'
  })

  @ApiResponse({
    status:404,
    description:"Task Not Found"
  })

  @ApiResponse({
    status:500,
    description:"Internal Server Error"
  })
  @ApiResponse({
    status:200,
    description:"Task Retrieved Successfully"
  })

  @ApiBody({ type: UpdateTaskDto })
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a task by ID',
    description: 'This endpoint updates a specific task by its ID.'
  })

  @ApiResponse({
    status:200,
    description:"Task Updated Successfully"
  })

  @ApiResponse({
    status:404,
    description:"Task Not Found"
  })

  @ApiResponse({
    status:500,
    description:"Internal Server Error"
  })

  @ApiBody({ type: UpdateTaskDto })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a task by ID',
    description: 'This endpoint deletes a specific task by its ID.'
  })

  @ApiResponse({
    status:200,
    description:"Task Deleted Successfully"
  })

  @ApiResponse({
    status:404,
    description:"Task Not Found"
  })

  @ApiResponse({
    status:500,
    description:"Internal Server Error"
  })
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
