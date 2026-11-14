---
title: "ScopedValue class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ScopedValue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ScopedValue class (java.lang)

```java
public final class ScopedValue<T>
```

A value that may be safely and efficiently shared to methods without using method
parameters.

 In the Java programming language, data is usually passed to a method by means of a
method parameter. The data may need to be passed through a sequence of many methods to
get to the method that makes use of the data. Every method in the sequence of calls
needs to declare the parameter and every method has access to the data.
`ScopedValue` provides a means to pass data to a faraway method (typically a
*callback*) without using method parameters. In effect, a `ScopedValue`
is an *implicit method parameter*. It is "as if" every method in a sequence of
calls has an additional parameter. None of the methods declare the parameter and only
the methods that have access to the `ScopedValue` object can access its value
(the data). `ScopedValue` makes it possible to securely pass data from a
*caller* to a faraway *callee* through a sequence of intermediate methods
that do not declare a parameter for the data and have no access to the data.

 The `ScopedValue` API works by executing a method with a `ScopedValue`
object *bound* to some value for the bounded period of execution of a method.
The method may invoke another method, which in turn may invoke another. The unfolding
execution of the methods define a *dynamic scope*. Code in these methods with
access to the `ScopedValue` object may read its value. The `ScopedValue`
object reverts to being *unbound* when the original method completes normally or
with an exception. The `ScopedValue` API supports executing a `Runnable`,
or `CallableOp` with a `ScopedValue` bound to a value.

 Consider the following example with a scoped value "`NAME`" bound to the value
"`duke`" for the execution of a `Runnable`'s `run` method.
The `run` method, in turn, invokes a method `doSomething`.

Code executed directly or indirectly by `doSomething`, with access to the field
`NAME`, can invoke `NAME.get()` to read the value "`duke`". `NAME` is bound while executing the `run` method. It reverts to being unbound when
the `run` method completes.

 The example using `run` invokes a method that does not return a result.
The call method can be used
to invoke a method that returns a result.
`ScopedValue` defines the Object) method
for cases where multiple mappings (of `ScopedValue` to value) are accumulated
in advance of calling a method with all `ScopedValue`s bound to their value.

#### Bindings are per-thread

A `ScopedValue` binding to a value is per-thread. Invoking `run`
executes a method with a `ScopedValue` bound to a value for the current thread.
The get method returns the value bound for the current thread.

 In the example, if code executed by one thread invokes this:

and code executed by another thread invokes:

then code in `doSomething` (or any method that it calls) invoking `NAME.get()`
will read the value "`duke1`" or "`duke2`", depending on which thread is
executing.

#### Scoped values as capabilities

A `ScopedValue` object should be treated as a *capability* or a key to
access its value when the `ScopedValue` is bound. Secure usage depends on access
control (see *The Java Virtual Machine Specification*, Section )
and taking care to not share the `ScopedValue` object. In many cases, a `ScopedValue` will be declared in a `final` and `static` field so that it
is only accessible to code in a single class (or nest).

#### Rebinding

The `ScopedValue` API allows a new binding to be established for *nested
dynamic scopes*. This is known as *rebinding*. A `ScopedValue` that
is bound to a value may be bound to a new value for the bounded execution of a new
method. The unfolding execution of code executed by that method defines the nested
dynamic scope. When the method completes, the value of the `ScopedValue` reverts
to its previous value.

 In the above example, suppose that code executed by `doSomething` binds
`NAME` to a new value with:

Code executed directly or indirectly by `doMore()` that invokes `NAME.get()` will read the value "`duchess`". When `doMore()` completes
then the value of `NAME` reverts to "`duke`".

#### Inheritance

`ScopedValue` supports sharing across threads. This sharing is limited to
structured cases where child threads are started and terminate within the bounded
period of execution by a parent thread. When using a `StructuredTaskScope`,
scoped value bindings are *captured* when creating a `StructuredTaskScope`
and inherited by all threads started in that task scope with the
fork method.

 A `ScopedValue` that is shared across threads requires that the value be an
