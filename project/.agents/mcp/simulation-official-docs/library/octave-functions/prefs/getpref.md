# getpref

```octave
function retval = getpref (group, pref, default)
```

@deftypefn  {} {@var{val} =} getpref ("@var{group}", "@var{pref}")
@deftypefnx {} {@var{val} =} getpref ("@var{group}", "@var{pref}", @var{default})
@deftypefnx {} {@{@var{val1}, @var{val2}, @dots{}@} =} getpref ("@var{group}", @{"@var{pref1}", "@var{pref2"}, @dots{}@})
@deftypefnx {} {@var{prefstruct} =} getpref ("@var{group}")
@deftypefnx {} {@var{prefstruct} =} getpref ()
Return the preference value corresponding to the named preference @var{pref}
in the preference group @var{group}.

The named preference group must be a string.

If @var{pref} does not exist in @var{group} and @var{default} is specified,
create the preference with value @var{default} and return @var{default}.

The preference @var{pref} may be a string or cell array of strings.  If it
is a cell array of strings then a cell array of preferences is returned.

The corresponding default value @var{default} may be any Octave value,
.e.g., double, struct, cell array, object, etc.  Or, if @var{pref} is a cell
array of strings then @var{default} must be a cell array of values with the
same size as @var{pref}.

If neither @var{pref} nor @var{default} are specified, return a structure
of preferences for the preference group @var{group}.

If no arguments are specified, return a structure containing all groups of
preferences and their values.
@seealso{addpref, setpref, ispref, rmpref}
@end deftypefn
