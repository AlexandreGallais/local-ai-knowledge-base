---
title: "ClassFile interface (java.lang.classfile) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassFile.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassFile interface (java.lang.classfile)

```java
public sealed interface ClassFile permits ClassFileImpl
```

Provides ability to parse, transform, and generate `class` files.
A `ClassFile` is a context with a set of options that condition how
parsing and generation are done.

**Since:** 24

## ClassFile.of()

```java
static ClassFile of()
```

Each subtype of `Option`
specifies its default.

The default `AttributeMapperOption` and `ClassHierarchyResolverOption` may be unsuitable for some `class`
files and result in parsing or generation errors.

## ClassFile.of(Option...)

```java
static ClassFile of(Option... options)
```

Equivalent to
ClassFile.of().withOptions(options).

Parameters:

- `options`: the desired processing options

## ClassFile.withOptions(Option...)

```java
ClassFile withOptions(Option... options)
```

Parameters:

- `options`: the desired processing options

## ClassFile.of(Function<Utf8Entry, AttributeMapper<?>>)

```java
static AttributeMapperOption of(Function<Utf8Entry, AttributeMapper<?>> attributeMapper)
```

Parameters:

- `attributeMapper`: a function mapping attribute names to attribute mappers

## ClassFile.attributeMapper()

```java
Function<Utf8Entry, AttributeMapper<?>> attributeMapper()
```

## ClassFile.of(ClassHierarchyResolver)

```java
static ClassHierarchyResolverOption of(ClassHierarchyResolver classHierarchyResolver)
```

Parameters:

- `classHierarchyResolver`: the resolver

## ClassFile.classHierarchyResolver()

```java
ClassHierarchyResolver classHierarchyResolver()
```

## ClassFile.the

```java
SHARED_POOL, /** * Creates a new constant pool when transforming the
```

Extend the new constant pool from the original constant pool when
transforming the `class` file.

These two transformations below are equivalent:

**See also:** ConstantPoolBuilder#of(ClassModel) ConstantPoolBuilder::of(ClassModel)

## ClassFile.is

```java
NEW_POOL } /** * The option describing whether to patch out unreachable code for stack map * generation. The default is
```

Creates a new constant pool when transforming the `class` file.

These two transformations below are equivalent:

**See also:** ConstantPoolBuilder#of() ConstantPoolBuilder::of()

## ClassFile.generated

```java
PATCH_DEAD_CODE, /** * Keep the unreachable code for the accuracy of the generated
```

Patch unreachable code with dummy code, and generate valid dummy
stack map entries.  This ensures the generated code can pass
verification (JVMS ).

## ClassFile.filter

```java
KEEP_DEAD_CODE } /** * The option describing whether to filter
```

Keep the unreachable code for the accuracy of the generated `class` file.  Users should set `StackMapsOption.DROP_STACK_MAPS`
to prevent stack map generation from running and provide their own
`StackMapTableAttribute` to a `CodeBuilder`.

## ClassFile.Filter

```java
FAIL_ON_DEAD_LABELS, /** * Filter
```

Fail fast on unbound labels.  This also ensures the accuracy of the generated `class` files.

## ClassFile.debug

```java
DROP_DEAD_LABELS } /** * The option describing whether to process or discard debug
```

Filter `PseudoInstruction`s with unbound labels.  Note that
instructions with unbound labels still cause an `IllegalArgumentException`.

## ClassFile.discard

```java
PASS_DEBUG, /** * Drop debug pseudo-instructions from traversal and builders. */ DROP_DEBUG } /** * The option describing whether to process or discard
```

Process debug pseudo-instructions like other member elements of a
`CodeModel`.

## ClassFile.discard

```java
DROP_DEBUG } /** * The option describing whether to process or discard
```

Drop debug pseudo-instructions from traversal and builders.

## ClassFile.Drop

```java
PASS_LINE_NUMBERS, /** * Drop
```

Process `LineNumber` like other member elements of a `CodeModel`.

## ClassFile.DROP_LINE_NUMBERS

```java
DROP_LINE_NUMBERS
```

Drop `LineNumber` from traversal and builders.

## ClassFile.an

```java
FIX_SHORT_JUMPS, /** * Fail with an
```

Automatically convert short jumps to long when necessary.

For an invalid instruction model, a `CodeBuilder` may generate
another or a few other instructions to accomplish the same effect.

## ClassFile.FAIL_ON_SHORT_JUMPS } /** * The option describing whether to generate stack maps. The default is *

```java
FAIL_ON_SHORT_JUMPS } /** * The option describing whether to generate stack maps. The default is *
```

Fail with an `IllegalArgumentException` if short jump overflows.

