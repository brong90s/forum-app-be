import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthService } from './google-oauth.service';

@Module({
  imports: [UserModule, JwtAuthModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthService],
})
export class GoogleOauthModule {}
