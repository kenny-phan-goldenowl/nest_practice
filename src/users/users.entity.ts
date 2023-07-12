import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UsersEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public job: string;
}

export default UsersEntity;
