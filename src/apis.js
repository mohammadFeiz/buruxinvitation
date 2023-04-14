import AIODate from "./npm/aio-date/aio-date";
// const hostName = `http://172.16.7.34:8001`
const hostName = `http://localhost:8002`
// const hostName = `http://192.168.211.136:8001`
// const hostName = `http://localhost:8001`
// const hostName =  process.env.BACKEND_URL
// const hostName = `http://192.168.10.51:8076`
// const hostName = `https://u.davat.app`
let url;
let user_name = 'm.shad' // یا 'm.shad'
let user_name_role = 'admin'  // یا'user'
//آدرس برای ساخت تمپلیت و ولیدیت کردن و همچنین بررسی اینکه آیا آن تمپلیت فعال است یا خیر
const invitationTemplateUrl = `${hostName}/Api/V1/Invitation/InvitationTemplate/` // دعوتنامه ها

const excellImport = `${hostName}/Api/V1/Invitation/GroupSending/` //ارسال گروهی

const ersalTakiUrl = `${hostName}/Api/V1/Invitation/SingleSending/` // ارسال تکی

const showAllInvitation = `${hostName}/Api/V1/Invitation/Invite/` //تاریخچه
const ShowAllNotVerified = `${hostName}/invitation/show/` //لیست نیاز به تائید من 

//با متد گت این ای پی آی تائید انجام می شود
const  InvitatonsConfirm = `${hostName}/invitation/v1/invitation/`

const sendAgain = `${hostName}/invitation/v1/invitation/retry-invitation/`

function isoDate(date){
    let g = AIODate().toGregorian({date})
    let [year, month=1, day=1, hour=0, minute=0] = g
    return new Date(`${year}/${month}/${day} ${hour}:${minute}`).toISOString()
}

