import React, { Component } from 'react';
import RVD from './../../npm/react-virtual-dom/react-virtual-dom';
import {Icon} from '@mdi/react';
import { mdiToggleSwitch,mdiToggleSwitchOffOutline,mdiDotsHorizontal,mdiChevronLeft, mdiChevronDoubleDown,mdiFileExcel,mdiFile,mdiAccountCircleOutline, mdiDelete} from '@mdi/js';
import GradientCard from '../gradient-card/gradient-card';
import AIODate from './../../npm/aio-date/aio-date';
import AIOInput from './../../npm/aio-input/aio-input';
import AIOMap from './../../npm/aio-map/aio-map';
import AppContext from '../../app-context';
export default class MizeKar extends Component {
    static contextType = AppContext;
    constructor(props){
        super(props);
        this.state = {niaz_be_taide_man:[],checks:{},mode:false,davatname_ha:[],davatname_ha_total:0,pageNumber:1,pageSize:20}
    }
    async niaz_be_taide_man(){
        let {apis} = this.context;
        let niaz_be_taide_man = await apis({api:'niaz_be_taide_man',def:[]});
        this.setState({niaz_be_taide_man})
    }
    async davatname_ha(obj = {}){
        let {pageNumber = this.state.pageNumber,pageSize = this.state.pageSize} = obj;
        let {apis} = this.context;
        let {davatname_ha,total} = await apis({api:'davatname_ha',parameter:{pageNumber,pageSize}});
        this.setState({davatname_ha,davatname_ha_total:total,pageNumber,pageSize})
    }
    async getBadges(){
        let {apis} = this.context;
        let badges = await apis({api:'badges'});
        this.setState({badges})
    }
    componentDidMount(){
        this.niaz_be_taide_man();
        this.davatname_ha();
        this.getBadges();
    }
    header_layout() {
        let {badges = {}} = this.state;
        let details = [
            [['پیش نویس',badges.pishnevis]],
            [['تعداد',badges.tedad]],
            [['دعوتنامه های فعال',badges.faal]]
        ]
        return {
            column:[
                {
                    hide_xs:true,gap:24,
                    row:[
                        {flex:1},
                        {html:<GradientCard type={'1'} onClick={(mode)=>this.setState({mode})} details={details[0]}/>},
                        {html:<GradientCard type={'2'} onClick={async (mode)=>{
                            await this.davatname_ha()
                            this.setState({mode})
                        }} details={details[1]}/>},
                        {html:<GradientCard type={'3'} onClick={(mode)=>this.setState({mode})} details={details[2]}/>},
                        {flex:1}
                    ]
                },
                {
                    show_xs:true,gap:24,align:'h',className:'p-h-24',
                    column:[
                        {html:<GradientCard type={'1'} mode='xs' onClick={(mode)=>this.setState({mode})} details={details[0]}/>,style:{width:'100%'}},
                        {html:<GradientCard type={'2'} mode='xs' onClick={async (mode)=>{
                            await this.davatname_ha()
                            this.setState({mode})
                        }} details={details[1]}/>,style:{width:'100%'}},
                        {html:<GradientCard type={'3'} mode='xs' onClick={(mode)=>this.setState({mode})} details={details[2]}/>,style:{width:'100%'}},
                    ]
                }
            ]
        }
    }
    async approve(state){
        let {apis,setConfirm} = this.context;
        let {niaz_be_taide_man,checks} = this.state;
        let selected = niaz_be_taide_man.filter((o)=>checks[o.id])
        if(!selected.length){
            setConfirm({type:'warning',text:'هیچ موردی از جدول انتخاب نشده است'})
            return;
        }
        let res = await apis({api:'taid',parameter:{state,selected}})
        if(typeof res === 'string'){setConfirm({type:'error',text:`${state?'تایید':'عدم تایید'} با خطا روبرو شد`,subtext:res})}
        else{
            this.setState({niaz_be_taide_man:niaz_be_taide_man.filter((o)=>!checks[o.id])})
            setConfirm({type:'success',text:`${state?'تایید':'عدم تایید'} با موفقیت انجام شد`})
        }
    }
    table_layout(){
        let {niaz_be_taide_man,checks} = this.state;
        this.order = 0;

        return {
            flex:1,
            html:(
                <AIOInput
                    type='table'
                    rows={niaz_be_taide_man}
                    getValue={{
                        order:()=>{
                            this.order++;
                            return this.order;
                        },
                        options:()=>{
                            return (<button><Icon path={mdiDotsHorizontal} size={0.9}/></button>)
                        },
                        checkbox:(row)=>{
                            return <input type='checkbox' checked={!!checks[row.id]} onChange={(e)=>this.setState({checks:{...checks,[row.id]:e.target.checked}})}/>
                        }
                    }}
                    columns={[
                        {title:'',template:'checkbox',justify:true,width:40},
                        {title:'ردیف',template:'order',justify:true,width:60},
                        {title:'مدعو',field:'row.davat_shode',titleJustify:false},
                        {title:'دعوت کننده',field:'row.davat_konande',titleJustify:false},
                        {title:'زمان دعوت',field:'row.zamane_davat',justify:true},
                        {title:'جزییات',template:'options',width:70,justify:true},
                    ]}
                />
            )
        }
    }
    toolbar_layout(){
        let {niaz_be_taide_man,checks} = this.state;
        return {
            className:'padding-0-24 bgFFF',
            size:48,align:'v',gap:12,
            style:{borderRadius:'12px 12px 0 0'},
            row:[
                {html:'نیاز به تائید من',className:'color108ABE size16 bold'},
                {html:`(${niaz_be_taide_man.length} مورد)`,className:'size14'},
                {flex:1},
                {html:`${Object.keys(checks).filter((o)=>checks[o]).length} مورد انتخاب شده`,className:'size14'},
                {html:<button className='button-1' onClick={()=>this.approve(true)}>تایید</button>},
                {html:<button className='button-1' onClick={()=>this.approve(false)}>عدم تایید</button>},
                {html:<Icon path={mdiChevronDoubleDown} size={1}/>}
            ]
        }
    }
    onRemove(o){
        let {davatname_ha} = this.state;
        davatname_ha = davatname_ha.filter(({id})=>id !== o.id);
        this.setState({davatname_ha});
    }
    change_davatname_ha(id,obj){
        let {davatname_ha} = this.state;
        this.setState({davatname_ha: davatname_ha.map((o)=>{
            if (id===o.id){
                return obj 
            }
            else{
                return o
            }
        })})
    }
    render() {
        let {mode,davatname_ha,pageNumber,pageSize,davatname_ha_total} = this.state;
        let {addPopup} = this.context;
        if(mode === 'tarahi_davatname'){return <TarahiDavatname onClose={()=>this.setState({mode:false})} change_davatname_ha={this.change_davatname_ha.bind(this)}/>}
        if(mode === 'ersale_davatname'){return <ErsaleDavatname onClose={()=>this.setState({mode:false})} davatname_ha={davatname_ha}/>}
        if(mode === 'davatname_ha'){
            return (
                <DavatnameHa 
                    onClose={()=>this.setState({mode:false})} 
                    davatname_ha={davatname_ha}
                    total={davatname_ha_total}
                    onRemove={this.onRemove.bind(this)}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    onChangePaging={(obj)=>this.davatname_ha(obj)} 
                    change_davatname_ha={this.change_davatname_ha.bind(this)}
                />
            )
        }
        return (
            <RVD
                layout={{

                    column: [
                        {size:24},
                        this.header_layout(),
                        {size:24},
                        {
                            className:'p-12',
                            column:[
                                this.toolbar_layout(),
                                this.table_layout()
                            ]
                        }

                    ]
                }}
            />
        )
    }
}

