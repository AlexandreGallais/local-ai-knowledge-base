---
title: "Collectors class (java.util.stream) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Collectors.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collectors class (java.util.stream) (part 4 of 4)

## Collectors.toConcurrentMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>)

```java
public static <T, K, U> Collector<T, ?, ConcurrentMap<K,U>> toConcurrentMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper)
```

Returns a concurrent `Collector` that accumulates elements into a
`ConcurrentMap` whose keys and values are the result of applying
the provided mapping functions to the input elements.

If the mapped keys contain duplicates (according to
`Object.equals(Object)`), an `IllegalStateException` is
thrown when the collection operation is performed.  If the mapped keys
may have duplicates, use
Function, BinaryOperator) instead.

There are no guarantees on the type, mutability, or serializability
of the `ConcurrentMap` returned.

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the output type of the key <example-value> function
- ``: the output type of the value mapping function
- `keyMapper`: the mapping function to produce keys
- `valueMapper`: the mapping function to produce values

**API note:** It is common for either the key or the value to be the input elements.
In this case, the utility method
`java.util.function.Function.identity()` may be helpful.
For example, the following produces a `ConcurrentMap` mapping
students to their grade point average:

```java
ConcurrentMap<Student, Double> studentToGPA
  = students.stream().collect(
    toConcurrentMap(Function.identity(),
                    student -> computeGPA(student)));
```

And the following produces a `ConcurrentMap` mapping a
unique identifier to students:

```java
ConcurrentMap<String, Student> studentIdToStudent
  = students.stream().collect(
    toConcurrentMap(Student::getId,
                    Function.identity()));
```

This is a concurrent and
unordered Collector.

**Returns:** a concurrent, unordered `Collector` which collects elements into a
`ConcurrentMap` whose keys are the result of applying a key <example-value>
function to the input elements, and whose values are the result of
applying a value mapping function to the input elements

**See also:** #toMap(Function, Function)

**See also:** #toConcurrentMap(Function, Function, BinaryOperator)

**See also:** #toConcurrentMap(Function, Function, BinaryOperator, Supplier)

## Collectors.toConcurrentMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>, BinaryOperator)

```java
public static <T, K, U> Collector<T, ?, ConcurrentMap<K,U>> toConcurrentMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction)
```

Returns a concurrent `Collector` that accumulates elements into a
`ConcurrentMap` whose keys and values are the result of applying
the provided mapping functions to the input elements.

If the mapped keys contain duplicates (according to `Object.equals(Object)`),
the value mapping function is applied to each equal element, and the
results are merged using the provided merging function.

There are no guarantees on the type, mutability, or serializability
of the `ConcurrentMap` returned.

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the output type of the key <example-value> function
- ``: the output type of the value mapping function
- `keyMapper`: a mapping function to produce keys
- `valueMapper`: a mapping function to produce values
- `mergeFunction`: a merge function, used to resolve collisions between values associated with the same key, as supplied to Object, BiFunction)

**API note:** There are multiple ways to deal with collisions between multiple elements
mapping to the same key.  The other forms of `toConcurrentMap` simply use
a merge function that throws unconditionally, but you can easily write
more flexible merge policies.  For example, if you have a stream
of `Person`, and you want to produce a "phone book" mapping name to
address, but it is possible that two persons have the same name, you can
do as follows to gracefully deal with these collisions, and produce a
`ConcurrentMap` mapping names to a concatenated list of addresses:

```java
ConcurrentMap<String, String> phoneBook
  = people.stream().collect(
    toConcurrentMap(Person::getName,
                    Person::getAddress,
                    (s, a) -> s + ", " + a));
```

This is a concurrent and
unordered Collector.

**Returns:** a concurrent, unordered `Collector` which collects elements into a
`ConcurrentMap` whose keys are the result of applying a key <example-value>
function to the input elements, and whose values are the result of
applying a value mapping function to all input elements equal to the key
and combining them using the merge function

**See also:** #toConcurrentMap(Function, Function)

**See also:** #toConcurrentMap(Function, Function, BinaryOperator, Supplier)

**See also:** #toMap(Function, Function, BinaryOperator)

## Collectors.toConcurrentMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>, BinaryOperator, Supplier<M>)

```java
public static <T, K, U, M extends ConcurrentMap<K, U>> Collector<T, ?, M> toConcurrentMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction, Supplier<M> mapFactory)
```

