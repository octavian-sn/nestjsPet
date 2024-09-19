import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('bookmarks')
export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number

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

    @ManyToOne(type => User, (user) => user.bookmarks)
    user: User
}