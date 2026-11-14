---
title: "Collectors class (java.util.stream) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Collectors.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collectors class (java.util.stream) (part 2 of 4)

## Collectors.summingDouble(ToDoubleFunction<? super T>)

```java
public static <T> Collector<T, ?, Double> summingDouble(ToDoubleFunction<? super T> mapper)
```

Returns a `Collector` that produces the sum of a double-valued
function applied to the input elements.  If no elements are present,
the result is 0.

The sum returned can vary depending upon the order in which
values are recorded, due to accumulated rounding error in
addition of values of differing magnitudes. Values sorted by increasing
absolute magnitude tend to yield more accurate results.  If any recorded
value is a `NaN` or the sum is at any point a `NaN` then the
sum will be `NaN`.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: a function extracting the property to be summed

**Returns:** a `Collector` that produces the sum of a derived property

## Collectors.averagingInt(ToIntFunction<? super T>)

```java
public static <T> Collector<T, ?, Double> averagingInt(ToIntFunction<? super T> mapper)
```

Returns a `Collector` that produces the arithmetic mean of an integer-valued
function applied to the input elements.  If no elements are present,
the result is 0.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: a function extracting the property to be averaged

**Returns:** a `Collector` that produces the arithmetic mean of a
derived property

## Collectors.averagingLong(ToLongFunction<? super T>)

```java
public static <T> Collector<T, ?, Double> averagingLong(ToLongFunction<? super T> mapper)
```

Returns a `Collector` that produces the arithmetic mean of a long-valued
function applied to the input elements.  If no elements are present,
the result is 0.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: a function extracting the property to be averaged

**Returns:** a `Collector` that produces the arithmetic mean of a
derived property

## Collectors.averagingDouble(ToDoubleFunction<? super T>)

```java
public static <T> Collector<T, ?, Double> averagingDouble(ToDoubleFunction<? super T> mapper)
```

Returns a `Collector` that produces the arithmetic mean of a double-valued
function applied to the input elements.  If no elements are present,
the result is 0.

The average returned can vary depending upon the order in which
values are recorded, due to accumulated rounding error in
addition of values of differing magnitudes. Values sorted by increasing
absolute magnitude tend to yield more accurate results.  If any recorded
value is a `NaN` or the sum is at any point a `NaN` then the
average will be `NaN`.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: a function extracting the property to be averaged

**Implementation note:** The `double` format can represent all
consecutive integers in the range -253 to
253. If the pipeline has more than 253
values, the divisor in the average computation will saturate at
253, leading to additional numerical errors.

**Returns:** a `Collector` that produces the arithmetic mean of a
derived property

## Collectors.reducing(T, BinaryOperator<T>)

```java
public static <T> Collector<T, ?, T> reducing(T identity, BinaryOperator<T> op)
```

Returns a `Collector` which performs a reduction of its
input elements under a specified `BinaryOperator` using the
provided identity.

Parameters:

- `<T>`: element type for the input and output of the reduction
- `identity`: the identity value for the reduction (also, the value that is returned when there are no input elements)
- `op`: a `BinaryOperator<T>` used to reduce the input elements

**API note:** The `reducing()` collectors are most useful when used in a
multi-level reduction, downstream of `groupingBy` or
`partitioningBy`.  To perform a simple reduction on a stream,
use BinaryOperator) instead.

**Returns:** a `Collector` which implements the reduction operation

**See also:** #reducing(BinaryOperator)

**See also:** #reducing(Object, Function, BinaryOperator)

## Collectors.reducing(BinaryOperator<T>)

```java
public static <T> Collector<T, ?, Optional<T>> reducing(BinaryOperator<T> op)
```

Returns a `Collector` which performs a reduction of its
input elements under a specified `BinaryOperator`.  The result
is described as an `Optional<T>`.

Parameters:

- `<T>`: element type for the input and output of the reduction
- `op`: a `BinaryOperator<T>` used to reduce the input elements

