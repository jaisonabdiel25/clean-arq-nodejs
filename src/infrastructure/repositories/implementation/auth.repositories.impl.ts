import { BcryptAdapter } from "../../../config";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../../domain";
import { UserMapper } from "../../mappers/User.mapper";
import { prisma } from "../../../data/postgress";
import { IAuthRepositories } from '../../../infrastructure'


export class AuthRepositoriesImpl implements IAuthRepositories {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password, img, phone } = registerUserDto;
        try {

            //validate email
            const existPostgres = await prisma.user.findMany({ where: { email } })

            if (existPostgres.length > 0) throw CustomError.prevalidation('email already exists');

            const userRole = await prisma.role.findFirst({ where: { name: 'MODERATOR' } });

            if (!userRole) {
                throw CustomError.internal('El rol MODERATOR no existe');
            }

            //save user
            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password,
                    img: img,
                    phone: phone,
                    roles: {
                        create: {
                            roleId: userRole.id
                        }
                    }
                }
            });


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
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) throw CustomError.prevalidation('email or password incorrect');

            //validate password
            if (!BcryptAdapter.compare(password, user.password)) throw CustomError.prevalidation('email or password incorrect');

            return UserMapper.userEntityFromObject(user);


        } catch (error) {
            if (error instanceof CustomError) throw error;
        }

        throw CustomError.internal();
    }

    async getUserById(id: string): Promise<UserEntity>{

        try {
            const user = await prisma.user.findUnique({ where: { id } });

            if (!user) throw CustomError.notFound('User not found');

            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal('Internal server error');
        }
    }
}