import { Row, Image } from 'react-bootstrap';
import banner from '../../assets/images/banner.png';
import banner1 from '../../assets/images/Tiffin5.jpeg';
import ShopTags from '../common/Tags';

const ShopBanner = () => {
  return (
    <Row className="shopban">
      <ShopTags />
      <Image src={banner1} alt="shopbanner" className="w-100 p-0" />
    </Row>
  );
};

export default ShopBanner;
