import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('bookmarks')
export class Bookmark {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true, // integer cannot be negative
    })
    id: number

    @Column({
        type: 'int',
        unsigned: true,
        name: 'user_id',
    })
    userId: number;

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column()
    title: string

    @Column()
    description: string | null

    @Column()
    link: string

    @ManyToOne(() => User, (user) => user.bookmarks, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'user_id'})
    user: User
}