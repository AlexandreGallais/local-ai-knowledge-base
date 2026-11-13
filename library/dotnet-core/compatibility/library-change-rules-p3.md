---
title: ".NET API changes that affect compatibility (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/library-change-rules.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET API changes that affect compatibility (part 3 of 3)

## Behavioral changes

### Assemblies

- ✔️ **ALLOWED: Making an assembly portable when the same platforms are still supported**

- ❌ **DISALLOWED: Changing the name of an assembly**
- ❌ **DISALLOWED: Changing the public key of an assembly**

### Properties, fields, parameters, and return values

- ✔️ **ALLOWED: Changing the value of a property, field, return value, or out parameter to a more derived type**

  For example, a method that returns a type of `System.Object` can return a `System.String` instance. (However, the method signature cannot change.)

- ✔️ **ALLOWED: Increasing the range of accepted values for a property or parameter if the member is not virtual**

  While the range of values that can be passed to the method or are returned by the member can expand, the parameter or member type cannot. For example, while the values passed to a method can expand from 0-124 to 0-255, the parameter type cannot change from `System.Byte` to `System.Int32`.

- ❌ **DISALLOWED: Increasing the range of accepted values for a property or parameter if the member is virtual**

   This change breaks existing overridden members, which will not function correctly for the extended range of values.

- ❌ **DISALLOWED: Decreasing the range of accepted values for a property or parameter**

- ❌ **DISALLOWED: Increasing the range of returned values for a property, field, return value, or out parameter**

- ❌ **DISALLOWED: Changing the returned values for a property, field, method return value, or out parameter**

- ❌ **DISALLOWED: Changing the default value of a property, field, or parameter**

  Changing or removing a *parameter* default value is not a binary break. Removing a parameter default value is a source break, and changing a parameter default value could result in a behavioral break after recompilation.

  For this reason, removing parameter default values is acceptable in the specific case of "moving" those default values to a new method overload to eliminate ambiguity. For example, consider an existing method `MyMethod(int a = 1)`. If you introduce an overload of `MyMethod` with two optional parameters `a` and `b`, you can preserve compatibility by moving the default value of `a` to the new overload. Now the two overloads are `MyMethod(int a)` and `MyMethod(int a = 1, int b = 2)`. This pattern allows `MyMethod()` to compile.

- ❌ **DISALLOWED: Changing the precision of a numeric return value**

