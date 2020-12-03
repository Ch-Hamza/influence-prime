import { User } from "../entities/User";
import { Query, Resolver } from "type-graphql";

@Resolver(User)
export class UserResolver {
    @Query(() => String, { nullable: true })
    me(
        // @Ctx() { req }: CustomContext
    ): string {
        return 'hello';
        // not logged in
        // if (!req.session.userId) {
            //return null;
        // }

        // return User.findOne(req.session.userId);
  }
}