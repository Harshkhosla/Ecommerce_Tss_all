import { Row } from 'react-bootstrap';
// import banner1 from '../../assets/images/Tiffin5.jpeg';
import ShopTags from '../common/Tags';

const ShopBanner = async() => {
  // const data = await  getpromocode()

  return (

    <Row className="shopban">
      <ShopTags data={data} />
      {/* <Image src={banner1} alt="shopbanner" className="w-100 p-0" /> */}
    </Row>
  );
};

export default ShopBanner;
