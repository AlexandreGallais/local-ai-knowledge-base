---
title: "LocalVariableInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/LocalVariableInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LocalVariableInfo class

Namespace: `System.Reflection`

```csharp
public class LocalVariableInfo
```

Discovers the attributes of a local variable and provides access to local variable metadata.

#### Remarks
To get a list of local variables in a method, use the `LocalVariables` property. Use the `MethodBase.GetMethodBody` method to obtain the `MethodBody` for a `MethodInfo` object.

> **Note:**
>  Local variable names are not persisted in metadata. In Microsoft intermediate language (MSIL), local variables are accessed by their position in the local variable signature.

#### Examples
The following example defines a test method named `MethodBodyExample`, and displays its local variable information. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `LocalVariables` property is then used to obtain a list of `LocalVariableInfo` objects and to display their types and index order.

This code example is part of a larger example provided for the `MethodBody` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## LocalVariableInfo.LocalVariableInfo() constructor

```csharp
protected LocalVariableInfo ();
```

Initializes a new instance of the `LocalVariableInfo` class.

#### Remarks
This constructor is invoked by derived classes during the construction of `LocalVariableInfo` objects.

## LocalVariableInfo.IsPinned property

```csharp
public virtual bool IsPinned { get; }
```

Gets a `Boolean` value that indicates whether the object referred to by the local variable is pinned in memory.

Returns: `true` if the object referred to by the variable is pinned in memory; otherwise, `false`.

#### Remarks
In unsafe code, an object must be pinned before it can be referred to by an unmanaged pointer. While the referenced object is pinned, it cannot be moved by garbage collection.

## LocalVariableInfo.LocalIndex property

```csharp
public virtual int LocalIndex { get; }
```

Gets the index of the local variable within the method body.

Returns: An integer value that represents the order of declaration of the local variable within the method body.

#### Remarks
Index numbers are assigned to local variables in the order in which they are declared.

## LocalVariableInfo.LocalType property

```csharp
public virtual Type LocalType { get; }
```

Gets the type of the local variable.

Returns: The type of the local variable.

To be added.

## LocalVariableInfo.ToString() method

```csharp
public override string ToString ();
```

Returns a user-readable string that describes the local variable.

Returns: A string that displays information about the local variable, including the type name, index, and pinned status.

To be added.
