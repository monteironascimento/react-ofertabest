import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Categoria } from './Categoria';
import { Loja } from './Loja';

@Entity()
@Index(["origem", "updated_at"]) //, { unique: true })
@Index(["origem", "loja.uidLoja",  "categoria.uidCategoria" , "idOfertaOrigem"], { unique: true })
@Index(["origem", "loja.uidLoja",  "categoria.uidCategoria" , "idCuponOrigem"], { unique: true })
export class Oferta{

    @PrimaryGeneratedColumn("uuid")
    uidOferta: string;

    @Column( {nullable: true, type: "numeric"} )
    origem?: number; //0-OFERTA 1-CUPON

    @ManyToOne(() => Loja, loja => loja.uidLoja)
    loja: Loja;

    @ManyToOne(() => Categoria, categoria => categoria.uidCategoria)
    categoria: Categoria;

    @Column({nullable: true, length: 500})
    nome?: string;

    @Column({nullable: true, length: 2000})
    descricao?: string;

    @Column( {nullable: true, length: 1000})
    link?: string;

    @Column( {nullable: true})
    @Index()
    linkshort?: string;

    @Column( {nullable: true, length: 1000})
    thumbnail?: string;

    @Column( {nullable: true, type: "numeric"} )
    preco?: number;

    @Column( {nullable: true, type: "numeric"} )
    precoForm?: number;

    @Column({
        default: false
    })
    expirado: boolean;

    @Column({
      default: false
    })
    fixado: boolean;

    @Column({
      default: false
    })
    destaque: boolean;

    @Column({nullable: true})
    dtInicio: Date;

    @Column({nullable: true})
    dtFim: Date; 

    @Column( {nullable: true})
    dsCupon?: String;

    @Column( {nullable: true})
    idOfertaOrigem: String;

    @Column( {nullable: true})
    idCuponOrigem: String;

    @Column( {nullable: true, type: "numeric", default: 0.00} )
    grauOferta?: number;

    @Column( {nullable: true, type: "tsvector"})
    fti: string;

    @CreateDateColumn()
    @Index()
    created_at: Date;

    @UpdateDateColumn()
    @Index()
    updated_at: Date;
}

export function generateCode() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }