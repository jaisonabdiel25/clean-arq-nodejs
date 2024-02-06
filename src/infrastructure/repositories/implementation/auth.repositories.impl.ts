import { BcryptAdapter } from "../../../config";
import { UserDB } from "../../../data/mongoose";
import { AuthRepositories, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../../domain";
import { UserMapper } from "../../mappers/User.mapper";




export class AuthRepositoriesImpl implements AuthRepositories {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password, img } = registerUserDto;
        try {

            //validate email
            const exists = await UserDB.findOne({ email });
            if (exists) throw CustomError.prevalidation('email already exists');

            //create user
            const user = new UserDB({ name, email, img, password: BcryptAdapter.hash(password) });

            //save user
            await user.save();

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) throw error;
        }

        throw CustomError.internal();
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const { email, password } = loginUserDto;
        try {

            //validate email
            const user = await UserDB.findOne({ email });
            if (!user) throw CustomError.prevalidation('email or password incorrect');

            //validate password
            if (!BcryptAdapter.compare(password, user.password)) throw CustomError.prevalidation('email or password incorrect');

            return UserMapper.userEntityFromObject(user);


        } catch (error) {
            if (error instanceof CustomError) throw error;
        }

        throw CustomError.internal();
    }

}