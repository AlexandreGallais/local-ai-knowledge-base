---
title: "Collectors class (java.util.stream) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Collectors.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collectors class (java.util.stream) (part 3 of 4)

## Collectors.groupingByConcurrent(Function<? super T, ? extends K>, Collector<? super T, A, D>)

```java
public static <T, K, A, D> Collector<T, ?, ConcurrentMap<K, D>> groupingByConcurrent(Function<? super T, ? extends K> classifier, Collector<? super T, A, D> downstream)
```

Returns a concurrent `Collector` implementing a cascaded "group by"
operation on input elements of type `T`, grouping elements
according to a classification function, and then performing a reduction
operation on the values associated with a given key using the specified
downstream `Collector`.

This is a concurrent and
unordered Collector.

The classification function maps elements to some key type `K`.
The downstream collector operates on elements of type `T` and
produces a result of type `D`. The resulting collector produces a
`ConcurrentMap<K, D>`.

There are no guarantees on the type, mutability, or serializability
of the `ConcurrentMap` returned.

For example, to compute the set of last names of people in each city,
where the city names are sorted:

```java
ConcurrentMap<City, Set<String>> namesByCity
  = people.stream().collect(
    groupingByConcurrent(Person::getCity,
                         mapping(Person::getLastName,
                                 toSet())));
```

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the type of the keys
- ``: the intermediate accumulation type of the downstream collector
- `<D>`: the result type of the downstream reduction
- `classifier`: a classifier function mapping input elements to keys
- `downstream`: a `Collector` implementing the downstream reduction

**Returns:** a concurrent, unordered `Collector` implementing the cascaded group-by operation

**See also:** #groupingBy(Function, Collector)

**See also:** #groupingByConcurrent(Function)

**See also:** #groupingByConcurrent(Function, Supplier, Collector)

## Collectors.groupingByConcurrent(Function<? super T, ? extends K>, Supplier<M>, Collector<? super T, A, D>)

```java
public static <T, K, A, D, M extends ConcurrentMap<K, D>> Collector<T, ?, M> groupingByConcurrent(Function<? super T, ? extends K> classifier, Supplier<M> mapFactory, Collector<? super T, A, D> downstream)
```

Returns a concurrent `Collector` implementing a cascaded "group by"
operation on input elements of type `T`, grouping elements
according to a classification function, and then performing a reduction
operation on the values associated with a given key using the specified
downstream `Collector`.  The `ConcurrentMap` produced by the
Collector is created with the supplied factory function.

This is a concurrent and
unordered Collector.

The classification function maps elements to some key type `K`.
The downstream collector operates on elements of type `T` and
produces a result of type `D`. The resulting collector produces a
`ConcurrentMap<K, D>`.

For example, to compute the set of last names of people in each city,
where the city names are sorted:

```java
ConcurrentMap<City, Set<String>> namesByCity
  = people.stream().collect(
    groupingByConcurrent(Person::getCity,
                         ConcurrentSkipListMap::new,
                         mapping(Person::getLastName,
                                 toSet())));
```

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the type of the keys
- ``: the intermediate accumulation type of the downstream collector
- `<D>`: the result type of the downstream reduction
- `<M>`: the type of the resulting `ConcurrentMap`
- `classifier`: a classifier function mapping input elements to keys
- `mapFactory`: a supplier providing a new empty `ConcurrentMap` into which the results will be inserted
- `downstream`: a `Collector` implementing the downstream reduction

**Returns:** a concurrent, unordered `Collector` implementing the cascaded group-by operation

**See also:** #groupingByConcurrent(Function)

**See also:** #groupingByConcurrent(Function, Collector)

**See also:** #groupingBy(Function, Supplier, Collector)

## Collectors.partitioningBy(Predicate<? super T>)

```java
public static <T> Collector<T, ?, Map<Boolean, List<T>>> partitioningBy(Predicate<? super T> predicate)
```

Returns a `Collector` which partitions the input elements according
to a `Predicate`, and organizes them into a
`Map<Boolean, List<T>>`.

The returned `Map` always contains mappings for both
`false` and `true` keys.
There are no guarantees on the type, mutability,
serializability, or thread-safety of the `Map` or `List`
returned.

Parameters:

- `<T>`: the type of the input elements
- `predicate`: a predicate used for classifying input elements

**API note:** If a partition has no elements, its value in the result Map will be
an empty List.

**Returns:** a `Collector` implementing the partitioning operation

**See also:** #partitioningBy(Predicate, Collector)

## Collectors.partitioningBy(Predicate<? super T>, Collector<? super T, A, D>)

```java
public static <T, D, A> Collector<T, ?, Map<Boolean, D>> partitioningBy(Predicate<? super T> predicate, Collector<? super T, A, D> downstream)
```

Returns a `Collector` which partitions the input elements according
to a `Predicate`, reduces the values in each partition according to
another `Collector`, and organizes them into a
`Map<Boolean, D>` whose values are the result of the downstream
reduction.

The returned `Map` always contains mappings for both
`false` and `true` keys.
There are no guarantees on the type, mutability,
serializability, or thread-safety of the `Map` returned.

Parameters:

- `<T>`: the type of the input elements
- `<D>`: the result type of the downstream reduction
- ``: the intermediate accumulation type of the downstream collector
- `predicate`: a predicate used for classifying input elements
- `downstream`: a `Collector` implementing the downstream reduction

**API note:** If a partition has no elements, its value in the result Map will be
obtained by calling the downstream collector's supplier function and then
applying the finisher function.

**Returns:** a `Collector` implementing the cascaded partitioning
        operation

**See also:** #partitioningBy(Predicate)

