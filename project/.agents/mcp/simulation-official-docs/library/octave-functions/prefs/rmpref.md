# rmpref

```octave
function rmpref (group, pref)
```

@deftypefn  {} {} rmpref ("@var{group}", "@var{pref}")
@deftypefnx {} {} rmpref ("@var{group}", @{"@var{pref1}", "@var{pref2}", @dots{}@})
@deftypefnx {} {} rmpref ("@var{group}")
Remove the named preference @var{pref} from the preference group
@var{group}.

The named preference group must be a string.

The preference @var{pref} may be a string or cell array of strings.

If @var{pref} is not specified, remove the preference group @var{group}.

It is an error to remove a nonexistent preference or group.
@seealso{addpref, ispref, setpref, getpref}
@end deftypefn