**API note:** The `reducing()` collectors are most useful when used in a
multi-level reduction, downstream of `groupingBy` or
`partitioningBy`.  To perform a simple reduction on a stream,
use `Stream.reduce(BinaryOperator)` instead.

For example, given a stream of `Person`, to calculate tallest
person in each city:

```java
Comparator<Person> byHeight = Comparator.comparing(Person::getHeight);
Map<City, Optional<Person>> tallestByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               reducing(BinaryOperator.maxBy(byHeight))));
```

**Returns:** a `Collector` which implements the reduction operation

**See also:** #reducing(Object, BinaryOperator)

**See also:** #reducing(Object, Function, BinaryOperator)

## Collectors.reducing(U, Function<? super T, ? extends U>, BinaryOperator)

```java
public static <T, U> Collector<T, ?, U> reducing(U identity, Function<? super T, ? extends U> mapper, BinaryOperator<U> op)
```

Returns a `Collector` which performs a reduction of its
input elements under a specified mapping function and
`BinaryOperator`. This is a generalization of
BinaryOperator) which allows a transformation
of the elements before reduction.

Parameters:

- `<T>`: the type of the input elements
- ``: the type of the mapped values
- `identity`: the identity value for the reduction (also, the value that is returned when there are no input elements)
- `mapper`: a mapping function to apply to each input value
- `op`: a `BinaryOperator` used to reduce the mapped values

**API note:** The `reducing()` collectors are most useful when used in a
multi-level reduction, downstream of `groupingBy` or
`partitioningBy`.  To perform a simple map-reduce on a stream,
use `Stream.map(Function)` and BinaryOperator)
instead.

For example, given a stream of `Person`, to calculate the longest
last name of residents in each city:

```java
Comparator<String> byLength = Comparator.comparing(String::length);
Map<City, String> longestLastNameByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               reducing("",
                        Person::getLastName,
                        BinaryOperator.maxBy(byLength))));
```

**Returns:** a `Collector` implementing the map-reduce operation

**See also:** #reducing(Object, BinaryOperator)

**See also:** #reducing(BinaryOperator)

## Collectors.groupingBy(Function<? super T, ? extends K>)

```java
public static <T, K> Collector<T, ?, Map<K, List<T>>> groupingBy(Function<? super T, ? extends K> classifier)
```

Returns a `Collector` implementing a "group by" operation on
input elements of type `T`, grouping elements according to a
classification function, and returning the results in a `Map`.

The classification function maps elements to some key type `K`.
The collector produces a `Map<K, List<T>>` whose keys are the
values resulting from applying the classification function to the input
elements, and whose corresponding values are `List`s containing the
input elements which map to the associated key under the classification
function.

There are no guarantees on the type, mutability, serializability, or
thread-safety of the `Map` or `List` objects returned.

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the type of the keys
- `classifier`: the classifier function mapping input elements to keys

**Implementation requirements:** This produces a result similar to:

```java
    groupingBy(classifier, toList());
```

**Implementation note:** The returned `Collector` is not concurrent.  For parallel stream
pipelines, the `combiner` function operates by merging the keys
from one map into another, which can be an expensive operation.  If
preservation of the order in which elements appear in the resulting `Map`
collector is not required, using `groupingByConcurrent(Function)`
may offer better parallel performance.

**Returns:** a `Collector` implementing the group-by operation

**See also:** #groupingBy(Function, Collector)

**See also:** #groupingBy(Function, Supplier, Collector)

**See also:** #groupingByConcurrent(Function)

## Collectors.groupingBy(Function<? super T, ? extends K>, Collector<? super T, A, D>)

```java
public static <T, K, A, D> Collector<T, ?, Map<K, D>> groupingBy(Function<? super T, ? extends K> classifier, Collector<? super T, A, D> downstream)
```

Returns a `Collector` implementing a cascaded "group by" operation
on input elements of type `T`, grouping elements according to a
classification function, and then performing a reduction operation on
the values associated with a given key using the specified downstream
`Collector`.

