import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class PostsEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;
}

export default PostsEntity;
