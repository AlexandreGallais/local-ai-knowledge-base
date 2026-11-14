# ConstantValueEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface ConstantValueEntry extends LoadableConstantEntry permits DoubleEntry, FloatEntry, IntegerEntry, LongEntry, StringEntry
```

Marker interface for constant pool entries that can represent constant values
in the {@link Attributes#constantValue() ConstantValue} attribute.

@see ConstantPoolBuilder#constantValueEntry
     ConstantPoolBuilder::constantValueEntry
@sealedGraph
@since 24

## ConstantValueEntry.constantValue()

```java
ConstantDesc constantValue()
```

{@return the constant value}  The constant value will be an {@link
Integer}, {@link Long}, {@link Float}, {@link Double}, or {@link String}.

@see ConstantPoolBuilder#constantValueEntry(ConstantDesc)