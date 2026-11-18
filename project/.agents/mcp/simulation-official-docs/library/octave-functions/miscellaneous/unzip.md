# unzip

```octave
function filelist = unzip (zipfile, dir = [])
```

@deftypefn  {} {} unzip (@var{zipfile})
@deftypefnx {} {} unzip (@var{zipfile}, @var{dir})
@deftypefnx {} {@var{filelist} =} unzip (@dots{})
Unpack the ZIP archive @var{zipfile}.

If @var{dir} is specified the files are unpacked in this directory rather
than the current directory.

The optional output @var{filelist} is a list of the uncompressed files.
@seealso{zip, unpack, bunzip2, gunzip, untar}
@end deftypefn
