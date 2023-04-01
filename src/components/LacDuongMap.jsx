import React, { Component } from "react";
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import mapData from "./../data/huyenlacduong.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import iconLocation from "./images/location.png";

class LacDuongMap extends Component {
  state = { color: "#91C788" };
  colors = ["red", "blue", "yellow", "orange", "grey", "pink"];

  componentDidMount() {
    console.log(mapData);
  }

  countryStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  printMesssageToConsole = (event) => {
    console.log("Clicked");
  };

  changeCountryColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: this.state.color,
      fillOpacity: 2,
    });
  };

  onEachCountry = (country, layer) => {
    const countryName = country.properties.NAME_4; // lấy tên của xã
    console.log(countryName); // log ra dãy tên xã bên console
    layer.bindTooltip(countryName, { className: "my-tooltip" });

    // xử lý màu sắc random
    layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
    const colorIndex = Math.floor(Math.random() * this.colors.length);
    layer.options.fillColor = this.colors[colorIndex]; //0

    layer.on({
      click: this.changeCountryColor,
    });
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    const center = [12.126253406842906, 108.55943680481168];
    // dữ liệu ảo
    const positions = [
      {
        coords: [12.237512529881249, 108.4774921063408],
        content:
          "Tổ dân phố Bon Đưng II Thị trấn Lạc Dương Lạc Dương Lâm Đồng.",
      },
      {
        coords: [12.085738195608876, 108.63222122825454],
        content: "Tổ dân phố ABC II Thị trấn Lạc Dương Lạc Dương Lâm Đồng.",
      },
      {
        coords: [12.034675216939963, 108.36520960421076],
        content: "Tổ dân phố XYZ II Thị trấn Lạc Dương Lạc Dương Lâm Đồng.",
      },
    ];
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Bản đồ huyện Lạc Dương</h1>
        <MapContainer
          style={{ height: "90vh", width: "auto" }}
          zoom={11}
          center={center}
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
