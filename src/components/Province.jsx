// http://159.223.22.242:8855/swagger/index.html
// https://www.npmjs.com/package/react-leaflet-heatmap-layer-v3
import React, { useState, useEffect } from "react";
import {
	MapContainer,
	GeoJSON,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
} from "react-leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import iconLocation from "./images/location.png";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import CusTreeView from "./Layout/test";
// import { categoriesTree } from "../data/PlantData/Category";
import { menu as initMenu, selected as initSelected } from "../utils/menu";
import { getCategories } from "../Services/CategoryService";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CreateFeatures from "./handler/feature";
import CreateTreeFromList, { findNodeById, getLeafNodes } from "./handler/tree";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { GetProvince, GetDist as getDist } from "../Services/dist";
import MenuIcon from "@mui/icons-material/Menu";
import { Checkbox, FormControlLabel } from "@mui/material";
const mainMapColor = "#ffffff";
const defaultStyle = {
	fillColor: "white",
	fillOpacity: 0.2,
	color: "black",
	weight: 1,
};
const Province = () => {
	const [province, setProvince] = useState(null);
	const [key, setKey] = useState(1);
	const fetchProvince = async () => {
		let data = await GetProvince();
		if (data) {
			setProvince(CreateFeatures(data));
		}
		setKey((pre) => pre++);
	};
	const center = [12.140721657691136, 108.54228437271122];
	const onPlace = (place, layer) => {
		const name = place.properties.name;
		layer.bindTooltip(name, { className: "my-tooltip" });
		layer.options.fillColor = mainMapColor;
		let props = place.properties;
		layer.options.id = props.id;
		layer.options = {
			...layer.options,
			...defaultStyle,
		};
	};
	useEffect(() => {
		fetchProvince();
	}, []);
	return (
		<Box
			className="map-box"
			sx={{
				width: "100vw",
				height: "100vh",
			}}
		>
			<MapContainer
				style={{ height: "100%", width: "100%" }}
				zoom={11}
				center={center}
				minZoom={9}
				maxZoom={16}
				scrollWheelZoozm={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{province && (
					<GeoJSON
						key={province}
						data={province}
						onEachFeature={onPlace}
					/>
				)}
				<ZoomControl position="bottomright" />
			</MapContainer>
		</Box>
	);
};
export default Province;
