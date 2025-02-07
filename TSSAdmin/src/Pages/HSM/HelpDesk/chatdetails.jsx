import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { io } from "socket.io-client";
import { tssurl, wss } from "../../../UI/port";

const Chatdetails = ({ onClose, name, status, tid, page, uid }) => {
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [socket, setSocket] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socketinit = io(wss);

    socketinit.on("connect", () => {
      console.log("Successfully connected to the socket server");
    });

    socketinit.on("connect_error", (err) => {
      console.log("Socket connection error:", err);
    });
    setSocket(socketinit);

    socketinit.on("receive_message", (data) => {
      console.log("asjdchbvjhjhdvbs", data);

      if (data.tid === tid) {
        setMessages((prevMessages) => ([...prevMessages, data]));
        let scroller = document.getElementById("chat-scroller");
        setTimeout(() => {
          scroller.scrollTo(0, scroller.scrollHeight);
        }, 500);
      }
    });

    return () => socketinit.disconnect();
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const messageData = {
      tid: tid,
      uid: uid,
      msg: inputValue,
      role: "admin",
    };

    socket.emit("send_message", messageData);

    setInputValue("");
    let scroller = document.getElementById("chat-scroller");
    setTimeout(() => {
      scroller.scrollTo(0, scroller.scrollHeight);
    }, 500);
  };

  const raw = {
    tid: tid,
  };
  const handlegetmsg = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl}/ticket/getticket`,
        data: raw,
        headers: {
          "Content-Type": "application/json"
        },
      });
      setMessages(response.data?.ticket?.messages);
      let scroller = document.getElementById("chat-scroller");
      setInputValue("");
      setTimeout(() => {
        scroller.scrollTo(0, scroller.scrollHeight);
      }, 500);
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchFooterData = async () => {
      await handlegetmsg();
    };
    fetchFooterData();
  }, []);

  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    console.log("close");
    setIsOpen(false);
    onClose();
  };
  console.log("Open");

  if (!isOpen) {
    return null;
  }

  const handleCloseTicket = async () => {
    try {
      const body = {
        tid: tid,
      };
      await axios.post(
        `${tssurl}/ticket/closeticket`,
        body
      );
      setIsInputDisabled(true);
      window.location.reload();
    } catch (error) {
      console.log("Failed");
      console.log(error);
    }
  };

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
        borderRadius: "10px",
      }}
      className=" pb-10"
    >
      <div className="h-full overflow-y-auto scrollbar-hide" id="chat-scroller">
        <div className="bg-white sticky top-0">
          <div className="flex justify-between px-3 pt-5">
            <div className="flex gap-3">
              <div className="font-bold">Chat Details</div>
            </div>
            <div>
              <Button
                color="error"
                variant="contained"
                size="small"
                onClick={handleCloseTicket}
              >
                Close Ticket
              </Button>
              <CloseIcon
                onClick={handleClose}
                className="font-bold cursor-pointer"
              ></CloseIcon>
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
                <div className="text-xs text-gray-500 ">Status: {status}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-3 "
          style={{
            maxHeight: "70%",
          }}
        >
          {/* Backend Side Messages */}

          {messages?.length > 0 ? (
            messages?.map((message, index) => (
              <>
                {message.role == "user" ? (
                  <div style={{ width: "80%", paddingBottom: "15px" }}>
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
                      {message?.message}
                    </div>
                    <div
                      className="text-gray-500"
                      style={{ fontSize: "12px", paddingLeft: "8px" }}
                    >
                      {message?.date} {message?.time}
                    </div>
                  </div>
                ) : (
                  <div
                    className="ms-auto"
                    style={{ width: "80%", paddingBottom: "10px" }}
                  >
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
                      {message.message}
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
                )}
              </>
            ))
          ) : (
            <div className="text-lg text-stone-500 text-center justify-center items-center flex h-full w-full">
              Loading...
            </div>
          )}
        </div>
      </div>
      {page == "allChats" ? (
        <></>
      ) : (
        <>
          <div
            className="p-3 bg-white flex justify-between items-center"
            style={{ position: "sticky", bottom: 0 }}
          >
            <input
              className="bg-gray-200"
              style={{
                width: "320px",
                height: "40px",
                borderRadius: "60px",
                outline: "none",
                paddingLeft: "10px",
              }}
              disabled={isInputDisabled}
              type="text"
              placeholder="Type here..."
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              required
            />
            <button
              className="ms-4 p-5 rounded-full flex items-center justify-center bg-black cursor-pointer"
              style={{
                border: "1px solid",
                height: "30px",
                width: "30px",
                color: "white",
              }}
              disabled={isInputDisabled}
              onClick={handleSendMessage}
            >
              <SendIcon className="ms-0.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatdetails;