import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import CreatePage from './create'

class UserCreate extends React.Component {
  static defaultProps = {
    pathName: 'Users Create',
    roles: ['agent', 'administrator'],
  }
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Users" />
        <CreatePage location={props.location} />
      </Page>
    )
  }
}

export default UserCreate