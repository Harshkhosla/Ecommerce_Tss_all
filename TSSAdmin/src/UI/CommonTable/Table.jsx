import React, { useState, useEffect } from "react";
import search from "./Assets/search.png";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function Table({
  columns,
  data,
  pageSize,
  greenButtonText,
  greyButtonText,
  blackButtonText,
  blackClicked,
  greenClicked,
  greyClicked,
  catgoryFilter1,
  catgoryFilter2,
  productColors,
  catgoryFilter4,
  catgoryFilter,
  catgoryFilter6,
  catgoryFilterSalesCurrency,
  catgoryFilterSalesPayStatus,
  catgoryFilterRegion,
  catgoryFilterCountry,
  // onClick,
  // dataOg,
}) {
  const hasAnyFilter =
    catgoryFilter1 ||
    catgoryFilter2 ||
    productColors ||
    catgoryFilter4 ||
    catgoryFilter ||
    catgoryFilterSalesCurrency ||
    catgoryFilterSalesPayStatus ||
    catgoryFilterRegion ||
    catgoryFilterCountry ||
    catgoryFilter6;
  // console.log("colors ->", productColors);
  const [currentPage, setCurrentPage] = useState(0);
  // console.log(catgoryFilter1, "sampleeeeeee");
  // console.log(catgoryFilter2, "sampleeeeeee");
  // console.log(productColors, "sampleeeeeee");
  // console.log(catgoryFilterCountry, "sampleeeeeee");
  const [searchTerm, setSearchTerm] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const handleHeaderClick = (key) => {
    let direction = "ascending";

    // Check if the same column header is clicked for the third time
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        // Reset sorting configuration to original state
        direction = "ascending";
        key = null;
      }
    }

    setSortConfig({ key, direction });
  };

  let fData = data?.filter((row) =>
    Object?.values(row)?.some((value) =>
      value
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase())
    )
  );
  const [filteredData, setfilteredData] = useState(fData);

  useEffect(() => {
    // console.log("filteredData", filteredData);
    setfilteredData(fData);
  }, [searchTerm]);

  useEffect(() => {
    setfilteredData(fData);
  }, [data]);

  const ITEM_HEIGHT = 38;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };
  const [personName, setPersonName] = useState([]);
  const [personName1, setPersonName1] = useState([]);
  const [personName2, setPersonName2] = useState([]);
  const [personName3, setPersonName3] = useState([]);
  const [userRole, setUserRole] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [currency, setcurrency] = useState([]);
  const [payStatus, setpayStatus] = useState([]);
  const [country, setCountry] = useState([]);
  const [region, setRegion] = useState([]);
  // console.log("personName2", personName2);
  useEffect(() => {
    // filterData();
  }, [personName, personName1, personName2, personName3]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // // console.log(personName);
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  const handleChange1 = (event) => {
    // console.log("evnet click subcatehgory", event);
    const {
      target: { value },
    } = event;
    // console.log(value, "value in subcateogyr");

    // setPersonName1(
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    setPersonName1(value);
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName2(typeof value === "string" ? value.split(",") : value);
  };
  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;
    // // console.log(personName);
    setPersonName3(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleProPerformanceFilter = () => {
    let filteredData = data;
    if (selectedStatus.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedStatus.includes(item.status)
      );
    }
    setfilteredData(filteredData);
    handleClose();
  };
  
  const handleChangeUserRole = (event) => {
    setUserRole(event.target.value);
  };

  const handleUserFilter = () => {
    let filteredData = data;
    // console.log(filteredData,"filter")
    if (userRole.length > 0) {
      filteredData = filteredData.filter((item) =>
        userRole.includes(item.userrole)
      );
    }
    setfilteredData(filteredData);
    handleClose();
  };

  const handleChangeCurrencyStatus = (event) => {
    setcurrency(event.target.value);
  };
  const handleChangePayStatus = (event) => {
    setpayStatus(event.target.value);
  };

  const handleSalesFilter = () => {
    let filteredData = data;
    // console.log(filteredData, "datd");
    if (currency.length > 0) {
      filteredData = filteredData.filter((item) =>
        currency.includes(item.currency)
      );
    }

    if (payStatus.length > 0) {
      filteredData = filteredData.filter((item) =>
        payStatus.includes(item.history)
      );
    }

    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDateObj && itemDate <= endDateObj;
      });
    }

    setfilteredData(filteredData);

    // Close modal or perform any other action
    handleClose();
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  };

  const handleVisitorsFilter = () => {
    let filteredData = data;

    if (country.length > 0) {
      filteredData = filteredData.filter((item) =>
        country.includes(item.country)
      );
    }

    // if (region.length > 0) {
    //   filteredData = filteredData.filter((item) =>
    //     region.includes(item.address.region)
    //   );
    // }

    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDateObj && itemDate <= endDateObj;
      });
    }

    setfilteredData(filteredData);

    // Close modal or perform any other action
    handleClose();
  };

  const handleCatApply = async () => {
    // console.log("data in apply", data);
    let filteredData = data;

    // Filter based on personName
    // if (personName.length > 0) {
    //   filteredData = filteredData.filter(item => personName.includes(item.category));
    // }

    // Filter based on personName1
    if (personName1.length > 0) {
      filteredData = filteredData.filter((item) =>
        personName1.includes(item.sub_category)
      );
      // console.log("filterdata in subcateogy", filteredData);
    }

    // Filter based on personName2
    if (personName3.length > 0) {
      filteredData = filteredData.filter((item) =>
        personName3.includes(item.category)
      );
    }

    // Filter based on personName3
    if (personName2.length > 0) {
      filteredData = filteredData.filter((item) => {
        return (
          item.color && item.color.some((color) => personName2.includes(color))
        );
      });

      // console.log("filteredData in color", filteredData);
    }

    // Apply filter based on Published/Unpublished
    if (personName.includes("Published")) {
      filteredData = filteredData.filter((item) => item.draft === "false");
    } else if (personName.includes("Unpublished")) {
      filteredData = filteredData.filter((item) => item.draft === "true");
    }

    // Update filteredData state
    setfilteredData(filteredData);

    handleClose();
  };

  const handleCatcApply = async () => {
    // console.log(personName);
    // console.log(data, "sapleefeii");
    if (personName.length > 0) {
      if (personName.length == 1) {
        if (personName.includes("Published")) {
          var nr = data.filter((data) => data.draft == "false");
          // console.log("nr in publisther", nr);
        } else if (personName.includes("Unpublished")) {
          var nr = data.filter((data) => data.draft == "true");
          // console.log("nr in unpublisther", nr);
        } else {
          var nr = data.filter((data) => personName.includes(data.category));
        }
      } else {
        // var nr = data.filter(data => personName.includes(data.category) && personName.includes(data.draft?"Published":"Unpublished"))
        // // console.log("nr",nr);
        // if(personName.includes("Published" || "Unpublished")){
        //   var nr = data.filter(data => personName.includes(data.category) && personName.includes(data.draft=="true"?"Unpublished":"Published"))
        //   // console.log("nr",nr);
        // }
        if (personName.includes("Published")) {
          var nr = data.filter(
            (data) =>
              personName.includes(data.category) && data.draft == "false"
          );
          // console.log("nr in if", nr);
        } else if (personName.includes("Unpublished")) {
          var nr = data.filter(
            (data) => personName.includes(data.category) && data.draft == "true"
          );
          // console.log("nr in else unpublished", nr);
        } else {
          var nr = data.filter((data) => personName.includes(data.category));
          // console.log("nr in tow", nr);
        }
      }

      let sdata = nr.filter((row) =>
        Object.values(row).some((value) =>
          value
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
      setfilteredData(sdata);
    }
    // // console.log(filteredData);
    handleClose();
  };

  const handleClearSelection = () => {
    setPersonName([]);
  };
  const paginatedData = pageSize
    ? filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    : filteredData;

  const pageCount = pageSize ? Math.ceil(filteredData.length / pageSize) : 1;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    boxShadow: 24,
    borderRadius: "20px",
    backgroundColor: "white",
    padding: "15px 30px",
  };
  localStorage.setItem("autoClickApply", "true");

  useEffect(() => {
    const applyButton = document.getElementById("applycat");

    if (applyButton) {
      applyButton.click();
      // console.log("apply button clicked");
    }
  }, []);

  const sortedData = [...paginatedData].sort((a, b) => {
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (typeof valueA === "number" && typeof valueB === "number") {
      if (valueA < valueB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }

    // If not numbers, compare as strings
    if (valueA < valueB) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  const location = useLocation();
  const data11 = location?.pathname;
  // // console.log(location.pathname);
  // console.log(location.pathname, "dskhjdsbh");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleDatApply = () => {
    const dateString = startDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const dateString2 = endDate;
    const date2 = new Date(dateString2);
    const formattedDate2 = date2.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    // console.log(formattedDate); // Output: "03/14/2024"

    const startDateObj = new Date(formattedDate);
    const endDateObj = new Date(formattedDate2);

    // Filter the data based on the date range
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
    setfilteredData(filteredData);
    // console.log(filteredData);
    handleClose();
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // console.log(state, "dates");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const renderFiltersBasedOnData11 = () => {
    if (data11 === "/home/visitors") {
      return (
        <div className="my-3 ">
          <div className="my-3 ">
            <FormControl className="w-full " style={{ marginTop: "1.5rem" }}>
              <InputLabel id="demo-multiple-checkbox-label">Country</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={country}
                onChange={handleChangeCountry}
                input={<OutlinedInput label="Select category" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {catgoryFilterCountry?.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    <Checkbox checked={country.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              className="w-full "
              style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
            >
              <InputLabel id="demo-multiple-checkbox-label">Region</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={region}
                onChange={handleChangeRegion}
                input={<OutlinedInput label="Select category" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {catgoryFilterRegion?.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    <Checkbox checked={region.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  const { startDate, endDate } = item.selection;

                  setState([{ startDate, endDate, key: "selection" }]);
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <Button
                  onClick={() => {
                    handleClearSelection();
                    setfilteredData(data);
                    handleClose();
                  }}
                  variant="contained"
                  size="large"
                  color="error"
                >
                  Clear
                </Button>
              </div>
              <div>
                <Button
                  id="applycat"
                  onClick={handleVisitorsFilter}
                  variant="contained"
                  size="large"
                  color="themeColor"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (data11 === "/home/productList") {
      return (
        <div className="my-3 ">
          <FormControl className="w-full ">
            <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName3}
              onChange={handleChange3}
              input={<OutlinedInput label="Select category" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {catgoryFilter2?.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <Checkbox checked={personName3.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-full " style={{ marginTop: "1.5rem" }}>
            <InputLabel id="demo-multiple-checkbox-label">Colors</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName2}
              onChange={handleChange2}
              input={<OutlinedInput label="Select category" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {productColors?.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <Checkbox checked={personName2.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-full " style={{ marginTop: "1.5rem" }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Sub Category
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName1}
              onChange={handleChange1}
              input={<OutlinedInput label="Select category" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {catgoryFilter1?.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <Checkbox checked={personName1.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-full " style={{ marginTop: "1.5rem" }}>
            <InputLabel id="demo-multiple-checkbox-label">Publish</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Select category" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {catgoryFilter4?.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="checkbox-group mt-3">
            <label>
              <input
                type="checkbox"
                // checked={hasDiscount}
                // onChange={() => setHasDiscount(!hasDiscount)}
              />
              Discount/Promo Code
            </label>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <Button
                onClick={() => {
                  handleClearSelection();
                  setfilteredData(data);
                  handleClose();
                }}
                variant="contained"
                size="large"
                color="error"
              >
                Clear
              </Button>
            </div>
            <div>
              <Button
                id="applycat"
                onClick={handleCatApply}
                variant="contained"
                size="large"
                color="themeColor"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      );
    } else if (data11 === "/home/sales") {
      return (
        <div className="my-3 ">
          <div className="my-3 ">
            <FormControl className="w-full " style={{ marginTop: "1.5rem" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Currency
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={currency}
                onChange={handleChangeCurrencyStatus}
                input={<OutlinedInput label="Select category" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {catgoryFilterSalesCurrency?.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    <Checkbox checked={currency.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              className="w-full "
              style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
            >
              <InputLabel id="demo-multiple-checkbox-label">
                Payment Status
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={payStatus}
                onChange={handleChangePayStatus}
                input={<OutlinedInput label="Select category" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {catgoryFilterSalesPayStatus?.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    <Checkbox checked={payStatus.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  const { startDate, endDate } = item.selection;

                  setState([{ startDate, endDate, key: "selection" }]);
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <Button
                  onClick={() => {
                    handleClearSelection();
                    setfilteredData(data);
                    handleClose();
                  }}
                  variant="contained"
                  size="large"
                  color="error"
                >
                  Clear
                </Button>
              </div>
              <div>
                <Button
                  id="applycat"
                  onClick={handleSalesFilter}
                  variant="contained"
                  size="large"
                  color="themeColor"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (data11 === "/home/ProPerformance") {
      return (
        <div className="my-3 ">
          <div className="my-3 ">
            <FormControl className="w-full " style={{ marginTop: "1.5rem" }}>
              <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedStatus}
                onChange={handleChangeStatus}
                input={<OutlinedInput label="Select category" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {catgoryFilter6?.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    <Checkbox checked={selectedStatus.indexOf(status) > -1} />
                    <ListItemText primary={status} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex justify-between mt-4">
              <div>
                <Button
                  onClick={() => {
                    handleClearSelection();
                    setfilteredData(data);
                    handleClose();
                  }}
                  variant="contained"
                  size="large"
                  color="error"
                >
                  Clear
                </Button>
              </div>
              <div>
                <Button
                  id="applycat"
                  onClick={handleProPerformanceFilter}
                  variant="contained"
                  size="large"
                  color="themeColor"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (data11 === "/home/allUsers") {
      return (
        <div className="my-3 ">
          <div className="my-3 ">
            <FormControl className="w-full " style={{ marginTop: "1.5rem" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                User Role
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={userRole}
                onChange={handleChangeUserRole}
                input={<OutlinedInput label="Select category" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {catgoryFilter?.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    <Checkbox checked={userRole.indexOf(status) > -1} />
                    <ListItemText primary={status} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex justify-between mt-4">
              <div>
                <Button
                  onClick={() => {
                    handleClearSelection();
                    setfilteredData(data);
                    handleClose();
                  }}
                  variant="contained"
                  size="large"
                  color="error"
                >
                  Clear
                </Button>
              </div>
              <div>
                <Button
                  id="applycat"
                  onClick={handleUserFilter}
                  variant="contained"
                  size="large"
                  color="themeColor"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (data11 === "/home/ActivityLogs") {
      return (
        <div className="my-3 ">
          <div className="my-3 ">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  const { startDate, endDate } = item.selection;

                  setState([{ startDate, endDate, key: "selection" }]);
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>

            <div className="flex justify-between mt-4">
              <div>
                <Button
                  onClick={() => {
                    handleClearSelection();
                    setfilteredData(data);
                    handleClose();
                  }}
                  variant="contained"
                  size="large"
                  color="error"
                >
                  Clear
                </Button>
              </div>
              <div>
                <Button
                  id="applycat"
                  onClick={handleDatApply}
                  variant="contained"
                  size="large"
                  color="themeColor"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {hasAnyFilter ? (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                className="text-gray-900"
              >
                Filter
              </h2>
              {renderFiltersBasedOnData11()}
            </div>
          </Modal>
        </>
      ) : null}
      <div className="p-5 table-container overflow-hidden">
        <div className="flex justify-between items-center mb-5">
          <div className="w-1/3 relative">
            <input
              type="text"
              placeholder="Search"
              className="shadow-md border-gray-100 border-2 rounded-md py-3 pl-5 pr-10 w-full"
              onChange={handleSearchChange}
            />
            <img
              src={search}
              alt="search"
              className="absolute top-3 right-3 pointer-events-auto"
            />
          </div>
          <div className="flex flex-row gap-4 items-center">
            {hasAnyFilter && (
              <div>
                <IconButton color="" onClick={handleOpen} size="large">
                  <FilterAltIcon />
                </IconButton>
              </div>
            )}
            {blackButtonText && (
              <div>
                <button
                  onClick={blackClicked}
                  className="bg-[#2B2B2B] rounded hover:bg-gray-600 w-auto text-white font-bold py-3 px-8 rounded-sm"
                >
                  {blackButtonText}
                </button>
              </div>
            )}
            {greenButtonText && (
              <div>
                <button
                  onClick={greenClicked}
                  className="bg-[#c93a0e] rounded hover:bg-[#c91b0e] text-white w-auto font-bold py-3 px-8 rounded-sm"
                >
                  {greenButtonText}
                </button>
              </div>
            )}
            {greyButtonText && (
              <div>
               <button
                  onClick={greyClicked}
                  className="bg-[#c93a0e] rounded hover:bg-[#c91b0e] text-white w-auto font-bold py-3 px-8 rounded-sm"
                >
                  {greyButtonText}
                </button>
              </div>
            )}
          </div>
        </div>
        <table className="table w-full table-auto text-left ">
          <thead className="h-10">
            <tr className="bg-[#2B2B2B] text-white">
              {columns?.map((column) => (
                <th
                  key={column.accessor}
                  onClick={() => handleHeaderClick(column.accessor)}
                  className="px-5 py-5 border-b cursor-pointer"
                >
                  {column.header}
                  {sortConfig.key === column.accessor && (
                    <span className="ml-1 text-white">
                      {sortConfig.direction === "ascending" ? (
                        <SwitchLeftIcon className="rotate-90  text-green-300" />
                      ) : sortConfig.direction === "descending" ? (
                        <SwitchLeftIcon className="-rotate-90 text-green-300" />
                      ) : (
                        ""
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className={`bg-${index % 2 === 0 ? "white" : "gray-100"}`}
              >
                {columns?.map((column) => (
                  <td
                    key={column.accessor}
                    className="px-5 py-5 border-b border-gray-300"
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {pageSize && (
          <div className="pagination absolute left-0 right-0 flex justify-end p-5 gap-3">
            <button
              className={`px-4 border-2 rounded-md ${
                currentPage === 0
                  ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                  : "bg-white text-gray-700 "
              }`}
              disabled={currentPage === 0}
              onClick={handlePreviousPage}
            >
              {"<"} Prev
            </button>
            <span className="px-4 py-2">{`${currentPage +
              1} - ${pageCount}`}</span>
            <button
              className={`px-4 border-2 rounded-md ${
                currentPage === pageCount - 1
                  ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                  : "bg-white text-gray-700"
              }`}
              disabled={currentPage === pageCount - 1}
              onClick={handleNextPage}
            >
              Next {">"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Table;
