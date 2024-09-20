import { Body, Controller, Get, Request, Post, UseInterceptors, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    @UseInterceptors(FileInterceptor('file'))
    signUp(@Body() dto: AuthDto){
        console.log({
            dto,
            typeOfEmail: typeof dto.email,
            typeOfPassword: typeof dto.password
        })
        return this.authService.signup(dto)
    }

    @Post('login')
    signIn(@Body() dto: AuthDto){
        return this.authService.signin(dto)
    }

    @Get()
    getUsers(){
        return this.authService.getUsers()
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getprofile(@Request() req){
        return req.user
    }
}