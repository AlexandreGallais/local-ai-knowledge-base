# isprop

```octave
function res = isprop (obj, prop)
```

@deftypefn {} {@var{res} =} isprop (@var{obj}, "@var{prop}")
Return true if @var{prop} is a property of the object @var{obj}.

@var{obj} may also be an array of objects in which case @var{res} will be a
logical array indicating whether each handle has the property @var{prop}.

For plotting, @var{obj} is a handle to a graphics object.  Otherwise,
@var{obj} should be an instance of a class.  @code{isprop} reports whether
the class defines a property, but @code{Access} permissions or visibility
restrictions (@code{Hidden = true}) may prevent use by the programmer.
@seealso{get, set, properties, ismethod, isobject}
@end deftypefn
