---
title: "HandleCollector class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/HandleCollector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HandleCollector class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class HandleCollector
```

Tracks outstanding handles and forces a garbage collection when the specified threshold is reached.

#### Remarks
The `HandleCollector` class keeps track of a limited number of handles to unmanaged resources.  Typically, unmanaged resources include handles to `HDC`s, `HWnd`s, and so on.

## HandleCollector.HandleCollector(String, Int32) constructor

```csharp
public HandleCollector (string? name, int initialThreshold);
```

Initializes a new instance of the `HandleCollector` class using a name and a threshold at which to begin handle collection.

Parameters:

- `name`: A name for the collector. This parameter allows you to name collectors that track handle types separately.
- `initialThreshold`: A value that specifies the point at which collections should begin.

Exceptions:

- `ArgumentOutOfRangeException`: The `initialThreshold` parameter is less than 0.

To be added.

## HandleCollector.HandleCollector(String, Int32, Int32) constructor

```csharp
public HandleCollector (string? name, int initialThreshold, int maximumThreshold);
```

Initializes a new instance of the `HandleCollector` class using a name, a threshold at which to begin handle collection, and a threshold at which handle collection must occur.

Parameters:

- `name`: A name for the collector.  This parameter allows you to name collectors that track handle types separately.
- `initialThreshold`: A value that specifies the point at which collections should begin.
- `maximumThreshold`: A value that specifies the point at which collections must occur. This should be set to the maximum number of available handles.

Exceptions:

- `ArgumentOutOfRangeException`: The `initialThreshold` parameter is less than 0.

-or-

The `maximumThreshold` parameter is less than 0.
- `ArgumentException`: The `maximumThreshold` parameter is less than the `initialThreshold` parameter.

To be added.

## HandleCollector.Count property

```csharp
public int Count { get; }
```

Gets the number of handles collected.

Returns: The number of handles collected.

To be added.

## HandleCollector.InitialThreshold property

```csharp
public int InitialThreshold { get; }
```

Gets a value that specifies the point at which collections should begin.

Returns: A value that specifies the point at which collections should begin.

To be added.

## HandleCollector.MaximumThreshold property

```csharp
public int MaximumThreshold { get; }
```

Gets a value that specifies the point at which collections must occur.

Returns: A value that specifies the point at which collections must occur.

To be added.

## HandleCollector.Name property

```csharp
public string Name { get; }
```

Gets the name of a `HandleCollector` object.

Returns: This `HandleCollector.Name` property allows you to name collectors that track handle types separately.

To be added.

## HandleCollector.Add() method

```csharp
public void Add ();
```

Increments the current handle count.

Exceptions:

- `InvalidOperationException`: The `HandleCollector.Count` property is less than 0.

To be added.

## HandleCollector.Remove() method

```csharp
public void Remove ();
```

Decrements the current handle count.

Exceptions:

- `InvalidOperationException`: The `HandleCollector.Count` property is less than 0.

To be added.
