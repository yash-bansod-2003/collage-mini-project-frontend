import React from 'react'
import Input from './FormComponents/Input';
import Textarea from './FormComponents/Textarea'
import Select from './FormComponents/Select';

const FormikControls = (propes) => {
    const { control, ...rest } = propes;

    const controles = {
        input: <Input {...rest} />,
        textarea: <Textarea {...rest} />,
        select: <Select {...rest} />
    }

    return controles[control];
}

export default FormikControls