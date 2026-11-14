---
title: "Optional class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Optional.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Optional class (java.util)

```java
public final class Optional<T>
```

A container object which may or may not contain a non-`null` value.
If a value is present, `isPresent()` returns `true`. If no
value is present, the object is considered *empty* and
`isPresent()` returns `false`.

Additional methods that depend on the presence or absence of a contained
value are provided, such as orElse()
(returns a default value if no value is present) and
ifPresent() (performs an
action if a value is present).

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

Parameters:

- `<T>`: the type of value

**API note:** `Optional` is primarily intended for use as a method return type where
there is a clear need to represent "no result," and where using `null`
is likely to cause errors. A variable whose type is `Optional` should
never itself be `null`; it should always point to an `Optional`
instance.

**Since:** 1.8

## Optional.empty()

```java
public static<T> Optional<T> empty()
```

Returns an empty `Optional` instance.  No value is present for this
`Optional`.

Parameters:

- `<T>`: The type of the non-existent value

**API note:** Though it may be tempting to do so, avoid testing if an object is empty
by comparing with `==` or `!=` against instances returned by
`Optional.empty()`.  There is no guarantee that it is a singleton.
Instead, use `isEmpty()` or `isPresent()`.

**Returns:** an empty `Optional`

## Optional.of(T)

```java
public static <T> Optional<T> of(T value)
```

Returns an `Optional` describing the given non-`null`
value.

Parameters:

- `value`: the value to describe, which must be non-`null`
- `<T>`: the type of the value

**Returns:** an `Optional` with the value present

Throws:

- `NullPointerException`: if value is `null`

## Optional.ofNullable(T)

```java
public static <T> Optional<T> ofNullable(T value)
```

Returns an `Optional` describing the given value, if
non-`null`, otherwise returns an empty `Optional`.

Parameters:

- `value`: the possibly-`null` value to describe
- `<T>`: the type of the value

**Returns:** an `Optional` with a present value if the specified value
        is non-`null`, otherwise an empty `Optional`

## Optional.get()

```java
public T get()
```

If a value is present, returns the value, otherwise throws
`NoSuchElementException`.

**API note:** The preferred alternative to this method is `orElseThrow()`.

**Returns:** the non-`null` value described by this `Optional`

Throws:

- `NoSuchElementException`: if no value is present

## Optional.isPresent()

```java
public boolean isPresent()
```

If a value is present, returns `true`, otherwise `false`.

**Returns:** `true` if a value is present, otherwise `false`

## Optional.isEmpty()

```java
public boolean isEmpty()
```

If a value is  not present, returns `true`, otherwise
`false`.

**Returns:** `true` if a value is not present, otherwise `false`

**Since:** 11

## Optional.ifPresent(Consumer<? super T>)

```java
public void ifPresent(Consumer<? super T> action)
```

If a value is present, performs the given action with the value,
otherwise does nothing.

Parameters:

- `action`: the action to be performed, if a value is present

Throws:

- `NullPointerException`: if value is present and the given action is `null`

## Optional.ifPresentOrElse(Consumer<? super T>, Runnable)

```java
public void ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction)
```

If a value is present, performs the given action with the value,
otherwise performs the given empty-based action.

Parameters:

- `action`: the action to be performed, if a value is present
- `emptyAction`: the empty-based action to be performed, if no value is present

**Since:** 9

Throws:

- `NullPointerException`: if a value is present and the given action is `null`, or no value is present and the given empty-based action is `null`.

## Optional.filter(Predicate<? super T>)

```java
public Optional<T> filter(Predicate<? super T> predicate)
```

If a value is present, and the value matches the given predicate,
returns an `Optional` describing the value, otherwise returns an
empty `Optional`.

Parameters:

- `predicate`: the predicate to apply to a value, if present

**Returns:** an `Optional` describing the value of this
        `Optional`, if a value is present and the value matches the
        given predicate, otherwise an empty `Optional`

Throws:

- `NullPointerException`: if the predicate is `null`

## Optional.map(Function<? super T, ? extends U>)

```java
public <U> Optional<U> map(Function<? super T, ? extends U> mapper)
```

If a value is present, returns an `Optional` describing (as if by
`ofNullable`) the result of applying the given mapping function to
the value, otherwise returns an empty `Optional`.

If the mapping function returns a `null` result then this method
returns an empty `Optional`.

Parameters:

- `mapper`: the mapping function to apply to a value, if present
- ``: The type of the value returned from the mapping function

**API note:** This method supports post-processing on `Optional` values, without
the need to explicitly check for a return status.  For example, the
following code traverses a stream of URIs, selects one that has not
yet been processed, and creates a path from that URI, returning
an `Optional`:

```java
    Optional<Path> p =
        uris.stream().filter(uri -> !isProcessedYet(uri))
                      .findFirst()
                      .map(Paths::get);
```

