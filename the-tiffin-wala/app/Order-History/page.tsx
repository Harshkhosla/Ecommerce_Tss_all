"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { tssurl } from "../port";
import Sidebar from "@/components/profile/Sidebar";
import { Order } from "@/components/types";



export default function OrderHistory() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [MID, setMID] = useState<string | null>(null);

  useEffect(() => {
    setMID(localStorage.getItem("MID"));
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!MID) return;

      try {
        const response = await axios.get(`${tssurl}/auth/orders/${MID}`);
        const fetchedOrders: Order[] = response?.data?.orders || [];
        setOrders(fetchedOrders);
        
        const total = fetchedOrders.reduce((acc, curr) => acc + curr.amount, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [MID]);

  const handleClickScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <div className="shadow rounded px-3 bg-white overflow-auto">
            <div className="text-warning fw-bold fs-2 text-center">Transaction History</div>
            <hr className="text-secondary" />
            <div className="row gx-5 gy-2">
              <div className="col-sm-6">
                <div className="px-3 shadow-sm bg-pill rounded d-flex gap-2 justify-content-between">
                  <p className="my-0 fs-4 fw-bold">Total Purchase: {orders.length}</p>
                  <p className="my-0 fs-4 fw-bold">Total Amount: $ {totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <table className="table mt-5 table-responsive rounded text-nowrap">
              <thead className="thead-dark">
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
                {orders.slice().reverse().map((order) => (
                  <tr key={order.oid} style={{ verticalAlign: "middle" }}>
                    <td>{order.oid}</td>
                    <td>${order.amount.toFixed(2)}</td>
                    <td>{order.payment_mode}</td>
                    <td>{order.delivery_status}</td>
                    <td>{order.date}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleClickScroll();
                          router.push(`/orderDetailPage/${order.oid}`);
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
  );
}
