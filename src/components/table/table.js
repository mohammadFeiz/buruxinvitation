import React,{Component} from 'react';
import Table from './../../npm/aio-table/aio-table';
export default class TableInterface extends Component{
    render(){
        return (
            <Table 
                rowHeight={36}
                rowGap={6}
                columnGap={0}
                headerHeight={40}
                rtl={true}
                striped={true}
                {...this.props}
            />
        )
    }
}