# setpref

```octave
function setpref (group, pref, val)
```

@deftypefn  {} {} setpref ("@var{group}", "@var{pref}", @var{val})
@deftypefnx {} {} setpref ("@var{group}", @{"@var{pref1}", "@var{pref2}", @dots{}@}, @{@var{val1}, @var{val2}, @dots{}@})
Set the preference @var{pref} to the given @var{val} in the named preference
group @var{group}.

The named preference group must be a string.

The preference @var{pref} may be a string or a cell array of strings.

The corresponding value @var{val} may be any Octave value, .e.g., double,
struct, cell array, object, etc.  Or, if @var{pref} is a cell array of
strings then @var{val} must be a cell array of values with the same size as
@var{pref}.

If the named preference or group does not exist, it is added.
@seealso{addpref, getpref, ispref, rmpref}
@end deftypefn
