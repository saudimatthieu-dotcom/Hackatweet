import styles from '../styles/Login.module.css';
import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

function Login() {
  const [modal, setModal] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img src="/logo.png" alt="Hackatweet logo" className={styles.bigLogo} />
      </div>
      <div className={styles.rightSection}>
        <img src="/logo.png" alt="Hackatweet logo" className={styles.smallLogo} />
        <h1 className={styles.title}>See what's happening</h1>
        <h2 className={styles.subtitle}>Join Hackatweet today.</h2>
        <button onClick={() => setModal('signup')} className={styles.signupButton}>Sign up</button>
        <p className={styles.question}>Already have an account?</p>
        <button onClick={() => setModal('signin')} className={styles.signinButton}>Sign in</button>
      </div>
      {modal === 'signup' && <SignUp handleClose={() => setModal(null)} />}
      {modal === 'signin' && <SignIn handleClose={() => setModal(null)} />}
    </div>
  );
}

export default Login;
