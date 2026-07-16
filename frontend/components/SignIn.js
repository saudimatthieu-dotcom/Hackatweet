import styles from '../styles/Modal.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/user';

function SignIn(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const handleConnection = () => {
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: signInUsername, password: signInPassword }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ firstname: data.firstname, username: signInUsername, token: data.token }));
          props.handleClose();
          router.push('/home');
        }
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => props.handleClose()}>✕</button>
        <img src="/logo.png" alt="Hackatweet logo" className={styles.logo} />
        <h2 className={styles.title}>Connect to Hackatweet</h2>
        <input type="text" placeholder="Username" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
        <input type="password" placeholder="Password" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
        <button className={styles.submitButton} onClick={() => handleConnection()}>Sign in</button>
      </div>
    </div>
  );
}

export default SignIn;
