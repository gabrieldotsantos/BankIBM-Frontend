import { useEffect, useState, useContext } from 'react';
import { Modal, Form, TextInput, Select, SelectItem, Loading } from 'carbon-components-react';
import { api } from '../../../utils/api';
import { AuthContext } from '../../../contexts/AuthContext';

interface IPropsModal {
    open: boolean, 
    setOpen: Function
}

interface Client {
    id: number,
    numberAccount: string,
    name: string,
    age: number,
    email: string,
    password: string,
    balance: 0
}

interface Transaction {
    TransactionType: string,
    Value: string,
    ClientSourceID: number,
    ClientDestinyID: number,
}

export function ModalTransaction(props: IPropsModal) {
    const { client } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [notif, setNotif] = useState({
        hidden: false,
        text: ""
    });


    const [transaction, setTransaction] = useState<Transaction>({
        TransactionType: "Deposito",
        Value: "0",
        ClientSourceID: client.id,
        ClientDestinyID: 0,
    });
    
    const [clients, setClients] = useState<Client[]>([])

    useEffect(() => {
        setIsLoading(true);
        if (props.open === true) {
            api.get('Clients')
            .then(response => {
                setClients(response.data);
                if (response.data.length > 0 )
                    handleSelectClient(response.data[0].id)
            });
            return;
        }

        setTransaction(prevState => {
            return ({ 
                ...prevState, 
                TypeTransaction: "Deposito",
                Value: "0",
                ClientDestinyID: 0,
            });
        });

        
        setNotif({
            hidden: false,
            text: "",
        });
    }, [props.open]);

    useEffect(() => {
        setIsLoading(false);
    }, [clients]);


    function submitTransaction() {
        api.post('Transactions', transaction)
        .then(response => {
            props.setOpen(false);
        }).catch(error => {
            console.error(error);
            setNotif({
                hidden: true,
                text: `Algo deu errado para transfêrir ${transaction.Value}, talvez não tenha saldo suficiente. 
                       Caso o error persistir entre em contato com o administrador do sistema. `,
            });
        });
    }

    function handleSelectClient(clientSelected: number) {
        setTransaction(prevState => {
            return ({ 
                ...prevState, 
                ClientDestinyID: clientSelected 
            });
        });
    }

    function handleSelectType(typeSelected: string) {
        if (typeSelected === "Transferencia")
            handleSelectClient(clients.filter(x => x.id !== client.id)[0].id);
        else 
        handleSelectClient(clients.filter(x => x.id === client.id)[0].id);

        setTransaction(prevState => {
            return ({ 
                ...prevState, 
                TransactionType: typeSelected 
            });
        });
    }

    function handleSelectValue(value: string) {
        setTransaction(prevState => {
            return ({ 
                ...prevState, 
                Value: value.replaceAll(",", ".")
            });
        });
    }

    return(
        <Modal
            open={props.open}
            onRequestClose={() => props.setOpen(false)}
            onRequestSubmit={() => submitTransaction()}
            modalHeading="Transações"
            modalLabel="Executar Transação"
            primaryButtonText="Confirmar"
            secondaryButtonText="Cancelar"
        >
            { notif.hidden && <div style={{ marginBottom: '1rem' }}> {notif.text} </div> }
            { isLoading ? (<Loading description="Active loading indicator" withOverlay={false} />) 
            : (
                <Form>
                    <Select 
                        data-modal-primary-focus
                        id="select-type-transaction" 
                        defaultValue="0" 
                        value={transaction.TransactionType}
                        labelText="Tipo de transação" 
                        onChange={(e) => handleSelectType(e.target.value)} 
                        style={{ marginBottom: '1rem' }}
                    >
                        <SelectItem value="Deposito" text="Deposíto" />
                        <SelectItem value="Transferencia" text="Transferência" />
                    </Select>
                    <TextInput
                        id="text-value-transaction"
                        labelText="Valor R$"
                        type={"number"}
                        value={transaction.Value}
                        onChange={(e) => handleSelectValue(e.target.value)} 
                        placeholder="Valor em Reais"
                        style={{ marginBottom: '1rem' }}
                    />
                    <Select 
                        required 
                        id="select-account-transaction" 
                        invalidText="Selecione uma opção"
                        value={transaction.ClientDestinyID} 
                        defaultValue={0}
                        onChange={(e) => handleSelectClient(parseInt(e.target.value))} 
                        labelText="Conta"
                    >  
                        {clients.map(clientMap => {
                            if (client.id === clientMap.id && transaction.TransactionType === "Deposito")
                                return <SelectItem key={clientMap.id} value={clientMap.id} text={`${clientMap.name} - ${clientMap.numberAccount}`}  />;
                            
                            if (client.id !== clientMap.id && transaction.TransactionType === "Transferencia")
                                return <SelectItem key={clientMap.id} value={clientMap.id} text={`${clientMap.name} - ${clientMap.numberAccount}`}  />

                            return null;
                        })}     
                    </Select>
                    <br />
                </Form>
            )}
        </Modal>
    );
}