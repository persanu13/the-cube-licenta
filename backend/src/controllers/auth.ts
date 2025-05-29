import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {
  AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET,
  JWT_SECRET,
  SERVER_URL,
} from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { LoginSchema, SignUpSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";
import axios from "axios";

//Sign up functie de creare cont
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);

  const { name, email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestException(
      "User already exists!",
      ErrorCodes.USER_ALREADY_EXISTS
    );
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  const { password: _password, ...safeUser } = user;
  res.json(safeUser);
};

// Sign In functie de login cu email, parola
export const signIn = async (req: Request, res: Response) => {
  LoginSchema.parse(req.body);

  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    throw new NotFoundException("User not found!", ErrorCodes.USER_NOT_FOUND);
  }

  if (!user.password) {
    throw new BadRequestException(
      "Email used with oAuth!",
      ErrorCodes.EMAIL_USED_WITH_OAUTH
    );
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestException(
      "Incorrect password!",
      ErrorCodes.INCORECT_PASSWORD
    );
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: user.role === "ADMIN" ? "1h" : "30d",
  });

  const { password: _password, ...safeUser } = user;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.json({ user: safeUser, token });
};

export const googleAuth = async (req: Request, res: Response) => {};

// githubAuth functie care te redirectioneaza spre github
export const githubAuth = async (req: Request, res: Response) => {
  const redirect_uri = `${SERVER_URL}/api/auth/github/callback`;
  const client_id = AUTH_GITHUB_ID;
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user:email`;
  res.redirect(githubAuthURL);
};

// githubAuthCallback functie care te logheaza folosind tokenul de la github
export const githubAuthCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!code) {
    throw new NotFoundException(
      "GithHub user not found!",
      ErrorCodes.USER_NOT_FOUND
    );
  }

  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: AUTH_GITHUB_ID,
      client_secret: AUTH_GITHUB_SECRET,
      code,
    },
    {
      headers: { Accept: "application/json" },
    }
  );

  const access_token = response.data.access_token;

  const userRes = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const githubUser = userRes.data;

  let user = await prismaClient.user.findFirst({
    where: {
      accounts: {
        some: {
          provider: "github",
          providerAccountId: String(githubUser.id),
        },
      },
    },
  });

  if (!user) {
    const githubEmailsRes = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const githubEmails = githubEmailsRes.data;

    const email = githubEmails.find((e: any) => e.primary && e.verified)?.email;

    user = await prismaClient.user.create({
      data: {
        name: githubUser.name,
        email: email,
        image: githubUser.avatar_url,
        accounts: {
          create: {
            provider: "github",
            providerAccountId: String(githubUser.id),
            access_token,
            type: "oauth",
          },
        },
      },
    });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: user.role === "ADMIN" ? "1h" : "30d",
  });

  const { password: _password, ...safeUser } = user;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.json({ user: safeUser, token });
};

// signOut functie care sterge tokenul
export const signOut = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
  res.json({ message: "Successfully signed out." });
};

//me functie care returneaza utilizatorul conectat
export const me = async (req: Request, res: Response) => {
  const { password, ...safeUser } = req.user;
  res.json(safeUser);
};
