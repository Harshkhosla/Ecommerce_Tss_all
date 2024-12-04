import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "../components/profile/Sidebar";
import ShopTags from "../components/common/Tags";
import axios from "axios";
import tssurl from "../port";
import { useNavigate } from "react-router-dom";

function Transaction({ setActiveTab }) {
  const MID = localStorage.getItem("MID");
  const Navigate = useNavigate();
  const handleClickScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchorders = async () => {
    try {
      const response = await axios.get(`${tssurl}/auth/orders/${MID}`);

      setOrders(response?.data?.orders);
      const filteredOrders = response?.data?.orders.filter(
        (order) => order.amount
      );
      const total = filteredOrders.reduce(
        (acc, curr) => acc + parseFloat(curr.amount),
        0
      );
      setTotalAmount(total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchorders();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <ShopTags />
        </Row>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} className="">
            <div className="shadow rounded px-3 bg-white overflow-auto">
              <div className="text-warning fw-bold fs-2 position-sticky text-center">
                Transaction History
              </div>
              <hr className="text-secondary position-sticky start-0" />
              <div className="row gx-5 gy-2 position-sticky start-0">
                <div className="col-sm-6">
                  <div className="px-3 shadow-sm bg-pill rounded align-items-center d-flex gap-2 flex-wrap justify-content-between">
                    <div className="d-flex gap-3">
                      <div className="">
                        <p className="my-0 fs-4 fw-bold">
                          Total Purchase:{orders.length}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="">
                        <p className="my-0 fs-4 fw-bold">
                          Total Amount: $ {totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <table
                border="1"
                className="table mt-5 table-responsive rounded text-nowrap"
              >
                <thead className="thead-dark ">
                  <tr>
                    <th className="bg-black text-white">Order ID</th>
                    <th className="bg-black text-white">Amount</th>
                    <th className="bg-black text-white">Payment Method</th>
                    <th className="bg-black text-white">Delivery Status</th>
                    <th className="bg-black text-white">Date</th>
                    <th className="bg-black text-white">View Order</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.slice().reverse().map((order, index) => (
                    <tr style={{ verticalAlign: "middle" }} key={index}>
                      <td>{order.oid}</td>
                      <td>{order.amount}</td>
                      <td>{order.payment_mode}</td>
                      <td>{order.delivery_status}</td>
                      <td>{order.date}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleClickScroll();
                            const orderData = { order }
                            Navigate(`/orderDetailPage/${order.oid}`, { state: order });
                          }}
                        >
                          View Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Transaction;
