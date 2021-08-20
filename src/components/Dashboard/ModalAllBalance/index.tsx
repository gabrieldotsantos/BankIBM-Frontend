// @ts-nocheck
import { useEffect, useState } from 'react';
import { Modal, DataTable, TableContainer, Table, TableRow, TableCell, TableHead, TableHeader, TableBody } from 'carbon-components-react';
import { api } from '../../../utils/api';

const headerData = [
    {
      header: 'Nome',
      key: 'name',
    },
    {
      header: 'Número da conta',
      key: 'numberAccount',
    },
    {
      header: 'E-mail',
      key: 'email',
    },
    {
      header: 'Idade',
      key: 'age',
    },
    {
      header: 'Saldo',
      key: 'balance',
    },
];

interface Client {
    id: number,
    age: number,
    balance: number,
    email: string,
    name: string,
    numberAccount: string,
}

interface IPropsModal {
    open: boolean, 
    setOpen: Function
}

export function ModalAllBalance(props: IPropsModal) {
    const [clients, setClients] = useState<Client[]>([{
        id: 0,
        age: 0,
        balance: 0,
        email: "",
        name: "",
        numberAccount: "",
    }]);

    useEffect(() => {
        handleClients();
    }, [props.open]);

    function handleClients() {
        api.get('Clients')
        .then(response => {
            setClients(response.data)
        })
    }

    return(
        <Modal
            open={props.open}
            passiveModal
            onRequestClose={() => props.setOpen(false)}
            modalHeading="Todos os clientes cadastrados"
        >
            <DataTable rows={clients} headers={headerData}>
                {({ rows, headers, getHeaderProps, getTableProps }) => (
                    <TableContainer title="Saldos">
                    <Table {...getTableProps()} size='normal' useZebraStyles>
                        <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHeader {...getHeaderProps({ header })}>
                                    {header.header}
                                </TableHeader>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                            {row.cells.map((cell) => (
                                <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                )}
            </DataTable>
        </Modal>
    );
}