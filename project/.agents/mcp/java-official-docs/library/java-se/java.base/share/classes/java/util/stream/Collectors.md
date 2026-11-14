---
title: "Collectors class (java.util.stream) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Collectors.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collectors class (java.util.stream)

```java
public final class Collectors
```

Implementations of `Collector` that implement various useful reduction
operations, such as accumulating elements into collections, summarizing
elements according to various criteria, etc.

The following are examples of using the predefined collectors to perform
common mutable reduction tasks:

```java
// Accumulate names into a List
List<String> list = people.stream()
  .map(Person::getName)
  .collect(Collectors.toList());

// Accumulate names into a TreeSet
Set<String> set = people.stream()
  .map(Person::getName)
  .collect(Collectors.toCollection(TreeSet::new));

// Convert elements to strings and concatenate them, separated by commas
String joined = things.stream()
  .map(Object::toString)
  .collect(Collectors.joining(", "));

// Compute sum of salaries of employee
int total = employees.stream()
  .collect(Collectors.summingInt(Employee::getSalary));

// Group employees by department
Map<Department, List<Employee>> byDept = employees.stream()
  .collect(Collectors.groupingBy(Employee::getDepartment));

// Compute sum of salaries by department
Map<Department, Integer> totalByDept = employees.stream()
  .collect(Collectors.groupingBy(Employee::getDepartment,
                                 Collectors.summingInt(Employee::getSalary)));

// Partition students into passing and failing
Map<Boolean, List<Student>> passingFailing = students.stream()
  .collect(Collectors.partitioningBy(s -> s.getGrade() >= PASS_THRESHOLD));
```

**Since:** 1.8

## Collectors.toCollection(Supplier<C>)

```java
public static <T, C extends Collection<T>> Collector<T, ?, C> toCollection(Supplier<C> collectionFactory)
```

Returns a `Collector` that accumulates the input elements into a
new `Collection`, in encounter order.  The `Collection` is
created by the provided factory.

Parameters:

- `<T>`: the type of the input elements
- `<C>`: the type of the resulting `Collection`
- `collectionFactory`: a supplier providing a new empty `Collection` into which the results will be inserted

**Returns:** a `Collector` which collects all the input elements into a
`Collection`, in encounter order

## Collectors.toList()

```java
public static <T> Collector<T, ?, List<T>> toList()
```

Returns a `Collector` that accumulates the input elements into a
new `List`. There are no guarantees on the type, mutability,
serializability, or thread-safety of the `List` returned; if more
control over the returned `List` is required, use `toCollection(Supplier)`.

Parameters:

- `<T>`: the type of the input elements

**Returns:** a `Collector` which collects all the input elements into a
`List`, in encounter order

## Collectors.toUnmodifiableList()

```java
public static <T> Collector<T, ?, List<T>> toUnmodifiableList()
```

Returns a `Collector` that accumulates the input elements into an
unmodifiable List in encounter
order. The returned Collector disallows null values and will throw
`NullPointerException` if it is presented with a null value.

Parameters:

- `<T>`: the type of the input elements

**Returns:** a `Collector` that accumulates the input elements into an
unmodifiable List in encounter order

**Since:** 10

## Collectors.toSet()

```java
public static <T> Collector<T, ?, Set<T>> toSet()
```

Returns a `Collector` that accumulates the input elements into a
new `Set`. There are no guarantees on the type, mutability,
serializability, or thread-safety of the `Set` returned; if more
control over the returned `Set` is required, use
`toCollection(Supplier)`.

This is an unordered
Collector.

Parameters:

- `<T>`: the type of the input elements

**Returns:** a `Collector` which collects all the input elements into a
`Set`

## Collectors.toUnmodifiableSet()

```java
public static <T> Collector<T, ?, Set<T>> toUnmodifiableSet()
```

Returns a `Collector` that accumulates the input elements into an
unmodifiable Set. The returned
Collector disallows null values and will throw `NullPointerException`
if it is presented with a null value. If the input contains duplicate elements,
an arbitrary element of the duplicates is preserved.

This is an unordered
Collector.

Parameters:

- `<T>`: the type of the input elements

**Returns:** a `Collector` that accumulates the input elements into an
unmodifiable Set

**Since:** 10

## Collectors.joining()

```java
public static Collector<CharSequence, ?, String> joining()
```

