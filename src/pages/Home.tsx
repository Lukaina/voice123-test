import { Card } from 'antd'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAppStateContext } from '../context/AppStateContext'

const HomePage = () => {
  const history = useHistory()
  const { actors } = useAppStateContext()

  const handleClick = (username: string) => {
    const actor = actors.find((a: any) => a.user.username === username)
    localStorage.setItem('actor', JSON.stringify(actor))
    const win = window.open('/' + username, '_blank')
    win && win.focus()
  }

  return (
    <div className="container">
      {actors.length > 0 &&
        actors.map((item: any, index: number) => (
          <Card key={index} title={item.id} style={{ width: '100%' }}>
            <p>
              {/* <Link to={'/' + item.user.username} target="_blank">
                {item.user.name}
              </Link> */}
              <button
                type="button"
                onClick={() => handleClick(item.user.username)}
              >
                {item.user.name}
              </button>
            </p>
          </Card>
        ))}
    </div>
  )
}

export default HomePage
