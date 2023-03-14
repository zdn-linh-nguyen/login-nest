import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '828244494006-c9uhfutq7pf5qn495lre8gk8uulmumn4.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/api/v1/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(profile);
    const { emails, displayName, photos } = profile;
    const details = {
      email: emails[0].value,
      displayName: displayName,
      image: photos[0].value,
      provider: profile.provider,
    };

    const user = await this.authService.validateUser(details);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
