# ClassValue class (java.lang)

```java
public abstract class ClassValue<T>
```

Lazily associate a computed value with any {@code Class} object.
For example, if a dynamic language needs to construct a message dispatch
table for each class encountered at a message send call site,
it can use a {@code ClassValue} to cache information needed to
perform the message send quickly, for each class encountered.
<p>
The basic operation of a {@code ClassValue} is {@link #get get}, which
returns the associated value, initially created by an invocation to {@link
#computeValue computeValue}; multiple invocations may happen under race, but
exactly one value is associated to a {@code Class} and returned.
<p>
Another operation is {@link #remove remove}: it clears the associated value
(if it exists), and ensures the next associated value is computed with input
states up-to-date with the removal.
<p>
For a particular association, there is a total order for accesses to the
associated value.  Accesses are atomic; they include:
<ul>
<li>A read-only access by {@code get}</li>
<li>An attempt to associate the return value of a {@code computeValue} by
{@code get}</li>
<li>Clearing of an association by {@code remove}</li>
</ul>
A {@code get} call always include at least one access; a {@code remove} call
always has exactly one access; a {@code computeValue} call always happens
between two accesses.  This establishes the order of {@code computeValue}
calls with respect to {@code remove} calls and determines whether the
results of a {@code computeValue} can be successfully associated by a {@code
get}.

@param <T> the type of the associated value
@author John Rose, JSR 292 EG
@since 1.7

## ClassValue.ClassValue()

```java
protected ClassValue()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## ClassValue.computeValue(Class<?>)

```java
protected abstract T computeValue(Class<?> type)
```

Computes the value to associate to the given {@code Class}.
<p>
This method is invoked when the initial read-only access by {@link #get
get} finds no associated value.
<p>
If this method throws an exception, the initiating {@code get} call will
not attempt to associate a value, and may terminate by returning the
associated value if it exists, or by propagating that exception otherwise.
<p>
Otherwise, the value is computed and returned.  An attempt to associate
the return value happens, with one of the following outcomes:
<ul>
<li>The associated value is present; it is returned and no association
is done.</li>
<li>The most recent {@link #remove remove} call, if it exists, does not
happen-before (JLS {@jls 17.4.5}) the finish of the {@code computeValue}
that computed the value to associate.  A new invocation to {@code
computeValue}, which that {@code remove} call happens-before, will
re-establish this happens-before relationship.</li>
<li>Otherwise, this value is successfully associated and returned.</li>
</ul>

@apiNote
A {@code computeValue} call may, due to class loading or other
circumstances, recursively call {@code get} or {@code remove} for the
same {@code type}.  The recursive {@code get}, if the recursion stops,
successfully finishes and this initiating {@code get} observes the
associated value from recursion.  The recursive {@code remove} is no-op,
since being on the same thread, the {@code remove} already happens-before
the finish of this {@code computeValue}; the result from this {@code
computeValue} still may be associated.

@param type the {@code Class} to associate a value to
@return the newly computed value to associate
@see #get
@see #remove

## ClassValue.get(Class<?>)

```java
public T get(Class<?> type)
```

{@return the value associated to the given {@code Class}}
<p>
This method first performs a read-only access, and returns the associated
value if it exists.  Otherwise, this method tries to associate a value
from a {@link #computeValue computeValue} invocation until the associated
value exists, which could be associated by a competing thread.
<p>
This method may throw an exception from a {@code computeValue} invocation.
In this case, no association happens.

@param type the {@code Class} to retrieve the associated value for
@throws NullPointerException if the argument is {@code null}
@see #remove
@see #computeValue

## ClassValue.remove(Class<?>)

```java
public void remove(Class<?> type)
```

Removes the associated value for the given {@code Class} and invalidates
all out-of-date computations.  If this association is subsequently
{@linkplain #get accessed}, this removal happens-before (JLS {@jls
17.4.5}) the finish of the {@link #computeValue computeValue} call that
returned the associated value.

@param type the type whose class value must be removed
@throws NullPointerException if the argument is {@code null}