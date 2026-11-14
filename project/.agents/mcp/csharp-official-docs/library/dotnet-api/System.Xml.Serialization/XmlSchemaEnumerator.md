---
title: "XmlSchemaEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSchemaEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSchemaEnumerator class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlSchemaEnumerator : System.Collections.Generic.IEnumerator<System.Xml.Schema.XmlSchema>
```

Enables iteration over a collection of `XmlSchema` objects.

#### Remarks
Use the `XmlSchemaEnumerator` to perform for-each iterations over a collection of `XmlSchema` objects contained by an instance of the `XmlSchemas` class.

## XmlSchemaEnumerator.XmlSchemaEnumerator(XmlSchemas) constructor

```csharp
public XmlSchemaEnumerator (System.Xml.Serialization.XmlSchemas list);
```

Initializes a new instance of the `XmlSchemaEnumerator` class.

Parameters:

- `list`: The `XmlSchemas` object you want to iterate over.

To be added.

## XmlSchemaEnumerator.Current property

```csharp
public System.Xml.Schema.XmlSchema Current { get; }
```

Gets the current element in the collection.

Returns: The current `XmlSchema` object in the collection.

To be added.

## XmlSchemaEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the current element in the collection of `XmlSchema` objects.

Returns: The current element in the collection of `XmlSchema` objects.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `XmlSchemaEnumerator` instance is cast to an `IEnumerator` interface.

## XmlSchemaEnumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `XmlSchemaEnumerator`.

To be added.

## XmlSchemaEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next item in the collection.

Returns: `true` if the move is successful; otherwise, `false`.

To be added.

## XmlSchemaEnumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection of `XmlSchema` objects.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `XmlSchemaEnumerator` instance is cast to an `IEnumerator` interface.
