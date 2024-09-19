import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, Unique } from "typeorm";
import { Bookmark } from "./bookmark.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date

    @Column({
        type: "timestamptz", // Timestamp with time zone
        default: () => "CURRENT_TIMESTAMP", // Optional: in case an initial value is needed
        onUpdate: "CURRENT_TIMESTAMP",      // Automatically update on any entity update
    })
    updatedAt: Date

    @Column({
        unique: true
    })
    email: string

    @Column()
    hash: string 

    @Column({
        nullable: true
    })
    justANumberProp: number | null

    @Column({
        nullable: true
    })
    justABooleanProp: boolean | null

    @Column({
        length: 100,
        nullable: true
    })
    firstName: string | null

    @Column({
        length: 100,
        nullable: true
    })
    lastName: string | null

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmarks: Bookmark[];
}