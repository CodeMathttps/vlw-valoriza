import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../domain/entities/User";


class UserRepository extends Repository<User>{}

const userRepository = AppDataSource.getRepository(User).extend(UserRepository);

export { userRepository }