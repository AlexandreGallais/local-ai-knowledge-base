---
title: "TypeKind enum (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/TypeKind.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TypeKind enum (java.lang.classfile)

```java
public enum TypeKind
```

Describes the data types Java Virtual Machine operates on.  This omits `returnAddress` (JVMS ) and includes void (JVMS
), which appears as a method return type.

The `returnAddress` type is only used by discontinued
jump subroutine and
return from subroutine
instructions.  Jump subroutine instructions push `returnAddress` to the
operand stack; astore instructions store `returnAddress` from the operand stack to local variables; return from
subroutine instructions load `returnAddress` from local variables.

#### Computational Type

In the `class` file format, local variables (JVMS ),
and the operand stack (JVMS ) of the Java Virtual Machine,
boolean, byte, char,
short types do not exist and are represented by the int computational type.
int, float, reference,
`returnAddress`, long, and doule
are the computational types of the Java Virtual Machine.

**jvms:** 2.2 Data Types

**jvms:** 2.11.1 Types and the Java Virtual Machine

**Since:** 24

## TypeKind.upperBound()

```java
public ClassDesc upperBound()
```

This is the primitive class descriptor for primitive types and
void and Object descriptor for
reference.

## TypeKind.newarrayCode()

```java
public int newarrayCode()
```

**jvms:** 6.5.newarray *newarray*

**See also:** NewPrimitiveArrayInstruction

**See also:** #fromNewarrayCode(int) fromNewarrayCode(int)

## TypeKind.slotSize()

```java
public int slotSize()
```

This is also the category of this type for instructions operating on the operand stack without
regard to type (JVMS ), such as pop versus pop2.

**jvms:** 2.6.1 Local Variables

**jvms:** 2.6.2 Operand Stacks

## TypeKind.asLoadable()

```java
public TypeKind asLoadable()
```

**See also:** LoadInstruction

**See also:** StoreInstruction

## TypeKind.fromNewarrayCode(int)

```java
public static TypeKind fromNewarrayCode(int newarrayCode)
```

Parameters:

- `newarrayCode`: the operand of the `newarray` instruction

**jvms:** 6.5.newarray *newarray*

**See also:** NewPrimitiveArrayInstruction

**See also:** #newarrayCode() newarrayCode()

Throws:

- `IllegalArgumentException`: if the code is invalid

## TypeKind.fromDescriptor(CharSequence)

```java
public static TypeKind fromDescriptor(CharSequence s)
```

Parameters:

- `s`: the field descriptor

Throws:

- `IllegalArgumentException`: only if the descriptor is not valid

## TypeKind.from(TypeDescriptor.OfField<?>)

```java
public static TypeKind from(TypeDescriptor.OfField<?> descriptor)
```

Parameters:

- `descriptor`: the field descriptor