class TarahiDavatname extends Component{
    static contextType = AppContext;
    constructor(props){
        super(props);
        this.state = {
            model:{...this.initModel()},
            karbarane_daraye_dastresi:[],
            showMap:false
        }
    }
    initModel(){
        let {model} = this.props;
        if(model){return JSON.parse(JSON.stringify(model))}
        return {
            name_davatname:'',
            lat:35.699739,
            long:51.338097,
            tarikhe_etebar:false,
            landing_page:'',
            matne_payamak:'',
            matne_davatname:'',
            poster:false,
            ersale_mostaghim:false,
            emkane_davat:false,
        }
    }
    async save(mode){
        let {apis,setConfirm} = this.context;
        let {onClose,change_davatname_ha} = this.props;
        let {model,karbarane_daraye_dastresi} = this.state;
        if(mode !== 'draft' && (!model.name_davatname || !model.tarikhe_etebar)){
            setConfirm({type:'error',text:'اطلاعات مورد نیاز را وارد کنید'})
            return;
        }
        let res = await apis({api:'zakhire_tarahi_davatname',parameter:{mode,model,karbarane_daraye_dastresi}})
        if(typeof res === 'string'){setConfirm({type:'error',text:'ذخیره دعوتنامه طراحی شده با خطا روبرو شد',subtext:res})}
        else{
            change_davatname_ha(model.id,model)
            setConfirm({type:'success',text:'ذخیره دعوتنامه طراحی شده با موفقیت انجام شد'})
            onClose()
        }
    }
    nav_layout(){
        let {onClose,model} = this.props;
        if(model){
            return {
                size:48,gap:6,className:'margin-0-24 bgFFF round8 padding-0-12',align:'v',
                row:[
                    {flex:1},
                    {html:'ذخیره',className:'color0094D4 size14 bold',attrs:{onClick:()=>this.save('save')}},
                    {html:'ذخیره پیشنویس',className:'color0094D4 size14 bold',attrs:{onClick:()=>this.save('draft')}},
                    {html:<div style={{width:1,height:20}} className='bg0094D4'></div>,align:'vh'},
                    {html:'خروج',className:'colorC92828 size14 bold',attrs:{onClick:()=>onClose()}},
                    
                ]
            }    
        }
        return {
            size:48,gap:6,className:'margin-0-24 bgFFF round8 padding-0-12',align:'v',
            row:[
                {html:'میز کار',className:'color8C9CA3 size18',align:'v',attrs:{onClick:()=>onClose()}},
                {html:<Icon path={mdiChevronLeft} size={0.8}/>,align:'v'},
                {html:'طراحی دعوتنامه',className:'size18 color108ABE bold',align:'v'},
                {flex:1},                
                {html:'ذخیره',className:'color0094D4 size14 bold',attrs:{onClick:()=>this.save('save')}},
                {html:<div style={{width:1,height:20}} className='bg0094D4'></div>,align:'vh'},
                {html:'ثبت پیشنویس',className:'color0094D4 size14 bold',attrs:{onClick:()=>this.save('draft')}},
                {html:<div style={{width:1,height:20}} className='bg0094D4'></div>,align:'vh'},
                {html:'پاک کردن فرم',className:'color0094D4 size14 bold',attrs:{onClick:()=>this.setState({model:this.initModel()})}},
                {html:<div style={{width:1,height:20}} className='bg0094D4'></div>,align:'vh'},
                {html:'خروج',className:'colorC92828 size14 bold',attrs:{onClick:()=>onClose()}},
                
            ]
        }
    }
    splitter_layout(text){
        return {
            size:48,gap:6,className:'margin-0-24',
            row:[
                {html:text,className:'size18 color108ABE bold',align:'v'},
                {flex:1,html:<div style={{width:'100%',height:1}} className='bg108ABE'></div>,align:'v'},                
            ]
        }
    }
    poster(){
        let {model} = this.state;
        return (
            <label style={{width:150,height:150,background:'#f1f2f3',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
                <input type='file' style={{display:'none'}} onChange={(e)=>{
                    model.poster = e.target.files[0];
                    this.setState({model})
                }}/>
                {
                    !model.poster &&
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.80556 6.20833C2.80556 4.16155 4.16155 2.80555 6.20833 2.80555H20.7917C22.8385 2.80555 24.1944 4.16155 24.1944 6.20833V20.7917C24.1944 22.8385 22.8385 24.1944 20.7917 24.1944H6.20833C4.16155 24.1944 2.80556 22.8385 2.80556 20.7917V6.20833ZM0.861111 6.20833V20.7917C0.861111 23.7851 3.21491 26.1389 6.20833 26.1389H20.7917C23.7851 26.1389 26.1389 23.7851 26.1389 20.7917V6.20833C26.1389 3.21491 23.7851 0.861111 20.7917 0.861111H6.20833C3.21491 0.861111 0.861111 3.21491 0.861111 6.20833ZM8.43421 10.8136C9.76462 10.8136 10.8392 9.73903 10.8392 8.35746C10.8392 7.02705 9.76462 5.95248 8.43421 5.95248C7.05263 5.95248 5.97807 7.02705 5.97807 8.35746C5.97807 9.73903 7.05263 10.8136 8.43421 10.8136ZM25.8575 18.6425L18.924 11.7091C18.3355 11.1206 17.4145 11.1206 16.826 11.7091L10.2507 18.2844C10.4298 18.1053 10.7368 18.1053 10.9159 18.2844L7.25731 14.6257C6.66886 14.0373 5.74781 14.0373 5.15936 14.6257L1.14254 18.6425C0.96345 18.8216 0.861111 19.0775 0.861111 19.3333C0.861111 19.8706 1.29605 20.3056 1.83333 20.3056C2.08918 20.3056 2.34503 20.2032 2.52412 20.0241L6.54094 16.0073C6.36184 16.1864 6.05482 16.1864 5.87573 16.0073L9.53436 19.6659C10.1228 20.2544 11.0439 20.2544 11.6323 19.6659L18.2076 13.0906C18.0285 13.2697 17.7215 13.2697 17.5424 13.0906L24.4759 20.0241C24.655 20.2032 24.9108 20.3056 25.1667 20.3056C25.7039 20.3056 26.1389 19.8706 26.1389 19.3333C26.1389 19.0775 26.0365 18.8216 25.8575 18.6425Z" fill="white"/>
                    </svg>
                }
                {
                    model.poster &&
                    <img src={typeof model.poster === 'string'?model.poster:URL.createObjectURL(model.poster)} alt='' style={{width:'100%',height:'100%'}}/>
                }
            </label>
        )
        
    }
    form_layout(){
        let {model} = this.state;
        let style1 = {height:100}
        let input_name = {input:{type:'text'},field:'value.name_davatname',label:'نام دعوتنامه :',validations:[['required']]};
        let input_tarikhe_etebar = {input:{type:'datepicker',calendarType:'jalali'},field:'value.tarikhe_etebar',label:'تاریخ اعتبار دعوتنامه :',validations:[['required']]}
        let input_matne_payamak = {input:{type:'textarea',style:style1},field:'value.matne_payamak',label:'متن پیامک :',validations:[['required']]};
        let input_matne_davatname = {input:{type:'textarea',style:style1},field:'value.matne_davatname',label:'متن دعوتنامه :',validations:[['required']]}
        let input_tarikhe_bargozari_az = {input:{type:'datepicker',unit:'hour',calendarType:'jalali'},label:'تاریخ برگزاری ایونت از',field:'value.az_tarikh'};
        let input_tarikhe_bargozari_ta = {input:{type:'datepicker',unit:'hour',calendarType:'jalali'},label:'تاریخ برگزاری ایونت تا',field:'value.ta_tarikh'};
        let input_ersal_be_landing = {input:{type:'checkbox',text:'ارسال مستقیم به لندینگ پیچ'},label:'.',field:'value.ersale_mostaghim'}
        let input_emkane_davat = {input:{type:'checkbox',text:'امکان دعوت از دوستان'},label:'.',field:'value.emkane_davat'}
        let input_landing = {input:{type:'text'},field:'value.landing_page',inlineLabel:'لندینگ پیج :',labelAttrs:{style:{width:160}}}
        let input_adrese_ghorfe = {input:{type:'text'},field:'value.adrese_ghorfe',inlineLabel:'آدرس غرفه :',labelAttrs:{style:{width:160}}}
        let input_nazdiktarin_brt = {input:{type:'text'},field:'value.nazdik_tarin_brt',inlineLabel:' نزدیک ترین ایستگاه بی آر تی :',labelAttrs:{style:{width:160}}}
        let input_nazdiktarin_metro = {input:{type:'text'},field:'value.nazdik_tarin_metro',inlineLabel:'نزدیک ترین ایستگاه مترو :',labelAttrs:{style:{width:160}}}
        let input_poster = {column:[{html:'انتخاب پوستر'},{html:()=>this.poster()},]}
        let input_location = {
            label:'موقعیت',html:()=>{
                //return <Map lat={model.lat} long={model.long} style={{width:'100%',height:160,resize:'vertical',minHeight:100}} onChange={(lat,long)=>this.setState({model:{...model,lat,long}})}/>
                return (
                    <AIOMap
                        apiKeys={{
                            map:'web.0a2aa5f83d314a8c9916473aa0e01438',
                            service:'service.09a2234e299a4ff585007b2894df9fca',
                        }}
                        style={{width:'100%',height:160,resize:'vertical',minHeight:100}} 
                        latitude={model.lat}
                        longitude={model.long}
                        onSubmit={(lat,long)=>{
                            model.lat = lat;
                            model.long = long;
                            this.setState({showMap:false,model})
                        }}
                        title='انتخاب موقعیت'
                        search={true}
                        popup={true}
                    />
                )
            }
        }
        return {
            html:(
                <AIOInput 
                    type='form' lang='fa'
                    style={{background:'#fff',margin:'0 24px',borderRadius:8,fontSize:12}}
                    value={model}
                    inputAttrs={{style:{minHeight:36}}}
                    onChange={(model)=>this.setState({model})}
                    inputs={{
                        props:{gap:12},
                        column:[
                            {
                                hide_xs:true,
                                column:[
                                    {row:[input_name,input_tarikhe_etebar]},
                                    {row:[input_matne_payamak,input_matne_davatname]},
                                    {row:[input_tarikhe_bargozari_az,input_tarikhe_bargozari_ta]},
                                    {row:[input_ersal_be_landing,input_emkane_davat]},
                                ]
                            },
                            {
                                show_xs:true,
                                column:[
                                    input_name,
                                    input_tarikhe_etebar,
                                    input_matne_payamak,
                                    input_matne_davatname,
                                    input_tarikhe_bargozari_az,
                                    input_tarikhe_bargozari_ta,
                                    input_ersal_be_landing,
                                    input_emkane_davat
                                ]
                            },
                            {
                                show_xs:true,
                                column:[
                                    input_landing,input_adrese_ghorfe,input_nazdiktarin_brt,input_nazdiktarin_metro,input_poster
                                ]
                            },
                            
                            {
                                hide_xs:true,
                                row:[
                                    {
                                        flex:1,
                                        column:[input_landing,input_adrese_ghorfe,input_nazdiktarin_brt,input_nazdiktarin_metro,]
                                    },
                                    input_poster
                                ]
                            },
                            input_location
                        ]
                    }}
                />
            )
        }
    }
    dastresi_layout(){
        let {users} = this.context;
        let {karbarane_daraye_dastresi} = this.state;
        return {
            className:'bgFFF margin-0-24 round8',
            html:(
                <AIOInput
                    className='bgFFF'
                    style={{width:'100%',height:36}}
                    type='multiselect'
                    popupWidth='fit'
                    text='کاربران دارای دسترسی:'
                    value={karbarane_daraye_dastresi}
                    options={users}
                    optionText='option.name'
                    optionValue='option.id'
                    onChange={(karbarane_daraye_dastresi)=>this.setState({karbarane_daraye_dastresi})}
                />
            )
        }
    }
    ghavaed_layout(){
        let list = [
            'نام دعوتنامه صرفه جهت شناسایی آن در منوی <دعوت نامه ها> میباشد و برای مدعو ارسال نمی شود.',
            'عنوان دعوتنامه در اولین خط دعوتنامه درج می شود ',
            'متن دعوتنامه در بدنه دعوتنامه درج می شود '
        ]
        return {
            className:'margin-0-24',
            column:list.map((o)=>{
                return {
                    row:[
                        {size:36,html:<div style={{background:'#9CCBDF',width:10,height:10,borderRadius:'100%'}}></div>,align:'vh'},
                        {html:o,className:'size14'}
                    ]
                }
            })
        }
    }
    render(){
        return (
            <>
                <RVD
                    layout={{
                        style:{height:'100%'},
                        column:[
                            {size:12},
                            this.nav_layout(),
                            {size:12},
                            {
                                flex:1,className:'ofy-auto',
                                column:[
                                    this.splitter_layout('موضوع'),
                                    this.form_layout(),
                                    this.splitter_layout('دسترسی ها'),
                                    this.dastresi_layout(),
                                    this.splitter_layout('قواعد و توضیحات'),
                                    this.ghavaed_layout(),
                                    {size:60}
                                ]
                            }
                            
                        ]
                    }}
                />
            </>
        )
    }
}




class ErsaleDavatname extends Component{
    static contextType = AppContext;
    constructor(props){
        super(props);
        this.state = {
            tab:'0',
            model:{...this.initModel()},
            davatname_haye_entekhab_shode:[],
            niaz_be_taide_man:[],
            checks:[],
            excel:false,
            successLength:false,
            errorList:false,
            files:[]
        }
    }
    initModel(){
        return {
            nam:'',
            name_khanevadegi:'',
            shomare_tamas:'',
            jensiat:'',
            sherkat:'',
            semat:''
        }
    }
    async componentDidMount(){
        let {apis} = this.context;
        let niaz_be_taide_man = await apis({api:'niaz_be_taide_man'});
        let {url:linke_template_excel} = await apis({api:'linke_template_excel'});
        this.setState({niaz_be_taide_man,linke_template_excel})
    }
    async send(){
        let {apis,setConfirm} = this.context;
        let {onClose} = this.props;
        let {model,davatname_haye_entekhab_shode,excel,tab} = this.state;
        if(tab === '0'){
            if(!model.nam || !model.name_khanevadegi || !model.jensiat){alert('اطلاعات مورد نیاز را وارد کنید'); return;}
            let res = await apis({api:'ersale_taki',parameter:{model,davatname_haye_entekhab_shode}})
            if(typeof res === 'string'){setConfirm({type:'error',text:'ارسال دعوتنامه تکی با خطا روبرو شد',subtext:res})}
            else{
                setConfirm({type:'success',text:'ارسال دعوتنامه تکی با موفقیت انجام شد'})
                onClose()
            }
        }
        if(tab === '1'){
            if(!excel){alert('فایل اکسل را آپلود کنید'); return;}
            let res = await apis({api:'ersale_goroohi',parameter:{davatname_haye_entekhab_shode,excel}})
            if(typeof res === 'string'){setConfirm({type:'error',text:'ارسال دعوتنامه گروهی با خطا روبرو شد',subtext:res})}
            else{
                let {successLength,errorList} = res;
                setConfirm({type:'success',text:'ارسال دعوتنامه گروهی با موفقیت انجام شد'});
                this.setState({successLength,errorList})
            }
        }
        
    }
    async approve(state){
        let {apis,setConfirm} = this.context;
        let {niaz_be_taide_man,checks} = this.state;
        let selected = niaz_be_taide_man.filter((o)=>checks[o.id])
        if(!selected.length){
            setConfirm({type:'warning',text:'هیچ موردی از جدول انتخاب نشده است'})
            return;
        }
        let res = await apis({api:'taid',parameter:{state,selected}})
        if(typeof res === 'string'){setConfirm({type:'error',text:`${state?'تایید':'عدم تایید'} با خطا روبرو شد`,subtext:res})}
        else{
            this.setState({niaz_be_taide_man:niaz_be_taide_man.filter((o)=>!checks[o.id])})
            setConfirm({type:'success',text:`${state?'تایید':'عدم تایید'} با موفقیت انجام شد`})
        }
    }
    nav_layout(){
        let {onClose} = this.props;
        let {tab} = this.state;
        return {
            size:48,gap:6,className:'margin-0-24 bgFFF round8 padding-0-12',align:'v',
            row:[
                {html:'میز کار',className:'color8C9CA3 size18',align:'v',attrs:{onClick:()=>onClose()}},
                {html:<Icon path={mdiChevronLeft} size={0.8}/>,align:'v'},
                {html:'ارسال دعوتنامه',className:'size18 color108ABE bold',align:'v'},
                {flex:1},                
                {show:tab !== '2',html:'ارسال',className:'color0094D4 size14 bold',attrs:{onClick:()=>this.send()}},
                {show:tab === '2',html:'تایید',className:'color0094D4 size14 bold',attrs:{onClick:()=>this.approve(true)}},
                {html:<div style={{width:1,height:20}} className='bg0094D4'></div>,align:'vh'},
                {show:tab === '2',html:'عدم تایید',className:'colorC92828 size14 bold',attrs:{onClick:()=>this.approve(false)}},
                {show:tab !== '2',html:'خروج',className:'colorC92828 size14 bold',attrs:{onClick:()=>onClose()}},
                
            ]
        }
    }
    tabs_layout(){
        let {tab} = this.state;
        return {
            className:'margin-0-24 bgFFF round8 padding-0-12',
            html:(
                <AIOInput 
                    type='tabs'
                    options={[
                        {text:'تکی',value:'0'},
                        {text:'گروهی',value:'1'},
                        {text:'تائید دعوتنامه های اشخاص',value:'2'},
                    ]}
                    value={tab}
                    onChange={(tab)=>this.setState({tab})}
                />
            )
        }
    }
    splitter_layout(text,show){
        if(show === false){return false}
        return {
            size:48,gap:6,className:'margin-0-24',
            row:[
                {html:text,className:'size18 color108ABE bold',align:'v'},
                {flex:1,html:<div style={{width:'100%',height:1}} className='bg108ABE'></div>,align:'v'},                
            ]
        }
    }
    formGap(rowKey){
        return {
            type:'html',html:()=>'',rowWidth:12,rowKey
        }
    }
    form_layout(){
        let {model,tab} = this.state;
        if(tab !== '0'){return false}
        return {
            html:(
                <AIOInput
                    type='form'
                    style={{background:'#fff',margin:'0 24px',borderRadius:8}}
                    value={model}
                    lang='fa'
                    inputAttrs={{style:{minHeight:36}}}
                    onChange={(model)=>this.setState({model})}
                    inputs={{
                        props:{gap:12},
                        column:[
                            {
                                row:[
                                    {input:{type:'text'},field:'value.nam',label:'نام:',validations:[['required']]},
                                    {input:{type:'text'},field:'value.name_khanevadegi',label:'نام خانوادگی :',validations:[['required']]},
                                ]
                            },
                            {
                                row:[
                                    {input:{type:'text'},field:'value.shomare_tamas',label:'شماره تماس :',validations:[['required']]},
                                    {input:{type:'text'},field:'value.sherkat',label:'شرکت/فروشگاه :'}
                                ]
                            },
                            {
                                row:[
                                    {input:{type:'text'},field:'value.semat',label:'سمت :'},
                                    {input:{type:'radio',options:[{text:'آقا',value:'male'},{text:'خانم',value:'female'}],optionStyle:{width:'fit-content'}},field:'value.jensiat',label:'جنیست'}
                                ]
                            },
                            
                        ]
                    }}
                />
            )
        }
    }
    entekhab_layout(){
        let {davatname_ha = [] } = this.props;
        let {davatname_haye_entekhab_shode,tab} = this.state;
        if(tab === '2'){return false}
        return {
            className:'bgFFF margin-0-24 round8',
            html:(
                <AIOInput
                    className='bgFFF'
                    style={{width:'100%',height:36}}
                    type='multiselect'
                    popupWidth='fit'
                    text='انتخاب از لیست دعوتنامه ها'
                    value={davatname_haye_entekhab_shode}
                    options={davatname_ha.filter((o)=>o.is_active ===true && o.is_draft === false)}
                    optionText='option.name'
                    optionValue='option.id'
                    popupAttrs={{style:{maxHeight:300}}}
                    onChange={(davatname_haye_entekhab_shode)=>this.setState({davatname_haye_entekhab_shode})}
                />
            )
        }
    }
    // async downloadTemplate() {
    //     let {linke_template_excel} = this.state;
    //     let url = linke_template_excel;
    //     let name = 'main_template_v1.xlsx'
    //     fetch(url, {
    //       mode: 'no-cors',
    
    //     })
    //       .then(resp => resp.blob())
    //       .then(blob => {
    //         let url = window.URL.createObjectURL(blob);
    //         let a = document.createElement('a');
    //         a.style.display = 'none';
    //         //a.download = url.replace(/^.*[\\\/]/, '');
    //         a.href = url;
    //         a.download = name;
    //         document.body.appendChild(a);
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //       })
    //       .catch(() => alert('oh no!'));
    
    // }
    async downloadTemplate() {
        let { linke_template_excel } = this.state;
        let url = linke_template_excel;
        let name = 'main_template_v1.xlsx';
      
        fetch(url)
          .then((resp) => resp.blob())
          .then((blob) => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(() => alert('oh no!'));
      }
    excel_layout(){
        let {excel,tab,successLength,errorList,files} = this.state;
        let {addPopup,apis,removePopup,setConfirm} = this.context;
        if(tab !== '1'){return false}
        return {
            flex:1,scroll:'v',
            column:[
                {flex:1},
                {html:<Icon path={mdiFileExcel} size={1}/>,align:'vh',className:'color5897D2'},
                {size:12},
                {html:'لیست اطلاعات مدعوین را وارد نمایید',className:'size16 bold',align:'h'},
                {size:12},
                {html:'اطلاعات بارگذاری شده باید شامل نام، نام خانوادگی و شماره تماس 11 رقمی مدعوین باشد.',className:'size16 color808080',align:'h'},
                {size:24},
                {
                    align:'vh',className:'size14 color5897D2 bold',
                    row:[
                        {html:(
                            <label>
                                <AIOInput
                                    style={{background:'dodgerblue',color:'#fff',width:260}}
                                    className='br-6'
                                    before={<Icon path={mdiFileExcel} size={0.8}/>}
                                    type='file'
                                    text='بارگذاری فایل اکسل'
                                    value={excel?[excel]:undefined}
                                    onChange={(files)=>this.setState({excel:files[0],successLength:false,errorList:false})}
                                />
                                {/* <input type='file' style={{display:'none'}} onChange={(e)=>this.setState({excel:e.target.files[0],successLength:false,errorList:false})}/> */}
                            </label>
                        )},
                    ]
                },
                {size:12},
                {
                    align:'vh',className:'size14 color5897D2 bold',
                    row:[
                        {html:(    
                            <AIOInput
                                type='button'
                                style={{background:'dodgerblue',color:'#fff',width:260}}
                                className='br-6'
                                before={<Icon path={mdiFileExcel} size={0.8}/>}
                                text='دانلود قالب اکسل'
                                onClick={(e)=>this.downloadTemplate()}
                            />
                        )}
                    ]
                },
                
                {size:12},
                {show:successLength !== false,html:this.getSuccessButton(`${successLength} مورد با موفقیت ثبت شد`,'#AAF2BE'),align:'h'},
                {size:12},
                {
                    show:errorList !== false && errorList.length !== 0,
                    html:this.getSuccessButton(`${errorList.length} مورد دارای خطا`,'#FFC5B9',()=>{
                        addPopup({
                            type:'fullscreen',
                            title:`موارد خطا (${errorList.length} مورد)`,
                            content:()=>{
                                return (
                                    <Khata_haye_ersal model={JSON.parse(JSON.stringify(errorList))} onSubmit={async (model)=>{
                                        let res = await apis({api:'ersale_mojadade_khatahaye_excel',parameter:{model}});
                                        if(res === true){removePopup()}
                                        if(typeof res === 'string'){
                                            setConfirm({type:'error',text:'خطا',subtext:res});
                                            return;
                                        }
                                        let {errorList,successLength} = res;
                                        this.setState({errorList,successLength});
                                        removePopup();
                                    }}/>
                                )
                            }
                        })
                    }),align:'h'},
                {flex:1}
            ]
        }
    }
    getSuccessButton(text,color,onClick){
        return (
            <div className='excel-success-button' style={{background:color}} onClick={onClick}>{text}</div>
        )
    }
    table_layout(){
        let {niaz_be_taide_man,checks,tab} = this.state;
        this.order = 0;
        if(tab !== '2'){return false}
        return {
            flex:1,
            html:(
                <AIOInput
                    type='table'
                    rows={niaz_be_taide_man}
                    style={{padding:24}}
                    getValue={{
                        order:()=>{
                            this.order++;
                            return this.order;
                        },
                        options:()=>{
                            return (<button><Icon path={mdiDotsHorizontal} size={0.8}/></button>)
                        },
                        checkbox:(row)=>{
                            return <input type='checkbox' checked={!!checks[row.id]} onChange={(e)=>this.setState({checks:{...checks,[row.id]:e.target.checked}})}/>
                        }
                    }}
                    columns={[
                        {title:'',template:'checkbox',justify:true,width:40},
                        {title:'ردیف',template:'order',justify:true,width:60},
                        {title:'مدعو',field:'row.davat_shode',titleJustify:false},
                        {title:'دعوت کننده',field:'row.davat_konande',titleJustify:false},
                        {title:'زمان دعوت',field:'row.zamane_davat',justify:true},
                        {title:'جزییات',template:'options',width:70,justify:true},
                    ]}
                />
            )
        }
    }
    render(){
        let {tab} = this.state;
        return (
            <RVD
                layout={{
                    column:[
                        {size:12},
                        this.nav_layout(),
                        {size:12},
                        {
                            flex:1,scroll:'v',
                            column:[
                                this.tabs_layout(),
                                this.splitter_layout('انتخاب دعوتنامه',tab !== '2'),
                                this.entekhab_layout(),
                                this.splitter_layout('مشخصات مدعو',tab === '0'),
                                this.form_layout(),
                                this.splitter_layout('مشخصات مدعوین',tab === '1'),
                                this.excel_layout(),
                                this.table_layout(),
                                {size:60}
                            ]
                        }
                        
                    ]
                }}
            />
        )
    }
}
class Khata_haye_ersal extends Component{
    constructor(props){
        super(props);
        this.state = {model:props.model}
    }
    getTable(){
        let {model} = this.state;
        return (
            <AIOInput
                type='table'
                rows={model}
                excel={true}
                columns={[
                    {title:'نام',field:'row.name',titleJustify:false,type:'text'},
                    {title:'شماره تماس',field:'row.phone',titleJustify:false,type:'text'},
                    {title:'علت خطا',field:'row.error',titleJustify:false},
                ]}
                onChange={(model)=>this.setState({model})}
            />
        )
    }
    render(){
        let {onSubmit} = this.props;
        let {model} = this.state;
        return (
            <RVD
                layout={{
                    style:{background:'#fff',height:'100%'},
                    column:[
                        {html:this.getTable(),flex:1},
                        
                    ]
                }}
            />    
        )
    }
}
class DavatnameHa extends Component{
    static contextType = AppContext;
    nav_layout(){
        let {onClose} = this.props;
        return {
            size:48,gap:6,className:'margin-0-24 bgFFF round8 padding-0-12',align:'v',
            row:[
                {html:'میز کار',className:'color8C9CA3 size18',align:'v',attrs:{onClick:()=>onClose()}},
                {html:<Icon path={mdiChevronLeft} size={0.8}/>,align:'v'},
                {html:'دعوتنامه ها',className:'size18 color108ABE bold',align:'v'}
            ]
        }
    }
    splitter_layout(text){
        return {
            size:48,gap:6,className:'margin-0-24',
            row:[
                {html:text,className:'size18 color108ABE bold',align:'v'},
                {flex:1,html:<div style={{width:'100%',height:1}} className='bg108ABE'></div>,align:'v'},                
            ]
        }
    }
    list_layout(){
        let {davatname_ha,onRemove,change_davatname_ha,pageNumber,pageSize,total} = this.props;
        return {
            flex:1,
            html:(
                <AIOInput
                    paging={{
                        size:pageSize,
                        number:pageNumber,
                        length:total,
                        serverSide:true,
                        onChange:({size,number})=>{
                            let {onChangePaging} = this.props;
                            let res = {pageNumber:number,pageSize:size}
                            if(res.pageNumber < 1){return}
                            onChangePaging(res)
                        }
                    }}
                    type='table'
                    rows={davatname_ha}
                    attrs={{style:{height:'100%',background:'#eee'}}}
                    rowsTemplate={(rows)=>{
                        return (
                            <div style={{flex:1,display:'inline-block',padding:'0 12px', overflowY:'auto'}}>
                                {rows.map((o,i)=><DavatnameCard key={o.id} object={o} onRemove={()=>onRemove(o)} change_davatname_ha={change_davatname_ha}/>)}
                            </div>
                        )
                    }}
                />
            )
        }
    }
    onChangePaging(obj){
        let {pageNumber,pageSize,onChangePaging,pagesLength} = this.props;
        let res = {pageNumber,pageSize,...obj}
        if(res.pageNumber < 1){return}
        onChangePaging(res)
    }
    render(){
        let {pageNumber,pageSize,onChangePaging} = this.props;
        return (
            <RVD
                layout={{
                    column:[
                        {size:12},
                        this.nav_layout(),
                        {size:12},
                        {
                            flex:1,scroll:'v',
                            column:[
                                this.list_layout(),
                            ]
                        }
                    ]
                }}
            />
        )
    }
}


class DavatnameCard extends Component{
    static contextType = AppContext;
    poster(){
        let {object} = this.props;
        let {poster} = object;
        return (
            <label onClick={()=>this.addPopup()} style={{width:'100%',background:'#ddd',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {
                    !poster &&
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.80556 6.20833C2.80556 4.16155 4.16155 2.80555 6.20833 2.80555H20.7917C22.8385 2.80555 24.1944 4.16155 24.1944 6.20833V20.7917C24.1944 22.8385 22.8385 24.1944 20.7917 24.1944H6.20833C4.16155 24.1944 2.80556 22.8385 2.80556 20.7917V6.20833ZM0.861111 6.20833V20.7917C0.861111 23.7851 3.21491 26.1389 6.20833 26.1389H20.7917C23.7851 26.1389 26.1389 23.7851 26.1389 20.7917V6.20833C26.1389 3.21491 23.7851 0.861111 20.7917 0.861111H6.20833C3.21491 0.861111 0.861111 3.21491 0.861111 6.20833ZM8.43421 10.8136C9.76462 10.8136 10.8392 9.73903 10.8392 8.35746C10.8392 7.02705 9.76462 5.95248 8.43421 5.95248C7.05263 5.95248 5.97807 7.02705 5.97807 8.35746C5.97807 9.73903 7.05263 10.8136 8.43421 10.8136ZM25.8575 18.6425L18.924 11.7091C18.3355 11.1206 17.4145 11.1206 16.826 11.7091L10.2507 18.2844C10.4298 18.1053 10.7368 18.1053 10.9159 18.2844L7.25731 14.6257C6.66886 14.0373 5.74781 14.0373 5.15936 14.6257L1.14254 18.6425C0.96345 18.8216 0.861111 19.0775 0.861111 19.3333C0.861111 19.8706 1.29605 20.3056 1.83333 20.3056C2.08918 20.3056 2.34503 20.2032 2.52412 20.0241L6.54094 16.0073C6.36184 16.1864 6.05482 16.1864 5.87573 16.0073L9.53436 19.6659C10.1228 20.2544 11.0439 20.2544 11.6323 19.6659L18.2076 13.0906C18.0285 13.2697 17.7215 13.2697 17.5424 13.0906L24.4759 20.0241C24.655 20.2032 24.9108 20.3056 25.1667 20.3056C25.7039 20.3056 26.1389 19.8706 26.1389 19.3333C26.1389 19.0775 26.0365 18.8216 25.8575 18.6425Z" fill="white"/>
                    </svg>
                }
                {
                    poster &&
                    <img src={poster} alt='' width='100%'/>
                }
            </label>
        )
        
    }
    poster_layout(){
        return {
            size:120,
            html:this.poster()
        }
    }
    name_layout(){
        let {object} = this.props;
        let {name_davatname} = object;
        return {
            attrs:{title:name_davatname},size:36,html:name_davatname,className:'size12 bold',style:{padding:'0 6px'}
        }
    }
    days_layout(){
        let {object} = this.props;
        let {etebar} = object;
        return {size:24,align:'v',html:etebar,className:'size10 color605E5C padding-0-6 bold', style:{color:etebar === 'منقضی شده' ? "red": undefined}}
    }
    date_layout(type){
        let {object} = this.props;
        let value = object[type];
        let text = {'tarikhe_ijad':'تاریخ ایجاد:','tarikhe_etebar':'تاریخ اعتبار:'}[type];
        return {
            className:'color605E5C size10 padding-6',
            row:[
                {html:text},
                {flex:1},
                {html:value}
            ]
        }
    }
    addPopup(){
        let {object} = this.props;
        let {addPopup,removePopup} = this.context;
        let {change_davatname_ha} = this.props;
        addPopup({
            title:'ویرایش دعوتنامه',
            content:()=>{
                return (
                    <div style={{background:'#f8f8f8',overflow:'hidden',height:'100%'}} className='msf'>
                        <TarahiDavatname onClose={()=>removePopup()} model={object} change_davatname_ha={change_davatname_ha}/>
                    </div>
                )
            }
        })
    }
    active_layout(){
        let {object,change_davatname_ha} = this.props;
        let {apis} = this.context;
        return {
            row:[
                {
                    html:(
                        <Icon 
                            path={object.faal?mdiToggleSwitch:mdiToggleSwitchOffOutline} 
                            size={1}
                            style={{
                                color:object.faal?'dodgerblue':'#ccc',
                                cursor:'pointer'
                            }}
                        />
                    ),align:'v',
                    attrs:{
                        onClick:async ()=>{
                            let res = await apis({api:'taghire_davatname',parameter:{object,state:!object.faal}})
                            if(res === true){
                                object.faal = !object.faal;
                                change_davatname_ha(object.id,object)
                            }
                        }
                    }
                },
                {
                    html:object.faal?'فعال':'غیر فعال',className:'color005478 size10 bold padding-0-6',align:'v'
                },
                {flex:1},
                {html:'ویرایش',className:'color005478 size10 bold padding-0-6',onClick:()=>this.addPopup()}
            ]
        }
    }
    footer_layout(){
        let {apis} = this.context;
        let {object} = this.props;
        let {dastresi_ha} = object;
        let {onRemove} = this.props;
        return {
             className:'size10 color005478 bold padding-0-6',align:'v',
            row:[
                {html:<Icon path={mdiAccountCircleOutline} size={0.6} />,align:'vh'},
                {size:4},
                {html:dastresi_ha.length},
                {size:4},
                {html:'نفر دسترسی'},
                {flex:1},
                {html:<Icon path={mdiDelete} size={0.7}/>,className:'bgC92828 colorFFF round4',attrs:{
                    onClick:async ()=>{
                        let res = await apis({api:'hazfe_davatname',parameter:object})
                        if(res === true){onRemove()}
                    }
                }}
            ]
        }
    }
    render(){
        return (
            <RVD
                layout={{
                    style:{flex:'none',width:200,float:'right',margin:6,overflowY:'auto',borderRadius:12,background:'#fff'},
                    column:[
                        this.poster_layout(),
                        this.days_layout(),
                        this.name_layout(),
                        this.date_layout('tarikhe_ijad'),
                        this.date_layout('tarikhe_etebar'),
                        {size:12},
                        this.active_layout(),
                        {size:6},
                        this.footer_layout(),
                        {size:12}
                    ]
                }}
            />
        )
    }
}