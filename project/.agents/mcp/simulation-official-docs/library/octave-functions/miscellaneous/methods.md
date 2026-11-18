# methods

```octave
function mtds = methods (obj, fullopt)
```

@deftypefn  {} {} methods (@var{obj})
@deftypefnx {} {} methods ("@var{classname}")
@deftypefnx {} {} methods (@dots{}, "-full")
@deftypefnx {} {@var{mtds} =} methods (@dots{})
List the names of the public methods for the object @var{obj} or the
named class @var{classname}.

@var{obj} may be an Octave class object or a Java object.
@var{classname} may be the name of an Octave class or a Java class.

If the optional argument @qcode{"-full"} is given then Octave returns
full method signatures which include output type, name of method,
and the number and type of inputs.

When called with no output arguments, @code{methods} prints the list of
method names to the screen.  Otherwise, the output argument @var{mtds}
contains the list in a cell array of strings.
@seealso{ismethod, properties, fieldnames}
@end deftypefn
