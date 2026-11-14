# LoadableConstantEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface LoadableConstantEntry extends PoolEntry permits ClassEntry, ConstantDynamicEntry, ConstantValueEntry, MethodHandleEntry, MethodTypeEntry
```

Marker interface for constant pool entries suitable for loading via the
{@link ConstantInstruction.LoadConstantInstruction ldc} instructions.
<p>
The use of a {@code LoadableConstantEntry} is modeled by a {@link ConstantDesc}.
Conversions are through {@link ConstantPoolBuilder#loadableConstantEntry(ConstantDesc)}
and {@link #constantValue()}.

@see CodeBuilder#ldc(LoadableConstantEntry)
@jvms 4.4 The Constant Pool
@sealedGraph
@since 24

## LoadableConstantEntry.constantValue()

```java
ConstantDesc constantValue()
```

{@return a symbolic descriptor of this constant}

@see ConstantPoolBuilder#loadableConstantEntry(ConstantDesc)

## LoadableConstantEntry.typeKind()

```java
default TypeKind typeKind()
```

{@return the data type of this constant}
<p>
If the data type is of {@linkplain TypeKind#slotSize() category} 2, this
constant must be loaded with {@link Opcode#LDC2_W ldc2_w}; otherwise, the
data type is of category 1, and this constant must be loaded with {@link
Opcode#LDC ldc} or {@link Opcode#LDC_W ldc_w}.