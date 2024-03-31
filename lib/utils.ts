import { AxiosError, AxiosResponse } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export const FormSchema = z
 .object({
  name: z.string().min(1, 'Product Name is Required'),
  description: z.string().min(6, 'Descriptions must have at least 6 characters'),
  priceInNaira: z.number(),
  marketPrice: z.number(),

})

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}


// Define the interface extending AxiosError
export interface MyAxiosError<T = any> extends AxiosError {
 response?: AxiosResponse<T> | undefined;
}

export interface MyAxiosSuccess<T = any> extends AxiosResponse {
 data: T;
}

export type ProductData = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  marketPrice: number;
};