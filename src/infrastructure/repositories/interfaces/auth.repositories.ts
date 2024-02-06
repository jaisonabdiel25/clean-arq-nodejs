import { RegisterUserDto } from '../../../domain/dtos/auth/registerUser.dto';
import { UserEntity } from '../../../domain/entities/user.entity';
import { LoginUserDto } from '../../../domain/dtos/auth/loginUser.dto';


export abstract class AuthRepositories {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}