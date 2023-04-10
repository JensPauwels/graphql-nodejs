import {GraphQLList, GraphQLString} from 'graphql';
import {CategoryType} from '../types';
import type ContextType from '../types/ContextType';
import {CategoryDao} from '../db/';
import Category, {type ICategory} from '../models/Category';

export const GET_ALL_CATEGORIES = {
	description: 'List of all the categories',
	type: new GraphQLList(CategoryType),
	async resolve(_: unknown, _1: unknown, context: ContextType) {
    return CategoryDao.getAll(context.token.authorID);
	},
};

export const GET_BY_ID = {
	description: 'Get category by ID',
	type: CategoryType,
	args: {
		id: {type: GraphQLString},
	},
	async resolve(_: unknown, {id}: {id: string}, context: ContextType) {
    const category = new Category({
      id,
      author_id: context.token.authorID,
    });

    await CategoryDao.getById(category);
    return category;
	},
};

export const UPDATE_TODO = {
	type: CategoryType,
	args: {
		id: {type: GraphQLString},
		name: {type: GraphQLString},
	},
	async resolve(_: any, {id, name}: ICategory) {
    const category = new Category({
      id,
      name,
    });

    await CategoryDao.getById(category);
    await CategoryDao.updateCategory(category);
		return category;
	},
};
