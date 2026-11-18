# javarmpath

```octave
function javarmpath (varargin)
```

@deftypefn  {} {} javarmpath (@var{clspath})
@deftypefnx {} {} javarmpath (@var{clspath1}, @dots{})
@deftypefnx {} {} javarmpath (@{@var{clspath1}, @dots{}@})
Remove @var{clspath} from the dynamic class path of the Java virtual
machine.

@var{clspath} may either be a directory where @file{.class} files are found,
or a @file{.jar} file containing Java classes.  Multiple paths may be
removed at once by specifying additional arguments, or by using a cell array
of strings.
@seealso{javaaddpath, javaclasspath}
@end deftypefn
