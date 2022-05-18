import { DataSource } from "typeorm"
import { User } from "./src/domain/entities/User";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/nlw-valoriza.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
});

export { AppDataSource };