import React, { useEffect, useState } from "react";
import { menuSelect as menu } from "../../utils/menu";
import PlaceBarMenu from "./PaceMenu";

const MenuBar = () => {
	const [menu, setMenu] = useState(menuSelect);

	useEffect(() => {
		getCategories().then((data) => {
			if (data) {
				setMenu({
					listCategory: data.categories,
					treeCategory: data.categoriesTree,

					listVariety: data.varieties,

					listPlace: data.places,
					treePlace: data.placesTree,
				});
			}
		});
	}, []);

	return (
		<div className="menu-bar">
			<div>
				<PlaceBarMenu />
			</div>
		</div>
	);
};

export default MenuBar;
