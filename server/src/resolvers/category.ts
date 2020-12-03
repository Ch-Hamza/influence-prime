import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { CategoryInput } from "../messages/requests/category";
import { CategoryResponse } from "../messages/responses/category";

@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    findAll(
    ): Promise<Category[]> {
        return Category.find({ where: {enabled: true } });
    }

    @Query(() => CategoryResponse)
    async findOneById(
        @Arg('id', () => Int) id: number,
    ): Promise<CategoryResponse> {
        const category = await Category.findOne({ where: { id: id, enabled: true } });
        if (!category) {
            return {
                errors: [{
                    field: "id",
                    message: `Category with id ${id} doesn't exist`,
                }],
            };
        }
        return {
            category
        };
    }

    @Mutation(() => Category)
    create(
        @Arg('category') categoryInput: CategoryInput,
    ): Promise<Category | undefined> {
        return Category.create(categoryInput).save();
    }

    @Mutation(() => CategoryResponse)
    async update(
        @Arg('id') id: number,
        @Arg('category') categoryInput: CategoryInput,
    ): Promise<CategoryResponse> {
        const category = await Category.findOne({ where: { id: id, enabled: true } });
        if (!category) {
            return {
                errors: [{
                    field: "id",
                    message: `Category with id ${id} doesn't exist`,
                }],
            };
        }

        Object.assign(category, categoryInput);
        category.save();
        return {
            category
        };
    }

    @Mutation(() => Boolean)
    async delete(
        @Arg('id') id: number,
    ): Promise<boolean> {
        const category = await Category.findOne({ where: { id: id, enabled: true } });
        if (!category) {
            return false;
        }
        category.enabled = false;
        category.save();
        return true;
    }
}