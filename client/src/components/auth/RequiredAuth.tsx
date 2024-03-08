import { ReactNode, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../common/Loader/Loader';

type RequiredAuthProps = {
  children: ReactNode
}

function RequiredAuth({ children }: RequiredAuthProps) {
  const { isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  // To fire only once
  const [safeguard, setSafeguard] = useState(isAuthenticated);
  useEffect(() => {
    if (isLoading || isAuthenticated || safeguard) {
      return;
    }
    (async () => {
      setSafeguard(true);
      await loginWithPopup();
    })();
  }, [isLoading, isAuthenticated, loginWithPopup, safeguard, setSafeguard]);


  return (
    !isAuthenticated ?
      <div className='mt-16'><Loader /></div> :
      <>{children}</>
  )
}

export default RequiredAuth
