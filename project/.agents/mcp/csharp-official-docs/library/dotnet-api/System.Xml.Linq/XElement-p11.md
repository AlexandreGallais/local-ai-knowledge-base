---
title: "XElement class (part 11 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XElement class (part 11 of 12)

## XElement.Save(Stream, SaveOptions) method

```csharp
public void Save (System.IO.Stream stream, System.Xml.Linq.SaveOptions options);
```

Outputs this `XElement` to the specified `Stream`, optionally specifying formatting behavior.

Parameters:

- `stream`: The stream to output this `XElement` to.
- `options`: A `SaveOptions` object that specifies formatting behavior.

#### Remarks
By default the `options` are set to `None`. This option will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented.

If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white spaces exactly as represented in the XML tree.

Use `OmitDuplicateNamespaces` option if you want to remove duplicate namespace declarations.

## XElement.Save(TextWriter, SaveOptions) method

```csharp
public void Save (System.IO.TextWriter textWriter, System.Xml.Linq.SaveOptions options);
```

Serialize this element to a `TextWriter`, optionally disabling formatting.

Parameters:

- `textWriter`: The `TextWriter` to output the XML to.
- `options`: A `SaveOptions` that specifies formatting behavior.

#### Remarks
If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white space exactly as represented in the XML tree.

If you want to save indented XML, do not specify the `DisableFormatting` flag for `options`. This will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented. This is the default behavior, and the behavior of the overloads of the `XElement.Save` methods that do not take `options` as a parameter.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example shows two uses of this method. The first use preserves white space. The second serializes the `XElement` with formatting. Because the document has no white space in it as constructed, preserving white space outputs the XML without any indenting.

```csharp
XElement root = XElement.Parse(@"<Root> <Child> Text </Child> </Root>");

using (StringWriter sw = new StringWriter())
{
    root.Save(sw, SaveOptions.DisableFormatting);
    Console.WriteLine(sw.ToString());
}

Console.WriteLine("=====");

using (StringWriter sw = new StringWriter())
{
    root.Save(sw, SaveOptions.None);
    Console.WriteLine(sw.ToString());
}
```

```vb
Dim root As XElement = <Root><Child> Text </Child></Root>

Using sw = New StringWriter()
    root.Save(sw, SaveOptions.DisableFormatting)
    Console.WriteLine(sw.ToString())
End Using

Console.WriteLine("=====")

Using sw = New StringWriter()
    root.Save(sw, SaveOptions.None)
    Console.WriteLine(sw.ToString())
End Using
```

This example produces the following output:

```txt
<?xml version="1.0" encoding="utf-16"?><Root><Child> Text </Child></Root>
=====
<?xml version="1.0" encoding="utf-16"?>
<Root>
  <Child> Text </Child>
</Root>
```

## XElement.Save(String, SaveOptions) method

```csharp
public void Save (string fileName, System.Xml.Linq.SaveOptions options);
```

Serialize this element to a file, optionally disabling formatting.

Parameters:

- `fileName`: A `String` that contains the name of the file.
- `options`: A `SaveOptions` that specifies formatting behavior.

#### Remarks
If you want to save unindented XML, specify the `DisableFormatting` flag for `options`. This will cause the writer to write all white space exactly as represented in the XML tree.

If you want to save indented XML, do not specify the `DisableFormatting` flag for `options`. This will remove all extraneous insignificant white space, and add appropriate insignificant white space so that the XML is properly indented. This is the default behavior, and the behavior of the overloads of the `XElement.Save` methods that do not take `options` as a parameter.

For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example shows two uses of this method. The first use preserves white space. The second one serializes the `XElement` with formatting.

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

```txt
<?xml version="1.0" encoding="utf-8"?><Root><Child> Text </Child></Root>
=====
<?xml version="1.0" encoding="utf-8"?>
<Root>
  <Child> Text </Child>
</Root>
```

## XElement.SaveAsync(XmlWriter, CancellationToken) method

```csharp
public System.Threading.Tasks.Task SaveAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Asynchronously outputs this `XElement` to an `XmlWriter`.

Parameters:

- `writer`: The writer to output the XML to.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous save operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XElement.Save`.

## XElement.SaveAsync(Stream, SaveOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task SaveAsync (System.IO.Stream stream, System.Xml.Linq.SaveOptions options, System.Threading.CancellationToken <example-value>);
```

Asynchronously outputs this `XElement` to a `Stream`.

Parameters:

- `stream`: The stream to output the XML to.
- `options`: A bitwise combination of the enumeration values that specify the serialization options.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous save operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XElement.Save`.

## XElement.SaveAsync(TextWriter, SaveOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task SaveAsync (System.IO.TextWriter textWriter, System.Xml.Linq.SaveOptions options, System.Threading.CancellationToken <example-value>);
```

Asynchronously outputs this `XElement` to a `TextWriter`.

Parameters:

- `textWriter`: The writer to output the XML to.
- `options`: A bitwise combination of the enumeration values that specify the serialization options.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous save operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XElement.Save`.

