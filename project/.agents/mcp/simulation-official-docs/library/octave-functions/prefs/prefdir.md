# prefdir

```octave
function dir = prefdir ()
```

@deftypefn  {} {@var{dir} =} prefdir
@deftypefnx {} {@var{dir} =} prefdir (1)
Return the directory that holds the preferences for Octave.

Examples:

Display the preferences directory

@example
prefdir
@end example

Change to the preferences folder

@example
cd (prefdir)
@end example

If called with an argument, the preferences directory is created if it
doesn't already exist.
@seealso{getpref, setpref, addpref, rmpref, ispref}
@end deftypefn
