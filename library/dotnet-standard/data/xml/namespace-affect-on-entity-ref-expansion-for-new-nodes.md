---
title: "Namespace Affect on Entity Reference Expansion for New Nodes Containing Elements and Attributes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/namespace-affect-on-entity-ref-expansion-for-new-nodes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Namespace Affect on Entity Reference Expansion for New Nodes Containing Elements and Attributes

Because the content of an entity declaration can contain almost anything, there is a possibility that the content could contain an element like `<!ENTITY aname "<elem>test</elem>">`.

 When the XML is parsed, `&aname;` is not expanded with its replacement content at parse time. The expansion of the XML is not done because resolution of the namespace for the element cannot occur until the node is placed in the document. Until that time, there is no knowledge of what namespace is in scope. When the node is put into the document, then the namespace resolution occurs, and the resulting entity content is parsed into its appropriate nodes.

> **Note:**
> Once the expansion occurs on a newly created entity reference node, it never reoccurs. Therefore, the namespaces used in the replacement text for the element are bound at the time that the parent node is set. However, the namespace can be changed for existing entity reference nodes when you remove and insert them somewhere else, or on entity reference nodes that are cloned with the **CloneNode** method.

## See also

- XML Document Object Model (DOM)