Here, `findFirst` returns an `Optional<URI>`, and then
`map` returns an `Optional` for the desired
URI if one exists.

**Returns:** an `Optional` describing the result of applying a mapping
        function to the value of this `Optional`, if a value is
        present, otherwise an empty `Optional`

Throws:

- `NullPointerException`: if the mapping function is `null`

## Optional.flatMap(Function<? super T, ? extends Optional<? extends U>>)

```java
public <U> Optional<U> flatMap(Function<? super T, ? extends Optional<? extends U>> mapper)
```

If a value is present, returns the result of applying the given
`Optional`-bearing mapping function to the value, otherwise returns
an empty `Optional`.

This method is similar to `map(Function)`, but the mapping
function is one whose result is already an `Optional`, and if
invoked, `flatMap` does not wrap it within an additional
`Optional`.

Parameters:

- ``: The type of value of the `Optional` returned by the mapping function
- `mapper`: the mapping function to apply to a value, if present

**Returns:** the result of applying an `Optional`-bearing mapping
        function to the value of this `Optional`, if a value is
        present, otherwise an empty `Optional`

Throws:

- `NullPointerException`: if the mapping function is `null` or returns a `null` result

## Optional.or(Supplier<? extends Optional<? extends T>>)

```java
public Optional<T> or(Supplier<? extends Optional<? extends T>> supplier)
```

If a value is present, returns an `Optional` describing the value,
otherwise returns an `Optional` produced by the supplying function.

Parameters:

- `supplier`: the supplying function that produces an `Optional` to be returned

**Returns:** returns an `Optional` describing the value of this
        `Optional`, if a value is present, otherwise an
        `Optional` produced by the supplying function.

**Since:** 9

Throws:

- `NullPointerException`: if the supplying function is `null` or produces a `null` result

## Optional.stream()

```java
public Stream<T> stream()
```

If a value is present, returns a sequential `Stream` containing
only that value, otherwise returns an empty `Stream`.

**API note:** This method can be used to transform a `Stream` of optional
elements to a `Stream` of present value elements:

```java
    Stream<Optional<T>> os = ..
    Stream<T> s = os.flatMap(Optional::stream)
```

**Returns:** the optional value as a `Stream`

**Since:** 9

## Optional.orElse(T)

```java
public T orElse(T other)
```

If a value is present, returns the value, otherwise returns
`other`.

Parameters:

- `other`: the value to be returned, if no value is present. May be `null`.

**Returns:** the value, if present, otherwise `other`

## Optional.orElseGet(Supplier<? extends T>)

```java
public T orElseGet(Supplier<? extends T> supplier)
```

If a value is present, returns the value, otherwise returns the result
produced by the supplying function.

Parameters:

- `supplier`: the supplying function that produces a value to be returned

**Returns:** the value, if present, otherwise the result produced by the
        supplying function

Throws:

- `NullPointerException`: if no value is present and the supplying function is `null`

## Optional.orElseThrow()

```java
public T orElseThrow()
```

If a value is present, returns the value, otherwise throws
`NoSuchElementException`.

**Returns:** the non-`null` value described by this `Optional`

**Since:** 10

Throws:

- `NoSuchElementException`: if no value is present

## Optional.orElseThrow(Supplier<? extends X>)

```java
public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X
```

If a value is present, returns the value, otherwise throws an exception
produced by the exception supplying function.

Parameters:

- `<X>`: Type of the exception to be thrown
- `exceptionSupplier`: the supplying function that produces an exception to be thrown

**API note:** A method reference to the exception constructor with an empty argument
list can be used as the supplier. For example,
`IllegalStateException::new`

**Returns:** the value, if present

Throws:

- `X`: if no value is present
- `NullPointerException`: if no value is present and the exception supplying function is `null` or produces a `null` result

## Optional.equals(Object)

```java
public boolean equals(Object obj)
```

Indicates whether some other object is "equal to" this `Optional`.
The other object is considered equal if:

- it is also an `Optional` and;

- both instances have no value present or;

- the present values are "equal to" each other via `equals()`.

Parameters:

- `obj`: an object to be tested for equality

**Returns:** `true` if the other object is "equal to" this object
        otherwise `false`

## Optional.hashCode()

```java
public int hashCode()
```

Returns the hash code of the value, if present, otherwise `0`
(zero) if no value is present.

**Returns:** hash code value of the present value or `0` if no value is
        present

## Optional.toString()

```java
public String toString()
```

Returns a non-empty string representation of this `Optional`
suitable for debugging.  The exact presentation format is unspecified and
may vary between implementations and versions.

**Implementation requirements:** If a value is present the result must include its string representation
in the result.  Empty and present `Optional`s must be unambiguously
differentiable.

**Returns:** the string representation of this instance
