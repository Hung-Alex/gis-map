import React, { Component } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { getCategories } from "../../Services/CategoryService";
import { Category } from "@mui/icons-material";

class SlideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      Category:[],
    };
  }

  componentDidMount() {

    getCategories().then(data=>{
      if(data){
         this.setState({Category:data.categoriesTree})
          
      }else{
        this.setState({Category:[]})
      }
  })
    
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
        {this.CreateTree(this.state.Category)}
      </TreeView>
    );
  }
}

export default SlideBarMenu;
