---
title: "StableValue interface (java.lang) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StableValue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StableValue interface (java.lang)

```java
public sealed interface StableValue<T> permits StableValueImpl
```

A stable value is a holder of contents that can be set at most once.

A `StableValue<T>` is typically created using the factory method
{@code StableValue.of()}. When created this way,
the stable value is *unset*, which means it holds no *contents*.
Its contents, of type `T`, can be *set* by calling
trySet(), setOrThrow(),
or orElseSet(). Once set, the contents
can never change and can be retrieved by calling orElseThrow()
, orElse(), or orElseSet().

Consider the following example where a stable value field "`logger`" is a
shallowly immutable holder of contents of type `Logger` and that is initially
created as *unset*, which means it holds no contents. Later in the example, the
state of the "`logger`" field is checked and if it is still *unset*,
the contents is *set*:

If `getLogger()` is called from several threads, several instances of
`Logger` might be created. However, the contents can only be set at most once
meaning the first writer wins.

In order to guarantee that, even under races, only one instance of `Logger` is
ever created, the orElseSet() method can be used
instead, where the contents are lazily computed, and atomically set, via a
supplier. In the example below, the supplier is provided in the
form of a lambda expression:

The `getLogger()` method calls `logger.orElseSet()` on the stable value to
retrieve its contents. If the stable value is *unset*, then `orElseSet()`
evaluates the given supplier, and sets the contents to the result; the result is then
returned to the client. In other words, `orElseSet()` guarantees that a
stable value's contents is *set* before it returns.

Furthermore, `orElseSet()` guarantees that out of one or more suppliers provided,
only at most one is ever evaluated, and that one is only ever evaluated once,
even when `logger.orElseSet()` is invoked concurrently. This property is crucial
as evaluation of the supplier may have side effects, for example, the call above to
`Logger.create()` may result in storage resources being prepared.

#### Stable Functions

Stable values provide the foundation for higher-level functional abstractions. A
*stable supplier* is a supplier that computes a value and then caches it into
a backing stable value storage for subsequent use. A stable supplier is created via the
StableValue.supplier() factory, by
providing an underlying `Supplier` which is invoked when the stable supplier
is first accessed:

A stable supplier encapsulates access to its backing stable value storage. This means
that code inside `Component` can obtain the logger object directly from the
stable supplier, without having to go through an accessor method like `getLogger()`.

A *stable int function* is a function that takes an `int` parameter and
uses it to compute a result that is then cached by the backing stable value storage
for that parameter value. A stable `IntFunction` is created via the
IntFunction) StableValue.intFunction()
factory. Upon creation, the input range (i.e. `[0, size)`) is specified together
with an underlying `IntFunction` which is invoked at most once per input
value. In effect, the stable int function will act like a cache for the underlying
`IntFunction`:

The `PowerOf2Util.powerOfTwo()` function is a *partial function* that only
allows a subset `[0, 5]` of the underlying function's `UNDERLYING_POWER_OF_TWO`
input range.

A *stable function* is a function that takes a parameter (of type `T`) and
uses it to compute a result (of type `R`) that is then cached by the backing
stable value storage for that parameter value. A stable function is created via the
Function) StableValue.function() factory.
Upon creation, the input `Set` is specified together with an underlying
`Function` which is invoked at most once per input value. In effect, the
stable function will act like a cache for the underlying `Function`:

The `Log2Util.log2()` function is a *partial function* that only allows
a subset `{1, 2, 4, 8, 16, 32}` of the underlying function's
`UNDERLYING_LOG2` input range.

#### Stable Collections

Stable values can also be used as backing storage for
unmodifiable collections. A *stable list*
is an unmodifiable list, backed by an array of stable values. The stable list elements
are computed when they are first accessed, using a provided `IntFunction`:

Similarly, a *stable map* is an unmodifiable map whose keys are known at
construction. The stable map values are computed when they are first accessed,
using a provided `Function`:

