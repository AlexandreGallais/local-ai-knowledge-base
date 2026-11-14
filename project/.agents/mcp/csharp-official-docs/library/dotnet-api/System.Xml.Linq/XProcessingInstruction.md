---
title: "XProcessingInstruction class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XProcessingInstruction.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XProcessingInstruction class

Namespace: `System.Xml.Linq`

```csharp
public class XProcessingInstruction : System.Xml.Linq.XNode
```

Represents an XML processing instruction.

#### Remarks
You can use processing instructions in XML to indicate that an XML document can be processed by some processor, such as XSLT.

Processing instructions are nodes in the XML tree. When a processing instruction is found in the XML being parsed, LINQ to XML creates an `XProcessingInstruction` node.

## XProcessingInstruction.XProcessingInstruction(XProcessingInstruction) constructor

```csharp
public XProcessingInstruction (System.Xml.Linq.XProcessingInstruction other);
```

Initializes a new instance of the `XProcessingInstruction` class.

Parameters:

- `other`: The `XProcessingInstruction` node to copy from.

#### Remarks
This constructor is primarily used internally to make a deep copy of an XML tree.

## XProcessingInstruction.XProcessingInstruction(String, String) constructor

```csharp
public XProcessingInstruction (string target, string data);
```

Initializes a new instance of the `XProcessingInstruction` class.

Parameters:

- `target`: A `String` containing the target application for this `XProcessingInstruction`.
- `data`: The string data for this `XProcessingInstruction`.

Exceptions:

- `ArgumentNullException`: The `target` or `data` parameter is `null`.
- `ArgumentException`: The `target` does not follow the constraints of an XML name.

#### Examples
The following example creates an `XProcessingInstruction`, and specifies a target and the string data for the processing instruction.

```csharp
XProcessingInstruction pi = new XProcessingInstruction("xml-stylesheet", "type='text/xsl' href='hello.xsl'");
Console.WriteLine(pi);
```

```vb
Dim pi As XProcessingInstruction = <?xml-stylesheet type='text/xsl' href='hello.xsl'?>
Console.WriteLine(pi)
```

This example produces the following output:

```xml
<?xml-stylesheet type='text/xsl' href='hello.xsl'?>
```

## XProcessingInstruction.Data property

```csharp
public string Data { get; set; }
```

Gets or sets the string value of this processing instruction.

Returns: The string value of this processing instruction.

Exceptions:

- `ArgumentNullException`: The string `value` is `null`.

#### Remarks
You can use this property to modify an XML tree. This property will cause events to occur.

#### Examples
The following example uses the `Data` property to retrieve the string value of a processing instruction.

```csharp
XProcessingInstruction pi =
    new XProcessingInstruction("xml-stylesheet", "type='text/xsl' href='hello.xsl'");
Console.WriteLine(pi.Data);
pi.Data = "type='text/xsl' href='xform.xsl'";
Console.WriteLine(pi.Data);
```

```vb
Dim pi As XProcessingInstruction = <?xml-stylesheet type='text/xsl' href='hello.xsl'?>
Console.WriteLine(pi.Data)
pi.Data = "type='text/xsl' href='xform.xsl'"
Console.WriteLine(pi.Data)
```

This example produces the following output:

```txt
type='text/xsl' href='hello.xsl'
type='text/xsl' href='xform.xsl'
```

## XProcessingInstruction.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this node.

Returns: The node type. For `XProcessingInstruction` objects, this value is `XmlNodeType.ProcessingInstruction`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of concrete subclass of `XObject`. Your code can then test for the node type of each node in the collection.

#### Examples
The following example creates a processing instruction, and then prints its node type.

```csharp
XProcessingInstruction pi =
    new XProcessingInstruction("xml-stylesheet", "type=\"text/xsl\" href=\"hello.xsl\"");
Console.WriteLine(pi.NodeType);
```

```vb
Dim pi As XProcessingInstruction = _
    <?xml-stylesheet type="text/xsl" href="hello.xsl"?>
Console.WriteLine(pi.NodeType.ToString)
```

This example produces the following output:

```txt
ProcessingInstruction
```

## XProcessingInstruction.Target property

```csharp
public string Target { get; set; }
```

Gets or sets the target application for this processing instruction.

Returns: The target application for this processing instruction.

Exceptions:

- `ArgumentNullException`: The string `value` is `null`.
- `ArgumentException`: The target does not follow the constraints of an XML name.

#### Examples
The following example uses the `Target` property to retrieve the target application for a processing instruction.

```csharp
XProcessingInstruction pi =
    new XProcessingInstruction("xml-stylesheet", "type=\"text/xsl\" href=\"hello.xsl\"");
Console.WriteLine(pi.Target);
```

```vb
Dim pi As XProcessingInstruction = _
    <?xml-stylesheet type="text/xsl" href="hello.xsl"?>
Console.WriteLine(pi.Target)
```

This example produces the following output:

```txt
xml-stylesheet
```

## XProcessingInstruction.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter writer);
```

Writes this processing instruction to an `XmlWriter`.

Parameters:

- `writer`: The `XmlWriter` to write this processing instruction to.

#### Remarks
This method is primarily used internally by the methods that write an XML tree to an `XmlWriter`.

## XProcessingInstruction.WriteToAsync(XmlWriter, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteToAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Writes this `XProcessingInstruction` to the specified `XmlWriter`.

Parameters:

- `writer`: The writer to write this `XProcessingInstruction` to.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XProcessingInstruction.WriteTo`.
