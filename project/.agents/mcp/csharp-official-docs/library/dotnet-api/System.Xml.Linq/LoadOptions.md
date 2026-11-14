---
title: "LoadOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/LoadOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoadOptions enum

Namespace: `System.Xml.Linq`

```csharp
public enum LoadOptions
```

Specifies load options when parsing XML.

#### Remarks
If you preserve white space when loading, all insignificant white space in the XML tree is materialized in the XML tree as is. If you do not preserve white space, then all insignificant white space is discarded.

There is a performance penalty if you set the SetBaseUri and the SetLineInfo flags.

The base URI and the line information are accurate immediately after loading the XML document. If you modify the XML tree after loading the document, the base URI and line information may become meaningless.

If the underlying `XmlReader` does not have base URI or line information, setting the SetBaseUri and the SetLineInfo flags will have no effect.

This type allows you to control how LINQ to XML handles white space when loading or parsing. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
This example loads a small XML tree from a file, setting the options to set base URI and retain line information. It then adds another element that does not have line information. It then prints the line information for each element in the tree.

```csharp
string markup = @"<Root>  
      
      
      
</Root>";  
  
File.WriteAllText("Test.xml", markup);  
  
XElement po = XElement.Load("Test.xml",  
    LoadOptions.SetBaseUri | LoadOptions.SetLineInfo);  
  
// add a node to the tree.  
// the newly added node will not have line information.  
po.Element("Child2").AddAfterSelf(new XElement("Child3"));  
  
string[] splitUri = po.BaseUri.Split('/');  
Console.WriteLine("BaseUri: {0}", splitUri[splitUri.Length - 1]);  
Console.WriteLine();  
Console.WriteLine("{0}{1}{2}",  
    "Element Name".PadRight(20),  
    "Line".PadRight(5),  
    "Position");  
Console.WriteLine("{0}{1}{2}",  
    "------------".PadRight(20),  
    "----".PadRight(5),  
    "--------");  
foreach (XElement e in po.DescendantsAndSelf())  
    Console.WriteLine("{0}{1}{2}",  
        ("".PadRight(e.Ancestors().Count() * 2) + e.Name).PadRight(20),  
        ((IXmlLineInfo)e).HasLineInfo() ?  
            ((IXmlLineInfo)e).LineNumber.ToString().PadRight(5) :  
            "",  
        ((IXmlLineInfo)e).HasLineInfo() ?  
            ((IXmlLineInfo)e).LinePosition.ToString() :  
            "No Line Information");  
```  

```vb
Dim markup As String = _  
    "<Root>" + Environment.NewLine & _  
    "    " + Environment.NewLine & _  
    "    " + Environment.NewLine & _  
    "    " + Environment.NewLine & _  
    "</Root>"  
  
File.WriteAllText("Test.xml", markup)  
  
Dim po As XElement = XElement.Load("Test.xml", LoadOptions.SetBaseUri Or LoadOptions.SetLineInfo)  
  
' add a node to the tree.  
' the newly added node will not have line information.  
po.Element("Child2").AddAfterSelf(New XElement("Child3"))  
  
Dim splitUri() As String = po.BaseUri.Split("/"c)  
Console.WriteLine("BaseUri: {0}", splitUri(splitUri.Length - 1))  
Console.WriteLine()  
Console.WriteLine("{0}{1}{2}", _  
    "Element Name".PadRight(20), _  
    "Line".PadRight(5), _  
    "Position")  
Console.WriteLine("{0}{1}{2}", _  
    "------------".PadRight(20), _  
    "----".PadRight(5), _  
    "--------")  
For Each e As XElement In po.DescendantsAndSelf()  
    Console.WriteLine("{0}{1}{2}", _  
        ("".PadRight(e.Ancestors().Count() * 2) & e.Name.ToString).PadRight(20), _  
        IIf(DirectCast(e, IXmlLineInfo).HasLineInfo(), _  
            DirectCast(e, IXmlLineInfo).LineNumber.ToString().PadRight(5), _  
            ""), _  
        IIf(DirectCast(e, IXmlLineInfo).HasLineInfo(), _  
            DirectCast(e, IXmlLineInfo).LinePosition.ToString(), _  
            "No Line Information"))  
Next  
```  

This example produces the following output:

```
BaseUri: Test.xml  
  
Element Name        Line Position  
------------        ---- --------  
Root                1    2  
  Child1            2    6  
  Child2            3    6  
  Child3            No Line Information  
  Child4            4    6  
```

## LoadOptions.None field

```csharp
None
```

Does not preserve insignificant white space or load base URI and line information.

## LoadOptions.PreserveWhitespace field

```csharp
PreserveWhitespace
```

Preserves insignificant white space while parsing.

## LoadOptions.SetBaseUri field

```csharp
SetBaseUri
```

Requests the base URI information from the `XmlReader`, and makes it available via the `XObject.BaseUri` property.

## LoadOptions.SetLineInfo field

```csharp
SetLineInfo
```

Requests the line information from the `XmlReader` and makes it available via properties on `XObject`.
