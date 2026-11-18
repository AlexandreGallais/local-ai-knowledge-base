# rename

```octave
function rename (f, oldname, newname)
```

@deftypefn {} {} rename (@var{f}, @var{oldname}, @var{newname})
Rename or move the remote file or directory @var{oldname} to @var{newname},
over the FTP connection @var{f}.

@var{f} is an FTP object returned by the @code{ftp} function.
@seealso{@ftp/delete, @ftp/rmdir, @ftp/ftp}
@end deftypefn