The classification function maps elements to some key type `K`.
The downstream collector operates on elements of type `T` and
produces a result of type `D`. The resulting collector produces a
`Map<K, D>`.

There are no guarantees on the type, mutability,
serializability, or thread-safety of the `Map` returned.

For example, to compute the set of last names of people in each city:

```java
Map<City, Set<String>> namesByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
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

**Implementation note:** The returned `Collector` is not concurrent.  For parallel stream
pipelines, the `combiner` function operates by merging the keys
from one map into another, which can be an expensive operation.  If
preservation of the order in which elements are presented to the downstream
collector is not required, using Collector)
may offer better parallel performance.

**Returns:** a `Collector` implementing the cascaded group-by operation

**See also:** #groupingBy(Function)

**See also:** #groupingBy(Function, Supplier, Collector)

**See also:** #groupingByConcurrent(Function, Collector)

## Collectors.groupingBy(Function<? super T, ? extends K>, Supplier<M>, Collector<? super T, A, D>)

```java
public static <T, K, D, A, M extends Map<K, D>> Collector<T, ?, M> groupingBy(Function<? super T, ? extends K> classifier, Supplier<M> mapFactory, Collector<? super T, A, D> downstream)
```

Returns a `Collector` implementing a cascaded "group by" operation
on input elements of type `T`, grouping elements according to a
classification function, and then performing a reduction operation on
the values associated with a given key using the specified downstream
`Collector`.  The `Map` produced by the Collector is created
with the supplied factory function.

The classification function maps elements to some key type `K`.
The downstream collector operates on elements of type `T` and
produces a result of type `D`. The resulting collector produces a
`Map<K, D>`.

For example, to compute the set of last names of people in each city,
where the city names are sorted:

```java
Map<City, Set<String>> namesByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               TreeMap::new,
               mapping(Person::getLastName,
                       toSet())));
```

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the type of the keys
- `<D>`: the result type of the downstream reduction
- ``: the intermediate accumulation type of the downstream collector
- `<M>`: the type of the resulting `Map`
- `classifier`: a classifier function mapping input elements to keys
- `mapFactory`: a supplier providing a new empty `Map` into which the results will be inserted
- `downstream`: a `Collector` implementing the downstream reduction

**Implementation note:** The returned `Collector` is not concurrent.  For parallel stream
pipelines, the `combiner` function operates by merging the keys
from one map into another, which can be an expensive operation.  If
preservation of the order in which elements are presented to the downstream
collector is not required, using Supplier, Collector)
may offer better parallel performance.

**Returns:** a `Collector` implementing the cascaded group-by operation

**See also:** #groupingBy(Function, Collector)

**See also:** #groupingBy(Function)

**See also:** #groupingByConcurrent(Function, Supplier, Collector)

## Collectors.groupingByConcurrent(Function<? super T, ? extends K>)

```java
public static <T, K> Collector<T, ?, ConcurrentMap<K, List<T>>> groupingByConcurrent(Function<? super T, ? extends K> classifier)
```

Returns a concurrent `Collector` implementing a "group by"
operation on input elements of type `T`, grouping elements
according to a classification function.

This is a concurrent and
unordered Collector.

The classification function maps elements to some key type `K`.
The collector produces a `ConcurrentMap<K, List<T>>` whose keys are the
values resulting from applying the classification function to the input
elements, and whose corresponding values are `List`s containing the
input elements which map to the associated key under the classification
function.

There are no guarantees on the type, mutability, or serializability
of the `ConcurrentMap` or `List` objects returned, or of the
thread-safety of the `List` objects returned.

Parameters:

- `<T>`: the type of the input elements
- `<K>`: the type of the keys
- `classifier`: a classifier function mapping input elements to keys

**Implementation requirements:** This produces a result similar to:

```java
    groupingByConcurrent(classifier, toList());
```

**Returns:** a concurrent, unordered `Collector` implementing the group-by operation

**See also:** #groupingBy(Function)

**See also:** #groupingByConcurrent(Function, Collector)

**See also:** #groupingByConcurrent(Function, Supplier, Collector)
