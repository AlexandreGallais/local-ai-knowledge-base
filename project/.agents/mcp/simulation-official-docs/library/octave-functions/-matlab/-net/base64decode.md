# base64decode

```octave
function out_vec = base64decode (b64_str)
```

@deftypefn {} {@var{out_vec} =} matlab.net.base64decode (@var{b64_str})

Convert base64 encoded @var{b64_str} to uint8 vector @var{out_vec}.

The input @var{b64_str} must be a string vector.
The output @var{out_vec} will be a uint8 vector that is decoded
according to RFC 4648.

@seealso{matlab.net.base64encode, base64_decode, base64_encode,
native2unicode}
@end deftypefn
