# MemberRefEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface MemberRefEntry extends PoolEntry permits FieldRefEntry, InterfaceMethodRefEntry, MethodRefEntry, AbstractPoolEntry.AbstractMemberRefEntry
```

Superinterface modeling symbolic references to a member of a class or interface
in the constant pool of a {@code class} file, which include references to
{@linkplain FieldRefEntry fields}, {@linkplain MethodRefEntry class methods},
and {@linkplain InterfaceMethodRefEntry interface methods}.
<p>
Different types of symbolic references to a member of a class or interface
bear structural similarities and share parts of the resolution processes, and
they can sometimes appear in the same locations.  For example, both {@link
MethodRefEntry} and {@link InterfaceMethodRefEntry} can appear in an {@link
Opcode#INVOKESTATIC invokestatic} instruction.
<p>
A member reference entry is composite:
{@snippet lang=text :
MemberRefEntry(
    ClassEntry owner, // @link substring="owner" target="#owner()"
    NameAndTypeEntry nameAndType // @link substring="nameAndType" target="#nameAndType()"
)
}

@jvms 4.4.2 The {@code CONSTANT_Fieldref_info}, {@code
            CONSTANT_Methodref_info}, and {@code
            CONSTANT_InterfaceMethodref_info} Structures
@sealedGraph
@since 24

## MemberRefEntry.owner()

```java
ClassEntry owner()
```

{@return the class or interface which this member belongs to}

## MemberRefEntry.nameAndType()

```java
NameAndTypeEntry nameAndType()
```

{@return the name and descriptor string of the member}

## MemberRefEntry.name()

```java
default Utf8Entry name()
```

{@return the name of the member}

## MemberRefEntry.type()

```java
default Utf8Entry type()
```

{@return the descriptor string of the member}  This is a field descriptor
string if this entry is a {@link FieldRefEntry}, or a method descriptor
string if this entry is a {@link MethodRefEntry} or {@link
InterfaceMethodRefEntry}.

@apiNote
Each subinterface defines a {@code typeSymbol()} accessor for the
symbolic descriptor for the member type.