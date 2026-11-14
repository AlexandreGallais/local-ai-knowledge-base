---
title: "XElement class (part 10 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 10 of 12)

## XElement.RemoveAttributes() method

```csharp
public void RemoveAttributes ();
```

Removes the attributes of this `XElement`.

#### Remarks
This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates an element with attributes and child elements. It then calls this method to remove the attributes. The child elements remain.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3),
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3)
);
root.RemoveAttributes();
Console.WriteLine(root);
```

```vb
Dim root As XElement = _
    <Root Attr1="1" Attr2="2" Attr3="3">
        <Child1>1</Child1>
        <Child2>2</Child2>
        <Child3>3</Child3>
     </Root>

root.RemoveAttributes()
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Child3>3</Child3>
</Root>
```

## XElement.ReplaceAll(Object) method

```csharp
public void ReplaceAll (object? content);
```

Replaces the child nodes and the attributes of this element with the specified content.

Parameters:

- `content`: The content that will replace the child nodes and attributes of this element.

#### Remarks
This method first removes existing content and attributes. It then adds the specified `content`.

This method uses snapshot semantics - that is, it creates a separate copy of the new content before replacing the contents of the current element with the new content. This means that you can query the contents of the current element and use the results of the query as the specified new content.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example uses this method.

```csharp
XElement root = new XElement("Root",
    new XElement("Child", "child content")
);

// ReplaceAll with an XElement object.
root.ReplaceAll(new XElement("NewChild", "n"));
Console.WriteLine(root);

// ReplaceAll with an XAttribute object.
root.ReplaceAll(new XAttribute("NewAttribute", "n"));
Console.WriteLine(root);

// ReplaceAll with a string.
root.ReplaceAll("Some text");
Console.WriteLine(root);

// ReplaceAll with a double.
double dbl = 12.345;
root.ReplaceAll(dbl);
Console.WriteLine(root);

// ReplaceAll with a DateTime object.
DateTime dt = new DateTime(2006, 10, 6, 12, 30, 00);
root.ReplaceAll(dt);
Console.WriteLine(root);

// ReplaceAll with a string array.
// Any collection other than a collection of XElement or XAttribute objects
// are converted to strings. The strings are concatenated and added.
string[] stringArray = {
    "abc",
    "def",
    "ghi"
};
root.ReplaceAll(stringArray);
Console.WriteLine(root);

// ReplaceAll with an array of XElement objects.
XElement[] ellArray = {
    new XElement("NewChild1", 1),
    new XElement("NewChild2", 2),
    new XElement("NewChild3", 3)
};
root.ReplaceAll(ellArray);
Console.WriteLine(root);

// ReplaceAll with an array of XAttribute objects.
XAttribute[] attArray = {
    new XAttribute("NewAtt1", 1),
    new XAttribute("NewAtt2", 2),
    new XAttribute("NewAtt3", 3)
};
root.ReplaceAll(attArray);
Console.WriteLine(root);
```

```vb
Dim root As XElement = _
    <Root>
        <Child>child content</Child>
    </Root>

' ReplaceAll with an XElement object.
root.ReplaceAll(<NewChild>n</NewChild>)
Console.WriteLine(root)

' ReplaceAll with an XAttribute object.
root.ReplaceAll(New XAttribute("NewAttribute", "n"))
Console.WriteLine(root)

' ReplaceAll with a string.
root.ReplaceAll("Some text")
Console.WriteLine(root)

' ReplaceAll with a double.
Dim dbl As Double = 12.345
root.ReplaceAll(dbl)
Console.WriteLine(root)

' ReplaceAll with a DateTime object.
Dim dt As DateTime = New DateTime(2006, 10, 6, 12, 30, 0)
root.ReplaceAll(dt)
Console.WriteLine(root)

' ReplaceAll with a string array.
' Any collection other than a collection of XElement or XAttribute objects
' are converted to strings. The strings are concatenated and added.
Dim stringArray As String() = { _
    "abc", _
    "def", _
    "ghi" _
}
root.ReplaceAll(stringArray)
Console.WriteLine(root)

' ReplaceAll with an array of XElement objects.
Dim ellArray As XElement() = { _
    New XElement("NewChild1", 1), _
    New XElement("NewChild2", 2), _
    New XElement("NewChild3", 3) _
}
root.ReplaceAll(ellArray)
Console.WriteLine(root)

' ReplaceAll with an array of XAttribute objects.
Dim attArray As XAttribute() = { _
New XAttribute("NewAtt1", 1), _
New XAttribute("NewAtt2", 2), _
New XAttribute("NewAtt3", 3) _
}
root.ReplaceAll(attArray)
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>
  <NewChild>n</NewChild>
</Root>

<Root>Some text</Root>
<Root>12.345</Root>
<Root>2006-10-06T12:30:00</Root>
<Root>abcdefghi</Root>
<Root>
  <NewChild1>1</NewChild1>
  <NewChild2>2</NewChild2>
  <NewChild3>3</NewChild3>
</Root>

```

## XElement.ReplaceAll(Object[]) method

```csharp
public void ReplaceAll (params object?[] content);
```

Replaces the child nodes and the attributes of this element with the specified content.

Parameters:

- `content`: A parameter list of content objects.

#### Remarks
This method first removes existing content and attributes. It then adds the specified `content`.

This method uses snapshot semantics - that is, it creates a separate copy of the new content before replacing the contents of the current element with the new content. This means that you can query the contents of the current element and use the results of the query as the specified new content.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example passes the results of a LINQ query to this method, replacing the contents of an element with the query results.

```csharp
XElement xmlTree1 = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5),
    new XElement("Child6", 6)
);

XElement root = new XElement("Root",
    new XElement("Child", "child content")
);

