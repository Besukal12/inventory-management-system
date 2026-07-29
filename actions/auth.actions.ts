import { NextRequest, NextResponse } from "next/server";
import { loginSchema, registerSchema } from "@/lib/validators/auth.schema";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "@/lib/token";
import { hashPassword, comparePasswords } from "@/lib/hash";
import prisma from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function register(req: NextRequest) {
  try {
    const body = await req.json();
    const safeData = registerSchema.safeParse(body);

    if (!safeData.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: safeData.error.format(),
        },
        { status: 400 },
      );
    }

    const { name, email, password, role } = safeData.data;
    const normalizedEmail = email.toLowerCase();

    const userExists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (userExists) {
      return NextResponse.json(
        {
          message:
            "User with this email already exists. Please try another email.",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role,
      },
    });

    const verifySecret = process.env.JWT_VERIFY_SECRET;
    if (!verifySecret) {
      throw new Error("JWT_VERIFY_SECRET is not defined");
    }

    const verifyToken = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      verifySecret,
      { expiresIn: "1d" },
    );

    return NextResponse.json(
      {
        message: "User registered successfully",
        verifyToken,
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { message },
      { status: 500 },
    );
  }
}

export async function login(req: NextRequest) {
  try {
    const body = await req.json();
    const safeData = loginSchema.safeParse(body);

    if (!safeData.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: safeData.error.format(),
        },
        { status: 400 },
      );
    }

    const { email, password } = safeData.data;
    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const role = user.role as "Admin" | "Manager" | "Employee";

    const accessToken = createAccessToken(user.id, role);
    const refreshToken = createRefreshToken(user.id, role);

    const isProduction = process.env.NODE_ENV === "production";

    const cookieStore = await cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json(
      {
        message: "Login successful",
        accessToken,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { message },
      { status: 500 },
    );
  }
}

export async function logout(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";

    cookieStore.set("refreshToken", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function refreshToken(req: NextRequest) {
  try {
    const token = req.cookies.get("refreshToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Refresh token not found" },
        { status: 401 },
      );
    }

    const payload = verifyRefreshToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    const newAccessToken = createAccessToken(user.id, user.role as "Admin" | "Manager" | "Employee");

    return NextResponse.json(
      {
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid or expired refresh token" },
      { status: 401 },
    );
  }
}