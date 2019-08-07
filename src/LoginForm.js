import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

function LoginForm({ values, errors, touched }) {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder='Email'/>
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder='Password'/>
      </div>
      <Field component="select" name="meal">
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="platinum">Platinum</option>
      </Field>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      <button>Submit!</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password, tos, meal }) {
    return {
      email: email || '',
      password: password || '',
      tos: tos || false,
      meal: meal || 'silver'
    }
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be 6 characters or longer')
      .required('Password is required')
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    // console.log(values)
    if (values.email === 'alreadytaken@mail.com') {
      setErrors({ email: 'That email is already taken' })
    } else {
      axios
        .post('https://databaseurlgoeshere.com', values)
        .then(res => {
          console.log(res)
          resetForm()
          setSubmitting(false)
        })
        .catch(err => {
          console.log(err)
          setSubmitting(false)
        })
    }
  }
}) (LoginForm)

export default FormikLoginForm;