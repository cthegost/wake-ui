import React from 'react';
import './Avatar.css';
type AvatarSize = 'small' | 'medium' | 'large';
type AvatarShape = 'circle' | 'square';
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string | null;
    alt?: string;
    name?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
