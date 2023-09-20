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
                number:1,size:50,
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
    changeSearch(searchValue){
        this.setState({searchValue});
        clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>{
            this.fetchData({searchValue})
        },1000)
    }
    async fetchData(obj = {}){
        let {paging} = this.state;
        let {searchValue = this.state.searchValue} = obj;
        let {apis} = this.context;
        let {tarikhche,total} = await apis({type:'tarikhche',parameter:{pageNumber:paging.number,pageSize:paging.size,searchValue}})
        this.setState({tarikhche,total,searchValue})
    }
    async ersale_mojadad(checks){
        let {apis,setConfirm} = this.context;
        let res = await apis({type:'ersale_mojadad',parameter:checks})
        if(res === true){setConfirm({type:'success',text:'ارسال مجدد با موفقیت انجام شد'})}
        else if(typeof res === 'string'){setConfirm({type:'error',text:res})}
    }
    toolbar_layout(){
        let {checks, searchValue} = this.state;
        let checkeds = Object.keys(checks).filter((o)=>checks[o]);
        return {
            className:'padding-0-12',
            size:36,
            row:[
                {flex:1,html:<input type='text' value={searchValue} onChange={(e)=>this.changeSearch(e.target.value)}/>,align:'v'},
                {align:'v',html:<button onClick={()=>this.ersale_mojadad(checks)} disabled={checkeds.length === 0} className='button-2'>ارسال مجدد</button>}
            ]
        }
    }
    table_layout(){
        let {tarikhche,checks,total,paging} = this.state;
        this.order = 0;
        // if(!tarikhche.length){return false}
        return {
            flex:1,
            html:(
                <AIOInput
                    type='table' rtl={true} lang='farsi'
                    style={{flex:1,height:'100%'}}
                    rows={tarikhche}
                    onChange={(tarikhche)=>this.setState({tarikhche})}
                    paging={{...paging,length:total}}
                    getValue={{
                        order:()=>{
                            this.order++;
                            return this.order;
                        },
                        options:()=>{
                            return (<button><Icon path={mdiDotsHorizontal} size={0.9}/></button>)
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
                            let {hour,day} = AIODate().getDelta({date: row.date});
                            if(day){return `${day} روز و ${hour} ساعت قبل`}
                            return `${hour} ساعت قبل`
                        }},
                        {title:'تعداد دفعات ارسال مجدد',field:'row.dafaate_ersal',justify:true}
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