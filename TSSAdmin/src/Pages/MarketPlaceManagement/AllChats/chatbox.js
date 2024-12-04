import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Cookies from "js-cookie";
import CloseIcon from '@mui/icons-material/Close';
import { url3 } from "../../../UI/port";

const ChatBox = ({ onClose, name, status, tid, page, msg, seller_id ,lid,umid}) => {
    // console.log(msg);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [chatstatus , setChatStatus] = useState("");

    useEffect(() => {
       
    }, [seller_id])
    const [newChat, setNewChat] = useState([]);
    useEffect(()=>{
        const handleChatClick = async (umid, lid) => {
            try {
                setNewChat(null);
                // const response = await axios.get(`http://139.59.236.50:8080/api/view_Product?pid=${pid}`, {
                //     headers: {
                //         "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                //     },
                const response = await axios({
                    method: "get",
                    url: `${url3}/get_chats_listing?mid=${umid}&lid=${lid}`,
                    headers: {
                        "Content-Type": "application/json",
          
                    },
                });
                // console.log(response.data.chat_messages);
                setMessages(response.data.chat_messages);
                setChatStatus(response.data.status);
                // dispatch(getCart(mid));
               
            }
            catch (error) {
                // console.log(error);
            }
          }
          handleChatClick(umid,lid);

    },[umid])
    

    const [isOpen, setIsOpen] = useState(true);
    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes}${ampm}`;
    }
    const navigate = useNavigate();
    // var flag=true;

    const handleClose = () => {
        // console.log("close");
        setIsOpen(false);
        onClose();
        // flag=false;
    };
    // console.log("Open");

    if (!isOpen) {
        // setIsOpen(true)
        return null; // Return null if isOpen state is false to hide the component
    }


    return (
        <div
            style={{
                zIndex: 1000,
                position: "fixed",
                width: "25rem",
                height: "75vh",
                right: "0px",
                bottom: "20px",
                background: "#FFFFFF",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: '10px',
            }}
            className=" pb-10"
        >
            <div className="h-full overflow-y-auto scrollbar-hide cursor-default" id='chat-scroller'>
                <div className="bg-white sticky top-0">
                    <div className="flex justify-between px-3 pt-5">
                        <div className="flex gap-3">
                            <div className="font-bold">Chat Details</div>
                        </div>
                        <div>
                            <CloseIcon onClick={handleClose} className="font-bold cursor-pointer">
                            </CloseIcon>
                        </div>
                    </div>

                    <div className="pl-3 pr-3 py-2">
                        <div className="flex items-center " style={{}}>
                            <img
                                src="/images/profile.jpg"
                                alt=""
                                style={{
                                    height: "45px",
                                    marginRight: "15px",
                                    borderRadius: "50px",
                                }}
                            />
                            <div>
                                <div className="text-sm font-bold">{name}</div>
                                <div className="text-xs text-gray-500 ">Status: {chatstatus}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div
                    className="p-3 "
                    style={{
                        height: "100%",
                    }}
                >
                    {/* Backend Side Messages */}
                    {messages.map((message, index) => (
                        <>
                            {
                                message.mid == seller_id ? (
                                    <div key={index} className="ms-auto" style={{ width: "80%", paddingBottom: "10px" }}>
                                        <div
                                            className="flex items-center ms-auto justify-end"
                                            style={{
                                                backgroundColor: "#2B2B2B",
                                                color: "white",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                paddingLeft: "10px",
                                                boxSizing: "border-box",
                                                wordWrap: "break-word",
                                                paddingRight: "10px",
                                                paddingTop: "7px",
                                                paddingBottom: "7px",
                                                width: "fit-content",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {message.msg}
                                        </div>
                                        <div
                                            className="text-gray-500 ms-auto text-right"
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            {message.date} {message.time}
                                        </div>
                                    </div>
                                ) : (
                                    <div key={index} style={{ width: "80%", paddingBottom: "15px" }}>
                                        <div
                                            className="flex items-center"
                                            style={{
                                                backgroundColor: "#c93a0e",
                                                color: "white",
                                                borderRadius: "6px",
                                                fontSize: "14px",
                                                paddingLeft: "10px",
                                                boxSizing: "border-box",
                                                wordWrap: "break-word",
                                                paddingRight: "10px",
                                                paddingTop: "7px",
                                                paddingBottom: "7px",
                                                width: "fit-content",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {message.msg}
                                        </div>
                                        <div
                                            className="text-gray-500"
                                            style={{ fontSize: "12px", paddingLeft: "8px" }}
                                        >
                                            {message.date} {message.time}
                                        </div>
                                    </div>

                                )
                            }
                        </>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default ChatBox;
