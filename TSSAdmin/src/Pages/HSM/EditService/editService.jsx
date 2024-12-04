import { useState, useEffect } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProject } from "../../User_Management/features/userSlice";
import { useNavigate } from "react-router-dom";

const EditService = ({ setExpand, setActiveTab }) => {
  setExpand("homeService");
  setActiveTab("featuredProduct");
  const head = "Edit Product and Services";
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [pack, setPack] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [inventory, setInventory] = useState("");

  const HandleSubmit = (event) => {
    event.preventDefault();
    const navigate = useNavigate();
    const formData = new FormData();
    formData.append("prod_name", title);
    formData.append("details", content);
    formData.append("rate", pack);
    formData.append("inv_count", inventory);
    formData.append("prod_category", productCategory);
    formData.append("proj_category", category);
    images.map((image, index) => {
      formData.append("pic_url", image);
    });

    dispatch(updateProject({ formData, title }))
      .then(() => {
        navigate("/home/featuredProduct");
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`api call`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setImages(response.data.images);
        setCategory(response.data.category);
        setPack(response.data.pack);
        setProductCategory(response.data.productCategory);
        setInventory(response.data.inventory);
      })
      .catch((err) => {
        // console.log("Error fetching data", err);
      });
  }, []);

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // fileInputRef.current.value = newImages.length;
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleProductCategoryChange = (event) => {
    setProductCategory(event.target.value);
  };
  const handleInventoryChange = (event) => {
    setInventory(event.target.value);
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className=" ml-80 mb-10 relative" style={{ marginTop: "120px" }}>
        <form onSubmit={HandleSubmit}>
          <label className="grid mt-5">
            Product Title
            <input
              type="text"
              placeholder="Enter Title"
              id="title"
              className="rounded outline-none w-100vh"
              style={{
                height: "50px",
                paddingLeft: "10px",
                backgroundColor: "#e5ecff",
                marginTop: "5px",
                fontSize: "15px",
              }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <div className="grid grid-cols-2 gap-2 mt-5">
            <label className="grid">
              category
              <select
                id="label"
                name="label"
                className="outline-none w-[49vh] rounded"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={category}
                onChange={handleCategoryChange}>
                <option value="">Select category</option>
                <option value="personal">Admin</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid">
              Package
              <input
                type="text"
                value={pack}
                className="outline-none w-[49vh] rounded"
                placeholder="S$ 000.00"
                style={{
                  height: "50px",
                  paddingLeft: "10px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                onChange={(event) => setPack(event.target.value)}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <label className="grid">
              Product category
              <select
                id="label"
                name="label"
                className="outline-none w-[49vh] rounded"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={productCategory}
                onChange={handleProductCategoryChange}>
                <option value="">Select Product category</option>
                <option value="personal">Admin</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="grid">
              Number Of Inventory
              <select
                id="label"
                name="label"
                className="outline-none w-[49vh] rounded"
                style={{
                  height: "50px",
                  paddingLeft: "5px",
                  backgroundColor: "#e5ecff",
                  marginTop: "5px",
                  fontSize: "14px",
                }}
                value={inventory}
                onChange={handleInventoryChange}>
                <option value="">Select Number Of Inventory</option>
                <option value="personal">1</option>
                <option value="work">2</option>
                <option value="other">3</option>
              </select>
            </label>
          </div>

          <label className="grid" style={{ marginTop: "20px" }}>
            Photos
            <div style={{ width: "600px", marginTop: "10px" }}>
              {images && images.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <button
                        className="absolute top-0 text-white"
                        style={{ right: 46 }}
                        onClick={() => handleRemoveImage(index)}>
                        <DisabledByDefaultRoundedIcon style={{ fill: "red" }} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  style={{
                    height: "48px",
                    width: "390px",
                    paddingLeft: "0px",
                    border: "2px solid 	#e6f7fe",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                  className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  placeholder=""
                />
              )}
            </div>
          </label>
          <div style={{ fontSize: "10px", marginTop: "8px" }}>
            <ul className="list-disc ml-3 text-gray-500">
              <li>Allowed banner image extension .jpg | .jpeg | .png</li>
              <li>
                Max banner image file size <a className="text-red-500">5MB</a>
              </li>
              <li>
                Recommended Banner image size{" "}
                <a className="text-red-500">1900px * 700px</a>
              </li>
            </ul>
          </div>

          <label className="grid mt-5">
            Project Details
            <textarea
              id="content"
              placeholder="Enter Details"
              className="rounded outline-none w-[100vh] pt-2"
              style={{
                height: "170px",
                backgroundColor: "#e5ecff",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
                marginTop: "5px",
              }}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
          {/* <div> */}
          <button
            className="rounded bg-[#c93a0e] hover:bg-[#c91b0e] mt-10"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
            }}
            type="submit">
            Save
          </button>
          <button
            className="rounded bg-black hover:bg-gray-800 mt-10"
            style={{
              width: "170px",
              height: "55px",
              color: "white",
              marginLeft: "30px",
            }}
            type="submit">
            Cancel
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default EditService;

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [images, setImages] = useState([]);
//   const [label, setLabel] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // console.log(title, content); // Do something with the data
//     setTitle("");
//     setContent("");
//     // setImages([]);
//   };

//   const handlePhotoUpload = (event) => {
//     const files = event.target.files;
//     const uploadedImages = [];
//     for (let i = 0; i < files.length; i++) {
//       uploadedImages.push({
//         name: files[i].name,
//         url: URL.createObjectURL(files[i]),
//       });
//     }
//     setImages(uploadedImages);
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);

//     // fileInputRef.current.value = newImages.length;
//   };

//   const handleLabelChange = (event) => {
//     setLabel(event.target.value);
//   };

//   return (
//     <div>
//       <div className="flex fixed z-10">
//         <TopHeader className="fixed" head={head} />
//       </div>

//       <div className=" ml-72 mb-10 relative" style={{ marginTop: "70px" }}>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginRight: 0, marginLeft: 920 }}>
//             <button
//               className="rounded mt-10"
//               style={{
//                 backgroundColor: "black",
//                 width: "130px",
//                 height: "47px",
//                 color: "white",
//               }}
//               type="submit"
//             >
//               Cancel
//             </button>

//             <button
//               className="rounded mt-10"
//               style={{
//                 backgroundColor: "#c93a0e",
//                 width: "130px",
//                 height: "47px",
//                 color: "white",
//                 marginLeft: "30px",
//               }}
//               type="submit"
//             >
//               Save
//             </button>
//           </div>
//           <label className="grid mt-5">
//             Product Title
//             <input
//               type="text"
//               placeholder="Enter Title"
//               id="title"
//               className="rounded outline-none"
//               style={{
//                 height: "50px",
//                 width: "1210px",
//                 paddingLeft: "10px",
//                 backgroundColor: "#e5ecff",
//                 marginTop: "5px",
//                 fontSize: "15px",
//               }}
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//             />
//           </label>

//           <div className="grid grid-cols-2 gap-4 mt-5">
//             <label className="grid pr-6">
//               category
//               <select
//                 id="label"
//                 name="label"
//                  className="outline-none rounded"
//                 style={{
//                   height: "50px",
//                   width: "590px",
//                   paddingLeft: "5px",
//                   backgroundColor: "#e5ecff",
//                   marginTop: "5px",
//                   fontSize: "14px",
//                 }}
//                 value={label}
//                 onChange={handleLabelChange}
//               >
//                 <option value="">Select category</option>
//                 <option value="personal">Admin</option>
//                 <option value="work">Work</option>
//                 <option value="other">Other</option>
//               </select>
//             </label>
//             <label className="grid pr-6">
//               Package
//               <input
//                 type="text"
//                 // value={name}
//                  className="outline-none rounded"
//                 placeholder="$000.00"
//                 style={{
//                   height: "50px",
//                   width: "586px",
//                   paddingLeft: "10px",
//                   backgroundColor: "#e5ecff",
//                   marginTop: "5px",
//                   fontSize: "14px",
//                 }}
//                 // onChange={handleNameChange}
//               />
//             </label>
//           </div>
//           <div className="grid grid-cols-2 gap-4 mt-5">
//             <label className="grid pr-6">
//               Product category
//               <select
//                 id="label"
//                 name="label"
//                  className="outline-none rounded"
//                 style={{
//                   height: "50px",
//                   width: "590px",
//                   paddingLeft: "5px",
//                   backgroundColor: "#e5ecff",
//                   marginTop: "5px",
//                   fontSize: "14px",
//                 }}
//                 value={label}
//                 onChange={handleLabelChange}
//               >
//                 <option value="">Select Product category</option>
//                 <option value="personal">Admin</option>
//                 <option value="work">Work</option>
//                 <option value="other">Other</option>
//               </select>
//             </label>
//             <label className="grid pr-6">
//               Number Of Inventory
//               <select
//                 id="label"
//                 name="label"
//                  className="outline-none rounded"
//                 style={{
//                   height: "50px",
//                   width: "590px",
//                   paddingLeft: "5px",
//                   backgroundColor: "#e5ecff",
//                   marginTop: "5px",
//                   fontSize: "14px",
//                 }}
//                 value={label}
//                 onChange={handleLabelChange}
//               >
//                 <option value="">Select Number Of Inventory</option>
//                 <option value="personal">Admin</option>
//                 <option value="work">Work</option>
//                 <option value="other">Other</option>
//               </select>
//             </label>
//           </div>

//           <label className="grid pr-6" style={{ marginTop: "20px" }}>
//             Photos
//           <div style={{ width: "600px", marginTop: "10px" }}>
//             {(images && images.length > 0) ? (
//               <div className="grid grid-cols-4 gap-2">
//                 {images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={image.url}
//                       alt={image.name}
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         objectFit: "cover",
//                         marginRight: "10px",
//                       }}
//                     />
//                     <button
//                       className="absolute top-0 text-white" style={{right:46}}
//                       onClick={() => handleRemoveImage(index)}
//                     >
//                       <DisabledByDefaultRoundedIcon style={{fill:"red"}} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//                 <input
//                 style={{
//                   height: "48px",
//                   width: "590px",
//                   paddingLeft: "0px",
//                   border: "2px solid 	#e6f7fe",
//                   marginTop: "5px",
//                   fontSize: "14px",
//                 }}
//                  className="file:bg-black file:px-6 file:py-3 file:border-none file:rounded file:text-white file:cursor-pointer placeholder-transparent mt-3 rounded appearance-none placeholder-transparent"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handlePhotoUpload}
//                 placeholder=""
//               />
//             )}
//           </div>
//           </label>
//           <div style={{ fontSize: "10px", marginTop: "8px" }}>
//             <ul className="list-disc ml-3 text-gray-500">
//               <li>Allowed banner image extension .jpg | .jpeg | .png</li>
//               <li>
//                 Max banner image file size <a className="text-red-500">5MB</a>
//               </li>
//               <li>
//                 Recommended Banner image size{" "}
//                 <a className="text-red-500">1900px * 700px</a>
//               </li>
//             </ul>
//           </div>

//           <label className="grid mt-5">
//             Project Details
//             <textarea
//               id="content"
//               placeholder="Enter Details"
//               className="rounded outline-none pt-2"
//               style={{
//                 height: "170px",
//                 width: "1210px",
//                 backgroundColor: "#e5ecff",
//                 paddingLeft: "10px",
//                 paddingTop: "20px",
//                 fontSize: "15px",
//                 marginTop: "5px",
//               }}
//               value={content}
//               onChange={(event) => setContent(event.target.value)}
//             />
//           </label>
//           {/* <div> */}
//           <button
//             className="rounded mt-10"
//             style={{
//               backgroundColor: "#c93a0e",
//               width: "170px",
//               height: "55px",
//               color: "white",
//             }}
//             type="submit"
//           >
//             Save
//           </button>
//           <button
//             className="rounded mt-10"
//             style={{
//               backgroundColor: "black",
//               width: "170px",
//               height: "55px",
//               color: "white",
//               marginLeft: "30px",
//             }}
//             type="submit"
//           >
//             Cancel
//           </button>
//           {/* </div> */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditService;
