import { IncomingHttpHeaders } from "http";
import { IAuthRepositories, IAuthService } from "../..";
import { LoginUserDto, RegisterUserDto, UserEntity } from "../../../domain";


export class AuthServiceImpl implements IAuthService{

    constructor(
        private readonly _authRepositories: IAuthRepositories,
    ) {

    }

    register(registerUserDto: RegisterUserDto, headers: IncomingHttpHeaders): Promise<UserEntity> {
        return this._authRepositories.register(registerUserDto, headers); 
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this._authRepositories.login(loginUserDto); 
    }

}