import Tweet from './Tweet';

function LastTweets(props) {
  const tweets = props.tweets.map((data, i) => (
    <Tweet key={i}
      _id={data._id}
      username={data.username}
      message={data.message}
      date={data.date}
      likes={data.likes}
      refreshTweets={props.refreshTweets} />
  ));

  return <div>{tweets}</div>;
}

export default LastTweets;
