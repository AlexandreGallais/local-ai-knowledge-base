# Collectors class (java.util.stream)

```java
public final class Collectors
```

Implementations of {@link Collector} that implement various useful reduction
operations, such as accumulating elements into collections, summarizing
elements according to various criteria, etc.

<p>The following are examples of using the predefined collectors to perform
common mutable reduction tasks:

<pre>{@code
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

}</pre>

@since 1.8

## Collectors.toCollection(Supplier<C>)

```java
public static <T, C extends Collection<T>> Collector<T, ?, C> toCollection(Supplier<C> collectionFactory)
```

Returns a {@code Collector} that accumulates the input elements into a
new {@code Collection}, in encounter order.  The {@code Collection} is
created by the provided factory.

@param <T> the type of the input elements
@param <C> the type of the resulting {@code Collection}
@param collectionFactory a supplier providing a new empty {@code Collection}
                         into which the results will be inserted
@return a {@code Collector} which collects all the input elements into a
{@code Collection}, in encounter order

## Collectors.toList()

```java
public static <T> Collector<T, ?, List<T>> toList()
```

Returns a {@code Collector} that accumulates the input elements into a
new {@code List}. There are no guarantees on the type, mutability,
serializability, or thread-safety of the {@code List} returned; if more
control over the returned {@code List} is required, use {@link #toCollection(Supplier)}.

@param <T> the type of the input elements
@return a {@code Collector} which collects all the input elements into a
{@code List}, in encounter order

## Collectors.toUnmodifiableList()

```java
public static <T> Collector<T, ?, List<T>> toUnmodifiableList()
```

Returns a {@code Collector} that accumulates the input elements into an
<a href="../List.html#unmodifiable">unmodifiable List</a> in encounter
order. The returned Collector disallows null values and will throw
{@code NullPointerException} if it is presented with a null value.

@param <T> the type of the input elements
@return a {@code Collector} that accumulates the input elements into an
<a href="../List.html#unmodifiable">unmodifiable List</a> in encounter order
@since 10

## Collectors.toSet()

```java
public static <T> Collector<T, ?, Set<T>> toSet()
```

Returns a {@code Collector} that accumulates the input elements into a
new {@code Set}. There are no guarantees on the type, mutability,
serializability, or thread-safety of the {@code Set} returned; if more
control over the returned {@code Set} is required, use
{@link #toCollection(Supplier)}.

<p>This is an {@link Collector.Characteristics#UNORDERED unordered}
Collector.

@param <T> the type of the input elements
@return a {@code Collector} which collects all the input elements into a
{@code Set}

## Collectors.toUnmodifiableSet()

```java
public static <T> Collector<T, ?, Set<T>> toUnmodifiableSet()
```

Returns a {@code Collector} that accumulates the input elements into an
<a href="../Set.html#unmodifiable">unmodifiable Set</a>. The returned
Collector disallows null values and will throw {@code NullPointerException}
if it is presented with a null value. If the input contains duplicate elements,
an arbitrary element of the duplicates is preserved.

<p>This is an {@link Collector.Characteristics#UNORDERED unordered}
Collector.

@param <T> the type of the input elements
@return a {@code Collector} that accumulates the input elements into an
<a href="../Set.html#unmodifiable">unmodifiable Set</a>
@since 10

## Collectors.joining()

```java
public static Collector<CharSequence, ?, String> joining()
```

Returns a {@code Collector} that concatenates the input elements into a
{@code String}, in encounter order.

@return a {@code Collector} that concatenates the input elements into a
{@code String}, in encounter order

## Collectors.joining(CharSequence)

```java
public static Collector<CharSequence, ?, String> joining(CharSequence delimiter)
```

Returns a {@code Collector} that concatenates the input elements,
separated by the specified delimiter, in encounter order.

@param delimiter the delimiter to be used between each element
@return A {@code Collector} which concatenates CharSequence elements,
separated by the specified delimiter, in encounter order

## Collectors.joining(CharSequence, CharSequence, CharSequence)

```java
public static Collector<CharSequence, ?, String> joining(CharSequence delimiter, CharSequence prefix, CharSequence suffix)
```

Returns a {@code Collector} that concatenates the input elements,
separated by the specified delimiter, with the specified prefix and
suffix, in encounter order.

@param delimiter the delimiter to be used between each element
@param  prefix the sequence of characters to be used at the beginning
               of the joined result
@param  suffix the sequence of characters to be used at the end
               of the joined result
@return A {@code Collector} which concatenates CharSequence elements,
separated by the specified delimiter, in encounter order

## Collectors.mapping(Function<? super T, ? extends U>, Collector<? super U, A, R>)

```java
public static <T, U, A, R> Collector<T, ?, R> mapping(Function<? super T, ? extends U> mapper, Collector<? super U, A, R> downstream)
```

Adapts a {@code Collector} accepting elements of type {@code U} to one
accepting elements of type {@code T} by applying a mapping function to
each input element before accumulation.

@apiNote
The {@code mapping()} collectors are most useful when used in a
multi-level reduction, such as downstream of a {@code groupingBy} or
{@code partitioningBy}.  For example, given a stream of
{@code Person}, to accumulate the set of last names in each city:
<pre>{@code
Map<City, Set<String>> lastNamesByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               mapping(Person::getLastName,
                       toSet())));
}</pre>

@param <T> the type of the input elements
@param <U> type of elements accepted by downstream collector
@param <A> intermediate accumulation type of the downstream collector
@param <R> result type of collector
@param mapper a function to be applied to the input elements
@param downstream a collector which will accept mapped values
@return a collector which applies the mapping function to the input
elements and provides the mapped results to the downstream collector

## Collectors.flatMapping(Function<? super T, ? extends Stream<? extends U>>, Collector<? super U, A, R>)

```java
public static <T, U, A, R> Collector<T, ?, R> flatMapping(Function<? super T, ? extends Stream<? extends U>> mapper, Collector<? super U, A, R> downstream)
```

Adapts a {@code Collector} accepting elements of type {@code U} to one
accepting elements of type {@code T} by applying a flat mapping function
to each input element before accumulation.  The flat mapping function
maps an input element to a {@link Stream stream} covering zero or more
output elements that are then accumulated downstream.  Each mapped stream
is {@link java.util.stream.BaseStream#close() closed} after its contents
have been placed downstream.  (If a mapped stream is {@code null}
an empty stream is used, instead.)

@apiNote
The {@code flatMapping()} collectors are most useful when used in a
multi-level reduction, such as downstream of a {@code groupingBy} or
{@code partitioningBy}.  For example, given a stream of
{@code Order}, to accumulate the set of line items for each customer:
<pre>{@code
Map<String, Set<LineItem>> itemsByCustomerName
  = orders.stream().collect(
    groupingBy(Order::getCustomerName,
               flatMapping(order -> order.getLineItems().stream(),
                           toSet())));
}</pre>

@param <T> the type of the input elements
@param <U> type of elements accepted by downstream collector
@param <A> intermediate accumulation type of the downstream collector
@param <R> result type of collector
@param mapper a function to be applied to the input elements, which
returns a stream of results
@param downstream a collector which will receive the elements of the
stream returned by mapper
@return a collector which applies the mapping function to the input
elements and provides the flat mapped results to the downstream collector
@since 9

## Collectors.filtering(Predicate<? super T>, Collector<? super T, A, R>)

```java
public static <T, A, R> Collector<T, ?, R> filtering(Predicate<? super T> predicate, Collector<? super T, A, R> downstream)
```

Adapts a {@code Collector} to one accepting elements of the same type
{@code T} by applying the predicate to each input element and only
accumulating if the predicate returns {@code true}.

@apiNote
The {@code filtering()} collectors are most useful when used in a
multi-level reduction, such as downstream of a {@code groupingBy} or
{@code partitioningBy}.  For example, given a stream of
{@code Employee}, to accumulate the employees in each department that have a
salary above a certain threshold:
<pre>{@code
Map<Department, Set<Employee>> wellPaidEmployeesByDepartment
  = employees.stream().collect(
    groupingBy(Employee::getDepartment,
               filtering(e -> e.getSalary() > 2000,
                         toSet())));
}</pre>
A filtering collector differs from a stream's {@code filter()} operation.
In this example, suppose there are no employees whose salary is above the
threshold in some department.  Using a filtering collector as shown above
would result in a mapping from that department to an empty {@code Set}.
If a stream {@code filter()} operation were done instead, there would be
no mapping for that department at all.

@param <T> the type of the input elements
@param <A> intermediate accumulation type of the downstream collector
@param <R> result type of collector
@param predicate a predicate to be applied to the input elements
@param downstream a collector which will accept values that match the
predicate
@return a collector which applies the predicate to the input elements
and provides matching elements to the downstream collector
@since 9

## Collectors.collectingAndThen(Collector<T,A,R>, Function<R,RR>)

```java
public static<T,A,R,RR> Collector<T,A,RR> collectingAndThen(Collector<T,A,R> downstream, Function<R,RR> finisher)
```

Adapts a {@code Collector} to perform an additional finishing
transformation.  For example, one could adapt the {@link #toList()}
collector to always produce an immutable list with:
<pre>{@code
List<String> list = people.stream().collect(
  collectingAndThen(toList(),
                    Collections::unmodifiableList));
}</pre>

@param <T> the type of the input elements
@param <A> intermediate accumulation type of the downstream collector
@param <R> result type of the downstream collector
@param <RR> result type of the resulting collector
@param downstream a collector
@param finisher a function to be applied to the final result of the downstream collector
@return a collector which performs the action of the downstream collector,
followed by an additional finishing step

## Collectors.counting()

```java
public static <T> Collector<T, ?, Long> counting()
```

Returns a {@code Collector} accepting elements of type {@code T} that
counts the number of input elements.  If no elements are present, the
result is 0.

@implSpec
This produces a result equivalent to:
<pre>{@code
    reducing(0L, e -> 1L, Long::sum)
}</pre>

@param <T> the type of the input elements
@return a {@code Collector} that counts the input elements

## Collectors.minBy(Comparator<? super T>)

```java
public static <T> Collector<T, ?, Optional<T>> minBy(Comparator<? super T> comparator)
```

Returns a {@code Collector} that produces the minimal element according
to a given {@code Comparator}, described as an {@code Optional<T>}.

@implSpec
This produces a result equivalent to:
<pre>{@code
    reducing(BinaryOperator.minBy(comparator))
}</pre>

@param <T> the type of the input elements
@param comparator a {@code Comparator} for comparing elements
@return a {@code Collector} that produces the minimal value

## Collectors.maxBy(Comparator<? super T>)

```java
public static <T> Collector<T, ?, Optional<T>> maxBy(Comparator<? super T> comparator)
```

Returns a {@code Collector} that produces the maximal element according
to a given {@code Comparator}, described as an {@code Optional<T>}.

@implSpec
This produces a result equivalent to:
<pre>{@code
    reducing(BinaryOperator.maxBy(comparator))
}</pre>

@param <T> the type of the input elements
@param comparator a {@code Comparator} for comparing elements
@return a {@code Collector} that produces the maximal value

## Collectors.summingInt(ToIntFunction<? super T>)

```java
public static <T> Collector<T, ?, Integer> summingInt(ToIntFunction<? super T> mapper)
```

Returns a {@code Collector} that produces the sum of an integer-valued
function applied to the input elements.  If no elements are present,
the result is 0.

@param <T> the type of the input elements
@param mapper a function extracting the property to be summed
@return a {@code Collector} that produces the sum of a derived property

## Collectors.summingLong(ToLongFunction<? super T>)

```java
public static <T> Collector<T, ?, Long> summingLong(ToLongFunction<? super T> mapper)
```

Returns a {@code Collector} that produces the sum of a long-valued
function applied to the input elements.  If no elements are present,
the result is 0.

@param <T> the type of the input elements
@param mapper a function extracting the property to be summed
@return a {@code Collector} that produces the sum of a derived property

## Collectors.summingDouble(ToDoubleFunction<? super T>)

```java
public static <T> Collector<T, ?, Double> summingDouble(ToDoubleFunction<? super T> mapper)
```

Returns a {@code Collector} that produces the sum of a double-valued
function applied to the input elements.  If no elements are present,
the result is 0.

<p>The sum returned can vary depending upon the order in which
values are recorded, due to accumulated rounding error in
addition of values of differing magnitudes. Values sorted by increasing
absolute magnitude tend to yield more accurate results.  If any recorded
value is a {@code NaN} or the sum is at any point a {@code NaN} then the
sum will be {@code NaN}.

@param <T> the type of the input elements
@param mapper a function extracting the property to be summed
@return a {@code Collector} that produces the sum of a derived property

## Collectors.averagingInt(ToIntFunction<? super T>)

```java
public static <T> Collector<T, ?, Double> averagingInt(ToIntFunction<? super T> mapper)
```

Returns a {@code Collector} that produces the arithmetic mean of an integer-valued
function applied to the input elements.  If no elements are present,
the result is 0.

@param <T> the type of the input elements
@param mapper a function extracting the property to be averaged
@return a {@code Collector} that produces the arithmetic mean of a
derived property

## Collectors.averagingLong(ToLongFunction<? super T>)

```java
public static <T> Collector<T, ?, Double> averagingLong(ToLongFunction<? super T> mapper)
```

Returns a {@code Collector} that produces the arithmetic mean of a long-valued
function applied to the input elements.  If no elements are present,
the result is 0.

@param <T> the type of the input elements
@param mapper a function extracting the property to be averaged
@return a {@code Collector} that produces the arithmetic mean of a
derived property

## Collectors.averagingDouble(ToDoubleFunction<? super T>)

```java
public static <T> Collector<T, ?, Double> averagingDouble(ToDoubleFunction<? super T> mapper)
```

Returns a {@code Collector} that produces the arithmetic mean of a double-valued
function applied to the input elements.  If no elements are present,
the result is 0.

<p>The average returned can vary depending upon the order in which
values are recorded, due to accumulated rounding error in
addition of values of differing magnitudes. Values sorted by increasing
absolute magnitude tend to yield more accurate results.  If any recorded
value is a {@code NaN} or the sum is at any point a {@code NaN} then the
average will be {@code NaN}.

@implNote The {@code double} format can represent all
consecutive integers in the range -2<sup>53</sup> to
2<sup>53</sup>. If the pipeline has more than 2<sup>53</sup>
values, the divisor in the average computation will saturate at
2<sup>53</sup>, leading to additional numerical errors.

@param <T> the type of the input elements
@param mapper a function extracting the property to be averaged
@return a {@code Collector} that produces the arithmetic mean of a
derived property

## Collectors.reducing(T, BinaryOperator<T>)

```java
public static <T> Collector<T, ?, T> reducing(T identity, BinaryOperator<T> op)
```

Returns a {@code Collector} which performs a reduction of its
input elements under a specified {@code BinaryOperator} using the
provided identity.

@apiNote
The {@code reducing()} collectors are most useful when used in a
multi-level reduction, downstream of {@code groupingBy} or
{@code partitioningBy}.  To perform a simple reduction on a stream,
use {@link Stream#reduce(Object, BinaryOperator)} instead.

@param <T> element type for the input and output of the reduction
@param identity the identity value for the reduction (also, the value
                that is returned when there are no input elements)
@param op a {@code BinaryOperator<T>} used to reduce the input elements
@return a {@code Collector} which implements the reduction operation

@see #reducing(BinaryOperator)
@see #reducing(Object, Function, BinaryOperator)

## Collectors.reducing(BinaryOperator<T>)

```java
public static <T> Collector<T, ?, Optional<T>> reducing(BinaryOperator<T> op)
```

Returns a {@code Collector} which performs a reduction of its
input elements under a specified {@code BinaryOperator}.  The result
is described as an {@code Optional<T>}.

@apiNote
The {@code reducing()} collectors are most useful when used in a
multi-level reduction, downstream of {@code groupingBy} or
{@code partitioningBy}.  To perform a simple reduction on a stream,
use {@link Stream#reduce(BinaryOperator)} instead.

<p>For example, given a stream of {@code Person}, to calculate tallest
person in each city:
<pre>{@code
Comparator<Person> byHeight = Comparator.comparing(Person::getHeight);
Map<City, Optional<Person>> tallestByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               reducing(BinaryOperator.maxBy(byHeight))));
}</pre>

@param <T> element type for the input and output of the reduction
@param op a {@code BinaryOperator<T>} used to reduce the input elements
@return a {@code Collector} which implements the reduction operation

@see #reducing(Object, BinaryOperator)
@see #reducing(Object, Function, BinaryOperator)

## Collectors.reducing(U, Function<? super T, ? extends U>, BinaryOperator<U>)

```java
public static <T, U> Collector<T, ?, U> reducing(U identity, Function<? super T, ? extends U> mapper, BinaryOperator<U> op)
```

Returns a {@code Collector} which performs a reduction of its
input elements under a specified mapping function and
{@code BinaryOperator}. This is a generalization of
{@link #reducing(Object, BinaryOperator)} which allows a transformation
of the elements before reduction.

@apiNote
The {@code reducing()} collectors are most useful when used in a
multi-level reduction, downstream of {@code groupingBy} or
{@code partitioningBy}.  To perform a simple map-reduce on a stream,
use {@link Stream#map(Function)} and {@link Stream#reduce(Object, BinaryOperator)}
instead.

<p>For example, given a stream of {@code Person}, to calculate the longest
last name of residents in each city:
<pre>{@code
Comparator<String> byLength = Comparator.comparing(String::length);
Map<City, String> longestLastNameByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               reducing("",
                        Person::getLastName,
                        BinaryOperator.maxBy(byLength))));
}</pre>

@param <T> the type of the input elements
@param <U> the type of the mapped values
@param identity the identity value for the reduction (also, the value
                that is returned when there are no input elements)
@param mapper a mapping function to apply to each input value
@param op a {@code BinaryOperator<U>} used to reduce the mapped values
@return a {@code Collector} implementing the map-reduce operation

@see #reducing(Object, BinaryOperator)
@see #reducing(BinaryOperator)

## Collectors.groupingBy(Function<? super T, ? extends K>)

```java
public static <T, K> Collector<T, ?, Map<K, List<T>>> groupingBy(Function<? super T, ? extends K> classifier)
```

Returns a {@code Collector} implementing a "group by" operation on
input elements of type {@code T}, grouping elements according to a
classification function, and returning the results in a {@code Map}.

<p>The classification function maps elements to some key type {@code K}.
The collector produces a {@code Map<K, List<T>>} whose keys are the
values resulting from applying the classification function to the input
elements, and whose corresponding values are {@code List}s containing the
input elements which map to the associated key under the classification
function.

<p>There are no guarantees on the type, mutability, serializability, or
thread-safety of the {@code Map} or {@code List} objects returned.
@implSpec
This produces a result similar to:
<pre>{@code
    groupingBy(classifier, toList());
}</pre>

@implNote
The returned {@code Collector} is not concurrent.  For parallel stream
pipelines, the {@code combiner} function operates by merging the keys
from one map into another, which can be an expensive operation.  If
preservation of the order in which elements appear in the resulting {@code Map}
collector is not required, using {@link #groupingByConcurrent(Function)}
may offer better parallel performance.

@param <T> the type of the input elements
@param <K> the type of the keys
@param classifier the classifier function mapping input elements to keys
@return a {@code Collector} implementing the group-by operation

@see #groupingBy(Function, Collector)
@see #groupingBy(Function, Supplier, Collector)
@see #groupingByConcurrent(Function)

## Collectors.groupingBy(Function<? super T, ? extends K>, Collector<? super T, A, D>)

```java
public static <T, K, A, D> Collector<T, ?, Map<K, D>> groupingBy(Function<? super T, ? extends K> classifier, Collector<? super T, A, D> downstream)
```

Returns a {@code Collector} implementing a cascaded "group by" operation
on input elements of type {@code T}, grouping elements according to a
classification function, and then performing a reduction operation on
the values associated with a given key using the specified downstream
{@code Collector}.

<p>The classification function maps elements to some key type {@code K}.
The downstream collector operates on elements of type {@code T} and
produces a result of type {@code D}. The resulting collector produces a
{@code Map<K, D>}.

<p>There are no guarantees on the type, mutability,
serializability, or thread-safety of the {@code Map} returned.

<p>For example, to compute the set of last names of people in each city:
<pre>{@code
Map<City, Set<String>> namesByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               mapping(Person::getLastName,
                       toSet())));
}</pre>

@implNote
The returned {@code Collector} is not concurrent.  For parallel stream
pipelines, the {@code combiner} function operates by merging the keys
from one map into another, which can be an expensive operation.  If
preservation of the order in which elements are presented to the downstream
collector is not required, using {@link #groupingByConcurrent(Function, Collector)}
may offer better parallel performance.

@param <T> the type of the input elements
@param <K> the type of the keys
@param <A> the intermediate accumulation type of the downstream collector
@param <D> the result type of the downstream reduction
@param classifier a classifier function mapping input elements to keys
@param downstream a {@code Collector} implementing the downstream reduction
@return a {@code Collector} implementing the cascaded group-by operation
@see #groupingBy(Function)

@see #groupingBy(Function, Supplier, Collector)
@see #groupingByConcurrent(Function, Collector)

## Collectors.groupingBy(Function<? super T, ? extends K>, Supplier<M>, Collector<? super T, A, D>)

```java
public static <T, K, D, A, M extends Map<K, D>> Collector<T, ?, M> groupingBy(Function<? super T, ? extends K> classifier, Supplier<M> mapFactory, Collector<? super T, A, D> downstream)
```

Returns a {@code Collector} implementing a cascaded "group by" operation
on input elements of type {@code T}, grouping elements according to a
classification function, and then performing a reduction operation on
the values associated with a given key using the specified downstream
{@code Collector}.  The {@code Map} produced by the Collector is created
with the supplied factory function.

<p>The classification function maps elements to some key type {@code K}.
The downstream collector operates on elements of type {@code T} and
produces a result of type {@code D}. The resulting collector produces a
{@code Map<K, D>}.

<p>For example, to compute the set of last names of people in each city,
where the city names are sorted:
<pre>{@code
Map<City, Set<String>> namesByCity
  = people.stream().collect(
    groupingBy(Person::getCity,
               TreeMap::new,
               mapping(Person::getLastName,
                       toSet())));
}</pre>

@implNote
The returned {@code Collector} is not concurrent.  For parallel stream
pipelines, the {@code combiner} function operates by merging the keys
from one map into another, which can be an expensive operation.  If
preservation of the order in which elements are presented to the downstream
collector is not required, using {@link #groupingByConcurrent(Function, Supplier, Collector)}
may offer better parallel performance.

@param <T> the type of the input elements
@param <K> the type of the keys
@param <D> the result type of the downstream reduction
@param <A> the intermediate accumulation type of the downstream collector
@param <M> the type of the resulting {@code Map}
@param classifier a classifier function mapping input elements to keys
@param mapFactory a supplier providing a new empty {@code Map}
                  into which the results will be inserted
@param downstream a {@code Collector} implementing the downstream reduction
@return a {@code Collector} implementing the cascaded group-by operation

@see #groupingBy(Function, Collector)
@see #groupingBy(Function)
@see #groupingByConcurrent(Function, Supplier, Collector)

## Collectors.groupingByConcurrent(Function<? super T, ? extends K>)

```java
public static <T, K> Collector<T, ?, ConcurrentMap<K, List<T>>> groupingByConcurrent(Function<? super T, ? extends K> classifier)
```

Returns a concurrent {@code Collector} implementing a "group by"
operation on input elements of type {@code T}, grouping elements
according to a classification function.

<p>This is a {@link Collector.Characteristics#CONCURRENT concurrent} and
{@link Collector.Characteristics#UNORDERED unordered} Collector.

<p>The classification function maps elements to some key type {@code K}.
The collector produces a {@code ConcurrentMap<K, List<T>>} whose keys are the
values resulting from applying the classification function to the input
elements, and whose corresponding values are {@code List}s containing the
input elements which map to the associated key under the classification
function.

<p>There are no guarantees on the type, mutability, or serializability
of the {@code ConcurrentMap} or {@code List} objects returned, or of the
thread-safety of the {@code List} objects returned.
@implSpec
This produces a result similar to:
<pre>{@code
    groupingByConcurrent(classifier, toList());
}</pre>

@param <T> the type of the input elements
@param <K> the type of the keys
@param classifier a classifier function mapping input elements to keys
@return a concurrent, unordered {@code Collector} implementing the group-by operation

@see #groupingBy(Function)
@see #groupingByConcurrent(Function, Collector)
@see #groupingByConcurrent(Function, Supplier, Collector)

## Collectors.groupingByConcurrent(Function<? super T, ? extends K>, Collector<? super T, A, D>)

```java
public static <T, K, A, D> Collector<T, ?, ConcurrentMap<K, D>> groupingByConcurrent(Function<? super T, ? extends K> classifier, Collector<? super T, A, D> downstream)
```

Returns a concurrent {@code Collector} implementing a cascaded "group by"
operation on input elements of type {@code T}, grouping elements
according to a classification function, and then performing a reduction
operation on the values associated with a given key using the specified
downstream {@code Collector}.

<p>This is a {@link Collector.Characteristics#CONCURRENT concurrent} and
{@link Collector.Characteristics#UNORDERED unordered} Collector.

<p>The classification function maps elements to some key type {@code K}.
The downstream collector operates on elements of type {@code T} and
produces a result of type {@code D}. The resulting collector produces a
{@code ConcurrentMap<K, D>}.

<p>There are no guarantees on the type, mutability, or serializability
of the {@code ConcurrentMap} returned.

<p>For example, to compute the set of last names of people in each city,
where the city names are sorted:
<pre>{@code
ConcurrentMap<City, Set<String>> namesByCity
  = people.stream().collect(
    groupingByConcurrent(Person::getCity,
                         mapping(Person::getLastName,
                                 toSet())));
}</pre>

@param <T> the type of the input elements
@param <K> the type of the keys
@param <A> the intermediate accumulation type of the downstream collector
@param <D> the result type of the downstream reduction
@param classifier a classifier function mapping input elements to keys
@param downstream a {@code Collector} implementing the downstream reduction
@return a concurrent, unordered {@code Collector} implementing the cascaded group-by operation

@see #groupingBy(Function, Collector)
@see #groupingByConcurrent(Function)
@see #groupingByConcurrent(Function, Supplier, Collector)

## Collectors.groupingByConcurrent(Function<? super T, ? extends K>, Supplier<M>, Collector<? super T, A, D>)

```java
public static <T, K, A, D, M extends ConcurrentMap<K, D>> Collector<T, ?, M> groupingByConcurrent(Function<? super T, ? extends K> classifier, Supplier<M> mapFactory, Collector<? super T, A, D> downstream)
```

Returns a concurrent {@code Collector} implementing a cascaded "group by"
operation on input elements of type {@code T}, grouping elements
according to a classification function, and then performing a reduction
operation on the values associated with a given key using the specified
downstream {@code Collector}.  The {@code ConcurrentMap} produced by the
Collector is created with the supplied factory function.

<p>This is a {@link Collector.Characteristics#CONCURRENT concurrent} and
{@link Collector.Characteristics#UNORDERED unordered} Collector.

<p>The classification function maps elements to some key type {@code K}.
The downstream collector operates on elements of type {@code T} and
produces a result of type {@code D}. The resulting collector produces a
{@code ConcurrentMap<K, D>}.

<p>For example, to compute the set of last names of people in each city,
where the city names are sorted:
<pre>{@code
ConcurrentMap<City, Set<String>> namesByCity
  = people.stream().collect(
    groupingByConcurrent(Person::getCity,
                         ConcurrentSkipListMap::new,
                         mapping(Person::getLastName,
                                 toSet())));
}</pre>

@param <T> the type of the input elements
@param <K> the type of the keys
@param <A> the intermediate accumulation type of the downstream collector
@param <D> the result type of the downstream reduction
@param <M> the type of the resulting {@code ConcurrentMap}
@param classifier a classifier function mapping input elements to keys
@param mapFactory a supplier providing a new empty {@code ConcurrentMap}
                  into which the results will be inserted
@param downstream a {@code Collector} implementing the downstream reduction
@return a concurrent, unordered {@code Collector} implementing the cascaded group-by operation

@see #groupingByConcurrent(Function)
@see #groupingByConcurrent(Function, Collector)
@see #groupingBy(Function, Supplier, Collector)

## Collectors.partitioningBy(Predicate<? super T>)

```java
public static <T> Collector<T, ?, Map<Boolean, List<T>>> partitioningBy(Predicate<? super T> predicate)
```

Returns a {@code Collector} which partitions the input elements according
to a {@code Predicate}, and organizes them into a
{@code Map<Boolean, List<T>>}.

The returned {@code Map} always contains mappings for both
{@code false} and {@code true} keys.
There are no guarantees on the type, mutability,
serializability, or thread-safety of the {@code Map} or {@code List}
returned.

@apiNote
If a partition has no elements, its value in the result Map will be
an empty List.

@param <T> the type of the input elements
@param predicate a predicate used for classifying input elements
@return a {@code Collector} implementing the partitioning operation

@see #partitioningBy(Predicate, Collector)

## Collectors.partitioningBy(Predicate<? super T>, Collector<? super T, A, D>)

```java
public static <T, D, A> Collector<T, ?, Map<Boolean, D>> partitioningBy(Predicate<? super T> predicate, Collector<? super T, A, D> downstream)
```

Returns a {@code Collector} which partitions the input elements according
to a {@code Predicate}, reduces the values in each partition according to
another {@code Collector}, and organizes them into a
{@code Map<Boolean, D>} whose values are the result of the downstream
reduction.

<p>
The returned {@code Map} always contains mappings for both
{@code false} and {@code true} keys.
There are no guarantees on the type, mutability,
serializability, or thread-safety of the {@code Map} returned.

@apiNote
If a partition has no elements, its value in the result Map will be
obtained by calling the downstream collector's supplier function and then
applying the finisher function.

@param <T> the type of the input elements
@param <D> the result type of the downstream reduction
@param <A> the intermediate accumulation type of the downstream collector
@param predicate a predicate used for classifying input elements
@param downstream a {@code Collector} implementing the downstream
                  reduction
@return a {@code Collector} implementing the cascaded partitioning
        operation

@see #partitioningBy(Predicate)

## Collectors.toMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>)

```java
public static <T, K, U> Collector<T, ?, Map<K,U>> toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper)
```

Returns a {@code Collector} that accumulates elements into a
{@code Map} whose keys and values are the result of applying the provided
mapping functions to the input elements.

<p>If the mapped keys contain duplicates (according to
{@link Object#equals(Object)}), an {@code IllegalStateException} is
thrown when the collection operation is performed.  If the mapped keys
might have duplicates, use {@link #toMap(Function, Function, BinaryOperator)}
instead.

<p>There are no guarantees on the type, mutability, serializability,
or thread-safety of the {@code Map} returned.

@apiNote
It is common for either the key or the value to be the input elements.
In this case, the utility method
{@link java.util.function.Function#identity()} may be helpful.
For example, the following produces a {@code Map} mapping
students to their grade point average:
<pre>{@code
Map<Student, Double> studentToGPA
  = students.stream().collect(
    toMap(Function.identity(),
          student -> computeGPA(student)));
}</pre>
And the following produces a {@code Map} mapping a unique identifier to
students:
<pre>{@code
Map<String, Student> studentIdToStudent
  = students.stream().collect(
    toMap(Student::getId,
          Function.identity()));
}</pre>

@implNote
The returned {@code Collector} is not concurrent.  For parallel stream
pipelines, the {@code combiner} function operates by merging the keys
from one map into another, which can be an expensive operation.  If it is
not required that results are inserted into the {@code Map} in encounter
order, using {@link #toConcurrentMap(Function, Function)}
may offer better parallel performance.

@param <T> the type of the input elements
@param <K> the output type of the key mapping function
@param <U> the output type of the value mapping function
@param keyMapper a mapping function to produce keys
@param valueMapper a mapping function to produce values
@return a {@code Collector} which collects elements into a {@code Map}
whose keys and values are the result of applying mapping functions to
the input elements

@see #toMap(Function, Function, BinaryOperator)
@see #toMap(Function, Function, BinaryOperator, Supplier)
@see #toConcurrentMap(Function, Function)

## Collectors.toMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>, BinaryOperator<U>)

```java
public static <T, K, U> Collector<T, ?, Map<K,U>> toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction)
```

Returns a {@code Collector} that accumulates elements into a
{@code Map} whose keys and values are the result of applying the provided
mapping functions to the input elements.

<p>If the mapped
keys contain duplicates (according to {@link Object#equals(Object)}),
the value mapping function is applied to each equal element, and the
results are merged using the provided merging function.

<p>There are no guarantees on the type, mutability, serializability,
or thread-safety of the {@code Map} returned.

@apiNote
There are multiple ways to deal with collisions between multiple elements
mapping to the same key.  The other forms of {@code toMap} simply use
a merge function that throws unconditionally, but you can easily write
more flexible merge policies.  For example, if you have a stream
of {@code Person}, and you want to produce a "phone book" mapping name to
address, but it is possible that two persons have the same name, you can
do as follows to gracefully deal with these collisions, and produce a
{@code Map} mapping names to a concatenated list of addresses:
<pre>{@code
Map<String, String> phoneBook
  = people.stream().collect(
    toMap(Person::getName,
          Person::getAddress,
          (s, a) -> s + ", " + a));
}</pre>

@implNote
The returned {@code Collector} is not concurrent.  For parallel stream
pipelines, the {@code combiner} function operates by merging the keys
from one map into another, which can be an expensive operation.  If it is
not required that results are merged into the {@code Map} in encounter
order, using {@link #toConcurrentMap(Function, Function, BinaryOperator)}
may offer better parallel performance.

@param <T> the type of the input elements
@param <K> the output type of the key mapping function
@param <U> the output type of the value mapping function
@param keyMapper a mapping function to produce keys
@param valueMapper a mapping function to produce values
@param mergeFunction a merge function, used to resolve collisions between
                     values associated with the same key, as supplied
                     to {@link Map#merge(Object, Object, BiFunction)}
@return a {@code Collector} which collects elements into a {@code Map}
whose keys are the result of applying a key mapping function to the input
elements, and whose values are the result of applying a value mapping
function to all input elements equal to the key and combining them
using the merge function

@see #toMap(Function, Function)
@see #toMap(Function, Function, BinaryOperator, Supplier)
@see #toConcurrentMap(Function, Function, BinaryOperator)

## Collectors.toMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>, BinaryOperator<U>, Supplier<M>)

```java
public static <T, K, U, M extends Map<K, U>> Collector<T, ?, M> toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction, Supplier<M> mapFactory)
```

Returns a {@code Collector} that accumulates elements into a
{@code Map} whose keys and values are the result of applying the provided
mapping functions to the input elements.

<p>If the mapped
keys contain duplicates (according to {@link Object#equals(Object)}),
the value mapping function is applied to each equal element, and the
results are merged using the provided merging function.  The {@code Map}
is created by a provided supplier function.

@implNote
The returned {@code Collector} is not concurrent.  For parallel stream
pipelines, the {@code combiner} function operates by merging the keys
from one map into another, which can be an expensive operation.  If it is
not required that results are merged into the {@code Map} in encounter
order, using {@link #toConcurrentMap(Function, Function, BinaryOperator, Supplier)}
may offer better parallel performance.

@param <T> the type of the input elements
@param <K> the output type of the key mapping function
@param <U> the output type of the value mapping function
@param <M> the type of the resulting {@code Map}
@param keyMapper a mapping function to produce keys
@param valueMapper a mapping function to produce values
@param mergeFunction a merge function, used to resolve collisions between
                     values associated with the same key, as supplied
                     to {@link Map#merge(Object, Object, BiFunction)}
@param mapFactory a supplier providing a new empty {@code Map}
                  into which the results will be inserted
@return a {@code Collector} which collects elements into a {@code Map}
whose keys are the result of applying a key mapping function to the input
elements, and whose values are the result of applying a value mapping
function to all input elements equal to the key and combining them
using the merge function

@see #toMap(Function, Function)
@see #toMap(Function, Function, BinaryOperator)
@see #toConcurrentMap(Function, Function, BinaryOperator, Supplier)

## Collectors.toConcurrentMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>)

```java
public static <T, K, U> Collector<T, ?, ConcurrentMap<K,U>> toConcurrentMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper)
```

Returns a concurrent {@code Collector} that accumulates elements into a
{@code ConcurrentMap} whose keys and values are the result of applying
the provided mapping functions to the input elements.

<p>If the mapped keys contain duplicates (according to
{@link Object#equals(Object)}), an {@code IllegalStateException} is
thrown when the collection operation is performed.  If the mapped keys
may have duplicates, use
{@link #toConcurrentMap(Function, Function, BinaryOperator)} instead.

<p>There are no guarantees on the type, mutability, or serializability
of the {@code ConcurrentMap} returned.

@apiNote
It is common for either the key or the value to be the input elements.
In this case, the utility method
{@link java.util.function.Function#identity()} may be helpful.
For example, the following produces a {@code ConcurrentMap} mapping
students to their grade point average:
<pre>{@code
ConcurrentMap<Student, Double> studentToGPA
  = students.stream().collect(
    toConcurrentMap(Function.identity(),
                    student -> computeGPA(student)));
}</pre>
And the following produces a {@code ConcurrentMap} mapping a
unique identifier to students:
<pre>{@code
ConcurrentMap<String, Student> studentIdToStudent
  = students.stream().collect(
    toConcurrentMap(Student::getId,
                    Function.identity()));
}</pre>

<p>This is a {@link Collector.Characteristics#CONCURRENT concurrent} and
{@link Collector.Characteristics#UNORDERED unordered} Collector.

@param <T> the type of the input elements
@param <K> the output type of the key mapping function
@param <U> the output type of the value mapping function
@param keyMapper the mapping function to produce keys
@param valueMapper the mapping function to produce values
@return a concurrent, unordered {@code Collector} which collects elements into a
{@code ConcurrentMap} whose keys are the result of applying a key mapping
function to the input elements, and whose values are the result of
applying a value mapping function to the input elements

@see #toMap(Function, Function)
@see #toConcurrentMap(Function, Function, BinaryOperator)
@see #toConcurrentMap(Function, Function, BinaryOperator, Supplier)

## Collectors.toConcurrentMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>, BinaryOperator<U>)

```java
public static <T, K, U> Collector<T, ?, ConcurrentMap<K,U>> toConcurrentMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction)
```

Returns a concurrent {@code Collector} that accumulates elements into a
{@code ConcurrentMap} whose keys and values are the result of applying
the provided mapping functions to the input elements.

<p>If the mapped keys contain duplicates (according to {@link Object#equals(Object)}),
the value mapping function is applied to each equal element, and the
results are merged using the provided merging function.

<p>There are no guarantees on the type, mutability, or serializability
of the {@code ConcurrentMap} returned.

@apiNote
There are multiple ways to deal with collisions between multiple elements
mapping to the same key.  The other forms of {@code toConcurrentMap} simply use
a merge function that throws unconditionally, but you can easily write
more flexible merge policies.  For example, if you have a stream
of {@code Person}, and you want to produce a "phone book" mapping name to
address, but it is possible that two persons have the same name, you can
do as follows to gracefully deal with these collisions, and produce a
{@code ConcurrentMap} mapping names to a concatenated list of addresses:
<pre>{@code
ConcurrentMap<String, String> phoneBook
  = people.stream().collect(
    toConcurrentMap(Person::getName,
                    Person::getAddress,
                    (s, a) -> s + ", " + a));
}</pre>

<p>This is a {@link Collector.Characteristics#CONCURRENT concurrent} and
{@link Collector.Characteristics#UNORDERED unordered} Collector.

@param <T> the type of the input elements
@param <K> the output type of the key mapping function
@param <U> the output type of the value mapping function
@param keyMapper a mapping function to produce keys
@param valueMapper a mapping function to produce values
@param mergeFunction a merge function, used to resolve collisions between
                     values associated with the same key, as supplied
                     to {@link Map#merge(Object, Object, BiFunction)}
@return a concurrent, unordered {@code Collector} which collects elements into a
{@code ConcurrentMap} whose keys are the result of applying a key mapping
function to the input elements, and whose values are the result of
applying a value mapping function to all input elements equal to the key
and combining them using the merge function

@see #toConcurrentMap(Function, Function)
@see #toConcurrentMap(Function, Function, BinaryOperator, Supplier)
@see #toMap(Function, Function, BinaryOperator)

## Collectors.toConcurrentMap(Function<? super T, ? extends K>, Function<? super T, ? extends U>, BinaryOperator<U>, Supplier<M>)

```java
public static <T, K, U, M extends ConcurrentMap<K, U>> Collector<T, ?, M> toConcurrentMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper, BinaryOperator<U> mergeFunction, Supplier<M> mapFactory)
```

Returns a concurrent {@code Collector} that accumulates elements into a
{@code ConcurrentMap} whose keys and values are the result of applying
the provided mapping functions to the input elements.

<p>If the mapped keys contain duplicates (according to {@link Object#equals(Object)}),
the value mapping function is applied to each equal element, and the
results are merged using the provided merging function.  The
{@code ConcurrentMap} is created by a provided supplier function.

<p>This is a {@link Collector.Characteristics#CONCURRENT concurrent} and
{@link Collector.Characteristics#UNORDERED unordered} Collector.

@param <T> the type of the input elements
@param <K> the output type of the key mapping function
@param <U> the output type of the value mapping function
@param <M> the type of the resulting {@code ConcurrentMap}
@param keyMapper a mapping function to produce keys
@param valueMapper a mapping function to produce values
@param mergeFunction a merge function, used to resolve collisions between
                     values associated with the same key, as supplied
                     to {@link Map#merge(Object, Object, BiFunction)}
@param mapFactory a supplier providing a new empty {@code ConcurrentMap}
                  into which the results will be inserted
@return a concurrent, unordered {@code Collector} which collects elements into a
{@code ConcurrentMap} whose keys are the result of applying a key mapping
function to the input elements, and whose values are the result of
applying a value mapping function to all input elements equal to the key
and combining them using the merge function

@see #toConcurrentMap(Function, Function)
@see #toConcurrentMap(Function, Function, BinaryOperator)
@see #toMap(Function, Function, BinaryOperator, Supplier)

## Collectors.summarizingInt(ToIntFunction<? super T>)

```java
public static <T> Collector<T, ?, IntSummaryStatistics> summarizingInt(ToIntFunction<? super T> mapper)
```

Returns a {@code Collector} which applies an {@code int}-producing
mapping function to each input element, and returns summary statistics
for the resulting values.

@param <T> the type of the input elements
@param mapper a mapping function to apply to each element
@return a {@code Collector} implementing the summary-statistics reduction

@see #summarizingDouble(ToDoubleFunction)
@see #summarizingLong(ToLongFunction)

## Collectors.summarizingLong(ToLongFunction<? super T>)

```java
public static <T> Collector<T, ?, LongSummaryStatistics> summarizingLong(ToLongFunction<? super T> mapper)
```

Returns a {@code Collector} which applies an {@code long}-producing
mapping function to each input element, and returns summary statistics
for the resulting values.

@param <T> the type of the input elements
@param mapper the mapping function to apply to each element
@return a {@code Collector} implementing the summary-statistics reduction

@see #summarizingDouble(ToDoubleFunction)
@see #summarizingInt(ToIntFunction)

## Collectors.summarizingDouble(ToDoubleFunction<? super T>)

```java
public static <T> Collector<T, ?, DoubleSummaryStatistics> summarizingDouble(ToDoubleFunction<? super T> mapper)
```

Returns a {@code Collector} which applies an {@code double}-producing
mapping function to each input element, and returns summary statistics
for the resulting values.

@param <T> the type of the input elements
@param mapper a mapping function to apply to each element
@return a {@code Collector} implementing the summary-statistics reduction

@see #summarizingLong(ToLongFunction)
@see #summarizingInt(ToIntFunction)

## Collectors.teeing(Collector<? super T, ?, R1>, Collector<? super T, ?, R2>, BiFunction<? super R1, ? super R2, R>)

```java
public static <T, R1, R2, R> Collector<T, ?, R> teeing(Collector<? super T, ?, R1> downstream1, Collector<? super T, ?, R2> downstream2, BiFunction<? super R1, ? super R2, R> merger)
```

Returns a {@code Collector} that is a composite of two downstream collectors.
Every element passed to the resulting collector is processed by both downstream
collectors, then their results are merged using the specified merge function
into the final result.

<p>The resulting collector functions do the following:

<ul>
<li>supplier: creates a result container that contains result containers
obtained by calling each collector's supplier
<li>accumulator: calls each collector's accumulator with its result container
and the input element
<li>combiner: calls each collector's combiner with two result containers
<li>finisher: calls each collector's finisher with its result container,
then calls the supplied merger and returns its result.
</ul>

<p>The resulting collector is {@link Collector.Characteristics#UNORDERED} if both downstream
collectors are unordered and {@link Collector.Characteristics#CONCURRENT} if both downstream
collectors are concurrent.

@param <T>         the type of the input elements
@param <R1>        the result type of the first collector
@param <R2>        the result type of the second collector
@param <R>         the final result type
@param downstream1 the first downstream collector
@param downstream2 the second downstream collector
@param merger      the function which merges two results into the single one
@return a {@code Collector} which aggregates the results of two supplied collectors.
@since 12