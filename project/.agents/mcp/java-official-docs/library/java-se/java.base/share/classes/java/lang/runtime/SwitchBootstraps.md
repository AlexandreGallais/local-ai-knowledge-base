---
title: "SwitchBootstraps class (java.lang.runtime)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/runtime/SwitchBootstraps.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SwitchBootstraps class (java.lang.runtime)

```java
public final class SwitchBootstraps
```

Bootstrap methods for linking `invokedynamic` call sites that implement
the selection functionality of the `switch` statement.  The bootstraps
take additional static arguments corresponding to the `case` labels
of the `switch`, implicitly numbered sequentially from `[0..N)`.

**Since:** 21

## SwitchBootstraps.typeSwitch(MethodHandles.Lookup, String, MethodType, Object...)

```java
public static CallSite typeSwitch(MethodHandles.Lookup lookup, String invocationName, MethodType invocationType, Object... labels)
```

Bootstrap method for linking an `invokedynamic` call site that
implements a `switch` on a target of a reference type.  The static
arguments are an array of case labels which must be non-null and of type
`String` or `Integer` or `Class` or `EnumDesc`.

The type of the returned `CallSite`'s method handle will have
a return type of `int`.   It has two parameters: the first argument
will be an `Object` instance (`target`) and the second
will be `int` (`restart`).

If the `target` is `null`, then the method of the call site
returns -1.

If the `target` is not `null`, then the method of the call site
returns the index of the first element in the `labels` array starting from
the `restart` index matching one of the following conditions:

- the element is of type `Class` that is assignable
      from the target's class; or

- the element is of type `String` or `Integer` and
      equals to the target.

- the element is of type `EnumDesc`, that describes a constant that is
      equals to the target.

If no element in the `labels` array matches the target, then
the method of the call site return the length of the `labels` array.

The value of the `restart` index must be between `0` (inclusive) and
the length of the `labels` array (inclusive),
both  or an `IndexOutOfBoundsException` is thrown.

Parameters:

- `lookup`: Represents a lookup context with the accessibility privileges of the caller. When used with `invokedynamic`, this is stacked automatically by the VM.
- `invocationName`: unused
- `invocationType`: The invocation type of the `CallSite` with two parameters, a reference type, an `int`, and `int` as a return type.
- `labels`: case labels - `String` and `Integer` constants and `Class` and `EnumDesc` instances, in any combination

**Returns:** a `CallSite` returning the first matching element as described above

**jvms:** 4.4.6 The CONSTANT_NameAndType_info Structure

**jvms:** 4.4.10 The CONSTANT_Dynamic_info and CONSTANT_InvokeDynamic_info Structures

Throws:

- `NullPointerException`: if any argument is `null`
- `IllegalArgumentException`: if any element in the labels array is null
- `IllegalArgumentException`: if the invocation type is not a method type of first parameter of a reference type, second parameter of type `int` and with `int` as its return type,
- `IllegalArgumentException`: if `labels` contains an element that is not of type `String`, `Integer`, `Long`, `Float`, `Double`, `Boolean`, `Class` or `EnumDesc`.
- `IllegalArgumentException`: if `labels` contains an element that is not of type `Boolean` when `target` is a `Boolean.class`.

## SwitchBootstraps.enumSwitch(MethodHandles.Lookup, String, MethodType, Object...)

```java
public static CallSite enumSwitch(MethodHandles.Lookup lookup, String invocationName, MethodType invocationType, Object... labels)
```

Bootstrap method for linking an `invokedynamic` call site that
implements a `switch` on a target of an enum type. The static
arguments are used to encode the case labels associated to the switch
construct, where each label can be encoded in two ways:

- as a `String` value, which represents the name of
      the enum constant associated with the label

- as a `Class` value, which represents the enum type
      associated with a type test pattern

The returned `CallSite`'s method handle will have
a return type of `int` and accepts two parameters: the first argument
will be an `Enum` instance (`target`) and the second
will be `int` (`restart`).

If the `target` is `null`, then the method of the call site
returns -1.

If the `target` is not `null`, then the method of the call site
returns the index of the first element in the `labels` array starting from
the `restart` index matching one of the following conditions:

- the element is of type `Class` that is assignable
      from the target's class; or

- the element is of type `String` and equals to the target
      enum constant's `Enum.name()`.

If no element in the `labels` array matches the target, then
the method of the call site return the length of the `labels` array.

The value of the `restart` index must be between `0` (inclusive) and
the length of the `labels` array (inclusive),
both  or an `IndexOutOfBoundsException` is thrown.

Parameters:

- `lookup`: Represents a lookup context with the accessibility privileges of the caller. When used with `invokedynamic`, this is stacked automatically by the VM.
- `invocationName`: unused
- `invocationType`: The invocation type of the `CallSite` with two parameters, an enum type, an `int`, and `int` as a return type.
- `labels`: case labels - `String` constants and `Class` instances, in any combination

**Returns:** a `CallSite` returning the first matching element as described above

**jvms:** 4.4.6 The CONSTANT_NameAndType_info Structure

**jvms:** 4.4.10 The CONSTANT_Dynamic_info and CONSTANT_InvokeDynamic_info Structures

Throws:

- `NullPointerException`: if any argument is `null`
- `IllegalArgumentException`: if any element in the labels array is null, if the invocation type is not a method type whose first parameter type is an enum type, second parameter of type `int` and whose return type is `int`, or if `labels` contains an element that is not of type `String` or `Class` of the target enum type.
