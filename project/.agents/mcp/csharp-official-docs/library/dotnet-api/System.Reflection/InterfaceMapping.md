---
title: "InterfaceMapping struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/InterfaceMapping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InterfaceMapping struct

Namespace: `System.Reflection`

```csharp
public struct InterfaceMapping
```

Retrieves the mapping of an interface into the actual methods on a class that implements that interface.

#### Remarks
Use the `InterfaceMapping` structure when a type implements interface methods that use method names other than those specified by the interface, or when a type implements multiple interfaces which have a method with the same name.

To obtain an `InterfaceMapping` structure, use the `Type.GetInterfaceMap` method.

## InterfaceMapping.InterfaceMethods field

```csharp
public System.Reflection.MethodInfo[] InterfaceMethods;
```

Shows the methods that are defined on the interface.

#### Remarks
The elements returned in the `InterfaceMethods` array match their counterpart elements returned from the `TargetMethods` array. That is, the elements are in the same array indexing order.

## InterfaceMapping.InterfaceType field

```csharp
public Type InterfaceType;
```

Shows the type that represents the interface.

To be added.

## InterfaceMapping.TargetMethods field

```csharp
public System.Reflection.MethodInfo[] TargetMethods;
```

Shows the methods that implement the interface.

#### Remarks
The elements returned in the `InterfaceMethods` array match their counterpart elements returned from the `TargetMethods` array. That is, the elements are in the same array indexing order.

## InterfaceMapping.TargetType field

```csharp
public Type TargetType;
```

Represents the type that was used to create the interface mapping.

#### Remarks
The value of the `TargetType` field is the instance of `Type` whose `Type.GetInterfaceMap` method returned the current `InterfaceMapping` structure.
