import React, { useState } from 'react'
import logo_brand from './../../logo.png'
import { Link } from 'react-router-dom'
import { Button, Input, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useAppStateContext } from '../../context/AppStateContext'

const Header = () => {
  const { dispatch, loadActors } = useAppStateContext()

  const [mobileNav, setMobileNav] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const formSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    setLoading(true)

    loadActors(state)

    setLoading(false)
  }

  return (
    <>
      <svg
        className={'ham ham4 hamRotate' + (mobileNav ? ' active' : '')}
        viewBox="0 0 100 100"
        width="50"
        onClick={() => setMobileNav(!mobileNav)}
      >
        <path
          className="line top"
          d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
        />
        <path className="line middle" d="m 70,50 h -40" />
        <path
          className="line bottom"
          d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
        />
      </svg>
      <div className="nav-wrapper">
        <nav className="navbar">
          <div className="brand">
            <img src={logo_brand} alt="Brand" />
          </div>
          <div
            className={(mobileNav ? 'is-active ' : '') + 'menu-toggle'}
            onClick={() => setMobileNav(!mobileNav)}
            id="mobile-menu"
          ></div>
          <div className="search-bar">
            <form onSubmit={formSubmit}>
              <Input
                placeholder="Search..."
                className="input-search"
                name="search"
                onChange={handleChange}
              />
              <Tooltip title="search">
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="circle"
                  loading={loading}
                  icon={<SearchOutlined />}
                />
              </Tooltip>
            </form>
          </div>
          <ul className={'nav no-search ' + (mobileNav ? 'mobile-nav' : '')}>
            <li className="nav-item">
              <Link to="#">Home</Link>
            </li>

            <i className="fas fa-search" id="search-icon"></i>
            <input
              className="search-input"
              type="text"
              placeholder="Search.."
            />
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header
