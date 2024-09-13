import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function Ls() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
       
      }));
    } else {
     
      localStorage.removeItem('user');
    }
  });
}
