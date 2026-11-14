---
title: "ExceptionHandlingClause class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ExceptionHandlingClause.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExceptionHandlingClause class

Namespace: `System.Reflection`

```csharp
public class ExceptionHandlingClause
```

Represents a clause in a structured exception-handling block.

#### Remarks
The `ExceptionHandlingClause` class provides information about the clauses in a `try`…`catch`…`finally` block (`Try`…`Catch`…`Finally` in Visual Basic). To get a list of exception-handling clauses in a method, obtain a `MethodInfo` that represents the method. Use the `MethodBase.GetMethodBody` method to obtain a `MethodBody` object, and then use the `ExceptionHandlingClauses` property to get the list of clauses.

> **Note:**
> Working with exception-handling clauses requires a thorough understanding of metadata and Microsoft intermediate language (MSIL) instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample`, and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects and display their properties.

You can use Ildasm.exe to examine the MSIL for the compiled code example, to see how the offsets and lengths are calculated.

This code is part of a larger example located in the `MethodBody` class topic.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## ExceptionHandlingClause.ExceptionHandlingClause() constructor

```csharp
protected ExceptionHandlingClause ();
```

Initializes a new instance of the `ExceptionHandlingClause` class.

#### Remarks
This constructor is invoked by derived classes during the construction of `ExceptionHandlingClause` objects.

## ExceptionHandlingClause.CatchType property

```csharp
public virtual Type? CatchType { get; }
```

Gets the type of exception handled by this clause.

Returns: A `Type` object that represents that type of exception handled by this clause, or `null` if the `ExceptionHandlingClause.Flags` property is `ExceptionHandlingClauseOptions.Filter` or `ExceptionHandlingClauseOptions.Finally`.

Exceptions:

- `InvalidOperationException`: Invalid use of property for the object's current state.

#### Remarks

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and Microsoft intermediate language (MSIL) instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample`, and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects and display their properties.

This code is part of a larger example located in the `MethodBody` class topic.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## ExceptionHandlingClause.FilterOffset property

```csharp
public virtual int FilterOffset { get; }
```

Gets the offset within the method body, in bytes, of the user-supplied filter code.

Returns: The offset within the method body, in bytes, of the user-supplied filter code. The value of this property has no meaning if the `ExceptionHandlingClause.Flags` property has any value other than `ExceptionHandlingClauseOptions.Filter`.

Exceptions:

- `InvalidOperationException`: Cannot get the offset because the exception handling clause is not a filter.

#### Remarks
A filter clause contains user-suppliedMicrosoft intermediate language (MSIL) that determines whether an exception is handled by this clause. For example, any clause containing the Visual Basic `When` keyword is a `Filter` clause.

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and MSIL instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

## ExceptionHandlingClause.Flags property

```csharp
public virtual System.Reflection.ExceptionHandlingClauseOptions Flags { get; }
```

Gets a value indicating whether this exception-handling clause is a finally clause, a type-filtered clause, or a user-filtered clause.

Returns: An `ExceptionHandlingClauseOptions` value that indicates what kind of action this clause performs.

#### Remarks

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and Microsoft intermediate language (MSIL) instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample`, and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects and display their properties.

This code is part of a larger example located in the `MethodBody` class topic.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## ExceptionHandlingClause.HandlerLength property

```csharp
public virtual int HandlerLength { get; }
```

Gets the length, in bytes, of the body of this exception-handling clause.

Returns: An integer that represents the length, in bytes, of the MSIL that forms the body of this exception-handling clause.

#### Remarks

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and Microsoft intermediate language (MSIL) instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample`, and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects and display their properties.

This code is part of a larger example located in the `MethodBody` class topic.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## ExceptionHandlingClause.HandlerOffset property

```csharp
public virtual int HandlerOffset { get; }
```

Gets the offset within the method body, in bytes, of this exception-handling clause.

Returns: An integer that represents the offset within the method body, in bytes, of this exception-handling clause.

#### Remarks

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and Microsoft intermediate language (MSIL) instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample`, and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects and display their properties.

This code is part of a larger example located in the `MethodBody` class topic.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## ExceptionHandlingClause.TryLength property

```csharp
public virtual int TryLength { get; }
```

The total length, in bytes, of the try block that includes this exception-handling clause.

Returns: The total length, in bytes, of the try block that includes this exception-handling clause.

#### Remarks
An integer that represents the total length, in bytes, of the try block that includes this exception-handling clause.

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and Microsoft intermediate language (MSIL) instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample`, and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects and display their properties.

This code is part of a larger example located in the `MethodBody` class topic.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## ExceptionHandlingClause.TryOffset property

```csharp
public virtual int TryOffset { get; }
```

The offset within the method, in bytes, of the try block that includes this exception-handling clause.

Returns: An integer that represents the offset within the method, in bytes, of the try block that includes this exception-handling clause.

#### Remarks

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and Microsoft intermediate language (MSIL) instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample`, and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects and display their properties.

This code is part of a larger example located in the `MethodBody` class topic.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## ExceptionHandlingClause.ToString() method

```csharp
public override string ToString ();
```

A string representation of the exception-handling clause.

Returns: A string that lists appropriate property values for the filter clause type.

To be added.
