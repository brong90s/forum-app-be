import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { google, Auth } from 'googleapis';
import { config } from 'dotenv';
import { UserService } from 'src/modules/user/user.service';

config();

@Injectable()
export class GoogleOauthService {
  oauth2Client: Auth.OAuth2Client;
  constructor(
    private jwtAuthService: JwtAuthService,
    private usersService: UserService
    ) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = 'http://localhost:5000/auth/google/redirect';

    this.oauth2Client = new google.auth.OAuth2(
      clientID,
      clientSecret,
      redirectUri,
    );
  }

  async googleAccessToken(body) {
    if (!body) {
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    }

    const token = body.idToken;
    try {
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { name, email, picture } = ticket.getPayload();

      const userEmail = await this.usersService.find(email)
      if(!userEmail.length) {
        await this.usersService.create(email, name, picture)
      }

      const user = await this.usersService.findOne(email) 
      console.log('user', user)

      const tokens = await this.jwtAuthService.getTokens(user.id, email);
      const RtHash = await this.jwtAuthService.updateRtHash(user.id, tokens.refresh_token);
      
      const uRtHash = await this.usersService.update(email, {refresh_token: RtHash})
      console.log('uRtHash', uRtHash)

      return tokens;
    } catch (err) {
      throw new HttpException('Invalid tokens', HttpStatus.BAD_REQUEST);
    }
  }
}
