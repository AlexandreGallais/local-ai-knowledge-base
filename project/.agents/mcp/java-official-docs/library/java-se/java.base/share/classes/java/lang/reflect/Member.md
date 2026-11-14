---
title: "Member interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Member.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Member interface (java.lang.reflect)

```java
public interface Member
```

Member is an interface that reflects identifying information about
a single member (a field or a method) or a constructor.

**See also:** java.lang.Class

**See also:** Field

**See also:** Method

**See also:** Constructor

**Since:** 1.1

## Member.PUBLIC

```java
public static final int PUBLIC
```

Identifies the set of all public members of a class or interface,
including inherited members.

## Member.DECLARED

```java
public static final int DECLARED
```

Identifies the set of declared members of a class or interface.
Inherited members are not included.

## Member.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

Returns the Class object representing the class or interface
that declares the member or constructor represented by this Member.

**Returns:** an object representing the declaring class of the
underlying member

## Member.getName()

```java
public String getName()
```

Returns the simple name of the underlying member or constructor
represented by this Member.

**Returns:** the simple name of the underlying member

## Member.getModifiers()

```java
public int getModifiers()
```

Returns the Java language modifiers for the member or
constructor represented by this Member, as an integer.  The
Modifier class should be used to decode the modifiers in
the integer.

**Returns:** the Java language modifiers for the underlying member

**See also:** Modifier

**See also:** #accessFlags()

## Member.accessFlags()

```java
public default Set<AccessFlag> accessFlags()
```

**Implementation requirements:** The default implementation throws `UnsupportedOperationException`.

**See also:** #getModifiers()

**Since:** 20

## Member.isSynthetic()

```java
public boolean isSynthetic()
```

Returns `true` if this member was introduced by
the compiler; returns `false` otherwise.

**Returns:** true if and only if this member was introduced by
the compiler.

**JLS:** 13.1 The Form of a Binary

**Since:** 1.5
