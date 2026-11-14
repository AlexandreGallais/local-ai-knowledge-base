# ObjectMethods class (java.lang.runtime)

```java
public final class ObjectMethods
```

Bootstrap methods for state-driven implementations of core methods,
including {@link Object#equals(Object)}, {@link Object#hashCode()}, and
{@link Object#toString()}.  These methods may be used, for example, by
Java compiler implementations to implement the bodies of {@link Object}
methods for record classes.

@since 16

## ObjectMethods.bootstrap(MethodHandles.Lookup, String, TypeDescriptor, Class<?>, String, MethodHandle...)

```java
public static Object bootstrap(MethodHandles.Lookup lookup, String methodName, TypeDescriptor type, Class<?> recordClass, String names, MethodHandle... getters) throws Throwable
```

Bootstrap method to generate the {@link Object#equals(Object)},
{@link Object#hashCode()}, and {@link Object#toString()} methods, based
on a description of the component names and accessor methods, for either
{@code invokedynamic} call sites or dynamic constant pool entries.

For more detail on the semantics of the generated methods see the specification
of {@link java.lang.Record#equals(Object)}, {@link java.lang.Record#hashCode()} and
{@link java.lang.Record#toString()}.


@param lookup       Every bootstrap method is expected to have a {@code lookup}
                    which usually represents a lookup context with the
                    accessibility privileges of the caller. This is because
                    {@code invokedynamic} call sites always provide a {@code lookup}
                    to the corresponding bootstrap method, but this method just
                    ignores the {@code lookup} parameter
@param methodName   the name of the method to generate, which must be one of
                    {@code "equals"}, {@code "hashCode"}, or {@code "toString"}
@param type         a {@link MethodType} corresponding the descriptor type
                    for the method, which must correspond to the descriptor
                    for the corresponding {@link Object} method, if linking
                    an {@code invokedynamic} call site, or the
                    constant {@code MethodHandle.class}, if linking a
                    dynamic constant
@param recordClass  the record class hosting the record components
@param names        the list of component names, joined into a string
                    separated by ";", or the empty string if there are no
                    components. This parameter is ignored if the {@code methodName}
                    parameter is {@code "equals"} or {@code "hashCode"}
@param getters      method handles for the accessor methods for the components
@return             a call site if invoked by indy, or a method handle
                    if invoked by a condy
@throws IllegalArgumentException if the bootstrap arguments are invalid
                                 or inconsistent
@throws NullPointerException if any argument is {@code null} or if any element
                             in the {@code getters} array is {@code null}
@throws Throwable if any exception is thrown during call site construction