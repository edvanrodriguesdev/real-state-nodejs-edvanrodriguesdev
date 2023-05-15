import { 
        Entity, 
        Column, 
        PrimaryGeneratedColumn, 
        OneToOne, 
        JoinColumn, 
        ManyToOne, 
        CreateDateColumn, 
        UpdateDateColumn, 
        OneToMany
} from 'typeorm';
import { Address } from './addresses.entity';
import { Category } from './categories.entity';
import { Schedule } from './schedules.entity';


    @Entity('real_estate')
    class RealEstate {

        @PrimaryGeneratedColumn('increment')
        id: number

        @Column({ type: 'boolean', default: false })
        sold: boolean

        @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
        value: number | string

        @Column({ type: 'integer' })
        size: number

        @CreateDateColumn({ type: 'date'})
        createdAt: string | Date

        @UpdateDateColumn({ type: 'date'})
        updatedAt: string | Date

        @OneToOne(() => Address)
        @JoinColumn()
        address: Address

        @ManyToOne(() => Category)
        category: Category

        @OneToMany(() => Schedule, schedules => schedules.realEstate)
        schedules: Schedule[]

}


export { RealEstate }