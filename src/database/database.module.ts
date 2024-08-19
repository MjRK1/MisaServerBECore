import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from "../user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User], // Указываем сущности
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'), // Для разработки можно оставить true
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    } as any),
  ],
})
export class DatabaseModule {}
