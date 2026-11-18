# fieldnames

```octave
function names = fieldnames (obj)
```

@deftypefn  {} {@var{names} =} fieldnames (@var{struct})
@deftypefnx {} {@var{names} =} fieldnames (@var{obj})
@deftypefnx {} {@var{names} =} fieldnames (@var{javaobj})
@deftypefnx {} {@var{names} =} fieldnames ("@var{javaclassname}")
Return a cell array of strings with the names of the fields in the specified
input.

When the input is a structure @var{struct}, the @var{names} are the elements
of the structure.

When the input is an Octave object @var{obj}, the @var{names} are the public
properties of the object.

When the input is a Java object @var{javaobj} or a string containing the
name of a Java class @var{javaclassname}, the @var{names} are the public
fields (data members) of the object or class.
@seealso{numfields, isfield, orderfields, struct, properties}
@end deftypefn
