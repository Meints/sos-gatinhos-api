import {
  Color as PrismaColor,
  Gender as PrismaGender,
  CatStatus as PrismaCatStatus,
} from '@prisma/client';

export const Color = PrismaColor;
export type Color = PrismaColor;

export const Gender = PrismaGender;
export type Gender = PrismaGender;

export const CatStatus = PrismaCatStatus;
export type CatStatus = PrismaCatStatus;