- ❓ **REQUIRES JUDGMENT: A change in the parsing of input and throwing new exceptions (even if parsing behavior is not specified in the documentation**

- ❌ **DISALLOWED: Adding or removing case types from a `union` declaration**

  Adding or removing a case type from a `union` type is both a binary break and a source break.

  Pattern matching tests are no longer exhaustive after adding a case type. The compiler flags pattern matching expressions as non-exhaustive. At runtime, unexpected values cause runtime exceptions. Removing a case type removes the constructor declaration for that case type.

### Exceptions

- ✔️ **ALLOWED: Throwing a more derived exception than an existing exception**

  Because the new exception is a subclass of an existing exception, previous exception handling code continues to handle the exception. For example, in .NET Framework 4, culture creation and retrieval methods began to throw a `System.Globalization.CultureNotFoundException` instead of an `System.ArgumentException` if the culture could not be found. Because `System.Globalization.CultureNotFoundException` derives from `System.ArgumentException`, this is an acceptable change.

- ✔️ **ALLOWED: Throwing a more specific exception than `System.NotSupportedException`, `System.NotImplementedException`, `System.NullReferenceException`**

- ✔️ **ALLOWED: Throwing an exception that is considered unrecoverable**

  Unrecoverable exceptions should not be caught but instead should be handled by a high-level catch-all handler. Therefore, users are not expected to have code that catches these explicit exceptions. The unrecoverable exceptions are:

  - `System.AccessViolationException`
  - `System.ExecutionEngineException`
  - `System.Runtime.InteropServices.SEHException`
  - `System.StackOverflowException`

- ✔️ **ALLOWED: Throwing a new exception in a new code path**

  The exception must apply only to a new code-path that's executed with new parameter values or state and that can't be executed by existing code that targets the previous version.

- ✔️ **ALLOWED: Removing an exception to enable more robust behavior or new scenarios**

  For example, a `Divide` method that previously only handled positive values and threw an `System.ArgumentOutOfRangeException` otherwise can be changed to support both negative and positive values without throwing an exception.

- ✔️ **ALLOWED: Changing the text of an error message**

  Developers should not rely on the text of error messages, which also change based on the user's culture.

- ❌ **DISALLOWED: Throwing an exception in any other case not listed above**

- ❌ **DISALLOWED: Removing an exception in any other case not listed above**

### Attributes

- ✔️ **ALLOWED: Changing the value of an attribute that is *not* observable**

- ❌ **DISALLOWED: Changing the value of an attribute that *is* observable**

- ❓ **REQUIRES JUDGMENT: Removing an attribute**

  In most cases, removing an attribute (such as `System.NonSerializedAttribute`) is a breaking change.

## Platform support

- ✔️ **ALLOWED: Supporting an operation on a platform that was previously not supported**

- ❌ **DISALLOWED: Not supporting or now requiring a specific service pack for an operation that was previously supported on a platform**

## Internal implementation changes

- ❓ **REQUIRES JUDGMENT: Changing the surface area of an internal type**

   Such changes are generally allowed, although they break private reflection. In some cases, where popular third-party libraries or a large number of developers depend on the internal APIs, such changes may not be allowed.

- ❓ **REQUIRES JUDGMENT: Changing the internal implementation of a member**

  These changes are generally allowed, although they break private reflection. In some cases, where customer code frequently depends on private reflection or where the change introduces unintended side effects, these changes may not be allowed.

- ✔️ **ALLOWED: Improving the performance of an operation**

   The ability to modify the performance of an operation is essential, but such changes can break code that relies upon the current speed of an operation. This is particularly true of code that depends on the timing of asynchronous operations. The performance change should have no effect on other behavior of the API in question; otherwise, the change will be breaking.

- ✔️ **ALLOWED: Indirectly (and often adversely) changing the performance of an operation**

  If the change in question is not categorized as breaking for some other reason, this is acceptable. Often, actions need to be taken that may include extra operations or that add new functionality. This will almost always affect performance but may be essential to make the API in question function as expected.

- ❌ **DISALLOWED: Changing a synchronous API to asynchronous (and vice versa)**

## Code changes

- ✔️ **ALLOWED: Adding params to a parameter**

- ❌ **DISALLOWED: Changing a struct to a class and vice versa**

- ❌ **DISALLOWED: Adding the checked statement to a code block**

   This change might cause code that previously executed to throw an `System.OverflowException` and is unacceptable.

- ❌ **DISALLOWED: Removing params from a parameter**

- ❌ **DISALLOWED: Changing the collection type of a `params` parameter**

  Beginning with C# 13, `params` parameters support non-array collection types, including `System.Span`1`, `System.ReadOnlySpan`1`, struct or class types that implement `System.Collections.Generic.IEnumerable`1` with an accessible parameterless constructor and an instance `Add` method, and specific interface types such as `System.Collections.Generic.IList`1`. Changing the collection type of an existing `params` parameter (for example, from `params T[]` to `params ReadOnlySpan<T>`) changes the method's IL signature and is a binary breaking change. Callers compiled against the previous version must recompile.

- ✔️ **ALLOWED: Converting an extension method to the extension block member syntax**

  Beginning with C# 14, you can declare extension members using `extension` blocks in addition to the older `this`-parameter syntax. Both forms generate identical IL, so callers can't distinguish between them. Converting existing extension methods to the new extension block syntax is binary and source compatible.

- ❌ **DISALLOWED: Changing the order in which events are fired**

  Developers can reasonably expect events to fire in the same order, and developer code frequently depends on the order in which events are fired.

- ❌ **DISALLOWED: Removing the raising of an event on a given action**

- ❌ **DISALLOWED: Changing the number of times given events are called**

- ❌ **DISALLOWED: Adding the `System.FlagsAttribute` to an enumeration type**

## See also

- Breaking changes in .NET
- Library design guidelines - breaking changes
- .NET breaking change rules
