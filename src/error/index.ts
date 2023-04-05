import { Response } from "express";

export const ERROR = {
  DB_POOL_NOT_INSTANTIATED: 'DB_POOL_NOT_INSTANTIATED',
  MISSING_RESULT: 'MISSING_RESULT'
}

const handleError = (res: Response, error: any) => {
  console.log(error)

  let { code } = error;
  const { message } = error;

  if (code === undefined) {
    code = message;
  }

  switch(code) {
    case ERROR.DB_POOL_NOT_INSTANTIATED:
      res.status(500).json({error: 'DUPLICATE_ENTRY'})
      return;
    default:
      res.status(500).json({error: code === undefined ? error.message : ''});
      return;
  }
};

export default handleError;
