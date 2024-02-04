import { RegisterUserDto } from '../../../domain/dtos/auth/registerUser.dto';
import { UserEntity } from '../../../domain/entities/user.entity';


export abstract class AuthRepositories {
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}