# copyfile

```octave
function [status, msg, msgid] = copyfile (f1, f2, force)
```

@deftypefn  {} {} copyfile @var{f1} @var{f2}
@deftypefnx {} {} copyfile @var{f1} @var{f2} f
@deftypefnx {} {} copyfile (@var{f1}, @var{f2})
@deftypefnx {} {} copyfile (@var{f1}, @var{f2}, 'f')
@deftypefnx {} {[@var{status}, @var{msg}, @var{msgid}] =} copyfile (@dots{})
Copy the source file(s) or directory @var{f1} to the destination @var{f2}.

The name @var{f1} may contain globbing patterns, or may be a cell array of
strings.  If @var{f1} expands to multiple filenames, @var{f2} must be a
directory.

When the force flag @qcode{'f'} is given any existing files will be
overwritten without prompting.

If successful, @var{status} is logical 1, and @var{msg}, @var{msgid} are
empty character strings ("").  Otherwise, @var{status} is logical 0,
@var{msg} contains a system-dependent error message, and @var{msgid}
contains a unique message identifier.  Note that the status code is exactly
opposite that of the @code{system} command.
@seealso{movefile, rename, unlink, delete, glob}
@end deftypefn
