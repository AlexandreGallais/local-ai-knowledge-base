---
title: "FieldInfo class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/FieldInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FieldInfo class

Namespace: `System.Reflection`

```csharp
public abstract class FieldInfo : System.Reflection.MemberInfo
```

Discovers the attributes of a field and provides access to field metadata.

#### Remarks
The field information is obtained from metadata. The `FieldInfo` class does not have a public constructor. `FieldInfo` objects are obtained by calling either the `Type.GetFields` or `Type.GetField` method of a `Type` object.

Fields are variables defined in the class. `FieldInfo` provides access to the metadata for a field within a class and provides dynamic set and get functionality for the field. The class is not loaded into memory until invoke or get is called on the object.

#### Examples
The following example uses the `Type.GetFields` method to get the field-related information from the `FieldInfo` class, and then displays field attributes.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/Overview/fieldinfo.cs._

## FieldInfo.FieldInfo() constructor

```csharp
protected FieldInfo ();
```

Initializes a new instance of the `FieldInfo` class.

To be added.

## FieldInfo.Attributes property

```csharp
public abstract System.Reflection.FieldAttributes Attributes { get; }
```

Gets the attributes associated with this field.

Returns: The `FieldAttributes` for this field.

#### Remarks
All members have a set of attributes, which are defined in relation to the specific type of member. `FieldAttributes` informs the user whether this field is the private field, a static field, and so on.

To get the `Attributes` property, first get the class `Type`. From the `Type`, get the `FieldInfo`. From the `FieldInfo`, get the `Attributes`.

#### Examples
The following code example builds three fields and displays their field attributes. A `FieldAttributes` value can contain more than one attribute, such as both `Public` and `Literal`, as shown in the third field.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldAttributes/Overview/source.cs._

## FieldInfo.FieldHandle property

```csharp
public abstract RuntimeFieldHandle FieldHandle { get; }
```

Gets a `RuntimeFieldHandle`, which is a handle to the internal metadata representation of a field.

Returns: A handle to the internal metadata representation of a field.

#### Remarks
The handles are valid only in the appdomain in which they were obtained.

#### Examples
The following example retrieves MyClass.MyField field information and displays the field associated with the field handle.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/FieldHandle/fieldinfo_fieldhandle.cs._

## FieldInfo.FieldType property

```csharp
public abstract Type FieldType { get; }
```

Gets the type of this field object.

Returns: The type of this field object.

#### Remarks
The type is some primitive data type, such as `String`, `Boolean`, or `GUID`.

To get the `FieldType` property, first get the class `Type`. From the `Type`, get the `FieldInfo`. From the `FieldInfo`, get the `FieldType` value.

#### Examples
The following example creates a field, gets its type and `FieldInfo`, and displays its `FieldInfo.FieldType`.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/FieldType/source.cs._

## FieldInfo.IsAssembly property

```csharp
public bool IsAssembly { get; }
```

Gets a value indicating whether the potential visibility of this field is described by `FieldAttributes.Assembly`; that is, the field is visible at most to other types in the same assembly, and is not visible to derived types outside the assembly.

Returns: `true` if the visibility of this field is exactly described by `FieldAttributes.Assembly`; otherwise, `false`.

#### Remarks
The actual visibility of a field is limited by the visibility of its type. The `IsAssembly` property might be `true` for a field, but if it is a field of a private nested type then the field is not visible outside the containing type.

The visibility of a field is exactly described by `Assembly` if the only visibility modifier is `internal` (`Friend` in Visual Basic). This property is `false` for fields that are `protected internal` in C# (`Protected Friend` in Visual Basic); use the `IsFamilyOrAssembly` property to identify such fields.

#### Examples
The following code example defines fields with varying levels of visibility, and displays the values of their `FieldInfo.IsAssembly`, `FieldInfo.IsFamily`, `FieldInfo.IsFamilyOrAssembly`, and `FieldInfo.IsFamilyAndAssembly` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsAssembly/source.cs._

