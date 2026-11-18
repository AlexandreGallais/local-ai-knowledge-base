# javaaddpath

```octave
function javaaddpath (varargin)
```

@deftypefn  {} {} javaaddpath (@var{clspath})
@deftypefnx {} {} javaaddpath (@var{clspath1}, @dots{})
@deftypefnx {} {} javaaddpath (@{@var{clspath1}, @dots{}@})
@deftypefnx {} {} javaaddpath (@dots{}, "-end")
Add @var{clspath} to the beginning of the dynamic class path of the
Java virtual machine.

@var{clspath} may either be a directory where @file{.class} files are
found, or a @file{.jar} file containing Java classes.  Multiple paths may
be added at once by specifying additional arguments, or by using a cell
array of strings.

If the final argument is @qcode{"-end"}, append the new element to the
end of the current classpath.

@seealso{javarmpath, javaclasspath}
@end deftypefn
