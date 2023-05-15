import { getRounds, hashSync } from "bcryptjs"
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn, 
    OneToMany,
    BeforeInsert,
    BeforeUpdate
} from 'typeorm';
import { Schedule } from './schedules.entity';

@Entity('users')
class User {

      @PrimaryGeneratedColumn('increment')
      id: number

      @Column({ type: 'varchar', length: 45 })
      name: string

      @Column({ type: 'varchar', length: 45, unique: true })
      email: string

      @Column({ type: 'boolean', default: false })
      admin: boolean

      @Column({ type: 'varchar', length: 120 })
      password: string

      @CreateDateColumn({ type: 'date' })
      createdAt: string

      @UpdateDateColumn({ type: 'date' })
      updatedAt: string

      @DeleteDateColumn({ type: 'date', nullable: true })
      deletedAt: string

      @OneToMany(() => Schedule, schedules => schedules.user)
      schedules: Schedule[]

      @BeforeInsert()
      @BeforeUpdate()
      hashPassword(){
        const isEncrypted = getRounds(this.password)

        if (!isEncrypted) {
            this.password = hashSync(this.password, 10)
        }
      }
      
}


export { User }