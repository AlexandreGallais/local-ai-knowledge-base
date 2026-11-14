---
title: "Comparator interface (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Comparator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Comparator interface (java.util) (part 2 of 2)

## Comparator.comparing(Function<? super T, ? extends U>)

```java
public static <T, U extends Comparable<? super U>> Comparator<T> comparing( Function<? super T, ? extends U> keyExtractor)
```

Accepts a function that extracts a Comparable sort key from a type `T`, and returns a `Comparator<T>` that compares by that sort key.

The returned comparator is serializable if the specified function
is also serializable.

Parameters:

- `<T>`: the type of element to be compared
- ``: the type of the `Comparable` sort key
- `keyExtractor`: the function used to extract the `Comparable` sort key

**API note:** For example, to obtain a `Comparator` that compares `Person` objects by their last name,

```java
    Comparator<Person> byLastName = Comparator.comparing(Person::getLastName);
```

**Returns:** a comparator that compares by an extracted key

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null

## Comparator.comparingInt(ToIntFunction<? super T>)

```java
public static <T> Comparator<T> comparingInt(ToIntFunction<? super T> keyExtractor)
```

Accepts a function that extracts an `int` sort key from a type
`T`, and returns a `Comparator<T>` that compares by that
sort key.

The returned comparator is serializable if the specified function
is also serializable.

Parameters:

- `<T>`: the type of element to be compared
- `keyExtractor`: the function used to extract the integer sort key

**Returns:** a comparator that compares by an extracted key

**See also:** #comparing(Function)

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null

## Comparator.comparingLong(ToLongFunction<? super T>)

```java
public static <T> Comparator<T> comparingLong(ToLongFunction<? super T> keyExtractor)
```

Accepts a function that extracts a `long` sort key from a type
`T`, and returns a `Comparator<T>` that compares by that
sort key.

The returned comparator is serializable if the specified function is
also serializable.

Parameters:

- `<T>`: the type of element to be compared
- `keyExtractor`: the function used to extract the long sort key

**Returns:** a comparator that compares by an extracted key

**See also:** #comparing(Function)

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null

## Comparator.comparingDouble(ToDoubleFunction<? super T>)

```java
public static<T> Comparator<T> comparingDouble(ToDoubleFunction<? super T> keyExtractor)
```

Accepts a function that extracts a `double` sort key from a type
`T`, and returns a `Comparator<T>` that compares by that
sort key.

The returned comparator is serializable if the specified function
is also serializable.

Parameters:

- `<T>`: the type of element to be compared
- `keyExtractor`: the function used to extract the double sort key

**Returns:** a comparator that compares by an extracted key

**See also:** #comparing(Function)

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null
