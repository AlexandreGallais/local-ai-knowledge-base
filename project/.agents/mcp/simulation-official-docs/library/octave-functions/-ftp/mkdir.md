# mkdir

```octave
function mkdir (f, path)
```

@deftypefn {} {} mkdir (@var{f}, @var{path})
Create the remote directory @var{path}, over the FTP connection @var{f}.

@var{f} is an FTP object returned by the @code{ftp} function.
@seealso{@ftp/rmdir, @ftp/ftp}
@end deftypefn
