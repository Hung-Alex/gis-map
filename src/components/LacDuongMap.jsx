// http://159.223.22.242:8857/swagger/index.html
// https://www.npmjs.com/package/react-leaflet-heatmap-layer-v3
import React, { useState, useEffect } from "react";
import TableArea from "./Layout/TableArea";
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
import locationIcon from "./images/location.png";
import nullIcon from "./images/nullIcon.png";
import roseIcon from "./images/rose.png";
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
import { GetDist as getDist } from "../Services/dist";
import MenuIcon from "@mui/icons-material/Menu";
import { Checkbox, FormControlLabel } from "@mui/material";
import L from "leaflet";
import Control from "react-leaflet-custom-control";

const DISTRICT = "district";
const WARD = "ward";
const PROVINCE = "province";
const mainMapColor = "#D4F0FD";
const listTypePlace = [
  { type: PROVINCE, name: "Cấp Tỉnh " },
  { type: DISTRICT, name: "Cấp Huyện/Quận" },
  { type: WARD, name: "Cấp Xã/Phường" },
];
const LacDuongMap = () => {
  const [plantType, setPlantType] = useState("all");
  const [color, setColor] = useState("#9f224e");
  const [menu, setMenu] = useState(initMenu);
  const [selected, setSelected] = useState(initSelected);
  const [itemsPlace, setItemsPlace] = useState(null);
  const [isLoadAll, setIsLoadAll] = useState(true);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("1");
  const [dist, setDist] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [mapType, setMapType] = useState(20);
 
  //==================================Hover Map==========================================
  const [hoverLayerMap, setHoverLayerMap] = useState(false);
  const [infoLayerHover, setInfoLayerHover] = useState([]);
  //============================================================================

  // chọn loại bản đồ
  const handleChangeMapType = (event) => {
    setMapType(event.target.value);
  };
  const handleCheckAll = () => {
    setIsLoadAll((pre) => !pre);
  };
  const AddPlaceSelected = (id) => {
    setSelected((prevSelected) => {
      let newVarietiesSelected = [...prevSelected.varietiesSelected];
      if (newVarietiesSelected.includes(id)) {
        newVarietiesSelected = newVarietiesSelected.filter(
          (item) => item !== id
        );
      } else {
        newVarietiesSelected.push(id);
      }
      return {
        ...prevSelected,
        varietiesSelected: newVarietiesSelected,
      };
    });
  };

  const colorDisable = "black";
  const defaultStyle = {
    fillColor: "black",
    fillOpacity: 0.2,
    color: "black",
    weight: 1,
  };
  const selectedStyle = {
    fillColor: "green",
    fillOpacity: 0.6,
    color: "green",
    weight: 3,
  };
  const disableStyle = {
    fillColor: "black",
    fillOpacity: 0.4,
    color: "black",
    weight: 0.1,
  };
  const nullStyle = {
    fillColor: "white",
    fillOpacity: 0.4,
    color: "black",
    weight: 0.6,
  };

  const printMesssageToConsole = () => {
    console.log("Clicked");
  };

  //======================xử lý hover vào layer==========================================
  const handlerHoverLayer = (event) => {
    let node = findNodeById(menu.treePlace, event.target.options.id);
    let listSelected = event.target.options.placesSelected;

    console.log("hover dang chonj", node);
    console.log("cay dang chon", selected.varietiesSelected);
    // console.log("danh sach cay trong", menu.listVariety);
    // console.log("all dan chon", isLoadAll);

    console.log("khu vuc dang chon", selected.placesSelected);
    console.log("loai khu vuc dang chon", event.target.options.id);
  };

  //================================================================

  const handlerGetLocation = (event) => {
    if (isLoadAll) {
      setIsLoadAll(false);
    }
    let node = findNodeById(menu.treePlace, event.target.options.id);
    let listSelected = event.target.options.placesSelected;
    if (node && !node.disabled) {
      if (node.type === WARD) {
        handleCheckPlace(null, node.id);
      } else {
        handleCheckPlace(getLeafNodes(node).map((leaf) => leaf.id));
      }
      AddPlaceSelected(node.id);
    } else {
      window.alert("Khu vực không có dữ liệu nông nghiệp");
    }
  };
  function handleGetChildrenPlace(event) {
    let object = menu.mapPlace[event.target.options.id];
    console.log(object);
    if (object && !object.disabled) {
      if (object.type == DISTRICT) {
        handleSelectTypePlace(WARD);
      } else if (object.type == PROVINCE) {
        handleSelectTypePlace(DISTRICT);
      } else {
        return;
      }
      setItemsPlace(null);
    } else {
      window.alert("Khu vực không có dữ liệu nông nghiệp");
    }
  }

  //======================== hiển thị mật độ diện tích theo vùng màu  của thông số diện tích ========================================

  function getColor(d) {
    return d > 500000
      ? "red"
      : d > 300000
      ? "blue"
      : d > 200000
      ? "green"
      : d > 100000
      ? "yellow"
      : d > 80000
      ? "orange"
      : d > 50000
      ? "purple"
      : d > 30000
      ? "pink"
      : d > 10000
      ? "brown"
      : d > 1000
      ? "#7B68EE"
      : d > 100
      ? "#CFF5E7"
      : "gray";
  }

  async function getDynamicStyle(locationId) {
    try {
      var result = await getDist({
        varieties: selected.varietiesSelected,
        places: locationId.split(" "),
      });

      //  console.log("chua loc ",result);

      // const filteredPoints = result.points.filter((point) => {
      //   // Kiểm tra xem point.varieties có chứa bất kỳ ID nào trong filterByIds hay không
      //   return point.varieties.some((variety) =>
      //     selected.varietiesSelected.includes(variety.id)
      //   );
      // });

      // console.log("đã lọc ", filteredPoints);

      var area = Number(result.totalArea);
      console.log("id huyen", locationId);

      console.log("area huyen", area);

      return {
        fillColor: getColor(area),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    } catch (error) {
      console.log(error);

      return {
        fillColor: getColor(0), // Giá trị mặc định nếu có lỗi
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
  }

  async function getDynamicStyleProvince(locationsId) {
    console.log("place gui len cua tinh",locationsId);
    try {
      var result = await getDist({
        varieties: selected.varietiesSelected,
        places: locationsId,
      });
      var area = Number(result.totalArea);
      return {
        fillColor: getColor(area),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    } catch (error) {
      console.log(error);

      return {
        fillColor: getColor(0), // Giá trị mặc định nếu có lỗi
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
  }
  //================================================================
  const onPlace = async (place, layer, event) => {
    const name = place.properties.name;
    layer.bindTooltip(name, { className: "my-tooltip" });
    layer.options.fillColor = mainMapColor;
    let props = place.properties;
    layer.options.id = props.id;
    layer.options.placesSelected = selected.placesSelected;
    layer.options.itemSelected = itemsPlace;
    var dynamicStyle = disableStyle;
    
    var provinceOfPlaceSelected =[];

    if(selected.placesSelected.length > 0)
    {// lọc ra các tỉnh  đã được chọn 
      for(let i = 0; i < selected.placesSelected.length; i++){
        let node = findNodeById(menu.treePlace, selected.placesSelected[i]);
        if(!provinceOfPlaceSelected.includes(node?.parentId))
        {
          provinceOfPlaceSelected.push(node?.parentId);
        }
      }
    }
   
    if(selected.typePlaceSelected ==PROVINCE)//tỉnh
    {
      if(selected.placesSelected.length ===0)//nếu chưa chọn cái gì hết thì hiển thị  tất cả 
      {
        dynamicStyle = await getDynamicStyle(layer.options.id);// lấy theo của tỉnh của từng layer
      }else{//nếu có chọn địa điểm 
        dynamicStyle = await getDynamicStyleProvince(selected.placesSelected);//gửi lên những địa điểm đang được chọn
      }
    }
    if(selected.typePlaceSelected ==DISTRICT)// Quận Huyện
    {
      console.log("id cua huyen loc",layer.options.id);
      if(selected.placesSelected.length===0){// trường hợp mà chưa chọn địa điểm gì hết
        if (!props.disabled) {
          let node = findNodeById(menu.treePlace, layer.options.id);// tìm node của huyện đó và lấy ra những xã phường của huyện quận đó
          var childrens=node.children.map(({id})=>id);// tách hết các xã /phường ra thành 1 mảng theo id 
          dynamicStyle = await getDynamicStyleProvince(childrens);// gửi những điểm thuộc xã đó 
        }
      }
      else{// trường hợp chọn địa điểm 
        if(provinceOfPlaceSelected?.includes(layer.options.id)) // kiểm tra xem địa điểm đó có thuộc cái điểm đang chọn hay ko 
        {
          let node = findNodeById(menu.treePlace, layer.options.id);// lấy node cha
          var filterLocationIsSelectedOfDistrict =selected.placesSelected.filter(item => node.children.some(obj=>obj.id === item));// lọc địa điểm đã được chọn ra 
          console.log("các điểm huyện quận đã lọc",filterLocationIsSelectedOfDistrict);
          dynamicStyle = await getDynamicStyleProvince(filterLocationIsSelectedOfDistrict);
        }
      }
    }
    if(selected.typePlaceSelected ==WARD )// Xã/phường 
    {
      if (selected.placesSelected.length === 0) {
        if (!props.disabled) {
          dynamicStyle = await getDynamicStyle(layer.options.id);
        }
      } else {
        if (!props.disabled && selected.placesSelected.includes(props.id)) {
          dynamicStyle = await getDynamicStyle(layer.options.id);
        } else {
          // if (!props.disabled) {
          //   dynamicStyle = await getDynamicStyle(layer.options.id);
          // }
        }
      }
    }



    // console.log("loai khu vuc dang duoc chon",selected.typePlaceSelected);
    // let node = findNodeById(menu.treePlace, props.id);
    // console.log("loai khu vuc dang chon la tinh",node?.type);
   
      
    

    if (itemsPlace && itemsPlace.includes(props.id)) {
      layer.setStyle(selectedStyle);
    } else if (props.disabled) {
      layer.setStyle(disableStyle);
    } else {
      layer.setStyle(dynamicStyle);
    }
    layer.on({
      click: handlerGetLocation,
      dblclick: handleGetChildrenPlace,
      mouseover: handlerHoverLayer,
    });
  };

  const colorChange = (event) => {
    setColor(event.target.value);
  };

  const center = [12.140721657691136, 108.54228437271122];

  const getFeatureByPlaces = (places, map, type) => {
    if (!places) return null;
    var list = places
      .filter((place) => place.type == type)
      .map((item) => map[item.id]);
    return CreateFeatures(list);
  };
  useEffect(() => {
    getCategories().then((data) => {
      if (data) {
        let menuItem = {
          ...menu,
          listCategory: data.categories,
          treeCategory: data.categoriesTree,
          listVariety: data.varieties,
          treePlace: CreateTreeFromList(data.places),
          listPlace: data.places,
          mapPlace: data.mapPlace,
          [WARD]: getFeatureByPlaces(data.places, data.mapPlace, WARD),
          [DISTRICT]: getFeatureByPlaces(data.places, data.mapPlace, DISTRICT),
          [PROVINCE]: getFeatureByPlaces(data.places, data.mapPlace, PROVINCE),
        };
        setMenu(menuItem);
        setSelected({ ...initSelected, typePlaceSelected: PROVINCE });
      }
      setLoading(false);
    });
  }, []);

  const fetchDist = async (varieties, places) => {
    let data = await getDist({ varieties: varieties, places: places });
    if (data) {
      setDist(data);
    } else {
      setDist(null);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (
      (selected.varietiesSelected && selected.varietiesSelected.length > 0) ||
      (selected.placesSelected && selected.placesSelected.length > 0)
    ) {
      fetchDist(selected.varietiesSelected, selected.placesSelected);
      setLoading(true);
    } else if (!isLoadAll) {
      setDist(null);
    }
    if (!selected.placesSelected || selected.placesSelected.length === 0) {
      setItemsPlace(null);
    }
  }, [selected.varietiesSelected, selected.placesSelected]);

  useEffect(() => {
    if (isLoadAll === false) {
      setSelected((pre) => {
        return {
          ...initSelected,
          typePlaceSelected: pre.typePlaceSelected,
        };
      });
      setDist(null);
    } else {
      fetchDist([], []);
      setLoading(true);
    }
  }, [isLoadAll]);
  const handleSelectTypePlace = (event) => {
    let selectedValue;
    if (event.target && event.target.value) selectedValue = event.target.value;
    else selectedValue = event;
    setSelected({
      ...selected,
      typePlaceSelected: selectedValue,
    });
  };
  const handleCheckPlace = (newChecked, id) => {
    if (
      newChecked &&
      JSON.stringify(newChecked) !== JSON.stringify(selected.placesSelected)
    )
      setSelected({
        ...selected,
        placesSelected: newChecked,
      });
    else if (id) {
      setSelected((pre) => {
        let listPlace = pre.placesSelected;
        if (listPlace && listPlace.length > 0) {
          if (listPlace.includes(id)) {
            listPlace = listPlace.filter((item) => item.id !== id);
          } else {
            listPlace = [...listPlace, id];
          }
        } else {
          listPlace = [id];
        }

        return {
          ...pre,
          placesSelected: listPlace,
        };
      });
    }
  };
  const handleCheckCategories = (newChecked) => {
    if (JSON.stringify(newChecked) !== JSON.stringify(menu.categoriesSelected))
      setSelected({
        ...selected,
        varietiesSelected: newChecked,
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  // points.varieties.id
  // Hiển thị tọa độ và hình ảnh khi nhấn vào loại
  const filterLocationAndImages = () => {
    const filteredPoints =
      dist && dist.points
        ? dist.points.filter((item) =>
            item.varieties.some((variety) =>
              selected.varietiesSelected.includes(variety.id)
            )
          )
        : [];

    const filteredLocations = filteredPoints.map((item) => item.location);

    const selectedImageUrls = menu.listVariety.flatMap((variety) =>
      selected.varietiesSelected.includes(variety.id) ? variety.images : []
    );

    return {
      locations: filteredLocations,
      images: selectedImageUrls,
    };
  };

  const { locations, images } = filterLocationAndImages();

  // lọc hình ảnh
  const ImageUrlsAll =
    dist && dist.points
      ? dist.points.map((point) => {
          const location = point.location;

          const varieties = point.varieties.map((item) => {
            if (item.id) {
              const foundVariety = menu.listVariety.find(
                (varietiesId) => varietiesId.id === item.id
              );
              if (
                foundVariety &&
                foundVariety.images &&
                foundVariety.images.length > 0
              ) {
                return foundVariety.images[0];
              }
            }
          });
          return [location, varieties];
        })
      : [];

  console.log(ImageUrlsAll);

  // console.log(selected.varietiesSelected);



  return (
    <div className="text-center bg-light">
      <button className="menu-btn" onClick={handleShowMenu}>
        <MenuIcon fontSize="large" />
      </button>
      <h3 className="title">Bản đồ huyện Lạc Dương</h3>
      <Box
        className="content"
        sx={{ display: "flex", width: "100%", height: "100vh" }}
      >
        <Box className={showMenu ? "controls-box show-menu" : "controls-box"}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              ml: 1,
              mr: 1,
              mb: 1,
              gap: 1,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Chọn loại bản đồ
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mapType}
                label="Age"
                onChange={handleChangeMapType}
              >
                <MenuItem value={20}>Bản đồ nhiệt</MenuItem>
                <MenuItem value={21}>Bản đồ phân bố</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              label="Chọn tất cả"
              control={
                <Checkbox checked={isLoadAll} onChange={handleCheckAll} />
              }
            />
          </Box>
          <div style={{ pointerEvents: isLoadAll ? "none" : "auto" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab className="tab-title" label="Giống cây" value="1" />
                  <Tab className="tab-title" label="Khu vực" value="2" />
                </TabList>
              </Box>
              <TabPanel className="tab-panel" value="1">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    ml: 1,
                    mr: 1,
                    mb: 1,
                    gap: 1,
                  }}
                >
                  <span
                    className="btn-clear"
                    onClick={() => handleCheckCategories([])}
                  >
                    Bỏ chọn
                  </span>
                </Box>
                <CusTreeView
                  nodes={menu.treeCategory}
                  checked={selected.varietiesSelected}
                  setChecked={handleCheckCategories}
                  // {menu.treeCategory.image}
                />
              </TabPanel>
              <TabPanel className="tab-panel" value="2">
                <Box
                  sx={{
                    pl: 1,
                    pr: 1,
                    mb: 1,
                    mt: 2,
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="select-label">
                      Chọn loại khu vực hiển thị
                    </InputLabel>
                    <Select
                      className="select-box"
                      value={selected.typePlaceSelected}
                      labelId="select-label"
                      id="select-box"
                      onChange={handleSelectTypePlace}
                      label="Chọn loại khu vực hiển thị"
                    >
                      {listTypePlace.map((item) => (
                        <MenuItem value={item.type}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    ml: 1,
                    mr: 1,
                    mb: 1,
                    gap: 1,
                  }}
                  onClick={() => handleCheckPlace([])}
                >
                  <span
                    className="btn-clear"
                    onClick={() => handleCheckPlace([])}
                  >
                    Bỏ chọn
                  </span>
                </Box>
                <CusTreeView
                  nodes={menu.treePlace}
                  checked={selected.placesSelected}
                  setChecked={handleCheckPlace}
                />
              </TabPanel>
            </TabContext>
          </div>
        </Box>
        <Box className="map-box">
          <MapContainer
            className="map"
            style={{ height: "100%", width: "100%" }}
            zoom={11}
            center={center}
            minZoom={9}
            maxZoom={16}
            // giới hạn không vượt qua đường biên giới
            maxBounds={[
              [8.1466, 102.1446], // Tọa độ góc trên bên trái
              [23.4215, 109.4629], // Tọa độ góc dưới bên phải
            ]}
            scrollWheelZoozm={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* hiển thị các điểm nhiệt */}
            {dist && mapType === 20 && (
              <HeatmapLayer
                points={dist.points.map((point) => {
                  let location = {
                    lat: point.location.lat,
                    lng: point.location.lng,
                  };
                  return location;
                })}
                longitudeExtractor={(m) => m.lng}
                latitudeExtractor={(m) => m.lat}
                intensityExtractor={(m) => m.value}
                maxZoom={11}
                blur={20}
                radius={14}
              />
            )}
            {/* hiểu thị icon */}
            {dist && mapType === 21 && isLoadAll && ImageUrlsAll.length > 0
              ? ImageUrlsAll.map((coord, index) => (
                  <Marker
                    key={index}
                    position={[coord[0].lat, coord[0].lng]}
                    icon={
                      new L.Icon({
                        iconUrl: locationIcon,
                        iconSize: [41, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                      })
                    }
                  >
                    <Popup>
                      {coord[1].length > 0 ? (
                        coord[1].map((imageUrl, i) => (
                          <img
                            key={i}
                            src={imageUrl}
                            alt={`Icon ${i + 1}`}
                            style={{
                              width: "41px",
                              height: "41px",
                              margin: "6px",
                            }}
                          />
                        ))
                      ) : (
                        <img
                          src={nullIcon}
                          alt="Null Icon"
                          style={{
                            width: "41px",
                            height: "41px",
                            margin: "6px",
                          }}
                        />
                      )}
                    </Popup>
                  </Marker>
                ))
              : locations.map((item, index) => (
                  <Marker
                    key={index}
                    position={[item.lat, item.lng]}
                    icon={
                      new L.Icon({
                        iconUrl:
                          images.length > 0
                            ? images[index % images.length]
                            : "",
                        iconSize: [41, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                      })
                    }
                  />
                ))}
            <GeoJSON
              key={selected.typePlaceSelected}
              data={menu[selected.typePlaceSelected]}
              onEachFeature={onPlace}
            />
            <ZoomControl position="bottomright" />
            <Control position="topright">
              <TableArea></TableArea>
            </Control>
          </MapContainer>
          <Box className="area-box">
            {dist && <p>{`Diện tích nông nghiệp: ${dist.totalArea}`}</p>}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LacDuongMap;
// [12.286388234394906,108.5723565927364]
