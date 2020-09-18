import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import './App.scss'
import Header from './components/layout/Header'
import HomePage from './pages/Home'
import ActorProfile from './pages/ActorProfile'

function App() {
  return (
    <div className="App">
      <div className="page-wrapper">
        <Header />
        <Switch>
          <Route exact path="/:username" component={ActorProfile} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter<any, any>(App)
