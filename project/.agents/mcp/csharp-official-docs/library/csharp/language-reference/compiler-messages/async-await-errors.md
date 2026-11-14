---
title: "Resolve errors and warnings that involve `async`, `await` and the Task-asynchronous protocol (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/async-await-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings in async methods that use the await operator

This article covers the following compiler errors:

- **CS1983**: *Since this is an async method, the return expression must be of type '`T`' rather than '`Task<T>`'.*
- **CS1985**: *Cannot await in a catch clause.*
- **CS1986**: *'`await`' requires that the type have a suitable '`GetAwaiter`' method.*
- **CS1989**: *Async lambda expressions cannot be converted to expression trees.*
- **CS1991**: *'Type' cannot implement 'event' because it is a Windows Runtime event and 'event' is a regular .NET event.*
- **CS1992**: *The '`await`' operator can only be used when contained within a method or lambda expression marked with the 'async' modifier.*
- **CS1994**: *The '`async`' modifier can only be used in methods that have a body.*
- **CS1995**: *The '`await`' operator may only be used in a query expression within the first collection expression of the initial '`from`' clause or within the collection expression of a '`join`' clause.*
- **CS1996**: *Cannot await in the body of a lock statement.*
- **CS1997**: *Since function is an async method that returns a value, a return keyword must not be followed by an object expression.*
- **CS1998**: *This async method lacks '`await`' operators and will run synchronously. Consider using the '`await`' operator to await non-blocking API calls, or '`await Task.Run(...)`' to do CPU-bound work on a background thread.*
- **CS4001**: *Cannot await expression.*
- **CS4003**: *'`await`' cannot be used as an identifier within an async method or lambda expression.*
- **CS4005**: *Async methods cannot have pointer type parameters.*
- **CS4006**: *\_\_arglist is not allowed in the parameter list of async methods.*
- **CS4007**: *Instance of type cannot be preserved across '`await`' or '`yield`' boundary.*
- **CS4008**: *Cannot await '`void`'.*
- **CS4009**: *A void or int returning entry point cannot be async.*
- **CS4010**: *Cannot convert async expression to delegate type. An async expression may return void, Task or Task\<T\>, none of which are convertible to type.*
- **CS4011**: *'`await`' requires that the return type of '{1}.GetAwaiter()' have suitable 'IsCompleted', 'OnCompleted', and 'GetResult' members, and implement 'INotifyCompletion' or 'ICriticalNotifyCompletion'.*
- **CS4012**: *Parameters of type cannot be declared in async methods or async lambda expressions.*
- **CS4014**: *Because this call is not awaited, execution of the current method continues before the call is completed. Consider applying the `await` operator to the result of the call.*
- **CS4015**: *'MethodImplOptions.Synchronized' cannot be applied to an async method.*
- **CS4016**: *Since this is an async method, the return expression must be of type task like type rather than declared type.*
- **CS4027**: *Expression type does not implement required member.*
- **CS4028**: *'`await`' requires that the type have a suitable 'GetAwaiter' method. Are you missing a using directive for 'System'?*
- **CS4029**: *Cannot return an expression of type 'void'.*
- **CS4030**: *Security attribute cannot be applied to an Async method.*
- **CS4031**: *Async methods are not allowed in an Interface, Class, or Structure which has the 'SecurityCritical' or 'SecuritySafeCritical' attribute.*
- **CS4032**: *The '`await`' operator can only be used within an async method. Consider marking this method with the 'async' modifier and changing its return type to '`Task<T>`'.*
- **CS4033**: *The '`await`' operator can only be used within an async method. Consider marking this method with the '`async`' modifier and changing its return type to '`Task`'.*
- **CS4034**: *The '`await`' operator can only be used within an async method. Consider marking this method with the 'async' modifier.*
- **CS8031**: *Async lambda expression converted to a task returning delegate cannot return a value.*
- **CS8100**: *The '`await`' operator cannot be used in a static script variable initializer.*
- **CS8177**: *Async methods cannot have by-reference locals.*
- **CS8178**: *A reference returned by a call to method cannot be preserved across '`await`' or '`yield`' boundary.*
- **CS8204**: *For type to be used as an AsyncMethodBuilder for type target, its Task property should return target type instead of declared type.*
- **CS8403**: *Method with an iterator block must be '`async`' to return IAsyncEnumerable\<T\>.*
- **CS8411**: *Asynchronous foreach statement cannot operate on variables of type because type does not contain a suitable public instance or extension definition for required member.*
- **CS8892**: *Method will not be used as an entry point because a synchronous entry point was found.*
- **CS8935**: *The AsyncMethodBuilder attribute is disallowed on anonymous methods without an explicit return type.*
- **CS8940**: *A generic task-like return type was expected, but the type found in 'AsyncMethodBuilder' attribute was not suitable. It must be an unbound generic type of arity one, and its containing type (if any) must be non-generic.*
- **CS9123**: *The '`&`' operator should not be used on parameters or local variables in async methods.*
- **CS9330**: *'`MethodImplAttribute.Async`' cannot be manually applied to methods. Mark the method 'async'.*

## Await expression requirements

