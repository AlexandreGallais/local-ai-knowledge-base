---
title: "ListResourceBundle class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ListResourceBundle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ListResourceBundle class (java.util)

```java
public abstract class ListResourceBundle extends ResourceBundle
```

`ListResourceBundle` is an abstract subclass of
`ResourceBundle` that manages resources for a locale
in a convenient and easy to use list. See `ResourceBundle` for
more information about resource bundles in general.

Subclasses must override `getContents` and provide an array,
where each item in the array is a pair of objects.
The first element of each pair is the key, which must be a
`String`, and the second element is the value associated with
that key.

The following example shows two members of a resource
bundle family with the base name "MyResources".
"MyResources" is the default member of the bundle family, and
"MyResources_fr" is the French member.
These members are based on `ListResourceBundle`
(a related example shows
how you can add a bundle to this family that's based on a properties file).
The keys in this example are of the form "s1" etc. The actual
keys are entirely up to your choice, so long as they are the same as
the keys you use in your program to retrieve the objects from the bundle.
Keys are case-sensitive.

The implementation of a `ListResourceBundle` subclass must be thread-safe
if it's simultaneously used by multiple threads. The default implementations
of the methods in this class are thread-safe.

**See also:** ResourceBundle

**See also:** PropertyResourceBundle

**Since:** 1.1

## ListResourceBundle.ListResourceBundle()

```java
public ListResourceBundle()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## ListResourceBundle.getKeys()

```java
public Enumeration<String> getKeys()
```

Returns an `Enumeration` of the keys contained in
this `ResourceBundle` and its parent bundles.

**Returns:** an `Enumeration` of the keys contained in
        this `ResourceBundle` and its parent bundles.

**See also:** #keySet()

## ListResourceBundle.handleKeySet()

```java
protected Set<String> handleKeySet()
```

Returns a `Set` of the keys contained
*only* in this `ResourceBundle`.

**Returns:** a `Set` of the keys contained only in this
        `ResourceBundle`

**Since:** 1.6

**See also:** #keySet()

## ListResourceBundle.getContents()

```java
protected abstract Object[][] getContents()
```

Returns an array in which each item is a pair of objects in an
`Object` array. The first element of each pair is
the key, which must be a `String`, and the second
element is the value associated with that key.  See the class
description for details.

**Returns:** an array of an `Object` array representing a
key-value pair.