Returns a `Collector` that concatenates the input elements into a
`String`, in encounter order.

**Returns:** a `Collector` that concatenates the input elements into a
`String`, in encounter order

## Collectors.joining(CharSequence)

```java
public static Collector<CharSequence, ?, String> joining(CharSequence delimiter)
```

Returns a `Collector` that concatenates the input elements,
separated by the specified delimiter, in encounter order.

Parameters:

- `delimiter`: the delimiter to be used between each element

**Returns:** A `Collector` which concatenates CharSequence elements,
separated by the specified delimiter, in encounter order

## Collectors.joining(CharSequence, CharSequence, CharSequence)

```java
public static Collector<CharSequence, ?, String> joining(CharSequence delimiter, CharSequence prefix, CharSequence suffix)
```

Returns a `Collector` that concatenates the input elements,
separated by the specified delimiter, with the specified prefix and
suffix, in encounter order.

Parameters:

- `delimiter`: the delimiter to be used between each element
- `prefix`: the sequence of characters to be used at the beginning of the joined result
- `suffix`: the sequence of characters to be used at the end of the joined result

**Returns:** A `Collector` which concatenates CharSequence elements,
separated by the specified delimiter, in encounter order

## Collectors.mapping(Function<? super T, ? extends U>, Collector<? super U, A, R>)

```java
public static <T, U, A, R> Collector<T, ?, R> mapping(Function<? super T, ? extends U> mapper, Collector<? super U, A, R> downstream)
```

Adapts a `Collector` accepting elements of type `U` to one
accepting elements of type `T` by applying a mapping function to
each input element before accumulation.

Parameters:

- `<T>`: the type of the input elements
- ``: type of elements accepted by downstream collector
- ``: intermediate accumulation type of the downstream collector
- `<R>`: result type of collector
- `mapper`: a function to be applied to the input elements
- `downstream`: a collector which will accept mapped values

**API note:** The `mapping()` collectors are most useful when used in a
multi-level reduction, such as downstream of a `groupingBy` or
`partitioningBy`.  For example, given a stream of
`Person`, to accumulate the set of last names in each city:

```java
Map<City, Set<String>> lastNamesByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               mapping(Person::getLastName,
                       toSet())));
```

**Returns:** a collector which applies the mapping function to the input
elements and provides the mapped results to the downstream collector

## Collectors.flatMapping(Function<? super T, ? extends Stream<? extends U>>, Collector<? super U, A, R>)

```java
public static <T, U, A, R> Collector<T, ?, R> flatMapping(Function<? super T, ? extends Stream<? extends U>> mapper, Collector<? super U, A, R> downstream)
```

Adapts a `Collector` accepting elements of type `U` to one
accepting elements of type `T` by applying a flat mapping function
to each input element before accumulation.  The flat mapping function
maps an input element to a stream covering zero or more
output elements that are then accumulated downstream.  Each mapped stream
is closed after its contents
have been placed downstream.  (If a mapped stream is `null`
an empty stream is used, instead.)

Parameters:

- `<T>`: the type of the input elements
- ``: type of elements accepted by downstream collector
- ``: intermediate accumulation type of the downstream collector
- `<R>`: result type of collector
- `mapper`: a function to be applied to the input elements, which returns a stream of results
- `downstream`: a collector which will receive the elements of the stream returned by mapper

**API note:** The `flatMapping()` collectors are most useful when used in a
multi-level reduction, such as downstream of a `groupingBy` or
`partitioningBy`.  For example, given a stream of
`Order`, to accumulate the set of line items for each customer:

```java
Map<String, Set<LineItem>> itemsByCustomerName
  = orders.stream().collect(
    groupingBy(Order::getCustomerName,
               flatMapping(order -> order.getLineItems().stream(),
                           toSet())));
```

**Returns:** a collector which applies the mapping function to the input
elements and provides the flat mapped results to the downstream collector

**Since:** 9

## Collectors.filtering(Predicate<? super T>, Collector<? super T, A, R>)

```java
public static <T, A, R> Collector<T, ?, R> filtering(Predicate<? super T> predicate, Collector<? super T, A, R> downstream)
```

Adapts a `Collector` to one accepting elements of the same type
`T` by applying the predicate to each input element and only
accumulating if the predicate returns `true`.

Parameters:

