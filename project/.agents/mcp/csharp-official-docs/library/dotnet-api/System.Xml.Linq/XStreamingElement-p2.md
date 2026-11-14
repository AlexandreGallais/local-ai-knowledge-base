---
title: "XStreamingElement class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XStreamingElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XStreamingElement class (part 2 of 4)

## XStreamingElement.XStreamingElement(XName) constructor

```csharp
public XStreamingElement (System.Xml.Linq.XName name);
```

Initializes a new instance of the `XElement` class from the specified `XName`.

Parameters:

- `name`: An `XName` that contains the name of the element.

#### Remarks
This constructor creates a streaming element with no content and no attributes.

There is an implicit conversion from string to `XName`. Typical use of this constructor is to specify a string as the parameter instead of creating a new `XName`.

#### Examples

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el >= 3
                        select new XElement("DifferentChild", (int)el)
                    );

Console.WriteLine(dstTree);
```

```vb
Dim srcTree As XElement = _
        <Root>
            <Child>1</Child>
            <Child>2</Child>
            <Child>3</Child>
            <Child>4</Child>
            <Child>5</Child>
        </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                From el In srcTree.Elements _
                Where el.Value >= 3 _
                Select <DifferentChild><%= el.Value %></DifferentChild> _
            )

Console.WriteLine(dstTree)
```

This example produces the following output:

```xml
<NewRoot>
  <DifferentChild>3</DifferentChild>
  <DifferentChild>4</DifferentChild>
  <DifferentChild>5</DifferentChild>
</NewRoot>
```

## XStreamingElement.XStreamingElement(XName, Object) constructor

```csharp
public XStreamingElement (System.Xml.Linq.XName name, object? content);
```

Initializes a new instance of the `XStreamingElement` class with the specified name and content.

Parameters:

- `name`: An `XName` that contains the element name.
- `content`: The contents of the element.

#### Remarks
This constructor creates a streaming element with the specified content and attributes.

There is an implicit conversion from string to `XName`. Typical use of this constructor is to specify a string as the parameter instead of creating a new `XName`.

Queries are not iterated until the `XStreamingElement` is serialized. This is in contrast to using queries for content for an `XElement`, where queries are iterated at the time of construction of the new `XElement`.

For details about the valid content that can be passed to this constructor, see Valid Content of XElement and XDocument Objects.

#### Examples
This example uses the following XML file, named Source.xml:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<Root>
  <Child Key="01">
    <GrandChild>aaa</GrandChild>
  </Child>
  <Child Key="02">
    <GrandChild>bbb</GrandChild>
  </Child>
  <Child Key="03">
    <GrandChild>ccc</GrandChild>
  </Child>
</Root>
```

## XStreamingElement.XStreamingElement(XName, Object[]) constructor

```csharp
public XStreamingElement (System.Xml.Linq.XName name, params object?[] content);
```

Initializes a new instance of the `XStreamingElement` class with the specified name and content.

Parameters:

- `name`: An `XName` that contains the element name.
- `content`: The contents of the element.

#### Remarks
This constructor creates a streaming element with the specified content and attributes.

There is an implicit conversion from string to `XName`. Typical use of this constructor is to specify a string as the parameter instead of creating a new `XName`.

Queries are not iterated until the `XStreamingElement` is serialized. This is in contrast to using queries for content for an `XElement`, where queries are iterated at the time of construction of the new `XElement`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

#### Examples
This example uses the following XML file, named Source.xml:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<Root>
  <Child Key="01">
    <GrandChild>aaa</GrandChild>
  </Child>
  <Child Key="02">
    <GrandChild>bbb</GrandChild>
  </Child>
  <Child Key="03">
    <GrandChild>ccc</GrandChild>
  </Child>
</Root>
```

## XStreamingElement.Name property

```csharp
public System.Xml.Linq.XName Name { get; set; }
```

Gets or sets the name of this streaming element.

Returns: An `XName` that contains the name of this streaming element.

#### Examples
This example creates a new streaming element, and then prints the name of the element.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el >= 3
                        select new XElement("DifferentChild", (int)el)
                    );

Console.WriteLine(dstTree.Name);
```

```vb
Dim srcTree As XElement = _
        <Root>
            <Child>1</Child>
            <Child>2</Child>
            <Child>3</Child>
            <Child>4</Child>
            <Child>5</Child>
        </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                From el In srcTree.Elements _
                Where el.Value >= 3 _
                Select <DifferentChild><%= el.Value %></DifferentChild> _
            )

Console.WriteLine(dstTree.Name)
```

This example produces the following output:

```txt
NewRoot
```

## XStreamingElement.Add(Object) method

```csharp
public void Add (object? content);
```

Adds the specified content as children to this `XStreamingElement`.

Parameters:

- `content`: Content to be added to the streaming element.

#### Remarks
This constructor adds the specified content and attributes to the `XStreamingElement`. While it is often possible to construct the `XStreamingElement` in a single statement, it is sometimes more convenient to add content to the streaming element incrementally.

Queries are not iterated until the `XStreamingElement` is serialized. This is in contrast to using queries for content for an `XElement`, where queries are iterated at the time of construction of the new `XElement`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

