import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

export interface IRaiting extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: false | true
  rating: number
  setRating?: (rating:number) => void
  error?: FieldError
}