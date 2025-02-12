import Link from 'next/link';
import { Container, Row, Col, Image } from 'react-bootstrap';


const Collection = ({ data }) => {
  
  return (
    <Container fluid>
      <Row className="collection">
        {data?.images?.map((image, index) => (
          <Col
            md="4"
            key={index}
            className={`p-0 ${index === 1 ? 'collect2' : ''} ${index === 0 || index === 2 ? 'mob-head' : ''
              }`}
          >
            <Image src={image?.url} fluid className="w-100" alt='Images' />
            {index === 1 && (
              <Link href={`/catalog/${data?.catalogid}`}>
                <p>{data.BannerTitle}</p>
              </Link>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Collection;
