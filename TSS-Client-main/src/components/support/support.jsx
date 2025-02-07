import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { IoMdSend } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import tssurl, { tssurl2, wss } from "../../port";
import { Offcanvas, Button } from "react-bootstrap";

function Support() {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [memData, setMemData] = useState([]);
  const [loadspin, setloadspin] = useState();
  const mid = localStorage.getItem("MID");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const socketinit = io(wss);

    setSocket(socketinit);
    socketinit.on("receive_message", (data) => {
      console.log("asjdchbvjhjhdvbs", data);
      if (data.tid === mid) {
        setChats((prevMessages) => ([...prevMessages, data]));

        let scroller = document.getElementById("chat-scroller");
        setTimeout(() => {
          scroller.scrollTo(0, scroller.scrollHeight);
        }, 500);
      }
    });
    return () => socketinit.disconnect();
  }, []);

  const fetchUserData = async () => {
    const resp = await axios.get(`${tssurl}/auth/users/${mid}`);
    setMemData(resp?.data?.user);
  };
  useEffect(() => {
    if (mid) {
      fetchUserData();
    }
  }, [mid]);

  const raw = {
    tid: mid,
  };

  const Opendialogbox = async () => {
    handleShow();

    // Correct it to scroll to bottom sdome random issue that is happening correct it 
    // let scroller = document.getElementById("chat-scroller");
    // setTimeout(() => {
    //   scroller.scrollTo(0, scroller.scrollHeight);
    // }, 500);
  }
  const fetchTicketData = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${tssurl2}/ticket/getticket`,
        data: raw,
        headers: {
          "Content-Type": "application/json"
        },
      });
      setChats(response.data.ticket.messages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTicketData();
  }, [memData]);

  const [subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  const handleSendMsg = () => {
    if (!Message.trim()) return;

    const messageData = {
      tid: mid,
      uid: mid,
      msg: Message,
      role: "user",
    };
    socket.emit("send_message", messageData);
    setMessage("");
    let scroller = document.getElementById("chat-scroller");
    setTimeout(() => {
      scroller.scrollTo(0, scroller.scrollHeight);
    }, 500);
  };

  const handleStartChat = async (event) => {
    event.preventDefault();
    setloadspin(true);
    let createmsg = {
      uid: mid,
      usname: memData?.name,
      subject: subject,
      msg: Message,
      role: "user",
    };
    try {
      const send = await axios({
        method: "post",
        url: `${tssurl2}/ticket/createticket`,
        data: createmsg,
        headers: {
          "Content-Type": "application/json"
        },
      });
      setMessage("");
      console.log(send.data);
      const response = await axios({
        method: "post",
        url: `${tssurl2}/ticket/getticket`,
        data: raw,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setChats(response.data.ticket.messages);
    } catch (error) {
      console.log(error);
    }
    setloadspin(false);
  };
  return (
    <>
      {mid ? (
        <>
          <Button
            className="btn  help-desk shadow"
            onClick={Opendialogbox}
            style={{
              zIndex: "999",
              backgroundColor: "#fc6d28",
              borderColor: "#fc6d28",
            }}
            type="button"
          >
            <BiSupport fontSize="x-large" />
          </Button>
          <Offcanvas placement={"end"} show={show} onHide={handleClose}>
            <Offcanvas.Header
              style={{ backgroundColor: "#FFA64D" }}
              closeButton
            >
              <Offcanvas.Title className="fw-semibold">
                Talk to our support
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {chats.success === false ? (
                <div>
                  <form>
                    <div className="my-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setSubject(e.target.value)}
                        className="form-control"
                        required
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                      <div id="emailHelp" className="form-text">
                        We'll Make sure to sovle your doubts
                      </div>
                    </div>
                    <textarea
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-100 form-control mb-3"
                      rows="5"
                      required
                      placeholder="Your message"
                    ></textarea>
                    <button
                      type="submit"
                      onClick={handleStartChat}
                      className="btn rounded-0"
                      style={{ backgroundColor: "FFA46D" }}
                    >
                      {loadspin === true ? (
                        <div
                          className="spinner-border spinner-border-sm text-white"
                          role="alert"
                        ></div>
                      ) : (
                        "Start a chat"
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="chatbox-home py-3 px-2" id="chat-scroller">
                  {chats ? (
                    chats.map((item, index) => (
                      <>
                        {item.role === "admin" ? (
                          <div>
                            <div
                              style={{ maxWidth: "75%", width: "fit-content" }}
                              className="p-2 bg-dark text-white rounded-3"
                            >
                              {item.message}
                            </div>
                            <div className="fs-7 text-secondary">
                              {item.time} / {item.date}
                            </div>
                          </div>
                        ) : (
                          <div className="text-end">
                            <div
                              style={{
                                maxWidth: "75%",
                                width: "fit-content",
                                backgroundColor: "#FFCC99",
                              }}
                              className="ms-auto p-2 rounded-3"
                            >
                              {item.message}
                            </div>
                            <div className="fs-7 text-secondary">
                              {item.time} / {item.date}
                            </div>
                          </div>
                        )}
                      </>
                    ))
                  ) : (
                    <div className="d-flex justify-content-center align-items-center h-100 w-100">
                      <h4 className="text-seconadry">
                        Lets chat with our support
                      </h4>
                    </div>
                  )}
                  <div
                    style={{ width: "95%" }}
                    className="position-absolute bottom-0 p-3 bg-white"
                  >
                    <div className="input-group ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Send message"
                        value={Message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <span
                        onClick={handleSendMsg}
                        className="input-group-text bg-theme activet cursor-pointer"
                        id="input1"
                      >
                        {loadspin === true ? (
                          <div
                            className="spinner-border spinner-border-sm text-white"
                            role="alert"
                          ></div>
                        ) : (
                          <IoMdSend size={24} color="#FFA46D" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </>
      ) : null}
    </>
  );
}

export default Support;
