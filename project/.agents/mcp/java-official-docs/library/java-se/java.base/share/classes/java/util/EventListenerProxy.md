---
title: "EventListenerProxy class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/EventListenerProxy.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EventListenerProxy class (java.util)

```java
public abstract class EventListenerProxy<T extends EventListener> implements EventListener
```

An abstract wrapper class for an `EventListener` class
which associates a set of additional parameters with the listener.
Subclasses must provide the storage and accessor methods
for the additional arguments or parameters.

For example, a bean which supports named properties
would have a two argument method signature for adding
a `PropertyChangeListener` for a property:

```java
public void addPropertyChangeListener(String propertyName,
                                      PropertyChangeListener listener)
```

If the bean also implemented the zero argument get listener method:

```java
public PropertyChangeListener[] getPropertyChangeListeners()
```

then the array may contain inner `PropertyChangeListeners`
which are also `PropertyChangeListenerProxy` objects.

If the calling method is interested in retrieving the named property
then it would have to test the element to see if it is a proxy class.

Parameters:

- `<T>`: the type of `EventListener` being wrapped

**Since:** 1.4

## EventListenerProxy.EventListenerProxy(T)

```java
public EventListenerProxy(T listener)
```

Creates a proxy for the specified listener.

Parameters:

- `listener`: the listener object

## EventListenerProxy.getListener()

```java
public T getListener()
```

Returns the listener associated with the proxy.

**Returns:** the listener associated with the proxy
