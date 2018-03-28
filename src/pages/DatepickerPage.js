// @flow
import React from 'react'
import Page from 'components/Pages/Page'
import Helmet from 'react-helmet'
import DatepickerPageItems from 'components/AntComponents/DatepickerPage/index'

class DatepickerPage extends React.Component {
  static defaultProps = {
    pathName: 'Date picker',
  }

  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Clean UI - Date picker" />
        <DatepickerPageItems />
      </Page>
    )
  }
}

export default DatepickerPage
