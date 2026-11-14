# InvokeDynamicEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface InvokeDynamicEntry extends DynamicConstantPoolEntry permits AbstractPoolEntry.InvokeDynamicEntryImpl
```

Models a {@code CONSTANT_InvokeDynamic_info} structure, or the symbolic
reference to a <dfn>{@index "dynamically-computed call site"}</dfn>, in the
constant pool of a {@code class} file.
<p>
The use of a {@code InvokeDynamicEntry} is modeled by a {@link
DynamicCallSiteDesc} symbolic descriptor.  It can be obtained from {@link
#asSymbol() InvokeDynamicEntry::asSymbol} and converted back to a constant
pool entry through {@link ConstantPoolBuilder#invokeDynamicEntry(DynamicCallSiteDesc)
ConstantPoolBuilder::invokeDynamicEntry}.
<p>
An invoke dynamic entry is composite:
{@snippet lang=text :
// @link substring="InvokeDynamicEntry" target="ConstantPoolBuilder#invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)" :
InvokeDynamicEntry(
    BootstrapMethodEntry bootstrap, // @link substring="bootstrap" target="#bootstrap()"
    NameAndTypeEntry nameAndType // @link substring="nameAndType" target="#nameAndType()"
)
}
where the {@link #type() type} in the {@code nameAndType} is a {@linkplain
#typeSymbol() method descriptor} string.

@apiNote
A dynamically-computed call site is frequently called a <dfn>{@index "dynamic
call site"}</dfn>, or an <dfn>{@index "indy"}</dfn>, from the abbreviation of
"invoke dynamic".

@see ConstantPoolBuilder#invokeDynamicEntry
     ConstantPoolBuilder::invokeDynamicEntry
@see DynamicCallSiteDesc
@see java.lang.invoke##indyinsn Dynamically-computed call sites
@jvms 4.4.10 The {@code CONSTANT_Dynamic_info} and {@code
             CONSTANT_InvokeDynamic_info} Structures
@since 24

## InvokeDynamicEntry.typeSymbol()

```java
default MethodTypeDesc typeSymbol()
```

{@return a symbolic descriptor for the {@linkplain #type() invocation
type} of this dynamic call site}

## InvokeDynamicEntry.asSymbol()

```java
default DynamicCallSiteDesc asSymbol()
```

{@return a symbolic descriptor for this dynamic call site}

@see ConstantPoolBuilder#invokeDynamicEntry(DynamicCallSiteDesc)
     ConstantPoolBuilder::invokeDynamicEntry(DynamicCallSiteDesc)