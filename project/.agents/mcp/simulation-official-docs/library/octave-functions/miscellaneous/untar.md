# untar

```octave
function filelist = untar (tarfile, dir = [])
```

@deftypefn  {} {} untar (@var{tarfile})
@deftypefnx {} {} untar (@var{tarfile}, @var{dir})
@deftypefnx {} {@var{filelist} =} untar (@dots{})
Unpack the TAR archive @var{tarfile}.

If @var{dir} is specified the files are unpacked in this directory rather
than the current directory.

The optional output @var{filelist} is a list of the uncompressed files.
@seealso{tar, unpack, bunzip2, gunzip, unzip}
@end deftypefn
