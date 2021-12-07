import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface IButton  extends
Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'>
{
    appearance: 'primary' | 'ghost'
    children: ReactNode
    arrow?: 'right' | 'down' | 'none'
}