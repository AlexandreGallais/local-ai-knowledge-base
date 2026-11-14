---
title: "XmlSchemas class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSchemas.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSchemas class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlSchemas : System.Collections.CollectionBase, System.Collections.Generic.IEnumerable<System.Xml.Schema.XmlSchema>
```

Represents the collection of XML schemas.

To be added.

## XmlSchemas.XmlSchemas() constructor

```csharp
public XmlSchemas ();
```

Initializes a new instance of the `XmlSchemas` class.

To be added.

## XmlSchemas.IsCompiled property

```csharp
public bool IsCompiled { get; }
```

Gets a value that indicates whether the schemas have been compiled.

Returns: `true`, if the schemas have been compiled; otherwise, `false`.

#### Remarks
You can compile the schemas referenced in a `XmlSchemas` object by invoking the `XmlSchemas.Compile` method.

## XmlSchemas.Item property

```csharp
public System.Xml.Schema.XmlSchema this[int index] { get; set; }
```

Gets or sets the `XmlSchema` object at the specified index.

Parameters:

- `index`: The index of the item to retrieve.

Returns: The specified `XmlSchema`.

To be added.

## XmlSchemas.Item property

```csharp
public System.Xml.Schema.XmlSchema? this[string? ns] { get; }
```

Gets a specified `XmlSchema` object that represents the XML schema associated with the specified namespace.

Parameters:

- `ns`: The namespace of the specified object.

Returns: The specified `XmlSchema` object.

To be added.

## XmlSchemas.Add(XmlSchema) method

```csharp
public int Add (System.Xml.Schema.XmlSchema schema);
```

Adds an object to the end of the collection.

Parameters:

- `schema`: The `XmlSchema` object to be added to the collection of objects.

Returns: The index at which the `XmlSchema` is added.

To be added.

## XmlSchemas.Add(XmlSchemas) method

```csharp
public void Add (System.Xml.Serialization.XmlSchemas schemas);
```

Adds an instance of the `XmlSchemas` class to the end of the collection.

Parameters:

- `schemas`: The `XmlSchemas` object to be added to the end of the collection.

To be added.

## XmlSchemas.Add(XmlSchema, Uri) method

```csharp
public int Add (System.Xml.Schema.XmlSchema schema, Uri? baseUri);
```

Adds an `XmlSchema` object that represents an assembly reference to the collection.

Parameters:

- `schema`: The `XmlSchema` to add.
- `baseUri`: The `Uri` of the schema object.

Returns: The index at which the `XmlSchema` is added.

To be added.

## XmlSchemas.AddReference(XmlSchema) method

```csharp
public void AddReference (System.Xml.Schema.XmlSchema schema);
```

Adds an `XmlSchema` object that represents an assembly reference to the collection.

Parameters:

- `schema`: The `XmlSchema` to add.

To be added.

## XmlSchemas.Compile(ValidationEventHandler, Boolean) method

```csharp
public void Compile (System.Xml.Schema.ValidationEventHandler? handler, bool fullCompile);
```

Processes the element and attribute names in the XML schemas and, optionally, validates the XML schemas.

Parameters:

- `handler`: A `ValidationEventHandler` that specifies the callback method that handles errors and warnings during XML Schema validation, if the strict parameter is set to `true`.
- `fullCompile`: `true` to validate the XML schemas in the collection using the `XmlSchemas.Compile` method of the `XmlSchemas` class; otherwise, `false`.

#### Remarks
The following list identifies situations in which the `XmlSchemas.Compile` method is called:

- By the `ServiceDescriptionReflector` class while creating `ServiceDescription` objects from classes that are identified as Web services.

- By the Wsdl.exe tool or the `ServiceDescriptionImporter` class, while generating client proxy classes or abstract server classes from a Web Services Description Language (WSDL) document.

- By the Xsd.exe tool while generating XML schemas from types found in assemblies.

Instead of calling the `XmlSchemas.Compile` method directly, use the previously mentioned classes or tools.

## XmlSchemas.Contains(String) method

```csharp
public bool Contains (string? targetNamespace);
```

Returns a value that indicates whether the collection contains an `XmlSchema` object that belongs to the specified namespace.

Parameters:

- `targetNamespace`: The namespace of the item to check for.

Returns: `true` if the item is found; otherwise, `false`.

To be added.

## XmlSchemas.Contains(XmlSchema) method

```csharp
public bool Contains (System.Xml.Schema.XmlSchema schema);
```

Determines whether the `XmlSchemas` contains a specific schema.

Parameters:

- `schema`: The `XmlSchema` object to locate.

Returns: `true`, if the collection contains the specified item; otherwise, `false`.

To be added.

## XmlSchemas.CopyTo(XmlSchema[], Int32) method

```csharp
public void CopyTo (System.Xml.Schema.XmlSchema[] array, int index);
```

Copies the entire `XmlSchemas` to a compatible one-dimensional `Array`, which starts at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the schemas copied from `XmlSchemas`. The `Array` must have zero-based indexing.
- `index`: A 32-bit integer that represents the index in the array where copying begins.

To be added.

## XmlSchemas.Find(XmlQualifiedName, Type) method

```csharp
public object? Find (System.Xml.XmlQualifiedName name, Type type);
```

Locates in one of the XML schemas an `XmlSchemaObject` of the specified name and type.

Parameters:

- `name`: An `XmlQualifiedName` that specifies a fully qualified name with a namespace used to locate an `XmlSchema` object in the collection.
- `type`: The `Type` of the object to find. Possible types include: `XmlSchemaGroup`, `XmlSchemaAttributeGroup`, `XmlSchemaElement`, `XmlSchemaAttribute`, and `XmlSchemaNotation`.

Returns: An `XmlSchemaObject` instance, such as an `XmlSchemaElement` or `XmlSchemaAttribute`.

To be added.

## XmlSchemas.GetSchemas(String) method

```csharp
public System.Collections.IList GetSchemas (string? ns);
```

Gets a collection of schemas that belong to the same namespace.

Parameters:

- `ns`: The namespace of the schemas to retrieve.

Returns: An `IList` implementation that contains the schemas.

#### Remarks
The method returns an `ArrayList`.

## XmlSchemas.IndexOf(XmlSchema) method

```csharp
public int IndexOf (System.Xml.Schema.XmlSchema schema);
```

Searches for the specified schema and returns the zero-based index of the first occurrence within the entire `XmlSchemas`.

Parameters:

- `schema`: The `XmlSchema` to locate.

Returns: The zero-based index of the first occurrence of the value within the entire `XmlSchemas`, if found; otherwise, -1.

To be added.

## XmlSchemas.Insert(Int32, XmlSchema) method

```csharp
public void Insert (int index, System.Xml.Schema.XmlSchema schema);
```

Inserts a schema into the `XmlSchemas` at the specified index.

Parameters:

- `index`: The zero-based index at which `schema` should be inserted.
- `schema`: The `XmlSchema` object to be inserted.

To be added.

## XmlSchemas.IsDataSet(XmlSchema) method

```csharp
public static bool IsDataSet (System.Xml.Schema.XmlSchema schema);
```

Static method that determines whether the specified XML schema contains a custom `IsDataSet` attribute set to `true`, or its equivalent.

Parameters:

- `schema`: The XML schema to check for an `IsDataSet` attribute with a `true` value.

Returns: `true` if the specified schema exists; otherwise, `false`.

#### Remarks
The `IsDataSet` attribute comes from the namespace `urn:schemas-microsoft-com:xml-msdata`.

The `XmlSchemas.IsDataSet` method is called by .NET's XML serialization infrastructure and does not need to be called directly.

## XmlSchemas.OnClear() method

```csharp
protected override void OnClear ();
```

Performs additional custom processes when clearing the contents of the `XmlSchemas` instance.

To be added.

## XmlSchemas.OnInsert(Int32, Object) method

```csharp
protected override void OnInsert (int index, object? value);
```

Performs additional custom processes before inserting a new element into the `XmlSchemas` instance.

Parameters:

- `index`: The zero-based index at which to insert `value`.
- `value`: The new value of the element at `index`.

To be added.

## XmlSchemas.OnRemove(Int32, Object) method

```csharp
protected override void OnRemove (int index, object? value);
```

Performs additional custom processes when removing an element from the `XmlSchemas` instance.

Parameters:

- `index`: The zero-based index at which `value` can be found.
- `value`: The value of the element to remove at `index`.

To be added.

## XmlSchemas.OnSet(Int32, Object, Object) method

```csharp
protected override void OnSet (int index, object? oldValue, object? newValue);
```

Performs additional custom processes before setting a value in the `XmlSchemas` instance.

Parameters:

- `index`: The zero-based index at which `oldValue` can be found.
- `oldValue`: The value to replace with `newValue`.
- `newValue`: The new value of the element at `index`.

To be added.

## XmlSchemas.Remove(XmlSchema) method

```csharp
public void Remove (System.Xml.Schema.XmlSchema schema);
```

Removes the first occurrence of a specific schema from the `XmlSchemas`.

Parameters:

- `schema`: The `XmlSchema` to remove.

To be added.

## XmlSchemas.System.Collections.Generic.IEnumerable<System.Xml.Schema.XmlSchema>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Xml.Schema.XmlSchema> IEnumerable<XmlSchema>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection of XML schemas.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

To be added.
