---
title: "Creating New Entity References"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/creating-new-entity-references.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Creating New Entity References

The **CreateEntityReference** method creates a new **XmlEntityReference** node. The XML Document Object Model (DOM) looks to see if the entity name being referenced has already been declared. If it has, the child nodes of **XmlEntityReference** node are copied from the entity declaration node. If there is no entity declaration that matches, an empty text node is attached as the only child of the entity reference node. Because the child nodes of the **XmlEntityReference** node are copies of other nodes, these child nodes are read-only and cannot be modified.

 When the nodes are copied, there may be a namespace in scope at the point of the entity reference. This namespace affects the configuration of any element or attribute nodes generated.

> **Note:**
> The DOM adds child nodes to the **EntityReference** only when you insert the **EntityReference** node to the document. Newly created **EntityReference** nodes have no child nodes.

 Even though the **XmlDataDocument** is a derived class of the **XmlDocument**, the **XmlDataDocument** does not support the creation of entity references. This is because **EntityReference** children are read-only. The children of an **EntityReference** node can span more than one region. In this case, part of a row associated with the region that contains a part of an **EntityReference** will be read-only.

## See also

- XML Document Object Model (DOM)
