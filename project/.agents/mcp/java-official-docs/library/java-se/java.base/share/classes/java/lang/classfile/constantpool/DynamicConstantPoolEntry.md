# DynamicConstantPoolEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface DynamicConstantPoolEntry extends PoolEntry permits ConstantDynamicEntry, InvokeDynamicEntry
```

Superinterface modeling dynamically-computed constant pool entries, which
include {@link ConstantDynamicEntry} and {@link InvokeDynamicEntry}, in the
constant pool of a {@code class} file.
<p>
Different types of dynamically-computed constant pool entries bear structural
similarities, but they appear in distinct locations.  As a result, their uses
are represented by different symbolic descriptors, specific to each subtype.
<p>
A dynamic constant entry is composite:
{@snippet lang=text :
DynamicConstantPoolEntry(
    BootstrapMethodEntry bootstrap, // @link substring="bootstrap" target="#bootstrap()"
    NameAndTypeEntry nameAndType // @link substring="nameAndType" target="#nameAndType()"
)
}

@see java.lang.invoke##jvm_mods Dynamic resolution of call sites and
     constants
@jvms 4.4.10 The {@code CONSTANT_Dynamic_info} and {@code
             CONSTANT_InvokeDynamic_info} Structures
@jvms 5.4.3.6 Dynamically-Computed Constant and Call Site Resolution
@sealedGraph
@since 24

## DynamicConstantPoolEntry.bootstrap()

```java
BootstrapMethodEntry bootstrap()
```

{@return the entry in the bootstrap method table for this constant}

@see java.lang.invoke##bsm Execution of bootstrap methods
@see ConstantPoolBuilder#constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
     ConstantPoolBuilder::constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
@see ConstantPoolBuilder#invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
     ConstantPoolBuilder::invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

## DynamicConstantPoolEntry.bootstrapMethodIndex()

```java
int bootstrapMethodIndex()
```

{@return index of the entry in the bootstrap method table for this
constant}  The return value is equivalent to {@code
bootstrap().bsmIndex()}.

## DynamicConstantPoolEntry.nameAndType()

```java
NameAndTypeEntry nameAndType()
```

{@return the name and the descriptor string indicated by this symbolic
reference}

@see java.lang.invoke##bsm Execution of bootstrap methods
@see ConstantPoolBuilder#constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
     ConstantPoolBuilder::constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
@see ConstantPoolBuilder#invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
     ConstantPoolBuilder::invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

## DynamicConstantPoolEntry.name()

```java
default Utf8Entry name()
```

{@return the name indicated by this symbolic reference}

## DynamicConstantPoolEntry.type()

```java
default Utf8Entry type()
```

{@return the descriptor string indicated by this symbolic reference}
This is a field descriptor string if this entry is a {@link
ConstantDynamicEntry}, or a method descriptor string if this entry is a
{@link InvokeDynamicEntry}.

@apiNote
Each subinterface has its specific accessor named {@code typeSymbol} for
the symbolic descriptor derived from this descriptor string.