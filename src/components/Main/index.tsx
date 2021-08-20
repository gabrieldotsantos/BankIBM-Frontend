import { useContext, useEffect } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { LoginGlobal, Dashboard } from '../index';

export function Main() {
  const { authenticated, client, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    if (client.id === 0 && authenticated === true)
      handleLogout();
  });

  return (
    <>
        {authenticated ? <Dashboard /> :  <LoginGlobal />}
    </>
  );
}