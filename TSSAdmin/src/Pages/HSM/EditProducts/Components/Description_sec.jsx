import React from "react";

const Description = ({ setDesc, Desc, setSku2, Sku2 }) => {
  return (
    <div className="flex-grow">
      <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border ">
        <p className="pb-5">Description Section</p>
        <hr />
        <form className="flex flex-col gap-5 pt-5" action="submit">
          <textarea
            onChange={(e) => { setDesc(e.target.value) }}
            name="shortDescription"
            id=""
            value={Desc}
            className="p-3"
            rows="5"></textarea>


        </form>
        <hr />
        <p className="pb-2 my-2 ">SKU</p>

        <form className="flex flex-col  " action="submit">
          <input
            value={Sku2}
            onChange={(e) => { setSku2(e.target.value) }}
            name="sku"
            id=""
            className="p-3 w-full"
            rows="5"></input>


        </form>


      </div>
    </div>
  );
};

export default Description;
