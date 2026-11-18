# addpref

```octave
function addpref (group, pref, val)
```

@deftypefn  {} {} addpref ("@var{group}", "@var{pref}", @var{val})
@deftypefnx {} {} addpref ("@var{group}", @{"@var{pref1}", "@var{pref2}", @dots{}@}, @{@var{val1}, @var{val2}, @dots{}@})
Add the preference @var{pref} and associated value @var{val} to the named
preference group @var{group}.

The named preference group must be a string.

The preference @var{pref} may be a string or a cell array of strings.  An
error will be issued if the preference already exists.

The corresponding value @var{val} may be any Octave value, .e.g., double,
struct, cell array, object, etc.  Or, if @var{pref} is a cell array of
strings then @var{val} must be a cell array of values with the same size as
@var{pref}.
@seealso{setpref, getpref, ispref, rmpref}
@end deftypefn
