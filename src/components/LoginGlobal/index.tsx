import { Container, Content } from "./styles";
import { CreateClient } from "./CreateClient";
import { Login } from "./Login";

import { Tile, Tabs, Tab } from 'carbon-components-react';

export function LoginGlobal() {
    return (
        <Container>
            <Content>
                <Tile>
                    <Tabs type="container">
                        <Tab id="tab-login" label="Login">
                            <Login />
                        </Tab>
                        <Tab id="tab-create-client" label="Novo usuário">
                            <CreateClient />
                        </Tab>
                    </Tabs>
                </Tile>
            </Content>
        </Container>
    );
}   