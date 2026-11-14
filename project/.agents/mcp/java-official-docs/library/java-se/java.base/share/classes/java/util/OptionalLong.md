# OptionalLong class (java.util)

```java
public final class OptionalLong
```

A container object which may or may not contain a {@code long} value.
If a value is present, {@code isPresent()} returns {@code true}. If no
value is present, the object is considered <i>empty</i> and
{@code isPresent()} returns {@code false}.

<p>Additional methods that depend on the presence or absence of a contained
value are provided, such as {@link #orElse(long) orElse()}
(returns a default value if no value is present) and
{@link #ifPresent(LongConsumer) ifPresent()} (performs an
action if a value is present).

<p>This is a <a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>
class; programmers should treat instances that are
{@linkplain #equals(Object) equal} as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

@apiNote
{@code OptionalLong} is primarily intended for use as a method return type where
there is a clear need to represent "no result." A variable whose type is
{@code OptionalLong} should never itself be {@code null}; it should always point
to an {@code OptionalLong} instance.

@since 1.8

## OptionalLong.empty()

```java
public static OptionalLong empty()
```

Returns an empty {@code OptionalLong} instance.  No value is present for
this {@code OptionalLong}.

@apiNote
Though it may be tempting to do so, avoid testing if an object is empty
by comparing with {@code ==} or {@code !=} against instances returned by
{@code OptionalLong.empty()}.  There is no guarantee that it is a singleton.
Instead, use {@link #isEmpty()} or {@link #isPresent()}.

@return an empty {@code OptionalLong}.

## OptionalLong.of(long)

```java
public static OptionalLong of(long value)
```

Returns an {@code OptionalLong} describing the given value.

@param value the value to describe
@return an {@code OptionalLong} with the value present

## OptionalLong.getAsLong()

```java
public long getAsLong()
```

If a value is present, returns the value, otherwise throws
{@code NoSuchElementException}.

@apiNote
The preferred alternative to this method is {@link #orElseThrow()}.

@return the value described by this {@code OptionalLong}
@throws NoSuchElementException if no value is present

## OptionalLong.isPresent()

```java
public boolean isPresent()
```

If a value is present, returns {@code true}, otherwise {@code false}.

@return {@code true} if a value is present, otherwise {@code false}

## OptionalLong.isEmpty()

```java
public boolean isEmpty()
```

If a value is not present, returns {@code true}, otherwise
{@code false}.

@return  {@code true} if a value is not present, otherwise {@code false}
@since   11

## OptionalLong.ifPresent(LongConsumer)

```java
public void ifPresent(LongConsumer action)
```

If a value is present, performs the given action with the value,
otherwise does nothing.

@param action the action to be performed, if a value is present
@throws NullPointerException if value is present and the given action is
        {@code null}

## OptionalLong.ifPresentOrElse(LongConsumer, Runnable)

```java
public void ifPresentOrElse(LongConsumer action, Runnable emptyAction)
```

If a value is present, performs the given action with the value,
otherwise performs the given empty-based action.

@param action the action to be performed, if a value is present
@param emptyAction the empty-based action to be performed, if no value is
       present
@throws NullPointerException if a value is present and the given action
        is {@code null}, or no value is present and the given empty-based
        action is {@code null}.
@since 9

## OptionalLong.stream()

```java
public LongStream stream()
```

If a value is present, returns a sequential {@link LongStream} containing
only that value, otherwise returns an empty {@code LongStream}.

@apiNote
This method can be used to transform a {@code Stream} of optional longs
to an {@code LongStream} of present longs:
<pre>{@code
    Stream<OptionalLong> os = ..
    LongStream s = os.flatMapToLong(OptionalLong::stream)
}</pre>

@return the optional value as an {@code LongStream}
@since 9

## OptionalLong.orElse(long)

```java
public long orElse(long other)
```

If a value is present, returns the value, otherwise returns
{@code other}.

@param other the value to be returned, if no value is present
@return the value, if present, otherwise {@code other}

## OptionalLong.orElseGet(LongSupplier)

```java
public long orElseGet(LongSupplier supplier)
```

If a value is present, returns the value, otherwise returns the result
produced by the supplying function.

@param supplier the supplying function that produces a value to be returned
@return the value, if present, otherwise the result produced by the
        supplying function
@throws NullPointerException if no value is present and the supplying
        function is {@code null}

## OptionalLong.orElseThrow()

```java
public long orElseThrow()
```

If a value is present, returns the value, otherwise throws
{@code NoSuchElementException}.

@return the value described by this {@code OptionalLong}
@throws NoSuchElementException if no value is present
@since 10

## OptionalLong.orElseThrow(Supplier<? extends X>)

```java
public<X extends Throwable> long orElseThrow(Supplier<? extends X> exceptionSupplier) throws X
```

If a value is present, returns the value, otherwise throws an exception
produced by the exception supplying function.

@apiNote
A method reference to the exception constructor with an empty argument
list can be used as the supplier. For example,
{@code IllegalStateException::new}

@param <X> Type of the exception to be thrown
@param exceptionSupplier the supplying function that produces an
       exception to be thrown
@return the value, if present
@throws X if no value is present
@throws NullPointerException if no value is present and the exception
        supplying function is {@code null}

## OptionalLong.equals(Object)

```java
public boolean equals(Object obj)
```

Indicates whether some other object is "equal to" this
{@code OptionalLong}.  The other object is considered equal if:
<ul>
<li>it is also an {@code OptionalLong} and;
<li>both instances have no value present or;
<li>the present values are "equal to" each other via {@code ==}.
</ul>

@param obj an object to be tested for equality
@return {@code true} if the other object is "equal to" this object
        otherwise {@code false}

## OptionalLong.hashCode()

```java
public int hashCode()
```

Returns the hash code of the value, if present, otherwise {@code 0}
(zero) if no value is present.

@return hash code value of the present value or {@code 0} if no value is
        present

## OptionalLong.toString()

```java
public String toString()
```

Returns a non-empty string representation of this {@code OptionalLong}
suitable for debugging.  The exact presentation format is unspecified and
may vary between implementations and versions.

@implSpec
If a value is present the result must include its string representation
in the result.  Empty and present {@code OptionalLong}s must be
unambiguously differentiable.

@return the string representation of this instance