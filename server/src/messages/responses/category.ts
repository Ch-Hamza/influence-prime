import { Field, ObjectType } from "type-graphql";
import { Category } from "../../entities/Category";
import { FieldError } from "./fieldError";

@ObjectType()
export class CategoryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Category, { nullable: true })
  category?: Category;
}