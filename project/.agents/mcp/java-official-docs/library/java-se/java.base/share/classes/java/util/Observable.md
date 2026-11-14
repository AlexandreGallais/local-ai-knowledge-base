---
title: "Observable class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Observable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Observable class (java.util)

```java
public class Observable
```

This class represents an observable object, or "data"
in the model-view paradigm. It can be subclassed to represent an
object that the application wants to have observed.

An observable object can have one or more observers. An observer
may be any object that implements interface `Observer`. After an
observable instance changes, an application calling the
`Observable`'s `notifyObservers` method
causes all of its observers to be notified of the change by a call
to their `update` method.

The order in which notifications will be delivered is unspecified.
The default implementation provided in the Observable class will
notify Observers in the order in which they registered interest, but
subclasses may change this order, use no guaranteed order, deliver
notifications on separate threads, or may guarantee that their
subclass follows this order, as they choose.

Note that this notification mechanism has nothing to do with threads
and is completely separate from the `wait` and `notify`
mechanism of class `Object`.

When an observable object is newly created, its set of observers is
empty. Two observers are considered the same if and only if the
`equals` method returns true for them.

**See also:** java.util.Observable#notifyObservers()

**See also:** java.util.Observable#notifyObservers(java.lang.Object)

**See also:** java.util.Observer

**See also:** java.util.Observer#update(java.util.Observable, java.lang.Object)

**Since:** 1.0

**Deprecated:** This class and the `Observer` interface have been deprecated.
The event model supported by `Observer` and `Observable`
is quite limited, the order of notifications delivered by
`Observable` is unspecified, and state changes are not in
one-for-one correspondence with notifications.
For a richer event model, consider using the
`java.desktop/java.beans` package.  For reliable and ordered
messaging among threads, consider using one of the concurrent data
structures in the `java.util.concurrent` package.
For reactive streams style programming, see the
`java.util.concurrent.Flow` API.

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

Parameters:

- `o`: an observer to be added.

Throws:

- `NullPointerException`: if the parameter o is null.

## Observable.deleteObserver(Observer)

```java
public synchronized void deleteObserver(Observer o)
```

Deletes an observer from the set of observers of this object.
Passing `null` to this method will have no effect.

Parameters:

- `o`: the observer to be deleted.

## Observable.notifyObservers()

```java
public void notifyObservers()
```

If this object has changed, as indicated by the
`hasChanged` method, then notify all of its observers
and then call the `clearChanged` method to
indicate that this object has no longer changed.

Each observer has its `update` method called with two
arguments: this observable object and `null`. In other
words, this method is equivalent to:
`notifyObservers(null)`

**See also:** java.util.Observable#clearChanged()

**See also:** java.util.Observable#hasChanged()

**See also:** java.util.Observer#update(java.util.Observable, java.lang.Object)

## Observable.notifyObservers(Object)

```java
public void notifyObservers(Object arg)
```

If this object has changed, as indicated by the
`hasChanged` method, then notify all of its observers
and then call the `clearChanged` method to indicate
that this object has no longer changed.

Each observer has its `update` method called with two
arguments: this observable object and the `arg` argument.

Parameters:

- `arg`: any object.

**See also:** java.util.Observable#clearChanged()

**See also:** java.util.Observable#hasChanged()

**See also:** java.util.Observer#update(java.util.Observable, java.lang.Object)

## Observable.deleteObservers()

```java
public synchronized void deleteObservers()
```

Clears the observer list so that this object no longer has any observers.

## Observable.setChanged()

```java
protected synchronized void setChanged()
```

Marks this `Observable` object as having been changed; the
`hasChanged` method will now return `true`.

## Observable.clearChanged()

```java
protected synchronized void clearChanged()
```

Indicates that this object has no longer changed, or that it has
already notified all of its observers of its most recent change,
so that the `hasChanged` method will now return `false`.
This method is called automatically by the
`notifyObservers` methods.

**See also:** java.util.Observable#notifyObservers()

**See also:** java.util.Observable#notifyObservers(java.lang.Object)

## Observable.hasChanged()

```java
public synchronized boolean hasChanged()
```

Tests if this object has changed.

**Returns:** `true` if and only if the `setChanged`
         method has been called more recently than the
         `clearChanged` method on this object;
         `false` otherwise.

**See also:** java.util.Observable#clearChanged()

**See also:** java.util.Observable#setChanged()

## Observable.countObservers()

```java
public synchronized int countObservers()
```

Returns the number of observers of this `Observable` object.

**Returns:** the number of observers of this object.
