# StackMapFrameInfo interface (java.lang.classfile.attribute)

```java
public sealed interface StackMapFrameInfo permits StackMapDecoder.StackMapFrameImpl
```

Models a stack map frame in a {@link StackMapTableAttribute StackMapTable}
attribute (JVMS {@jvms 4.7.4}).  A stack map frame must appear at the
beginning of each basic block in a method (JVMS {@jvms 4.10.1}).

@apiNote
In general, a stack map frame should be defined for each target of a
{@link BranchInstruction}, or unreachable code right after an unconditional
branch instruction like {@link Opcode#GOTO goto}.  The automatic stack map
generation cannot handle unreachable code right after an unconditional jump;
The {@link ClassFile.DeadCodeOption} allows substituting such code, or
advanced users can provide their own stack maps for dead code.

@see StackMapTableAttribute#entries()
@jvms 4.7.4 The {@code StackMapTable} Attribute
@jvms 4.10.1 Verification by Type Checking
@since 24

## StackMapFrameInfo.frameType()

```java
int frameType()
```

{@return the raw {@code u1 frame_type}}

## StackMapFrameInfo.target()

```java
Label target()
```

{@return the frame target label}

## StackMapFrameInfo.locals()

```java
List<VerificationTypeInfo> locals()
```

{@return the expanded local variable types}

## StackMapFrameInfo.stack()

```java
List<VerificationTypeInfo> stack()
```

{@return the expanded operand stack types}

## StackMapFrameInfo.of(Label, List<VerificationTypeInfo>, List<VerificationTypeInfo>)

```java
public static StackMapFrameInfo of(Label target, List<VerificationTypeInfo> locals, List<VerificationTypeInfo> stack)
```

{@return a new stack map frame}

@param target the location of the frame
@param locals the complete list of frame locals
@param stack the complete frame stack

## StackMapFrameInfo.ITEM_TOP

```java
int ITEM_TOP
```

The {@link #tag() tag} for verification type info {@link SimpleVerificationTypeInfo#TOP TOP}.

## StackMapFrameInfo.ITEM_INTEGER

```java
int ITEM_INTEGER
```

The {@link #tag() tag} for verification type info {@link SimpleVerificationTypeInfo#INTEGER INTEGER}.

## StackMapFrameInfo.ITEM_FLOAT

```java
int ITEM_FLOAT
```

The {@link #tag() tag} for verification type info {@link SimpleVerificationTypeInfo#FLOAT FLOAT}.

## StackMapFrameInfo.ITEM_DOUBLE

```java
int ITEM_DOUBLE
```

The {@link #tag() tag} for verification type info {@link SimpleVerificationTypeInfo#DOUBLE DOUBLE}.

## StackMapFrameInfo.ITEM_LONG

```java
int ITEM_LONG
```

The {@link #tag() tag} for verification type info {@link SimpleVerificationTypeInfo#LONG LONG}.

## StackMapFrameInfo.ITEM_NULL

```java
int ITEM_NULL
```

The {@link #tag() tag} for verification type info {@link SimpleVerificationTypeInfo#NULL NULL}.

## StackMapFrameInfo.ITEM_UNINITIALIZED_THIS

```java
int ITEM_UNINITIALIZED_THIS
```

The {@link #tag() tag} for verification type info {@link SimpleVerificationTypeInfo#UNINITIALIZED_THIS UNINITIALIZED_THIS}.

## StackMapFrameInfo.ITEM_OBJECT

```java
int ITEM_OBJECT
```

The {@link #tag() tag} for verification type info {@link ObjectVerificationTypeInfo OBJECT}.

## StackMapFrameInfo.ITEM_UNINITIALIZED

```java
int ITEM_UNINITIALIZED
```

The {@link #tag() tag} for verification type info {@link UninitializedVerificationTypeInfo UNINITIALIZED}.

## StackMapFrameInfo.tag()

```java
int tag()
```

{@return the tag of the type info}

@apiNote
{@code ITEM_}-prefixed constants in this class, such as {@link #ITEM_TOP}, describe the
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

{@return a new object verification type info}
@param className the class of the object

## StackMapFrameInfo.of(ClassDesc)

```java
public static ObjectVerificationTypeInfo of(ClassDesc classDesc)
```

{@return a new object verification type info}
@param classDesc the class of the object
@throws IllegalArgumentException if {@code classDesc} represents a primitive type

## StackMapFrameInfo.className()

```java
ClassEntry className()
```

{@return the class of the object}

## StackMapFrameInfo.classSymbol()

```java
default ClassDesc classSymbol()
```

{@return the class of the object, as a symbolic descriptor}

## StackMapFrameInfo.newTarget()

```java
Label newTarget()
```

{@return the label immediately before the {@link Opcode#NEW new}
instruction that creates this uninitialized object}

## StackMapFrameInfo.of(Label)

```java
public static UninitializedVerificationTypeInfo of(Label newTarget)
```

{@return an uninitialized verification type info}
@param newTarget the label immediately before the {@link Opcode#NEW new}
                 instruction that creates this uninitialized object