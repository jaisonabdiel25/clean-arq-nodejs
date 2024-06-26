
import { IncomingHttpHeaders } from 'http';
import { UserEntity, RegisterUserDto, LoginUserDto } from '../../../domain';

export abstract class IAuthRepositories {
    abstract register(registerUserDto: RegisterUserDto, headers: IncomingHttpHeaders): Promise<UserEntity>;
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract getUserById(id: string): Promise<UserEntity>;
}