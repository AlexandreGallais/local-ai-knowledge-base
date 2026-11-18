# ispref

```octave
function tf = ispref (group, pref = "")
```

@deftypefn  {} {@var{tf} =} ispref ("@var{group}", "@var{pref}")
@deftypefnx {} {@var{tf} =} ispref ("@var{group}", @{"@var{pref1}", "@var{pref2"}, @dots{}@})
@deftypefnx {} {@var{tf} =} ispref ("@var{group}")
Return true if the named preference @var{pref} exists in the preference
group @var{group}.

The named preference group must be a string.

The preference @var{pref} may be a string or a cell array of strings.

If @var{pref} is not specified, return true if the preference group
@var{group} exists.
@seealso{getpref, addpref, setpref, rmpref}
@end deftypefn
