# rmdir

```octave
function rmdir (f, path)
```

@deftypefn {} {} rmdir (@var{f}, @var{path})
Remove the remote directory @var{path}, over the FTP connection @var{f}.

@var{f} is an FTP object returned by the @code{ftp} function.
@seealso{@ftp/delete, @ftp/mkdir, @ftp/rename, @ftp/ftp}
@end deftypefn