immutable object or for all access to the value to be appropriately synchronized.

 In the following example, the `ScopedValue` `NAME` is bound to the
value "`duke`" for the execution of a runnable operation. The code in the `run` method creates a `StructuredTaskScope` that forks three tasks. Code executed
directly or indirectly by these threads running `childTask1()`, `childTask2()`,
and `childTask3()` that invokes `NAME.get()` will read the value
"`duke`".

 Unless otherwise specified, passing a `null` argument to a method in this
class will cause a `NullPointerException` to be thrown.

Parameters:

- `<T>`: the type of the value

**API note:** A `ScopedValue` should be preferred over a `ThreadLocal` for cases where
the goal is "one-way transmission" of data without using method parameters.  While a
`ThreadLocal` can be used to pass data to a method without using method parameters,
it does suffer from a number of issues:

-  `ThreadLocal` does not prevent code in a faraway callee from setting a new value.

-  A `ThreadLocal` has an unbounded lifetime and thus continues to have a value
  after a method completes, unless explicitly removed.

-  Inheritance is expensive - the map of
  thread-locals to values must be copied when creating each child thread.

**Implementation note:** Scoped values are designed to be used in fairly small
numbers. `get` initially performs a search through enclosing
scopes to find a scoped value's innermost binding. It
then caches the result of the search in a small thread-local
cache. Subsequent invocations of `get` for that scoped value
will almost always be very fast. However, if a program has many
scoped values that it uses cyclically, the cache hit rate
will be low and performance will be poor. This design allows
scoped-value inheritance by `StructuredTaskScope` threads to
be very fast: in essence, no more than copying a pointer, and
leaving a scoped-value binding also requires little more than
updating a pointer.

Because the scoped-value per-thread cache is small, clients
should minimize the number of bound scoped values in use. For
example, if it is necessary to pass a number of values in this way,
it makes sense to create a record class to hold those values, and
then bind a single `ScopedValue` to an instance of that record.

For this release, the reference implementation
provides some system properties to tune the performance of scoped
values.

The system property `java.lang.ScopedValue.cacheSize`
controls the size of the (per-thread) scoped-value cache. This cache is crucial
for the performance of scoped values. If it is too small,
the runtime library will repeatedly need to scan for each
`get`. If it is too large, memory will be unnecessarily
consumed. The default scoped-value cache size is 16 entries. It may
be varied from 2 to 16 entries in size. `ScopedValue.cacheSize`
must be an integer power of 2.

For example, you could use `-Djava.lang.ScopedValue.cacheSize=8`.

The other system property is `jdk.preserveScopedValueCache`.
This property determines whether the per-thread scoped-value
cache is preserved when a virtual thread is blocked. By default
this property is set to `true`, meaning that every virtual
thread preserves its scoped-value cache when blocked. Like `ScopedValue.cacheSize`, this is a space versus speed trade-off: in
situations where many virtual threads are blocked most of the time,
setting this property to `false` might result in a useful
memory saving, but each virtual thread's scoped-value cache would
have to be regenerated after a blocking operation.

**Since:** 25

## ScopedValue.where(ScopedValue<T>, T)

```java
public <T> Carrier where(ScopedValue<T> key, T value)
```

Returns a new `Carrier` with the mappings from this carrier plus a
new mapping from `key` to `value`. If this carrier already has a
mapping for the scoped value `key` then it will map to the new
`value`. The current carrier is immutable, so it is not changed by this
method.

Parameters:

- `key`: the `ScopedValue` key
- `value`: the value, can be `null`
- `<T>`: the type of the value

**Returns:** a new `Carrier` with the mappings from this carrier plus the new mapping

## ScopedValue.get(ScopedValue<T>)

```java
public <T> T get(ScopedValue<T> key)
```

