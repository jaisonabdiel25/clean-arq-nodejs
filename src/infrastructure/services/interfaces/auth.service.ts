import { AddRoleDto, LoginUserDto, RegisterUserDto, UserEntity } from '../../../domain';


export abstract class IAuthService {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}