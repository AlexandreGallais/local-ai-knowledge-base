# Gatherers class (java.util.stream)

```java
public final class Gatherers
```

Implementations of {@link Gatherer} that provide useful intermediate
operations, such as windowing functions, folding functions,
transforming elements concurrently, etc.

@since 24

## Gatherers.windowFixed(int)

```java
public static <TR> Gatherer<TR, ?, List<TR>> windowFixed(int windowSize)
```

Returns a Gatherer that gathers elements into windows
-- encounter-ordered groups of elements -- of a fixed size.
If the stream is empty then no window will be produced.
The last window may contain fewer elements than the supplied window size.

<p>Example:
{@snippet lang = java:
// will contain: [[1, 2, 3], [4, 5, 6], [7, 8]]
List<List<Integer>> windows =
    Stream.of(1,2,3,4,5,6,7,8).gather(Gatherers.windowFixed(3)).toList();
}

@implSpec Each window produced is an unmodifiable List; calls to any
mutator method will always cause {@code UnsupportedOperationException}
to be thrown. There are no guarantees on the implementation type or
serializability of the produced Lists.

@apiNote For efficiency reasons, windows may be allocated contiguously
         and eagerly. This means that choosing large window sizes for
         small streams may use excessive memory for the duration of
         evaluation of this operation.

@param windowSize the size of the windows
@param <TR> the type of elements the returned gatherer consumes
            and the contents of the windows it produces
@return a new gatherer which groups elements into fixed-size windows
@throws IllegalArgumentException when {@code windowSize} is less than 1

## Gatherers.windowSliding(int)

```java
public static <TR> Gatherer<TR, ?, List<TR>> windowSliding(int windowSize)
```

Returns a Gatherer that gathers elements into windows --
encounter-ordered groups of elements -- of a given size, where each
subsequent window includes all elements of the previous window except
for the least recent, and adds the next element in the stream.
If the stream is empty then no window will be produced. If the size of
the stream is smaller than the window size then only one window will
be produced, containing all elements in the stream.

<p>Example:
{@snippet lang = java:
// will contain: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]]
List<List<Integer>> windows2 =
    Stream.of(1,2,3,4,5,6,7,8).gather(Gatherers.windowSliding(2)).toList();

// will contain: [[1, 2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 7], [3, 4, 5, 6, 7, 8]]
List<List<Integer>> windows6 =
    Stream.of(1,2,3,4,5,6,7,8).gather(Gatherers.windowSliding(6)).toList();
}

@implSpec Each window produced is an unmodifiable List; calls to any
mutator method will always cause {@code UnsupportedOperationException}
to be thrown. There are no guarantees on the implementation type or
serializability of the produced Lists.

@apiNote For efficiency reasons, windows may be allocated contiguously
         and eagerly. This means that choosing large window sizes for
         small streams may use excessive memory for the duration of
         evaluation of this operation.

@param windowSize the size of the windows
@param <TR> the type of elements the returned gatherer consumes
            and the contents of the windows it produces
@return a new gatherer which groups elements into sliding windows
@throws IllegalArgumentException when windowSize is less than 1

## Gatherers.fold(Supplier<R>, BiFunction<? super R, ? super T, ? extends R>)

```java
public static <T, R> Gatherer<T, ?, R> fold( Supplier<R> initial, BiFunction<? super R, ? super T, ? extends R> folder)
```

Returns a Gatherer that performs an ordered, <i>reduction-like</i>,
transformation for scenarios where no combiner-function can be
implemented, or for reductions which are intrinsically
order-dependent.

@implSpec If no exceptions are thrown during processing, then this
operation only ever produces a single element.

<p>Example:
{@snippet lang = java:
// will contain: Optional["123456789"]
Optional<String> numberString =
    Stream.of(1,2,3,4,5,6,7,8,9)
          .gather(
              Gatherers.fold(() -> "", (string, number) -> string + number)
           )
          .findFirst();
}

@see java.util.stream.Stream#reduce(Object, BinaryOperator)

@param initial the identity value for the fold operation
@param folder the folding function
@param <T> the type of elements the returned gatherer consumes
@param <R> the type of elements the returned gatherer produces
@return a new Gatherer
@throws NullPointerException if any of the parameters are {@code null}

## Gatherers.scan(Supplier<R>, BiFunction<? super R, ? super T, ? extends R>)

```java
public static <T, R> Gatherer<T, ?, R> scan( Supplier<R> initial, BiFunction<? super R, ? super T, ? extends R> scanner)
```

Returns a Gatherer that performs a Prefix Scan -- an incremental
accumulation -- using the provided functions.  Starting with an
initial value obtained from the {@code Supplier}, each subsequent
value is obtained by applying the {@code BiFunction} to the current
value and the next input element, after which the resulting value is
produced downstream.

<p>Example:
{@snippet lang = java:
// will contain: ["1", "12", "123", "1234", "12345", "123456", "1234567", "12345678", "123456789"]
List<String> numberStrings =
    Stream.of(1,2,3,4,5,6,7,8,9)
          .gather(
              Gatherers.scan(() -> "", (string, number) -> string + number)
           )
          .toList();
}

@param initial the supplier of the initial value for the scanner
@param scanner the function to apply for each element
@param <T> the type of element which this gatherer consumes
@param <R> the type of element which this gatherer produces
@return a new Gatherer which performs a prefix scan
@throws NullPointerException if any of the parameters are {@code null}

## Gatherers.mapConcurrent(int, Function<? super T, ? extends R>)

```java
public static <T, R> Gatherer<T,?,R> mapConcurrent( final int maxConcurrency, final Function<? super T, ? extends R> mapper)
```

An operation which executes a function concurrently
with a configured level of max concurrency, using
<a href="{@docRoot}/java.base/java/lang/Thread.html#virtual-threads">virtual threads</a>.
This operation preserves the ordering of the stream.

@apiNote In progress tasks will be attempted to be cancelled,
on a best-effort basis, in situations where the downstream no longer
wants to receive any more elements.

@implSpec If a result of the function is to be pushed downstream but
instead the function completed exceptionally then the corresponding
exception will instead be rethrown by this method as an instance of
{@link RuntimeException}, after which any remaining tasks are canceled.

@param maxConcurrency the maximum concurrency desired
@param mapper a function to be executed concurrently
@param <T> the type of input
@param <R> the type of output
@return a new Gatherer
@throws IllegalArgumentException if {@code maxConcurrency} is less than 1
@throws NullPointerException if {@code mapper} is {@code null}