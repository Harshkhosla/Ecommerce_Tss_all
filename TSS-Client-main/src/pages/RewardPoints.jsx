import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "../components/profile/Sidebar";
import ShopTags from "../components/common/Tags";
import { FaWallet } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import axios from "axios";
import tssurl from "../port";
const RewardPoints = () => {
  const [pointsUsed, setPointsUsed] = useState(0);
  const [cashback, setCashBack] = useState(0);
  const [reward, setReward] = useState(0);
  const totalPoints = 1000;

  const handlePointsUsedChange = (e) => {
    setPointsUsed(parseInt(e.target.value));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${tssurl}/auth/users/${localStorage.getItem("MID")}`
      );
      setReward(response.data?.user?.reward_points);
      setCashBack(response.data?.user?.cashback_points);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const remainingPoints = totalPoints - pointsUsed;

  return (
    <Container fluid>
      <Row>
        <ShopTags />
      </Row>

      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
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
};

export default RewardPoints;