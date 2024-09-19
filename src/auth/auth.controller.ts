import { Body, Controller, Get, Req, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    @UseInterceptors(FileInterceptor('file'))
    signup(@Body() dto: AuthDto){
        console.log({
            dto,
            typeOfEmail: typeof dto.email,
            typeOfPassword: typeof dto.password
        })
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto)
    }

    @Get()
    getUsers(){
        return this.authService.getUsers()
    }
}