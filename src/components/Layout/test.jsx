import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import UnfoldLessOutlinedIcon from "@mui/icons-material/UnfoldLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
const CusTreeView = (props) => {
	const { nodes, checked, setChecked, checkModel = "leaf" } = props;
	const [expanded, setExpanded] = useState([]);

	const onCheck = (newChecked) => {
		setChecked(newChecked);
	};

	const onExpand = (newExpanded) => {
		setExpanded(newExpanded);
	};

	return (
		<CheckboxTree
			nodes={nodes}
			checked={checked}
			expanded={expanded}
			onCheck={onCheck}
			onExpand={onExpand}
			showNodeIcon={false}
			checkModel={checkModel}
			icons={{
				check: <CheckBoxOutlinedIcon className="rct-icon rct-icon-check" />,
				uncheck: <CropSquareIcon className="rct-icon rct-icon-uncheck" />,
				halfCheck: (
					<IndeterminateCheckBoxOutlinedIcon className="rct-icon rct-icon-half-check" />
				),
				expandClose: (
					<ExpandLessOutlinedIcon className="rct-icon rct-icon-expand-close" />
				),
				expandOpen: (
					<ExpandMoreOutlinedIcon className="rct-icon rct-icon-expand-open" />
				),
				expandAll: (
					<UnfoldMoreOutlinedIcon className="rct-icon rct-icon-expand-all" />
				),
				collapseAll: (
					<UnfoldLessOutlinedIcon className="rct-icon rct-icon-collapse-all" />
				),
			}}
		/>
	);
};

export default CusTreeView;
