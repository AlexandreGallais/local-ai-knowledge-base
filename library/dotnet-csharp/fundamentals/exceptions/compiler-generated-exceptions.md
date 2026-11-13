---
title: "Compiler-generated exceptions"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/exceptions/compiler-generated-exceptions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compiler-generated exceptions

Some exceptions are thrown automatically by the .NET runtime when basic operations fail. These exceptions and their error conditions are listed in the following table.

|Exception|Description|
|---------------|-----------------|
|`System.ArithmeticException`|A base class for exceptions that occur during arithmetic operations, such as `System.DivideByZeroException` and `System.OverflowException`.|
|`System.ArrayTypeMismatchException`|Thrown when an array can't store a given element because the actual type of the element is incompatible with the actual type of the array.|
|`System.DivideByZeroException`|Thrown when an attempt is made to divide an integral value by zero.|
|`System.IndexOutOfRangeException`|Thrown when an attempt is made to index an array when the index is less than zero or outside the bounds of the array.|
|`System.InvalidCastException`|Thrown when an explicit conversion from a base type to an interface or to a derived type fails at run time.|
|`System.NullReferenceException`|Thrown when an attempt is made to reference an object whose value is null.|
|`System.OutOfMemoryException`|Thrown when an attempt to allocate memory using the new operator fails. This exception indicates that the memory available to the common language runtime has been exhausted.|
|`System.OverflowException`|Thrown when an arithmetic operation in a `checked` context overflows.|
|`System.StackOverflowException`|Thrown when the execution stack is exhausted by having too many pending method calls; usually indicates a very deep or infinite recursion.|
|`System.TypeInitializationException`|Thrown when a static constructor throws an exception and no compatible `catch` clause exists to catch it.|

## See also

- Exception-handling statements