Returns the value of a `ScopedValue` in this mapping.

Parameters:

- `key`: the `ScopedValue` key
- `<T>`: the type of the value

**Returns:** the value

Throws:

- `NoSuchElementException`: if the key is not present in this mapping

## ScopedValue.call(CallableOp<? extends R, X>)

```java
public <R, X extends Throwable> R call(CallableOp<? extends R, X> op) throws X
```

Calls a value-returning operation with each scoped value in this mapping bound
to its value in the current thread.
When the operation completes (normally or with an exception), each scoped value
in the mapping will revert to being unbound, or revert to its previous value
when previously bound, in the current thread. If `op` completes with an
exception then it propagated by this method.

 Scoped values are intended to be used in a *structured manner*. If code
invoked directly or indirectly by the operation creates a `StructuredTaskScope`
but does not close it, then it is detected
as a *structure violation* when the operation completes (normally or with an
exception). In that case, the underlying construct of the `StructuredTaskScope`
is closed and `StructureViolationException` is thrown.

Parameters:

- `op`: the operation to run
- `<R>`: the type of the result of the operation
- `<X>`: type of the exception thrown by the operation

**Returns:** the result

Throws:

- `StructureViolationException`: if a structure violation is detected
- `X`: if `op` completes with an exception

## ScopedValue.run(Runnable)

```java
public void run(Runnable op)
```

Runs an operation with each scoped value in this mapping bound to its value
in the current thread.
When the operation completes (normally or with an exception), each scoped value
in the mapping will revert to being unbound, or revert to its previous value
when previously bound, in the current thread. If `op` completes with an
exception then it propagated by this method.

 Scoped values are intended to be used in a *structured manner*. If code
invoked directly or indirectly by the operation creates a `StructuredTaskScope`
but does not close it, then it is detected
as a *structure violation* when the operation completes (normally or with an
exception). In that case, the underlying construct of the `StructuredTaskScope`
is closed and `StructureViolationException` is thrown.

Parameters:

- `op`: the operation to run

Throws:

- `StructureViolationException`: if a structure violation is detected

## ScopedValue.where(ScopedValue<T>, T)

```java
public static <T> Carrier where(ScopedValue<T> key, T value)
```

Creates a new `Carrier` with a single mapping of a `ScopedValue`
*key* to a value. The `Carrier` can be used to accumulate mappings so
that an operation can be executed with all scoped values in the mapping bound to
values. The following example runs an operation with `k1` bound (or rebound)
to `v1`, and `k2` bound (or rebound) to `v2`.

Parameters:

- `key`: the `ScopedValue` key
- `value`: the value, can be `null`
- `<T>`: the type of the value

**Returns:** a new `Carrier` with a single mapping

## ScopedValue.newInstance()

```java
public static <T> ScopedValue<T> newInstance()
```

Creates a scoped value that is initially unbound for all threads.

Parameters:

- `<T>`: the type of the value

**Returns:** a new `ScopedValue`

## ScopedValue.get()

```java
public T get()
```

Throws:

- `NoSuchElementException`: if the scoped value is not bound

## ScopedValue.isBound()

```java
public boolean isBound()
```

## ScopedValue.orElse(T)

```java
public T orElse(T other)
```

Returns the value of this scoped value if bound in the current thread, otherwise
returns `other`.

Parameters:

- `other`: the value to return if not bound

**Returns:** the value of the scoped value if bound, otherwise `other`

## ScopedValue.orElseThrow(Supplier<? extends X>)

```java
public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X
```

Returns the value of this scoped value if bound in the current thread, otherwise
throws an exception produced by the exception supplying function.

Parameters:

- `<X>`: the type of the exception that may be thrown
- `exceptionSupplier`: the supplying function that produces the exception to throw

**Returns:** the value of the scoped value if bound in the current thread

Throws:

- `X`: if the scoped value is not bound in the current thread
