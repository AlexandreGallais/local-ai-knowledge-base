---
title: "StableValue interface (java.lang) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StableValue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StableValue interface (java.lang) (part 2 of 2)

## StableValue.intFunction(int, IntFunction<? extends R>)

```java
static <R> IntFunction<R> intFunction(int size, IntFunction<? extends R> underlying)
```

The returned function is a caching function that, for each allowed `int`
input, records the values of the provided `underlying`
function upon being first accessed via the returned function's
apply() method. If the returned function is
invoked with an input that is not in the range `[0, size)`, an
`IllegalArgumentException` will be thrown.

The provided `underlying` function is guaranteed to be successfully invoked
at most once per allowed input, even in a multi-threaded environment. Competing
threads invoking the returned function's
apply() method when a value is already under
computation will block until a value is computed or an exception is thrown by
the computing thread.

If invoking the provided `underlying` function throws an exception, it is
rethrown to the initial caller and no contents is recorded.

If the provided `underlying` function recursively calls the returned
function for the same input, an `IllegalStateException` will
be thrown.

Parameters:

- `size`: the upper bound of the range `[0, size)` indicating the allowed inputs
- `underlying`: `IntFunction` used to compute cached values
- `<R>`: the type of results delivered by the returned IntFunction

Throws:

- `IllegalArgumentException`: if the provided `size` is negative.

## StableValue.function(Set<? extends T>, Function<? super T, ? extends R>)

```java
static <T, R> Function<T, R> function(Set<? extends T> inputs, Function<? super T, ? extends R> underlying)
```

The returned function is a caching function that, for each allowed
input in the given set of `inputs`, records the values of the provided
`underlying` function upon being first accessed via the returned function's
apply() method. If the returned function is
invoked with an input that is not in `inputs`, an `IllegalArgumentException`
will be thrown.

The provided `underlying` function is guaranteed to be successfully invoked
at most once per allowed input, even in a multi-threaded environment. Competing
threads invoking the returned function's apply()
method when a value is already under computation will block until a value is
computed or an exception is thrown by the computing thread.

If invoking the provided `underlying` function throws an exception, it is
rethrown to the initial caller and no contents is recorded.

If the provided `underlying` function recursively calls the returned
function for the same input, an `IllegalStateException` will
be thrown.

Parameters:

- `inputs`: the set of (non-null) allowed input values
- `underlying`: `Function` used to compute cached values
- `<T>`: the type of the input to the returned Function
- `<R>`: the type of results delivered by the returned Function

Throws:

- `NullPointerException`: if the provided set of `inputs` contains a `null` element.

## StableValue.list(int, IntFunction<? extends E>)

```java
static <E> List<E> list(int size, IntFunction<? extends E> mapper)
```

The returned list is an unmodifiable list
with the provided `size`. The list's elements are computed via the
provided `mapper` when they are first accessed
(e.g. via List::get).

The provided `mapper` function is guaranteed to be successfully invoked
at most once per list index, even in a multi-threaded environment. Competing
threads accessing an element already under computation will block until an element
is computed or an exception is thrown by the computing thread.

If invoking the provided `mapper` function throws an exception, it
is rethrown to the initial caller and no value for the element is recorded.

Any int) subList or `List.reversed()` views
of the returned list are also stable.

The returned list and its int) subList or
`List.reversed()` views implement the `RandomAccess` interface.

The returned list is unmodifiable and does not implement the
optional operations in the
`List` interface.

If the provided `mapper` recursively calls the returned list for the
same index, an `IllegalStateException` will be thrown.

Parameters:

- `size`: the size of the returned list
- `mapper`: to invoke whenever an element is first accessed (may return `null`)
- `<E>`: the type of elements in the returned list

Throws:

- `IllegalArgumentException`: if the provided `size` is negative.

## StableValue.map(Set<K>, Function<? super K, ? extends V>)

```java
static <K, V> Map<K, V> map(Set<K> keys, Function<? super K, ? extends V> mapper)
```

The returned map is an unmodifiable map whose
keys are known at construction. The map's values are computed via the provided
`mapper` when they are first accessed
(e.g. via Map::get).

The provided `mapper` function is guaranteed to be successfully invoked
at most once per key, even in a multi-threaded environment. Competing
threads accessing a value already under computation will block until an element
is computed or an exception is thrown by the computing thread.

If invoking the provided `mapper` function throws an exception, it
is rethrown to the initial caller and no value associated with the provided key
is recorded.

Any `Map.values()` or `Map.entrySet()` views of the returned map are
also stable.

The returned map is unmodifiable and does not implement the
optional operations in the
`Map` interface.

If the provided `mapper` recursively calls the returned map for
the same key, an `IllegalStateException` will be thrown.

Parameters:

- `keys`: the (non-null) keys in the returned map
- `mapper`: to invoke whenever an associated value is first accessed (may return `null`)
- `<K>`: the type of keys maintained by the returned map
- `<V>`: the type of mapped values in the returned map

Throws:

- `NullPointerException`: if the provided set of `inputs` contains a `null` element.
