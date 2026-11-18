# ascii

```octave
function ascii (f)
```

@deftypefn {} {} ascii (@var{f})
Set the FTP connection @var{f} to use ASCII mode for transfers.

ASCII mode is only appropriate for text files as it will convert the
remote host's newline representation to the local host's newline
representation.

@var{f} is an FTP object returned by the @code{ftp} function.
@seealso{@ftp/binary, @ftp/ftp}
@end deftypefn
