import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TopHeader from "../../UI/TopHeader/TopHeader";
import { createRole, editRole } from "../User_Management/features/userSlice";
import { useDispatch } from "react-redux";
import { Grid } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";

const EditRole = ({ setExpand, setActiveTab }) => {
  setActiveTab("permission");
  setExpand("userManagement");

  const location = useLocation();
  const data = location.state;
  const head = "Edit Role";
  // console.log("data edit role",data)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [roleName, setRoleName] = useState(" ");
  const [role, setRole] = useState(data?.role);
  // console.log("role",role)
  const [pages, setPages] = useState([
    { role: "User", page: "User Management" },
    { role: "Customer", page: "Customer Management" },
    { role: "Content", page: "Content Management" },
    { role: "Inventory", page: "Inventory Management" },
    { role: "Settings", page: "Settings" },
  ])

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  let rid = data.rid
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("role", role);
    
    variants.forEach((permission, index) => {
      formData.append(`permissions[${index}][catg]`, permission.catg);
      formData.append(`permissions[${index}][create]`, permission.create);
      formData.append(`permissions[${index}][read]`, permission.read);
      formData.append(`permissions[${index}][update]`, permission.update);
      formData.append(`permissions[${index}][delete]`, permission.delete);
    });
    setLoading(true);
    await dispatch(editRole({ formData, rid }));
    setLoading(false);
    // navigate("/home/permission")
  };

  // variants are the permisiionn aarray
  //reference for from data iteration

  // variants.forEach((permission, index) => {
  //     formData.append(`permissions`, permission);
  //   });
  const [variants, setvariants] = useState(data.permissions)
  // console.log("variants",variants)
  const handleVariantDelete = (index) => {
    setvariants((variant) => {
      const updatedVariants = [...variants];
      updatedVariants.splice(index, 1);
      return updatedVariants;
    });
  };
  const addVariant = () => {
    const variantId = variants.length + 1;
    const newVariant = {
      catg: "",
      create: false,
      read: false,
      update: false,
      delete: false,
    };

    setvariants((variant) => ([...variant, newVariant]));
    // console.log(variants)
  };
  const handleVariantChange = (index, feild, value) => {
    // console.log("index in hander varidanchange",index)
    const updatedVariants = [...variants];
    updatedVariants[index][feild] = value;
    setvariants(updatedVariants);
  };
  return (
    <>
      <div>
        {loading ? (
          <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
            <Grid
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : null}
        <div>
          <TopHeader className="fixed" head={head} />
        </div>

        <div className="ml-80 mt-10 relative" style={{ marginTop: "140px" }}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <label className="grid pr-6">
                Role Name
                <input
                  type="text"
                  value={role}
                  className="outline-none rounded"
                  onChange={handleRoleChange}
                  style={{
                    height: "50px",
                    width: "380px",
                    backgroundColor: "#e5ecff",
                    paddingLeft: "5px",
                  }}
                />
              </label>
            </div>

            {variants.length > 0 && variants.map((variant, index) => (
              <>
                <div className="text-xl mt-4 p-2 px-4 font-bold bg-[#EEEEEE] inline-block" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>Permission {index + 1}</div>
                <div key={index} style={{ borderTopLeftRadius: 0 }} className="bg-[#EEEEEE] relative rounded-md drop-shadow-md mb-3 items-end borders  ">
                  <Button style={{ position: 'absolute', top: '10px', right: '10px', }} color="error" variant="contained" size="small"
                    onClick={() => handleVariantDelete(index)}
                  >
                    <CloseIcon />
                  </Button>
                  <div className="grid gap-3 grid-cols-2 p-5">
                    <label className="grid pr-6 ">
                      Category
                      <select
                        className="px-3 py-2 drop-shadow-md rounded-md mt-1 "
                        value={variant.catg}
                        onChange={(e) => handleVariantChange(index, "catg", e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {pages.map((item, pageIndex) => (
                          <option
                            key={pageIndex}
                            value={item.role}
                            disabled={variants.some(
                              (existingVariant, existingIndex) =>
                                existingIndex !== index &&
                                existingVariant.catg.trim().toLowerCase() === item.role.trim().toLowerCase()
                            )}
                          >
                            {item.page}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid pr-6 ">
                      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                        <FormControlLabel control={<Checkbox defaultChecked={variant.create} onChange={(e) => { handleVariantChange(index, "create", e.target.checked) }} />} label="Create" />
                        <FormControlLabel control={<Checkbox defaultChecked={variant.read} onChange={(e) => { handleVariantChange(index, "read", e.target.checked) }} />} label="Read" />
                        <FormControlLabel control={<Checkbox defaultChecked={variant.update} onChange={(e) => { handleVariantChange(index, "update", e.target.checked) }} />} label="Update" />
                        <FormControlLabel control={<Checkbox defaultChecked={variant.delete} onChange={(e) => { handleVariantChange(index, "delete", e.target.checked) }} />} label="Delete" />
                      </FormGroup>
                    </label>
                    <label className="flex items-end justify-end pr-6 ">
                      {/* <Action banner_id={item.banner_id} setLoading={setLoading} banner_image_url={item.banner_image_url} banner_title={item.banner_title} button_title={item.button_title} button_link={item.button_link} /> */}
                    </label>
                  </div>
                </div>
              </>
            ))}
            <div className="mt-6">
              <Button variant="contained" color="themeColor" fullWidth
                onClick={addVariant}
              >+ ADD Permissions</Button>
            </div>
            <div className="flex mt-10 gap-5 items-center">
              <button
                className="rounded bg-[#c93a0e] hover:bg-[#c91b0e]"
                style={{
                  width: "130px",
                  height: "55px",
                  color: "white",
                }}
                type="submit"
                onSubmit={handleSubmit}>
                SAVE
              </button>
              <NavLink to="/home/permission">
                <button
                  className="rounded bg-black hover:bg-gray-800"
                  style={{
                    width: "130px",
                    height: "55px",
                    color: "white",
                  }}>
                  Back
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div >
    </>
  );
};

export default EditRole;
