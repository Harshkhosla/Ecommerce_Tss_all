
import axios from 'axios';
import { tssurl } from '@/app/port';
import Subheader from './Subheader';

const fetchHeader =async()=>{
  try {
    const response = await axios.get(`${tssurl}/header`);
    const headerData = response.data.header;
    return headerData;
  } catch (error) {
    console.error('Error fetching header:', error);
  }
}

const Header = async () => {
const Header = await fetchHeader()

  return (
    <>
      <Subheader header = {Header}/>
    </>
  );
};

export default Header;
