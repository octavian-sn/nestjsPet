import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Bookmark } from "src/entities/bookmark.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User, Bookmark])],
    controllers:[AuthController],
    providers: [AuthService]
})

export class AuthModule{}