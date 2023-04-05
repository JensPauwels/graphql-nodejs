import {v4 as uuidv4} from 'uuid';

export type IAdmin = {
	id?: string;
	email?: string;
	password?: string;
};

class Admin {
	id: string;
	email: string;
	password: string;

	constructor(data?: IAdmin) {
		this.id = data?.id ?? uuidv4();
		this.email = data?.email ?? '';
		this.password = data?.password ?? '';
	}
}

export default Admin;
