import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{

    @PrimaryGeneratedColumn("uuid")
    userId: string;
    
    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    @Index({ unique: true })
    name: string;

    @Column()
    provider: string;

    @Column()
    provider_id: string;

    @Column()
    provider_pic: string;
 
    @Column()
    token: string;


}