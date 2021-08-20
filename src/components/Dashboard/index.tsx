import { useState, useContext, useEffect } from 'react';
import { Tile, Button } from 'carbon-components-react';
import { Add32 } from '@carbon/icons-react';
import { Container, Content, Item } from './styles';
import { HeaderGlobal } from './HeaderGlobal';
import { ModalTransaction } from './ModalTransaction';
import { ModalAllBalance } from './ModalAllBalance';
import { TableExtract } from './TableExtract';
import { AuthContext } from '../../contexts/AuthContext'; 
import { api } from '../../utils/api';
import { ModalReport } from './ModalReport';

export function Dashboard() {
    const [openTransaction, setOpenTransaction] = useState(false);
    const [openAllBalance, setOpenAllBalance] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const { client } = useContext(AuthContext);
    const [balance, setBalance] = useState(client.balance.toFixed(2));
    
    useEffect(() => {
        if (client.id === 0)
            return;

        api.get(`Clients/${client.id}`)
        .then(result => {
            setBalance(result.data.balance.toFixed(2))
        })
    }, [client.id, openTransaction]);

    return(
        <> 
            <HeaderGlobal />
            <Container>
                <Content>
                    <Item>
                        <Button 
                            renderIcon={Add32} 
                            iconDescription={"Nova transação"} 
                            onClick={() => setOpenTransaction(true)}
                         >
                            Nova transação
                        </Button>
                    </Item>                   
                    <Item>
                        <Button 
                            renderIcon={Add32} 
                            iconDescription={"Relatório Dia"} 
                            onClick={() => setOpenReport(true)}
                         >
                            Relatório
                        </Button>
                    </Item>
                    <Item>
                        <Button 
                            renderIcon={Add32} 
                            iconDescription={"Todos os Saldos"} 
                            onClick={() => setOpenAllBalance(true)}
                        >
                            Todos Saldos
                        </Button>
                    </Item>
                </Content>
            </Container>
            <Container>
                <Tile>
                    <h6>Saldo</h6>
                    <h2>R$ {balance}</h2>
                </Tile>
            </Container>
            <Container>
                <Tile>
                    <TableExtract idClient={client.id} open={openTransaction}/>
                </Tile>
            </Container>
            <ModalReport open={openReport} setOpen={setOpenReport} idClient={client.id} />
            <ModalTransaction open={openTransaction} setOpen={setOpenTransaction} />
            <ModalAllBalance open={openAllBalance} setOpen={setOpenAllBalance} />
        </>
    );
}