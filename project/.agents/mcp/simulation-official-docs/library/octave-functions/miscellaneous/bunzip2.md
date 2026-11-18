# bunzip2

```octave
function filelist = bunzip2 (bzfile, dir = [])
```

@deftypefn  {} {} bunzip2 (@var{bzfile})
@deftypefnx {} {} bunzip2 (@var{bzfile}, @var{dir})
@deftypefnx {} {@var{filelist} =} bunzip2 (@dots{})
Unpack the bzip2 archive @var{bzfile}.

If @var{dir} is specified the files are unpacked in this directory rather
than the one where @var{bzfile} is located.

The optional output @var{filelist} is a list of the uncompressed files.
@seealso{bzip2, unpack, gunzip, unzip, untar}
@end deftypefn
