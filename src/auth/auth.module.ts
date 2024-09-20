import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Bookmark } from "src/entities/bookmark.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
    imports:[
        TypeOrmModule.forFeature([User, Bookmark]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30s' },
          }),
    ],
    controllers:[AuthController],
    providers: [AuthService]
})

export class AuthModule{}