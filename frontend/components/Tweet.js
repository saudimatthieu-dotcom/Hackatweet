import styles from '../styles/Tweet.module.css';

function Tweet(props) {
  return (
    <div className={styles.tweetCard}>
      <div className={styles.tweetHeader}>
        <span className={styles.name}>{props.username}</span>
        <span className={styles.handle}>@{props.username} · {new Date(props.date).toLocaleString()}</span>
      </div>
      <p className={styles.content}>{props.message}</p>
      <div className={styles.tweetFooter}>
        <span className={styles.like}>♥</span>
        <span className={styles.likeCount}>{props.likes.length}</span>
      </div>
    </div>
  );
}

export default Tweet;