## FieldInfo.IsFamily property

```csharp
public bool IsFamily { get; }
```

Gets a value indicating whether the visibility of this field is described by `FieldAttributes.Family`; that is, the field is visible only within its class and derived classes.

Returns: `true` if access to this field is exactly described by `FieldAttributes.Family`; otherwise, `false`.

#### Remarks
The visibility of a field is exactly described by `Family` if the only visibility modifier is `protected`. This property is `false` for fields that are `protected internal` in C# (`Protected Friend` in Visual Basic); use the `IsFamilyOrAssembly` property to identify such fields.

#### Examples
The following code example defines fields with varying levels of visibility, and displays the values of their `FieldInfo.IsAssembly`, `FieldInfo.IsFamily`, `FieldInfo.IsFamilyOrAssembly`, and `FieldInfo.IsFamilyAndAssembly` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsAssembly/source.cs._

## FieldInfo.IsFamilyAndAssembly property

```csharp
public bool IsFamilyAndAssembly { get; }
```

Gets a value indicating whether the visibility of this field is described by `FieldAttributes.FamANDAssem`; that is, the field can be accessed from derived classes, but only if they are in the same assembly.

Returns: `true` if access to this field is exactly described by `FieldAttributes.FamANDAssem`; otherwise, `false`.

#### Remarks
If a field has `FamANDAssem` level visibility, it can be called from any member in a derived class that is also in the same assembly, but not from any other type.

The visibility of a field is exactly described by `FamANDAssem` if the visibility modifier is `private protected` in C# or `Private Protected` in Visual Basic.

#### Examples
The following code example defines fields with varying levels of visibility, and displays the values of their `FieldInfo.IsAssembly`, `FieldInfo.IsFamily`, `FieldInfo.IsFamilyOrAssembly`, and `FieldInfo.IsFamilyAndAssembly` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsAssembly/source.cs._

## FieldInfo.IsFamilyOrAssembly property

```csharp
public bool IsFamilyOrAssembly { get; }
```

Gets a value indicating whether the potential visibility of this field is described by `FieldAttributes.FamORAssem`; that is, the field can be accessed by derived classes wherever they are, and by classes in the same assembly.

Returns: `true` if access to this field is exactly described by `FieldAttributes.FamORAssem`; otherwise, `false`.

#### Remarks
If a field has `FamORAssem` level visibility, it can be called from any member in a derived class or any member in the same assembly, but not from any other type.

The actual visibility of a field is limited by the visibility of its type. The `IsFamilyOrAssembly` property might be `true` for a field, but if it is a field of a private nested type then the field is not visible outside the containing type.

The visibility of a field is exactly described by `FamORAssem` if the visibility modifier is `protected internal` in C# (`Protected Friend` in Visual Basic).

#### Examples
The following code example defines fields with varying levels of visibility, and displays the values of their `FieldInfo.IsAssembly`, `FieldInfo.IsFamily`, `FieldInfo.IsFamilyOrAssembly`, and `FieldInfo.IsFamilyAndAssembly` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsAssembly/source.cs._

## FieldInfo.IsInitOnly property

```csharp
public bool IsInitOnly { get; }
```

Gets a value indicating whether the field can only be set in the body of the constructor.

Returns: `true` if the field has the `InitOnly` attribute set; otherwise, `false`.

#### Remarks
If the returned value is `true`, the field can only be initialized, and is read-only thereafter.

To get the `IsInitOnly` property, first get the class `Type`. From the `Type`, get the `FieldInfo`. From the `FieldInfo`, get the `IsInitOnly` property. To access a non-public field, combine `NonPublic` with either or both of `Static` and `Instance` in the `GetField` method.

The `IsInitOnly` property is set when the `InitOnly` attribute is set.

#### Examples
In the following example, two fields are created. The second field is read-only, having no set accessor, and `IsInitOnly` is set to `true`.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsInitOnly/source.cs._

