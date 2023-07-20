import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

import db from "../../db";
import { handleError } from "../../utils";
import { ERROR_CODES } from "../../constants";

const revokedTokens: string[] = [];

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  const secretKey = process.env.SECRET_KEY as Secret;

  if (!token) {
    return res.status(403).json({ error: "No token provided." });
  }

  if (revokedTokens.includes(token)) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    // Attach the decoded user ID to the request object for later use
    req.body.userId = (decoded as any).userId;
    req.body.token = token;
    next();
  });
};

export async function create(req: Request, res: Response) {
  try {
    const { username, password, name } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
    });

    return res.status(201).send({ error: false, data: user });
  } catch (error) {
    return handleError(res, { code: ERROR_CODES.common, message: "Create user failed" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const secretKey = process.env.SECRET_KEY as Secret;

    // Check if the user exists
    const user = await db.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

    return res.status(200).send({ error: false, token });
  } catch (error) {
    return handleError(res, {
      code: ERROR_CODES.common,
      message: "Sorry, there was a problem logging you in. Please try again later",
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "No token provided." });
    }
    revokedTokens.push(token);
    return res.status(200).send({ error: false, message: "Logout successful." });
  } catch (error) {
    return handleError(res, {
      code: ERROR_CODES.common,
      message: "Sorry, there was a problem logging you out. Please try again later",
    });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
      },
    });

    return res.status(200).send({ error: false, data: users });
  } catch (error) {
    return handleError(res, { code: ERROR_CODES.common, message: "Get users failed" });
  }
}
