---
title: "DataflowMessageHeader struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/DataflowMessageHeader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataflowMessageHeader struct

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public readonly struct DataflowMessageHeader : IEquatable<System.Threading.Tasks.Dataflow.DataflowMessageHeader>
```

Provides a container of data attributes for passing between dataflow blocks.

To be added.

## DataflowMessageHeader.DataflowMessageHeader(Int64) constructor

```csharp
public DataflowMessageHeader (long id);
```

Initializes a new `DataflowMessageHeader` with the specified attributes.

Parameters:

- `id`: The ID of the message. Must be unique within the originating source block. It does not need to be globally unique.

To be added.

## DataflowMessageHeader.Id property

```csharp
public long Id { get; }
```

Gets the ID of the message within the source.

Returns: The ID contained in the  `DataflowMessageHeader` instance.

To be added.

## DataflowMessageHeader.IsValid property

```csharp
public bool IsValid { get; }
```

Gets the validity of the message.

Returns: `true` if the ID of the message is different from 0. `false` if the ID of the message is 0.

To be added.

## DataflowMessageHeader.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Checks boxed `DataflowMessageHeader` instances for equality by ID.

Parameters:

- `obj`: A boxed `DataflowMessageHeader` instance.

Returns: `true` if the instances are equal; otherwise, `false`.

To be added.

## DataflowMessageHeader.Equals(DataflowMessageHeader) method

```csharp
public bool Equals (System.Threading.Tasks.Dataflow.DataflowMessageHeader other);
```

Checks two  `DataflowMessageHeader` instances for equality by ID without boxing.

Parameters:

- `other`: Another  `DataflowMessageHeader` instance.

Returns: `true` if the instances are equal; otherwise, `false`.

To be added.

## DataflowMessageHeader.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Generates a hash code for the `DataflowMessageHeader` instance.

Returns: The hash code.

To be added.

## DataflowMessageHeader.op_Equality(DataflowMessageHeader, DataflowMessageHeader) method

```csharp
public static bool operator == (System.Threading.Tasks.Dataflow.DataflowMessageHeader left, System.Threading.Tasks.Dataflow.DataflowMessageHeader right);
```

Checks two  `DataflowMessageHeader` instances for equality by ID.

Parameters:

- `left`: A  `DataflowMessageHeader` instance.
- `right`: A  `DataflowMessageHeader` instance.

Returns: `true` if the instances are equal; otherwise, `false`.

To be added.

## DataflowMessageHeader.op_Inequality(DataflowMessageHeader, DataflowMessageHeader) method

```csharp
public static bool operator != (System.Threading.Tasks.Dataflow.DataflowMessageHeader left, System.Threading.Tasks.Dataflow.DataflowMessageHeader right);
```

Checks two  `DataflowMessageHeader` instances for non-equality by ID.

Parameters:

- `left`: A  `DataflowMessageHeader` instance.
- `right`: A  `DataflowMessageHeader` instance.

Returns: `true` if the instances are not equal; otherwise, `false`.

To be added.
