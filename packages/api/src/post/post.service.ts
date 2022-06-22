import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto) {
    const slug = createPostDto.title.toLowerCase().replace(/ /g, '-');
    const post = new this.postModel({ ...createPostDto, slug });

    return await post.save();
  }

  async findAll() {
    return await this.postModel.find().populate('author', 'name');
  }

  async findOne(id: string) {
    return await this.postModel.findById(id).populate('author', 'name');
  }

  async findBySlug(slug: string) {
    return await this.postModel.findOne({ slug }).populate('author', 'name');
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postModel.findByIdAndUpdate(id, updatePostDto);
  }

  async remove(id: string) {
    return await this.postModel.deleteOne({ id });
  }
}
