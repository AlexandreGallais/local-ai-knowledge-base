# PrimitiveIterator interface (java.util)

```java
public interface PrimitiveIterator<T, T_CONS> extends Iterator<T>
```

A base type for primitive specializations of {@code Iterator}.  Specialized
subtypes are provided for {@link OfInt int}, {@link OfLong long}, and
{@link OfDouble double} values.

<p>The specialized subtype default implementations of {@link Iterator#next}
and {@link Iterator#forEachRemaining(java.util.function.Consumer)} box
primitive values to instances of their corresponding wrapper class.  Such
boxing may offset any advantages gained when using the primitive
specializations.  To avoid boxing, the corresponding primitive-based methods
should be used.  For example, {@link PrimitiveIterator.OfInt#nextInt()} and
{@link PrimitiveIterator.OfInt#forEachRemaining(java.util.function.IntConsumer)}
should be used in preference to {@link PrimitiveIterator.OfInt#next()} and
{@link PrimitiveIterator.OfInt#forEachRemaining(java.util.function.Consumer)}.

<p>Iteration of primitive values using boxing-based methods
{@link Iterator#next next()} and
{@link Iterator#forEachRemaining(java.util.function.Consumer) forEachRemaining()},
does not affect the order in which the values, transformed to boxed values,
are encountered.

@implNote
If the boolean system property {@code org.openjdk.java.util.stream.tripwire}
is set to {@code true} then diagnostic warnings are reported if boxing of
primitive values occur when operating on primitive subtype specializations.

@param <T> the type of elements returned by this PrimitiveIterator.  The
       type must be a wrapper type for a primitive type, such as
       {@code Integer} for the primitive {@code int} type.
@param <T_CONS> the type of primitive consumer.  The type must be a
       primitive specialization of {@link java.util.function.Consumer} for
       {@code T}, such as {@link java.util.function.IntConsumer} for
       {@code Integer}.

@since 1.8

## PrimitiveIterator.forEachRemaining(T_CONS)

```java
void forEachRemaining(T_CONS action)
```

Performs the given action for each remaining element until all elements
have been processed or the action throws an exception.  Actions are
performed in the order of iteration, if that order is specified.
Exceptions thrown by the action are relayed to the caller.
<p>
The behavior of an iterator is unspecified if the action modifies the
source of elements in any way (even by calling the {@link #remove remove}
method or other mutator methods of {@code Iterator} subtypes),
unless an overriding class has specified a concurrent modification policy.
<p>
Subsequent behavior of an iterator is unspecified if the action throws an
exception.

@param action The action to be performed for each element
@throws NullPointerException if the specified action is null

## PrimitiveIterator.nextInt()

```java
int nextInt()
```

Returns the next {@code int} element in the iteration.

@return the next {@code int} element in the iteration
@throws NoSuchElementException if the iteration has no more elements

## PrimitiveIterator.forEachRemaining(IntConsumer)

```java
default void forEachRemaining(IntConsumer action)
```

{@inheritDoc}
@implSpec
<p>The default implementation behaves as if:
<pre>{@code
    while (hasNext())
        action.accept(nextInt());
}</pre>

## PrimitiveIterator.next()

```java
default Integer next()
```

{@inheritDoc}
@implSpec
The default implementation boxes the result of calling
{@link #nextInt()}, and returns that boxed result.

## PrimitiveIterator.forEachRemaining(Consumer<? super Integer>)

```java
default void forEachRemaining(Consumer<? super Integer> action)
```

{@inheritDoc}
@implSpec
If the action is an instance of {@code IntConsumer} then it is cast
to {@code IntConsumer} and passed to {@link #forEachRemaining};
otherwise the action is adapted to an instance of
{@code IntConsumer}, by boxing the argument of {@code IntConsumer},
and then passed to {@link #forEachRemaining}.

## PrimitiveIterator.nextLong()

```java
long nextLong()
```

Returns the next {@code long} element in the iteration.

@return the next {@code long} element in the iteration
@throws NoSuchElementException if the iteration has no more elements

## PrimitiveIterator.forEachRemaining(LongConsumer)

```java
default void forEachRemaining(LongConsumer action)
```

{@inheritDoc}
@implSpec
<p>The default implementation behaves as if:
<pre>{@code
    while (hasNext())
        action.accept(nextLong());
}</pre>

## PrimitiveIterator.next()

```java
default Long next()
```

{@inheritDoc}
@implSpec
The default implementation boxes the result of calling
{@link #nextLong()}, and returns that boxed result.

## PrimitiveIterator.forEachRemaining(Consumer<? super Long>)

```java
default void forEachRemaining(Consumer<? super Long> action)
```

{@inheritDoc}
@implSpec
If the action is an instance of {@code LongConsumer} then it is cast
to {@code LongConsumer} and passed to {@link #forEachRemaining};
otherwise the action is adapted to an instance of
{@code LongConsumer}, by boxing the argument of {@code LongConsumer},
and then passed to {@link #forEachRemaining}.

## PrimitiveIterator.nextDouble()

```java
double nextDouble()
```

Returns the next {@code double} element in the iteration.

@return the next {@code double} element in the iteration
@throws NoSuchElementException if the iteration has no more elements

## PrimitiveIterator.forEachRemaining(DoubleConsumer)

```java
default void forEachRemaining(DoubleConsumer action)
```

{@inheritDoc}
@implSpec
<p>The default implementation behaves as if:
<pre>{@code
    while (hasNext())
        action.accept(nextDouble());
}</pre>

## PrimitiveIterator.next()

```java
default Double next()
```

{@inheritDoc}
@implSpec
The default implementation boxes the result of calling
{@link #nextDouble()}, and returns that boxed result.

## PrimitiveIterator.forEachRemaining(Consumer<? super Double>)

```java
default void forEachRemaining(Consumer<? super Double> action)
```

{@inheritDoc}
@implSpec
If the action is an instance of {@code DoubleConsumer} then it is
cast to {@code DoubleConsumer} and passed to
{@link #forEachRemaining}; otherwise the action is adapted to
an instance of {@code DoubleConsumer}, by boxing the argument of
{@code DoubleConsumer}, and then passed to
{@link #forEachRemaining}.