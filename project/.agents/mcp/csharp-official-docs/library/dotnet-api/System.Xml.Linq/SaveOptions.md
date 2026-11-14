---
title: "SaveOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/SaveOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SaveOptions enum

Namespace: `System.Xml.Linq`

```csharp
public enum SaveOptions
```

Specifies serialization options.

#### Remarks
If you disable formatting when serializing, all insignificant white space in the XML tree is serialized as is. If you do not disable formatting, then all insignificant white space in the XML tree is discarded, and the XML is formatted (indented) as it is serialized.

This type allows you to control how LINQ to XML handles white space when serializing. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example shows two ways to serialize. The first preserves insignificant white space in the XML tree. The second serializes the `XElement` with formatting.

```csharp
string str;  
XElement root = XElement.Parse(@"<Root> <Child> Text </Child> </Root>");  
  
root.Save("Root.xml", SaveOptions.DisableFormatting);  
str = File.ReadAllText("Root.xml");  
Console.WriteLine(str);  
  
Console.WriteLine("=====");  
  
root.Save("Root.xml", SaveOptions.None);  
str = File.ReadAllText("Root.xml");  
Console.WriteLine(str);  
```  

```vb
Dim str As String  
Dim root As XElement = <Root><Child> Text </Child></Root>  
  
root.Save("Root.xml", SaveOptions.DisableFormatting)  
str = File.ReadAllText("Root.xml")  
Console.WriteLine(str)  
  
Console.WriteLine("=====")  
  
root.Save("Root.xml", SaveOptions.None)  
str = File.ReadAllText("Root.xml")  
Console.WriteLine(str)  
  
```  

This example produces the following output:

```
<?xml version="1.0" encoding="utf-8"?><Root><Child> Text </Child></Root>  
=====  
<?xml version="1.0" encoding="utf-8"?>  
<Root>  
  <Child> Text </Child>  
</Root>  
```

## SaveOptions.DisableFormatting field

```csharp
DisableFormatting
```

Preserve all insignificant white space while serializing.

## SaveOptions.None field

```csharp
None
```

Format (indent) the XML while serializing.

## SaveOptions.OmitDuplicateNamespaces field

```csharp
OmitDuplicateNamespaces
```

Remove the duplicate namespace declarations while serializing.
