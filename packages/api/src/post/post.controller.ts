import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    return this.postService.findByCategory(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Patch('like/:slug')
  like(@Param('slug') slug: string, @Body() userId: string) {
    return this.postService.like(slug, userId);
  }

  @Patch('unlike/:slug')
  unlike(@Param('slut') slug: string, @Body() userId: string) {
    return this.postService.unlike(slug, userId);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