This code produces the following output:

```console
Reflection.FieldInfo

Myfielda - A- modified, IsInitOnly = False

Myfieldb - B readonly field, IsInitOnly = True
```

## FieldInfo.IsLiteral property

```csharp
public bool IsLiteral { get; }
```

Gets a value indicating whether the value is written at compile time and cannot be changed.

Returns: `true` if the field has the `Literal` attribute set; otherwise, `false`.

#### Remarks
The `IsLiteral` property is set when the `FieldAttributes.Literal` attribute is set. If this attribute is set, the field cannot be changed and is constant.

## FieldInfo.IsNotSerialized property

```csharp
public bool IsNotSerialized { get; }
```

Gets a value indicating whether this field has the `NotSerialized` attribute.

Returns: `true` if the field has the `NotSerialized` attribute set; otherwise, `false`.

To be added.

## FieldInfo.IsPinvokeImpl property

```csharp
public bool IsPinvokeImpl { get; }
```

Gets a value indicating whether the corresponding `PinvokeImpl` attribute is set in `FieldAttributes`.

Returns: `true` if the `PinvokeImpl` attribute is set in `FieldAttributes`; otherwise, `false`.

#### Examples
The following example creates a class and displays the name, field and `IsPinvokeImpl` property value of the field.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsPinvokeImpl/fieldinfo_ispinvokeimpl.cs._

## FieldInfo.IsPrivate property

```csharp
public bool IsPrivate { get; }
```

Gets a value indicating whether the field is private.

Returns: `true` if the field is private; otherwise; `false`.

#### Remarks
Private fields are accessible only from member functions.

The `IsPrivate` property is set when the `FieldAttributes.Private` attribute is set.

To get the `IsPrivate` property, first get the class `Type`. From the `Type`, get the `FieldInfo`. From the `FieldInfo`, get the `IsPrivate` property. To access a non-public field, set the `BindingFlags` to `NonPublic`, and either `Static` or `Instance` in the `GetField` method.

#### Examples
The following example returns a value indicating whether or not the field of the class is private.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsPrivate/fieldinfo_isprivate.cs._

## FieldInfo.IsPublic property

```csharp
public bool IsPublic { get; }
```

Gets a value indicating whether the field is public.

Returns: `true` if this field is public; otherwise, `false`.

#### Remarks
Public fields are accessible everywhere their corresponding classes are visible.

The `IsPublic` property is set when the `FieldAttributes.Public` attribute is set.

To get the `IsPublic` property, first get the class `Type`. From the `Type`, get the `FieldInfo`. From the `FieldInfo`, get the `IsPublic` property. If the field is other than public, it is protected and cannot be readily accessed. To access a nonpublic field, set the `BindingFlags` to `NonPublic`, specify either `BindingFlags.Instance` or `BindingFlags.Static`, and use this for the `GetField` method.

#### Examples
The following example returns a value indicating whether or not the field of the class is public or private.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsPublic/source.cs._

## FieldInfo.IsSecurityCritical property

```csharp
public virtual bool IsSecurityCritical { get; }
```

Gets a value that indicates whether the current field is security-critical or security-safe-critical at the current trust level.

Returns: `true` if the current field is security-critical or security-safe-critical at the current trust level; `false` if it is transparent.

#### Remarks
The `FieldInfo.IsSecurityCritical`, `FieldInfo.IsSecuritySafeCritical`, and `FieldInfo.IsSecurityTransparent` properties report the transparency level of the field at its current trust level, as determined by the common language runtime (CLR). The combinations of these properties are shown in the following table:

|Security level|IsSecurityCritical|IsSecuritySafeCritical|IsSecurityTransparent|
|--------------------|------------------------|----------------------------|---------------------------|
|Critical|`true`|`false`|`false`|
|Safe critical|`true`|`true`|`false`|
|Transparent|`false`|`false`|`true`|

Using these properties is much simpler than examining the security annotations of an assembly and its types and members, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection.
