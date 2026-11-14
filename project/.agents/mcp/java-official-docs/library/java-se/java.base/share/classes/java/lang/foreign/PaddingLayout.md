# PaddingLayout interface (java.lang.foreign)

```java
public sealed interface PaddingLayout extends MemoryLayout permits PaddingLayoutImpl
```

A padding layout. A padding layout specifies the size of extra space which is
typically not accessed by applications, and is typically used for aligning member
layouts around word boundaries.

@implSpec
Implementing classes are immutable, thread-safe and
<a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>.

@since 22

## PaddingLayout.withName(String)

```java
PaddingLayout withName(String name)
```

{@inheritDoc}

## PaddingLayout.withoutName()

```java
PaddingLayout withoutName()
```

{@inheritDoc}

## PaddingLayout.withByteAlignment(long)

```java
PaddingLayout withByteAlignment(long byteAlignment)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}