root.ReplaceAll(
    from el in xmlTree1.Elements()
    where((int)el >= 3 && (int)el <= 5)
    select el
);
Console.WriteLine(root);
```

```vb
Dim xmlTree1 As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
            <Child4>4</Child4>
            <Child5>5</Child5>
            <Child6>6</Child6>
        </Root>

Dim root As XElement = <Root>
                           <Child>child content</Child>
                       </Root>

root.ReplaceAll( _
    From el In xmlTree1.Elements() _
    Where el.Value >= 3 And el.Value <= 5 _
    Select el _
)

Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```

## XElement.ReplaceAttributes(Object) method

```csharp
public void ReplaceAttributes (object? content);
```

Replaces the attributes of this element with the specified content.

Parameters:

- `content`: The content that will replace the attributes of this element.

#### Remarks
This method first removes existing attributes. It then adds the specified `content`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates an element with three attributes. It then uses this method to replace all of the attributes of the element with a single attribute.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3)
);
root.ReplaceAttributes(
    new XAttribute("NewAtt1", 101)
);
Console.WriteLine(root);
```

```vb
Dim root As XElement = 
root.ReplaceAttributes(New XAttribute("NewAtt1", 101))
Console.WriteLine(root)
```

This example produces the following output:

```xml

```

## XElement.ReplaceAttributes(Object[]) method

```csharp
public void ReplaceAttributes (params object?[] content);
```

Replaces the attributes of this element with the specified content.

Parameters:

- `content`: A parameter list of content objects.

#### Remarks
This method first removes existing attributes. It then adds the specified `content`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates an element with three attributes. It then replaces the attributes with other attributes.

```csharp
XElement root = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XAttribute("Att3", 3)
);
root.ReplaceAttributes(
    new XAttribute("NewAtt1", 101),
    new XAttribute("NewAtt2", 102),
    new XAttribute("NewAtt3", 103)
);
Console.WriteLine(root);
```

```vb
Dim root As XElement = 
root.ReplaceAttributes( _
New XAttribute("NewAtt1", 101), _
New XAttribute("NewAtt2", 102), _
New XAttribute("NewAtt3", 103))
Console.WriteLine(root)
```

This example produces the following output:

```xml

```

## XElement.Save(Stream) method

```csharp
public void Save (System.IO.Stream stream);
```

Outputs this `XElement` to the specified `Stream`.

Parameters:

- `stream`: The stream to output this `XElement` to.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that insignificant white space will not be preserved.

If you want to control white space, use the overload of `XElement.Save` that takes `SaveOptions` as a parameter. Use the `DisableFormatting` option to save unindented XML. This will cause the writer to write all white spaces exactly as represented in the XML tree.

Use the `OmitDuplicateNamespaces` option if you want to remove duplicate namespace declarations.

## XElement.Save(TextWriter) method

```csharp
public void Save (System.IO.TextWriter textWriter);
```

Serialize this element to a `TextWriter`.

Parameters:

- `textWriter`: A `TextWriter` that the `XElement` will be written to.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that white space will not be preserved.

If you want to control white space, use the overload of `XElement.Save` that allows you to specify `SaveOptions` as a parameter. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example creates an `XElement`, saves the document to a `StringWriter`, and then prints the string to the console.

```csharp
XElement root = XElement.Parse(@"<Root> <Child> Text </Child> </Root>");
using (StringWriter sw = new StringWriter()) {
    root.Save(sw);
    Console.WriteLine(sw.ToString());
}
```

```vb
Dim root As XElement = <Root><Child> Text </Child></Root>
Using sw = New StringWriter()
    root.Save(sw)
    Console.WriteLine(sw.ToString())
End Using
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-16"?>
<Root>
  <Child> Text </Child>
</Root>
```

## XElement.Save(String) method

```csharp
public void Save (string fileName);
```

Serialize this element to a file.

Parameters:

- `fileName`: A `String` that contains the name of the file.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that insignificant white space nodes in the XML tree will not be preserved.

If you want to control white space, use the overload of `XElement.Save` that allows you to specify `SaveOptions` as a parameter. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example creates an `XElement`, saves the document to a file, and then prints the file to the console.

```csharp
XElement root = new XElement("Root",
    new XElement("Child", "child content")
);
root.Save("Root.xml");
string str = File.ReadAllText("Root.xml");
Console.WriteLine(str);
```

```vb
Dim root As XElement = _
        <Root>
            <Child>child content</Child>
        </Root>
root.Save("Root.xml")
Dim Str As String = File.ReadAllText("Root.xml")
Console.WriteLine(Str)
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Root>
  <Child>child content</Child>
</Root>
```

## XElement.Save(XmlWriter) method

```csharp
public void Save (System.Xml.XmlWriter writer);
```

Serialize this element to an `XmlWriter`.

Parameters:

- `writer`: A `XmlWriter` that the `XElement` will be written to.

#### Examples
The following example shows how to save an `XElement` to an `XmlWriter`.

```csharp
StringBuilder sb = new StringBuilder();
XmlWriterSettings xws = new XmlWriterSettings();
xws.OmitXmlDeclaration = true;
using (XmlWriter xw = XmlWriter.Create(sb, xws)) {
    XElement root = new XElement("Root",
        new XElement("Child", "child content")
    );
    root.Save(xw);
}
Console.WriteLine(sb.ToString());
```

```vb
Dim sb As StringBuilder = New StringBuilder()
Dim xws As XmlWriterSettings = New XmlWriterSettings()
xws.OmitXmlDeclaration = True
Using xw = XmlWriter.Create(sb, xws)
    Dim root As XElement = <Root>
                               <Child>child content</Child>
                           </Root>
    root.Save(xw)
End Using
Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<Root><Child>child content</Child></Root>
```
