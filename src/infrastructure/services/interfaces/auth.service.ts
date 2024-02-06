import { LoginUserDto, RegisterUserDto } from '../../../domain';
import { UserEntity } from '../../../domain/entities/user.entity';


export abstract class AuthService {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}