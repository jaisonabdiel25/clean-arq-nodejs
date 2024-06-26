import { IncomingHttpHeaders } from 'http';
import { LoginUserDto, RegisterUserDto, UserEntity } from '../../../domain';


export abstract class IAuthService {
    abstract register(registerUserDto: RegisterUserDto, headers: IncomingHttpHeaders): Promise<UserEntity>;
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}