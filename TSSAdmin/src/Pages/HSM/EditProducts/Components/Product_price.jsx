import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Product_price = ({
  checkedcat,
  setunitPrice,
  variants,
  unitPrice,
  setvariants,
  colors,
  setcolors,
  size,
  setsize,
  variantEnabled,
  refund,
  setRefund,
  quantity,
  discountType,
  setvariantEnabled,
  setdiscountStart,
  setdiscountEnd,
  setdiscount,
  setdiscountType,
  setlowQuantity,
  setquantity,
  setsku,
  product,
  handlePriceChange,
  handleQuantityChange,
  toggleVariants,
}) => {
 

  const handleRefundChange = (e) => {
    if (e.target.checked) {
      setRefund(""); 
    } else {
      setRefund(null); 
    }
  };

  return (
    <div>
      <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border ">
        <p className="pb-5">Product Pricing</p>
        <hr />
        <form className="pt-5" action="submit">
          <div
            className={`flex flex-col ${variantEnabled && "opacity-50"} gap-5`}
          >
            <div className="flex flex-row items-center justify-between">
              <label className="flex-shrink-0 pe-3">Unit price :</label>
              <input
                className="px-4 py-2 w-[75%] drop-shadow-md rounded-md"
                type="text"
                value={unitPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                readOnly={variantEnabled}
              />
            </div>
            <div className="flex items-center flex-row justify-between">
              <label className="flex-shrink-0 pe-3">Quantity :</label>
              <input
                className="px-4 py-2 w-[75%] drop-shadow-md rounded-md "
                type="text"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                readOnly={variantEnabled}
              />
            </div>
            <div id="product-details">
              <div className="flex items-center flex-row justify-between">
                <label className="flex-shrink-0 pe-3">Discount :</label>
                <div className="flex gap-2">
                  <input
                    className="px-4 py-2 drop-shadow-md rounded-md "
                    type="text"
                    onChange={(e) => {
                      setdiscount(e.target.value);
                    }}
                    readOnly={variantEnabled}
                  />
                  <select
                    name="discount"
                    className="rounded-md drop-shadow-md px-5 w-36"
                    disabled={variantEnabled}
                    value={discountType}
                    id=""
                    onChange={(e) => {
                      setdiscountType(e.target.value);
                    }}
                  >
                    <option value="Select">Select</option>
                    <option value="amount">Amount</option>
                    <option value="percent">Percent</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row items-center mt-5 justify-between">
                <label className="flex-shrink-0 pe-3">Discount Range : </label>
                <div className="flex justify-between gap-3 ps-3">
                  <div>
                    <input
                      onChange={(event) => {
                        setdiscountStart(event.target.value);
                      }}
                      className="border border-blue-300 cursor-pointer w-full rounded-md p-2"
                      type="date"
                      placeholder="Start Date"
                      readOnly={variantEnabled}
                    />
                  </div>
                  <div>
                    <input
                      onChange={(event) => {
                        setdiscountEnd(event.target.value);
                      }}
                      className="border border-blue-300 cursor-pointer w-full rounded-md p-2"
                      type="date"
                      placeholder="End Date"
                      readOnly={variantEnabled}
                    />
                  </div>
                </div>
              </div>
            </div>
            <form className="flex  flex-col gap-3 ">
              <label>Low Stock Quantity Warning</label>
              <input
                onChange={(e) => {
                  setlowQuantity(e.target.value);
                }}
                className="px-4 py-2 drop-shadow-md rounded-md w-full"
                type="text"
                readOnly={variantEnabled}
              />
            </form>
          </div>
          <div className="flex items-center flex-row mt-3">
            <label className="flex-shrink-0 pe-3 ">Enable Variants :</label>
            <div className="content">
              <label className="checkBox">
                <input
                  type="checkbox"
                  id="ch1"
                  checked={variantEnabled}
                  onChange={toggleVariants}
                />
                <div className="transition"></div>
              </label>
            </div>

            <label
              className="flex-shrink-0 pe-3"
              style={{ marginLeft: "55px" }}
            >
              Return :
            </label>
            <div className="content">
              <label className="checkBox">
                <input
                  type="checkbox"
                  id="ch1"
                  checked={refund !== null}
                  onChange={handleRefundChange}
                />
                <div className="transition"></div>
              </label>
            </div>
            {refund !== null && (
              <>
                <input
                  className="px-0 py-1 drop-shadow-md rounded-md w-1/6 ml-4 "
                  type="text"
                  value={refund}
                  placeholder="Days"
                  onChange={(e) => {
                    setRefund(e.target.value);
                  }}
                />
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product_price;
