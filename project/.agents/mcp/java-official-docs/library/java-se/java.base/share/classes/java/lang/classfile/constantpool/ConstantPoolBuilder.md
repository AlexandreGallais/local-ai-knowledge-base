---
title: "ConstantPoolBuilder interface (java.lang.classfile.constantpool) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/ConstantPoolBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantPoolBuilder interface (java.lang.classfile.constantpool)

```java
public sealed interface ConstantPoolBuilder extends ConstantPool permits SplitConstantPool, TemporaryConstantPool
```

Builder for the constant pool of a `class` file.  Provides read and
write access to the constant pool that is being built.  Writing is append-only (the index of new entries monotonically
increase) and idempotent (entry-bearing methods will return an existing entry
if there is a suitable one).

For `class` file building, an overload of ClassEntry, ConstantPoolBuilder, Consumer) ClassFile::build takes a
`ConstantPoolBuilder`.  For `class` file transformations via
ClassFile::transformClass, the `ClassFile.ConstantPoolSharingOption` controls how the constant pool builder
of the resulting `class` is created.

#### Alien Constant Pool Entries

In `class` file building and constant pool building, some constant pool
entries supplied may be alien
to this constant pool builder of the active class file builder.  For example,
classEntry(Utf8Entry) may be called with an
alien UTF8 entry.  Alien entries will be converted to a pool entry in
this constant pool builder, reusing equivalent entries or adding new entries
if there is none.  As a result, all pool entries returned by entry-bearing
methods in this constant pool builder belong to this constant pool.

Some `ClassFileBuilder` methods may have their outputs adjusted if they
receive pool entries alien to their constant pools.  For example, if an ldc_w instruction with an alien entry is written to a `CodeBuilder`,
the `CodeBuilder` may emit a functionally equivalent `ldc`
instruction instead, if the converted entry can be encoded in such an
instruction.

To avoid the conversion of alien constant pool entries, such as for the
accuracy of the generated `class` file, users can always supply
constant pool entries obtained by calling the constant pool builder
entry-bearing methods of the constant pools associated with the `ClassFileBuilder`.  Otherwise, the conversions have no impact on the
behaviors of the generated `class` files.

**See also:** ClassFileBuilder#constantPool()

**Since:** 24

## ConstantPoolBuilder.of(ClassModel)

```java
static ConstantPoolBuilder of(ClassModel classModel)
```

The new constant pool builder will
be pre-populated with the contents of the constant pool associated with the given class model.  The
index of new entries will start from the size() of the source pool.

Parameters:

- `classModel`: the class to copy from

**See also:** ClassFile#build(ClassEntry, ConstantPoolBuilder, Consumer)

**See also:** ClassFile.ConstantPoolSharingOption#SHARED_POOL

## ConstantPoolBuilder.of()

```java
static ConstantPoolBuilder of()
```

The new constant pool builder
will be empty.  The index of new entries will start from `1`.

**See also:** ClassFile.ConstantPoolSharingOption#NEW_POOL

## ConstantPoolBuilder.canWriteDirect(ConstantPool)

```java
boolean canWriteDirect(ConstantPool constantPool)
```

This may be because they
are the same builder, or because this builder was pre-populated from the given constant pool.

If the constant pool of an entry is not directly writable to this pool,
it is alien to this pool, and a `ClassFileBuilder` associated
with this constant pool will convert that alien constant pool entry.

Parameters:

- `constantPool`: the given constant pool

**See also:** ClassFileBuilder#constantPool() ClassFileBuilder::constantPool

**See also:** ##alien Alien Constant Pool Entries

## ConstantPoolBuilder.utf8Entry(String)

```java
Utf8Entry utf8Entry(String s)
```

Parameters:

- `s`: the string

**See also:** Utf8Entry#stringValue() Utf8Entry::stringValue

## ConstantPoolBuilder.utf8Entry(ClassDesc)

```java
default Utf8Entry utf8Entry(ClassDesc desc)
```

Parameters:

- `desc`: the symbolic descriptor for the class

**API note:** The resulting `Utf8Entry` is usually not referable by a `ClassEntry`, which uses
internal form of binary names.

## ConstantPoolBuilder.utf8Entry(MethodTypeDesc)

