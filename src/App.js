import React,{Component} from 'react';
import RSA from './npm/react-super-app/react-super-app';
import MizeKar from './components/mize-kar/mize-kar';
import Dastresi from './components/dastresi/dastresi';
import Tarikhche from './components/tarikhche/tarikhche';
import getSvg from './getSvg';
import AIODate from './npm/aio-date/aio-date';
import RVD from './npm/react-virtual-dom/react-virtual-dom';
import AIOService from './npm/aio-service/aio-service';
import RKS from 'react-keycloak-spa';
import AIOInput from './npm/aio-input/aio-input';
import {Icon} from '@mdi/react';
import {mdiAccount} from '@mdi/js';
import getResponse from './apis';
import AppContext from './app-context';
import './index.css';

export default class App extends Component{
  render(){
    // return (
    //   <Main/>
    // )
    return (
      <RKS
        config={{
          url: "https://iam.burux.com/auth",
          realm: "master",
          clientId: "invitation"
        }}
        component={Main}
      />
    )
  }
}
class Main extends Component{
  constructor(props){
    super(props);
    let {keycloak} = this.props;
    let roles; 
    if(keycloak.tokenParsed.resource_access.invitation){
      roles = keycloak.tokenParsed.resource_access.invitation.roles
    }
    else{
      roles = []
    }
    let userInformation = {
      username: keycloak.tokenParsed.preferred_username,
      roles: roles,logout:keycloak.logout,name:keycloak.tokenParsed.name
    }
    this.state = {
      rsa:new RSA({rtl:true}),
      userInformation,
      apis:AIOService({id:'brxinvitation',getResponse,getState:()=>this.state}),
      users:[],
      statuses:[
        {value:'0',text:'در انتظار تائید',color:'#979797'},
        {value:'1',text:'ارسال شده',color:'#C69110'},
        {value:'2',text:'مشاهده شده',color:'#107C10'},
        {value:'3',text:'منقضی شده',color:'#A4262C'},
        {value:'4',text:'خطا',color:'#A4262C'},
      ]
    }
  }
  async componentDidMount(){
    let {setConfirm,apis} = this.state;
    let users = await apis({api:'users'})
    if(typeof users === 'string'){
      setConfirm({type:'error',text:'دریافت کاربران با خطا مواجه شد',subtext:users})
    }
    else{
      this.setState({users})
    }
    let res = await apis({api:'davatname_ha',parameter:{pageNumber:1,pageSize:20}})
    if(typeof res === 'string'){
      setConfirm({type:'error',text:'دریافت دعوتنامه ها با خطا مواجه شد',subtext:res})
    }
    else{
      let {davatname_ha,total} = res;
      this.setState({davatname_ha,davatname_ha_total:total})
    }
  }
  getContext(){
    return {...this.state}
  }
  render(){
    let {userInformation,rsa} = this.state;
    return (
      <AppContext.Provider value={this.getContext()}>
        {
          rsa.render({
            navId:'mize_kar',
            navs:[
              {text:'دسترسی',id:'dastresi',icon:()=>getSvg('dastresi')},
              {text:'میز‌کار',id:'mize_kar',icon:()=>getSvg('mize_kar')},
              {text:'تاریخچه',id:'tarikhche',icon:()=>getSvg('tarikhche')}
            ],
            body:({navId})=>{
              if(navId === 'mize_kar'){return <MizeKar/>}
              if(navId === 'dastresi'){return <Dastresi/>}
              if(navId === 'tarikhche'){return <Tarikhche/>}
            },
            navHeader:()=>{
              return (
                <RVD
                  layout={{
                    column:[
                      {size:24},
                      {html:'BURUX',align:'h',className:'bold h-36',style:{color:'orange',fontSize:30}},
                      {html:'Invitation',align:'h',style:{color:'#fff',fontSize:14,letterSpacing:4}},
                      {size:24}
                    ]
                  }}
                />
              )
            },
            headerContent:()=>(
              <RVD
                layout={{
                  gap:3,
                  row:[
                    {flex:1},
                    {html:<DateAndTime/>},
                    {html:(
                      <AIOInput
                        type='select'
                        before={<Icon path={mdiAccount} size={0.9}/>}
                        style={{background:'none'}}
                        options={[
                          {text:'خروج از سیستم',value:'logout'}
                        ]}
                        text={userInformation.name}
                        onChange={(value)=>{
                          if(value === 'logout'){this.state.userInformation.logout()}
                        }}
                      />
                    )}
                  ]
                }}
              />
            )
          })
        }
      </AppContext.Provider>
    )
  }
}
class DateAndTime extends Component{
  constructor(props){
    super(props);
    this.state = {value:this.getToday()}
    setInterval(()=>this.setState({value:this.getToday()}),60000)
  }
  getToday(){
    let months = AIODate().getMonths({calendarType: 'jalali'});
    let [y,mo,d,h,mi] = AIODate().getToday({calendarType: 'jalali'});
    h = h.toString();
    mi = mi.toString();
    if(h.length === 1){h = '0' + h}
    if(mi.length === 1){mi = '0' + mi}
    let {weekDay} = AIODate().getWeekDay({date: [y,mo,d]})
    //return `${weekDay} ${d} ${months[mo - 1]} ${y} ${h}:${mi}`;
    return (
      <RVD
        layout={{
          childsProps:{align:'v',className:'time-box'},
          row:[
            {html:weekDay},
            {html:d},
            {html:months[mo - 1]},
            {html:y},
            {html:h + ':' + mi}
          ]
        }}
      />
    )
    //return `${y}/${mo}/${d} ${h}:${mi}`;
  }
  render(){
    let {value} = this.state;
    return (
      value      
    )
  }
}
