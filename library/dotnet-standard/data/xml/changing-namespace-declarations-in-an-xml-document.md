---
title: "Changing Namespace Declarations in an XML Document"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/changing-namespace-declarations-in-an-xml-document.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Changing Namespace Declarations in an XML Document

The **XmlDocument** exposes namespace declarations and **xmlns** attributes as part of the document object model. These are stored in the **XmlDocument**, so when you save the document, it can preserve the location of those attributes. Changing these attributes has no effect on the **Name**, **NamespaceURI**, and **Prefix** properties of other nodes already in the tree. For example, if you load the following document, then the `test` element has **NamespaceURI** `123.`

```xml
<test xmlns="123"/>  
```  

 If you remove the `xmlns` attribute as follows, then the `test` element still has the **NamespaceURI** of `123`.

```vb
doc.documentElement.RemoveAttribute("xmlns")  
```  

```csharp
doc.documentElement.RemoveAttribute("xmlns");  
```  

 Likewise, if you add a different `xmlns` attribute to the `doc` element as follows, then the `test` element still has **NamespaceURI** `123`.

```vb
doc.documentElement.SetAttribute("xmlns","456")
```  

```csharp
doc.documentElement.SetAttribute("xmlns","456");  
```  

 Therefore, changing `xmlns` attributes will have no effect until you save and reload the **XmlDocument** object.

## See also

- XML Document Object Model (DOM)
