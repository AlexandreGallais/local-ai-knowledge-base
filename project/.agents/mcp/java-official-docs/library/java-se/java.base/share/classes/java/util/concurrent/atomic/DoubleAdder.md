# DoubleAdder class (java.util.concurrent.atomic)

```java
public class DoubleAdder extends Striped64 implements Serializable
```

One or more variables that together maintain an initially zero
{@code double} sum.  When updates (method {@link #add}) are
contended across threads, the set of variables may grow dynamically
to reduce contention.  Method {@link #sum} (or, equivalently {@link
#doubleValue}) returns the current total combined across the
variables maintaining the sum. The order of accumulation within or
across threads is not guaranteed. Thus, this class may not be
applicable if numerical stability is required, especially when
combining values of substantially different orders of magnitude.

<p>This class is usually preferable to alternatives when multiple
threads update a common value that is used for purposes such as
summary statistics that are frequently updated but less frequently
read.

<p>This class extends {@link Number}, but does <em>not</em> define
methods such as {@code equals}, {@code hashCode} and {@code
compareTo} because instances are expected to be mutated, and so are
not useful as collection keys.

@since 1.8
@author Doug Lea

## DoubleAdder.DoubleAdder()

```java
public DoubleAdder()
```

Creates a new adder with initial sum of zero.

## DoubleAdder.add(double)

```java
public void add(double x)
```

Adds the given value.

@param x the value to add

## DoubleAdder.sum()

```java
public double sum()
```

Returns the current sum.  The returned value is <em>NOT</em> an
atomic snapshot; invocation in the absence of concurrent
updates returns an accurate result, but concurrent updates that
occur while the sum is being calculated might not be
incorporated.  Also, because floating-point arithmetic is not
strictly associative, the returned result need not be identical
to the value that would be obtained in a sequential series of
updates to a single variable.

@return the sum

## DoubleAdder.reset()

```java
public void reset()
```

Resets variables maintaining the sum to zero.  This method may
be a useful alternative to creating a new adder, but is only
effective if there are no concurrent updates.  Because this
method is intrinsically racy, it should only be used when it is
known that no threads are concurrently updating.

## DoubleAdder.sumThenReset()

```java
public double sumThenReset()
```

Equivalent in effect to {@link #sum} followed by {@link
#reset}. This method may apply for example during quiescent
points between multithreaded computations.  If there are
updates concurrent with this method, the returned value is
<em>not</em> guaranteed to be the final value occurring before
the reset.

@return the sum

## DoubleAdder.toString()

```java
public String toString()
```

Returns the String representation of the {@link #sum}.
@return the String representation of the {@link #sum}

## DoubleAdder.doubleValue()

```java
public double doubleValue()
```

Equivalent to {@link #sum}.

@return the sum

## DoubleAdder.longValue()

```java
public long longValue()
```

Returns the {@link #sum} as a {@code long} after a
narrowing primitive conversion.

## DoubleAdder.intValue()

```java
public int intValue()
```

Returns the {@link #sum} as an {@code int} after a
narrowing primitive conversion.

## DoubleAdder.floatValue()

```java
public float floatValue()
```

Returns the {@link #sum} as a {@code float}
after a narrowing primitive conversion.