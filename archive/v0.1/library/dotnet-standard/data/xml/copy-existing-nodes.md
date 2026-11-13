---
title: "Copy Existing Nodes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/copy-existing-nodes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Copy Existing Nodes

There are many methods and properties in the XML Document Object Model (DOM)you can use to select a node, such as **SelectSingleNode**, **ChildNodes[int i]**, **Attributes[int i]**. Once the node is selected, you can insert it into the tree using one of the insert methods that work for that particular node type. The only restriction to inserting a node into the tree is that the document must still be well-formed after the node is inserted. When an existing node is inserted into the DOM tree, it is removed from its original position and added to its target position.

## See also

- XML Document Object Model (DOM)
