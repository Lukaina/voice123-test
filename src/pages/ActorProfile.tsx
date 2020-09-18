import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import logo from './../logo.png'

type TParams = { username: string }

type User = {
  name: string
  picture_medium: string
  picture_small: string
  username: string
}

type Actor = {
  user?: User
}

const ActorProfile = ({ match }: RouteComponentProps<TParams>) => {
  const username = match.params.username
  const [stateActor, setStateActor] = useState<Actor>({})

  const [player, setPlayer] = useState<boolean>(false)

  useEffect(() => {
    const getItem = localStorage.getItem('actor')
    if (getItem) {
      const actor = JSON.parse(getItem)
      console.log(actor)
      setStateActor(actor)
    }
  }, [])

  return (
    <Card title={username} style={{ width: 600 }}>
      <div className="wrapper-image">
        {stateActor &&
          stateActor.user &&
          (stateActor.user.picture_medium ? (
            <img src={stateActor.user.picture_medium} />
          ) : (
            <img src="https://via.placeholder.com/300" width="300" />
          ))}
      </div>

      <audio controls style={{ width: '100%' }} />
    </Card>
  )
}

export default ActorProfile
