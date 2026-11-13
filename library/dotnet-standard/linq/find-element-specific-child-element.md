---
title: "How to find an element with a specific child element - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/find-element-specific-child-element.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to find an element with a specific child element (LINQ to XML)

This article shows how to find an element whose child element has a specific value.

## Example: Find an element whose child element has a specific value

The example finds the `Test` element whose `CommandLine` child element has a value of "Examp2.EXE". The example uses XML document Sample XML file: Test configuration.

```csharp
XElement root = XElement.Load("TestConfig.xml");
IEnumerable<XElement> tests =
    from el in root.Elements("Test")
    where (string)el.Element("CommandLine") == "Examp2.EXE"
    select el;
foreach (XElement el in tests)
    Console.WriteLine((string)el.Attribute("TestId"));
```

```vb
Dim root As XElement = XElement.Load("TestConfig.xml")
Dim tests As IEnumerable(Of XElement) = _
    From el In root.<Test> _
    Where el.<CommandLine>.Value = "Examp2.EXE" _
    Select el
For Each el as XElement In tests
    Console.WriteLine(el.@TestId)
Next
```

This example produces the following output:

```output
0002
0006
```

Note that the Visual Basic <example-value> of the code uses the XML Child axis property, the XML Attribute axis property, and the XML Value property.

## Example: Find when the XML is in a namespace

The following example does the same as the previous one, but for XML that's in a namespace. The example uses XML document Sample XML file: Test configuration in a namespace.

For more information, see Namespaces overview.

```csharp
XElement root = XElement.Load("TestConfigInNamespace.xml");
XNamespace ad = "http://www.adatum.com";
IEnumerable<XElement> tests =
    from el in root.Elements(ad + "Test")
    where (string)el.Element(ad + "CommandLine") == "Examp2.EXE"
    select el;
foreach (XElement el in tests)
    Console.WriteLine((string)el.Attribute("TestId"));
```

```vb
Imports <xmlns='http://www.adatum.com'>

Module Module1
    Sub Main()
        Dim root As XElement = XElement.Load("TestConfigInNamespace.xml")
        Dim tests As IEnumerable(Of XElement) = _
            From el In root.<Test> _
            Where el.<CommandLine>.Value = "Examp2.EXE" _
            Select el
        For Each el As XElement In tests
            Console.WriteLine(el.@TestId)
        Next
    End Sub
End Module
```

This example produces the following output:

```output
0002
0006
```

## See also

- `System.Xml.Linq.XElement.Attribute*`
- `System.Xml.Linq.XContainer.Elements*`
- Standard Query Operators Overview
- Projection Operations
