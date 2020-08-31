import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'

const SignupForm = (props) => {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isCaretaker,setIsCaretaker] = useState(false);
  
  return (
    <Form>
      <Form.Input
        fluid
        label='Email'
        id='form-input-email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>{email}</p>
      <Form.Input
        fluid
        label='Password'
        id='form-input-password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        <p>{password}</p>
    
      <Form.Checkbox
        label='Caretaker'
        checked={isCaretaker}
        onChange={e => {
          setIsCaretaker(e.target.checked)
          console.log(isCaretaker)
        }}        
        />
        <p>{isCaretaker ? "yes" : "no"}</p>
    </Form>
    )
}


export default SignupForm;