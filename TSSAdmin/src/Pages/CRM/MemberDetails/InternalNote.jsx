import { useState, useEffect } from "react";
import attachment from "./attachment.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SendNotes } from "../../User_Management/features/userSlice";
import { useNavigate } from "react-router-dom";
import { Internal_Notes } from "../../User_Management/features/userSlice";
import { VeiwMember } from "../../User_Management/features/userSlice";
import { Grid } from "react-loader-spinner";
import Cookies from "js-cookie";
import { getUserLogin } from "../../User_Management/features/userSlice";

const InputField = ({ mid }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file;

    const isImageOrPdf = /\.(jpg|jpeg|png|gif|pdf)$/i.test(file);
    if (!isImageOrPdf) {
      link.setAttribute("download", "attached_file");
    }

    link.click();
  }
  const userData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      await dispatch(Internal_Notes(mid));
      setLoading(false)
    };
    fetchUserData();
  }, [dispatch])

  const data1 = useSelector((state) => state.userManagement.Internal_Notes)
  // console.log(data1);
  // console.log(Internal_Notes);
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };



  const handleSendClick = async (event) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // console.log(file);
    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;

    event.preventDefault();

    const formData = new FormData();

    formData.append("msg", message);
    formData.append("date", formattedDate);
    formData.append("time", formattedTime);
    // formData.append("file", file);
    formData.append("msg_id" , " ");
    formData.append("readed" , false)
    formData.append("sender_uname", userData.uname);
    formData.append("sender_uid", localStorage.getItem('uid'));
    // formData.append("mid", mid);

    setLoading(true);
    await dispatch(SendNotes({ formData, mid }));
    // navigate("/home/customerRelationship`")
    await dispatch(VeiwMember(mid));
    await dispatch(Internal_Notes(mid));

    setLoading(false);
    setTimeout(() => {
      scroller.scrollTo(0, scroller.scrollHeight);
    }, 500);
    setMessage("");
    setFile(null);
  };
  let [scroller, setScroller] = useState();
  useEffect(() => {
    let scroller = document.getElementById('chat-scroller');
    scroller.scrollTo(0, scroller.scrollHeight);
    setScroller(scroller);
  }, [data1])

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      <div className="p-2 flex flex-col space-y-4  ">
        <div className="flex flex-col space-y-4 overflow-auto max-h-80 " id="chat-scroller">
          {data1.length > 0 ? data1.map((log, index) => (
            <div key={index} className="bg-[#EEEEEE] border p-4 rounded">
              <div className="flex justify-between">
                <div className="font-bold">Internal Note</div>
                <div>
                  {log.date}&ensp;{log.time}
                </div>
              </div>
              <div className="flex-between">
                <div className="mt-2">{log.msg}</div>
              </div>
              <div className="flex-between flex">
                {log.file_url && (
                  <div className="mt-4 flex gap-4 items-center">
                    <div className="font-bold">Attached File:</div>
                    <img
                      src='/images/file.png'
                      alt="Attached File"
                      width='50px'
                      className="mt-2 max-w-xs cursor-pointer"
                      onClick={() => handleDownload(log.file_url)}
                    />
                  </div>
                )}
                <div className="rounded-full self-end ms-auto mt-2 bg-white shadow px-4 py-2 w-fit flex"> {log.sender_uname} </div>
              </div>
            </div>
          )) : (<div style={{ textAlign: 'center', fontSize: '25px', color: 'gray' }}>No Conversation</div>)}
        </div>
        {userData.role == 'admin'  || userData.role == 'cr' ? (
          <div className="border flex space-x-6">
            <input
              type="text"
              placeholder="Write an internal note..."
              value={message}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-l"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-white px-4 py-4 rounded-none">
              <img className="w-6 h-6" src={attachment} alt="attachment" />
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleSendClick}
              className="hover:bg-[#c93a0e] bg-[#c93a0e] text-white px-8 py-4">
              Send
            </button>
          </div>
        ):null}
      </div>
    </>

  );
};

export default InputField;
