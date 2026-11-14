---
title: "ReferenceResolver class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/ReferenceResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReferenceResolver class

Namespace: `System.Text.Json.Serialization`

```csharp
public abstract class ReferenceResolver
```

Defines how the `JsonSerializer` deals with references on serialization and deserialization.
Defines the core behavior of preserving references on serialization and deserialization.

To be added.

## ReferenceResolver.ReferenceResolver() constructor

```csharp
protected ReferenceResolver ();
```

Initializes a new instance of the `ReferenceResolver` class.

To be added.

## ReferenceResolver.AddReference(String, Object) method

```csharp
public abstract void AddReference (string referenceId, object value);
```

Adds an entry to the bag of references using the specified ID and value.
This method gets called when an $id metadata property from a JSON object is read.

Parameters:

- `referenceId`: The identifier of the JSON object or array.
- `value`: The value of the CLR reference type object that results from parsing the JSON object.

To be added.

## ReferenceResolver.GetReference(Object, Boolean) method

```csharp
public abstract string GetReference (object value, out bool alreadyExists);
```

Gets the reference identifier of the specified value if exists; otherwise a new ID is assigned.
This method gets called before a CLR object is written so we can decide whether to write \\$id and enumerate the rest of its properties or \\$ref and step into the next object.

Parameters:

- `value`: The value of the CLR reference type object to get an ID for.
- `alreadyExists`: When this method returns, `true` if a reference to value already exists; otherwise, `false`.

Returns: The reference ID for the specified object.

To be added.

## ReferenceResolver.ResolveReference(String) method

```csharp
public abstract object ResolveReference (string referenceId);
```

Returns the CLR reference type object related to the specified reference ID.
This method is called when $ref metadata property is read.

Parameters:

- `referenceId`: The reference ID related to the returned object.

Returns: The reference type object related to the specified reference ID.

To be added.
