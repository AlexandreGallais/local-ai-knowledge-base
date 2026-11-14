---
title: "ComVisibleAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComVisibleAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComVisibleAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComVisibleAttribute : Attribute
```

Controls accessibility of an individual managed type or member, or of all types within an assembly, to COM.

#### Remarks
You can apply this attribute to assemblies, interfaces, classes, structures, delegates, enumerations, fields, methods, event accessors, or properties.

The default is `true`, which indicates that the managed type is visible to COM. This attribute is not needed to make public managed assemblies and types visible; they are visible to COM by default. Only `public` types can be made visible. The attribute cannot be used to make an otherwise `internal` or `protected` type visible to COM or to make members of a nonvisible type visible.

Setting the attribute to `false` on the assembly hides all `public` types within the assembly. You can selectively make types within the assembly visible by setting the individual types to `true`. Setting the attribute to `false` on a specific type hides that type and its members. However, you cannot make members of a type visible if the type is invisible. Setting the attribute to `false` on a type prevents that type from being exported to a type library; classes are not registered; interfaces are never responsive to unmanaged `QueryInterface` calls.

Unless you explicitly set a class and its members to `false`, inherited classes can expose to COM base class members that are invisible in the original class. For example, if you set ClassA to `false` and do not apply the attribute to its members, the class and its members are invisible to COM. However, if you derive ClassB from ClassA and export ClassB to COM, ClassA members become visible base class members of ClassB.

#### Examples
The following example shows how you can control the visibility to COM of a class so that its members are invisible. By setting `ComVisibleAttribute` to `false` on `MyClass`(`SampleClass` in the Visual Basic <example-value>), and `false` on `MyMethod` and `MyProperty`, you can avoid inadvertently exposing the members to COM through inheritance.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComVisibleAttribute/Overview/source.cs._

## ComVisibleAttribute.ComVisibleAttribute(Boolean) constructor

```csharp
public ComVisibleAttribute (bool visibility);
```

Initializes a new instance of the `ComVisibleAttribute` class.

Parameters:

- `visibility`: `true` to indicate that the type is visible to COM; otherwise, `false`. The default is `true`.

#### Remarks
To make types visible to COM, set the attribute to `true`. To hide types from COM, set the attribute to `false`.

## ComVisibleAttribute.Value property

```csharp
public bool Value { get; }
```

Gets a value that indicates whether the COM type is visible.

Returns: `true` if the type is visible; otherwise, `false`. The default value is `true`.

To be added.
