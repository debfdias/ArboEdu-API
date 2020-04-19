import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Basic = () => (
  <div>
    <h1>Cadastro Admin</h1>
    <Formik
      initialValues={{ email: '', password: '', passwordCheck: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if(!values.password){
          errors.password ="Required";
        }else if( values.password.length < 6){
          errors.password = "Sua senha deve ter 6 caracteres ou mais"
        }
        if(!values.passwordCheck){
          errors.passwordCheck = "Repita a senha";
        }else if(values.passwordCheck !== values.password){
          errors.passwordCheck = "As senhas estão diferentes";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <Field type="password" name="passwordCheck" />
          <ErrorMessage name="passwordCheck" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Basic;