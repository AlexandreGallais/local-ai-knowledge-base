# ObjectInputFilter interface (java.io)

```java
public interface ObjectInputFilter
```

Filter classes, array lengths, and graph metrics during deserialization.

<p><strong>Warning: Deserialization of untrusted data is inherently dangerous
and should be avoided. Untrusted data should be carefully validated according to the
"Serialization and Deserialization" section of the
{@extLink secure_coding_guidelines_javase Secure Coding Guidelines for Java SE}.
{@extLink serialization_filter_guide Serialization Filtering} describes best
practices for defensive use of serial filters.
</strong></p>

<p>To protect against deserialization vulnerabilities, application developers
need a clear description of the objects that can be deserialized
by each component or library. For each context and use case, developers should
construct and apply an appropriate filter.

<h2>Deserialization Filtering Factory and Filters</h2>
The parts of deserialization filtering are the filters, composite filters, and filter factory.
Each filter performs checks on classes and resource limits to determine the status as
rejected, allowed, or undecided.
Filters can be composed of other filters and merge or combine their results.
The filter factory is responsible for establishing and updating the filter
for each {@link ObjectInputStream}.

<p>For simple cases, a static JVM-wide filter can be set for the entire application,
without setting a filter factory.
The JVM-wide filter can be set either with a system property on the command line or by
calling {@linkplain Config#setSerialFilter(ObjectInputFilter) Config.setSerialFilter}.
No custom filter factory needs to be specified, defaulting to the builtin filter factory.
The builtin filter factory provides the {@linkplain Config#getSerialFilter static JVM-wide filter}
for each {@linkplain ObjectInputStream ObjectInputStream}.

<p>For example, a filter that allows example classes, allows classes in the
{@code java.base} module, and rejects all other classes can be set:
As a command line property:
{@snippet :
    % java -Djdk.serialFilter="example.*;java.base/*;!*" ...
}
Or programmatically:
{@snippet lang="java":
    var filter = ObjectInputFilter.Config.createFilter("example.*;java.base/*;!*")
    ObjectInputFilter.Config.setSerialFilter(filter);
}
<p>In an application with multiple execution contexts, the application can provide a
{@linkplain Config#setSerialFilterFactory(BinaryOperator) filter factory} to
protect individual contexts by providing a custom filter for each. When the stream
is constructed, the filter factory is called to identify the execution context from the available
information, including the current thread-local state, hierarchy of callers, library, module,
and class loader. At that point, the filter factory policy for creating or selecting filters
can choose a specific filter or composition of filters based on the context.
The JVM-wide deserialization filter factory ensures that a context-specific deserialization
filter can be set on every {@link ObjectInputStream} and every object read from the
stream can be checked.

<h2>Invoking the Filter Factory</h2>
<p>The JVM-wide filter factory is a function invoked when each {@link ObjectInputStream} is
{@linkplain ObjectInputStream#ObjectInputStream() constructed} and when the
{@linkplain ObjectInputStream#setObjectInputFilter(ObjectInputFilter) stream-specific filter is set}.
The parameters are the current filter and a requested filter and it
returns the filter to be used for the stream. When invoked from the
{@linkplain ObjectInputStream#ObjectInputStream(InputStream) ObjectInputStream constructors},
the first parameter is {@code null} and the second parameter is the
{@linkplain ObjectInputFilter.Config#getSerialFilter() static JVM-wide filter}.
When invoked from {@link ObjectInputStream#setObjectInputFilter ObjectInputStream.setObjectInputFilter},
the first parameter is the filter currently set on the stream (which was set in the constructor),
and the second parameter is the filter given to {@code ObjectInputStream.setObjectInputFilter}.
The current and new filter may each be {@code null} and the factory may return {@code null}.
Note that the filter factory implementation can also use any contextual information
at its disposal, for example, extracted from the application thread context, or its call stack,
to compose and combine a new filter. It is not restricted to only use its two parameters.

<p>The active deserialization filter factory is either:
<ul>
<li>The application specific filter factory set via {@link Config#setSerialFilterFactory(BinaryOperator)}
    or the system property {@code jdk.serialFilterFactory} or
    the security property {@code jdk.serialFilterFactory}.
<li>Otherwise, a builtin deserialization filter factory
    provides the {@linkplain Config#getSerialFilter static JVM-wide filter} when invoked from the
    {@linkplain ObjectInputStream#ObjectInputStream(InputStream) ObjectInputStream constructors}
    and replaces the static filter when invoked from
    {@link ObjectInputStream#setObjectInputFilter(ObjectInputFilter)}.
    See {@linkplain Config#getSerialFilterFactory() getSerialFilterFactory}.
</ul>

<h2>Filters</h2>
Filters can be created from a {@linkplain Config#createFilter(String) pattern string},
or based on a {@linkplain Predicate predicate of a class} to
{@linkplain #allowFilter(Predicate, Status) allow} or
{@linkplain #rejectFilter(Predicate, Status) reject} classes.

<p>The filter's {@link #checkInput checkInput(FilterInfo)} method is invoked
zero or more times while {@linkplain ObjectInputStream#readObject() reading objects}.
The method is called to validate classes, the length of each array,
the number of objects being read from the stream, the depth of the graph,
and the total number of bytes read from the stream.

<p>Composite filters combine or check the results of other filters.
The {@link #merge(ObjectInputFilter, ObjectInputFilter) merge(filter, anotherFilter)}
filter combines the status value of two filters.
The {@link #rejectUndecidedClass(ObjectInputFilter) rejectUndecidedClass(filter)}
checks the result of a filter for classes when the status is {@code UNDECIDED}.
In many cases any class not {@code ALLOWED} by the filter should be {@code REJECTED}.
<p>
A deserialization filter determines whether the arguments are allowed or rejected and
should return the appropriate status: {@link Status#ALLOWED ALLOWED} or {@link Status#REJECTED REJECTED}.
If the filter cannot determine the status it should return {@link Status#UNDECIDED UNDECIDED}.
Filters should be designed for the specific use case and expected types.
A filter designed for a particular use may be passed a class outside
of the scope of the filter. If the purpose of the filter is to reject classes
then it can reject a candidate class that matches and report {@code UNDECIDED} for others.
A filter may be called with class equals {@code null}, {@code arrayLength} equal -1,
the depth, number of references, and stream size and return a status
that reflects only one or only some of the values.
This allows a filter to be specific about the choice it is reporting and
to use other filters without forcing either allowed or rejected status.

<h2>Filter Model Examples</h2>
For simple applications, a single predefined filter listing allowed or rejected
classes may be sufficient to manage the risk of deserializing unexpected classes.
<p>For an application composed from multiple modules or libraries, the structure
of the application can be used to identify the classes to be allowed or rejected
by each {@link ObjectInputStream} in each context of the application.
The deserialization filter factory is invoked when each stream is constructed and
can examine the thread or program to determine a context-specific filter to be applied.
Some possible examples:
<ul>
    <li>Thread-local state can hold the filter to be applied or composed
        with a stream-specific filter.
        Filters could be pushed and popped from a virtual stack of filters
        maintained by the application or libraries.
    <li>The filter factory can identify the caller of the deserialization method
        and use module or library context to select a filter or compose an appropriate
        context-specific filter.
        A mechanism could identify a callee with restricted or unrestricted
        access to serialized classes and choose a filter accordingly.
</ul>

<h2>Example to filter every deserialization in a thread</h2>

This class shows how an application provided filter factory can combine filters
to check every deserialization operation that takes place in a thread.
It defines a thread-local variable to hold the thread-specific filter, and construct a filter factory
that composes that filter with the static JVM-wide filter and the stream-specific filter,
rejecting any classes not handled by those two filters.
If a stream specific filter is set and does not accept or reject a class,
the combined JVM-wide filter and thread filter is applied.
The {@code doWithSerialFilter} method does the setup of the thread-specific filter
and invokes the application provided {@link Runnable Runnable}.

{@snippet lang="java":
public static final class FilterInThread implements BinaryOperator<ObjectInputFilter> {

    private final ThreadLocal<ObjectInputFilter> filterThreadLocal = new ThreadLocal<>();

    // Construct a FilterInThread deserialization filter factory.
    public FilterInThread() {}

    // Returns a composite filter of the static JVM-wide filter, a thread-specific filter,
    // and the stream-specific filter.
    public ObjectInputFilter apply(ObjectInputFilter curr, ObjectInputFilter next) {
        if (curr == null) {
            // Called from the OIS constructor or perhaps OIS.setObjectInputFilter with no current filter
            var filter = filterThreadLocal.get();
            if (filter != null) {
                // Merge to invoke the thread local filter and then the JVM-wide filter (if any)
                filter = ObjectInputFilter.merge(filter, next);
                return ObjectInputFilter.rejectUndecidedClass(filter);
            }
            return (next == null) ? null : ObjectInputFilter.rejectUndecidedClass(next);
        } else {
            // Called from OIS.setObjectInputFilter with a current filter and a stream-specific filter.
            // The curr filter already incorporates the thread filter and static JVM-wide filter
            // and rejection of undecided classes
            // If there is a stream-specific filter merge to invoke it and then the current filter.
            if (next != null) {
                return ObjectInputFilter.merge(next, curr);
            }
            return curr;
        }
    }

    // Applies the filter to the thread and invokes the runnable.
    public void doWithSerialFilter(ObjectInputFilter filter, Runnable runnable) {
        var prevFilter = filterThreadLocal.get();
        try {
            filterThreadLocal.set(filter);
            runnable.run();
        } finally {
            filterThreadLocal.set(prevFilter);
        }
    }
}
}
<h3>Using the Filter Factory</h3>
To use {@code FilterInThread} utility create an instance and configure it as the
JVM-wide filter factory.  The {@code doWithSerialFilter} method is invoked with a
filter allowing the example application and core classes:
{@snippet lang="java":
       // Create a FilterInThread filter factory and set
       var filterInThread = new FilterInThread();
       ObjectInputFilter.Config.setSerialFilterFactory(filterInThread);

       // Create a filter to allow example.* classes and reject all others
       var filter = ObjectInputFilter.Config.createFilter("example.*;java.base/*;!*");
       filterInThread.doWithSerialFilter(filter, () -> {
             byte[] bytes = ...;
             var o = deserializeObject(bytes);
       });
}
<p>
Unless otherwise noted, passing a {@code null} argument to a
method in this interface and its nested classes will cause a
{@link NullPointerException} to be thrown.

@see ObjectInputStream#setObjectInputFilter(ObjectInputFilter)
@since 9

## ObjectInputFilter.checkInput(FilterInfo)

```java
Status checkInput(FilterInfo filterInfo)
```

Check the class, array length, number of object references, depth,
stream size, and other available filtering information.
Implementations of this method check the contents of the object graph being created
during deserialization. The filter returns {@link Status#ALLOWED Status.ALLOWED},
{@link Status#REJECTED Status.REJECTED}, or {@link Status#UNDECIDED Status.UNDECIDED}.

<p>If {@code filterInfo.serialClass()} is {@code non-null}, there is a class to be checked.
If {@code serialClass()} is {@code null}, there is no class and the info contains
only metrics related to the depth of the graph being deserialized, the number of
references, and the size of the stream read.

@apiNote Each filter implementing {@code checkInput} should return one of the values of {@link Status}.
Returning {@code null} may result in a {@link NullPointerException} or other unpredictable behavior.

@param filterInfo provides information about the current object being deserialized,
            if any, and the status of the {@link ObjectInputStream}
@return  {@link Status#ALLOWED Status.ALLOWED} if accepted,
         {@link Status#REJECTED Status.REJECTED} if rejected,
         {@link Status#UNDECIDED Status.UNDECIDED} if undecided.

## ObjectInputFilter.allowFilter(Predicate<Class<?>>, Status)

```java
static ObjectInputFilter allowFilter(Predicate<Class<?>> predicate, Status otherStatus)
```

Returns a filter that returns {@code Status.ALLOWED} if the predicate
on the class is {@code true}.
The filter returns {@code ALLOWED} or the {@code otherStatus} based on the predicate
of the {@code non-null} class and {@code UNDECIDED} if the class is {@code null}.

<p>When the filter's {@link ObjectInputFilter#checkInput checkInput(info)} method is invoked,
the predicate is applied to the {@link FilterInfo#serialClass() info.serialClass()},
the return Status is:
<ul>
    <li>{@link Status#UNDECIDED UNDECIDED}, if the {@code serialClass} is {@code null},</li>
    <li>{@link Status#ALLOWED ALLOWED}, if the predicate on the class returns {@code true},</li>
    <li>Otherwise, return {@code otherStatus}.</li>
</ul>
<p>
Example, to create a filter that will allow any class loaded from the platform
or bootstrap classloaders.
{@snippet lang="java":
    ObjectInputFilter f
        = allowFilter(cl -> cl.getClassLoader() == ClassLoader.getPlatformClassLoader() ||
                      cl.getClassLoader() == null, Status.UNDECIDED);
}

@param predicate a predicate to test a non-null Class
@param otherStatus a Status to use if the predicate is {@code false}
@return a filter that returns {@code ALLOWED} if the predicate
         on the class is {@code true}
@since 17

## ObjectInputFilter.rejectFilter(Predicate<Class<?>>, Status)

```java
static ObjectInputFilter rejectFilter(Predicate<Class<?>> predicate, Status otherStatus)
```

Returns a filter that returns {@code Status.REJECTED} if the predicate
on the class is {@code true}.
The filter returns {@code REJECTED} or the {@code otherStatus} based on the predicate
of the {@code non-null} class and {@code UNDECIDED} if the class is {@code null}.

When the filter's {@link ObjectInputFilter#checkInput checkInput(info)} method is invoked,
the predicate is applied to the {@link FilterInfo#serialClass() serialClass()},
the return Status is:
<ul>
    <li>{@link Status#UNDECIDED UNDECIDED}, if the {@code serialClass} is {@code null},</li>
    <li>{@link Status#REJECTED REJECTED}, if the predicate on the class returns {@code true},</li>
    <li>Otherwise, return {@code otherStatus}.</li>
</ul>
<p>
Example, to create a filter that will reject any class loaded from the application classloader.
{@snippet lang="java":
    ObjectInputFilter f = rejectFilter(cl ->
         cl.getClassLoader() == ClassLoader.ClassLoader.getSystemClassLoader(), Status.UNDECIDED);
}

@param predicate a predicate to test a non-null Class
@param otherStatus a Status to use if the predicate is {@code false}
@return returns a filter that returns {@code REJECTED} if the predicate
         on the class is {@code true}
@since 17

## ObjectInputFilter.merge(ObjectInputFilter, ObjectInputFilter)

```java
static ObjectInputFilter merge(ObjectInputFilter filter, ObjectInputFilter anotherFilter)
```

Returns a filter that merges the status of a filter and another filter.
If {@code another} filter is {@code null}, the {@code filter} is returned.
Otherwise, a {@code filter} is returned to merge the pair of {@code non-null} filters.

The filter returned implements the {@link ObjectInputFilter#checkInput(FilterInfo)} method
as follows:
<ul>
    <li>Invoke {@code filter} on the {@code FilterInfo} to get its {@code status};
    <li>Return {@code REJECTED} if the {@code status} is {@code REJECTED};
    <li>Invoke {@code anotherFilter} to get the {@code otherStatus};
    <li>Return {@code REJECTED} if the {@code otherStatus} is {@code REJECTED};
    <li>Return {@code ALLOWED}, if either {@code status} or {@code otherStatus}
         is {@code ALLOWED}, </li>
    <li>Otherwise, return {@code UNDECIDED}</li>
</ul>

@param filter a filter
@param anotherFilter a filter to be merged with the filter, may be {@code null}
@return an {@link ObjectInputFilter} that merges the status of the filter and another filter
@since 17

## ObjectInputFilter.rejectUndecidedClass(ObjectInputFilter)

```java
static ObjectInputFilter rejectUndecidedClass(ObjectInputFilter filter)
```

Returns a filter that invokes a given filter and maps {@code UNDECIDED} to {@code REJECTED}
for classes, with some special cases, and otherwise returns the status.
If the class is not a primitive class and not an array, the status returned is {@code REJECTED}.
If the class is a primitive class or an array class additional checks are performed;
see the list below for details.

<p>Object deserialization accepts a class if the filter returns {@code UNDECIDED}.
Adding a filter to reject undecided results for classes that have not been
either allowed or rejected can prevent classes from slipping through the filter.

@implSpec
The filter returned implements the {@link ObjectInputFilter#checkInput(FilterInfo)} method
as follows:
<ul>
    <li>Invoke the filter on the {@code FilterInfo} to get its {@code status};
    <li>Return the {@code status} if the status is {@code REJECTED} or {@code ALLOWED};
    <li>Return {@code UNDECIDED} if the {@code filterInfo.getSerialClass() serialClass}
         is {@code null};
    <li>Return {@code REJECTED} if the class is not an {@linkplain Class#isArray() array};
    <li>Determine the base component type if the {@code serialClass} is
         an {@linkplain Class#isArray() array};
    <li>Return {@code UNDECIDED} if the base component type is
         a {@linkplain Class#isPrimitive() primitive class};
    <li>Invoke the filter on the {@code base component type} to get its
         {@code component status};</li>
    <li>Return {@code ALLOWED} if the component status is {@code ALLOWED};
    <li>Otherwise, return {@code REJECTED}.</li>
</ul>

@param filter a filter
@return an {@link ObjectInputFilter} that maps an {@link Status#UNDECIDED}
     status to {@link Status#REJECTED} for classes, otherwise returns the
     filter status
@since 17

## ObjectInputFilter.serialClass()

```java
Class<?> serialClass()
```

The class of an object being deserialized.
For arrays, it is the array type.
For example, the array class name of a 2 dimensional array of strings is
"{@code [[Ljava.lang.String;}".
To check the array's element type, iteratively use
{@link Class#getComponentType() Class.getComponentType} while the result
is an array and then check the class.
The {@code serialClass is null} in the case where a new object is not being
created and to give the filter a chance to check the depth, number of
references to existing objects, and the stream size.

@return class of an object being deserialized; may be null

## ObjectInputFilter.arrayLength()

```java
long arrayLength()
```

The number of array elements when deserializing an array of the class.

@return the non-negative number of array elements when deserializing
an array of the class, otherwise -1

## ObjectInputFilter.depth()

```java
long depth()
```

The current depth.
The depth starts at {@code 1} and increases for each nested object and
decrements when each nested object returns.

@return the current depth

## ObjectInputFilter.references()

```java
long references()
```

The current number of object references.

@return the non-negative current number of object references

## ObjectInputFilter.streamBytes()

```java
long streamBytes()
```

The current number of bytes consumed.
@implSpec  {@code streamBytes} is implementation specific
and may not be directly related to the object in the stream
that caused the callback.

@return the non-negative current number of bytes consumed

## ObjectInputFilter.REJECTED

```java
UNDECIDED, /** * The status is allowed. */ ALLOWED, /** * The status is rejected. */ REJECTED
```

The status is undecided, not allowed and not rejected.

## ObjectInputFilter.REJECTED

```java
ALLOWED, /** * The status is rejected. */ REJECTED
```

The status is allowed.

## ObjectInputFilter.REJECTED

```java
REJECTED
```

The status is rejected.

## ObjectInputFilter.getSerialFilter()

```java
public static ObjectInputFilter getSerialFilter()
```

Returns the static JVM-wide deserialization filter or {@code null} if not configured.

@return the static JVM-wide deserialization filter or {@code null} if not configured
@throws IllegalStateException if the initialization of the filter from the
     system property {@code jdk.serialFilter} or
     the security property {@code jdk.serialFilter} fails.

## ObjectInputFilter.setSerialFilter(ObjectInputFilter)

```java
public static void setSerialFilter(ObjectInputFilter filter)
```

Set the static JVM-wide filter if it has not already been configured or set.

@param filter the deserialization filter to set as the JVM-wide filter; not null
@throws IllegalStateException if the filter has already been set or the initialization
      of the filter from the system property {@code jdk.serialFilter} or
      the security property {@code jdk.serialFilter} fails.

## ObjectInputFilter.getSerialFilterFactory()

```java
public static BinaryOperator<ObjectInputFilter> getSerialFilterFactory()
```

Returns the JVM-wide deserialization filter factory.
If the filter factory has been {@linkplain #setSerialFilterFactory(BinaryOperator) set} it is returned,
otherwise, a builtin deserialization filter factory is returned.
The filter factory provides a filter for every ObjectInputStream when invoked from
{@linkplain ObjectInputStream#ObjectInputStream(InputStream) ObjectInputStream constructors}
and when a stream-specific filter is set with
{@link ObjectInputStream#setObjectInputFilter(ObjectInputFilter) setObjectInputFilter}.

@implSpec
The builtin deserialization filter factory provides the
{@linkplain #getSerialFilter static JVM-wide filter} when invoked from
{@linkplain ObjectInputStream#ObjectInputStream(InputStream) ObjectInputStream constructors}.
When invoked {@link ObjectInputStream#setObjectInputFilter(ObjectInputFilter)
to set the stream-specific filter} the requested filter replaces the static JVM-wide filter,
unless it has already been set.
The builtin deserialization filter factory implements the behavior of earlier versions of
setting the initial filter in the {@link ObjectInputStream} constructor and
{@link ObjectInputStream#setObjectInputFilter}.

@return the JVM-wide deserialization filter factory; non-null
@throws IllegalStateException if the filter factory initialization is incomplete
@since 17

## ObjectInputFilter.setSerialFilterFactory(BinaryOperator<ObjectInputFilter>)

```java
public static void setSerialFilterFactory(BinaryOperator<ObjectInputFilter> filterFactory)
```

Set the {@linkplain #getSerialFilterFactory() JVM-wide deserialization filter factory}.
The filter factory can be configured exactly once with one of:
setting the {@code jdk.serialFilterFactory} property on the command line,
setting the {@code jdk.serialFilterFactory} property in the {@link java.security.Security}
file, or using this {@code setSerialFilterFactory} method.
The filter factory can be set only before any {@link ObjectInputStream} has been
created to avoid any inconsistency in which filter factory is being used.

<p>The JVM-wide filter factory is invoked when an ObjectInputStream
{@linkplain ObjectInputStream#ObjectInputStream() is constructed} and when the
{@linkplain ObjectInputStream#setObjectInputFilter(ObjectInputFilter) stream-specific filter is set}.
The parameters are the current filter and a requested filter and it
returns the filter to be used for the stream.
If the current filter is {@code non-null}, the filter factory must return a
{@code non-null} filter; this is to prevent unintentional disabling of filtering
after it has been enabled.
The factory determines the filter to be used for {@code ObjectInputStream} streams based
on its inputs, any other filters, context, or state that is available.
The factory may throw runtime exceptions to signal incorrect use or invalid parameters.
See the {@linkplain ObjectInputFilter filter models} for examples of composition and delegation.

@param filterFactory the deserialization filter factory to set as the
        JVM-wide filter factory; not null
@throws IllegalStateException if the builtin deserialization filter factory
        has already been replaced or any instance of {@link ObjectInputStream}
        has been created.
@since 17

## ObjectInputFilter.createFilter(String)

```java
public static ObjectInputFilter createFilter(String pattern)
```

Returns an ObjectInputFilter from a string of patterns.
<p>
Patterns are separated by ";" (semicolon). Whitespace is significant and
is considered part of the pattern.
If a pattern includes an equals assignment, "{@code =}" it sets a limit.
If a limit appears more than once the last value is used.
<ul>
    <li>maxdepth={@code value} - the maximum depth of a graph</li>
    <li>maxrefs={@code value}  - the maximum number of internal references</li>
    <li>maxbytes={@code value} - the maximum number of bytes in the input stream</li>
    <li>maxarray={@code value} - the maximum array length allowed</li>
</ul>
<p>
Other patterns match or reject class or package name
as returned from {@link Class#getName() Class.getName()} and
if an optional module name is present
{@link Module#getName() class.getModule().getName()}.
Note that for arrays the element type is used in the pattern,
not the array type.
<ul>
<li>If the pattern starts with "!", the class is rejected if the remaining pattern is matched;
    otherwise the class is allowed if the pattern matches.
<li>If the pattern contains "/", the non-empty prefix up to the "/" is the module name;
    if the module name matches the module name of the class then
    the remaining pattern is matched with the class name.
    If there is no "/", the module name is not compared.
<li>If the pattern ends with ".**" it matches any class in the package and all subpackages.
<li>If the pattern ends with ".*" it matches any class in the package.
<li>If the pattern ends with "*", it matches any class with the pattern as a prefix.
<li>If the pattern is equal to the class name, it matches.
<li>Otherwise, the pattern is not matched.
</ul>
<p>
The resulting filter performs the limit checks and then
tries to match the class, if any. If any of the limits are exceeded,
the filter returns {@link Status#REJECTED Status.REJECTED}.
If the class is an array type, the class to be matched is the element type.
Arrays of any number of dimensions are treated the same as the element type.
For example, a pattern of "{@code !example.Foo}",
rejects creation of any instance or array of {@code example.Foo}.
The first pattern that matches, working from left to right, determines
the {@link Status#ALLOWED Status.ALLOWED}
or {@link Status#REJECTED Status.REJECTED} result.
If the limits are not exceeded and no pattern matches the class,
the result is {@link Status#UNDECIDED Status.UNDECIDED}.

@param pattern the pattern string to parse; not null
@return a filter to check a class being deserialized;
         {@code null} if no patterns
@throws IllegalArgumentException if the pattern string is illegal or
        malformed and cannot be parsed.
        In particular, if any of the following is true:
<ul>
<li>   if a limit is missing the name or the name is not one of
       "maxdepth", "maxrefs", "maxbytes", or "maxarray"
<li>   if the value of the limit can not be parsed by
       {@link Long#parseLong Long.parseLong} or is negative
<li>   if the pattern contains "/" and the module name is missing
       or the remaining pattern is empty
<li>   if the package is missing for ".*" and ".**"
</ul>

## ObjectInputFilter.createFilter2(String)

```java
static ObjectInputFilter createFilter2(String pattern)
```

Returns an ObjectInputFilter from a string of patterns that
checks only the length for arrays, not the component type.

@param pattern the pattern string to parse; not null
@return a filter to check a class being deserialized;
         {@code null} if no patterns

## ObjectInputFilter.createFilter(String, boolean)

```java
static ObjectInputFilter createFilter(String pattern, boolean checkComponentType)
```

Returns an ObjectInputFilter from a string of patterns.

@param pattern the pattern string to parse
@param checkComponentType true if the filter should check
                          the component type of arrays
@return a filter to check a class being deserialized;
         {@code null} if no patterns
@throws IllegalArgumentException if the parameter is malformed
               if the pattern is missing the name, the long value
               is not a number or is negative.

## ObjectInputFilter.checkInput(FilterInfo)

```java
public Status checkInput(FilterInfo filterInfo)
```

{@inheritDoc}

## ObjectInputFilter.toString()

```java
public String toString()
```

{@return the pattern used to create this filter}

## ObjectInputFilter.checkInput(FilterInfo)

```java
public ObjectInputFilter.Status checkInput(FilterInfo info)
```

Returns a filter that returns {@code ifTrueStatus} or the {@code ifFalseStatus}
based on the predicate of the {@code non-null} class and {@code UNDECIDED}
if the class is {@code null}.

@param info the FilterInfo
@return a filter that returns {@code ifTrueStatus} or the {@code ifFalseStatus}
         based on the predicate of the {@code non-null} class and {@code UNDECIDED}
         if the class is {@code null}

## ObjectInputFilter.toString()

```java
public String toString()
```

Return a String describing the filter, its predicate, and true and false status values.
@return a String describing the filter, its predicate, and true and false status values.

## ObjectInputFilter.checkInput(FilterInfo)

```java
public ObjectInputFilter.Status checkInput(FilterInfo info)
```

Returns REJECTED if either of the filters returns REJECTED,
otherwise, ALLOWED if either of the filters returns ALLOWED,
otherwise, returns {@code UNDECIDED}.

@param info the FilterInfo
@return REJECTED if either of the filters returns REJECTED,
         otherwise, ALLOWED if either of the filters returns ALLOWED,
         otherwise, returns {@code UNDECIDED}.

## ObjectInputFilter.checkInput(FilterInfo)

```java
public ObjectInputFilter.Status checkInput(FilterInfo info)
```

Apply the filter and return the status if not UNDECIDED and checking a class.
For array classes, re-check the final component type against the filter.
Make an exception for Primitive classes that are implicitly allowed by the pattern based filter.
@param info the FilterInfo
@return the status of applying the filter and checking the class

## ObjectInputFilter.apply(ObjectInputFilter, ObjectInputFilter)

```java
public ObjectInputFilter apply(ObjectInputFilter oldFilter, ObjectInputFilter newFilter)
```

Returns the {@code ObjectInputFilter} to be used for an ObjectInputStream.

<p>When invoked from the
{@linkplain ObjectInputStream#ObjectInputStream(InputStream) ObjectInputStream constructors},
the first parameter is {@code null} and the second parameter is the
{@linkplain ObjectInputFilter.Config#getSerialFilter() static JVM-wide filter};
the value returned is {@code newFilter}, the static JVM-wide filter.
<p>
When invoked from
{@link ObjectInputStream#setObjectInputFilter(ObjectInputFilter) setObjectInputFilter}
to set the stream-specific filter, the value is {@code newFilter} to replace the
previous filter.

@param oldFilter the current filter, may be null
@param newFilter a new filter, may be null
@return an ObjectInputFilter, the new Filter, may be null

## ObjectInputFilter.toString()

```java
public String toString()
```

Returns the class name of this builtin deserialization filter factory.
@return returns the class name of this builtin deserialization filter factory