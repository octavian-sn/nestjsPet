import { Injectable, ConflictException, Logger, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon from 'argon2';

import { User } from "src/entities/user.entity";
import { AuthDto } from "./dto/auth.dto";
import { error } from "console";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class AuthService{
    private readonly logger = new Logger(AuthService.name);

    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async signup({email,password, firstName, lastName, justABooleanProp, justANumberProp, bookmarkId }: AuthDto){
        
        const hash = await argon.hash(password)

        const newUser = this.usersRepository.create({
            email,
            hash,
            firstName,
            lastName,
            justABooleanProp,
            justANumberProp,
            bookmarks: []
        })
        // try{
        // } catch(error) {
        //     return error
        // }
        try {
            return await this.usersRepository.save(newUser);
        } catch (error) {
            this.logger.error('Failed to create a new user', error.stack);  // Log the error

            if (error.code === '23505') {  // Check for unique constraint violation (e.g., email already exists)
                throw new ConflictException('Email already exists');
            } else {
                throw error;
            }
        }
    }

    async signin({email, password}: AuthDto): Promise<User> {
        // find the user by email
        const user = await this.usersRepository.findOne({
            where:{
                email
            }
        })

        // if user does not exist throw exception
        if(!user){
            throw new NotFoundException('User does not exist')
        }

        // compare passwords
        const isPasswordValid = await argon.verify(user.hash, password)
        if (!isPasswordValid) {
            // if passwords do not match throw exception
            throw new UnauthorizedException('Passwords do not match')
        }

        //send back the user
        return user;
    }

    getUsers(): Promise<User[]>{
        return this.usersRepository.find();
    }
}