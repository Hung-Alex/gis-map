/*
package: https://www.npmjs.com/package/react-leaflet-heatmap-layer-v3
*/
import React, { Component } from "react";
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
import { categoriesTree } from "../data/PlantData/Category";
// import Navbar from "./Layout/Navbar";

class LacDuongMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantType: "all",
    };
  }
  state = { color: "#9f224e" };
  // colors = ["#49932e", "#77ac50", "#98bf6c", "#6ec1c6", "#2d4c47", "#3e8e2f"];
  colors = ["red", "blue", "yellow", "orange", "white", "pink"];
  townColor = {
    "Đạ Chais": "#49932e",
    "Đạ Nhim": "#77ac50",
    "Đạ Sar": "#98bf6c",
    "Đưng K'Nớ": "#6ec1c6",
    "TT. Lạc Dương": "#2d4c47",
    "Xã Lát": "#3e8e2f",
  };

  componentDidMount() {
    console.log(mapData);
  }

  countryStyle = {
    fillColor: "red",
    fillOpacity: 0.5,
    color: "black",
    weight: 2,
  };

  printMesssageToConsole = (event) => {
    console.log("Clicked");
  };

  changeCountryColor = (event) => {
    event.target.setStyle({
      color: "#2e394f",
      fillColor: this.state.color,
      fillOpacity: 1, // 0 hoặc 1
    });
  };

  onEachCountry = (country, layer) => {
    const townName = country.properties.NAME_4; // lấy tên của xã, thị trấn
    console.log(townName); // log ra dãy tên xã bên console
    layer.bindTooltip(townName, { className: "my-tooltip" });

    // end xử lý màu sắc random
    layer.options.fillColor = this.townColor[townName]; //0
    layer.on({
      click: this.changeCountryColor,
    });
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    const center = [12.140721657691136, 108.54228437271122];
    // dữ liệu ảo
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
    // rosePoints.forEach((point) => {
    //   console.log(point.coordinates);
    // });
    const bananaPoints = plantPoints.filter((point) => point.type === "banana");

    const fishPoints = plantPoints.filter((point) => point.type === "fish");

    const points =
      this.state.plantType === "all"
        ? plantPoints
        : this.state.plantType === "rose"
        ? rosePoints
        : this.state.plantType === "fish"
        ? fishPoints
        : bananaPoints;

        console.log(  categoriesTree)
    return (
      <div className="container-fluid text-center bg-light">
        <h3>Bản đồ huyện Lạc Dương</h3>
        
        <div className="text-center">
          {/* navbar */}
          {/* <Navbar /> */}
          <div>
            <button
              className="btn btn-primary btn-sm me-3 mb-1"
              onClick={() => this.setState({ plantType: "all" })}
            >
              Tất cả
            </button>
            <button
              className="btn btn-danger btn-sm me-3 mb-1"
              onClick={() => this.setState({ plantType: "rose" })}
            >
              Hoa Hồng
            </button>
            <button
              className="btn btn-warning btn-sm me-3 mb-1"
              onClick={() => this.setState({ plantType: "banana" })}
            >
              Chuối
            </button>
            <button
              className="btn btn-success btn-sm me-3 mb-1"
              onClick={() => this.setState({ plantType: "fish" })}
            >
              Cá Tầm
            </button>
          </div>
          {/* end navbar */}
          <MapContainer
            style={{ height: "90vh", width: "auto" }}
            zoom={11}
            center={center}
            minZoom={11}
            maxZoom={11} // khóa thu phóng
            // dragging={false} // khóa không cho di chuyển
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatmapLayer
              // fitBoundsOnLoad
              // fitBoundsOnUpdate
              points={points.map((point) => ({
                lat: point.coordinates[0], // vĩ độ
                lng: point.coordinates[1], // kinh độ
                value: point.type,
              }))}
              longitudeExtractor={(m) => m.lng}
              latitudeExtractor={(m) => m.lat}
              intensityExtractor={(m) => m.value}
              maxZoom={11}
              // max={1.0}
              blur={15} // độ mờ của điểm dữ liệu trên bản đồ
              radius={20} // bán kính của vùng
            />
            <GeoJSON
              style={this.countryStyle}
              data={mapData}
              onEachFeature={this.onEachCountry}
            />
            {/* hiển thị vị trí phân bố */}
            {positions.map(({ coords, content }, index) => (
              <Marker
                key={index}
                position={coords}
                icon={
                  new L.Icon({
                    iconUrl: iconLocation,
                    iconSize: [41, 41], // size
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
              /* end vị trí phân bố */
            ))}
            <Control prepend position="topleft">
             
              <SlideBarMenu data={categoriesTree}/>
            </Control>

          </MapContainer>
        </div>
        {/* <input
          type="color"
          value={this.state.color}
          onChange={this.colorChange}
        /> */}
      </div>
    );
  }
}

export default LacDuongMap;
