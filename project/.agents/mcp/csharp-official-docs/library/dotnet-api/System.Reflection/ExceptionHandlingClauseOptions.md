---
title: "ExceptionHandlingClauseOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ExceptionHandlingClauseOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExceptionHandlingClauseOptions enum

Namespace: `System.Reflection`

```csharp
public enum ExceptionHandlingClauseOptions
```

Identifies kinds of exception-handling clauses.

#### Remarks
To examine the exception-handling clauses in a method, obtain a `MethodInfo` object and call the `MethodBase.GetMethodBody` method to obtain the method body. Use the `ExceptionHandlingClauses` property to obtain a list of `ExceptionHandlingClause` objects.

> **Note:**
>  Working with exception-handling clauses requires a thorough understanding of metadata and Microsoft intermediate language (MSIL) instruction formats. Information can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example defines a test method named `MethodBodyExample`, and displays its local variable information and exception-handling clauses. The `MethodBase.GetMethodBody` method is used to obtain a `MethodBody` object for the test method. The `ExceptionHandlingClauses` property is used to obtain a list of `ExceptionHandlingClause` objects and display their properties.

This code is part of a larger example provided for the `MethodBody` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Reflection/ExceptionHandlingClause/Overview/source.cs._

## ExceptionHandlingClauseOptions.Clause field

```csharp
Clause
```

The clause accepts all exceptions that derive from a specified type.

## ExceptionHandlingClauseOptions.Fault field

```csharp
Fault
```

The clause is executed if an exception occurs, but not on completion of normal control flow.

## ExceptionHandlingClauseOptions.Filter field

```csharp
Filter
```

The clause contains user-specified instructions that determine whether the exception should be ignored (that is, whether normal execution should resume), be handled by the associated handler, or be passed on to the next clause.

## ExceptionHandlingClauseOptions.Finally field

```csharp
Finally
```

The clause is executed whenever the try block exits, whether through normal control flow or because of an unhandled exception.