```java
default Utf8Entry utf8Entry(MethodTypeDesc desc)
```

Parameters:

- `desc`: the symbolic descriptor for the method type

## ConstantPoolBuilder.classEntry(Utf8Entry)

```java
ClassEntry classEntry(Utf8Entry ne)
```

The `Utf8Entry` describes the internal form
of the binary name of a class or interface or the field descriptor
string of an array type.

Parameters:

- `ne`: the `Utf8Entry`

**See also:** ClassEntry#name() ClassEntry::name

## ConstantPoolBuilder.classEntry(ClassDesc)

```java
default ClassEntry classEntry(ClassDesc classDesc)
```

Parameters:

- `classDesc`: the symbolic descriptor for the reference type

**See also:** ClassEntry#asSymbol() ClassEntry::asSymbol

Throws:

- `IllegalArgumentException`: if `classDesc` represents a primitive type

## ConstantPoolBuilder.packageEntry(Utf8Entry)

```java
PackageEntry packageEntry(Utf8Entry nameEntry)
```

The `Utf8Entry` describes the internal form
of the name of a package.

Parameters:

- `nameEntry`: the `Utf8Entry`

**See also:** PackageEntry#name() PackageEntry::name

## ConstantPoolBuilder.packageEntry(PackageDesc)

```java
default PackageEntry packageEntry(PackageDesc packageDesc)
```

Parameters:

- `packageDesc`: the symbolic descriptor for the package

**See also:** PackageEntry#asSymbol() PackageEntry::asSymbol

## ConstantPoolBuilder.moduleEntry(Utf8Entry)

```java
ModuleEntry moduleEntry(Utf8Entry moduleName)
```

The `Utf8Entry` describes the module name.

Parameters:

- `moduleName`: the constant pool entry describing the module name

**See also:** ModuleEntry#name() ModuleEntry::name

## ConstantPoolBuilder.moduleEntry(ModuleDesc)

```java
default ModuleEntry moduleEntry(ModuleDesc moduleDesc)
```

Parameters:

- `moduleDesc`: the symbolic descriptor for the module

**See also:** ModuleEntry#asSymbol() ModuleEntry::asSymbol

## ConstantPoolBuilder.nameAndTypeEntry(Utf8Entry, Utf8Entry)

```java
NameAndTypeEntry nameAndTypeEntry(Utf8Entry nameEntry, Utf8Entry typeEntry)
```

The name `Utf8Entry` describes an
unqualified name or the special name `ConstantDescs#INIT_NAME`,
and the type `Utf8Entry` describes a field or method descriptor
string.

Parameters:

- `nameEntry`: the name `Utf8Entry`
- `typeEntry`: the type `Utf8Entry`

**See also:** NameAndTypeEntry#name() NameAndTypeEntry::name

**See also:** NameAndTypeEntry#type() NameAndTypeEntry::type

## ConstantPoolBuilder.nameAndTypeEntry(String, ClassDesc)

```java
default NameAndTypeEntry nameAndTypeEntry(String name, ClassDesc type)
```

Parameters:

- `name`: the unqualified name
- `type`: the field descriptor

## ConstantPoolBuilder.nameAndTypeEntry(String, MethodTypeDesc)

```java
default NameAndTypeEntry nameAndTypeEntry(String name, MethodTypeDesc type)
```

The name can be an unqualified name or the
special name `ConstantDescs#INIT_NAME`.

Parameters:

- `name`: the unqualified name, or `ConstantDescs#INIT_NAME`
- `type`: the method descriptor

## ConstantPoolBuilder.fieldRefEntry(ClassEntry, NameAndTypeEntry)

```java
FieldRefEntry fieldRefEntry(ClassEntry owner, NameAndTypeEntry nameAndType)
```

The `ClassEntry` describes a class or
interface that has this field as a member, and the `NameAndTypeEntry` describes the unqualified name and the field descriptor
for this field.

Parameters:

- `owner`: the `ClassEntry`
- `nameAndType`: the `NameAndTypeEntry`

**See also:** FieldRefEntry#owner() FieldRefEntry::owner

**See also:** FieldRefEntry#nameAndType() FieldRefEntry::nameAndType

