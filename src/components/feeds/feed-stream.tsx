import { gql, useQuery } from '@apollo/client';
import { Feed } from './feed-stream-embedded';

const QUERY = gql`
  query feedStream {
    feedStream @stream(initialCount: 1) {
      id
      title
      description
    }
  }
`;

interface QueryResult {
  feedStream: Feed[];
}

const FeedStream = () => {
  const { data, loading, error } = useQuery<QueryResult>(QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div>
      <h3>Feeds Stream (6 items in total)</h3>
      <ol>
        {data?.feedStream.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ol>
    </div>
  );
};

export default FeedStream;
