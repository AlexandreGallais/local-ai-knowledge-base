---
title: "Conversion of XML Data Types"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/conversion-of-xml-data-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Conversion of XML Data Types

The majority of the methods found in an **XmlConvert** class are used to convert data between strings and strongly typed formats. Methods are locale independent. This means that they do not take into account any locale settings when doing conversion.

## Reading String as types

 The following sample reads a string and converts it to a **DateTime** type.

 Given the following XML input:

 **Input**

```xml
<Element>2001-02-27T11:13:23</Element>  
```  

 This code converts the string to the **DateTime** format:

```vb
reader.ReadStartElement()  
Dim vDateTime As DateTime = XmlConvert.ToDateTime(reader.ReadString())  
Console.WriteLine(vDateTime)  
```  

```csharp
reader.ReadStartElement();  
DateTime vDateTime = XmlConvert.ToDateTime(reader.ReadString());  
Console.WriteLine(vDateTime);  
```  

## Writing Strings as types

 The following sample reads an **Int32** and converts it to a string.

 Given the following XML input:

 **Input**

```xml
<TestInt32>-2147483648</TestInt32>  
```  

 This code converts the **Int32** into a **String**:

```vb
Dim vInt32 As Int32 = -2147483648  
writer.WriteElementString("TestInt32", XmlConvert.ToString(vInt32))  
```  

```csharp
Int32 vInt32=-2147483648;  
writer.WriteElementString("TestInt32",XmlConvert.ToString(vInt32));  
```  

## See also

- Converting Strings to .NET Framework Data Types
- Converting .NET Framework Types to Strings
