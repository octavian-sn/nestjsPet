import { Injectable, ConflictException, Logger, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon from 'argon2';

import { User } from "src/entities/user.entity";
import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    private readonly logger = new Logger(AuthService.name);

    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
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
 
        try {
            const user = await this.usersRepository.save(newUser);
            delete user.hash
            return user
        } catch (error) {
            this.logger.error('Failed to create a new user', error.stack);  // Log the error

            if (error.code === '23505') {  // Check for unique constraint violation (e.g., email already exists)
                throw new ConflictException('Email already exists');
            } else {
                throw error;
            }
        }
    }

    async signin({email, password}: AuthDto): Promise<{ access_token: string }> {
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

        const payload = { sub: user.id, username: user.firstName}

        // Generate a JWT and return it here instead of user object
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    getUsers(): Promise<User[]>{
        return this.usersRepository.find();
    }
}