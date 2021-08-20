import React, { useState } from 'react';
import { Button, Form, TextInput } from 'carbon-components-react';
import { DivNotif } from './styles';
import { api } from '../../../utils/api';

interface Client {
    Name: string,
    Age: number,
    Email: string,
    Password: string,
}

export function CreateClient() {
    const [client, setClient] = useState<Client>({
        Name: "",
        Age: 18,
        Email: "",
        Password: "",
    });

    const [notif, setNotif] = useState({
        hidden: false,
        text: ""
    });

    const handleChangeString = (value: string, name: string) => {
        setClient(prevState => {
            return ({ 
                ...prevState, 
                [name]: value 
            });
        });
    }
    
    const handleChangeAge = (value: number) => {
        setClient(prevState => {
            return ({ 
                ...prevState, 
                Age: value 
            });
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        api.post("Clients", client)
        .then(response => {
            if (response.status === 201) {
                setNotif({
                    hidden: true,
                    text: "Usuário cadastrado com sucesso, acesse a tela de login e entre!",
                })
                return;
            }
            
            setNotif({
                hidden: true,
                text: "Algo deu errado para cadastrar o usuário, por favor contate o admistrador",
            });


        }).catch(error => {
            console.error(error);
            setNotif({
                hidden: true,
                text: "Algo deu errado para cadastrar o usuário, por favor contate o admistrador",
            });
        }); 
    }
    
    return(
        <>
            { notif.hidden && <DivNotif> {notif.text} </DivNotif> }
            <Form onSubmit={event => handleSubmit(event)}>
                <TextInput
                    required
                    autoFocus
                    id="Name"
                    labelText="Nome Completo"
                    placeholder="Nome Completo"
                    minLength={5}
                    maxLength={254}
                    value={client.Name}
                    onChange={event => handleChangeString(event.target.value, event.target.id)}
                    style={{ marginBottom: '1rem' }}
                />
                <TextInput
                    required
                    id="Age"
                    labelText="Idade"
                    placeholder="Idade"
                    maxLength={3}
                    type={"number"}
                    onChange={event => handleChangeAge(parseInt(event.target.value))}
                    value={client.Age}
                    style={{ marginBottom: '1rem' }}
                />
                <TextInput
                    required
                    id="Email"
                    labelText="Email"
                    placeholder="Email"
                    type={"email"}
                    onChange={event => handleChangeString(event.target.value, event.target.id)}
                    value={client.Email}
                    style={{ marginBottom: '1rem' }}
                />
                <TextInput
                    required
                    id="Password"
                    labelText="Senha"
                    placeholder="Senha"
                    minLength={5}
                    type={"password"}
                    onChange={event => handleChangeString(event.target.value, event.target.id)}
                    value={client.Password}
                    style={{ marginBottom: '1rem' }}
                />
                <Button type="submit">Salvar</Button>
            </Form>
        </>
    );
}