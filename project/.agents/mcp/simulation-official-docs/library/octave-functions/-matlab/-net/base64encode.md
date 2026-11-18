# base64encode

```octave
function b64_str = base64encode (in)
```

@deftypefn {} {@var{b64_str} =} matlab.net.base64encode (@var{in})

Convert @var{in} to a base64 encoded string @var{b64_str}.

The input @var{in} can be a string or numeric vector.
The output @var{b64_str} will be encoded according to RFC 4648.

@seealso{matlab.net.base64decode, base64_decode, base64_encode,
unicode2native}
@end deftypefn
