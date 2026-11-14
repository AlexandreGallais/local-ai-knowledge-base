---
title: "XSLT Parameters"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/xslt-parameters.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XSLT Parameters

XSLT parameters are added to the `System.Xml.Xsl.XsltArgumentList` using the `System.Xml.Xsl.XsltArgumentList.AddParam*` method. A qualified name and namespace URI are associated with the parameter object at that time.

### To use an XSLT parameter

1. Create an `System.Xml.Xsl.XsltArgumentList` object and add the parameter using the `System.Xml.Xsl.XsltArgumentList.AddParam*` method.

2. Call the parameter from the style sheet.

3. Pass the `System.Xml.Xsl.XsltArgumentList` object to the `System.Xml.Xsl.XslCompiledTransform.Transform*` method.

## Parameter Types

 The parameter object should correspond to a W3C type. The following table shows the corresponding W3C types, the equivalent Microsoft .NET classes (type), and whether the W3C type is an XPath type or XSLT type.

|W3C type|Equivalent .NET class (type)|XPath or XSLT type|
|--------------|------------------------------------|------------------------|
|`String`|`System.String`|XPath|
|`Boolean`|`System.Boolean`|XPath|
|`Number`|`System.Double`|XPath|
|`Result Tree Fragment`|`System.Xml.XPath.XPathNavigator`|XSLT|
|`Node*`|`System.Xml.XPath.XPathNavigator`|XPath|
|`Node Set`|`System.Xml.XPath.XPathNodeIterator` **XPathNavigator[]**|XPath|

 *This is equivalent to a node set that contains a single node.

 If the parameter object is not one of the above classes, it is converted according to the following rules. Common language runtime (CLR) numeric types are converted to `System.Double`. The `System.DateTime` type is converted to `System.String`. `System.Xml.XPath.IXPathNavigable` types are converted to `System.Xml.XPath.XPathNavigator`. **XPathNavigator[]** is converted to `System.Xml.XPath.XPathNodeIterator`.

 All other types throw an error.

## Example

 The following example uses the `System.Xml.Xsl.XsltArgumentList.AddParam*` method to create a parameter to hold calculated discount date. The discount date is calculated to be 20 days from the order date.

 ```csharp
using System;
using System.IO;
using System.Xml;
using System.Xml.XPath;
using System.Xml.Xsl;

public class Sample {

   public static void Main() {

      // Create the XslCompiledTransform and load the style sheet.
      XslCompiledTransform xslt = new XslCompiledTransform();
      xslt.Load("discount.xsl");

      // Create the XsltArgumentList.
      XsltArgumentList argList = new XsltArgumentList();

      // Calculate the discount date.
      DateTime orderDate = new DateTime(2004, 01, 15);
      DateTime discountDate = orderDate.AddDays(20);
      argList.AddParam("discount", "", discountDate.ToString());

      // Create an XmlWriter to write the output.
     XmlWriter writer = XmlWriter.Create("orderOut.xml");

     // Transform the file.
     xslt.Transform(new XPathDocument("order.xml"), argList, writer);
     writer.Close();
  }
}
```

### Input

##### order.xml

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XSLT_Param/XML/order.xml._

##### discount.xsl

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XSLT_Param/XML/discount.xsl._

### Output

```xml
<?xml version="1.0" encoding="utf-8"?>
<order>
  <total>36.9</total>
     15% discount if paid by: 2/4/2004 12:00:00 AM
</order>
```

## See also

- XSLT Transformations
