# InterfaceMethodRefEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface InterfaceMethodRefEntry extends MemberRefEntry permits AbstractPoolEntry.InterfaceMethodRefEntryImpl
```

Models a {@code CONSTANT_InterfaceMethodRef_info} structure, or a symbolic
reference to an interface method, in the constant pool of a {@code class}
file.
<p>
An interface method reference entry is composite:
{@snippet lang=text :
// @link substring="InterfaceMethodRefEntry" target="ConstantPoolBuilder#interfaceMethodRefEntry(ClassEntry, NameAndTypeEntry)" :
InterfaceMethodRefEntry(
    ClassEntry owner, // @link substring="owner" target="#owner()"
    NameAndTypeEntry nameAndType // @link substring="nameAndType" target="#nameAndType()"
)
}
where the {@link #type() type} in the {@code nameAndType} is a {@linkplain
#typeSymbol() method descriptor} string.

@see ConstantPoolBuilder#interfaceMethodRefEntry
     ConstantPoolBuilder::interfaceMethodRefEntry
@jvms 4.4.2 The {@code CONSTANT_Fieldref_info}, {@code
            CONSTANT_Methodref_info}, and {@code
            CONSTANT_InterfaceMethodref_info} Structures
@since 24

## InterfaceMethodRefEntry.typeSymbol()

```java
default MethodTypeDesc typeSymbol()
```

{@return a symbolic descriptor for the {@linkplain #type() method type}}