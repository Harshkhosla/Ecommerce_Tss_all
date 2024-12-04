import React from "react";

const Other = ({ setlowQuantity,
  setfstatus,
  setshippingDays, }) => {
  return (
    <div className="flex flex-col gap-5" style={{ flexGrow: 1 }}>
      <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border ">
        <p className="">Featured</p>
        <hr />
        <form className="flex  flex-row  gap-5 mt-3">
          <label>Status</label>
          <input type="checkbox" onChange={(e) => { setfstatus(e.target.checked) }} />
        </form>
      </div>
      <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border ">
        <p className="">Estimate Shipping Time</p>
        <hr />
        <form className="flex  flex-col gap-3 mt-3">
          <label>Shipping Days</label>
          <input onChange={(e) => { setshippingDays(e.target.value) }}
            placeholder="Shipping days"
            className="px-4 py-2 drop-shadow-md rounded-md w-full"
            type="text"
          />
        </form>
      </div>
    </div>
  );
};

export default Other;
