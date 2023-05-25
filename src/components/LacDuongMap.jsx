// http://159.223.22.242:8855/swagger/index.html
// https://www.npmjs.com/package/react-leaflet-heatmap-layer-v3
import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import mapData from "../data/huyenlacduong.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import iconLocation from "./images/location.png";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { plantPoints } from "../data/PlantData/plant.js";
import SlideBarMenu from "./Layout/SlideBarMenu";
import Control from "react-leaflet-custom-control";
// import { categoriesTree } from "../data/PlantData/Category";

const LacDuongMap = () => {
  const [plantType, setPlantType] = useState("all");
  const [color, setColor] = useState("#9f224e");
  const [townColor] = useState({
    "Đạ Chais": "#49932e",
    "Đạ Nhim": "#77ac50",
    "Đạ Sar": "#98bf6c",
    "Đưng K'Nớ": "#6ec1c6",
    "TT. Lạc Dương": "#2d4c47",
    "Xã Lát": "#3e8e2f",
  });

  const countryStyle = {
    fillColor: "red",
    fillOpacity: 0.5,
    color: "black",
    weight: 2,
  };

  const printMesssageToConsole = () => {
    console.log("Clicked");
  };

  const changeCountryColor = (event) => {
    event.target.setStyle({
      color: "#2e394f",
      fillColor: color,
      fillOpacity: 1,
    });
  };

  const onEachCountry = (country, layer) => {
    const townName = country.properties.NAME_4;
    layer.bindTooltip(townName, { className: "my-tooltip" });

    layer.options.fillColor = townColor[townName];
    layer.on({
      click: changeCountryColor,
    });
  };

  const colorChange = (event) => {
    setColor(event.target.value);
  };

  const center = [12.140721657691136, 108.54228437271122];

  const positions = [
    {
      coords: [12.216667810618665, 108.41141441516834],
      content: "Dưng KNớ, Lạc Dương, Lâm Đồng.",
    },
    {
      coords: [12.023884470589863, 108.43055465115052],
      content: "Tổ dân phố ABC II Thị trấn Lạc Dương Lạc Dương Lâm Đồng.",
    },
    {
      coords: [12.034675216939963, 108.36520960421076],
      content: "Lát ,Lạc Dương, Lâm Đồng.",
    },
    {
      coords: [12.18880105400144, 108.53752665863274],
      content: "Đạ Nhim, Lạc Dương, Lâm Đồng.",
    },
    {
      coords: [12.190704303337201, 108.64343682211647],
      content: "Đạ Chais, Lạc Dương, Lâm Đồng.",
    },
    {
      coords: [12.023773363665688, 108.55944212791175],
      content: "Đạ Sar, Lạc Dương, Lâm Đồng.",
    },
    {
      coords: [12.092806913800128, 108.55194621421649],
      content: "Đạ Nhim 2, Lạc Dương, Lâm Đồng.",
    },
  ];

  const rosePoints = plantPoints.filter((point) => point.type === "rose");
  const bananaPoints = plantPoints.filter((point) => point.type === "banana");
  const fishPoints = plantPoints.filter((point) => point.type === "fish");

  const points =
    plantType === "all"
      ? plantPoints
      : plantType === "rose"
      ? rosePoints
      : plantType === "fish"
      ? fishPoints
      : bananaPoints;

  useEffect(() => {
    console.log(mapData);
  }, []);

  return (
    <div className="container-fluid text-center bg-light">
      <h3>Bản đồ huyện Lạc Dương</h3>
      <div className="text-center">
        <div>
          <button
            className="btn btn-primary btn-sm me-3 mb-1"
            onClick={() => setPlantType("all")}
          >
            Tất cả
          </button>
          <button
            className="btn btn-danger btn-sm me-3 mb-1"
            onClick={() => setPlantType("rose")}
          >
            Hoa Hồng
          </button>
          <button
            className="btn btn-warning btn-sm me-3 mb-1"
            onClick={() => setPlantType("banana")}
          >
            Chuối
          </button>
          <button
            className="btn btn-success btn-sm me-3 mb-1"
            onClick={() => setPlantType("fish")}
          >
            Cá Tầm
          </button>
        </div>
        <MapContainer
          style={{ height: "90vh", width: "auto" }}
          zoom={11}
          center={center}
          minZoom={11}
          maxZoom={11}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatmapLayer
            points={points.map((point) => ({
              lat: point.coordinates[0],
              lng: point.coordinates[1],
              value: point.type,
            }))}
            longitudeExtractor={(m) => m.lng}
            latitudeExtractor={(m) => m.lat}
            intensityExtractor={(m) => m.value}
            maxZoom={11}
            blur={15}
            radius={20}
          />
          <GeoJSON
            style={countryStyle}
            data={mapData}
            onEachFeature={onEachCountry}
          />
          {positions.map(({ coords, content }, index) => (
            <Marker
              key={index}
              position={coords}
              icon={
                new L.Icon({
                  iconUrl: iconLocation,
                  iconSize: [41, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })
              }
            >
              <Popup>
                <span>Vị trí phần bố: {index + 1}</span>
                <br />
                {content}
              </Popup>
            </Marker>
          ))}
          <Control prepend position="topleft">
            <SlideBarMenu />
          </Control>
        </MapContainer>
      </div>
    </div>
  );
};
export default LacDuongMap;
