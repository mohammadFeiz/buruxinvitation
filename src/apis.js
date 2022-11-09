import AIODate from "aio-date";

const hostName = `http://localhost:8000`
let url;
let res;
let user_name = 'm.shad' // یا 'm.shad'
let user_name_role = 'admin'  // یا'user'
//آدرس برای ساخت تمپلیت و ولیدیت کردن و همچنین بررسی اینکه آیا آن تمپلیت فعال است یا خیر
const invitationTemplateUrl = `${hostName}/invitation/v1/template`

const excellImport = `${hostName}/guest/` //ارسال گروهی

const ersalTakiUrl = `${hostName}/guest/ersaletaki/` // ارسال تکی

const showAllInvitation = `${hostName}/invitation/show_all` //تاریخچه
const ShowAllNotVerified = `${hostName}/invitation/show/` //لیست نیاز به تائید من 

//با متد گت این ای پی آی تائید انجام می شود
const  InvitatonsConfirm = `${hostName}/invitation/v1/invitaton/` 


export default function apis({Axios,getDateAndTime}){

    return {

        // *************** نیاز به تائید من *****************
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
            let created_at;
            try {
                res = await Axios.get(url)
                // debugger
            }
            catch(err){
                debugger
                return []
            }

            let resMapping = res.data.data.map((o) => {
                created_at = new Date(o.created_at).toISOString(o.created_at).replace('T', ' ').replace('Z', '')
                created_at = `${new Date(created_at).toLocaleTimeString('fa-IR')} ${new Date(created_at).toLocaleDateString('fa-IR')}`
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
                    zamane_davat: created_at,
                }
            })
            debugger
            return resMapping
        },

        // ************************** تاریخچه ***********************
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
            // debugger
            url = `${showAllInvitation}?username=m.shad`
            let status;
            let created_at;
            let res;
            
            try{
                res = await Axios.get(url)
                // debugger
            }

            catch(err){
                debugger
                return []
            }
            // debugger
                        // {davat_shode:'علی احمدی',
            // davat_konande:'حسین رحمتی',
            // name_davatname:'نمایشگاه صنعت برق',
            // zamane_davat:'1401/08/10 ساعت 10:42',
            // id:15,status:'0',
            // shomare_tamase_davat_shode:'09123534314',
            // date:new Date().getTime() - (60 * 60 * 60 * 1000)}
            let resMapping = res.data.data.map((o) => {
                //به دست آوردن تایم به صورت فارسی

                // به دست آوردن اختلاف زمانی برای تشخیص اینکه منقضی شده است یا خیر
                let created = new Date(o.created_at).getTime()
                const now = new Date().getTime()
                const msBetweenDates = Math.abs(created - now);
                const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

                if(hoursBetweenDates > 24 && o.state == 'S'){status = '3'} // منقضی شده 
                else if(o.state == 'N'){status = '0'} // در انتظار تائید
                else if(o.state == 'S'){status = '1'} //ارسال شده
                else if(o.state == 'O'){status = '2'} // مشاهده شده
                else if(o.state == 'U'){status = '4'} // خطا
                else{status = '3'} // منقضی شده 
                return {
                    id: o.id,
                    davat_shode: `${o.guest.first_name} ${o.guest.last_name}`,
                    davat_konande: `${o.user.first_name} ${o.user.last_name}`,
                    name_davatname: `${o.template.name}`,
                    shomare_tamase_davat_shode: `${o.guest.phone_number}`,
                    zamane_davat: created_at,
                    status: status,
                    date: new Date(o.created_at).getTime()
                }
            })
            return resMapping
            
        },

        // ***************** یوزر *****************
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

        // ******************* دعوتنامه ها *******************
        async davatname_ha(){
            // return [
            //     {name:'نمایشگاه صنعت برق',id:'0',tarikhe_ijad:'1401/3/3',tarikhe_etebar:'1401/4/3',faal:true,dastresi_ha:['مهدی شاد','محمد فیض']},
            //     {name:'همایش آبان ماه 1401',id:'1',tarikhe_ijad:'1401/3/3',tarikhe_etebar:'1401/4/3',faal:false,dastresi_ha:['مهدی شاد','محمد فیض']},
            //     {name:'همایش آبان ماه 1401',id:'2',tarikhe_ijad:'1401/3/3',tarikhe_etebar:'1401/4/3',faal:true,dastresi_ha:['مهدی شاد','محمد فیض']}
            // ]
            let url = `${invitationTemplateUrl}`
            let res;
            try{
                res = await Axios.get(url)
            }
            catch(err){
                debugger
                return []
            }
            let resMapping = res.data.map((o) =>{
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
                let expiration_date = new Date(addExpirationDate).toLocaleDateString('fa-IR')
                // created_at = new Date(created_at).toLocaleDateString('fa-IR')

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
                    tarikhe_etebar: expiration_date,
                    expiredDate: expiration_date,
                    faal: o.is_active,
                    dastresi_ha:[]
                }
            })
            // debugger
            return resMapping

        },

        // ******************* ذخیره طراحی دعوتنامه *******************
        async zakhire_tarahi_davatname({mode, model, karbarane_daraye_dastresi}){
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
            
            url = `${invitationTemplateUrl}`
            let res;
            let is_draft;
            if(mode == 'draft'){is_draft = true}else{is_draft = false}

            // به دست آوردن اختلاف روز بین امروز و تاریخ اعتبار
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            let today = new Date().toLocaleDateString('fa-IR-u-nu-latn'); //تاریخ امروز به فارسی با حروف لاتین
            const firstDate = new Date(today);
            const secondDate = new Date(model.tarikhe_etebar);
            const diffDays = Math.round(Math.abs((secondDate - firstDate) / oneDay));
            const expiration_date = new Date(model.tarikhe_etebar).toLocaleDateString('en-US') //todo

            let user = {
                username: "a.moghimi",
                roles: ["admin", "user"]
            }

            let apiBody = {
                name: model.name_davatname,
                // url: model.landing_page, // لینک 
                sms_template: model.matne_payamak, // متن پیامک
                text_template: model.matne_davatname, // متن دعوتنامه
                expiration: diffDays, // تعداد روز اعتبار
                is_draft: is_draft,
                mobile_poster: model.poster,
                desktop_poster: model.poster,
                user: user,
                // expiration_date: model.tarikhe_etebar,
                can_others_invite: model.emkane_davat,
                redirect_to_landing_page: model.ersale_mostaghim,
                geo_data: `${model.lat},${model.long}`, // موقعیت 
                address_event: model.adrese_ghorfe,
                start_event : '',
                end_event: '',
                landing_page_link: model.landing_page, // لینک لندینگ پیج

            }
            let formData = new FormData();
            for (const key in apiBody) {
                if(key === 'user'){
                    formData.append(key, JSON.stringify(apiBody[key]))    
                }
                else{
                    formData.append(key, apiBody[key])
                }
                console.log(`${key}`, apiBody[key])
            }
             
            debugger
            try{
                res = await Axios.post(url, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    }
                })
            }
            catch(err){
                debugger
                if(err.response){
                    if(err.response.data){
                        if(err.response.data.error){
                            return err.response.data.error.errorMessage
                        }
                        else{
                            return 'فیلد های مورد نیاز را تکمیل کنید'
                        }
                    }
                    else {
                        return 'خطای نامشخص'
                    }
                }
                return 'خطایی در ثبت دعوتنامه رخ داد'
            }
            // debugger
            return true
            //return 'خطایی رخ داد';
            return true
        },


        // ******************** ارسال تکی *******************
        async ersale_taki({model, davatname_haye_entekhab_shode}){
            //model: آبجکت پر شده در فرم مشخصات مدعو 
                //nam(string)
                //name_khanevadegi(string)
                //shomare_tamas(string)
                //jensiat('male' | 'female')
                //sherkat(string)
                //semat(string)
            //davatname_haye_entekhab_shode: آرایه ای از آی دی دعوتنامه های انتخاب شده
            url = `${ersalTakiUrl}`
            let gender;
            let template_id = ''
            let user = {
                username: "a.moghimi",
                roles: ["admin", "user"]
            }
            if (davatname_haye_entekhab_shode.length == 0){
                return 'لیست دعوتنامه خالی است'
            }

            davatname_haye_entekhab_shode.map((o) =>{
                template_id += o
                template_id += ' '
            })
            if(model.jensiat == 'male'){gender = 'M'}else{gender = 'F'}

            let urlParams = {
                first_name: model.nam,
                last_name: model.name_khanevadegi,
                company_name: model.sherkat,
                phone_number: model.shomare_tamas,
                gender: gender,
                username: 'm.shad', //باید اطلاعات یوزر را بگیرم
                template_id: template_id, //davatname_haye_entekhab_shode
                role: 'user', // نقش کاربری که ارسال میکند
                user: user
            }
            debugger
            try{
                res = await Axios.post(url, urlParams)
                debugger
            }
            catch(err){
                debugger
                return "خطایی در ثبت دیتا ها رخ داد"
            }
            //return 'خطایی رخ داد';
            return true
        },

        // ******************** ارسال گروهی **********************
        async ersale_goroohi({excel, davatname_haye_entekhab_shode}){
            //davatname_haye_entekhab_shode: آرایه ای از آی دی دعوتنامه های انتخاب شده
            //excel(فایل اکسل آپلود شده)
            //return 'خطایی رخ داد';
            url = `${excellImport}`
            let res;
            let successMessage;
            let errorMessage;
            let template_id = '';
            if (davatname_haye_entekhab_shode.length == 0){
                return 'لیست دعوتنامه خالی است'
            }
            davatname_haye_entekhab_shode.map((o) =>{
                template_id += o
                template_id += ' '
            })

            let formData = new FormData();
            formData.append('file', excel)
            formData.append('username', 'm.shad') // username باید از کاربر گرفته شود
            formData.append('template_id', template_id)
            formData.append('role', 'admin') // با توجه به نقش کاربری که دارد ارسال گروهی را انجام می دهد.
            debugger
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
            if (res.data.number_of_falses != 0){
                debugger
                errorMessage = `${res.data.number_of_falses} مورد ناموفق ثبت شد `
                successMessage = `${res.data.number_of_trues} مورد موفق ثبت شد`

                return `${errorMessage}
                و
                ${successMessage}`
            }
            // if (res.data.number_of_falses == 0){
                
            // }
            debugger
            return true
        },

        // ******************* تائید **************
        async taid({state, selected}){
            //state (false | true) برای تایید یا عدم تایید
            //items (array of objects) دعوت نامه های انتخاب شده برای تایید یا عدم تایید 
            //return 'خطایی پیش آمده'

            // debugger
            
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
                    debugger
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

        }
    } 
}