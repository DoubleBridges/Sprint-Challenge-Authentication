import { useState } from 'react'

export const useFormInput = initialValues => {
  const [values, setValues] = useState(initialValues);

  const changeHandler = e => setValues({ ...values, [e.target.name]: e.target.value })

  const resetForm = () => setValues({
    name: '',
    password: ''
  })

  return [values, changeHandler, resetForm, setValues]

}