- `<T>`: the type of the input elements
- ``: intermediate accumulation type of the downstream collector
- `<R>`: result type of collector
- `predicate`: a predicate to be applied to the input elements
- `downstream`: a collector which will accept values that match the predicate

**API note:** The `filtering()` collectors are most useful when used in a
multi-level reduction, such as downstream of a `groupingBy` or
`partitioningBy`.  For example, given a stream of
`Employee`, to accumulate the employees in each department that have a
salary above a certain threshold:

```java
Map<Department, Set<Employee>> wellPaidEmployeesByDepartment
  = employees.stream().collect(
    groupingBy(Employee::getDepartment,
               filtering(e -> e.getSalary() > 2000,
                         toSet())));
```

A filtering collector differs from a stream's `filter()` operation.
In this example, suppose there are no employees whose salary is above the
threshold in some department.  Using a filtering collector as shown above
would result in a mapping from that department to an empty `Set`.
If a stream `filter()` operation were done instead, there would be
no mapping for that department at all.

**Returns:** a collector which applies the predicate to the input elements
and provides matching elements to the downstream collector

**Since:** 9

## Collectors.collectingAndThen(Collector<T,A,R>, Function<R,RR>)

```java
public static<T,A,R,RR> Collector<T,A,RR> collectingAndThen(Collector<T,A,R> downstream, Function<R,RR> finisher)
```

Adapts a `Collector` to perform an additional finishing
transformation.  For example, one could adapt the `toList()`
collector to always produce an immutable list with:

```java
List<String> list = people.stream().collect(
  collectingAndThen(toList(),
                    Collections::unmodifiableList));
```

Parameters:

- `<T>`: the type of the input elements
- ``: intermediate accumulation type of the downstream collector
- `<R>`: result type of the downstream collector
- `<RR>`: result type of the resulting collector
- `downstream`: a collector
- `finisher`: a function to be applied to the final result of the downstream collector

**Returns:** a collector which performs the action of the downstream collector,
followed by an additional finishing step

## Collectors.counting()

```java
public static <T> Collector<T, ?, Long> counting()
```

Returns a `Collector` accepting elements of type `T` that
counts the number of input elements.  If no elements are present, the
result is 0.

Parameters:

- `<T>`: the type of the input elements

**Implementation requirements:** This produces a result equivalent to:

```java
    reducing(0L, e -> 1L, Long::sum)
```

**Returns:** a `Collector` that counts the input elements

## Collectors.minBy(Comparator<? super T>)

```java
public static <T> Collector<T, ?, Optional<T>> minBy(Comparator<? super T> comparator)
```

Returns a `Collector` that produces the minimal element according
to a given `Comparator`, described as an `Optional<T>`.

Parameters:

- `<T>`: the type of the input elements
- `comparator`: a `Comparator` for comparing elements

**Implementation requirements:** This produces a result equivalent to:

```java
    reducing(BinaryOperator.minBy(comparator))
```

**Returns:** a `Collector` that produces the minimal value

## Collectors.maxBy(Comparator<? super T>)

```java
public static <T> Collector<T, ?, Optional<T>> maxBy(Comparator<? super T> comparator)
```

Returns a `Collector` that produces the maximal element according
to a given `Comparator`, described as an `Optional<T>`.

Parameters:

- `<T>`: the type of the input elements
- `comparator`: a `Comparator` for comparing elements

**Implementation requirements:** This produces a result equivalent to:

```java
    reducing(BinaryOperator.maxBy(comparator))
```

**Returns:** a `Collector` that produces the maximal value

## Collectors.summingInt(ToIntFunction<? super T>)

```java
public static <T> Collector<T, ?, Integer> summingInt(ToIntFunction<? super T> mapper)
```

Returns a `Collector` that produces the sum of an integer-valued
function applied to the input elements.  If no elements are present,
the result is 0.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: a function extracting the property to be summed

**Returns:** a `Collector` that produces the sum of a derived property

## Collectors.summingLong(ToLongFunction<? super T>)

```java
public static <T> Collector<T, ?, Long> summingLong(ToLongFunction<? super T> mapper)
```

Returns a `Collector` that produces the sum of a long-valued
function applied to the input elements.  If no elements are present,
the result is 0.

Parameters:

- `<T>`: the type of the input elements
- `mapper`: a function extracting the property to be summed

**Returns:** a `Collector` that produces the sum of a derived property
