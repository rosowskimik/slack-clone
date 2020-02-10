import * as yup from 'yup';

export default yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
  password: yup.string().required('Required')
});
