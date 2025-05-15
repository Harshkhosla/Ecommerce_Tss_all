import { Row, Image } from 'react-bootstrap';
import banner from '../../assets/images/banner.png';
import ShopTags from '../common/Tags';

const ShopBanner = () => {
  return (
    <Row className="shopban">
      <ShopTags />
      <Image src={banner} alt="shopbanner" className="w-100 p-0" />
    </Row>
  );
};

export default ShopBanner;
