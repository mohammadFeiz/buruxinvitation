import React,{Component} from 'react';
import RVD from 'react-virtual-dom';
import Table from './../table/table';
import AIOButton from 'aio-button';
import {Icon} from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import AppContext from '../../app-context';
import AIODate from 'aio-date';
export default class Tarikhche extends Component{
    static contextType = AppContext;
    constructor(props){
        super(props);
        this.state = {
            tarikhche:[],
            checks:{}
        }
    }
    async componentDidMount(){
        let {apis} = this.context;
        let tarikhche = await apis({type:'tarikhche'})
        this.setState({tarikhche})
    }
    toolbar_layout(){
        return {
            className:'padding-0-12',
            size:36,
            row:[
                {flex:1},
                {align:'v',html:<button className='button-2'>ارسال مجدد</button>}
            ]
        }
    }
    table_layout(){
        let {tarikhche,checks} = this.state;
        this.order = 0;
        return {
            flex:1,
            html:(
                <Table
                    model={tarikhche}
                    setModel={(tarikhche)=>this.setState({tarikhche})}
                    templates={{
                        order:()=>{
                            this.order++;
                            return this.order;
                        },
                        options:()=>{
                            return (
                                <AIOButton
                                    type='button'
                                    text={<Icon path={mdiDotsHorizontal} size={0.9}/>}
                                />
                            )
                        },
                        checkbox:(row)=>{
                            let disabled = row.status !== '3' && row.status !== '4';
                            return <input disabled={disabled} type='checkbox' checked={!!checks[row.id]} onChange={(e)=>this.setState({checks:{...checks,[row.id]:e.target.checked}})}/>
                        },
                        status:(row)=>{
                            let {statuses} = this.context;
                            let {text,color} = statuses[row.status];
                            return (
                                <div style={{color,background:color + '30',padding:'0 6px',borderRadius:4}}>{text}</div>
                            ) 
                        }
                    }}
                    columns={[
                        {title:'',template:'checkbox',justify:true,width:40},
                        {title:'ردیف',template:'order',justify:true,width:60},
                        {title:'مدعو',field:'row.davat_shode',titleJustify:false,search:true},
                        {title:'شماره تماس مدعو',field:'row.shomare_tamase_davat_shode',titleJustify:false},
                        {title:'دعوت کننده',field:'row.davat_konande',titleJustify:false,search:true},
                        {title:'نام دعوتنامه',field:'row.name_davatname',justify:true,width:120,resizable:true,sort:true},
                        {title:'وضعیت',field:'row.status',template:'status',sort:true},
                        {title:'زمان دعوت',field:'row.zamane_davat',justify:true,width:140,resizable:true,subtext:(row)=>{
                            let {hours,days} = AIODate().getPassedTime(row.date);
                            if(days){return `${days} روز و ${hours} ساعت قبل`}
                            return `${hours} ساعت قبل`
                        }},
                        {title:'جزییات',template:'options',width:70,justify:true},
                    ]}
                />
            )
        }
    }
    render(){
        return (
            <RVD
                layout={{
                    column:[
                        this.toolbar_layout(),
                        this.table_layout()
                    ]
                }}
            />
        )
    }
}