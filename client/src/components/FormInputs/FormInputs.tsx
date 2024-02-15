import React, { ForwardedRef } from 'react';
import withLabel from './withLabel';

export const FormInput = withLabel(
    React.forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) =>
        <input ref={ref} {...props} />))