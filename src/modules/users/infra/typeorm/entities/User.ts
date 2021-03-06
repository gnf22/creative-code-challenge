import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EthnicityRole {
  BRANCO = 'branco',
  PRETO = 'preto',
  AMARELO = 'amarelo',
  PARDO = 'pardo',
  INDIGENA = 'indígena',
  OUTRO = 'outro',
  NENHUM = 'nenhum',
}

@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column({
    type: 'enum',
    enum: EthnicityRole,
    default: EthnicityRole.NENHUM,
  })
  ethnicity: EthnicityRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
