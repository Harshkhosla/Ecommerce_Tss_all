import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LooksData } from '../components/catalog/Looks';
import tssurl from '../port';
import axios from 'axios';

const LooksPage = () => {
  const { catalogId } = useParams();
  const [looksData, setLooksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (catalogId) {
          const res = await axios.get(`${tssurl}/catalog/looks/${catalogId}`);
          setLooksData(res.data);
        }
      } catch (error) {
        console.error('Error fetching looks data', error);
      }
    };

    fetchData();
  }, [catalogId]);

  return (
    <Container fluid>
      <Row className="text-center mt-4">
        <h3 className="fw-bold">All Looks</h3>
      </Row>
      <LooksData data={looksData} />
    </Container>
  );
};

export default LooksPage;
