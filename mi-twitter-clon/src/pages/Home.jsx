import { useState } from 'react'
import TweetForm from '../components/TweetForm'
import TweetList from '../components/TweetList'

const Home = ({ user, logout }) => {
  const [tweets, setTweets] = useState([])

  const handleAddTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      text,
      likes: 0,
    }
    setTweets([newTweet, ...tweets])
  }

  const handleLike = (id) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    )
  }

  return (
    <div>
      <h1>Bienvenido a Twitter</h1>
      {user && (
        <div>
          <p>Hola, {user.username}!</p>
          <button onClick={logout}>Cerrar sesión</button>

          <TweetForm onAddTweet={handleAddTweet} />
          <TweetList tweets={tweets} onLike={handleLike} />
        </div>
      )}
    </div>
  )
}

export default Home
