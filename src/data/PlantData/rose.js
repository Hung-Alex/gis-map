/*
Màu gradient:
+ Hoa Hồng: 
+ Chuối: 
+ Dưa Hấu: 
*/
const rose = {
  0.4: "#ff037f",
  0.8: "#f800ff",
  1.0: "#ff00bd",
}

const banana = {
  0.4: "#ffbd03",
  0.8: "#feff00",
  1.0: "#fffc00",
}

const watermelon = {
  0.4: 'blue',
  0.6: 'cyan',
  0.7: 'lime',
  0.8: 'yellow',
  1.0: 'red'
}
// [vĩ độ, kinh độ]
export const plantPoints = [
  {
    coordinates: [12.181209277146628, 108.47054492233295],
    color: rose,
  },
  {
    coordinates: [12.189675107755201, 108.49075384333284],
    color: rose,
  },
  {
    coordinates: [12.200680283562349, 108.48526856477572],
    color: rose,
  },
  {
    coordinates: [12.204630748034024, 108.4667918370044],
    color: rose,
  },
  {
    coordinates: [12.196729760195948, 108.44254113180452],
    color: rose,
  },
  {
    coordinates: [12.180927078141542, 108.45004730246164],
    color: rose,
  },
  // Đạ Sar
  {
    coordinates: [12.004363332198217, 108.58415926576693],
    color: banana,
  },
  // Đạ Chais
  {
    coordinates: [12.240053701736754, 108.6542075900104],
    color: banana,
  },
  {
    coordinates: [12.229715327852183, 108.63002479826311],
    color: banana,
  },
  // Lạc Dương
  {
    coordinates: [12.012761996995186, 108.43995195344564],
    color: watermelon,
  },
  {
    coordinates: [12.001344404932981, 108.4426985354616],
    color: watermelon,
  },
];