This is useful to ensure the physical accuracy of a generated `class` file and avoids the overhead from a failed first attempt for
overflowing forward jumps in some cases.

## ClassFile.STACK_MAPS_WHEN_REQUIRED, /** * Forces running stack map generation. This runs stack map generation * unconditionally and fails fast if the generation fails due to any * reason. */ GENERATE_STACK_MAPS, /** * Do not run stack map generation. Users must supply their own *

```java
STACK_MAPS_WHEN_REQUIRED, /** * Forces running stack map generation. This runs stack map generation * unconditionally and fails fast if the generation fails due to any * reason. */ GENERATE_STACK_MAPS, /** * Do not run stack map generation. Users must supply their own *
```

Generate stack maps or reuse existing ones if compatible.  Stack maps
are present on major versions `#JAVA_6_VERSION` or above.  For
these versions, `CodeBuilder` tries to reuse compatible stack
maps information if the code array and exception handlers are still
compatible after a transformation; otherwise, it runs stack map
generation.  However, it does not fail fast if the major version is
`#JAVA_6_VERSION`, which allows jump subroutine instructions
that are incompatible with stack maps to exist in the `code`
array.

## ClassFile.GENERATE_STACK_MAPS, /** * Do not run stack map generation. Users must supply their own *

```java
GENERATE_STACK_MAPS, /** * Do not run stack map generation. Users must supply their own *
```

Forces running stack map generation.  This runs stack map generation
unconditionally and fails fast if the generation fails due to any
reason.

## ClassFile.is

```java
DROP_STACK_MAPS } /** * The option describing whether to retain or discard attributes that cannot * verify their correctness after a transformation. The default is
```

Do not run stack map generation.  Users must supply their own
`StackMapTableAttribute` to a `CodeBuilder` if the code
has branches or exception handlers; otherwise, the generated code
will fail verification (JVMS ).

This option is required for user-supplied `StackMapTableAttribute`
to be respected.  Stack maps on an existing Code
attribute can be reused as below with this option:

## ClassFile.with

```java
PASS_ALL_ATTRIBUTES, /** * Drop attributes with
```

Retain all original attributes during transformation.

## ClassFile.with

```java
DROP_UNKNOWN_ATTRIBUTES, /** * Drop attributes with
```

Drop attributes with `AttributeStability.UNKNOWN` data
dependency during transformation.

## ClassFile.a

```java
DROP_UNSTABLE_ATTRIBUTES } /** * Parses a
```

Drop attributes with `AttributeStability.UNSTABLE` or higher
data dependency during transformation.

## ClassFile.parse(byte[])

```java
ClassModel parse(byte[] bytes)
```

Parses a `class` file into a `ClassModel`.

Due to the on-demand nature of `class` file parsing, an `IllegalArgumentException` may be thrown on any accessor method invocation
on the returned model or any structure returned by the accessors in the
structure hierarchy.

Parameters:

- `bytes`: the bytes of the `class` file

**Returns:** the class model

Throws:

- `IllegalArgumentException`: if the `class` file is malformed or of a version not supported by the current runtime

## ClassFile.parse(Path)

```java
default ClassModel parse(Path path) throws IOException
```

Parses a `class` into a `ClassModel`.

Due to the on-demand nature of `class` file parsing, an `IllegalArgumentException` may be thrown on any accessor method invocation
on the returned model or any structure returned by the accessors in the
structure hierarchy.

Parameters:

- `path`: the path to the `class` file

**Returns:** the class model

**See also:** #parse(byte[])

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if the `class` file is malformed or of a version not supported by the current runtime

## ClassFile.build(ClassDesc, Consumer<? super ClassBuilder>)

```java
default byte[] build(ClassDesc thisClass, Consumer<? super ClassBuilder> handler)
```

Builds a `class` file into a byte array.

Parameters:

- `thisClass`: the name of the class to build
- `handler`: a handler that receives a `ClassBuilder`

**Returns:** the `class` file bytes

Throws:

- `IllegalArgumentException`: if `thisClass` represents a primitive type or building encounters a failure

## ClassFile.build(ClassEntry, ConstantPoolBuilder, Consumer<? super ClassBuilder>)

```java
byte[] build(ClassEntry thisClassEntry, ConstantPoolBuilder constantPool, Consumer<? super ClassBuilder> handler)
```

Builds a `class` file into a byte array using the provided constant
pool builder.

Parameters:

- `thisClassEntry`: the name of the class to build
- `constantPool`: the constant pool builder
- `handler`: a handler that receives a `ClassBuilder`

**Returns:** the `class` file bytes

Throws:

- `IllegalArgumentException`: if building encounters a failure

