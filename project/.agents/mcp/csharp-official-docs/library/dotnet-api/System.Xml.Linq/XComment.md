---
title: "XComment class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XComment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XComment class

Namespace: `System.Xml.Linq`

```csharp
public class XComment : System.Xml.Linq.XNode
```

Represents an XML comment.

#### Remarks
You can add an XML comment as a child node of an element. You can also add an XML comment to an `XDocument` as a sibling of the root element node.

## XComment.XComment(String) constructor

```csharp
public XComment (string value);
```

Initializes a new instance of the `XComment` class with the specified string content.

Parameters:

- `value`: A string that contains the contents of the new `XComment` object.

Exceptions:

- `ArgumentNullException`: The `value` parameter is `null`.

#### Examples
The following example creates an element that contains a comment as a child node.

```csharp
XElement root = new XElement("Root",
    new XComment("This is a comment")
);
Console.WriteLine(root);
```

```vb
Dim root As XElement = <Root>
                           <!--This is a comment-->
                       </Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>
  <!--This is a comment-->
</Root>
```

## XComment.XComment(XComment) constructor

```csharp
public XComment (System.Xml.Linq.XComment other);
```

Initializes a new instance of the `XComment` class from an existing comment node.

Parameters:

- `other`: The `XComment` node to copy from.

Exceptions:

- `ArgumentNullException`: The `other` parameter is `null`.

#### Remarks
This constructor is primarily used internally to make a deep copy of an XML tree.

## XComment.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this node.

Returns: The node type. For `XComment` objects, this value is `XmlNodeType.Comment`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of concrete subclass of `XObject`. Your code can then test for the node type of each node in the collection.

#### Examples
The following example creates a comment node and prints its node type.

```csharp
XComment com = new XComment("This is a comment");
XNode node = com;
Console.WriteLine(node.NodeType);
```

```vb
Dim com As XComment = New XComment("This is a comment")
Dim node As XNode = com
Console.WriteLine(node.NodeType.ToString())
```

This example produces the following output:

```
Comment
```

## XComment.Value property

```csharp
public string Value { get; set; }
```

Gets or sets the string value of this comment.

Returns: A `String` that contains the string value of this comment.

Exceptions:

- `ArgumentNullException`: The `value` is `null`.

#### Remarks
Unlike `XElement` and `XAttribute`, you cannot retrieve the contents of a comment by casting it to a string. Instead, you must use this property to retrieve the contents.

Setting this property will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates a comment node. It then retrieves the contents of the comment node.

```csharp
XComment com = new XComment("This is a comment");
Console.WriteLine(com.Value);
```

```vb
Dim com As XComment = New XComment("This is a comment")
Console.WriteLine(com.Value)
```

This example produces the following output:

```
This is a comment
```

## XComment.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter writer);
```

Write this comment to an `XmlWriter`.

Parameters:

- `writer`: An `XmlWriter` into which this method will write.

#### Remarks
This method is primarily used internally by the methods that write an XML tree to an `XmlWriter`.

## XComment.WriteToAsync(XmlWriter, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteToAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Writes this `XComment` to the specified `XmlWriter`.

Parameters:

- `writer`: The writer to write this `XComment` to.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XComment.WriteTo`.
