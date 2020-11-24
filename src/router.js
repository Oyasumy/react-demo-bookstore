import Home from "./components/Home/Home";
import BanSach from "./containers/BanSachContainer";
import Sach from "./containers/SachContainer";
import NotFound from "./components/NotFound/NotFound";
import NhapSach from "./containers/NhapSachContainer";
import ReportContainer from "./containers/ReportContainer";
import ChangeRules from "./components/ChangeRules/ChangeRules";
const route=[
    {
        path:"/",
        main: Home,
        exact:true
    }
    ,
    {
        path:"/react-demo-bookstore/",
        main: Home,
        exact:true
    }
    ,
    {
        path:"/bansach",
        main: BanSach,
        exact:false
    }
    ,{
        path:"/nhapsach",
        main: NhapSach,
        exact:false
    },{
        path:"/sach",
        main: Sach,
        exact:false
    },{
        path:"/report",
        main: ReportContainer,
        exact:false
    },{
        path:"/changerules",
        main: ChangeRules,
        exact:false
    },{
        path:"",
        main: NotFound,
        exact:false
    }
]
export default route;