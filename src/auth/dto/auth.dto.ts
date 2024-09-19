import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsBoolean()
    @IsOptional()
    justABooleanProp: boolean

    @IsNumber()
    @IsOptional()
    justANumberProp: number

    @IsNumber()
    @IsOptional()
    bookmarkId: number

}