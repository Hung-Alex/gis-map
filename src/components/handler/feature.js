export default function CreateFeatures(listPlace, root) {
	if (!listPlace || listPlace.length === 0) {
		return null;
	}
	let nameFeature = "Bản đồ phân bố nông nghiệp";
	if (root && root.name) {
		nameFeature = root.name;
	}
	let data = {
		type: "FeatureCollection",
		name: "name",
		crs: {
			type: "name",
			properties: {
				name: "urn:ogc:def:crs:OGC:1.3:CRS84",
			},
		},
	};
	data.features = listPlace
		.map((place) => CreateFeature(place))
		.filter((item) => item);
	return data;
}

function CreateFeature(place, property = null) {
	if (!place || !place.locations || place.locations.length === 0) {
		console.log(place.name ? place.name : "khong biet khu vuc nao");
		return null;
	}
	let feature = {
		type: "Feature",
		properties: {
			id: place.id,
			name: place.name,
			type: place.type,
			disabled: place.disabled,
		},
		geometry: {
			type: "MultiPolygon",
			coordinates: [[[...place.locations]]],
		},
	};

	return feature;
}
