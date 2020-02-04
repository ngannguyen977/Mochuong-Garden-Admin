import React from 'react'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import DetailPage from './detail'
import ThingPage from './things'
import LogPage from './log'
import NotificationPage from './notification'
import { Input, Button, Tabs, Icon } from 'antd'


const Search = Input.Search;
const TabPane = Tabs.TabPane;

@connect(
    mapStateToProps,
    mapDispathToProps,
)
export class DetailTabPage extends React.Component {
    componentDidMount() {
        const { getOne,match } = this.props
        getOne(match.params.cn)
    }
    render() {

        return (
            <div className='user-detail'>
                <Tabs defaultActiveKey='0' >
                    <TabPane tab={<span><Icon type='info-circle' />Notification</span>} key='0'>
                        <NotificationPage location={this.props.location} match={this.props.match} history={this.props.history} />
                    </TabPane>
                    <TabPane tab={<span><Icon type='info-circle' />Devices</span>} key='1'>
                        <ThingPage location={this.props.location} match={this.props.match} history={this.props.history} />
                    </TabPane>
                    <TabPane tab={<span><Icon type='info-circle' />Information</span>} key='2'>
                        <DetailPage location={this.props.location} match={this.props.match} history={this.props.history} />
                    </TabPane>
                    <TabPane tab={<span><Icon type='info-circle' />Activity Log</span>} key='3'>
                        <LogPage location={this.props.location} match={this.props.match} history={this.props.history} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default DetailTabPage