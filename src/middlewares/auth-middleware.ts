import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import { JWTPayload } from "../protocols";
import httpStatus from "http-status";
import {  } from "../protocols";

export async function authenticateToken(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.sendStatus(httpStatus.UNAUTHORIZED)
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(httpStatus.UNAUTHORIZED)
  try {
    const {userId}=jwt.verify(token,process.env.JWT_SECRET as string) as JWTPayload
    const session = await prisma.session.findFirst({
      where: {
        token,
      },
    });
    if (!session) return res.sendStatus(httpStatus.UNAUTHORIZED)
    res.locals.userId=userId
    res.locals.token=token
    return next()
  } catch (error) {
    if (!authHeader) return res.sendStatus(httpStatus.PAYMENT_REQUIRED)
  }
}

