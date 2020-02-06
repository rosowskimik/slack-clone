import React from 'react';
import { useField, FieldAttributes } from 'formik';
import { Form } from 'semantic-ui-react';

interface Props {
  label: string;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<Props & FieldAttributes<{}>> = ({
  label,
  type = 'text',
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);

  const error = !!(meta.error && meta.touched)
    ? { content: meta.error, pointing: 'below' }
    : false;

  return (
    <Form.Input
      fluid
      label={label}
      type={type}
      placeholder={placeholder}
      error={error}
      {...field}
    />
  );
};

export default InputField;
