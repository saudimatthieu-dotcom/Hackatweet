import Tweet from './Tweet';

function LastTweets(props) {
  const tweets = props.tweets.map((data, i) => (
    <Tweet key={i} username={data.username} message={data.message} date={data.date} likes={data.likes} />
  ));

  return <div>{tweets}</div>;
}

export default LastTweets;
