import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import { CategoryResolver } from "./resolvers/category";
import { createConnection } from "typeorm";
import path from "path";
import { Category } from "./entities/Category";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        // synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [Category, User],
    });
    await conn.runMigrations();
    // await Category.delete({});

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [CategoryResolver, UserResolver],
            validate: false,
        }),
        introspection: true,
        playground: true,
        context: () => ({})
    });

    apolloServer.applyMiddleware({ app });

    app.get('/', (_, res) => {
        res.send('hello');
    });

    app.listen(process.env.PORT, () => {
        console.log("server started on localhost:3000");
    });
};

main().catch((err) => {
    console.log(err);
});
