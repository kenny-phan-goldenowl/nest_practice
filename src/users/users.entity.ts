import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UsersEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;
}

export default UsersEntity;
