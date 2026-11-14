---
title: "ComSourceInterfacesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComSourceInterfacesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComSourceInterfacesAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComSourceInterfacesAttribute : Attribute
```

Identifies a list of interfaces that are exposed as COM event sources for the attributed class.

#### Remarks
You can apply this attribute to classes.

You apply this attribute to a managed class to identify the event interfaces that the class exposes as COM connection points. An event interface contains methods that map to the event members of the class. The class event name and the interface method name must be the same. This attribute can accommodate up to four source interfaces for a class by passing the type of the source interface to the appropriate constructor, which take between one and four type arguments. For classes that want to expose more than four source interfaces, the string version of the constructor can be used.

#### Examples
The following example shows how to apply the `ComSourceInterfacesAttribute` to connect the event sink interface to a class by passing the namespace and event sink interface.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComSourceInterfacesAttribute/Overview/source.cs._

## ComSourceInterfacesAttribute.ComSourceInterfacesAttribute(String) constructor

```csharp
public ComSourceInterfacesAttribute (string sourceInterfaces);
```

Initializes a new instance of the `ComSourceInterfacesAttribute` class with the name of the event source interface.

Parameters:

- `sourceInterfaces`: A null-delimited list of fully qualified event source interface names.

#### Remarks
Use this constructor to expose more than four event source interfaces to COM clients.

## ComSourceInterfacesAttribute.ComSourceInterfacesAttribute(Type) constructor

```csharp
public ComSourceInterfacesAttribute (Type sourceInterface);
```

Initializes a new instance of the `ComSourceInterfacesAttribute` class with the type to use as a source interface.

Parameters:

- `sourceInterface`: The `Type` of the source interface.

#### Remarks
Use this constructor to expose a single event source interface to COM clients.

## ComSourceInterfacesAttribute.ComSourceInterfacesAttribute(Type, Type) constructor

```csharp
public ComSourceInterfacesAttribute (Type sourceInterface1, Type sourceInterface2);
```

Initializes a new instance of the `ComSourceInterfacesAttribute` class with the types to use as source interfaces.

Parameters:

- `sourceInterface1`: The `Type` of the default source interface.
- `sourceInterface2`: The `Type` of a source interface.

#### Remarks
Use this constructor to expose two event source interfaces to COM clients.

## ComSourceInterfacesAttribute.ComSourceInterfacesAttribute(Type, Type, Type) constructor

```csharp
public ComSourceInterfacesAttribute (Type sourceInterface1, Type sourceInterface2, Type sourceInterface3);
```

Initializes a new instance of the `ComSourceInterfacesAttribute` class with the types to use as source interfaces.

Parameters:

- `sourceInterface1`: The `Type` of the default source interface.
- `sourceInterface2`: The `Type` of a source interface.
- `sourceInterface3`: The `Type` of a source interface.

#### Remarks
Use this constructor to expose three event source interfaces to COM clients.

## ComSourceInterfacesAttribute.ComSourceInterfacesAttribute(Type, Type, Type, Type) constructor

```csharp
public ComSourceInterfacesAttribute (Type sourceInterface1, Type sourceInterface2, Type sourceInterface3, Type sourceInterface4);
```

Initializes a new instance of the `ComSourceInterfacesAttribute` class with the types to use as source interfaces.

Parameters:

- `sourceInterface1`: The `Type` of the default source interface.
- `sourceInterface2`: The `Type` of a source interface.
- `sourceInterface3`: The `Type` of a source interface.
- `sourceInterface4`: The `Type` of a source interface.

#### Remarks
Use this constructor to expose four event source interfaces to COM clients.

## ComSourceInterfacesAttribute.Value property

```csharp
public string Value { get; }
```

Gets the fully qualified name of the event source interface.

Returns: The fully qualified name of the event source interface.

#### Remarks
If you specify more than one source interface, the value returned is a null-delimited list of fully qualified event source interface names.
