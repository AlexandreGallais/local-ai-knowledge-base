---
title: "ClassInterfaceAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ClassInterfaceAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClassInterfaceAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ClassInterfaceAttribute : Attribute
```

Indicates the type of class interface to be generated for a class exposed to COM, if an interface is generated at all.

#### Remarks
You can apply this attribute to assemblies or classes.

This attribute controls whether the Type Library Exporter (Tlbexp.exe) automatically generates a class interface for the attributed class. A class interface carries the same name as the class itself, but the name is prefixed with an underscore. When exposed, the class interface contains all the `public`, non- `static` members of the managed class, including members inherited from its base class. Managed classes cannot access a class interface and have no need to as they can access the class members directly. Tlbexp.exe generates a unique interface identifier (IID) for the class interface.

Class interfaces can be dual or dispatch-only interfaces. Optionally, you can suppress the generation of the class interface and provide a custom interface instead. You expose or suppress a class interface by specifying a `ClassInterfaceType` enumeration member. When you apply `ClassInterfaceAttribute` to an assembly, the attribute pertains to all classes in the assembly unless the individual classes override the setting with their own attribute.

Although class interfaces eliminate the task of explicitly defining interfaces for each class, their use in production applications is strongly discouraged. Dual class interfaces allow clients to bind to a specific interface layout that is subject to change as the class evolves. For example, consider a managed class that exposes a class interface to COM clients. The first version of the class contains methods `North` and `South`. An unmanaged client can bind to the class interface, which provides `North` as the first method in the class interface and method `South` as the second method. Now consider the next version of the class, which has a new method, `East`, inserted between methods `North` and `South`. Unmanaged clients that try to bind to the new class through the old class interface end up calling method `East` when they intend to call method `South`, because the positioning of methods within the interface has changed. Moreover, any change to the layout of a base class also affects the layout of the class interface for all derived classes. Managed clients, which bind directly to classes, do not exhibit the same versioning problems. For specific guidelines on using a class interface, see COM Callable Wrapper.

The Tlbimp.exe (Type Library Importer) always applies to imported classes the `None` enumeration member to indicate that existing COM classes never expose managed interfaces.

#### Examples
The following example shows how to apply the `ClassInterfaceAttribute` with the `ClassInterfaceType` value `AutoDispatch`, which generates an `IDispatch` interface for `MyClass`.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ClassInterfaceAttribute/Overview/source.cs._

## ClassInterfaceAttribute.ClassInterfaceAttribute(Int16) constructor

```csharp
public ClassInterfaceAttribute (short classInterfaceType);
```

Initializes a new instance of the `ClassInterfaceAttribute` class with the specified `ClassInterfaceType` enumeration value.

Parameters:

- `classInterfaceType`: Describes the type of interface that is generated for a class.

#### Remarks
This constructor takes an underlying 16-bit signed integer that represents each `ClassInterfaceType` enumeration member. The Tlbimp.exe (Type Library Importer) uses this constructor.

## ClassInterfaceAttribute.ClassInterfaceAttribute(ClassInterfaceType) constructor

```csharp
public ClassInterfaceAttribute (System.Runtime.InteropServices.ClassInterfaceType classInterfaceType);
```

Initializes a new instance of the `ClassInterfaceAttribute` class with the specified `ClassInterfaceType` enumeration member.

Parameters:

- `classInterfaceType`: One of the `ClassInterfaceType` values that describes the type of interface that is generated for a class.

#### Remarks
For readable code that is less prone to error, always use this constructor.

## ClassInterfaceAttribute.Value property

```csharp
public System.Runtime.InteropServices.ClassInterfaceType Value { get; }
```

Gets the `ClassInterfaceType` value that describes which type of interface should be generated for the class.

Returns: The `ClassInterfaceType` value that describes which type of interface should be generated for the class.

To be added.