- **CS1985**: *Cannot await in a catch clause.*
- **CS1986**: *'`await`' requires that the type have a suitable '`GetAwaiter`' method.*
- **CS1992**: *The '`await`' operator can only be used when contained within a method or lambda expression marked with the '`async`' modifier.*
- **CS1995**: *The '`await`' operator may only be used in a query expression within the first collection expression of the initial '`from`' clause or within the collection expression of a '`join`' clause.*
- **CS1996**: *Cannot await in the body of a lock statement.*
- **CS4008**: *Cannot await '`void`'.*
- **CS4032**: *The '`await`' operator can only be used within an async method. Consider marking this method with the '`async`' modifier and changing its return type to '`Task<T>`'.*
- **CS4033**: *The '`await`' operator can only be used within an async method. Consider marking this method with the '`async`' modifier and changing its return type to '`Task`'.*
- **CS4034**: *The '`await`' operator can only be used within an async method. Consider marking this method with the 'async' modifier.*
- **CS8178**: *A reference returned by this call cannot be preserved across '`await`' or '`yield`' boundary.*
- **CS8411**: *Asynchronous foreach statement cannot operate on variables of type because type does not contain a suitable public instance or extension definition for required member.*
- **CS4001**: *Cannot await expression.*
- **CS4003**: *'`await`' cannot be used as an identifier within an async method or lambda expression.*
- **CS4007**: *Instance of type cannot be preserved across '`await`' or '`yield`' boundary.*
- **CS4011**: *'`await`' requires that the return type of 'GetAwaiter()' have suitable 'IsCompleted', 'OnCompleted', and 'GetResult' members, and implement 'INotifyCompletion' or 'ICriticalNotifyCompletion'.*
- **CS4027**: *Type does not implement required member.*
- **CS4028**: *'`await`' requires that the type have a suitable 'GetAwaiter' method. Are you missing a using directive for 'System'?*
- **CS8100**: *The '`await`' operator cannot be used in a static script variable initializer.*

The following items explain how to correct each error. For more information about the `await` operator and the awaiter pattern, see Asynchronous programming with async and await.

- Add the `async` modifier to the method or lambda expression that contains the `await` expression (**CS1992**, **CS4032**, **CS4033**, **CS4034**). The compiler requires the `async` modifier so it can generate the state machine that handles asynchronous suspension and resumption. The three variants of this error provide context-specific suggestions for the correct return type.
- Move `await` expressions out of `catch` blocks when you target C# 5 or earlier (**CS1985**). Starting with C# 6, the compiler supports `await` in both `catch` and `finally` blocks. This error is no longer produced in C# 6 and later.
- Move `await` expressions out of `lock` statement blocks (**CS1996**). Async suspension while holding a lock risks deadlocks. The lock is held across thread switches where other code might be waiting for the same lock.
- Restructure query expressions so that `await` appears only in the first collection expression of the initial `from` clause or in the collection expression of a `join` clause (**CS1995**). Other query clauses translate into lambda expressions that don't support async suspension.
- Change the awaited expression's type so that it exposes an accessible `GetAwaiter()` method that follows the awaiter pattern (**CS1986**, **CS4028**). The type can implement the pattern directly or through an extension method. If the `GetAwaiter` method exists but you're missing a `using` directive for `System`, the compiler produces the more specific **CS4028** message instead of **CS1986**.
- Ensure the awaiter type returned by `GetAwaiter()` has `IsCompleted`, `OnCompleted`, and `GetResult` members and implements `System.Runtime.CompilerServices.INotifyCompletion` or `System.Runtime.CompilerServices.ICriticalNotifyCompletion` (**CS4011**, **CS4027**). The `await` expression depends on these members to check completion status, register continuations, and retrieve results.
- Change the called method's return type from `void` to `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` so the result can be awaited (**CS4008**). You can't await a `void`-returning method because there's no task object to track completion or propagate exceptions.
- Change the awaited expression to a type that supports the awaiter pattern (**CS4001**). Types like `int`, `string`, and other built-in types don't have a `GetAwaiter` method and can't be awaited directly.
- Store the result of a ref-returning method call in a local variable before using `await` (**CS8178**). A reference returned by a method can't be preserved across an `await` boundary because the async state machine might suspend and resume on a different thread or context, invalidating the reference.
- Implement `System.Collections.Generic.IAsyncEnumerable`1` on the collection type, or add an accessible `GetAsyncEnumerator` method that returns a type with `Current` and `MoveNextAsync` members (**CS8411**). The `await foreach` statement requires the collection type to follow the async enumerable pattern.
- Rename any local variable or parameter named `await` inside an `async` method or lambda expression (**CS4003**). Inside async contexts, `await` is a contextual keyword and can't be used as an identifier.
- Move the `await` expression out of the static script variable initializer and into a method body (**CS8100**). Static initializers run outside an async context, so `await` isn't available in that location.
- Restructure code so that `ref struct` instances don't need to be preserved across an `await` or `yield` boundary (**CS4007**). The async state machine stores local variables on the heap, and `ref struct` types are stack-bound by design - they can't be safely moved to heap storage across suspension points.
