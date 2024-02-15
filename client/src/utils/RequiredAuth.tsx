import { ReactNode, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../components/Loader/Loader';

type RequiredAuthProps = {
  children: ReactNode
}

function RequiredAuth({ children }: RequiredAuthProps) {
  const { isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }
    (async () => {
      await loginWithPopup();
    })();
  }, [isLoading, isAuthenticated, loginWithPopup]);


  return (
    !isAuthenticated ?
      <div className='mt-16'><Loader /></div> :
      <>{children}</>
  )
}

export default RequiredAuth
