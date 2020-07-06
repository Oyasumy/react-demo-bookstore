import Home from "./components/Home/Home";
import BanSach from "./containers/BanSachContainer";
import Sach from "./containers/SachContainer";
import NotFound from "./components/NotFound/NotFound";
import NhapSach from "./containers/NhapSachContainer";
const route=[
    {
        path:"/",
        main: Home,
        exact:true
    },{
        path:"/bansach",
        main: BanSach,
        exact:false
    },{
        path:"/nhapsach",
        main: NhapSach,
        exact:false
    },{
        path:"/sach",
        main: Sach,
        exact:false
    },{
        path:"",
        main: NotFound,
        exact:false
    }
]
export default route;