## Collectors.toMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>)

```java
public static <T, K, U> Collector<T, ?, Map<K,U>> toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper)
```

Returns a `Collector` that accumulates elements into a
`Map` whose keys and values are the result of applying the provided
mapping functions to the input elements.

If the mapped keys contain duplicates (according to
`Object.equals(Object)`), an `IllegalStateException` is
thrown when the collection operation is performed.  If the mapped keys
might have duplicates, use Function, BinaryOperator)
instead.

There are no guarantees on the type, mutability, serializability,
or thread-safety of the `Map` returned.

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the output type of the key <example-value> function
- ``: the output type of the value mapping function
- `keyMapper`: a mapping function to produce keys
- `valueMapper`: a mapping function to produce values

**API note:** It is common for either the key or the value to be the input elements.
In this case, the utility method
`java.util.function.Function.identity()` may be helpful.
For example, the following produces a `Map` mapping
students to their grade point average:

```java
Map<Student, Double> studentToGPA
  = students.stream().collect(
    toMap(Function.identity(),
          student -> computeGPA(student)));
```

And the following produces a `Map` mapping a unique identifier to
students:

```java
Map<String, Student> studentIdToStudent
  = students.stream().collect(
    toMap(Student::getId,
          Function.identity()));
```

**Implementation note:** The returned `Collector` is not concurrent.  For parallel stream
pipelines, the `combiner` function operates by merging the keys
from one map into another, which can be an expensive operation.  If it is
not required that results are inserted into the `Map` in encounter
order, using Function)
may offer better parallel performance.

**Returns:** a `Collector` which collects elements into a `Map`
whose keys and values are the result of applying mapping functions to
the input elements

**See also:** #toMap(Function, Function, BinaryOperator)

**See also:** #toMap(Function, Function, BinaryOperator, Supplier)

**See also:** #toConcurrentMap(Function, Function)

## Collectors.toMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>, BinaryOperator)

```java
public static <T, K, U> Collector<T, ?, Map<K,U>> toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction)
```

Returns a `Collector` that accumulates elements into a
`Map` whose keys and values are the result of applying the provided
mapping functions to the input elements.

If the mapped
keys contain duplicates (according to `Object.equals(Object)`),
the value mapping function is applied to each equal element, and the
results are merged using the provided merging function.

There are no guarantees on the type, mutability, serializability,
or thread-safety of the `Map` returned.

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the output type of the key <example-value> function
- ``: the output type of the value mapping function
- `keyMapper`: a mapping function to produce keys
- `valueMapper`: a mapping function to produce values
- `mergeFunction`: a merge function, used to resolve collisions between values associated with the same key, as supplied to Object, BiFunction)

**API note:** There are multiple ways to deal with collisions between multiple elements
mapping to the same key.  The other forms of `toMap` simply use
a merge function that throws unconditionally, but you can easily write
more flexible merge policies.  For example, if you have a stream
of `Person`, and you want to produce a "phone book" mapping name to
address, but it is possible that two persons have the same name, you can
do as follows to gracefully deal with these collisions, and produce a
`Map` mapping names to a concatenated list of addresses:

```java
Map<String, String> phoneBook
  = people.stream().collect(
    toMap(Person::getName,
          Person::getAddress,
          (s, a) -> s + ", " + a));
```

**Implementation note:** The returned `Collector` is not concurrent.  For parallel stream
pipelines, the `combiner` function operates by merging the keys
from one map into another, which can be an expensive operation.  If it is
not required that results are merged into the `Map` in encounter
order, using Function, BinaryOperator)
may offer better parallel performance.

**Returns:** a `Collector` which collects elements into a `Map`
whose keys are the result of applying a key <example-value> function to the input
elements, and whose values are the result of applying a value mapping
function to all input elements equal to the key and combining them
using the merge function

**See also:** #toMap(Function, Function)

**See also:** #toMap(Function, Function, BinaryOperator, Supplier)

**See also:** #toConcurrentMap(Function, Function, BinaryOperator)

## Collectors.toMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>, BinaryOperator, Supplier<M>)

```java
public static <T, K, U, M extends Map<K, U>> Collector<T, ?, M> toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction, Supplier<M> mapFactory)
```

Returns a `Collector` that accumulates elements into a
`Map` whose keys and values are the result of applying the provided
mapping functions to the input elements.

If the mapped
keys contain duplicates (according to `Object.equals(Object)`),
the value mapping function is applied to each equal element, and the
results are merged using the provided merging function.  The `Map`
is created by a provided supplier function.

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the output type of the key <example-value> function
- ``: the output type of the value mapping function
- `<M>`: the type of the resulting `Map`
- `keyMapper`: a mapping function to produce keys
- `valueMapper`: a mapping function to produce values
- `mergeFunction`: a merge function, used to resolve collisions between values associated with the same key, as supplied to Object, BiFunction)
- `mapFactory`: a supplier providing a new empty `Map` into which the results will be inserted

**Implementation note:** The returned `Collector` is not concurrent.  For parallel stream
pipelines, the `combiner` function operates by merging the keys
from one map into another, which can be an expensive operation.  If it is
not required that results are merged into the `Map` in encounter
order, using Function, BinaryOperator, Supplier)
may offer better parallel performance.

**Returns:** a `Collector` which collects elements into a `Map`
whose keys are the result of applying a key <example-value> function to the input
elements, and whose values are the result of applying a value mapping
function to all input elements equal to the key and combining them
using the merge function

**See also:** #toMap(Function, Function)

**See also:** #toMap(Function, Function, BinaryOperator)

**See also:** #toConcurrentMap(Function, Function, BinaryOperator, Supplier)
