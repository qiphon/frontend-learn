import React, { Component } from 'react'
import { ListView, PullToRefresh } from 'antd-mobile'


function genData({ pIndex= 0, data=[] }) {
    const dataArr = [];
    if(!data || !data.length) return dataArr
    const NUM_ROWS = data.length; 
    console.log(pIndex, NUM_ROWS, pIndex * NUM_ROWS)
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
}

const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});
/**
 *   list 数据说明
 *       @params      data    需要渲染的数据
 *       @params    number      pIndex  分页数（当前是第几页）
 *       @params    node        RowNode     要展示的每一行的数据
 *       @params    boolean     isLoading   是否展示loading
 *       @params    boolean     refreshing  是否处于刷新中
 *       @params    function    onClickRow  整行的点击
 *       @params    function    onClickTitle  title的点击事件
 *       @params    function    onEndReached(ev)  到底的事件
 *       @params    function    onRefresh(ev)     下来刷新事件
 */
class List extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    componentWillMount() {
        let { data } = this.props
    }
    render() {
        const { RowNode ,data, isLoading, refreshing, onRefresh, onEndReached  } = this.props
        let dataLen = data.length;
        let index = 0;
        const dataSources= dataSource.cloneWithRows(genData({data}))
        const row = (rowData, sectionID, rowID) => {
            console.log(rowData, 'sectionID', sectionID, 'rowID', rowID)
            if (index >= dataLen) {
                index = 0;
            }
            const obj = data[index++];
            return RowNode(obj)
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={dataSources}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    { isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={row}
                style={this.state.useBodyScroll ? {} : {
                    height: '100%',
                }}
                pullToRefresh={onRefresh && <PullToRefresh
                    refreshing={ refreshing}
                    onRefresh={ ev=>onRefresh && onRefresh(ev) }
                />}
                onEndReached={ ev=> onEndReached && onEndReached() }
                onEndReachedThreshold={1000}
            />
        )
    }
}
export default List