import axios from "axios";

export async function getLocation(category, varities) {
  try {
    const param = {
      categoryIds: category,
      varietyIds: varities,
    };
    const response = await axios.post(
      "http://159.223.22.242:8855/api/v1/dist/",
      param,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    if (data.status == 200) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error", error.message);
    return null;
  }
}
