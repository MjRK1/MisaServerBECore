import { Module, Type } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesModule } from './roles/roles.module';
import { RolesGuard } from './roles/roles.guard';
import { ModuleModule } from './module/module.module';
import { KafkaModule } from './kafka/kafka.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
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
        migrations: ["dist/db/migrations/*.js"],
      }),
      inject: [ConfigService],
    } as any),
    AuthModule,
    UserModule,
    RolesModule,
    ModuleModule,
    KafkaModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    JwtService,
  ],
})
export class AppModule {}
