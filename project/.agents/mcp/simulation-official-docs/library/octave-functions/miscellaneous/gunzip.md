# gunzip

```octave
function filelist = gunzip (gzfile, outdir = [])
```

@deftypefn  {} {} gunzip (@var{gzfile})
@deftypefnx {} {} gunzip (@var{gzfile}, @var{outdir})
@deftypefnx {} {@var{filelist} =} gunzip (@dots{})
Unpack the gzip archive @var{gzfile}.

If @var{gzfile} is a directory, all gzfiles in the directory will be
recursively unpacked.

If @var{outdir} is specified the files are unpacked in this directory rather
than the one where @var{gzfile} is located.

The optional output @var{filelist} is a list of the uncompressed files.
@seealso{gzip, unpack, bunzip2, unzip, untar}
@end deftypefn
