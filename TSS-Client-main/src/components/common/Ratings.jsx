import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Ratings = ({ value }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (value >= i + 1) {
      stars.push(<FaStar key={i} />);
    } else if (value >= i + 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return <div className="rating">{stars}</div>;
};

export default Ratings;
