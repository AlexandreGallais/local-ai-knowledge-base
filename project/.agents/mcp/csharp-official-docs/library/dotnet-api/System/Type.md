---
title: "Type class (part 1 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class

Namespace: `System`

```csharp
public abstract class Type : System.Reflection.MemberInfo, System.Reflection.IReflect
```

Represents type declarations: class types, interface types, array types, value types, enumeration types, type parameters, generic type definitions, and open or closed constructed generic types.

The `Type` class is the root of the `Reflection` functionality and is the primary way to access metadata. Use the members of `Type` to get information about a type declaration, about the members of a type (such as the constructors, methods, fields, properties, and events of a class), as well as the module and the assembly in which the class is deployed.

No permissions are required for code to use reflection to get information about types and their members, regardless of their access levels. No permissions are required for code to use reflection to access public members, or other members whose access levels would make them visible during normal compilation. However, in order for your code to use reflection to access members that would normally be inaccessible, such as private or internal methods, or protected fields of a type your class does not inherit, your code must have `ReflectionPermission`. See Security Considerations for Reflection.

`Type` is an abstract base class that allows multiple implementations. The system will always provide the derived class `RuntimeType`. In reflection, all classes beginning with the word Runtime are created only once per object in the system and support comparison operations.

> **Note:**
> In multithreading scenarios, do not lock `Type` objects in order to synchronize access to `static` data. Other code, over which you have no control, might also lock your class type. This might result in a deadlock. Instead, synchronize access to static data by locking a private `static` object.

> **Note:**
> A derived class can access protected members of the calling code's base classes. Also, access is allowed to assembly members of the calling code's assembly. As a rule, if you are allowed access in early-bound code, then you are also allowed access in late-bound code.

> **Note:**
> Interfaces that extend other interfaces do not inherit the methods defined in the extended interfaces.

#### What types does a Type object represent?

This class is thread safe; multiple threads can concurrently read from an instance of this type. An instance of the `Type` class can represent any of the following types:

- Classes
- Value types
- Arrays
- Interfaces
- Enumerations
- Delegates
- Constructed generic types and generic type definitions
- Type arguments and type parameters of constructed generic types, generic type definitions, and generic method definitions

#### Retrieve a Type object

The `Type` object associated with a particular type can be obtained in the following ways:

- The instance `Object.GetType` method returns a `Type` object that represents the type of an instance. Because all managed types derive from `Object`, the `Object.GetType` method can be called on an instance of any type.

The following example calls the `Object.GetType` method to determine the runtime type of each object in an object array.

_Code sample not included: ~/snippets/csharp/System/Type/Overview/GetType1.cs._

- The static `Type.GetType` methods return a `Type` object that represents a type specified by its fully qualified name.

- The `Module.GetTypes`, `Module.GetType`, and `Module.FindTypes` methods return `Type` objects that represent the types defined in a module. The first method can be used to obtain an array of `Type` objects for all the public and private types defined in a module. (You can obtain an instance of `Module` through the `Assembly.GetModule` or `Assembly.GetModules` method, or through the `Module` property.)

- The `Assembly` object contains a number of methods to retrieve the classes defined in an assembly, including `Assembly.GetType`, `Assembly.GetTypes`, and `Assembly.GetExportedTypes`.

- The `Type.FindInterfaces` method returns a filtered list of interface types supported by a type.

- The `Type.GetElementType` method returns a `Type` object that represents the element.

- The `Type.GetInterfaces` and `Type.GetInterface` methods return `Type` objects representing the interface types supported by a type.

- The `Type.GetTypeArray` method returns an array of `Type` objects representing the types specified by an arbitrary set of objects. The objects are specified with an array of type `Object`.

- The `Type.GetTypeFromProgID` and `Type.GetTypeFromCLSID` methods are provided for COM interoperability. They return a `Type` object that represents the type specified by a `ProgID` or `CLSID`.

- The `Type.GetTypeFromHandle` method is provided for interoperability. It returns a `Type` object that represents the type specified by a class handle.

