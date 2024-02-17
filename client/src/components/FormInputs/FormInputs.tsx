import React, { ForwardedRef } from 'react';
import withLabel from './withLabel';
import { Input } from './Input';

export const FormInput = withLabel(
    React.forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) =>
        <Input ref={ref} {...props} />))