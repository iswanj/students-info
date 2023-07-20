import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import db from "../db";

const router = express.Router();

// Register a new user
router.post("/register", async (req: Request, res: Response) => {
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

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user." });
  }
});

// User login
router.post("/login", async (req: Request, res: Response) => {
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

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login." });
  }
});

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  const secretKey = process.env.SECRET_KEY as Secret;

  if (!token) {
    return res.status(403).json({ error: "No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    }

    // Attach the decoded user ID to the request object for later use
    req.body.userId = (decoded as any).userId;
    req.body.token = token;
    next();
  });
};

router.post("/logout", verifyToken, (req: Request, res: Response) => {
  // Here, you can add any logic to handle token invalidation (e.g., remove from blacklist, store in a revoked token list, etc.)
  // For simplicity, we'll just return a success message for the logout.
  res.json({ message: "Logout successful." });
});

router.get("/users", verifyToken, async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users." });
  }
});

export default router;
