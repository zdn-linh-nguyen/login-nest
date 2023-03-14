import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'linh1245',
      database: 'loginTest',
      synchronize: true,
      entities: [UserEntity],
      autoLoadEntities: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
