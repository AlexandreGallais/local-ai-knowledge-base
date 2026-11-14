# FunctionDescriptor interface (java.lang.foreign)

```java
public sealed interface FunctionDescriptor permits FunctionDescriptorImpl
```

A function descriptor models the signature of a foreign function. A function
descriptor is made up of zero or more argument layouts, and zero or one return layout.
A function descriptor is used to create
{@linkplain Linker#downcallHandle(MemorySegment, FunctionDescriptor, Linker.Option...) downcall method handles}
and
{@linkplain Linker#upcallStub(MethodHandle, FunctionDescriptor, Arena, Linker.Option...) upcall stubs}.

@implSpec
Implementing classes are immutable, thread-safe and
<a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>.

@see MemoryLayout
@since 22

## FunctionDescriptor.returnLayout()

```java
Optional<MemoryLayout> returnLayout()
```

{@return the return layout (if any) of this function descriptor}

## FunctionDescriptor.argumentLayouts()

```java
List<MemoryLayout> argumentLayouts()
```

{@return the argument layouts of this function descriptor (as an unmodifiable list)}

## FunctionDescriptor.appendArgumentLayouts(MemoryLayout...)

```java
FunctionDescriptor appendArgumentLayouts(MemoryLayout... addedLayouts)
```

Returns a function descriptor with the given argument layouts appended to the
argument layouts of this function descriptor.

@param addedLayouts the argument layouts to append
@throws IllegalArgumentException if one of the layouts in {@code addedLayouts} is
        a padding layout
@return a new function descriptor, with the provided additional argument layouts

## FunctionDescriptor.insertArgumentLayouts(int, MemoryLayout...)

```java
FunctionDescriptor insertArgumentLayouts(int index, MemoryLayout... addedLayouts)
```

Returns a function descriptor with the given argument layouts inserted at the
given index, into the argument layout array of this function descriptor.

@param index the index at which to insert the arguments
@param addedLayouts the argument layouts to insert at given index
@return a new function descriptor, with the provided additional argument layouts
@throws IllegalArgumentException if one of the layouts in {@code addedLayouts}
        is a padding layout
@throws IllegalArgumentException if {@code index < 0 || index > argumentLayouts().size()}

## FunctionDescriptor.changeReturnLayout(MemoryLayout)

```java
FunctionDescriptor changeReturnLayout(MemoryLayout newReturn)
```

Returns a function descriptor with the provided return layout.
@param newReturn the new return layout
@throws IllegalArgumentException if {@code newReturn} is a padding layout
@return a new function descriptor, with the provided return layout

## FunctionDescriptor.dropReturnLayout()

```java
FunctionDescriptor dropReturnLayout()
```

{@return a new function descriptor, with no return layout}

## FunctionDescriptor.toMethodType()

```java
MethodType toMethodType()
```

Returns the method type consisting of the carrier types of the layouts in this
function descriptor.
<p>
The carrier type of a layout {@code L} is determined as follows:
<ul>
<li>If {@code L} is a {@link ValueLayout} the carrier type is
    determined through {@link ValueLayout#carrier()}.</li>
<li>If {@code L} is a {@link GroupLayout} or a {@link SequenceLayout},
    the carrier type is {@link MemorySegment}.</li>
</ul>

@apiNote A function descriptor cannot, by construction, contain any padding
         layouts. As such, it is not necessary to specify how padding layout
         should be mapped to carrier types.

@return the method type consisting of the carrier types of the layouts in this
        function descriptor

## FunctionDescriptor.of(MemoryLayout, MemoryLayout...)

```java
static FunctionDescriptor of(MemoryLayout resLayout, MemoryLayout... argLayouts)
```

Creates a function descriptor with the given return and argument layouts.

@param resLayout the return layout
@param argLayouts the argument layouts
@throws IllegalArgumentException if {@code resLayout} is a padding layout
@throws IllegalArgumentException if one of the layouts in {@code argLayouts}
        is a padding layout
@return a new function descriptor with the provided return and argument layouts

## FunctionDescriptor.ofVoid(MemoryLayout...)

```java
static FunctionDescriptor ofVoid(MemoryLayout... argLayouts)
```

Creates a function descriptor with the given argument layouts and no return
layout. This is useful to model functions that return no values.

@param argLayouts the argument layouts
@throws IllegalArgumentException if one of the layouts in {@code argLayouts}
        is a padding layout
@return a new function descriptor with the provided argument layouts