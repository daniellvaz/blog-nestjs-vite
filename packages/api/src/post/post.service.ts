import { Category, CategoryDocument } from './entities/category.entity';
import { Tag, TagDocument } from './entities/tag.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const slug = createPostDto.title.toLowerCase().replace(/ /g, '-');
    const { _id: category } = await this.categoryModel.create({
      title: createPostDto.category,
      slug: createPostDto.category.toLowerCase().replace(/ /g, '-'),
    });
    const tags = [];

    for await (const tag of createPostDto.tags) {
      const { id } = await this.tagModel.create({ title: tag });

      tags.push(id);
    }

    const post = new this.postModel({
      ...createPostDto,
      slug,
      tags,
      category,
    });

    return await post.save();
  }

  async findAll() {
    return await this.postModel
      .find()
      .populate('author', 'name')
      .populate('tags', 'title')
      .populate('category', 'title');
  }

  async findOne(id: string) {
    return await this.postModel
      .findById(id)
      .populate('author', 'name')
      .populate('tags', 'title')
      .populate('category', 'title');
  }

  async findBySlug(slug: string) {
    return await this.postModel
      .findOne({ slug })
      .populate('author', 'name')
      .populate('tags', 'title')
      .populate('category', 'title');
  }

  async findByCategory(category: string) {
    const { _id } = await this.categoryModel.findOne({ category });
    const posts = await this.postModel
      .find({ category: _id })
      .populate('author', 'name')
      .populate('tags', 'title')
      .populate('category', 'title');

    return posts;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postModel.findByIdAndUpdate(id, updatePostDto);
  }

  async remove(id: string) {
    return await this.postModel.deleteOne({ id });
  }

  async like(slug: string, user: string) {
    const post = await this.postModel.findOne({ slug });
    console.log(post);
    return await this.postModel.updateOne(
      { id: post._id },
      { ...post, likedBy: user },
    );
  }

  async unlike(slug: string, user: string) {
    return await this.postModel.findOneAndUpdate({ slug }, { unlikedBy: user });
  }
}
