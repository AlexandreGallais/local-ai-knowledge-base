# beep

```octave
function beep ()
```

@deftypefn {} {} beep ()
Produce a beep from the speaker (or visual bell).

This function sends the alarm character @qcode{"@backslashchar{}a"} to
the terminal.  Depending on the user's configuration this may produce an
audible beep, a visual bell, or nothing at all.
@seealso{puts, fputs, printf, fprintf}
@end deftypefn
