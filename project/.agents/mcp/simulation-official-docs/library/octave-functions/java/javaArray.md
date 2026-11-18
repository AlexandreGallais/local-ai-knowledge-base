# javaArray

```octave
function retval = javaArray (classname, varargin)
```

@deftypefn  {} {@var{jary} =} javaArray (@var{classname}, @var{sz})
@deftypefnx {} {@var{jary} =} javaArray (@var{classname}, @var{m}, @var{n}, @dots{})

Create a Java array of size @var{sz} with elements of class @var{classname}.

@var{classname} may be a Java object representing a class or a string
containing the fully qualified class name.  The size of the object may
also be specified with individual integer arguments @var{m}, @var{n}, etc.

The generated array is uninitialized.  All elements are set to null if
@var{classname} is a reference type, or to a default value (usually 0) if
@var{classname} is a primitive type.

Sample code:

@example
@group
jary = javaArray ("java.lang.String", 2, 2);
jary(1,1) = "Hello";
@end group
@end example
@seealso{javaObject}
@end deftypefn
