'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Row, Col, Container } from 'react-bootstrap';
import { tssurl } from '@/app/port';

interface TagData {
  Title1: string;
  page1: string;
  Title2: string;
  page2: string;
  Title3: string;
  page3: string;
}

const Tags: React.FC = () => {
  const [tagData, setTagData] = useState<TagData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${tssurl}/auth/promocode`);
        const result = await response.json();
        setTagData(result);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  if (!tagData) {
    return <p>Loading...</p>;
  }

  return (
    <Container fluid className="tags">
      <Row className="scrolling-row">
        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagData.Title1}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link href={tagData.page1} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>

        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagData.Title2}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link href={tagData.page2} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>

        <Col md={4}>
          <div style={{ fontSize: '1.2em' }}>
            {tagData.Title3}&nbsp;&nbsp;--&nbsp;&nbsp;
            <Link href={tagData.page3} style={{ textDecoration: 'underline' }}>
              SHOP NOW
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Tags;
