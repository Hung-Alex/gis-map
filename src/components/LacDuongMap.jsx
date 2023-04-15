import React, { Component } from "react";
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import mapData from "./../data/huyenlacduong.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import iconLocation from "./images/location.png";

class LacDuongMap extends Component {
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

    // xử lý màu sắc random
    // layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)// random độ mờ
    // const colorIndex = Math.floor(Math.random() * this.colors.length);

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
    return (
      <div className="container-fluid text-center bg-light">
        <h1>Bản đồ huyện Lạc Dương</h1>
        <div className="text-center">
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
          </MapContainer>
        </div>
        <input
          type="color"
          value={this.state.color}
          onChange={this.colorChange}
        />
      </div>
    );
  }
}

export default LacDuongMap;
