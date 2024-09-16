import React from 'react'
import axios from 'axios'
import { Form, Segment } from 'semantic-ui-react'
import { useFormInput } from '../Hooks';



const LogInForm = props => {

  const [values, changeHandler] = useFormInput({ username: '', password: '' })
  
  const logInHandler = () => {
    axios.post(`http://localhost:3300/api/auth/login`, values)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/jokes')

      })
      .catch(err => console.log('LogIn: POST:', err))
  }

  return (
    <Segment>
      <Form
        onSubmit={logInHandler}>
        <Form.Input
          fluid
          label='Username'
          name='username'
          placeholder='Username'
          value={values.username}
          onChange={changeHandler}
        />
        <Form.Input
          fluid
          label='Password'
          name='password'
          placeholder='Password'
          type='password'
          value={values.password}
          onChange={changeHandler}
        />
        <Form.Button>Log In</Form.Button>
      </Form>
    </Segment>
  )
}

export default LogInForm