- The C# `typeof` operator, the C++ `typeid` operator, and the Visual Basic `GetType` operator obtain the `Type` object for a type.

- The `Type.MakeGenericType` method returns a `Type` object representing a constructed generic type, which is an open constructed type if its `ContainsGenericParameters` property returns `true`, and a closed constructed type otherwise. A generic type can be instantiated only if it is closed.

- The `Type.MakeArrayType`, `Type.MakePointerType`, and `Type.MakeByRefType` methods return `Type` objects that represent, respectively, an array of a specified type, a pointer to a specified type, and the type of a reference parameter (`ref` in C#, 'byref' in F#, `ByRef` in Visual Basic).

#### Compare type objects for equality

A `Type` object that represents a type is unique; that is, two `Type` object references refer to the same object if and only if they represent the same type. This allows for comparison of `Type` objects using reference equality. The following example compares the `Type` objects that represent a number of integer values to determine whether they are of the same type.

_Code sample not included: ~/snippets/csharp/System/Type/Overview/Equals1.cs._

The following example shows a few representative features of `Type`. The C# `typeof` operator (`GetType` operator in Visual Basic) is used to get a `Type` object representing `String`. From this `Type` object, the `Type.GetMethod` method is used to get a `MethodInfo` representing the `String.Substring` overload that takes a starting location and a length.

To identify the overload signature, the code example creates a temporary array containing two `Type` objects representing `int` (`Integer` in Visual Basic).

The code example uses the `MethodInfo` to invoke the `String.Substring` method on the string "Hello, World!", and displays the result.

_Code sample not included: ~/snippets/csharp/System/Type/Overview/source.cs._

## Type.Type() constructor

```csharp
protected Type ();
```

Initializes a new instance of the `Type` class.

#### Remarks
This constructor is invoked by derived classes during the construction of type objects.

## Type.Assembly property

```csharp
public abstract System.Reflection.Assembly Assembly { get; }
```

Gets the `Assembly` in which the type is declared. For generic types, gets the `Assembly` in which the generic type is defined.

Returns: An `Assembly` instance that describes the assembly containing the current type. For generic types, the instance describes the assembly that contains the generic type definition, not the assembly that creates and uses a particular constructed type.

#### Remarks
If the current `Type` object represents a constructed generic type, this property returns the assembly that contains the generic type definition. For example, suppose you create an assembly named MyGenerics.dll that contains the generic type definition `MyGenericStack<T>` (`MyGenericStack(Of T)` in Visual Basic). If you create an instance of `MyGenericStack<int>` (`MyGenericStack(Of Integer)` in Visual Basic) in another assembly, the `Assembly` property for the constructed type returns an `Assembly` object that represents MyGenerics.dll.

Similarly, if the current `Type` object represents an unassigned generic parameter `T`, this property returns the assembly that contains the generic type that defines `T`.

If the `Assembly` property is not available, use the `Assembly` property instead.

This property is read-only.

## Type.AssemblyQualifiedName property

```csharp
public abstract string? AssemblyQualifiedName { get; }
```

Gets the assembly-qualified name of the type, which includes the name of the assembly from which this `Type` object was loaded.

Returns: The assembly-qualified name of the `Type`, which includes the name of the assembly from which the `Type` was loaded, or `null` if the type can't be represented by an assembly-qualified name. Types that can't be represented by an assembly-qualified name include types that contain unresolved generic parameters (`Type.ContainsGenericParameters` is `true`) and types that contain function pointers.

#### Remarks

The assembly-qualified name of a type consists of the type name, including its namespace, followed by a comma, followed by the display name of the assembly. The display name of an assembly is obtained using the `FullName` property.

> **Note:**
> Processor architecture is part of assembly identity, and can be specified as part of assembly name strings. For example, "ProcessorArchitecture=msil". However, it's not included in the string returned by the `AssemblyQualifiedName` property, for compatibility reasons. See `AssemblyName.ProcessorArchitecture`.

All compilers that support the common language runtime emit the simple name of a nested class, and reflection constructs a mangled name when queried, in accordance with the following conventions.

| Delimiter      | Meaning                        |
|----------------|--------------------------------|
| Backslash (\\) | Escape character.              |
| Comma (,)      | Precedes the Assembly name.    |
| Plus sign (+)  | Precedes a nested class.       |
| Period (.)     | Denotes namespace identifiers. |
| Brackets ([])  | After a type name, denotes an array of that type.-or-For a generic type, encloses the generic type argument list.-or-Within a type argument list, encloses an assembly-qualified type. |

For example, the assembly-qualified name for a class might look like this:

```txt
TopNamespace.SubNameSpace.ContainingClass+NestedClass, MyAssembly, Version=1.3.0.0, Culture=neutral, PublicKeyToken=<example-value>
```

If the namespace contained a plus sign, for example TopNamespace.Sub+Namespace, then the plus sign (+) would be preceded by an escape character (\\) to prevent it from being interpreted as a nesting separator. Reflection would emit this string as follows:

```txt
TopNamespace.Sub\+Namespace.ContainingClass+NestedClass, MyAssembly, Version=1.3.0.0, Culture=neutral, PublicKeyToken=<example-value>
```

A "++" becomes "\\+\\+", and a "\\" becomes "\\\\".

This qualified name can be persisted and later used to load the `Type`. To search for and load a `Type`, use `Type.GetType` either with the type name only or with the assembly qualified type name. `Type.GetType` with the type name only will look for the `Type` in the caller's assembly and then in the System assembly. `Type.GetType` with the assembly qualified type name will look for the `Type` in any assembly.

Type names may include trailing characters that denote additional information about the type, such as whether the type is a reference type, a pointer type or an array type. To retrieve the type name without these trailing characters, use `t.GetElementType().ToString()`, where `t` is the type.

Spaces are relevant in all type name components except the assembly name. In the assembly name, spaces before the ',' separator are relevant, but spaces after the ',' separator are ignored.

Generic arguments of generic types are themselves qualified by assembly name. For example, in the assembly-qualified type name for `MyGenericClass<int>` (`MyGenericClass(Of Integer)` in Visual Basic), `int` is expanded to the assembly-qualified type name for `Int32`.

If the current `Type` object represents a generic parameter, this property returns `null`.

#### Examples

The following example displays the assembly name associated with the class and the fully qualified name of the type.

_Code sample not included: ~/snippets/csharp/System/Type/Assembly/type_assembly.cs._

The following example compares the strings returned by the `Type.ToString` method and the `Type.Name`, `Type.FullName`, and `AssemblyQualifiedName` properties.

_Code sample not included: ~/snippets/csharp/System/Type/AssemblyQualifiedName/fullname1.cs._

## Type.Attributes property

```csharp
public System.Reflection.TypeAttributes Attributes { get; }
```

Gets the attributes associated with the `Type`.

Returns: A `TypeAttributes` object representing the attribute set of the `Type`, unless the `Type` represents a generic type parameter, in which case the value is unspecified.

#### Remarks
Some members of the `TypeAttributes` enumeration are masks that represent a group of values. Each group includes one member whose underlying value is zero. For example, the underlying value of the `NotPublic` member in the `VisibilityMask` group is zero, as is the `AutoLayout` member in the `SequentialLayout` group. Because of this, you must use the mask before testing for those values. The example provides an illustration.

> **Tip:**
> For most purposes, properties like `Type.IsClass`,`Type.IsAutoLayout`, and `Type.IsSpecialName` are easier to use than type attributes.

If the current `Type` represents a constructed generic type, this property returns the attributes of the generic type definition. For example, the attributes returned for `MyGenericClass<int>` (`MyGenericClass(Of Integer)` in Visual Basic) are the attributes of `MyGenericClass<T>` (`MyGenericClass(Of T)` in Visual Basic).

If the current `Type` represents a generic type parameter - that is, if the `IsGenericParameter` property returns `true` - the `TypeAttributes` value returned by this property is unspecified.

#### Examples
The following example uses the `Attributes` property.

_Code sample not included: ~/snippets/csharp/System/Type/Attributes/attributes1.cs._
