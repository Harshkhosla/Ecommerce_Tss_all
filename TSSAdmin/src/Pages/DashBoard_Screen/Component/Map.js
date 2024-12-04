import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import React from "react";
import { colorScale, countries1,countries2, missingCountries } from "./Countries";

function WorldMap() {
  return (
    <div style={{ margin:'auto', width: "1000px", height: "600px" }}>
      <VectorMap
        map={worldMill}
        containerStyle={{
          width: "1000px",
          height: "600px",
        }}
        backgroundColor="#282c34"
        markers={missingCountries}
        markerStyle={{
          initial: {
            fill: "red",
          },
        }}
        series={{
          regions: [
            {
              scale: colorScale,
              values: countries1,
              values: countries2,
              min: 0,
              max: 100,
            },
          ],
        }}
        onRegionTipShow={function reginalTip(event, label, code) {
            
          return label.html(`
                  <div style="background-color: white; border-radius: 6px; min-height: 50px; width: 125px; color: black"; padding-left: 10px>
                    <p>
                    <b>
                    ${label.html()}
                    </b>
                    </p>
                    <p>Orders:${countries1[code]?countries1[code]:0}</p>
                    <p>
                    Amount:${countries2[code]?countries2[code]:0}
                    </p>
                    </div>`);
        }}
        onMarkerTipShow={function markerTip(event, label, code) {
          return label.html(`
                  <div style="background-color: white; border-radius: 6px; min-height: 50px; width: 125px; color: black !important; padding-left: 10px>
                    <p style="color: black !important;">
                    <b>
                    ${label.html()}
                    </b>
                    </p>
                    </div>`);
        }}
      />
    </div>
  );
}

export default WorldMap;