export default function apis({Axios, getDateAndTime, getState}){
    return {

        // ********************* نیاز به تائید من **********************
        async niaz_be_taide_man(){
            // return [
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:0},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:1},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:2},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:3},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:4},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:5},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:6},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:7},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:8},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:9},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:10},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:11},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:12},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:13},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:14},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:15},
            // ]
            let url = `${ShowAllNotVerified}`
            let res;
            let jalali_created_at;
            try {
                res = await Axios.get(url)
            }
            catch(err){
                return []
            }
            if(res.data.data == undefined || res.data.data == null){
                return []
            }
            let resMapping = res.data.data.map((o) => {
                jalali_created_at = new Date(o.created_at).toISOString(o.created_at).replace('T', ' ').replace('Z', '')
                jalali_created_at = `${new Date(jalali_created_at).toLocaleTimeString('fa-IR')} ${new Date(jalali_created_at).toLocaleDateString('fa-IR')}`
                let davat_shode;
                let davat_konande;
                let name_davatname;
                if(o.guets != undefined || o.guest != null){
                    davat_shode = `${o.guest.first_name} ${o.guest.last_name}`
                }
                if(o.user != undefined || o.user != null){
                    davat_konande = `${o.user.first_name} ${o.user.last_name}`
                }
                if(o.template != undefined || o.template != null){
                    name_davatname = `${o.template.name}`
                }

                return {
                    id: o.id,
                    davat_shode: davat_shode, //`${o.guest.first_name} ${o.guest.last_name}`,
                    davat_konande: davat_konande, //`${o.user.first_name} ${o.user.last_name}`,
                    name_davatname: name_davatname, //`${o.template.name}`,
                    zamane_davat: jalali_created_at,
                    zamane_davat_time:new Date(o.created_at)
                }
            })
            resMapping = resMapping.sort(
                (objA, objB) => Number(objB.zamane_davat_time) - Number(objA.zamane_davat_time)
            )
            return resMapping
        },

        // ********************* لیست تاریخچه **********************
        async tarikhche(){
            // return [
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:0,status:'0',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:1,status:'1',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:2,status:'2',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:3,status:'3',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:4,status:'4',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:5,status:'0',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:6,status:'1',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:7,status:'2',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:8,status:'3',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:9,status:'4',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:10,status:'0',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:11,status:'1',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:12,status:'2',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:13,status:'3',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:14,status:'4',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            //     {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:15,status:'0',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            // ]
            let userInformation = getState().userInformation

            url = `${showAllInvitation}?username=${userInformation.username}`
            let status;
            let created_at;
            let res;
            
            try{
                res = await Axios.get(url)
            }

            catch(err){
                return []
            }
                        // {davat_shode:'علی احمدی',
            // davat_konande:'حسین رحمتی',
            // name_davatname:'نمایشگاه صنعت برق',
            // zamane_davat:'1401/08/10 ساعت 10:42',
            // id:15,status:'0',
            // shomare_tamase_davat_shode:'09123534314',
            // date:new Date().getTime() - (60 * 60 * 60 * 1000)}
            let resMapping = res.data.results.map((o) => {
                //به دست آوردن تایم به صورت فارسی

                // به دست آوردن اختلاف زمانی برای تشخیص اینکه منقضی شده است یا خیر
                let created = new Date(o.created_at).getTime()
                const now = new Date().getTime()
                const msBetweenDates = Math.abs(created - now);
                const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

                if(hoursBetweenDates > 24 && (o.status == 'S' || o.status == 's')){status = '3'} // منقضی شده 
                else if(o.status == 'N'){status = '0'} // در انتظار تائید
                else if(o.status == 'S' || o.status == 's'){status = '1'} //ارسال شده
                else if(o.status == 'O'){status = '2'} // مشاهده شده
                else if(o.status == 'U'){status = '4'} // خطا
                else {status = '4'}
                // else{status = '3'} // منقضی شده 
                return {
                    id: o.id,
                    davat_shode: `${o.guest.first_name} ${o.guest.last_name}`,
                    davat_konande: `${o.caller.first_name} ${o.caller.last_name}`,
                    name_davatname: `${o.template.name}`,
                    shomare_tamase_davat_shode: `${o.guest.phone_number}`,
                    zamane_davat: created_at,
                    zamane_davat_time: new Date(o.created_at).getTime(),
                    status: status,
                    dafaate_ersal: 20,
                    date: new Date(o.created_at).getTime()
                }
            })

            resMapping = resMapping.sort(
                (objA, objB) => Number(objB.zamane_davat_time) - Number(objA.zamane_davat_time),
            ) 
            //dafaate_ersal
            return resMapping 
        },

        // ********************* لیست کاربران **********************
        async users(){
            return [
                {name:'احسان رودکی',id:'0'},
                {name:'هانیه غفاری',id:'1'},
                {name:'زهرا امیری',id:'2'},
                {name:'نازنین سلطانی',id:'3'},
                {name:'علی راقبی',id:'4'},
                {name:'شهرام صادقی',id:'5'},
                {name:'نسرین کمالی فر',id:'6'}
            ]
        },

        // ********************* لیست دعوتنامه ها **********************
        async davatname_ha(){
            // return [
            //     {name:'نمایشگاه صنعت برق',id:'0',tarikhe_ijad:'1401/3/3',tarikhe_etebar:'1401/4/3',faal:true,dastresi_ha:['مهدی شاد','محمد فیض']},
            //     {name:'همایش آبان ماه 1401',id:'1',tarikhe_ijad:'1401/3/3',tarikhe_etebar:'1401/4/3',faal:false,dastresi_ha:['مهدی شاد','محمد فیض']},
            //     {name:'همایش آبان ماه 1401',id:'2',tarikhe_ijad:'1401/3/3',tarikhe_etebar:'1401/4/3',faal:true,dastresi_ha:['مهدی شاد','محمد فیض']}
            // ]

            let url = `${invitationTemplateUrl}`
            let res;
            let lat;
            let long;
            let geoData;
            try{
                res = await Axios.get(url)
            }
            catch(err){
                return []
            }
            let resMapping = res.data.results.map((o) =>{
                let {date,time} = getDateAndTime(o.created_at);
                // let expiration_date = AIODate().getByOffset({date:date.split('/').map((x)=>+x),offset:o.expiration,calendarType:'jalali'})
                // let y;
                // let tt = expiration_date.map((z) => {
                //     if(z != undefined){
                //         y += `${z}`
                //         y += '/'
                //     }
                // })
                //get create_at and expiration_date of template
                let created_at = new Date(o.created_at).toISOString(o.created_at).replace('T', ' ').replace('Z', '')
                let getMiladiDate = new Date(created_at).toLocaleDateString()
                let getMiladiDateTime = new Date(getMiladiDate).getTime()
                let addExpirationDate = getMiladiDateTime + o.expiration * 86400000
                let tarikhe_etebar_js = addExpirationDate + 86400000
                tarikhe_etebar_js = new Date(tarikhe_etebar_js)
                // let sd = new Date(addExpirationDate).toLocaleDateString('fa-IR')
                let expiration_date = new Date(addExpirationDate)
                let year = expiration_date.getFullYear();
                let month = expiration_date.getMonth() + 1;
                let day = expiration_date.getDate();
                let jalali_expiration = AIODate().toJalali({date:[year,month,day]});
                jalali_expiration = `${jalali_expiration[0]}/${jalali_expiration[1]}/${jalali_expiration[2]}`
                if(o.mobile_poster) {
                    o.mobile_poster = `${hostName}${o.mobile_poster}`
                }
                let az_tarikh, ta_tarikh 
                if (o.event_start_date && o.event_end_date){
                //به دست آوردن تاریخ های 
                az_tarikh = getDateAndTime(o.event_start_date);
                az_tarikh = `${az_tarikh.date}/${az_tarikh.time.replace('Z', '').replace(/:/g, '').replace(/00/g, '')}`;
                ta_tarikh = getDateAndTime(o.event_end_date);
                ta_tarikh = `${ta_tarikh.date}/${ta_tarikh.time.replace('Z','').replace(/:/g, '').replace(/00/g, '')}`;
                // created_at = new Date(created_at).toLocaleDateString('fa-IR')
                }


                // برای تبدیل تاریخ میلادی به شمسی
                // let expired_at = new Date(o.created_at).toISOString(o.created_at).replace('T', ' ').replace('Z', '')
                // created_at = `${new Date(created_at).toLocaleDateString('fa-IR')}`

                // اختلاف بازه بین تاریخ ایحاد و تاریخ اعتبار
                // let tarikhe_ijad = new Date(o.created_at).getTime()
                // let tarikhe_etebar = new Date().getTime()
                // let  msBetweenDates = Math.abs(tarikhe_etebar - tarikhe_ijad);
                // let hoursBetweenDates = msBetweenDates / (1000 * 3600 * 24);
                return {
                    id: o.id,
                    name: o.name,
                    tarikhe_ijad: date,
                    // tarikhe_etebar: expiration_date,
                    tarikhe_etebar: jalali_expiration,
                    tarikhe_etebar_js: tarikhe_etebar_js,//برای محاسبات لازم داریم
                    expiredDate: expiration_date,
                    faal: o.is_active,
                    dastresi_ha:[],
                    poster: o.mobile_poster,
                    name_davatname: o.name,
                    matne_payamak: o.sms_template,
                    matne_davatname: o.text_template,
                    emkane_davat: o.can_others_invite,
                    ersale_mostaghim: o.is_redirect_to_landing_page,
                    lat: o.latitude,
                    long: o.longitude,
                    adrese_ghorfe: o.event_address,
                    landing_page: o.landing_page_link,
                    nazdik_tarin_brt: o.brt_station_name,
                    nazdik_tarin_metro: o.metro_station_name,
                    az_tarikh: az_tarikh,
                    ta_tarikh: ta_tarikh,
                }
            })
            return resMapping
        },

        // ********************* طراحی دعوتنامه **********************
      
      async zakhire_tarahi_davatname({mode,model,karbarane_daraye_dastresi}){
            //mode: 'save' | 'draft'
            //model: آبجکت پر شده در فرم 
                //name_davatname(string)
                //tarikhe_etebar(string)
                //landing_page(string)
                //matne_payamak(string)
                //matne_davatname(string)
                //poster(file object)
                //ersale_mostaghim(boolean)
                //emkane_davat(boolean)
            //karbarane_daraye_dastresi: آرایه ای از آی دی کاربران
            
            //return 'خطایی رخ داد';
            let userInformation = getState().userInformation

            let res;
            url = `${invitationTemplateUrl}?username=${userInformation.username}`
            let is_draft;
            let jalali_start_event;
            let miladi_start_event;
            let jalali_end_event;
            let miladi_end_event;
            if(mode == 'draft'){is_draft = true}else{is_draft = false}

            // به دست آوردن اختلاف روز بین امروز و تاریخ اعتبار
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            let today = new Date().toLocaleDateString('fa-IR-u-nu-latn'); //تاریخ امروز به فارسی با حروف لاتین
            const firstDate = new Date(today);
            const secondDate = new Date(model.tarikhe_etebar);
            const diffDays = Math.round(Math.abs((secondDate - firstDate) / oneDay));
            const expiration_date = new Date(model.tarikhe_etebar).toLocaleDateString('en-US') //todo

            //تبدیل تاریخ و ساعت شروع و پایان کار رویداد به فرمت میلادی 
            if(model.az_tarikh && model.ta_tarikh){
                try{
                    // jalali_start_event = model.az_tarikh.split('/')
                    // jalali_start_event = jalali_start_event.map((o) =>{ return +o})
                    // miladi_start_event = AIODate().toGregorian({date:`${jalali_start_event[0]}/${jalali_start_event[1]}/${jalali_start_event[2]}`})
                    // miladi_start_event = `${miladi_start_event[0]}-${miladi_start_event[1]}-${miladi_start_event[2]} ${jalali_start_event[3]}:00:00` // convert to datetime field
                    miladi_start_event = isoDate(model.az_tarikh)

                    // jalali_end_event = model.ta_tarikh.split('/')
                    // jalali_end_event = jalali_end_event.map((o) => { return +o })
                    // miladi_end_event = AIODate().toGregorian({date:`${jalali_end_event[0]}/${jalali_end_event[1]}/${jalali_end_event[2]}`})
                    // miladi_end_event = `${miladi_end_event[0]}-${miladi_end_event[1]}-${miladi_end_event[2]} ${jalali_end_event[3]}:00:00`
                    miladi_end_event = isoDate(model.ta_tarikh)
                    
                }
                catch{
                    return 'لطفا فیلد های مورد نیاز را تکمیل کنید'
                }
            }
            // let user = {
            //     username: "a.moghimi",
            //     roles: ["admin", "user"]
            // }
            if (model.landing_page == ""){
                model.landing_page = undefined
            }
            let apiBody = {
                id: model.id,
                template_id: model.id,
                name: model.name_davatname,
                // url: model.landing_page, // لینک 
                sms_template: model.matne_payamak, // متن پیامک
                text_template: model.matne_davatname, // متن دعوتنامه
                expiration_date: isoDate(model.tarikhe_etebar), // تاریخ اعتبار
                latitude: model.lat.toFixed(6), // latitude
                longitude: model.long.toFixed(6), // longitude
                // mobile_poster: model.poster,
                event_address: model.adrese_ghorfe,
                event_start_date : miladi_start_event, 
                // event_start_date : isoDate(model.az_tarikh), 
                event_end_date: miladi_end_event,
                // event_end_date: isoDate(model.ta_tarikh),
                landing_page_link: model.landing_page, // لینک لندینگ پیج
                brt_station_name: model.nazdik_tarin_brt,
                metro_station_name: model.nazdik_tarin_metro,
                can_others_invite: model.emkane_davat,
                is_active: true,
                is_draft: is_draft,
                is_redirect_to_landing_page: model.ersale_mostaghim,
                user: userInformation,
            }
            if (model.poster != false){
                apiBody["mobile_poster"] = model.poster
            }
            debugger
            let formData = new FormData();
            for (const key in apiBody) {
                if(apiBody[key] != undefined){
                    if(key === 'user'){
                        formData.append(key, JSON.stringify(apiBody[key]))    
                    }
                    else{
                        formData.append(key, apiBody[key])
                    }
                }
                console.log(`${key}`, apiBody[key])
            }

            // تغییر دعوتنامه
            if(mode == 'edit'){  // تمامی اطلاعاتی که سمت کلاین رفته دریافت می گردد
                let check_desktop_poster = formData.get('desktop_poster')
                if(!check_desktop_poster.name){ // اگر فایلی آپبود نشود باید تصویر موجود از قبل را از فرم دیتا پاک کرد تا به اررور نخوریم
                    formData.delete('desktop_poster')
                    formData.delete('mobile_poster')
                }
                try{
                    res = await Axios.put(url, formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        }
                    })
                }
                catch(err){
                    debugger
                    return 'خطایی در تغییر این دعوتنامه رخ داد'
                } 
                return true
            }
            else{
                try{
                    res = await Axios.post(url, formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        }
                    })
                }
                catch(err){
                    if(err.response){
                        if(err.response.data){
                            if(err.response.data.error){
                                return err.response.data.error.errorMessage
                            }
                            if(err.response.data.message){
                                return err.response.data.message
                            }
                            else{
                                debugger
                                return 'فیلد های مورد نیاز را تکمیل کنید'
                            }
                        }
                        else {
                            return 'خطای نامشخص'
                        }
                    }
                    return 'خطایی در ثبت دعوتنامه رخ داد'
                }
                return true
            }
            //return 'خطایی رخ داد';
            return true
        },

        // ********************* ارسال تکی **********************
        async ersale_taki({model,davatname_haye_entekhab_shode}){
            //model: آبجکت پر شده در فرم مشخصات مدعو 
                //nam(string)
                //name_khanevadegi(string)
                //shomare_tamas(string)
                //jensiat('male' | 'female')
                //sherkat(string)
                //semat(string)
            //davatname_haye_entekhab_shode: آرایه ای از آی دی دعوتنامه های انتخاب شده
            
            //return 'خطایی رخ داد';
            let userInformation = getState().userInformation
            url = `${ersalTakiUrl}?username=${userInformation.username}`
            let res;
            let role
            let gender;
            let template_id = ''
            // let user = {
            //     username: "a.moghimi",
            //     roles: ["admin", "user"]
            // }
            if (davatname_haye_entekhab_shode.length == 0){
                return 'لیست دعوتنامه خالی است'
            }

            // davatname_haye_entekhab_shode.map((o) =>{
            //     template_id += o
            //     template_id += ' '
            // })
            if(model.jensiat == 'male'){gender = 'M'}else{gender = 'F'}
            if(userInformation.roles.indexOf('admin') !== -1){
                role = 'admin'
            }
            else{
                role = 'user'
            } 

            let urlParams = {
                first_name: model.nam,
                last_name: model.name_khanevadegi,
                company_name: model.sherkat,
                phone_number: model.shomare_tamas,
                gender: gender,
                username: userInformation.username, //باید اطلاعات یوزر را بگیرم
                // template_id: template_id, //davatname_haye_entekhab_shode
                template_ids: davatname_haye_entekhab_shode, //davatname_haye_entekhab_shode
                role: role, // نقش کاربری که ارسال میکند
                user: userInformation
            }
            try{
                res = await Axios.post(url, urlParams)
            }
            catch(err){
                return "خطایی در ثبت دیتا ها رخ داد"
            }
            //return 'خطایی رخ داد';
            return true
        },

        // ********************* ارسال گروهی **********************
        async ersale_goroohi({excel,davatname_haye_entekhab_shode}){
            //davatname_haye_entekhab_shode: آرایه ای از آی دی دعوتنامه های انتخاب شده
            //excel(فایل اکسل آپلود شده)
            //return 'خطایی رخ داد';
            
            //////// ارسال لیست خطا و تعداد موفق آمیز///////////////
            // return {
            //     successLength:12,
            //     errorList:[
            //         {name:'محمد شریف فیض',phone:'09123534314',error:'خطایی رخ داد'},
            //         {name:'محمد شریف فیض',phone:'09123534314',error:'خطایی رخ داد'},
            //         {name:'محمد شریف فیض',phone:'09123534314',error:'خطایی رخ داد'},
            //         {name:'محمد شریف فیض',phone:'09123534314',error:'خطایی رخ داد'}
            //     ]
            // }
            ///////////////////////
            let userInformation = getState().userInformation


            url = `${excellImport}?username=${userInformation.username}`
            let res;
            let role;
            let successMessage;
            let errorMessage;
            let template_id = '';
            if (davatname_haye_entekhab_shode.length == 0){
                return 'لیست دعوتنامه خالی است'
            }
            // davatname_haye_entekhab_shode.map((o) =>{
            //     template_id += o
            //     template_id += ' '
            // })

            if(userInformation.roles.indexOf('admin') !== -1){
                role = 'admin'
            }
            else{
                role = 'user'
            } 
            let we = davatname_haye_entekhab_shode
            debugger
            let formData = new FormData();
            formData.append('file', excel)
            // formData.append('template_ids', template_id)
            formData.append('template_ids', davatname_haye_entekhab_shode)
            formData.append('username', userInformation.username) // username باید از کاربر گرفته شود
            formData.append('role', role) // با توجه به نقش کاربری که دارد ارسال گروهی را انجام می دهد.
            
            try{
                res = await Axios.post(url, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    }
                })
            }
            catch(err){
                debugger
                return 'خطایی رخ داد'
            }
            if (res.data.invalid_count != 0){
                errorMessage = `${res.data.invalid_count} مورد ناموفق ثبت شد `
                successMessage = `${res.data.valid_count} مورد موفق ثبت شد`

                // return `${errorMessage}
                // و
                // ${successMessage}`
            }
            let errorList = []
            res.data.invalid_data.map((o) => {
                errorList.push({
                    name: `${o.first_name} ${o.last_name}`,
                    phone: o.phone_number,
                    error: o.description,
                })
            })
            let resMapping={
                successLength: res.data.valid_count,
                errorList: errorList,
            }

            return resMapping
        },

        // ********************* تائید  **********************
        async taid({state,selected}){
            //state (false | true) برای تایید یا عدم تایید
            //items (array of objects) دعوت نامه های انتخاب شده برای تایید یا عدم تایید 
            //return 'خطایی پیش آمده'
            let res;
            let invitation_ids;
            invitation_ids = ''
            selected.map((o) => {
                invitation_ids += o.id
                invitation_ids += ' '
            })
            let url = `${InvitatonsConfirm}?invitation_ids=${invitation_ids}`

            if(state == true){
                
                try {
                    res = await Axios.get(url)
                }
                catch(err){
                    return 'خطایی در تائید موارد انتخاب شده رخ داده است'
                }
                if (res.data){
                    if(res.data.is_success == true){
                        return true
                    }
                }
                // return true
            }
            else{
                return true
                // return 'این موارد در حال حاظر عدم تائید هستند'
            }
        },

        // ****************تغییر دعوتنامه ************************
        async taghire_davatname({object,state}){
            //state -> نشان دهنده این است که قالب را فعال یا غیر فعال کرده است.
            let userInformation = getState().userInformation

            
            let url = `${invitationTemplateUrl}`
            let res
            let apiBody = {
                template_id: object.id,
                is_active: state,
                user: userInformation,
            }

            try{
                res = await Axios.put(url, apiBody)
                return true
            }
            catch(err){
                return 'خطایی در تغییر این دعوتنامه رخ داد'
            } 
        },

        // ********************* ارسال مجدد **********************
        async ersale_mojadad(davatname_haye_entekhab_shode){
            //davatname_haye_entekhab_shode: آرایه ای از آی دی دعوتنامه های انتخاب شده
            let ersale_mojadad_array = []
            for(let prop in davatname_haye_entekhab_shode){
                if(davatname_haye_entekhab_shode[prop] == true){
                    ersale_mojadad_array.push(prop)
                }
            }
            let res;
            let url = `${sendAgain}`
            let apiBody = {
                invitation_ids: ersale_mojadad_array
            }
            try{
                res = await Axios.post(url, apiBody)
                if (res.data.is_success == true){
                    return true
                }
                return true
            }
            catch(err){
                return 'خطا در ارسال مجدد'
            }
        },

        // ************ارسال مجدد *****************
        async ersale_mojadade_khatahaye_excel({model}){
            //return 'مشکلی پیش آمده'
            // return {successLength:4,errorList:[]}
            return ' در حال حاضر امکان استفاده از ارسال مجدد موجود نمیباشد،فایل را اصلاح کرده و دوباره ارسال کنید'
        },
        async hazfe_davatname(obj){
            return true
        }
    } 
}