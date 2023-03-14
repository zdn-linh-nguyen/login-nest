import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from 'src/types/user';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validateUser(details: UserDetails) {
    const user = await this.userRepository.findOneBy({ email: details.email });
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  // async socialLogin(body: AuthLoginSocialDto) {
  //   try {
  //     const { email, firstName, lastName, avatar } = body;
  //     const user = await this.userService.findByEmail(email);
  //     const nameHandle = this.handleName(firstName, lastName);
  //     //* if user not found, create new user
  //     if (!user) {
  //       const newUser = await this.userService.create({
  //         email,
  //         firstName: nameHandle.firstName,
  //         lastName: nameHandle.lastName,
  //         avatar,
  //       });

  //       if (!newUser) {
  //         return {
  //           error: ERROR_CREATE_USER_WITH_SOCIAL,
  //           redirectUrl: process.env.REDIRECT_VERIFY_LOGIN_PAGE,
  //         };
  //       }

  //       //redirect to register phone page
  //       return {
  //         email: newUser.email.toString(),
  //         redirectUrl: process.env.REDIRECT_VERIFY_PHONE_PAGE,
  //       };
  //     }

  //     //* if user exist, check status is_verified and phone
  //     if (!user.status.isVerified || !user.phone) {
  //       //redirect to register phone page

  //       return {
  //         email: user.email.toString(),
  //         redirectUrl: process.env.REDIRECT_VERIFY_PHONE_PAGE,
  //       };
  //     }

  //     return {
  //       email: user.email.toString(),
  //       redirectUrl: process.env.REDIRECT_VERIFY_OTP_PAGE,
  //     };
  //   } catch (error) {
  //     return {
  //       error: "Can't login with social account",
  //       redirectUrl: process.env.REDIRECT_VERIFY_LOGIN_PAGE,
  //     };
  //   }
  // }

  async getAllUsers() {
    return await this.userRepository.find();
  }
}