#### Composing stable values

A stable value can depend on other stable values, forming a dependency graph
that can be lazily computed but where access to individual elements can still be
performant. In the following example, a single `Foo` and a `Bar`
instance (that is dependent on the `Foo` instance) are lazily created, both of
which are held by stable values:

Calling `bar()` will create the `Bar` singleton if it is not already
created. Upon such a creation, the dependent `Foo` will first be created if
the `Foo` does not already exist.

Another example, which has a more complex dependency graph, is to compute the
Fibonacci sequence lazily:

Both `FIB` and `Fibonacci::fib` recurse into each other. Because the
stable int function `FIB` caches intermediate results, the initial
computational complexity is reduced from exponential to linear compared to a
traditional non-caching recursive fibonacci method. Once computed, the VM is free to
constant-fold expressions like `Fibonacci.fib(5)`.

The fibonacci example above is a directed acyclic graph (i.e.,
it has no circular dependencies and is therefore a dependency tree):

If there are circular dependencies in a dependency graph, a stable value will
eventually throw an `IllegalStateException` upon referencing elements in
a circularity.

#### Thread Safety

The contents of a stable value is guaranteed to be set at most once. If competing
threads are racing to set a stable value, only one update succeeds, while the other
updates are blocked until the stable value is set, whereafter the other updates
observes the stable value is set and leave the stable value unchanged.

The at-most-once write operation on a stable value that succeeds
(e.g. trySet())
*happens-before*
any successful read operation (e.g. `orElseThrow()`).
A successful write operation can be either:

- a `trySet(Object)` that returns `true`,

- a `setOrThrow(Object)` that does not throw, or

- an `orElseSet(Supplier)` that successfully runs the supplier

A successful read operation can be either:

- a `orElseThrow()` that does not throw,

- a orElse(other) that does not return the `other` value

- an `orElseSet(Supplier)` that does not `throw`, or

- an `isSet()` that returns `true`

The method `orElseSet(Supplier)` guarantees that the provided
`Supplier` is invoked successfully at most once, even under race.
Invocations of `orElseSet(Supplier)` form a total order of zero or
more exceptional invocations followed by zero (if the contents were already set) or one
successful invocation. Since stable functions and stable collections are built on top
of the same principles as orElseSet() they
too are thread safe and guarantee at-most-once-per-input invocation.

#### Performance

As the contents of a stable value can never change after it has been set, a JVM
implementation may, for a set stable value, elide all future reads of that
stable value, and instead directly use any contents that it has previously observed.
This is true if the reference to the stable value is a constant (e.g. in cases where
the stable value itself is stored in a `static final` field). Stable functions
and collections are built on top of StableValue. As such, they might also be eligible
for the same JVM optimizations as for StableValue.

Parameters:

- `<T>`: type of the contents

**Implementation requirements:** Implementing classes of `StableValue` are free to synchronize on
          `this` and consequently, it should be avoided to
          (directly or indirectly) synchronize on a `StableValue`. Hence,
          synchronizing on `this` may lead to deadlock.

          Except for a `StableValue`'s contents itself,
          an orElse(other) parameter, and
          an equals(obj) parameter; all
          method parameters must be *non-null* or a `NullPointerException`
          will be thrown.

**Implementation note:** A `StableValue` is mainly intended to be a non-public field in
          a class and is usually neither exposed directly via accessors nor passed as
          a method parameter.

          Stable functions and collections make reasonable efforts to provide
          `Object.toString()` operations that do not trigger evaluation
          of the internal stable values when called.
          Stable collections have `Object.equals(Object)` operations that try
          to minimize evaluation of the internal stable values when called.

          As objects can be set via stable values but never removed, this can be a
          source of unintended memory leaks. A stable value's contents are
          strongly reachable.
          Be advised that reachable stable values will hold their set contents until
          the stable value itself is collected.

          A `StableValue` that has a type parameter `T` that is an array
          type (of arbitrary rank) will only allow the JVM to treat the
          *array reference* as a stable value but *not its components*.
          Instead, a IntFunction) a stable list of arbitrary
          depth can be used, which provides stable components. More generally, a
          stable value can hold other stable values of arbitrary depth and still
          provide transitive constantness.

          Stable values, functions, and collections are not `Serializable`.