## ConstantPoolBuilder.fieldRefEntry(ClassDesc, String, ClassDesc)

```java
default FieldRefEntry fieldRefEntry(ClassDesc owner, String name, ClassDesc type)
```

Parameters:

- `owner`: the class or interface the field is a member of
- `name`: the unqualified name of the field
- `type`: the field descriptor

**See also:** FieldRefEntry#typeSymbol() FieldRefEntry::typeSymbol

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## ConstantPoolBuilder.methodRefEntry(ClassEntry, NameAndTypeEntry)

```java
MethodRefEntry methodRefEntry(ClassEntry owner, NameAndTypeEntry nameAndType)
```

The `ClassEntry` describes a class that
has this method as a member, and the `NameAndTypeEntry` describes
the unqualified name or the special name `ConstantDescs#INIT_NAME`
and the method descriptor for this method.

Parameters:

- `owner`: the `ClassEntry`
- `nameAndType`: the `NameAndTypeEntry`

**See also:** MethodRefEntry#owner() MethodRefEntry::owner

**See also:** MethodRefEntry#nameAndType() MethodRefEntry::nameAndType

## ConstantPoolBuilder.methodRefEntry(ClassDesc, String, MethodTypeDesc)

```java
default MethodRefEntry methodRefEntry(ClassDesc owner, String name, MethodTypeDesc type)
```

Parameters:

- `owner`: the class the method is a member of
- `name`: the unqualified name, or special name `ConstantDescs#INIT_NAME`, of the method
- `type`: the method descriptor

**See also:** MethodRefEntry#typeSymbol() MethodRefEntry::typeSymbol

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## ConstantPoolBuilder.interfaceMethodRefEntry(ClassEntry, NameAndTypeEntry)

```java
InterfaceMethodRefEntry interfaceMethodRefEntry(ClassEntry owner, NameAndTypeEntry nameAndType)
```

The `ClassEntry`
describes an interface that has this method as a member, and the `NameAndTypeEntry` describes the unqualified name and the method
descriptor for this method.

Parameters:

- `owner`: the `ClassEntry`
- `nameAndType`: the `NameAndTypeEntry`

**See also:** InterfaceMethodRefEntry#owner() InterfaceMethodRefEntry::owner

**See also:** InterfaceMethodRefEntry#nameAndType()
     InterfaceMethodRefEntry::nameAndType

## ConstantPoolBuilder.interfaceMethodRefEntry(ClassDesc, String, MethodTypeDesc)

```java
default InterfaceMethodRefEntry interfaceMethodRefEntry(ClassDesc owner, String name, MethodTypeDesc type)
```

Parameters:

- `owner`: the interface the method is a member of
- `name`: the unqualified name of the method
- `type`: the method descriptor

**See also:** InterfaceMethodRefEntry#typeSymbol() InterfaceMethodRefEntry::typeSymbol

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## ConstantPoolBuilder.methodTypeEntry(MethodTypeDesc)

```java
MethodTypeEntry methodTypeEntry(MethodTypeDesc descriptor)
```

Parameters:

- `descriptor`: the symbolic descriptor of the method type

**See also:** MethodTypeEntry#asSymbol() MethodTypeEntry::asSymbol

## ConstantPoolBuilder.methodTypeEntry(Utf8Entry)

```java
MethodTypeEntry methodTypeEntry(Utf8Entry descriptor)
```

The `Utf8Entry` represents a method descriptor string.

Parameters:

- `descriptor`: the `Utf8Entry`

**See also:** MethodTypeEntry#descriptor() MethodTypeEntry::descriptor

## ConstantPoolBuilder.methodHandleEntry(DirectMethodHandleDesc)

```java
default MethodHandleEntry methodHandleEntry(DirectMethodHandleDesc descriptor)
```

Parameters:

- `descriptor`: the symbolic descriptor of the method handle

**See also:** MethodHandleEntry#asSymbol() MethodHandleEntry::asSymbol

## ConstantPoolBuilder.methodHandleEntry(int, MemberRefEntry)

```java
MethodHandleEntry methodHandleEntry(int refKind, MemberRefEntry reference)
```

The reference kind must be
in `[1, 9]`, and the `MemberRefEntry` is subject to
various restrictions based on the reference kind (JVMS ).

