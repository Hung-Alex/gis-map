import React, { useEffect, useState } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Checkbox from "@mui/material/Checkbox";
import { getCategories } from "../../Services/CategoryService";

const SlideBarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      if (data) {
        setCategory(data.categoriesTree);
        setVarieties(data.varieties);
      } else {
        setCategory([]);
        setVarieties([]);
      }
    });
  }, []);

  const handleNodeSelect = (event, nodeId, parentId) => {
    const parentIndex = selectedNodes.findIndex((node) => node.id === parentId);

    if (parentIndex !== -1) {
      const selectedParent = selectedNodes[parentIndex];
      const selectedChildren = selectedParent.children;

      const childIndex = selectedChildren.findIndex(
        (child) => child.id === nodeId
      );

      if (childIndex !== -1) {
        selectedChildren.splice(childIndex, 1);
      } else {
        selectedChildren.push({ id: nodeId, children: [] });
      }

      if (selectedChildren.length === 0) {
        selectedNodes.splice(parentIndex, 1);
      }
    } else {
      const newParentNode = {
        id: parentId,
        children: [{ id: nodeId, children: [] }],
      };

      selectedNodes.push(newParentNode);
    }

    setSelectedNodes([...selectedNodes]);
  };

  const handleCheckboxChange = (event, nodeId, parentId) => {
    event.stopPropagation();

    const parentIndex = selectedNodes.findIndex((node) => node.id === parentId);

    if (parentIndex !== -1) {
      const selectedParent = selectedNodes[parentIndex];
      const selectedChildren = selectedParent.children;

      console.log('Thông tin node Cha:', selectedParent.id);
     
      selectedChildren.map((item,index)=>{
        console.log('Thông tin node con của nó:', item.id);
        item.children.map((item,index)=>{
        console.log('Thông tin node con của nua:', item.id);

        })
      })
      const childIndex = selectedChildren.findIndex(
        (child) => child.id === nodeId
      );

      if (childIndex !== -1) {
        selectedChildren.splice(childIndex, 1);
      } else {
        selectedChildren.push({ id: nodeId, children: [] });
      }

      if (selectedChildren.length === 0) {
        selectedNodes.splice(parentIndex, 1);
      }
    } else {
      const newParentNode = {
        id: parentId,
        children: [{ id: nodeId, children: [] }],
      };

      selectedNodes.push(newParentNode);
    }

    setSelectedNodes([...selectedNodes]);
  };

  const createTree = (tree) => {
    if (!tree || tree.length === 0) {
      return null;
    }

    const getVarieties = (itemId) =>
      varieties.filter((x) => x.categoryId === itemId);

    return tree.map((item) => {
      const children = createTree(item.children);
      const filteredVarieties = getVarieties(item.id);

      return (
        <TreeItem
          key={item.id}
          nodeId={item.id}
          label={
            <div>
              <Checkbox
                checked={
                  selectedNodes.some((node) => node.id === item.id) ||
                  selectedNodes.some(
                    (node) => node.id === item.id && node.children.length > 0
                  )
                }
                onChange={(event) =>
                  handleCheckboxChange(event, item.id, item.id)
                }
              />
              {item.name}
            </div>
          }
        >
          {children}
          {filteredVarieties.map((variety) => (
            <TreeItem
              key={variety.id}
              nodeId={variety.id}
              label={
                <div>
                  <Checkbox
                    checked={selectedNodes.some(
                      (node) =>
                        node.id === item.id &&
                        node.children.some((child) => child.id === variety.id)
                    )}
                    onChange={(event) =>
                      handleCheckboxChange(event, variety.id, item.id)
                    }
                  />
                  {variety.name}
                </div>
              }
            >
              {variety.children.map((child) => (
                <TreeItem
                  key={child.id}
                  nodeId={child.id}
                  label={
                    <div>
                      <Checkbox
                        checked={selectedNodes.some(
                          (node) =>
                            node.id === variety.id &&
                            node.children.some(
                              (grandchild) => grandchild.id === child.id
                            )
                        )}
                        onChange={(event) =>
                          handleCheckboxChange(event, child.id, variety.id)
                        }
                      />
                      {child.name}
                    </div>
                  }
                />
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      );
    });
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {createTree(category)}
    </TreeView>
  );
};

export default SlideBarMenu;
