import React from 'react'
import axios from 'axios'
import { Form, Segment } from 'semantic-ui-react'
import { useFormInput } from '../Hooks';



const SignUpForm = props => {

  const [values, changeHandler] = useFormInput({ username: '', password: '' })
  
  const logInHandler = () => {
    axios.post(`http://localhost:3300/api/auth/register`, values)
      .then(res => {
        props.history.push('/login')

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
        <Form.Button>Sign Up</Form.Button>
      </Form>
    </Segment>
  )
}

export default SignUpForm