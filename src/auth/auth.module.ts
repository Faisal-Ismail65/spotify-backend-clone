import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JWTStrategy } from './jwt-strategy';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [
    UserModule,
    ArtistsModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