## XElement.SetAttributeValue(XName, Object) method

```csharp
public void SetAttributeValue (System.Xml.Linq.XName name, object? value);
```

Sets the value of an attribute, adds an attribute, or removes an attribute.

Parameters:

- `name`: An `XName` that contains the name of the attribute to change.
- `value`: The value to assign to the attribute. The attribute is removed if the value is `null`. Otherwise, the value is converted to its string representation and assigned to the `XAttribute.Value` property of the attribute.

Exceptions:

- `ArgumentException`: The `value` is an instance of `XObject`.

#### Remarks
This method is designed to make it easy to maintain a list of name/value pairs as a set of attributes. When maintaining the list, you need to add pairs, modify pairs, or delete pairs. If you call this method passing a name that does not exist as an attribute, this method creates an attribute for you. If you call this method passing the name of an existing attribute, this method modifies the value of the attribute to the value that you specify. If you pass `null` for `value`, this method removes the attribute.

This method will raise the `Changed` and the `Changing` events.

The value is assigned to the attribute with the specified name. If no attribute with the specified name exists, a new attribute is added. If the value is `null`, the attribute with the specified name, if any, is deleted.

For more information, see Maintain name-value pairs.

#### Examples
The following example creates an element with an attribute. It then uses this method to replace the content of the attribute.

```csharp
// Create an element with no content.
XElement root = new XElement("Root");

// Add some name/value pairs.
root.SetAttributeValue("Att1", 1);
root.SetAttributeValue("Att2", 2);
root.SetAttributeValue("Att3", 3);
Console.WriteLine(root);

// Modify one of the name/value pairs.
root.SetAttributeValue("Att2", 22);
Console.WriteLine(root);

// Remove one of the name/value pairs.
root.SetAttributeValue("Att3", null);
Console.WriteLine(root);
```

```vb
' Create an element with no content.
Dim root As XElement = 

' Add some name/value pairs.
root.SetAttributeValue("Att1", 1)
root.SetAttributeValue("Att2", 2)
root.SetAttributeValue("Att3", 3)
Console.WriteLine(root)

' Modify one of the name/value pairs.
root.SetAttributeValue("Att2", 22)
Console.WriteLine(root)

' Remove one of the name/value pairs.
root.SetAttributeValue("Att3", Nothing)
Console.WriteLine(root)
```

This example produces the following output:

```txt

```

## XElement.SetElementValue(XName, Object) method

```csharp
public void SetElementValue (System.Xml.Linq.XName name, object? value);
```

Sets the value of a child element, adds a child element, or removes a child element.

Parameters:

- `name`: An `XName` that contains the name of the child element to change.
- `value`: The value to assign to the child element. The child element is removed if the value is `null`. Otherwise, the value is converted to its string representation and assigned to the `XElement.Value` property of the child element.

Exceptions:

- `ArgumentException`: The `value` is an instance of `XObject`.

#### Remarks
This method is designed to make it easy to maintain a list of name/value pairs as a set of children elements. When maintaining the list, you need to add pairs, modify pairs, or delete pairs. If you call this method passing a name that does not exist as a child element, this method creates a child element for you. If you call this method passing the name of an existing child element, this method modifies the value of the child element to the value that you specify. If you pass `null` for `value`, this method removes the child element.

This method will raise events.

The value is assigned to the first child element with the specified name. If no child element with the specified name exists, a new child element is added. If the value is null, the first child element with the specified name, if any, is deleted.

This method does not add child nodes or attributes to the specified child element. This method throws an exception if any object that derives from `XObject` is passed as `value`.

For more information, see Maintain name-value pairs.

#### Examples
The following example creates an element with a child element. It then uses this method to set the value of the child element.

```csharp
// Create an element with no content
XElement root = new XElement("Root");

// Add some name/value pairs.
root.SetElementValue("Ele1", 1);
root.SetElementValue("Ele2", 2);
root.SetElementValue("Ele3", 3);
Console.WriteLine(root);

// Modify one of the name/value pairs.
root.SetElementValue("Ele2", 22);
Console.WriteLine(root);

// Remove one of the name/value pairs.
root.SetElementValue("Ele3", null);
Console.WriteLine(root);
```

```vb
' Create an element with no content.
Dim root As XElement = 

' Add some name/value pairs.
root.SetElementValue("Ele1", 1)
root.SetElementValue("Ele2", 2)
root.SetElementValue("Ele3", 3)
Console.WriteLine(root)

' Modify one of the name/value pairs.
root.SetElementValue("Ele2", 22)
Console.WriteLine(root)

' Remove one of the name/value pairs.
root.SetElementValue("Ele3", Nothing)
Console.WriteLine(root)
```

This example produces the following output:

```txt
<Root>
  <Ele1>1</Ele1>
  <Ele2>2</Ele2>
  <Ele3>3</Ele3>
</Root>
<Root>
  <Ele1>1</Ele1>
  <Ele2>22</Ele2>
  <Ele3>3</Ele3>
</Root>
<Root>
  <Ele1>1</Ele1>
  <Ele2>22</Ele2>
</Root>
```
