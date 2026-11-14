---
title: "XmlNamespaceDeclarationsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlNamespaceDeclarationsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNamespaceDeclarationsAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlNamespaceDeclarationsAttribute : Attribute
```

Specifies that the target property, parameter, return value, or class member contains prefixes associated with namespaces that are used within an XML document.

#### Remarks
The `XmlNamespaceDeclarationsAttribute` attribute can only be applied once in a class to a field or property that returns an `XmlSerializerNamespaces` object.

The `XmlNamespaceDeclarationsAttribute` allows you to store the prefixes, and the associated namespaces, used in an XML document. For example, one common usage of the attribute is to store XPath data, as it is defined by the World Wide Web Consortium document named XML Language (XPath) Version 1.0. In brief, an XPath is a string that contains many namespace prefixes and local names, along with some other syntax.

The XPath language allows for the association of a prefix with a path, and using the prefix within the XML document. For example, the following XML document named "select" contains a prefix ("cal") associated with a specific URI (`http://www.cohowinery.com/calendar/`). The element contains an attribute named "path" that contains the XPath.

```

```

The schema for this might be:

```
<element name="select">
   <complexType>
      <simpleContent>
         
      </simpleContent>
   </complexType>
</element>
```

Without the `XmlNamespaceDeclarationsAttribute`, the association between the prefix and the namespace is lost.

To retain the association between the prefix and the namespace URI, add a member that returns an `XmlSerializerNamespaces` object and apply the `XmlNamespaceDeclarationsAttribute` attribute to the member, as shown in the following C# and Visual Basic code:

```
// C#
public class Select {
  [XmlAttribute] public string path;
  [XmlNamespaceDeclarations] public XmlSerializerNamespaces xmlns;
}
' Visual Basic
Public Class Select
   <XmlAttribute> Public path As String
   <XmlNamespaceDeclarations> Public xmlns As XmlSerializerNamespaces
End Class
```

When serialized, the schema for the generated XML document contains the XML Schema definition (XSD) element named `appinfo`. The element further contains a metadata element named `keepNamespaceDeclarations`, set to the name of the member that contains the namespace declarations. The following XML fragment shows the schema:

```
<xs:element name="select">
   <xs:complexType>
      <xs:annotation>
         <xs:appinfo>
          <keepNamespaceDeclarations>xmlns</keepNamespaceDeclarations>
         </xs:appinfo>
      </xs:annotation>
      <xs:simpleContent>
         
      </xs:simpleContent>
   </xs:complexType>
</xs:element>
```

On deserialization, the `xmlns` field contains an `XmlSerializerNamespaces` object that contains all namespace prefix definitions.

On serialization, the user can add prefix-namespace pairs to the `XmlSerializerNamespaces` object using the `XmlSerializerNamespaces.Add` method. This is shown in the following C# and Visual Basic code:

```
// C#
using System;
using System.IO;
using System.Xml.Serialization;
[XmlRoot("select")]
public class Select {
   [XmlAttribute]
   public string xpath;
   [XmlNamespaceDeclarations]
   public XmlSerializerNamespaces xmlns;
}
public class Test {
   public static void Main(string[] args) {
      Select mySelect = new Select();
      mySelect.xpath = "myNS:ref/@common:y";
      mySelect.xmlns = new XmlSerializerNamespaces();
      mySelect.xmlns.Add("MyNS", "myNS.tempuri.org");
      mySelect.xmlns.Add("common", "common.tempuri.org");
      XmlSerializer ser = new XmlSerializer(typeof(Select));
      ser.Serialize(Console.Out, mySelect);
   }
}
// Output:
// <?xml version="1.0" encoding="IBM437"?>
// 
' Visual Basic
Imports System
Imports System.IO
Imports System.Xml.Serialization
<XmlRoot("select")> _
Public Class SelectPath
   <XmlAttribute> _
   Public xpath As String
   <XmlNamespaceDeclarations> _
   public xmlns As XmlSerializerNamespaces
End Class
Public Class Test
   Public Shared Sub Main()
      Dim mySelect As SelectPath = New SelectPath()
      mySelect.xpath = "myNS:ref/@common:y"
      mySelect.xmlns = New XmlSerializerNamespaces()
      mySelect.xmlns.Add("MyNS", "myNS.tempuri.org")
      mySelect.xmlns.Add("common", "common.tempuri.org")
      Dim ser As XmlSerializer = New XmlSerializer(mySelect.GetType)
      ser.Serialize(Console.Out, mySelect)
   End Sub
End Class
'Output:
' <?xml version="1.0" encoding="IBM437"?>
' 
```

Also note that the member to which the attribute is applied contains only the prefix-namespace pairs that belong to the XML element defined by the class. For example, in the following XML document, only the prefix pair "cal" is captured, but not the "x" prefix. To get that data, add a member with the `XmlNamespaceDeclarationsAttribute` to the class that represents the `root` element.

```
<?xml version="1.0"?>
<x:root xmlns:x="http://www.cohowinery.com/x/">
  
</x:root>
```

## XmlNamespaceDeclarationsAttribute.XmlNamespaceDeclarationsAttribute() constructor

```csharp
public XmlNamespaceDeclarationsAttribute ();
```

Initializes a new instance of the `XmlNamespaceDeclarationsAttribute` class.

#### Remarks
The `XmlNamespaceDeclarationsAttribute` can only be applied to a target that returns an `XmlSerializerNamespaces` object.
