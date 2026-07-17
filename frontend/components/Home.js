import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../reducers/user';
import LastTweets from './LastTweets';
import Trends from './Trends';

function Home() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [tweet, setTweet] = useState('');
  const dispatch = useDispatch();
  const [tweets, setTweets] = useState([]);
  

  const loadTweets = () => {
    fetch('http://localhost:3000/tweets')
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
  };

  useEffect(() => {
    if (!user.token) {
      router.push('/');
      return;
    }
    loadTweets();
  }, []);


  const handleChange = (e) => {
    if (e.target.value.length <= 280) {
      setTweet(e.target.value);
    }
  };

  const handleTweet = () => {
    if (tweet.trim() === '') {
      return;
    }

    fetch('http://localhost:3000/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, message: tweet, username: user.username }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          setTweet('');
          loadTweets();
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };
  
  
  return (
    <div className={styles.container}>

      <div className={styles.leftSection}>
        <img
          src="/logo.png"
          alt="logo"
          className={styles.logo}
          onClick={() => router.push('/home')}
        />
        <div className={styles.userSection}>
          <p className={styles.firstname}>{user.firstname}</p>
          <p className={styles.username}>@{user.username}</p>
          <button className={styles.logoutButton} onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>

      <div className={styles.middleSection}>
        <h2>Home</h2>
        <div className={styles.whatsUp}>
          <textarea
            placeholder="What's up?"
            value={tweet}
            onChange={(e) => handleChange(e)}
          />
          <div className={styles.tweetBar}>
            <span className={styles.counter}>{tweet.length}/280</span>
            <button className={styles.tweetButton} onClick={() => handleTweet()}>Tweet</button>
          </div>
        </div>
        <LastTweets tweets={tweets} refreshTweets={loadTweets} />
      </div>

      <div className={styles.rightSection}>
        <h2>Trends</h2>
        <Trends tweets={tweets} />
      </div>

    </div>
  );
}

export default Home;