## ClassFile.buildTo(Path, ClassDesc, Consumer<ClassBuilder>)

```java
default void buildTo(Path path, ClassDesc thisClass, Consumer<ClassBuilder> handler) throws IOException
```

Builds a `class` file into a file in a file system.

Parameters:

- `path`: the path to the file to write
- `thisClass`: the name of the class to build
- `handler`: a handler that receives a `ClassBuilder`

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if building encounters a failure

## ClassFile.buildTo(Path, ClassEntry, ConstantPoolBuilder, Consumer<? super ClassBuilder>)

```java
default void buildTo(Path path, ClassEntry thisClassEntry, ConstantPoolBuilder constantPool, Consumer<? super ClassBuilder> handler) throws IOException
```

Builds a `class` file into a file in a file system using the
provided constant pool builder.

Parameters:

- `path`: the path to the file to write
- `thisClassEntry`: the name of the class to build
- `constantPool`: the constant pool builder
- `handler`: a handler that receives a `ClassBuilder`

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if building encounters a failure

## ClassFile.buildModule(ModuleAttribute)

```java
default byte[] buildModule(ModuleAttribute moduleAttribute)
```

Builds a module descriptor into a byte array.

Parameters:

- `moduleAttribute`: the `Module` attribute

**Returns:** the `class` file bytes

Throws:

- `IllegalArgumentException`: if building encounters a failure

## ClassFile.buildModule(ModuleAttribute, Consumer<? super ClassBuilder>)

```java
default byte[] buildModule(ModuleAttribute moduleAttribute, Consumer<? super ClassBuilder> handler)
```

Builds a module descriptor into a byte array.

Parameters:

- `moduleAttribute`: the `Module` attribute
- `handler`: a handler that receives a `ClassBuilder`

**Returns:** the `class` file bytes

Throws:

- `IllegalArgumentException`: if building encounters a failure

## ClassFile.buildModuleTo(Path, ModuleAttribute)

```java
default void buildModuleTo(Path path, ModuleAttribute moduleAttribute) throws IOException
```

Builds a module descriptor into a file in a file system.

Parameters:

- `path`: the file to write
- `moduleAttribute`: the `Module` attribute

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if building encounters a failure

## ClassFile.buildModuleTo(Path, ModuleAttribute, Consumer<? super ClassBuilder>)

```java
default void buildModuleTo(Path path, ModuleAttribute moduleAttribute, Consumer<? super ClassBuilder> handler) throws IOException
```

Builds a module descriptor into a file in a file system.

Parameters:

- `path`: the file to write
- `moduleAttribute`: the `Module` attribute
- `handler`: a handler that receives a `ClassBuilder`

Throws:

- `IOException`: if an I/O error occurs
- `IllegalArgumentException`: if building encounters a failure

## ClassFile.transformClass(ClassModel, ClassTransform)

```java
default byte[] transformClass(ClassModel model, ClassTransform transform)
```

Transform one `class` file into a new `class` file according
to a `ClassTransform`.  The transform will receive each element of
this class, as well as a `ClassBuilder` for building the new class.
The transform is free to preserve, remove, or replace elements as it
sees fit.

This method behaves as if:

where `cpb` is determined by `ConstantPoolSharingOption`.

Parameters:

- `model`: the class model to transform
- `transform`: the transform

**API note:** This is named `transformClass` instead of `transform` for
consistency with `ClassBuilder.transformField`, `ClassBuilder.transformMethod`, and `MethodBuilder.transformCode`,
and to distinguish from `ClassFileBuilder.transform`, which is
more generic and powerful.

**Returns:** the bytes of the new class

**See also:** ConstantPoolSharingOption

Throws:

- `IllegalArgumentException`: if building encounters a failure

## ClassFile.transformClass(ClassModel, ClassDesc, ClassTransform)

```java
default byte[] transformClass(ClassModel model, ClassDesc newClassName, ClassTransform transform)
```

Transform one `class` file into a new `class` file according
to a `ClassTransform`.  The transform will receive each element of
this class, as well as a `ClassBuilder` for building the new class.
The transform is free to preserve, remove, or replace elements as it
sees fit.

Parameters:

- `model`: the class model to transform
- `newClassName`: new class name
- `transform`: the transform

**API note:** This is named `transformClass` instead of `transform` for
consistency with `ClassBuilder.transformField`, `ClassBuilder.transformMethod`, and `MethodBuilder.transformCode`,
and to distinguish from `ClassFileBuilder.transform`, which is
more generic and powerful.

**Returns:** the bytes of the new class

**See also:** ConstantPoolSharingOption

Throws:

- `IllegalArgumentException`: if building encounters a failure
