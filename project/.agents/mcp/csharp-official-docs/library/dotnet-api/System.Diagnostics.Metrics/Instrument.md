---
title: "Instrument class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/Instrument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Instrument class

Namespace: `System.Diagnostics.Metrics`

```csharp
public abstract class Instrument
```

Base class of all metrics instrument classes

To be added.

## Instrument.Instrument(Meter, String) constructor

```csharp
protected Instrument (System.Diagnostics.Metrics.Meter meter, string name);
```

Constructs a new instance of `Instrument`.

Parameters:

- `meter`: The meter that created the instrument. Cannot be `null`.
- `name`: The instrument name. Cannot be `null`.

To be added.

## Instrument.Instrument(Meter, String, String, String) constructor

```csharp
protected Instrument (System.Diagnostics.Metrics.Meter meter, string name, string? unit, string? description);
```

Protected constructor to initialize the common instrument properties like the meter, name, description, and unit.

Parameters:

- `meter`: The meter that created the instrument.
- `name`: The instrument name. Cannot be `null`.
- `unit`: Optional instrument unit of measurements.
- `description`: Optional instrument description.

All classes that Instrument must call this constructor when constructing objects of the extended class.

## Instrument.Instrument(Meter, String, String, String, Object>>) constructor

```csharp
protected Instrument (System.Diagnostics.Metrics.Meter meter, string name, string? unit = default, string? description = default, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default);
```

Initializes a new instance of the `Instrument` class with the specified meter, name, description, and unit.

Parameters:

- `meter`: The meter that created the instrument.
- `name`: The instrument name. Cannot be `null`.
- `unit`: An optional instrument unit of measurements.
- `description`: An optional instrument description.
- `tags`: Optional instrument tags.

All classes extending `Instrument` need to call this constructor when constructing an object of the extended class.

## Instrument.Description property

```csharp
public string? Description { get; }
```

Gets the instrument description.

Returns: To be added.

To be added.

## Instrument.Enabled property

```csharp
public bool Enabled { get; }
```

Gets a value that indicates if there are any listeners for this instrument.

Returns: To be added.

To be added.

## Instrument.IsObservable property

```csharp
public virtual bool IsObservable { get; }
```

Gets a value that indicates whether the instrument is an observable instrument.

Returns: To be added.

To be added.

## Instrument.Meter property

```csharp
public System.Diagnostics.Metrics.Meter Meter { get; }
```

Gets the Meter that created the instrument.

Returns: To be added.

To be added.

## Instrument.Name property

```csharp
public string Name { get; }
```

Gets the instrument name.

Returns: To be added.

To be added.

## Instrument.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? Tags { get; }
```

Returns the tags associated with the instrument.

Returns: To be added.

To be added.

## Instrument.Unit property

```csharp
public string? Unit { get; }
```

Gets the instrument unit of measurements.

Returns: To be added.

To be added.

## Instrument.Publish() method

```csharp
protected void Publish ();
```

Activates the instrument to start recording measurements and to allow listeners to start listening to such measurements.

To be added.
