import React, { Component } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

class SlideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  CreateTree = (tree) => {
    if (!tree || tree.length === 0) {
      return null;
    }

    return tree.map((item) => (
      <TreeItem key={item.id} nodeId={item.id} label={item.name}>
        {this.CreateTree(item.children)}
      </TreeItem>
    ));
  };

  render() {
    const { data } = this.props;
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {this.CreateTree(data)}
      </TreeView>
    );
  }
}

export default SlideBarMenu;
