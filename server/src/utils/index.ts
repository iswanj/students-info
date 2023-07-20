import { Response } from "express";

export function handleError(res: Response, err: any) {
  return res
    .status(200)
    .send({ error: true, code: `${err.code}`, message: `${err.code} - ${err.message}` });
}
