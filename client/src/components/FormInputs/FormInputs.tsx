import React, { ForwardedRef } from 'react';
import withLabel from './withLabel';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { Select } from './Select';

export const FormInput = withLabel(
    React.forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) =>
        <Input ref={ref} {...props} />))

export const FormTextArea = withLabel(
    React.forwardRef((props: React.InputHTMLAttributes<HTMLTextAreaElement>, ref: ForwardedRef<HTMLTextAreaElement>) =>
        <TextArea ref={ref} {...props} />))

export const FormSelect = withLabel(
    React.forwardRef((props: React.InputHTMLAttributes<HTMLSelectElement>, ref: ForwardedRef<HTMLSelectElement>) =>
        <Select ref={ref} {...props} />))