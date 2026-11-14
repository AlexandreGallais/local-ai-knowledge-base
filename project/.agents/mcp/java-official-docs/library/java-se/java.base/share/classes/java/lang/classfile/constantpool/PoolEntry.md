# PoolEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface PoolEntry permits AnnotationConstantValueEntry, DynamicConstantPoolEntry, LoadableConstantEntry, MemberRefEntry, ModuleEntry, NameAndTypeEntry, PackageEntry
```

Models an entry in the constant pool of a {@code class} file.  Entries are
read from {@code class} files, and can be created with a {@link
ConstantPoolBuilder} to write to {@code class} files.

@implNote
<h2 id="unbound">Unbound Constant Pool Entries</h2>
Implementations may create unbound constant pool entries not belonging to
an actual constant pool.  They conveniently represent constant pool entries
referred by unbound {@linkplain Attribute attributes} not read from a {@code
class} file.  Their {@link #index() index()} return a non-positive invalid
value, and behaviors of their {@link #constantPool() constantPool()} are
unspecified.  They are considered alien to any {@linkplain
ClassFileBuilder#constantPool() contextual constant pool} and will be
converted when they are written to {@code class} files.

@see ConstantPoolBuilder##alien Alien Constant Pool Entries
@sealedGraph
@since 24

## PoolEntry.TAG_CLASS

```java
int TAG_CLASS
```

The {@linkplain #tag tag} for {@link ClassEntry CONSTANT_Class} constant kind.

## PoolEntry.TAG_DOUBLE

```java
int TAG_DOUBLE
```

The {@linkplain #tag tag} for {@link DoubleEntry CONSTANT_Double} constant kind.

## PoolEntry.TAG_DYNAMIC

```java
int TAG_DYNAMIC
```

The {@linkplain #tag tag} for {@link ConstantDynamicEntry CONSTANT_Dynamic} constant kind.

## PoolEntry.TAG_FIELDREF

```java
int TAG_FIELDREF
```

The {@linkplain #tag tag} for {@link FieldRefEntry CONSTANT_Fieldref} constant kind.

## PoolEntry.TAG_FLOAT

```java
int TAG_FLOAT
```

The {@linkplain #tag tag} for {@link FloatEntry CONSTANT_Float} constant kind.

## PoolEntry.TAG_INTEGER

```java
int TAG_INTEGER
```

The {@linkplain #tag tag} for {@link IntegerEntry CONSTANT_Integer} constant kind.

## PoolEntry.TAG_INTERFACE_METHODREF

```java
int TAG_INTERFACE_METHODREF
```

The {@linkplain #tag tag} for {@link InterfaceMethodRefEntry CONSTANT_InterfaceMethodref} constant kind.

## PoolEntry.TAG_INVOKE_DYNAMIC

```java
int TAG_INVOKE_DYNAMIC
```

The {@linkplain #tag tag} for {@link InvokeDynamicEntry CONSTANT_InvokeDynamic} constant kind.

## PoolEntry.TAG_LONG

```java
int TAG_LONG
```

The {@linkplain #tag tag} for {@link LongEntry CONSTANT_Long} constant kind.

## PoolEntry.TAG_METHOD_HANDLE

```java
int TAG_METHOD_HANDLE
```

The {@linkplain #tag tag} for {@link MethodHandleEntry CONSTANT_MethodHandle} constant kind.

## PoolEntry.TAG_METHODREF

```java
int TAG_METHODREF
```

The {@linkplain #tag tag} for {@link MethodRefEntry CONSTANT_Methodref} constant kind.

## PoolEntry.TAG_METHOD_TYPE

```java
int TAG_METHOD_TYPE
```

The {@linkplain #tag tag} for {@link MethodTypeEntry CONSTANT_MethodType} constant kind.

## PoolEntry.TAG_MODULE

```java
int TAG_MODULE
```

The {@linkplain #tag tag} for {@link ModuleEntry CONSTANT_Module} constant kind.

## PoolEntry.TAG_NAME_AND_TYPE

```java
int TAG_NAME_AND_TYPE
```

The {@linkplain #tag tag} for {@link NameAndTypeEntry CONSTANT_NameAndType} constant kind.

## PoolEntry.TAG_PACKAGE

```java
int TAG_PACKAGE
```

The {@linkplain #tag tag} for {@link PackageEntry CONSTANT_Package} constant kind.

## PoolEntry.TAG_STRING

```java
int TAG_STRING
```

The {@linkplain #tag tag} for {@link StringEntry CONSTANT_String} constant kind.

## PoolEntry.TAG_UTF8

```java
int TAG_UTF8
```

The {@linkplain #tag tag} for {@link Utf8Entry CONSTANT_Utf8} constant kind.

## PoolEntry.constantPool()

```java
ConstantPool constantPool()
```

{@return the constant pool this entry is from}

@apiNote
Given a {@link ConstantPoolBuilder} {@code builder} and a {@code
PoolEntry entry}, use {@link ConstantPoolBuilder#canWriteDirect
builder.canWriteDirect(entry.constantPool())} instead of object equality
of the constant pool to determine if an entry belongs to the builder.

@see ##unbound Unbound Constant Pool Entries

## PoolEntry.tag()

```java
int tag()
```

{@return the constant pool tag that describes the type of this entry}

@apiNote
{@code TAG_}-prefixed constants in this class, such as {@link #TAG_UTF8},
describe the possible return values of this method.

## PoolEntry.index()

```java
int index()
```

{@return the index within the constant pool corresponding to this entry}
A valid index is always positive; if the index is non-positive, this
entry is {@linkplain ##unbound unbound}.

@see ##unbound Unbound Constant Pool Entries

## PoolEntry.width()

```java
int width()
```

{@return the number of constant pool slots this entry consumes}
<p>
All pool entries except {@link LongEntry CONSTANT_Long} and {@link
DoubleEntry CONSTANT_Double} have width {@code 1}. These two exceptions
have width {@code 2}, and their subsequent indices at {@link #index()
index() + 1} are considered unusable.

@apiNote
If this entry is {@linkplain LoadableConstantEntry loadable}, the width
of this entry does not decide if this entry should be loaded with {@link
Opcode#LDC ldc} or {@link Opcode#LDC2_W ldc2_w}.  For example, {@link
ConstantDynamicEntry} always has width {@code 1}, but it must be loaded
with {@code ldc2_w} if its {@linkplain ConstantDynamicEntry#typeKind()
type} is {@link TypeKind#LONG long} or {@link TypeKind#DOUBLE double}.
Use {@link LoadableConstantEntry#typeKind() typeKind().slotSize()} to
determine the loading instruction instead.

@see ConstantPool##index Index in the Constant Pool