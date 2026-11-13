---
title: "User-defined functions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/sqlite/user-defined-functions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# User-defined functions

Most databases have a procedural dialect of SQL that you can use to define your own functions. SQLite however, runs in-process with your app. Instead of having to learn a new dialect of SQL, you can just use the programming language of your app.

## Scalar functions

Scalar functions return a single, scalar value for each row in a query. Define new scalar functions and override the built-in ones using `Microsoft.Data.Sqlite.SqliteConnection.CreateFunction*`.

See Data types for a list of supported parameter and return types for the `func` argument.

Specifying the `state` argument will pass that value into every invocation of the function. Use this to avoid closures.

Specify `isDeterministic` if your function is deterministic to allow SQLite to use additional optimizations when compiling queries.

The following example shows how to add a scalar function to calculate the radius of a cylinder.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/ScalarFunctionSample/Program.cs._

## Operators

The following SQLite operators are implemented by corresponding scalar functions. Defining these scalar functions in your app will override the behavior of these operators.

| Operator          | Function      |
| ----------------- | ------------- |
| X GLOB Y          | glob(Y, X)    |
| X LIKE Y          | like(Y, X)    |
| X LIKE Y ESCAPE Z | like(Y, X, Z) |
| X MATCH Y         | match(Y, X)   |
| X REGEXP Y        | regexp(Y, X)  |

The following example shows how to define the regexp function to enable its corresponding operator. SQLite doesn't include a default implementation of the regexp function.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/RegularExpressionSample/Program.cs._

## Aggregate functions

Aggregate functions return a single, aggregated value for all the rows in a query. Define and override aggregate functions using `Microsoft.Data.Sqlite.SqliteConnection.CreateAggregate*`.

The `seed` argument specifies the initial state of the context. Use this to avoid closures also.

The `func` argument is invoked once per row. Use the context to accumulate a final result. Return the context. This pattern allows the context to be a value type or immutable.

If no `resultSelector` is specified, the final state of the context is used as the result. This can simplify the definition of functions like sum and count that only need to increment a number each row and return it.

Specify `resultSelector` to calculate the final result from the context after iterating through all the rows.

See Data types for a list of supported parameter types for the `func` argument and return types for `resultSelector`.

If your function is deterministic, specify `isDeterministic` to allow SQLite to use additional optimizations when compiling queries.

The following example defines an aggregate function to calculate the standard deviation of a column.

_Code sample not included: ../../../../samples/snippets/standard/data/sqlite/AggregateFunctionSample/Program.cs._

## Errors

If a user-defined function throws an exception, the message is returned to SQLite. SQLite will then raise an error and Microsoft.Data.Sqlite will throw a SqliteException. For more information, see Database errors.

By default, the error SQLite error code will be SQLITE_ERROR (or 1). You can, however, change it by throwing a `Microsoft.Data.Sqlite.SqliteException` in your function with the desired `Microsoft.Data.Sqlite.SqliteException.SqliteErrorCode` specified.

## Debugging

SQLite calls your implementation directly. This lets you add breakpoints that trigger while SQLite is evaluating queries. The full .NET debugging experience is available to help you create your user-defined functions.

## See also

* Data types
* SQLite Core functions
* SQLite Aggregate Functions
