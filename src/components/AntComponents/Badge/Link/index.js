import React from 'react'
import './style.scss'
import { Badge } from 'antd'

export default function(ReactDOM, mountNode) {
  ReactDOM.render(
    <a href='#;'>
      <Badge count={5}>
        <span className='head-example' />
      </Badge>
    </a>,
    mountNode,
  )
}
