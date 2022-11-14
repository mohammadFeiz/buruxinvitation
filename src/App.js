import React,{Component} from 'react';
import RSA from 'react-super-app';
import MizeKar from './components/mize-kar/mize-kar';
import Dastresi from './components/dastresi/dastresi';
import Tarikhche from './components/tarikhche/tarikhche';
import getSvg from './getSvg';
import AIODate from 'aio-date';
import RVD from 'react-virtual-dom';
import AIOService from 'aio-service';
import RKS from 'react-keycloak-spa';
import AIOButton from 'aio-button';
import {Icon} from '@mdi/react';
import {mdiAccount} from '@mdi/js';
import apis from './apis';
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
      userInformation,
      apis:AIOService({apis,getState:()=>this.state}),
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
    let users = await apis({type:'users'})
    if(typeof users === 'string'){
      setConfirm({type:'error',text:'دریافت کاربران با خطا مواجه شد',subtext:users})
    }
    else{
      this.setState({users})
    }
    let davatname_ha = await apis({type:'davatname_ha'})
    if(typeof davatname_ha === 'string'){
      setConfirm({type:'error',text:'دریافت دعوتنامه ها با خطا مواجه شد',subtext:davatname_ha})
    }
    else{
      this.setState({davatname_ha})
    }
  }
  getContext(){
    return {...this.state}
  }
  render(){
    let {userInformation} = this.state;
    return (
      <AppContext.Provider value={this.getContext()}>
        <RSA
          navId='mize_kar'
          navs={[
            {text:'دسترسی',id:'dastresi',icon:()=>getSvg('dastresi')},
            {text:'میز‌کار',id:'mize_kar',icon:()=>getSvg('mize_kar')},
            {text:'تاریخچه',id:'tarikhche',icon:()=>getSvg('tarikhche')}
          ]}
          body={({navId})=>{
            if(navId === 'mize_kar'){return <MizeKar/>}
            if(navId === 'dastresi'){return <Dastresi/>}
            if(navId === 'tarikhche'){return <Tarikhche/>}
          }}
          header={()=>(
            <RVD
              layout={{
                gap:3,
                row:[
                  {html:<DateAndTime/>},
                  {html:(
                    <AIOButton
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
          )}
          getActions={(obj)=>this.setState(obj)}
        />
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
    let date = AIODate();
    let months = date.getMonths('jalali');
    let [y,mo,d,h,mi] = date.getToday('jalali');
    h = h.toString();
    mi = mi.toString();
    if(h.length === 1){h = '0' + h}
    if(mi.length === 1){mi = '0' + mi}
    let {weekDay} = date.getWeekDay([y,mo,d],'jalali')
    //return `${weekDay} ${d} ${months[mo - 1]} ${y} ${h}:${mi}`;
    return (
      <RVD
        layout={{
          childsAttrs:{className:'time-box'},
          childsProps:{align:'v'},
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
