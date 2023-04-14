import { useContext, useState } from "react";

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = cb => {
    return fakeAuth.signIn(() => {
            // Временные данные, которые будут доступны приложению
      setUser({ id: 1337, name: 'David' });
      cb();
    });
  };

  const signOut = cb => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signIn,
    signOut
  };
} 

export function useAuth() {
  return useContext(AuthContext);
} 