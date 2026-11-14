# ConstantPoolBuilder interface (java.lang.classfile.constantpool)

```java
public sealed interface ConstantPoolBuilder extends ConstantPool permits SplitConstantPool, TemporaryConstantPool
```

Builder for the constant pool of a {@code class} file.  Provides read and
write access to the constant pool that is {@linkplain ClassFileBuilder#constantPool()
being built}.  Writing is append-only (the index of new entries monotonically
increase) and idempotent (entry-bearing methods will return an existing entry
if there is a suitable one).
<p>
For {@code class} file building, an overload of {@link ClassFile#build(
ClassEntry, ConstantPoolBuilder, Consumer) ClassFile::build} takes a
{@code ConstantPoolBuilder}.  For {@code class} file transformations via
{@link ClassFile#transformClass ClassFile::transformClass}, the {@link
ClassFile.ConstantPoolSharingOption} controls how the constant pool builder
of the resulting {@code class} is created.

<h2 id="alien">Alien Constant Pool Entries</h2>
In {@code class} file building and constant pool building, some constant pool
entries supplied may be {@linkplain #canWriteDirect(ConstantPool) alien}
to this constant pool builder of the active class file builder.  For example,
{@link #classEntry(Utf8Entry) classEntry(Utf8Entry)} may be called with an
alien UTF8 entry.  Alien entries will be converted to a pool entry in
this constant pool builder, reusing equivalent entries or adding new entries
if there is none.  As a result, all pool entries returned by entry-bearing
methods in this constant pool builder belong to this constant pool.
<p>
Some {@link ClassFileBuilder} methods may have their outputs adjusted if they
receive pool entries alien to {@linkplain ClassFileBuilder#constantPool
their constant pools}.  For example, if an {@link ConstantInstruction#ofLoad
ldc_w} instruction with an alien entry is written to a {@link CodeBuilder},
the {@code CodeBuilder} may emit a functionally equivalent {@code ldc}
instruction instead, if the converted entry can be encoded in such an
instruction.
<p>
To avoid the conversion of alien constant pool entries, such as for the
accuracy of the generated {@code class} file, users can always supply
constant pool entries obtained by calling the constant pool builder
entry-bearing methods of the constant pools associated with the {@code
ClassFileBuilder}.  Otherwise, the conversions have no impact on the
behaviors of the generated {@code class} files.

@see ClassFileBuilder#constantPool()
@since 24

## ConstantPoolBuilder.of(ClassModel)

```java
static ConstantPoolBuilder of(ClassModel classModel)
```

{@return a new constant pool builder}  The new constant pool builder will
be pre-populated with the contents of the constant pool {@linkplain
ClassModel#constantPool() associated with} the given class model.  The
index of new entries will start from the {@link ConstantPool#size()
size()} of the source pool.

@param classModel the class to copy from
@see ClassFile#build(ClassEntry, ConstantPoolBuilder, Consumer)
@see ClassFile.ConstantPoolSharingOption#SHARED_POOL

## ConstantPoolBuilder.of()

```java
static ConstantPoolBuilder of()
```

{@return a new constant pool builder}  The new constant pool builder
will be empty.  The index of new entries will start from {@code 1}.

@see ClassFile.ConstantPoolSharingOption#NEW_POOL

## ConstantPoolBuilder.canWriteDirect(ConstantPool)

```java
boolean canWriteDirect(ConstantPool constantPool)
```

{@return {@code true} if the index of any entry in the given constant
pool refers to the same entry in this builder}  This may be because they
are the same builder, or because this builder was {@linkplain
#of(ClassModel) pre-populated} from the given constant pool.
<p>
If the constant pool of an entry is not directly writable to this pool,
it is alien to this pool, and a {@link ClassFileBuilder} associated
with this constant pool will convert that alien constant pool entry.

@param constantPool the given constant pool
@see ClassFileBuilder#constantPool() ClassFileBuilder::constantPool
@see ##alien Alien Constant Pool Entries

## ConstantPoolBuilder.utf8Entry(String)

```java
Utf8Entry utf8Entry(String s)
```

{@return a {@link Utf8Entry} describing the provided {@link String}}

@param s the string
@see Utf8Entry#stringValue() Utf8Entry::stringValue

## ConstantPoolBuilder.utf8Entry(ClassDesc)

```java
default Utf8Entry utf8Entry(ClassDesc desc)
```

{@return a {@link Utf8Entry} describing the {@linkplain
ClassDesc#descriptorString() field descriptor string} of the provided
{@link ClassDesc}}

@apiNote
The resulting {@code Utf8Entry} is usually not {@linkplain
#classEntry(Utf8Entry) referable by} a {@link ClassEntry}, which uses
internal form of binary names.

@param desc the symbolic descriptor for the class

## ConstantPoolBuilder.utf8Entry(MethodTypeDesc)

```java
default Utf8Entry utf8Entry(MethodTypeDesc desc)
```

{@return a {@link Utf8Entry} describing the {@linkplain
MethodTypeDesc#descriptorString() method descriptor string} of the
provided {@link MethodTypeDesc}}

@param desc the symbolic descriptor for the method type

## ConstantPoolBuilder.classEntry(Utf8Entry)

```java
ClassEntry classEntry(Utf8Entry ne)
```

{@return a {@link ClassEntry} referring to the provided {@link
Utf8Entry}}  The {@code Utf8Entry} describes the internal form
of the binary name of a class or interface or the field descriptor
string of an array type.

@param ne the {@code Utf8Entry}
@see ClassEntry#name() ClassEntry::name

## ConstantPoolBuilder.classEntry(ClassDesc)

```java
default ClassEntry classEntry(ClassDesc classDesc)
```

{@return a {@link ClassEntry} describing the same reference type
as the provided {@link ClassDesc}}

@param classDesc the symbolic descriptor for the reference type
@throws IllegalArgumentException if {@code classDesc} represents a
        primitive type
@see ClassEntry#asSymbol() ClassEntry::asSymbol

## ConstantPoolBuilder.packageEntry(Utf8Entry)

```java
PackageEntry packageEntry(Utf8Entry nameEntry)
```

{@return a {@link PackageEntry} referring to the provided {@link
Utf8Entry}}  The {@code Utf8Entry} describes the internal form
of the name of a package.

@param nameEntry the {@code Utf8Entry}
@see PackageEntry#name() PackageEntry::name

## ConstantPoolBuilder.packageEntry(PackageDesc)

```java
default PackageEntry packageEntry(PackageDesc packageDesc)
```

{@return a {@link PackageEntry} describing the same package as the
provided {@link PackageDesc}}

@param packageDesc the symbolic descriptor for the package
@see PackageEntry#asSymbol() PackageEntry::asSymbol

## ConstantPoolBuilder.moduleEntry(Utf8Entry)

```java
ModuleEntry moduleEntry(Utf8Entry moduleName)
```

{@return a {@link ModuleEntry} referring to the provided {@link
Utf8Entry}}  The {@code Utf8Entry} describes the module name.

@param moduleName the constant pool entry describing the module name
@see ModuleEntry#name() ModuleEntry::name

## ConstantPoolBuilder.moduleEntry(ModuleDesc)

```java
default ModuleEntry moduleEntry(ModuleDesc moduleDesc)
```

{@return a {@link ModuleEntry} describing the same module as the provided
{@link ModuleDesc}}

@param moduleDesc the symbolic descriptor for the module
@see ModuleEntry#asSymbol() ModuleEntry::asSymbol

## ConstantPoolBuilder.nameAndTypeEntry(Utf8Entry, Utf8Entry)

```java
NameAndTypeEntry nameAndTypeEntry(Utf8Entry nameEntry, Utf8Entry typeEntry)
```

{@return a {@link NameAndTypeEntry} referring to the provided name and
type {@link Utf8Entry}}  The name {@code Utf8Entry} describes an
unqualified name or the special name {@value ConstantDescs#INIT_NAME},
and the type {@code Utf8Entry} describes a field or method descriptor
string.

@param nameEntry the name {@code Utf8Entry}
@param typeEntry the type {@code Utf8Entry}
@see NameAndTypeEntry#name() NameAndTypeEntry::name
@see NameAndTypeEntry#type() NameAndTypeEntry::type

## ConstantPoolBuilder.nameAndTypeEntry(String, ClassDesc)

```java
default NameAndTypeEntry nameAndTypeEntry(String name, ClassDesc type)
```

{@return a {@link NameAndTypeEntry} describing the provided unqualified
name and field descriptor}

@param name the unqualified name
@param type the field descriptor

## ConstantPoolBuilder.nameAndTypeEntry(String, MethodTypeDesc)

```java
default NameAndTypeEntry nameAndTypeEntry(String name, MethodTypeDesc type)
```

{@return a {@link NameAndTypeEntry} describing the provided name and
method descriptor}  The name can be an unqualified name or the
special name {@value ConstantDescs#INIT_NAME}.

@param name the unqualified name, or {@value ConstantDescs#INIT_NAME}
@param type the method descriptor

## ConstantPoolBuilder.fieldRefEntry(ClassEntry, NameAndTypeEntry)

```java
FieldRefEntry fieldRefEntry(ClassEntry owner, NameAndTypeEntry nameAndType)
```

{@return a {@link FieldRefEntry} referring to a {@link ClassEntry} and a
{@link NameAndTypeEntry}}  The {@code ClassEntry} describes a class or
interface that has this field as a member, and the {@code
NameAndTypeEntry} describes the unqualified name and the field descriptor
for this field.

@param owner the {@code ClassEntry}
@param nameAndType the {@code NameAndTypeEntry}
@see FieldRefEntry#owner() FieldRefEntry::owner
@see FieldRefEntry#nameAndType() FieldRefEntry::nameAndType

## ConstantPoolBuilder.fieldRefEntry(ClassDesc, String, ClassDesc)

```java
default FieldRefEntry fieldRefEntry(ClassDesc owner, String name, ClassDesc type)
```

{@return a {@link FieldRefEntry} describing a field of a class}

@param owner the class or interface the field is a member of
@param name the unqualified name of the field
@param type the field descriptor
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see FieldRefEntry#typeSymbol() FieldRefEntry::typeSymbol

## ConstantPoolBuilder.methodRefEntry(ClassEntry, NameAndTypeEntry)

```java
MethodRefEntry methodRefEntry(ClassEntry owner, NameAndTypeEntry nameAndType)
```

{@return a {@link MethodRefEntry} referring to a {@link ClassEntry} and a
{@link NameAndTypeEntry}}  The {@code ClassEntry} describes a class that
has this method as a member, and the {@code NameAndTypeEntry} describes
the unqualified name or the special name {@value ConstantDescs#INIT_NAME}
and the method descriptor for this method.

@param owner the {@code ClassEntry}
@param nameAndType the {@code NameAndTypeEntry}
@see MethodRefEntry#owner() MethodRefEntry::owner
@see MethodRefEntry#nameAndType() MethodRefEntry::nameAndType

## ConstantPoolBuilder.methodRefEntry(ClassDesc, String, MethodTypeDesc)

```java
default MethodRefEntry methodRefEntry(ClassDesc owner, String name, MethodTypeDesc type)
```

{@return a {@link MethodRefEntry} describing a method of a class}

@param owner the class the method is a member of
@param name the unqualified name, or special name {@value
       ConstantDescs#INIT_NAME}, of the method
@param type the method descriptor
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see MethodRefEntry#typeSymbol() MethodRefEntry::typeSymbol

## ConstantPoolBuilder.interfaceMethodRefEntry(ClassEntry, NameAndTypeEntry)

```java
InterfaceMethodRefEntry interfaceMethodRefEntry(ClassEntry owner, NameAndTypeEntry nameAndType)
```

{@return an {@link InterfaceMethodRefEntry} referring to a {@link
ClassEntry} and a {@link NameAndTypeEntry}}  The {@code ClassEntry}
describes an interface that has this method as a member, and the {@code
NameAndTypeEntry} describes the unqualified name and the method
descriptor for this method.

@param owner the {@code ClassEntry}
@param nameAndType the {@code NameAndTypeEntry}
@see InterfaceMethodRefEntry#owner() InterfaceMethodRefEntry::owner
@see InterfaceMethodRefEntry#nameAndType()
     InterfaceMethodRefEntry::nameAndType

## ConstantPoolBuilder.interfaceMethodRefEntry(ClassDesc, String, MethodTypeDesc)

```java
default InterfaceMethodRefEntry interfaceMethodRefEntry(ClassDesc owner, String name, MethodTypeDesc type)
```

{@return an {@link InterfaceMethodRefEntry} describing a method of an
interface}

@param owner the interface the method is a member of
@param name the unqualified name of the method
@param type the method descriptor
@throws IllegalArgumentException if {@code owner} represents a primitive type
@see InterfaceMethodRefEntry#typeSymbol() InterfaceMethodRefEntry::typeSymbol

## ConstantPoolBuilder.methodTypeEntry(MethodTypeDesc)

```java
MethodTypeEntry methodTypeEntry(MethodTypeDesc descriptor)
```

{@return a {@link MethodTypeEntry} describing the same method type as
the provided {@link MethodTypeDesc}}

@param descriptor the symbolic descriptor of the method type
@see MethodTypeEntry#asSymbol() MethodTypeEntry::asSymbol

## ConstantPoolBuilder.methodTypeEntry(Utf8Entry)

```java
MethodTypeEntry methodTypeEntry(Utf8Entry descriptor)
```

{@return a {@link MethodTypeEntry} referring to a {@link Utf8Entry}}
The {@code Utf8Entry} represents a method descriptor string.

@param descriptor the {@code Utf8Entry}
@see MethodTypeEntry#descriptor() MethodTypeEntry::descriptor

## ConstantPoolBuilder.methodHandleEntry(DirectMethodHandleDesc)

```java
default MethodHandleEntry methodHandleEntry(DirectMethodHandleDesc descriptor)
```

{@return a {@link MethodHandleEntry} describing the same method handle as
the given {@link DirectMethodHandleDesc}}

@param descriptor the symbolic descriptor of the method handle
@see MethodHandleEntry#asSymbol() MethodHandleEntry::asSymbol

## ConstantPoolBuilder.methodHandleEntry(int, MemberRefEntry)

```java
MethodHandleEntry methodHandleEntry(int refKind, MemberRefEntry reference)
```

{@return a {@link MethodHandleEntry} encoding a reference kind and
referring to a {@link MemberRefEntry}}  The reference kind must be
in {@code [1, 9]}, and the {@code MemberRefEntry} is subject to
various restrictions based on the reference kind (JVMS {@jvms 4.4.8}).

@param refKind the reference kind of the method handle
@param reference the {@code MemberRefEntry}
@see MethodHandleInfo##refkinds Reference kinds
@see MethodHandleEntry#kind() MethodHandleEntry::kind
@see MethodHandleEntry#reference() MethodHandleEntry::reference

## ConstantPoolBuilder.invokeDynamicEntry(DynamicCallSiteDesc)

```java
default InvokeDynamicEntry invokeDynamicEntry(DynamicCallSiteDesc dcsd)
```

{@return an {@link InvokeDynamicEntry} describing the same dynamic call
site as the provided {@link DynamicCallSiteDesc}}

@param dcsd the symbolic descriptor of the dynamic call site
@see InvokeDynamicEntry#asSymbol() InvokeDynamicEntry::asSymbol

## ConstantPoolBuilder.invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

```java
InvokeDynamicEntry invokeDynamicEntry(BootstrapMethodEntry bootstrapMethodEntry, NameAndTypeEntry nameAndType)
```

{@return an {@link InvokeDynamicEntry} referring to a {@link
BootstrapMethodEntry} and a {@link NameAndTypeEntry}}
The {@code BootstrapMethodEntry} describes the bootstrap method
and its invocation arguments in addition to the name and type,
and the {@code NameAndTypeEntry} a name and a method descriptor.

@param bootstrapMethodEntry the {@code BootstrapMethodEntry}
@param nameAndType the {@code NameAndTypeEntry}
@see InvokeDynamicEntry#bootstrap() InvokeDynamicEntry::bootstrap
@see InvokeDynamicEntry#nameAndType() InvokeDynamicEntry::nameAndType

## ConstantPoolBuilder.constantDynamicEntry(DynamicConstantDesc<?>)

```java
default ConstantDynamicEntry constantDynamicEntry(DynamicConstantDesc<?> dcd)
```

{@return a {@link ConstantDynamicEntry} describing the dynamic constant
as the provided {@link DynamicConstantDesc}}

@param dcd the symbolic descriptor of the constant
@see ConstantDynamicEntry#asSymbol() ConstantDynamicEntry::asSymbol

## ConstantPoolBuilder.constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

```java
ConstantDynamicEntry constantDynamicEntry(BootstrapMethodEntry bootstrapMethodEntry, NameAndTypeEntry nameAndType)
```

{@return a {@link ConstantDynamicEntry} referring to a {@link
BootstrapMethodEntry} and a {@link NameAndTypeEntry}}
The {@code BootstrapMethodEntry} describes the bootstrap method
and its invocation arguments in addition to the name and type,
and the {@code NameAndTypeEntry} a name and a field descriptor.

@param bootstrapMethodEntry the {@code BootstrapMethodEntry}
@param nameAndType the {@code NameAndTypeEntry}
@see ConstantDynamicEntry#bootstrap() ConstantDynamicEntry::bootstrap
@see ConstantDynamicEntry#nameAndType() ConstantDynamicEntry::nameAndType

## ConstantPoolBuilder.intEntry(int)

```java
IntegerEntry intEntry(int value)
```

{@return an {@link IntegerEntry} describing the provided value}

@param value the value
@see IntegerEntry#intValue() IntegerEntry::intValue

## ConstantPoolBuilder.floatEntry(float)

```java
FloatEntry floatEntry(float value)
```

{@return a {@link FloatEntry} describing the provided value}
<p>
All NaN values of the {@code float} may or may not be collapsed into a
single {@linkplain Float#NaN "canonical" NaN value}.

@param value the value
@see FloatEntry#floatValue() FloatEntry::floatValue

## ConstantPoolBuilder.longEntry(long)

```java
LongEntry longEntry(long value)
```

{@return a {@link LongEntry} describing the provided value}

@param value the value
@see LongEntry#longValue() LongEntry::longValue

## ConstantPoolBuilder.doubleEntry(double)

```java
DoubleEntry doubleEntry(double value)
```

{@return a {@link DoubleEntry} describing the provided value}
<p>
All NaN values of the {@code double} may or may not be collapsed into a
single {@linkplain Double#NaN "canonical" NaN value}.

@param value the value
@see DoubleEntry#doubleValue() DoubleEntry::doubleValue

## ConstantPoolBuilder.stringEntry(Utf8Entry)

```java
StringEntry stringEntry(Utf8Entry utf8)
```

{@return a {@link StringEntry} referring to a {@link Utf8Entry}}
The {@code Utf8Entry} describes the string value.

@param utf8 the {@code Utf8Entry}
@see StringEntry#utf8() StringEntry::utf8

## ConstantPoolBuilder.stringEntry(String)

```java
default StringEntry stringEntry(String value)
```

{@return a {@link StringEntry} describing the provided value}

@param value the value
@see StringEntry#stringValue() StringEntry::stringValue

## ConstantPoolBuilder.constantValueEntry(ConstantDesc)

```java
default ConstantValueEntry constantValueEntry(ConstantDesc c)
```

{@return a {@link ConstantValueEntry} describing the provided constant
{@link Integer}, {@link Long}, {@link Float}, {@link Double}, or {@link
String} value}

@param c the provided constant value
@throws IllegalArgumentException if the value is not one of {@code
        Integer}, {@code Long}, {@code Float}, {@code Double}, or {@code
        String}
@see ConstantValueEntry#constantValue() ConstantValueEntry::constantValue
@see ConstantValueAttribute#of(ConstantDesc)
     ConstantValueAttribute::of(ConstantDesc)

## ConstantPoolBuilder.loadableConstantEntry(ConstantDesc)

```java
default LoadableConstantEntry loadableConstantEntry(ConstantDesc c)
```

{@return a {@link LoadableConstantEntry} describing the provided constant
value}

@param c the nominal descriptor for the constant

## ConstantPoolBuilder.bsmEntry(DirectMethodHandleDesc, List<ConstantDesc>)

```java
default BootstrapMethodEntry bsmEntry(DirectMethodHandleDesc methodReference, List<ConstantDesc> arguments)
```

{@return a {@link BootstrapMethodEntry} describing the provided
bootstrap method and arguments}

@param methodReference the bootstrap method
@param arguments the arguments

## ConstantPoolBuilder.bsmEntry(MethodHandleEntry, List<LoadableConstantEntry>)

```java
BootstrapMethodEntry bsmEntry(MethodHandleEntry methodReference, List<LoadableConstantEntry> arguments)
```

{@return a {@link BootstrapMethodEntry} referring to a {@link
MethodHandleEntry} and a list of {@link LoadableConstantEntry}}
The {@code MethodHandleEntry} is the bootstrap method, and the
list of {@code LoadableConstantEntry} is the arguments.

@param methodReference the {@code MethodHandleEntry}
@param arguments the list of {@code LoadableConstantEntry}
@see BootstrapMethodEntry#bootstrapMethod()
     BootstrapMethodEntry::bootstrapMethod
@see BootstrapMethodEntry#arguments() BootstrapMethodEntry::arguments