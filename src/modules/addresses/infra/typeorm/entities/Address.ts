import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { v4 as uuid } from 'uuid';

@Entity('addresses')
export class Address {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @OneToMany(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @Column()
  address: string;

  @Column()
  number: number;

  @Column()
  complement?: string;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
