import { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Looks } from '../components/catalog/Looks';
import Tags from '../components/common/Tags';
import tssurl from '../port';

const CatalogPage = () => {
  const [catItems, setCatItems] = useState();
  const [looks, setLooks] = useState();
  const navigate = useNavigate();
  const { catalogid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${tssurl}/catalog/catalog`);
        const data = await res.json();
        const filteredCatalogItems = data?.catalogItems?.filter(item => item.catalog_id === catalogid);
        setCatItems({ catalogItems: filteredCatalogItems });

        if (filteredCatalogItems.length > 0) {
          const catalogId = filteredCatalogItems[0].catalog_id;
          const res2 = await fetch(`${tssurl}/catalog/looks/${catalogId}`);
          const looksData = await res2.json();
          setLooks(looksData);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [catalogid]);

  const getImageAndLink = (area) => ({
    image: catItems?.catalogItems?.[0]?.[area]?.image?.url || '',
    title: catItems?.catalogItems?.[0]?.[area]?.title || '',
    subtitle1: catItems?.catalogItems?.[0]?.[area]?.subtitle1 || '',
    subtitle2: catItems?.catalogItems?.[0]?.[area]?.subtitle2 || '',
    link: catItems?.catalogItems?.[0]?.[area]?.imagelink || '',
    Title: catItems?.catalogItems?.[0]?.[area]?.Title || '',
    centerText: catItems?.catalogItems?.[0]?.[area]?.centerText || '',
    buttonText: catItems?.catalogItems?.[0]?.[area]?.buttonText || '',
  });

  const cat1 = getImageAndLink('inputArea1');
  const cat2 = getImageAndLink('inputArea2');
  const cat3 = getImageAndLink('inputArea3');
  const cat4 = getImageAndLink('inputArea4');
  const cat5 = getImageAndLink('inputArea5');

  const handleLooks = () => {
    const catalogId = catItems?.catalogItems?.[0]?.catalog_id;
    if (catalogId) {
      navigate(`/catalog/looks/${catalogId}`);
    } else {
      console.error('Catalog ID not found');
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="catslide">
          <Tags />
          <Col md={12}>
            <Image src={cat1.image} alt="catalog" fluid />
            <div className="cat1Text">
              <p className="cat1Title">{cat1.title}</p>
              <p className="cat1subTitle1">{cat1.subtitle1}</p>
              <hr className="mb-1" />
              <p className="cat1subTitle2">{cat1.subtitle2}</p>
            </div>
          </Col>
        </Row>
        <Looks data={looks} />

        <Row className="cat2">
          <Col md={6}>
            <Image src={cat2.image} fluid />
          </Col>
          <Col md={6} className="m-auto">
            <h4>{cat2.link}</h4>
          </Col>
        </Row>

        <Row className="cat3">
          <Col md={12}>
            <Image src={cat3.image} alt="cat3" fluid />
            <p>{cat3.Title}</p>
          </Col>
        </Row>

        <Row className="cat4">
          <Col md={6} className="m-auto">
            <h4>{cat4.link}</h4>
          </Col>
          <Col md={6}>
            <Image src={cat4.image} fluid />
          </Col>
        </Row>

        <Row className="cat5">
          <Col md={12}>
            <Image src={cat5.image} alt="cat5" fluid />
            <div className="cat5text">
              <h5>{cat5.centerText}</h5>
              <Button variant="light" onClick={handleLooks}>
                <span>{cat5.buttonText}</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CatalogPage;
