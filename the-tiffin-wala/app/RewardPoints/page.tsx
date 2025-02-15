"use client";

import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaWallet } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import axios from "axios";
import { tssurl } from "../port";

interface RewardPointsResponse {
  reward_points: number;
  cashback_points: number;
}

const getRewardPoints = async (MID: string | null): Promise<RewardPointsResponse | null> => {
  if (!MID) return null; 

  try {
    const response = await axios.get(`${tssurl}/auth/users/${MID}`);
    return response?.data?.user;
  } catch (error) {
    console.error("Error fetching reward points:", error);
    return null;
  }
};

export default function Rewardpoints() {
  const [reward, setReward] = useState<number>(0);
  const [cashback, setCashback] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const MID = localStorage.getItem("MID");
      if (!MID) {
        setLoading(false);
        return;
      }

      const data = await getRewardPoints(MID);
      if (data) {
        setReward(data.reward_points);
        setCashback(data.cashback_points);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Container fluid>
      <Row>
        <Col md={3}>{/* <Sidebar /> */}</Col>
        <Col md={9}>
          <h4>My Points</h4>
          <Row>
            <hr />
            <Col md={4}>
              <div className="rewardCard1 my-2">
                <div className="d-flex gap-3">
                  <div>
                    <FaWallet style={{ color: "white" }} />
                  </div>
                  <div className="text-white">
                    <h5 className="my-0">{cashback}</h5>
                    <p className="my-0 fs-7 fw-bold">Cashback Points</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="rewardCard2 my-2">
                <div className="d-flex gap-3">
                  <div>
                    <IoStarSharp />
                  </div>
                  <div>
                    <h5 className="my-0">{reward}</h5>
                    <p className="my-0 fs-7 fw-bold">Reward Points</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
