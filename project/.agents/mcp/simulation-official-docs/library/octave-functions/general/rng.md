# rng

```octave
function s = rng (varargin)
```

@deftypefn  {} {} rng (@var{seed})
@deftypefnx {} {} rng (@var{seed}, "@var{generator}")
@deftypefnx {} {} rng ("shuffle")
@deftypefnx {} {} rng ("shuffle", "@var{generator}")
@deftypefnx {} {} rng ("default")
@deftypefnx {} {@var{s} =} rng ()
@deftypefnx {} {} rng (@var{s})
@deftypefnx {} {@var{s} =} rng (@dots{})
Set or query the seed of the random number generator used by @code{rand} and
@code{randn}.

The input @var{seed} is a scalar numeric value used to initialize the state
vector of the random number generator.

The optional string @var{generator} specifies the type of random number
generator to be used.  Its value can be @qcode{"twister"},
@qcode{"v5uniform"}, or @qcode{"v5normal"}.  The @qcode{"twister"} keyword
is described below.  @qcode{"v5uniform"} and @qcode{"v5normal"} refer to
older versions of Octave that used to use a different random number
generator.

The state or seed of the random number generator can be reset to a new
random value using the @qcode{"shuffle"} keyword.

The random number generator can be reset to default values using the
@qcode{"default"} keyword.  The default values are to use the Mersenne
Twister generator with a seed of 0.

The optional return value @var{s} contains the state of the random number
generator at the time the function is called (i.e., before it might be
modified according to the input arguments).  It is encoded as a structure
variable with three fields: @qcode{"Type"}, @qcode{"Seed"}, and
@qcode{"State"}.  The random number generator can be restored to the state
@var{s} using @code{rng (@var{s})}.  This is useful when the identical
sequence of pseudo-random numbers is required for an algorithm.

By default, and with the @qcode{"twister"} option, pseudo-random sequences
are computed using the Mersenne Twister with a period of @math{2^{19937}-1}
(See @nospell{M. Matsumoto and T. Nishimura},
"Mersenne Twister: A 623-dimensionally equidistributed uniform pseudorandom
number generator",
@cite{@nospell{ACM Trans.@: on Modeling and Computer Simulation}},
@w{Vol.@: 8}, @w{No.@: 1}, @w{pp.@: 3}--30, January 1998,
@url{http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html}).
Do @strong{not} use for cryptography without securely hashing several
returned values together, otherwise the generator state can be learned after
reading 624 consecutive values.

@seealso{rand, randn}
@end deftypefn
