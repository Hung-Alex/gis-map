import * as request from "./request";

const path = "/dist/";
export async function GetDist(query) {
	const { varieties, places } = query;
	const reqData = {};
	reqData.varietyIds = varieties;
	reqData.placeIds = places;
	console.log(reqData);
	const response = await request.post(path, reqData);
	return response;
}
const pathLocation = "/place/";
export async function GetProvince() {
	const reqData = {
		params: {
			location: true,
		},
	};
	const response = await request.get(pathLocation, reqData);
	console.log(response);
	return response;
}
