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
    if(tree && tree==null && tree.length>0)
    {
      return;
    }
    
    var treeMap= tree.map((item, index) => {
      var children=this.CreateTree(item.children);
      return(
        <TreeItem nodeId={item.id} label={item.name}>
          {children}
      </TreeItem>
      )
    })
      
   
    
    // {options.map((option, index) => {
    //   return (
    //     <MenuItem
    //       className={cx("menu-item", option.id === idSelect ? "menu-item-select" : "")}
    //       key={option.id}
    //       disabled={disableFistItem ? 0 === index : false}
    //       selected={option.id === idSelect}
    //       onClick={(e) => onChange(option.id)}
    //     >
    //       {option.name}
    //     </MenuItem>
    //   );
    // })}


    return treeMap;
      
     
  };
  render() {
    const { data } = this.props;
    console.log(typeof data)

    return (
      //   <div className={`sidebar-menu `}>
      //     <button className="menu-toggle">
      //       Menu
      //     </button>
      //     <ul className="menu-items">
      // {data.map((item, index) => (
      //     // console.log(item.name)
      //     <li key={index}>
      //        <a> {item.name}</a>
      //     </li>

      // ))}

      //     </ul>
      //   </div>
      <div>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {this.CreateTree(data)}
        </TreeView>
      </div>
    );
  }
}
export default SlideBarMenu;
