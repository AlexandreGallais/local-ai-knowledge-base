# C++ named requirements: Callable

A **Callable** type is a type for which the `INVOKE` and `INVOKE<R>` operations (used by, e.g., `std::function`, `std::bind`, and `std::thread::thread`) are applicable.

|  |  |
| --- | --- |
| `INVOKE` can be performed explicitly using the library function `std::invoke`. | (since C++17) |
| `INVOKE<R>` can be performed explicitly using the library function `std::invoke_r`. | (since C++23) |

### Requirements

The type `T` satisfies Callable if

Given

- `f`, an object of type `T`,
- `ArgTypes`, suitable list of argument types,
- `R`, suitable return type.

The following expressions must be valid:

| Expression | Requirements |
| --- | --- |
| `INVOKE<R>(f, std::declval<ArgTypes>()...)` | The expression is well-formed in unevaluated context. |

### Notes

Pointers to data members are Callable, even though no function calls take place.

### Standard library

In addition, the following standard library facilities accept any Callable type (not just FunctionObject):

|  |  |
| --- | --- |
| function (C++11) | copyable wrapper of any copy constructible callable object (class template) |
| move_only_function (C++23) | move-only wrapper of any callable object that supports qualifiers in a given call signature (class template) |
| copyable_function (C++26) | copyable wrapper of any copy constructible callable object that supports qualifiers in a given call signature (class template) |
| function_ref (C++26) | non-owning wrapper of any callable object (class template) |
| bind (C++11) | binds one or more arguments to a function object (function template) |
| bind_front, bind_back (C++20), (C++23) | bind a variable number of arguments, in order, to a function object (function template) |
| reference_wrapper (C++11) | CopyConstructible and CopyAssignable reference wrapper (class template) |
| result_of, invoke_result (C++11), (removed in C++20), (C++17) | deduces the result type of invoking a callable object with a set of arguments (class template) |
| thread (C++11) | manages a separate thread (class) |
| jthread (C++20) | `std::thread` with support for auto-joining and cancellation (class) |
| call_once (C++11) | invokes a function only once even if called from multiple threads (function template) |
| async (C++11) | runs a function asynchronously (potentially in a new thread) and returns a `std::future` that will hold the result (function template) |
| packaged_task (C++11) | packages a function to store its return value for asynchronous retrieval (class template) |

### See also

|  |  |
| --- | --- |
| is_invocable, is_invocable_r, is_nothrow_invocable, is_nothrow_invocable_r (C++17) | checks if a type can be invoked (as if by `std::invoke`) with the given argument types (class template) |
| invocable, regular_invocable (C++20) | specifies that a callable type can be invoked with a given set of argument types (concept) |
| invoke, invoke_r (C++17), (C++23) | invokes any **Callable** object with given arguments and possibility to specify return type(since C++23) (function template) |
