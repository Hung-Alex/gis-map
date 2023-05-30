import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "./../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends Component {
	state = { color: "#ffff00" };

	colors = ["green", "blue", "yellow", "orange", "grey"];

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
			fillOpacity: 1,
		});
	};

	onEachCountry = (country, layer) => {
		const countryName = country.properties.Name_0;
		console.log(countryName);
		layer.bindPopup(countryName);

		layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
		// const colorIndex = Math.floor(Math.random() * this.colors.length);
		// layer.options.fillColor = this.colors[colorIndex]; //0

		layer.on({
			click: this.changeCountryColor,
		});
	};

	colorChange = (event) => {
		this.setState({ color: event.target.value });
	};

	render() {
		return (
			<div>
				<h1 style={{ textAlign: "center" }}>Bản đồ thành phố Đà Lạt</h1>

				<MapContainer
					style={{ height: "90vh", width: "auto" }}
					zoom={12}
					center={[11.937937736511287, 108.435295104980412]}
				>
					<GeoJSON
						style={this.countryStyle}
						data={mapData.features}
						onEachFeature={this.onEachCountry}
					/>
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

export default MyMap;
