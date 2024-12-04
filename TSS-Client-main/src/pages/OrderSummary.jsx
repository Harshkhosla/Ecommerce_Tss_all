import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function OrderDetails() {
  const { oid } = useParams();
  const [orderData, setOrderData] = useState([]);
  const location = useLocation();
  const data = location?.state;;

  useEffect(() => {
    setOrderData(data)
  }, [data]);

  const shipping = parseFloat(orderData?.shipping);
  const coupon = parseFloat(orderData?.coupon);
  const tax = parseFloat(orderData?.tax);
  const subtotal = parseFloat(orderData?.subtotal);
  const totalOrderAmount = subtotal - coupon + tax + shipping;

  const headerStyle = { fontSize: "16px" };
  const sectionStyle = { marginLeft: "20px" };

  return (
    <div>
      <div className="container overflow-auto">
        <h2>Order Details</h2>
        <div className="row ">
          <div className="col">
            <div className="light-gray-bg p-2">
              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>
                  Payment Mode:
                </h2>
                <p>{orderData?.payment_mode}</p>
              </div>

              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>
                  Tracking ID:
                </h2>
                <p>{orderData?.tracking_id}</p>
              </div>

              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>
                  Delivery Status:
                </h2>
                <p>{orderData?.delivery_status}</p>
              </div>
            </div>
          </div>
        </div>

        <h2>Order Summary</h2>
        <table className="table table-striped table-responsive table-bordered">
          <tbody>
            <tr>
              <th>Order Code:</th>
              <td>{oid}</td>
            </tr>
            <tr>
              <th>Customer:</th>
              <td>{orderData?.uname}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{orderData?.email}</td>
            </tr>
            <tr>
              <th>Payment Mode</th>
              <td>{orderData?.payment_mode}</td>
            </tr>
            <tr>
              <th>Payment Status</th>
              <td>{orderData?.payment_status}</td>
            </tr>
            <tr>
              <th>Order Date</th>
              <td>{orderData?.date}</td>
            </tr>
            <tr>
              <th>Contact</th>
              <td>{orderData?.contact}</td>
            </tr>
            <tr>
              <th>Shipping address:</th>
              <td>{orderData?.shipping_addr}</td>
            </tr>
          </tbody>
        </table>
        <h2>Product Details</h2>
        {orderData && orderData?.products && orderData?.products.length > 0
          ? orderData.products.map((product, productIndex) => (
            <table
              key={productIndex}
              className="table table-striped table-bordered"
            >
              <tbody>
                <tr>
                  <th>Product Image</th>
                  <td>
                    <img
                      src={product?.photo}
                      height={150}
                      width={150}
                      alt={product?.product_name}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Name</th>
                  <td>{product?.product_name}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{product?.price}</td>
                </tr>
                <tr>
                  <th>Count</th>
                  <td>{product?.count}</td>
                </tr>
                <tr>
                  <th>Reward Points</th>
                  <td>{product?.reward_points}</td>
                </tr>
              </tbody>
            </table>
          ))
          : null}
        <h2>Bill Details</h2>
        <table className="table table-striped table-responsive table-bordered">
          <tbody>
            <tr>
              <th>Subtotal</th>
              <td>{orderData?.subtotal}</td>
            </tr>
            <tr>
              <th>Coupon Discount</th>
              <td>{orderData?.coupon}</td>
            </tr>
            <tr>
              <th>Shipping Charges</th>
              <td>{orderData?.shipping}</td>
            </tr>
            <tr>
              <th>Tax</th>
              <td>{orderData?.tax}</td>
            </tr>
            <tr>
              <th>Total Order Amount:</th>
              <td>{totalOrderAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetails;
