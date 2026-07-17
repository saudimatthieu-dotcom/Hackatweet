import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useSelector } from 'react-redux';


function Tweet(props) {
    const user = useSelector((state) => state.user.value);
    const isLiked = props.likes.includes(user.username)

    const handleLike = () => {
      fetch('http://localhost:3000/tweets/like', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: props._id, username: user.username }),
      }).then(response => response.json())
        .then(data => {
          if (data.result) {
            props.refreshTweets();
          }
        });
    };

    const handleDelete = () => {
      fetch('http://localhost:3000/tweets/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: props._id, token: user.token }),
      }).then(response => response.json())
        .then(data => {
          if (data.result) {
            props.refreshTweets();
          }
        });
    };

  return (
    <div className={styles.tweetCard}>
      <div className={styles.tweetHeader}>
        <span className={styles.name}>{props.username}</span>
        <span className={styles.handle}>@{props.username} · {moment(props.date).fromNow()}</span>
      </div>
      <p className={styles.content}>{props.message}</p>
      <div className={styles.tweetFooter}>
        <FontAwesomeIcon icon={faHeart} onClick={() => handleLike()} style={{ color: isLiked ? 'red' : '#71767B', cursor: 'pointer' }} />
        {props.username === user.username && <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete()} style={{ color: '#71767B', cursor: 'pointer' }} />}

        <span className={styles.likeCount}>{props.likes.length}</span>
      </div>
    </div>
  );
}

export default Tweet;
