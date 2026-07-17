import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useSelector} from 'react-redux';


function Tweet(props) {
    const user = useSelector((state) => state.user.value);
    const isLiked = props.likes.includes(user.username)
  return (
    <div className={styles.tweetCard}>
      <div className={styles.tweetHeader}>
        <span className={styles.name}>{props.username}</span>
        <span className={styles.handle}>@{props.username} · {moment(props.date).fromNow()}</span>
      </div>
      <p className={styles.content}>{props.message}</p>
      <div className={styles.tweetFooter}>
        <FontAwesomeIcon icon={faHeart} style={{ color: isLiked ? 'red' : '#71767B' }} />
        {props.username === user.username && <FontAwesomeIcon icon={faTrashCan} style={{ color: '#71767B' }} />}

        <span className={styles.likeCount}>{props.likes.length}</span>
      </div>
    </div>
  );
}

export default Tweet;
