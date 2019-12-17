import React, { useEffect, useState } from 'react'
import { Card, Segment } from 'semantic-ui-react'
import { axiosWithAuth } from '../axiosWithAuth'

function Jokes() {

  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axiosWithAuth().get('http://localhost:3300/api/jokes')
      .then(res => setJokes(res.data))
      .catch(err => console.log(`Jokes: GET: err=`, err))
  }, [])
  
    if (!jokes.length)
      return <div>Loading ... </div>

  const jokesList = jokes.map(joke => {

    return (
      <Card
        key={joke.id}
        header={joke.joke}
      />
    )
  })
  
  return (
    <Segment>
      <h1>Here's some jokes</h1>
      <Card.Group itemsPerRow={2}>
        {jokesList}
      </Card.Group>
    </Segment>
  )
}

export default Jokes