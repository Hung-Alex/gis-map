export default function CreateTreeFromList(list, sortByName = true) {
	if (!list || list.length === 0) return null;
	let map = {};

	for (let i = 0; i < list.length; i++) {
		const obj = list[i];
		map[obj.id] = obj;
	}

	let roots = [];

	for (let i = 0; i < list.length; i++) {
		const obj = list[i];

		if (!obj.parentId) {
			roots.push(map[obj.id]);
		} else if (!obj.disabled) {
			if (!map[obj.parentId].children) {
				map[obj.parentId].children = [];
			}
			map[obj.parentId].children.push(map[obj.id]);
			if (sortByName) {
				map[obj.parentId].children.sort((a, b) => {
					const typeA = getType(a.name);
					const typeB = getType(b.name);

					if (typeA !== typeB) {
						return typeA.localeCompare(typeB);
					}
					const numericA = extractNumericPart(a.name);
					const numericB = extractNumericPart(b.name);

					return numericA - numericB;
				});
			}
		}
	}

	return roots;
}
export function findNodeById(nodes, id) {
	for (let node of nodes) {
		if (node.id === id) {
			return node;
		}
		if (node.children && node.children.length > 0) {
			const foundNode = findNodeById(node.children, id);
			if (foundNode) {
				return foundNode;
			}
		}
	}

	return null; // Node not found
}

export function getLeafNodes(node) {
	if (node && (!node.children || node.children.length === 0)) {
		return [node];
	}

	let leafNodes = [];
	for (let child of node.children) {
		const childLeafNodes = getLeafNodes(child);
		leafNodes = leafNodes.concat(childLeafNodes);
	}

	return leafNodes;
}

function extractNumericPart(unit) {
	const parts = unit.split(" ");
	if (parts.length > 1) {
		const numericPart = parts[1].replace(",", "");
		return parseInt(numericPart);
	}
	return 0;
}
function getType(unit) {
	if (unit.startsWith("Phường")) {
		return "Phường";
	} else if (unit.startsWith("Xã")) {
		return "Xã";
	} else {
		return "";
	}
}
