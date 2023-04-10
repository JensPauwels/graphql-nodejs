import {GraphQLBoolean, GraphQLList, GraphQLString} from 'graphql';
import {type ContextType, TodoType} from '../types';
import {TodoDao} from '../db/';
import Todo, {type ITodo} from '../models/Todo';

export const GET_ALL_TODOS = {
	description: 'List of all the todos',
	type: new GraphQLList(TodoType),
	async resolve() {
    return TodoDao.getAll('8e27052e-f615-45e9-b45b-998637e8f315');
	},
};

export const UPDATE_TODO = {
	type: TodoType,
	args: {
		id: {type: GraphQLString},
		content: {type: GraphQLString},
    checked: {type: GraphQLBoolean},
	},
	async resolve(_: any, {id, content, checked}: {id: string; content: string; checked: boolean}) {
    const todo = await TodoDao.getById(id);
    todo.content = content;
    todo.checked = checked;

    await TodoDao.updateTodo(todo);
		return todo;
	},
};

export const ADD_TODO = {
	type: TodoType,
	args: {
		id: {type: GraphQLString},
    category_id: {type: GraphQLString},
    checked: {type: GraphQLBoolean},
		content: {type: GraphQLString},
	},
	async resolve(_: any, {id, content, checked, category_id}: ITodo, context: ContextType) {
    const todo = new Todo({
      id,
      content,
      checked,
      category_id,
      author_id: context.token.authorID,
    });

    await TodoDao.addTodo(todo);
		return todo;
	},
};

export const DELETE_TODO = {
	type: TodoType,
	args: {
		id: {type: GraphQLString},
	},
	async resolve(_: any, {id}: {id: string}) {
    const todo = await TodoDao.getById(id);
    await TodoDao.deleteById(todo);
	},
};
