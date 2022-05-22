import { Column, CreateDateColumn, Entity, Index, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Search{

    @PrimaryGeneratedColumn("uuid")
    uidSearch: string;

    @Column()
    @Index({ unique: true })
    descricao?: String;

    @Column( {nullable: true, type: "numeric"} )
    quantidade?: number; 

    @Column({
        default: false
    })
    ativado: boolean;

    @CreateDateColumn()
    @Index()
    created_at: Date;

    @UpdateDateColumn()
    @Index()
    updated_at: Date;
}

