# EventObject class (java.util)

```java
public class EventObject implements java.io.Serializable
```

<p>
The root class from which all event state objects shall be derived.
<p>
All Events are constructed with a reference to the object, the "source",
that is logically deemed to be the object upon which the Event in question
initially occurred upon.

@since 1.1

## EventObject.source

```java
protected transient Object source
```

The object on which the Event initially occurred.

## EventObject.EventObject(Object)

```java
public EventObject(Object source)
```

Constructs a prototypical Event.

@param source the object on which the Event initially occurred
@throws IllegalArgumentException if source is null

## EventObject.getSource()

```java
public Object getSource()
```

The object on which the Event initially occurred.

@return the object on which the Event initially occurred

## EventObject.toString()

```java
public String toString()
```

Returns a String representation of this EventObject.

@return a String representation of this EventObject