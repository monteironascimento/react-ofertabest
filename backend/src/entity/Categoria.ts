import { Column, CreateDateColumn, Entity, Index, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Oferta } from './Oferta';

@Entity()
export class Categoria{

    @PrimaryGeneratedColumn("uuid")
    uidCategoria: string;
    
    @Column()
    @Index({ unique: true })
    descricao: string;

    @Column()
    @Index({ unique: true })
    idCategoriaOrigem: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Oferta, oferta => oferta.categoria)
    ofertas: Oferta[];

    @ManyToMany(() => Oferta, oferta => oferta.uidOferta)
    listOferta: Categoria;

}