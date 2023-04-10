import {Token} from '../middleware/';

export type IContextType = {
  token: Token;
};

export default class ContextType {
  token: Token;

  constructor(data?: Partial<IContextType>) {
    this.token = data?.token ?? new Token();
  }
}
