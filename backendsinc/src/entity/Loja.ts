import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Oferta } from './Oferta';

@Entity()
export class Loja{

    @PrimaryGeneratedColumn("uuid")
    uidLoja: string;

    @Column()
    @Index({ unique: true })
    idLojaOrigem?: number;

    @Column( {nullable: true, length: 500})
    @Index({ unique: true })
    descricao: string;

    @Column( {nullable: true, length: 1000})
    thumbnail? : string

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @OneToMany(() => Oferta, oferta => oferta.loja)
    ofertas: Oferta[];

}