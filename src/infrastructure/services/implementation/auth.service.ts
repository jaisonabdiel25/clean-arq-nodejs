import { AuthRepositories, IAuthService, LoginUserDto, RegisterUserDto, UserEntity } from "../../../domain";


export class AuthServiceImpl implements IAuthService{

    constructor(
        private readonly _authRepositories: AuthRepositories
    ) {

    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this._authRepositories.register(registerUserDto); 
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this._authRepositories.login(loginUserDto); 
    }

}