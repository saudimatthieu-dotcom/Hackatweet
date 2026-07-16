import styles from '../styles/Modal.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../reducers/user';

function SignUp(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signUpFirstname, setSignUpFirstname] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleRegister = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ firstname: signUpFirstname, username: signUpUsername, token: data.token }));
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
        <h2 className={styles.title}>Create your Hackatweet account</h2>
        <input type="text" placeholder="Firstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
        <input type="text" placeholder="Username" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
        <input type="password" placeholder="Password" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
        <button className={styles.submitButton} onClick={() => handleRegister()}>Sign up</button>
      </div>
    </div>
  );
}

export default SignUp;