#### Examples
The following example creates a new `XStreamingElement`. It then adds two queries to the streaming element. The queries are not iterated until the streaming element is serialized.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot");

dstTree.Add(
    from el in srcTree.Elements()
    where (int)el <= 1
    select new XElement("Child", (int)el)
);

dstTree.Add(
    from el in srcTree.Elements()
    where (int)el >= 3
    select new XElement("DifferentChild", (int)el)
);

Console.WriteLine(dstTree);
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot")

dstTree.Add( _
    From el In srcTree.Elements() _
    Where el.Value <= 1 _
    Select <Child><%= el.Value %></Child> _
)

dstTree.Add( _
    From el In srcTree.Elements() _
    Where el.Value >= 3 _
    Select <DifferentChild><%= el.Value %></DifferentChild> _
)

Console.WriteLine(dstTree)
```

This example produces the following output:

```xml
<NewRoot>
  <Child>1</Child>
  <DifferentChild>3</DifferentChild>
  <DifferentChild>4</DifferentChild>
  <DifferentChild>5</DifferentChild>
</NewRoot>
```

## XStreamingElement.Add(Object[]) method

```csharp
public void Add (params object?[] content);
```

Adds the specified content as children to this `XStreamingElement`.

Parameters:

- `content`: Content to be added to the streaming element.

#### Remarks
This constructor adds the specified content and attributes to the `XStreamingElement`. While it is often possible to construct the `XStreamingElement` in a single statement, it is sometimes more convenient to add content to the streaming element incrementally.

Queries are not iterated until the `XStreamingElement` is serialized. This is in contrast to using queries for content for an `XElement`, where queries are iterated at the time of construction of the new `XElement`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

#### Examples
The following example creates a new `XStreamingElement`. It then adds two queries to the streaming element. The queries are not iterated until the streaming element is serialized.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot");

dstTree.Add(
    from el in srcTree.Elements()
    where (int)el <= 1
    select new XElement("Child", (int)el)
);

dstTree.Add(
    from el in srcTree.Elements()
    where (int)el >= 3
    select new XElement("DifferentChild", (int)el)
);

Console.WriteLine(dstTree);
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot")

dstTree.Add( _
    From el In srcTree.Elements() _
    Where el.Value <= 1 _
    Select <Child><%= el.Value %></Child> _
)

dstTree.Add( _
    From el In srcTree.Elements() _
    Where el.Value >= 3 _
    Select <DifferentChild><%= el.Value %></DifferentChild> _
)

Console.WriteLine(dstTree)
```

This example produces the following output:

```xml
<NewRoot>
  <Child>1</Child>
  <DifferentChild>3</DifferentChild>
  <DifferentChild>4</DifferentChild>
  <DifferentChild>5</DifferentChild>
</NewRoot>
```

## XStreamingElement.Save(Stream) method

```csharp
public void Save (System.IO.Stream stream);
```

Outputs this `XStreamingElement` to the specified `Stream`.

Parameters:

- `stream`: The stream to output this `XDocument` to.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that insignificant white space will not be preserved.

If you want to control white space, use the overload of `XStreamingElement.Save` that takes `SaveOptions` as a parameter. Use the `DisableFormatting` option to save unindented XML. This will cause the writer to write all white spaces exactly as represented in the XML tree.

Use `OmitDuplicateNamespaces` option if you want to remove duplicate namespace declarations.

## XStreamingElement.Save(TextWriter) method

```csharp
public void Save (System.IO.TextWriter textWriter);
```

Serialize this streaming element to a `TextWriter`.

Parameters:

- `textWriter`: A `TextWriter` that the `XStreamingElement` will be written to.

#### Remarks
The serialized XML will be indented. All insignificant white space will be removed, and additional white space will be added so that the XML will be properly indented. The behavior of this method is that insignificant white space nodes in the XML tree will not be preserved.

If you want to control white space, use one of the overloads of `XStreamingElement.Save` that take `SaveOptions` as a parameter. For more information, see Preserve white space while loading or parsing XML and Preserve white space while serializing.

#### Examples
The following example creates a source XML tree, then instantiates an `XStreamingElement` using a query on the source XML tree. It then writes the streaming element to a `StringWriter`.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XStreamingElement dstTree = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el >= 3
                        select new XElement("DifferentChild", (int)el)
                    );

StringBuilder sb = new StringBuilder();
dstTree.Save(new StringWriter(sb));
Console.WriteLine(sb.ToString());
```

```vb
Dim srcTree As XElement = _
    <Root>
        <Child>1</Child>
        <Child>2</Child>
        <Child>3</Child>
        <Child>4</Child>
        <Child>5</Child>
    </Root>

Dim dstTree As XStreamingElement = New XStreamingElement("NewRoot", _
                        From el In srcTree.Elements() _
                        Where el.Value >= 3 _
                        Select <DifferentChild><%= el.Value %></DifferentChild> _
                    )

Dim sb As StringBuilder = New StringBuilder()
dstTree.Save(New StringWriter(sb))
Console.WriteLine(sb.ToString())
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-16"?>
<NewRoot>
  <DifferentChild>3</DifferentChild>
  <DifferentChild>4</DifferentChild>
  <DifferentChild>5</DifferentChild>
</NewRoot>
```
