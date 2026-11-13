---
title: "Entity References are Preserved"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/entity-references-are-preserved.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Entity References are Preserved

When the entity reference is not expanded, but preserved, the XML Document Object Model (DOM) builds an **XmlEntityReference** node when it encounters an entity reference.

 Using the following XML,

```xml
<author>Fred</author>  
<pubinfo>Published by &publisher;</pubinfo>  
```  

 the DOM builds an **XmlEntityReference** node when it encounters the `&publisher;` reference. The **XmlEntityReference** contains child nodes copied from the content in the entity declaration. The preceding code example contains text in the entity declaration, so an **XmlText** node is created as the child node of the entity reference node.

Tree structure for entity references that are preserved

 The child nodes of the **XmlEntityReference** are copies of all the child nodes created from the **XmlEntity** node when the entity declaration was encountered.

> **Note:**
> The nodes copied from the **XmlEntity** are not always exact copies once placed under the entity reference node. There can be namespaces that are in scope at the entity reference node, and that affects the final configuration of the child nodes.

 By default, general entities like `&abc;` are preserved and **XmlEntityReference** nodes always created.

## See also

- XML Document Object Model (DOM)
