import styles from '../styles/Trends.module.css';

function Trends(props) {
  const counts = {};
  props.tweets.forEach((tweet) => {
    const hashtags = tweet.message
      .split(' ')
      .filter((word) => word.startsWith('#') && word.length > 1)
      .map((word) => word.toLowerCase());
    hashtags.filter((tag, i) => hashtags.indexOf(tag) === i).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  const trends = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count], i) => (
      <div key={i} className={styles.trend}>
        <span className={styles.hashtag}>{tag}</span>
        <span className={styles.count}>{count} Tweet{count > 1 ? 's' : ''}</span>
      </div>
    ));

  return <div>{trends}</div>;
}

export default Trends;
