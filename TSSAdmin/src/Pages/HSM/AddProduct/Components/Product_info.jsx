import React, { useEffect, useState } from "react";
import { HSM_category } from "../../../User_Management/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Product_info = ({ selectedvalue,
  setprodValue,
  setitemCat,
  setprodCat,
  setserviceCat,
  setunit,
  settags,
  setrewards,
  productCategory,
  CategoryListmgm,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(HSM_category());
    };
    fetchUserData();
  }, [dispatch]);
  const CategoryList = useSelector((state) => state.userManagement.hsm_category);
  return (
    <div className="h-full flex-shrink-0">
      <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border h-full">
        <p className="pb-5">Product Information</p>
        <hr />
        <form className="pt-5" action="submit">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-between">
              <label className="me-1 flex-shrink-0">Product Name :</label>
              <input
                className="px-4 py-2 drop-shadow-md rounded-md w-[72%]"
                type="text"
                onChange={(event) => { setprodValue(event.target.value) }}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label className="me-1 flex-shrink-0">Category : </label>
              <select id="item-category"
                onChange={(event) => { setitemCat(event.target.value) }}
                className="px-4 py-2 drop-shadow-md rounded-md w-[72%] ">
                <option >Select Category</option>
                {CategoryList.map((item, index) => (
                  <option value={item.categoryName}>{item.categoryName}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center justify-between">
              <label className="me-1 flex-shrink-0">Sub Category : </label>
              <select id=""
                onChange={(event) => { setprodCat(event.target.value) }}
                className="px-4 py-2 drop-shadow-md rounded-md w-[72%] ">
                <option value=''>Select Category</option>
                {productCategory.map((item, index) => (
                  <option value={item.categoryName}>{item.categoryName}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center justify-between">
              <label className="me-1 flex-shrink-0">Unit :</label>
              <input
                className="px-4 py-2 drop-shadow-md rounded-md w-[72%]"
                type="text"
                onChange={(event) => { setunit(event.target.value) }}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label className="me-1 flex-shrink-0">Tags :</label>
              <input
                className="px-4 py-2 drop-shadow-md rounded-md w-[72%]"
                type="text"
                // name
                // value={allData.tags}
                onChange={(event) => { settags(event.target.value) }}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <label className="me-1 flex-shrink-0">Reward Points :</label>
              <input
                className="px-4 py-2 drop-shadow-md rounded-md w-[72%]"
                type="text"
                onChange={(event) => { setrewards(event.target.value) }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product_info;
