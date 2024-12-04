import React,{useEffect} from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserLogin } from "../../Pages/User_Management/features/userSlice";

const TopHeader = (props) => {
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const name = LuserData.uname;
  const role = LuserData.role;
  const pic = LuserData.pic_url;
  const handleChange = (e) => {
    props.setTimeframe(e.target.value);
};

// console.log(LuserData);
  return (
    <div
      className="ml-72 w-full h-20 fixed bg-white"
      style={{ marginLeft: "17.3rem", zIndex:"9" }}>
      <div className="ml-3 flex h-20 items-center justify-between">
        <div className="text-2xl font-semibold">{props.head}</div>
        {props.head=="Dashboard"?
        <div className="mt-5 mr-5" style={{marginLeft:530,marginBottom:30}}>
                <label htmlFor="timeframe"><b>Select Timeframe:</b></label>
                <select id="timeframe"  value={props.timeframe} onChange={handleChange}>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
            </div>:null}
        <div
          className="flex h-20 items-center cursor-pointer"
          style={{ marginRight: "20rem" }}>
          <img
            src={pic}
            alt=""
            style={{
              objectFit:'cover',
              objectPosition:'center',
              height: "60px",
              marginRight: "15px",
              borderRadius: "50%",
              width: "60px"
            }}
          />
          <div>
            <div className="text-xl font-bold">{name}</div>
            <div className="text-sm font-semibold">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
