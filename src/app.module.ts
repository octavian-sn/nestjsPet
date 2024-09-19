import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5431,
    username: 'postgresuser',
    database: 'tutorialDB',
    password: 'postgrespassword',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), 
  AuthModule, 
  UserModule, 
  BookmarkModule
  ],
})
export class AppModule { }
