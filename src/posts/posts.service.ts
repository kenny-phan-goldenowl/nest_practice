import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PostsEntity from './posts.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { RETURN_MESSAGES } from 'src/ultilities/constant';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsEntity: Repository<PostsEntity>,
  ) {}

  async getAllPosts() {
    return this.postsEntity.find();
  }

  async getPostByid(id: number) {
    const post = await this.postsEntity.findOne({ where: { id } });
    if (post) return post;
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = this.postsEntity.create(post);
    await this.postsEntity.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    const updatedPost = await this.postsEntity.update(id, post);
    const findUser = await this.postsEntity.findOne({ where: { id } });
    if (findUser) return findUser;
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deletePost = await this.postsEntity.delete(id);
    if (!deletePost.affected)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    return { message: RETURN_MESSAGES.delete };
  }
}
