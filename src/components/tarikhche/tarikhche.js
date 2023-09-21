import React,{Component} from 'react';
import RVD from 'react-virtual-dom';
import AIOInput from './../../npm/aio-input/aio-input';
import {Icon} from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import AppContext from '../../app-context';
import AIODate from './../../npm/aio-date/aio-date';
export default class Tarikhche extends Component{
    static contextType = AppContext;
    constructor(props){
        super(props);
        this.state = {
            tarikhche:[],
            checks:{},
            total:0,
            paging:{
                number:1,size:50,sizes:[50,100,200],
                serverSide:true,
                length:0,
                onChange:({number,size})=>{
                    let {paging} = this.state;
                    this.setState({paging:{...paging,size,number}},()=>this.fetchData())
                }
            }
        }
    }
    async componentDidMount(){
        this.fetchData();
    }
    async fetchData(obj = {}){
        let {paging} = this.state;
        let {searchValue = this.state.searchValue} = obj;
        let {apis} = this.context;
        let {tarikhche,total} = await apis({api:'tarikhche',parameter:{pageNumber:paging.number,pageSize:paging.size,searchValue}})
        this.setState({tarikhche,total,searchValue})
    }
    async ersale_mojadad(checks){
        let {apis,setConfirm} = this.context;
        let res = await apis({api:'ersale_mojadad',parameter:checks})
        if(res === true){setConfirm({type:'success',text:'ارسال مجدد با موفقیت انجام شد'})}
        else if(typeof res === 'string'){setConfirm({type:'error',text:res})}
    }
    table_layout(){
        let {tarikhche,checks,total,paging} = this.state;
        this.order = 0;
        // if(!tarikhche.length){return false}
        return {
            flex:1,className:'p-12',
            html:(
                <AIOInput
                    type='table' rtl={true} lang='farsi'
                    attrs={{style:{flex:1,height:'100%'}}}
                    rows={tarikhche}
                    onChange={(tarikhche)=>this.setState({tarikhche})}
                    paging={{...paging,length:total}}
                    onSearch={(searchValue)=>this.fetchData({searchValue})}
                    columnGap={0}
                    rowGap={0}
                    rowAttrs={()=>{return {style:{borderBottom:'6px solid #ddd'}}}}
                    toolbar={()=>{
                        let {checks} = this.state;
                        let checkeds = Object.keys(checks).filter((o)=>checks[o]);
                        return <button onClick={()=>this.ersale_mojadad(checks)} disabled={checkeds.length === 0} className='button-2'>ارسال مجدد</button>
                    }}
                    getValue={{
                        order:({rowIndex})=>{
                            let {paging} = this.state;
                            let beforeRows = paging.size * (paging.number - 1)
                            return beforeRows + rowIndex + 1;
                        },
                        options:()=>{
                            return (<button><Icon path={mdiDotsHorizontal} size={0.9}/></button>)
                        },
                        checkbox:({row})=>{
                            let disabled = row.status !== '3' && row.status !== '4';
                            return <input disabled={disabled} type='checkbox' checked={!!checks[row.id]} onChange={(e)=>this.setState({checks:{...checks,[row.id]:e.target.checked}})}/>
                        },
                        status:({row})=>{
                            let {statuses} = this.context;
                            let {text,color} = statuses.find((o)=>o.value === row.status);
                            return (
                                <div style={{color,background:color + '30',padding:'0 6px',borderRadius:4,fontSize:10}}>{text}</div>
                            ) 
                        },
                        date:({row})=>{
                            let date = AIODate().toJalali({date:row.date,pattern:'{year}/{month}/{day} {hour}:{minute}'})
                            let {day,hour} = AIODate().getDelta({date: row.date});
                            let dateOffset;
                            if(day){dateOffset = `${day} روز و ${hour} ساعت قبل`}
                            else {dateOffset = `${hour} ساعت قبل`} 
                            return (
                                <RVD
                                    layout={{
                                        align:'vh',
                                        column:[
                                            {size:6},
                                            {html:date,size:14,className:'fs-10 bold'},
                                            {html:dateOffset,size:14,className:'fs-9',style:{opacity:0.6}},
                                            {size:6}
                                        ]
                                    }}
                                />
                            )
                        }
                    }}
                    columns={[
                        {title:'ردیف',template:'order',justify:true,width:40},
                        {title:'',template:'checkbox',justify:true,width:40},
                        {title:'نام دعوتنامه',value:'row.name_davatname',justify:true,minWidth:200,resizable:true},
                        {title:'مدعو',value:'row.davat_shode',titleJustify:false,search:true,subtext:'row.shomare_tamase_davat_shode',width:144},
                        {title:'دعوت کننده',value:'row.davat_konande',titleJustify:false,search:true,width:144},
                        {title:'وضعیت',value:'row.status',template:'status',width:96,justify:true},
                        {title:'زمان دعوت',value:'row.date',template:'date',justify:true,width:110,resizable:true,subtext:'dateOffset'},
                        {title:'دفعات ارسال مجدد',value:'row.dafaate_ersal',width:120,template:'row.dafaate_ersal',justify:true}
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
                        this.table_layout()
                    ]
                }}
            />
        )
    }
}