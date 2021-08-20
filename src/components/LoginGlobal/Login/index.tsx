import React, { useState, useContext } from 'react';
import { Button, Form, TextInput } from 'carbon-components-react';
import { AuthContext } from '../../../contexts/AuthContext';

interface Client {
    Email: string,
    Password: string,
}

export function Login() {
    const { handleLogin } = useContext(AuthContext);
    const [client, setClient] = useState<Client>({
        Email: "",
        Password: "",
    });

    const handleChangeEmail = (value: string) => {
        setClient(prevState => {
            return ({ 
                ...prevState, 
                Email: value 
            });
        });
    }

    const handleChangePassword = (value: string) => {
        setClient(prevState => {
            return ({ 
                ...prevState, 
                Password: value 
            });
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleLogin(client);
    }
    
    return(
        <>
            <Form onSubmit={event => handleSubmit(event)}>
                <TextInput
                    required
                    autoFocus
                    id="text-email-login"
                    labelText="Email"
                    placeholder="Email"
                    type={"email"}
                    onChange={event => handleChangeEmail(event.target.value)}
                    value={client.Email}
                    style={{ marginBottom: '1rem' }}
                />
                <TextInput
                    required
                    id="text-senha-login"
                    labelText="Senha"
                    placeholder="Senha"
                    type={"password"}
                    onChange={event => handleChangePassword(event.target.value)}
                    value={client.Password}
                    style={{ marginBottom: '1rem' }}
                />
                <Button type="submit">Entrar</Button>
            </Form>
        </>
    );
}