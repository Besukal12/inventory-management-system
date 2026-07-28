import jwt from "jsonwebtoken";

export function createAccessToken(
  userId: string,
  role: "Admin" | "Manager" | "Employee",
) {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  return jwt.sign({ userId, role }, secret, { expiresIn: "30m" });
};

export function createRefreshToken(
  userId: string,
  role: "Admin" | "Manager" | "Employee",
) {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }

  return jwt.sign({ userId, role }, secret, { expiresIn: "7d" });
};

export function verifyAccessToken(token: string) {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  return jwt.verify(token, secret) as {
    userId: string;
    role: "Admin" | "Manager" | "Employee";
  };
};

export function verifyRefreshToken(token: string) {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }

  return jwt.verify(token, secret) as {
    userId: string;
    role: "Admin" | "Manager" | "Employee";
  };
};
