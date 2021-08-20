import React, { useContext } from "react";
import { Container, Content } from "./styles";
import { Button } from 'carbon-components-react';
import { Logout32 } from '@carbon/icons-react';
import { AuthContext } from '../../../contexts/AuthContext';

export function HeaderGlobal() {
    const { handleLogout, client } = useContext(AuthContext);
    return (
        <> 
            <Container>
                <Content>
                    <div>
                        <h1>IBM .bank</h1>
                    </div>
                    <div>
                        <h3>{client.name} - {client.numberAccount}</h3>
                    </div>
                    <div>
                        <Button 
                            tooltipPosition={"bottom"} 
                            hasIconOnly 
                            renderIcon={Logout32} 
                            iconDescription={"Logout"} 
                            onClick={() => handleLogout()}
                        />
                    </div>
                </Content>
            </Container>
        </>
    );
}   