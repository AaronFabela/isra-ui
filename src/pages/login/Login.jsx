import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { Button, Container, FormGroup, Input, Label } from 'reactstrap'
import { ROUTES } from '../../constants/routes';
import { login } from '../../services/authService';

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
      });

      const [error, setError] = useState('');
      const navigate = useNavigate();

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name]: value
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const fakeUser = {
            email: "prueba",
            token: 'fake-jwt-token', // Token ficticio
            };
    
        // const success = await login(formValues.email, formValues.password);
        localStorage.setItem('user', JSON.stringify(fakeUser));
    
        // if (success) {
        //   navigate(ROUTES.ADMIN_DASHBOARD); // Redirige a la página principal si el login es exitoso
        // } else {
        //   setError('Correo o contraseña incorrectos');
        // }
        navigate(ROUTES.ADMIN_DASHBOARD)
      };
    
  return (
    <Container fluid style={{backgroundColor:"gray", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Container style={{backgroundColor:"white", height:"500px", borderRadius:"8px", display:"flex", flexDirection:"column", justifyContent:"center", width:"50%"}}>
            {/* <Form onSubmit={handleSubmit}> */}
                <FormGroup>
                    <Label for="exampleEmail">
                    Email
                    </Label>
                    <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    onChange={handleChange}
                    type="email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                    Password
                    </Label>
                    <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    onChange={handleChange}
                    type="password"
                    />
                </FormGroup>
                <Button onClick={handleSubmit} color="primary">Submit</Button>
            {/* </Form> */}

        </Container>
    </Container>
  )
}

export default Login