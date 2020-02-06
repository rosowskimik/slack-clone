import * as yup from 'yup';

export default yup.object({
  username: yup
    .string()
    .required('Required')
    .max(25),
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters long'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Required')
});
