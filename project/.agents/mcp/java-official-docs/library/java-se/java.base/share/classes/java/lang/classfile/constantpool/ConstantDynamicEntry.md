# ConstantDynamicEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface ConstantDynamicEntry extends DynamicConstantPoolEntry, LoadableConstantEntry permits AbstractPoolEntry.ConstantDynamicEntryImpl
```

Models a {@code CONSTANT_Dynamic_info} structure, representing a <dfn>{@index
"dynamically-computed constant"}</dfn>, in the constant pool of a {@code
class} file.
<p>
The use of a {@code ConstantDynamicEntry} is modeled by a {@link
DynamicConstantDesc}.  Conversions are through {@link #asSymbol()} and {@link
ConstantPoolBuilder#constantDynamicEntry(DynamicConstantDesc)}.
<p>
A dynamic constant entry is composite:
{@snippet lang=text :
// @link substring="ConstantDynamicEntry" target="ConstantPoolBuilder#constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)" :
ConstantDynamicEntry(
    BootstrapMethodEntry bootstrap, // @link substring="bootstrap" target="#bootstrap()"
    NameAndTypeEntry nameAndType // @link substring="nameAndType" target="#nameAndType()"
)
}
where {@link #type() nameAndType.type()} is a {@linkplain #typeSymbol()
field descriptor} string.

@apiNote
A dynamically-computed constant is frequently called a <dfn>{@index "dynamic
constant"}</dfn>, or a <dfn>{@index "condy"}</dfn>, from the abbreviation of
"constant dynamic".

@see ConstantPoolBuilder#constantDynamicEntry
     ConstantPoolBuilder::constantDynamicEntry
@see DynamicConstantDesc
@see java.lang.invoke##condycon Dynamically-computed constants
@jvms 4.4.10 The {@code CONSTANT_Dynamic_info} and {@code
             CONSTANT_InvokeDynamic_info} Structures
@since 24

## ConstantDynamicEntry.typeSymbol()

```java
default ClassDesc typeSymbol()
```

{@return a symbolic descriptor for the {@linkplain #type() field type} of
this dynamically-computed constant}

## ConstantDynamicEntry.constantValue()

```java
default ConstantDesc constantValue()
```

{@inheritDoc}
<p>
This is equivalent to {@link #asSymbol() asSymbol()}.

## ConstantDynamicEntry.asSymbol()

```java
default DynamicConstantDesc<?> asSymbol()
```

{@return a symbolic descriptor for this dynamically-computed constant}

@see ConstantPoolBuilder#constantDynamicEntry(DynamicConstantDesc)
     ConstantPoolBuilder::constantDynamicEntry(DynamicConstantDesc)

## ConstantDynamicEntry.typeKind()

```java
default TypeKind typeKind()
```

{@inheritDoc}

@apiNote
The data type of a dynamically-computed constant depends on its
{@linkplain #type() descriptor}, while the data type of all other
constants can be determined by their {@linkplain #tag() constant type}.