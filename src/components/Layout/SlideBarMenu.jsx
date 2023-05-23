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
      Varities:[],
    };
  }

  componentDidMount() {

    getCategories().then(data=>{
      if(data){
         this.setState({Category:data.categoriesTree})
         this.setState({Varities:data.varieties})
          
      }else{
        this.setState({Category:[]})
        this.setState({Varities:[]})
      }
  })
    
  }

  CreateTree = (tree) => {
    if (!tree || tree.length === 0) {
      return null;
    }
    const varities = (itemid) => this.state.Varities.filter(x => x.category_id === itemid);
    return tree.map((item) => {
      const children = this.CreateTree(item.children);
      const filteredVarities = varities(item.id);
      
      return (
        <TreeItem key={item.id} nodeId={item.id} label={item.name}>
        {children}
        {filteredVarities.map((variety) => (
          <TreeItem key={variety.id} nodeId={variety.id} label={variety.name} />
        ))}
      </TreeItem>
      );
    });
  };

  render() {
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