Returns a concurrent `Collector` that accumulates elements into a
`ConcurrentMap` whose keys and values are the result of applying
the provided mapping functions to the input elements.

If the mapped keys contain duplicates (according to `Object.equals(Object)`),
the value mapping function is applied to each equal element, and the
results are merged using the provided merging function.  The
`ConcurrentMap` is created by a provided supplier function.

This is a concurrent and
unordered Collector.

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the output type of the key <example-value> function
- ``: the output type of the value mapping function
- `<M>`: the type of the resulting `ConcurrentMap`
- `keyMapper`: a mapping function to produce keys
- `valueMapper`: a mapping function to produce values
- `mergeFunction`: a merge function, used to resolve collisions between values associated with the same key, as supplied to Object, BiFunction)
- `mapFactory`: a supplier providing a new empty `ConcurrentMap` into which the results will be inserted

**Returns:** a concurrent, unordered `Collector` which collects elements into a
`ConcurrentMap` whose keys are the result of applying a key <example-value>
function to the input elements, and whose values are the result of
applying a value mapping function to all input elements equal to the key
and combining them using the merge function

**See also:** #toConcurrentMap(Function, Function)

**See also:** #toConcurrentMap(Function, Function, BinaryOperator)

**See also:** #toMap(Function, Function, BinaryOperator, Supplier)

## Collectors.summarizingInt(ToIntFunction<? super T>)

```java
public static <T> Collector<T, ?, IntSummaryStatistics> summarizingInt(ToIntFunction<? super T> mapper)
```

Returns a `Collector` which applies an `int`-producing
mapping function to each input element, and returns summary statistics
for the resulting values.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: a mapping function to apply to each element

**Returns:** a `Collector` implementing the summary-statistics reduction

**See also:** #summarizingDouble(ToDoubleFunction)

**See also:** #summarizingLong(ToLongFunction)

## Collectors.summarizingLong(ToLongFunction<? super T>)

```java
public static <T> Collector<T, ?, LongSummaryStatistics> summarizingLong(ToLongFunction<? super T> mapper)
```

Returns a `Collector` which applies an `long`-producing
mapping function to each input element, and returns summary statistics
for the resulting values.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: the mapping function to apply to each element

**Returns:** a `Collector` implementing the summary-statistics reduction

**See also:** #summarizingDouble(ToDoubleFunction)

**See also:** #summarizingInt(ToIntFunction)

## Collectors.summarizingDouble(ToDoubleFunction<? super T>)

```java
public static <T> Collector<T, ?, DoubleSummaryStatistics> summarizingDouble(ToDoubleFunction<? super T> mapper)
```

Returns a `Collector` which applies an `double`-producing
mapping function to each input element, and returns summary statistics
for the resulting values.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: a mapping function to apply to each element

**Returns:** a `Collector` implementing the summary-statistics reduction

**See also:** #summarizingLong(ToLongFunction)

**See also:** #summarizingInt(ToIntFunction)

## Collectors.teeing(Collector<? super T, ?, R1>, Collector<? super T, ?, R2>, BiFunction<? super R1, ? super R2, R>)

```java
public static <T, R1, R2, R> Collector<T, ?, R> teeing(Collector<? super T, ?, R1> downstream1, Collector<? super T, ?, R2> downstream2, BiFunction<? super R1, ? super R2, R> merger)
```

Returns a `Collector` that is a composite of two downstream collectors.
Every element passed to the resulting collector is processed by both downstream
collectors, then their results are merged using the specified merge function
into the final result.

The resulting collector functions do the following:

- supplier: creates a result container that contains result containers
obtained by calling each collector's supplier

- accumulator: calls each collector's accumulator with its result container
and the input element

- combiner: calls each collector's combiner with two result containers

- finisher: calls each collector's finisher with its result container,
then calls the supplied merger and returns its result.

The resulting collector is `Collector.Characteristics.UNORDERED` if both downstream
collectors are unordered and `Collector.Characteristics.CONCURRENT` if both downstream
collectors are concurrent.

Parameters:

- `<T>`: the type of the input elements
- `<R1>`: the result type of the first collector
- `<R2>`: the result type of the second collector
- `<R>`: the final result type
- `downstream1`: the first downstream collector
- `downstream2`: the second downstream collector
- `merger`: the function which merges two results into the single one

**Returns:** a `Collector` which aggregates the results of two supplied collectors.

**Since:** 12
