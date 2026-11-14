---
title: "MethodBody class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodBody.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodBody class

Namespace: `System.Reflection`

```csharp
public class MethodBody
```

Provides access to the metadata and MSIL for the body of a method.

#### Remarks
The `MethodBody` class provides access to information about the local variables and exception-handling clauses in a method body, and to the Microsoft intermediate language (MSIL) that makes up the method body.

You can use the token-resolution methods of the module class, such as `Module.ResolveType`, `Module.ResolveMethod`, and `Module.ResolveType`, to resolve the tokens in the method body to `Type` objects, `MethodInfo` objects, and `FieldInfo` objects that provide detailed information about the types, methods, and fields accessed by the MSIL in the method body.

> **Note:**
>  Parsing method bodies requires a thorough understanding of metadata and MSIL instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

To obtain a `MethodBody` object for a given method, first obtain a `MethodInfo` object for the method, then call the `MethodInfo` object's `MethodBase.GetMethodBody` method.

#### Examples
The following code example defines a test method named `MethodBodyExample` and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method.

The example uses the `LocalVariables` property to obtain a list of `LocalVariableInfo` objects and then displays their types and index order. The `ExceptionHandlingClauses` property is used to obtain a list of exception-handling clauses.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## MethodBody.MethodBody() constructor

```csharp
protected MethodBody ();
```

Initializes a new instance of the `MethodBody` class.

#### Remarks
This constructor is invoked by derived classes during the construction of `MethodBody` objects.

## MethodBody.ExceptionHandlingClauses property

```csharp
public virtual System.Collections.Generic.IList<System.Reflection.ExceptionHandlingClause> ExceptionHandlingClauses { get; }
```

Gets a list that includes all the exception-handling clauses in the method body.

Returns: An `IList<T>` of `ExceptionHandlingClause` objects representing the exception-handling clauses in the body of the method.

#### Remarks
The list includes all clauses from all try blocks in the method body. Each `ExceptionHandlingClause` object contains information that identifies the try block with which it is associated.

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and MSIL instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample` and displays information about its exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects.

This code example is part of a larger example provided for the `MethodBody` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## MethodBody.InitLocals property

```csharp
public virtual bool InitLocals { get; }
```

Gets a value indicating whether local variables in the method body are initialized to the default values for their types.

Returns: `true` if the method body contains code to initialize local variables to `null` for reference types, or to the zero-initialized value for value types; otherwise, `false`.

#### Remarks
The `InitLocals` property refers to variables that are not explicitly initialized; that is, variables that are declared with syntax such as `int x;` in C# or `Dim x As Integer` in Visual Basic.

Reference variables are initialized to `null` by default. Numeric variables are initialized to zero.

#### Examples
The following code example defines a test method named `MethodBodyExample` and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `MethodBody.MaxStackSize` and `MethodBody.InitLocals` properties are displayed.

This code example is part of a larger example provided for the `MethodBody` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## MethodBody.LocalSignatureMetadataToken <example-value>

```csharp
public virtual int LocalSignatureMetadataToken { get; }
```

Gets a metadata token for the signature that describes the local variables for the method in metadata.

Returns: An integer that represents the metadata token.

#### Remarks
Use the `LocalVariables` property to obtain information about the method's local variables.

> **Note:**
>  Information about local variable signatures can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics". For more information, see ECMA 335 Common Language Infrastructure (CLI).

## MethodBody.LocalVariables property

```csharp
public virtual System.Collections.Generic.IList<System.Reflection.LocalVariableInfo> LocalVariables { get; }
```

Gets the list of local variables declared in the method body.

Returns: An `IList<T>` of `LocalVariableInfo` objects that describe the local variables declared in the method body.

#### Remarks
You do not need the metadata token for the local variable signature provided by the `LocalSignatureMetadataToken` property.

#### Examples
The following code example defines a test method named `MethodBodyExample` and displays its local variable information. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `LocalVariables` property is used to obtain a list of `LocalVariableInfo` objects.

This code example is part of a larger example provided for the `MethodBody` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## MethodBody.MaxStackSize property

```csharp
public virtual int MaxStackSize { get; }
```

Gets the maximum number of items on the operand stack when the method is executing.

Returns: The maximum number of items on the operand stack when the method is executing.

#### Remarks
For more information, see the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics" and "Partition III: CIL Instruction Set". For more information, see ECMA 335 Common Language Infrastructure (CLI).

#### Examples
The following code example defines a test method named `MethodBodyExample` and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `MethodBody.MaxStackSize` and `MethodBody.InitLocals` properties are displayed.

This code example is part of a larger example provided for the `MethodBody` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## MethodBody.GetILAsByteArray() method

```csharp
public virtual byte[]? GetILAsByteArray ();
```

Returns the MSIL for the method body, as an array of bytes.

Returns: An array of type `Byte` that contains the MSIL for the method body.

#### Remarks
You can use the token-resolution methods of the module class, such as `Module.ResolveType`, `Module.ResolveMethod`, and `Module.ResolveMember`, to resolve the tokens in the method body to `Type` objects, `MethodInfo` objects, and `FieldInfo` objects that provide detailed information about the types, methods, and fields accessed by the MSIL in the method body.

> **Note:**
>  Parsing method bodies requires a thorough understanding of metadata and MSIL instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".
