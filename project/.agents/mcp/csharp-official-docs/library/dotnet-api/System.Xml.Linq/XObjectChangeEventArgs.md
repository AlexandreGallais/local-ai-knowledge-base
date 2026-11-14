---
title: "XObjectChangeEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XObjectChangeEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XObjectChangeEventArgs class

Namespace: `System.Xml.Linq`

```csharp
public class XObjectChangeEventArgs : EventArgs
```

Provides data for the `XObject.Changing` and `XObject.Changed` events.

#### Remarks
The purpose of this class is to hold the argument that is passed to an event handler when LINQ to XML raises events.

## XObjectChangeEventArgs.XObjectChangeEventArgs(XObjectChange) constructor

```csharp
public XObjectChangeEventArgs (System.Xml.Linq.XObjectChange objectChange);
```

Initializes a new instance of the `XObjectChangeEventArgs` class.

Parameters:

- `objectChange`: An `XObjectChange` that contains the event arguments for LINQ to XML events.

#### Remarks
The read-only fields `Add`, `Remove`, `Name`, and `Value` provide predefined instances for all the event arguments that are raised in LINQ to XML. A typical user will not need to construct event arguments.

## XObjectChangeEventArgs.ObjectChange property

```csharp
public System.Xml.Linq.XObjectChange ObjectChange { get; }
```

Gets the type of change.

Returns: An `XObjectChange` that contains the type of change.

To be added.

## XObjectChangeEventArgs.Add field

```csharp
public static readonly System.Xml.Linq.XObjectChangeEventArgs Add;
```

Event argument for an `XObjectChange.Add` change event.

#### Remarks
When LINQ to XML raises an `Add` event, it passes the instance returned by this property as an argument.

## XObjectChangeEventArgs.Name field

```csharp
public static readonly System.Xml.Linq.XObjectChangeEventArgs Name;
```

Event argument for a `XObjectChange.Name` change event.

#### Remarks
When LINQ to XML raises an `Name` event, it passes the instance returned by this property as an argument.

## XObjectChangeEventArgs.Remove field

```csharp
public static readonly System.Xml.Linq.XObjectChangeEventArgs Remove;
```

Event argument for a `XObjectChange.Remove` change event.

#### Remarks
When LINQ to XML raises an `Remove` event, it passes the instance returned by this property as an argument.

## XObjectChangeEventArgs.Value field

```csharp
public static readonly System.Xml.Linq.XObjectChangeEventArgs Value;
```

Event argument for a `XObjectChange.Value` change event.

#### Remarks
When LINQ to XML raises an `Value` event, it passes the instance returned by this property as an argument.
