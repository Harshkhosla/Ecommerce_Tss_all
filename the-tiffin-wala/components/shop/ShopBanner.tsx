import { Row } from 'react-bootstrap';
import ImageComponent from '../common/ImageComponent';
import ShopTags from '../common/Tags';


// const getpromocode = async () => {
//       try {
//         const response = await fetch(`${tssurl}/auth/promocode`);
//         const result = await response.json();
//         return result;
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
const ShopBanner = () => {
  // const data = await  getpromocode()

  return (

    <Row className="shopban">
      <ShopTags/>
      <ImageComponent url="/images/banner.png"  />
    </Row>
  );
};

export default ShopBanner;
