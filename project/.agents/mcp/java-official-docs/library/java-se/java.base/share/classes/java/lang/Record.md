---
title: "Record class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Record.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Record class (java.lang)

```java
public abstract class Record
```

This is the common base class of all Java language record classes.

More information about records, including descriptions of the
implicitly declared methods synthesized by the compiler, can be
found in section 8.10 of
*The Java Language Specification*.

A *record class* is a shallowly immutable, transparent carrier for
a fixed set of values, called the *record components*.  The Java
language provides concise syntax for declaring record classes, whereby the
record components are declared in the record header.  The list of record
components declared in the record header form the *record descriptor*.

A record class has the following mandated members: a *canonical
constructor*, which must provide at least as much access as the record
class and whose descriptor is the same as the record descriptor;
a private final field corresponding to each component, whose name and
type are the same as that of the component; a public accessor method
corresponding to each component, whose name and return type are the same as
that of the component.  If not explicitly declared in the body of the record,
implicit implementations for these members are provided.

The implicit declaration of the canonical constructor has the same accessibility
as the record class and initializes the component fields from the corresponding
constructor arguments.  The implicit declaration of the accessor methods returns
the value of the corresponding component field.  The implicit declaration of the
`Object.equals(Object)`, `Object.hashCode()`, and `Object.toString()`
methods are derived from all of the component fields.

The primary reasons to provide an explicit declaration for the
canonical constructor or accessor methods are to validate constructor
arguments, perform defensive copies on mutable components, or normalize groups
of components (such as reducing a rational number to lowest terms.)

For all record classes, the following invariant must hold: if a record R's
components are `c1, c2, ... cn`, then if a record instance is copied
as follows:

```java
    R copy = new R(r.c1(), r.c2(), ..., r.cn());
```

then it must be the case that `r.equals(copy)`.

**API note:** A record class that `implements` `java.io.Serializable` is said
to be a *serializable record*. Serializable records are serialized and
deserialized differently than ordinary serializable objects. During
deserialization the record's canonical constructor is invoked to construct
the record object. Certain serialization-related methods, such as readObject
and writeObject, are ignored for serializable records. More information about
serializable records can be found in the

*Java Object Serialization Specification,* Section 1.13,
"Serialization of Records".

**API note:** A record class structure can be obtained at runtime via reflection.
See `Class.isRecord()` and `Class.getRecordComponents()` for more details.

**JLS:** 8.10 Record Classes

**Since:** 16

## Record.Record()

```java
protected Record()
```

Constructor for record classes to call.

## Record.equals(Object)

```java
public abstract boolean equals(Object obj)
```

Indicates whether some other object is "equal to" this one.  In addition
to the general contract of Object.equals,
record classes must further obey the invariant that when
a record instance is "copied" by passing the result of the record component
accessor methods to the canonical constructor, as follows:

```java
    R copy = new R(r.c1(), r.c2(), ..., r.cn());
```

then it must be the case that `r.equals(copy)`.

Parameters:

- `obj`: the reference object with which to compare.

**Implementation requirements:** The implicitly provided implementation returns `true` if
and only if the argument is an instance of the same record class
as this record, and each component of this record is equal to
the corresponding component of the argument; otherwise, `false` is returned. Equality of a component `c` is
determined as follows:

-  If the component is of a reference type, the component is
considered equal if and only if Objects.equals(this.c, r.c) would return `true`.

-  If the component is of a primitive type, using the
corresponding primitive wrapper class `PW` (the
corresponding wrapper class for `int` is `java.lang.Integer`, and so on), the component is considered
equal if and only if `PW.compare(this.c, r.c)` would return `0`.

Apart from the semantics described above, the precise algorithm
used in the implicitly provided implementation is unspecified
and is subject to change. The implementation may or may not use
calls to the particular methods listed, and may or may not
perform comparisons in the order of component declaration.

**See also:** java.util.Objects#equals(Object,Object)

**Returns:** `true` if this record is equal to the
         argument; `false` otherwise.

## Record.hashCode()

```java
public abstract int hashCode()
```

Returns a hash code value for the record.
Obeys the general contract of Object.hashCode.
For records, hashing behavior is constrained by the refined contract
of Record.equals, so that any two records
created from the same components must have the same hash code.

**Implementation requirements:** The implicitly provided implementation returns a hash code value derived
by combining appropriate hashes from each component.
The precise algorithm used in the implicitly provided implementation
is unspecified and is subject to change within the above limits.
The resulting integer need not remain consistent from one
execution of an application to another execution of the same
application, even if the hashes of the component values were to
remain consistent in this way.  Also, a component of primitive
type may contribute its bits to the hash code differently than
the `hashCode` of its primitive wrapper class.

**See also:** Object#hashCode()

**Returns:** a hash code value for this record.

## Record.toString()

```java
public abstract String toString()
```

Returns a string representation of the record.
In accordance with the general contract of `Object.toString()`,
the `toString` method returns a string that
"textually represents" this record. The result should
be a concise but informative representation that is easy for a
person to read.

In addition to this general contract, record classes must further
participate in the invariant that any two records which are
equal must produce equal
strings.  This invariant is necessarily relaxed in the rare
case where corresponding equal component values might fail
to produce equal strings for themselves.

**Implementation requirements:** The implicitly provided implementation returns a string which
contains the name of the record class, the names of components
of the record, and string representations of component values,
so as to fulfill the contract of this method.
The precise format produced by this implicitly provided implementation
is subject to change, so the present syntax should not be parsed
by applications to recover record component values.

**See also:** Object#toString()

**Returns:** a string representation of the object.
