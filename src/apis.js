// var jalaali = require('jalaali-js')
const hostName = `http://localhost:8000`
let url;
let res;
//آدرس برای ساخت تمپلیت و ولیدیت کردن و همچنین بررسی اینکه آیا آن تمپلیت فعال است یا خیر
const invitationTemplateUrl = `${hostName}/invitation/v1/template`

const excellImport = `${hostName}/guest/`

const ersalTakiUrl = `${hostName}/guest/ersaletaki`

const show_all_invitation = `${hostName}/invitation/show_all`


export default function apis({Axios}){

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
            url = `${show_all_invitation}?username=m.shad`
            
            try{
                res = await Axios.get(url)
            }
            catch(err){
                // debugger
                return []
            }
            let resMapping = res.data.map((o) => {
                // let i = 1
                return {
                    davat_shode: '',
                    davat_konande: '',
                    name_davatname: '',
                    zamane_davat: '',
                    id: '',
                }
                // i++
            })
            // debugger

        },

        // ************************** تاریخچه ***********************
        async tarikhche(){
            return [
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:0,status:'0',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:1,status:'1',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:2,status:'2',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:3,status:'3',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:4,status:'4',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:5,status:'0',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:6,status:'1',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:7,status:'2',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:8,status:'3',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:9,status:'4',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:10,status:'0',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:11,status:'1',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:12,status:'2',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:13,status:'3',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:14,status:'4',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
                {davat_shode:'علی احمدی',davat_konande:'حسین رحمتی',name_davatname:'نمایشگاه صنعت برق',zamane_davat:'1401/08/10 ساعت 10:42',id:15,status:'0',shomare_tamase_davat_shode:'09123534314',date:new Date().getTime() - (60 * 60 * 60 * 1000)},
            ]
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
            // debugger
            try{
                res = await Axios.get(url)
            }
            catch(err){
                debugger
                return []
            }
            let resMapping = res.data.map((o) =>{
                let created_at = new Date(o.created_at).toISOString(o.created_at).replace('T', ' ').replace('Z', '')
                created_at = `${new Date(created_at).toLocaleDateString('fa-IR')}`
                let expired_at = new Date(o.created_at).toISOString(o.created_at).replace('T', ' ').replace('Z', '')
                created_at = `${new Date(created_at).toLocaleDateString('fa-IR')}`

                return {
                    name: o.name,
                    id: o.id,
                    tarikhe_ijad: o.created_at,
                    tarikhe_etebar: o.created_at,
                    faal: true,
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
            let is_draft;
            if(mode == 'draft'){is_draft = true}else{is_draft = false}

            // به دست آوردن اختلاف روز بین امروز و تاریخ اعتبار
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            let today = new Date().toLocaleDateString('fa-IR-u-nu-latn'); //تاریخ امروز به فارسی با حروف لاتین
            const firstDate = new Date(today);
            const secondDate = new Date(model.tarikhe_etebar);
            const diffDays = Math.round(Math.abs((secondDate - firstDate) / oneDay));
            const expiration_date = new Date(model.tarikhe_etebar).toLocaleDateString('en-US') //todo

            let user ={
                username: "a.moghimi",
                roles: ["admin", "user"]
            }

            let apiBody = {
                name: model.name_davatname,
                link: model.landing_page,
                sms_template: model.matne_payamak,
                expiration: diffDays,
                is_draft: is_draft,
                mobile_poster: model.poster,
                desktop_poster: model.poster,
                user: user ,
                expiration_date: model.tarikhe_etebar,
                can_others_invite: model.emkane_davat,
                redirect_to_landing_page: model.ersale_mostaghim
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
            
            // debugger
            try{
                res = await Axios.post(url, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    }
                })
            }
            catch(err){
                debugger
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
            let urlParams = {
                first_name: model.nam,
                last_name: model.name_khanevadegi,
                company_name: model.sherkat,
                phone_number: model.shomare_tamas,
                gender: model.jensiat,
                username: 'm.shad', //باید اطلاعات یوزر را بگیرم
                template_id: 8, //davatname_haye_entekhab_shode
            }
            debugger

            try{
                res = await Axios.post(url, urlParams)
            }
            catch(err){
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
            let formData = new FormData();
            formData.append('file', excel)
            formData.append('username', 'm.shad') // username باید از کاربر گرفته شود
            // formData.append('template_id', JSON.stringify([]))
            debugger
            try{
                res = await Axios.post(url, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    }
                })
            }
            catch(err){
                return 'خطایی رخ داد'
            }
            debugger
            return true
        },

        // ******************* تائید **************
        taid({state, items}){
            //state (false | true) برای تایید یا عدم تایید
            //items (array of objects) دعوت نامه های انتخاب شده برای تایید یا عدم تایید 
            //return 'خطایی پیش آمده'
            return true
        }
    } 
}