**Since:** 25

## StableValue.trySet(T)

```java
boolean trySet(T contents)
```

Tries to set the contents of this StableValue to the provided `contents`.
The contents of this StableValue can only be set once, implying this method only
returns `true` once.

When this method returns, the contents of this StableValue is always set.

Parameters:

- `contents`: to set

**Returns:** `true` if the contents of this StableValue was set to the
        provided `contents`, `false` otherwise

Throws:

- `IllegalStateException`: if a supplier invoked by `orElseSet(Supplier)` recursively attempts to set this stable value by calling this method directly or indirectly.

## StableValue.orElse(T)

```java
T orElse(T other)
```

Parameters:

- `other`: to return if the contents is not set

## StableValue.orElseThrow()

```java
T orElseThrow()
```

Throws:

- `NoSuchElementException`: if no contents is set

## StableValue.isSet()

```java
boolean isSet()
```

## StableValue.orElseSet(Supplier<? extends T>)

```java
T orElseSet(Supplier<? extends T> supplier)
```

The provided `supplier` is guaranteed to be invoked at most once if it
completes without throwing an exception. If this method is invoked several times
with different suppliers, only one of them will be invoked provided it completes
without throwing an exception.

If the supplier throws an (unchecked) exception, the exception is rethrown and no
contents is set. The most common usage is to construct a new object serving
as a lazily computed value or memoized result, as in:

When this method returns successfully, the contents is always set.

The provided `supplier` will only be invoked once even if invoked from
several threads unless the `supplier` throws an exception.

Parameters:

- `supplier`: to be used for computing the contents, if not previously set

Throws:

- `IllegalStateException`: if the provided `supplier` recursively attempts to set this stable value.

## StableValue.setOrThrow(T)

```java
void setOrThrow(T contents)
```

Sets the contents of this StableValue to the provided `contents`, or, if
already set, throws `IllegalStateException`.

When this method returns (or throws an exception), the contents is always set.

Parameters:

- `contents`: to set

Throws:

- `IllegalStateException`: if the contents was already set
- `IllegalStateException`: if a supplier invoked by `orElseSet(Supplier)` recursively attempts to set this stable value by calling this method directly or indirectly.

## StableValue.equals(Object)

```java
boolean equals(Object obj)
```

Parameters:

- `obj`: to check for equality

## StableValue.hashCode()

```java
int hashCode()
```

## StableValue.of()

```java
static <T> StableValue<T> of()
```

An unset stable value has no contents.

Parameters:

- `<T>`: type of the contents

## StableValue.of(T)

```java
static <T> StableValue<T> of(T contents)
```

Parameters:

- `contents`: to set
- `<T>`: type of the contents

## StableValue.supplier(Supplier<? extends T>)

```java
static <T> Supplier<T> supplier(Supplier<? extends T> underlying)
```

The returned supplier is a caching supplier that records
the value of the provided `underlying` supplier upon being first accessed via
the returned supplier's get() method.

The provided `underlying` supplier is guaranteed to be successfully invoked
at most once even in a multi-threaded environment. Competing threads invoking the
returned supplier's get() method when a value is
already under computation will block until a value is computed or an exception is
thrown by the computing thread. The competing threads will then observe the newly
computed value (if any) and will then never execute the `underlying` supplier.

If the provided `underlying` supplier throws an exception, it is rethrown
to the initial caller and no contents is recorded.

If the provided `underlying` supplier recursively calls the returned
supplier, an `IllegalStateException` will be thrown.

Parameters:

- `underlying`: supplier used to compute a cached value
- `<T>`: the type of results supplied by the returned supplier
