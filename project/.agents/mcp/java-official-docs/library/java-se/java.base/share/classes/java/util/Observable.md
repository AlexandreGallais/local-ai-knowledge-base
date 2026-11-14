# Observable class (java.util)

```java
public class Observable
```

This class represents an observable object, or "data"
in the model-view paradigm. It can be subclassed to represent an
object that the application wants to have observed.
<p>
An observable object can have one or more observers. An observer
may be any object that implements interface {@code Observer}. After an
observable instance changes, an application calling the
{@code Observable}'s {@code notifyObservers} method
causes all of its observers to be notified of the change by a call
to their {@code update} method.
<p>
The order in which notifications will be delivered is unspecified.
The default implementation provided in the Observable class will
notify Observers in the order in which they registered interest, but
subclasses may change this order, use no guaranteed order, deliver
notifications on separate threads, or may guarantee that their
subclass follows this order, as they choose.
<p>
Note that this notification mechanism has nothing to do with threads
and is completely separate from the {@code wait} and {@code notify}
mechanism of class {@code Object}.
<p>
When an observable object is newly created, its set of observers is
empty. Two observers are considered the same if and only if the
{@code equals} method returns true for them.

@author  Chris Warth
@see     java.util.Observable#notifyObservers()
@see     java.util.Observable#notifyObservers(java.lang.Object)
@see     java.util.Observer
@see     java.util.Observer#update(java.util.Observable, java.lang.Object)
@since   1.0

@deprecated
This class and the {@link Observer} interface have been deprecated.
The event model supported by {@code Observer} and {@code Observable}
is quite limited, the order of notifications delivered by
{@code Observable} is unspecified, and state changes are not in
one-for-one correspondence with notifications.
For a richer event model, consider using the
{@link java.desktop/java.beans} package.  For reliable and ordered
messaging among threads, consider using one of the concurrent data
structures in the {@link java.util.concurrent} package.
For reactive streams style programming, see the
{@link java.util.concurrent.Flow} API.

## Observable.Observable()

```java
public Observable()
```

Construct an Observable with zero Observers.

## Observable.addObserver(Observer)

```java
public synchronized void addObserver(Observer o)
```

Adds an observer to the set of observers for this object, provided
that it is not the same as some observer already in the set.
The order in which notifications will be delivered to multiple
observers is not specified. See the class comment.

@param   o   an observer to be added.
@throws NullPointerException   if the parameter o is null.

## Observable.deleteObserver(Observer)

```java
public synchronized void deleteObserver(Observer o)
```

Deletes an observer from the set of observers of this object.
Passing {@code null} to this method will have no effect.
@param   o   the observer to be deleted.

## Observable.notifyObservers()

```java
public void notifyObservers()
```

If this object has changed, as indicated by the
{@code hasChanged} method, then notify all of its observers
and then call the {@code clearChanged} method to
indicate that this object has no longer changed.
<p>
Each observer has its {@code update} method called with two
arguments: this observable object and {@code null}. In other
words, this method is equivalent to:
<blockquote>{@code
notifyObservers(null)}</blockquote>

@see     java.util.Observable#clearChanged()
@see     java.util.Observable#hasChanged()
@see     java.util.Observer#update(java.util.Observable, java.lang.Object)

## Observable.notifyObservers(Object)

```java
public void notifyObservers(Object arg)
```

If this object has changed, as indicated by the
{@code hasChanged} method, then notify all of its observers
and then call the {@code clearChanged} method to indicate
that this object has no longer changed.
<p>
Each observer has its {@code update} method called with two
arguments: this observable object and the {@code arg} argument.

@param   arg   any object.
@see     java.util.Observable#clearChanged()
@see     java.util.Observable#hasChanged()
@see     java.util.Observer#update(java.util.Observable, java.lang.Object)

## Observable.deleteObservers()

```java
public synchronized void deleteObservers()
```

Clears the observer list so that this object no longer has any observers.

## Observable.setChanged()

```java
protected synchronized void setChanged()
```

Marks this {@code Observable} object as having been changed; the
{@code hasChanged} method will now return {@code true}.

## Observable.clearChanged()

```java
protected synchronized void clearChanged()
```

Indicates that this object has no longer changed, or that it has
already notified all of its observers of its most recent change,
so that the {@code hasChanged} method will now return {@code false}.
This method is called automatically by the
{@code notifyObservers} methods.

@see     java.util.Observable#notifyObservers()
@see     java.util.Observable#notifyObservers(java.lang.Object)

## Observable.hasChanged()

```java
public synchronized boolean hasChanged()
```

Tests if this object has changed.

@return  {@code true} if and only if the {@code setChanged}
         method has been called more recently than the
         {@code clearChanged} method on this object;
         {@code false} otherwise.
@see     java.util.Observable#clearChanged()
@see     java.util.Observable#setChanged()

## Observable.countObservers()

```java
public synchronized int countObservers()
```

Returns the number of observers of this {@code Observable} object.

@return  the number of observers of this object.