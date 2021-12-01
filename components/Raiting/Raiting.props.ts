import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IRaiting extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: false | true
  rating: number
  setRating?: (rating:number) => void
}