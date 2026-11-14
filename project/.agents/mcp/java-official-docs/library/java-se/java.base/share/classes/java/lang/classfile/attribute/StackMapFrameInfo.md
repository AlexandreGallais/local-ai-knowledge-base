---
title: "StackMapFrameInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/StackMapFrameInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StackMapFrameInfo interface (java.lang.classfile.attribute)

```java
public sealed interface StackMapFrameInfo permits StackMapDecoder.StackMapFrameImpl
```

Models a stack map frame in a StackMapTable
attribute (JVMS ).  A stack map frame must appear at the
beginning of each basic block in a method (JVMS ).

**API note:** In general, a stack map frame should be defined for each target of a
`BranchInstruction`, or unreachable code right after an unconditional
branch instruction like goto.  The automatic stack map
generation cannot handle unreachable code right after an unconditional jump;
The `ClassFile.DeadCodeOption` allows substituting such code, or
advanced users can provide their own stack maps for dead code.

**See also:** StackMapTableAttribute#entries()

**jvms:** 4.7.4 The `StackMapTable` Attribute

**jvms:** 4.10.1 Verification by Type Checking

**Since:** 24

## StackMapFrameInfo.frameType()

```java
int frameType()
```

## StackMapFrameInfo.target()

```java
Label target()
```

## StackMapFrameInfo.locals()

```java
List<VerificationTypeInfo> locals()
```

## StackMapFrameInfo.stack()

```java
List<VerificationTypeInfo> stack()
```

## StackMapFrameInfo.of(Label, List<VerificationTypeInfo>, List<VerificationTypeInfo>)

```java
public static StackMapFrameInfo of(Label target, List<VerificationTypeInfo> locals, List<VerificationTypeInfo> stack)
```

Parameters:

- `target`: the location of the frame
- `locals`: the complete list of frame locals
- `stack`: the complete frame stack

## StackMapFrameInfo.ITEM_TOP

```java
int ITEM_TOP
```

The tag for verification type info TOP.

## StackMapFrameInfo.ITEM_INTEGER

```java
int ITEM_INTEGER
```

The tag for verification type info INTEGER.

## StackMapFrameInfo.ITEM_FLOAT

```java
int ITEM_FLOAT
```

The tag for verification type info FLOAT.

## StackMapFrameInfo.ITEM_DOUBLE

```java
int ITEM_DOUBLE
```

The tag for verification type info DOUBLE.

## StackMapFrameInfo.ITEM_LONG

```java
int ITEM_LONG
```

The tag for verification type info LONG.

## StackMapFrameInfo.ITEM_NULL

```java
int ITEM_NULL
```

The tag for verification type info NULL.

## StackMapFrameInfo.ITEM_UNINITIALIZED_THIS

```java
int ITEM_UNINITIALIZED_THIS
```

The tag for verification type info UNINITIALIZED_THIS.

## StackMapFrameInfo.ITEM_OBJECT

```java
int ITEM_OBJECT
```

The tag for verification type info OBJECT.

## StackMapFrameInfo.ITEM_UNINITIALIZED

```java
int ITEM_UNINITIALIZED
```

The tag for verification type info UNINITIALIZED.

## StackMapFrameInfo.tag()

```java
int tag()
```

**API note:** `ITEM_`-prefixed constants in this class, such as `ITEM_TOP`, describe the
possible return values of this method.

## StackMapFrameInfo.TOP(ITEM_TOP), /** Verification type int. */ INTEGER(ITEM_INTEGER), /** Verification type float. */ FLOAT(ITEM_FLOAT), /** Verification type double. */ DOUBLE(ITEM_DOUBLE), /** Verification type long. */ LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)

```java
TOP(ITEM_TOP), /** Verification type int. */ INTEGER(ITEM_INTEGER), /** Verification type float. */ FLOAT(ITEM_FLOAT), /** Verification type double. */ DOUBLE(ITEM_DOUBLE), /** Verification type long. */ LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)
```

Verification type top.

## StackMapFrameInfo.INTEGER(ITEM_INTEGER), /** Verification type float. */ FLOAT(ITEM_FLOAT), /** Verification type double. */ DOUBLE(ITEM_DOUBLE), /** Verification type long. */ LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)

```java
INTEGER(ITEM_INTEGER), /** Verification type float. */ FLOAT(ITEM_FLOAT), /** Verification type double. */ DOUBLE(ITEM_DOUBLE), /** Verification type long. */ LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)
```

Verification type int.

## StackMapFrameInfo.FLOAT(ITEM_FLOAT), /** Verification type double. */ DOUBLE(ITEM_DOUBLE), /** Verification type long. */ LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)

```java
FLOAT(ITEM_FLOAT), /** Verification type double. */ DOUBLE(ITEM_DOUBLE), /** Verification type long. */ LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)
```

Verification type float.

## StackMapFrameInfo.DOUBLE(ITEM_DOUBLE), /** Verification type long. */ LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)

```java
DOUBLE(ITEM_DOUBLE), /** Verification type long. */ LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)
```

Verification type double.

## StackMapFrameInfo.LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)

```java
LONG(ITEM_LONG), /** Verification type null. */ NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)
```

Verification type long.

## StackMapFrameInfo.NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)

```java
NULL(ITEM_NULL), /** Verification type uninitializedThis. */ UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)
```

Verification type null.

## StackMapFrameInfo.UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)

```java
UNINITIALIZED_THIS(ITEM_UNINITIALIZED_THIS)
```

Verification type uninitializedThis.

## StackMapFrameInfo.of(ClassEntry)

```java
public static ObjectVerificationTypeInfo of(ClassEntry className)
```

Parameters:

- `className`: the class of the object

## StackMapFrameInfo.of(ClassDesc)

```java
public static ObjectVerificationTypeInfo of(ClassDesc classDesc)
```

Parameters:

- `classDesc`: the class of the object

Throws:

- `IllegalArgumentException`: if `classDesc` represents a primitive type

## StackMapFrameInfo.className()

```java
ClassEntry className()
```

## StackMapFrameInfo.classSymbol()

```java
default ClassDesc classSymbol()
```

## StackMapFrameInfo.newTarget()

```java
Label newTarget()
```

## StackMapFrameInfo.of(Label)

```java
public static UninitializedVerificationTypeInfo of(Label newTarget)
```

Parameters:

- `newTarget`: the label immediately before the new instruction that creates this uninitialized object
