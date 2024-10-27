class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.level = null;  // Track the node's level in the tree
        this.htmlElement = null;  // Reference to the HTML element representing the node
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.nodeCount = 0;  // Track the number of nodes
    }

    // Insert method with parent node logic
    insert(value, parentValue) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            if (parentValue !== 0) {
                alert('Please input 0 as parent node value to create the root node.');
                return;
            }
            this.root = newNode;
            newNode.level = 0;  // Root is at level 0
        } else {
            const parent = this.findNode(this.root, parentValue);
            if (parent) {
                if (parent.left === null) {
                    parent.left = newNode;
                } else if (parent.right === null) {
                    parent.right = newNode;
                } else {
                    alert('Both child nodes are occupied. Cannot insert more children here.');
                    return;
                }
                newNode.level = parent.level + 1;  // Increment the level for the child
            } else {
                alert('Parent node not found');
                return;
            }
        }
        this.nodeCount++;
        this.display();  // Re-render the tree after insertion
    }

    // Find node by value
    findNode(node, value) {
        if (node === null) return null;
        if (node.value === value) return node;
        return this.findNode(node.left, value) || this.findNode(node.right, value);
    }

    // Display the tree
    display() {
        const container = document.getElementById('tree-container');
        container.innerHTML = '';  // Clear the display
        if (this.root) {
            this.displayNode(this.root, container, container.offsetWidth / 2, 20);  // Initial root placement
        }
    }

    // Display each node with connections
    displayNode(node, container, x, y) {
        if (node) {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'node';
            nodeDiv.innerHTML = node.value;
            nodeDiv.style.position = 'absolute';
            nodeDiv.style.left = `${x}px`;
            nodeDiv.style.top = `${y}px`;
            container.appendChild(nodeDiv);
            node.htmlElement = nodeDiv;

            // Display level label
            const levelLabel = document.createElement('div');
            levelLabel.className = 'level-label';
            levelLabel.innerHTML = `Level ${node.level}`;
            levelLabel.style.left = `${x + 50}px`;  // Position the label to the right of the node
            levelLabel.style.top = `${y + 10}px`;
            container.appendChild(levelLabel);

            const gap = 50 * (node.level + 1);  // Gap between nodes

            // Display left child
            if (node.left) {
                const leftX = x - gap;
                const leftY = y + 100;
                this.displayNode(node.left, container, leftX, leftY);
                this.connectNodes(nodeDiv, node.left.htmlElement);
            }

            // Display right child
            if (node.right) {
                const rightX = x + gap;
                const rightY = y + 100;
                this.displayNode(node.right, container, rightX, rightY);
                this.connectNodes(nodeDiv, node.right.htmlElement);
            }
        }
    }

    // Connect parent and child nodes with a line
    connectNodes(parentDiv, childDiv) {
        const container = document.getElementById('tree-container');
        const line = document.createElement('div');
        line.className = 'tree-line';

        const x1 = parentDiv.offsetLeft + parentDiv.offsetWidth / 2;
        const y1 = parentDiv.offsetTop + parentDiv.offsetHeight;
        const x2 = childDiv.offsetLeft + childDiv.offsetWidth / 2;
        const y2 = childDiv.offsetTop;

        const length = Math.hypot(x2 - x1, y2 - y1);
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
        line.style.position = 'absolute';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        container.appendChild(line);
    }

    // Delete a node by level and value
    delete(level, value) {
        if (!this.root) return;

        const deleted = this.deleteNode(this.root, null, level, value);
        if (deleted) {
            this.display();  // Re-render the tree after deletion
        } else {
            alert('Node not found for deletion');
        }
    }

    // Recursive deletion function
    deleteNode(node, parent, level, value) {
        if (!node) return false;

        if (node.level === level && node.value === value) {
            // Handle deleting a leaf node (no children)
            if (!node.left && !node.right) {
                if (parent.left === node) parent.left = null;
                else parent.right = null;
                return true;
            } else {
                alert('Can only delete leaf nodes in this implementation.');
                return false;
            }
        }

        // Recursive search for the node to delete
        return this.deleteNode(node.left, node, level, value) || this.deleteNode(node.right, node, level, value);
    }

    // Traversal logic
    traverse(type) {
        const result = [];
        if (type === 'inorder') {
            this.inOrderTraversal(this.root, result);
        } else if (type === 'preorder') {
            this.preOrderTraversal(this.root, result);
        } else if (type === 'postorder') {
            this.postOrderTraversal(this.root, result);
        }
        alert(result.join(', '));
    }

    inOrderTraversal(node, result) {
        if (node) {
            this.inOrderTraversal(node.left, result);
            result.push(node.value);
            this.inOrderTraversal(node.right, result);
        }
    }

    preOrderTraversal(node, result) {
        if (node) {
            result.push(node.value);
            this.preOrderTraversal(node.left, result);
            this.preOrderTraversal(node.right, result);
        }
    }

    postOrderTraversal(node, result) {
        if (node) {
            this.postOrderTraversal(node.left, result);
            this.postOrderTraversal(node.right, result);
            result.push(node.value);
        }
    }
}

const binaryTree = new BinaryTree();

// Insert Node function
function insertNode() {
    const value = parseInt(document.getElementById('valueInput').value);
    const parentValue = parseInt(document.getElementById('parentNode').value);
    binaryTree.insert(value, parentValue);
}

// Delete Node function
function deleteNode() {
    const level = parseInt(document.getElementById('levelInput').value);
    const value = parseInt(document.getElementById('deleteValue').value);
    binaryTree.delete(level, value);
}

// Traverse Tree function
function traverseTree() {
    const traversalType = document.getElementById('traversalType').value;
    binaryTree.traverse(traversalType);
}

// Toggle operation fields based on selection
function toggleOperationFields() {
    const operation = document.getElementById('operation').value;
    document.getElementById('insertControls').style.display = operation === 'insert' ? 'block' : 'none';
    document.getElementById('deleteControls').style.display = operation === 'delete' ? 'block' : 'none';
    document.getElementById('traversalControls').style.display = operation === 'traversal' ? 'block' : 'none';
}

// Initial display setup
toggleOperationFields();
