# binary

```octave
function binary (f)
```

@deftypefn {} {} binary (@var{f})
Set the FTP connection @var{f} to use binary mode for transfers.

In binary mode there is no conversion of newlines from the remote
representation to the local representation.

@var{f} is an FTP object returned by the @code{ftp} function.
@seealso{@ftp/ascii, @ftp/ftp}
@end deftypefn
