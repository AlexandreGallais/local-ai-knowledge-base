# SwitchBootstraps class (java.lang.runtime)

```java
public final class SwitchBootstraps
```

Bootstrap methods for linking {@code invokedynamic} call sites that implement
the selection functionality of the {@code switch} statement.  The bootstraps
take additional static arguments corresponding to the {@code case} labels
of the {@code switch}, implicitly numbered sequentially from {@code [0..N)}.

@since 21

## SwitchBootstraps.typeSwitch(MethodHandles.Lookup, String, MethodType, Object...)

```java
public static CallSite typeSwitch(MethodHandles.Lookup lookup, String invocationName, MethodType invocationType, Object... labels)
```

Bootstrap method for linking an {@code invokedynamic} call site that
implements a {@code switch} on a target of a reference type.  The static
arguments are an array of case labels which must be non-null and of type
{@code String} or {@code Integer} or {@code Class} or {@code EnumDesc}.
<p>
The type of the returned {@code CallSite}'s method handle will have
a return type of {@code int}.   It has two parameters: the first argument
will be an {@code Object} instance ({@code target}) and the second
will be {@code int} ({@code restart}).
<p>
If the {@code target} is {@code null}, then the method of the call site
returns {@literal -1}.
<p>
If the {@code target} is not {@code null}, then the method of the call site
returns the index of the first element in the {@code labels} array starting from
the {@code restart} index matching one of the following conditions:
<ul>
  <li>the element is of type {@code Class} that is assignable
      from the target's class; or</li>
  <li>the element is of type {@code String} or {@code Integer} and
      equals to the target.</li>
  <li>the element is of type {@code EnumDesc}, that describes a constant that is
      equals to the target.</li>
</ul>
<p>
If no element in the {@code labels} array matches the target, then
the method of the call site return the length of the {@code labels} array.
<p>
The value of the {@code restart} index must be between {@code 0} (inclusive) and
the length of the {@code labels} array (inclusive),
both  or an {@link IndexOutOfBoundsException} is thrown.

@param lookup Represents a lookup context with the accessibility
              privileges of the caller.  When used with {@code invokedynamic},
              this is stacked automatically by the VM.
@param invocationName unused
@param invocationType The invocation type of the {@code CallSite} with two parameters,
                      a reference type, an {@code int}, and {@code int} as a return type.
@param labels case labels - {@code String} and {@code Integer} constants
              and {@code Class} and {@code EnumDesc} instances, in any combination
@return a {@code CallSite} returning the first matching element as described above

@throws NullPointerException     if any argument is {@code null}
@throws IllegalArgumentException if any element in the labels array is null
@throws IllegalArgumentException if the invocation type is not a method type of first parameter of a reference type,
                                 second parameter of type {@code int} and with {@code int} as its return type,
@throws IllegalArgumentException if {@code labels} contains an element that is not of type {@code String},
                                 {@code Integer}, {@code Long}, {@code Float}, {@code Double}, {@code Boolean},
                                 {@code Class} or {@code EnumDesc}.
@throws IllegalArgumentException if {@code labels} contains an element that is not of type {@code Boolean}
                                 when {@code target} is a {@code Boolean.class}.
@jvms 4.4.6 The CONSTANT_NameAndType_info Structure
@jvms 4.4.10 The CONSTANT_Dynamic_info and CONSTANT_InvokeDynamic_info Structures

## SwitchBootstraps.enumSwitch(MethodHandles.Lookup, String, MethodType, Object...)

```java
public static CallSite enumSwitch(MethodHandles.Lookup lookup, String invocationName, MethodType invocationType, Object... labels)
```

Bootstrap method for linking an {@code invokedynamic} call site that
implements a {@code switch} on a target of an enum type. The static
arguments are used to encode the case labels associated to the switch
construct, where each label can be encoded in two ways:
<ul>
  <li>as a {@code String} value, which represents the name of
      the enum constant associated with the label</li>
  <li>as a {@code Class} value, which represents the enum type
      associated with a type test pattern</li>
</ul>
<p>
The returned {@code CallSite}'s method handle will have
a return type of {@code int} and accepts two parameters: the first argument
will be an {@code Enum} instance ({@code target}) and the second
will be {@code int} ({@code restart}).
<p>
If the {@code target} is {@code null}, then the method of the call site
returns {@literal -1}.
<p>
If the {@code target} is not {@code null}, then the method of the call site
returns the index of the first element in the {@code labels} array starting from
the {@code restart} index matching one of the following conditions:
<ul>
  <li>the element is of type {@code Class} that is assignable
      from the target's class; or</li>
  <li>the element is of type {@code String} and equals to the target
      enum constant's {@link Enum#name()}.</li>
</ul>
<p>
If no element in the {@code labels} array matches the target, then
the method of the call site return the length of the {@code labels} array.
<p>
The value of the {@code restart} index must be between {@code 0} (inclusive) and
the length of the {@code labels} array (inclusive),
both  or an {@link IndexOutOfBoundsException} is thrown.

@param lookup Represents a lookup context with the accessibility
              privileges of the caller. When used with {@code invokedynamic},
              this is stacked automatically by the VM.
@param invocationName unused
@param invocationType The invocation type of the {@code CallSite} with two parameters,
                      an enum type, an {@code int}, and {@code int} as a return type.
@param labels case labels - {@code String} constants and {@code Class} instances,
              in any combination
@return a {@code CallSite} returning the first matching element as described above

@throws NullPointerException if any argument is {@code null}
@throws IllegalArgumentException if any element in the labels array is null, if the
invocation type is not a method type whose first parameter type is an enum type,
second parameter of type {@code int} and whose return type is {@code int},
or if {@code labels} contains an element that is not of type {@code String} or
{@code Class} of the target enum type.
@jvms 4.4.6 The CONSTANT_NameAndType_info Structure
@jvms 4.4.10 The CONSTANT_Dynamic_info and CONSTANT_InvokeDynamic_info Structures