Parameters:

- `refKind`: the reference kind of the method handle
- `reference`: the `MemberRefEntry`

**See also:** MethodHandleInfo##refkinds Reference kinds

**See also:** MethodHandleEntry#kind() MethodHandleEntry::kind

**See also:** MethodHandleEntry#reference() MethodHandleEntry::reference

## ConstantPoolBuilder.invokeDynamicEntry(DynamicCallSiteDesc)

```java
default InvokeDynamicEntry invokeDynamicEntry(DynamicCallSiteDesc dcsd)
```

Parameters:

- `dcsd`: the symbolic descriptor of the dynamic call site

**See also:** InvokeDynamicEntry#asSymbol() InvokeDynamicEntry::asSymbol

## ConstantPoolBuilder.invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

```java
InvokeDynamicEntry invokeDynamicEntry(BootstrapMethodEntry bootstrapMethodEntry, NameAndTypeEntry nameAndType)
```

The `BootstrapMethodEntry` describes the bootstrap method
and its invocation arguments in addition to the name and type,
and the `NameAndTypeEntry` a name and a method descriptor.

Parameters:

- `bootstrapMethodEntry`: the `BootstrapMethodEntry`
- `nameAndType`: the `NameAndTypeEntry`

**See also:** InvokeDynamicEntry#bootstrap() InvokeDynamicEntry::bootstrap

**See also:** InvokeDynamicEntry#nameAndType() InvokeDynamicEntry::nameAndType

## ConstantPoolBuilder.constantDynamicEntry(DynamicConstantDesc<?>)

```java
default ConstantDynamicEntry constantDynamicEntry(DynamicConstantDesc<?> dcd)
```

Parameters:

- `dcd`: the symbolic descriptor of the constant

**See also:** ConstantDynamicEntry#asSymbol() ConstantDynamicEntry::asSymbol

## ConstantPoolBuilder.constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

```java
ConstantDynamicEntry constantDynamicEntry(BootstrapMethodEntry bootstrapMethodEntry, NameAndTypeEntry nameAndType)
```

The `BootstrapMethodEntry` describes the bootstrap method
and its invocation arguments in addition to the name and type,
and the `NameAndTypeEntry` a name and a field descriptor.

Parameters:

- `bootstrapMethodEntry`: the `BootstrapMethodEntry`
- `nameAndType`: the `NameAndTypeEntry`

**See also:** ConstantDynamicEntry#bootstrap() ConstantDynamicEntry::bootstrap

**See also:** ConstantDynamicEntry#nameAndType() ConstantDynamicEntry::nameAndType

## ConstantPoolBuilder.intEntry(int)

```java
IntegerEntry intEntry(int value)
```

Parameters:

- `value`: the value

**See also:** IntegerEntry#intValue() IntegerEntry::intValue

## ConstantPoolBuilder.floatEntry(float)

```java
FloatEntry floatEntry(float value)
```

All NaN values of the `float` may or may not be collapsed into a
single "canonical" NaN value.

Parameters:

- `value`: the value

**See also:** FloatEntry#floatValue() FloatEntry::floatValue

## ConstantPoolBuilder.longEntry(long)

```java
LongEntry longEntry(long value)
```

Parameters:

- `value`: the value

**See also:** LongEntry#longValue() LongEntry::longValue

## ConstantPoolBuilder.doubleEntry(double)

```java
DoubleEntry doubleEntry(double value)
```

All NaN values of the `double` may or may not be collapsed into a
single "canonical" NaN value.

Parameters:

- `value`: the value

**See also:** DoubleEntry#doubleValue() DoubleEntry::doubleValue

## ConstantPoolBuilder.stringEntry(Utf8Entry)

```java
StringEntry stringEntry(Utf8Entry utf8)
```

The `Utf8Entry` describes the string value.

Parameters:

- `utf8`: the `Utf8Entry`

**See also:** StringEntry#utf8() StringEntry::utf8

## ConstantPoolBuilder.stringEntry(String)

```java
default StringEntry stringEntry(String value)
```

Parameters:

- `value`: the value

**See also:** StringEntry#stringValue() StringEntry::stringValue
