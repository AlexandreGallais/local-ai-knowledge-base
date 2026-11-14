# std::sys::random::linux

Random data generation with the Linux kernel.

The first interface random data interface to be introduced on Linux were
the `/dev/random` and `/dev/urandom` special files. As paths can become
unreachable when inside a chroot and when the file descriptors are exhausted,
this was not enough to provide userspace with a reliable source of randomness,
so when the OpenBSD 5.6 introduced the `getentropy` syscall, Linux 3.17 got
its very own `getrandom`  syscall to match.[^1] Unfortunately, even if our
minimum supported version were high enough, we still couldn't rely on the
syscall being available, as it is blocked in `seccomp` by default.

The question is therefore which of the random sources to use. Historically,
the kernel contained two pools: the blocking and non-blocking pool. The
blocking pool used entropy estimation to limit the amount of available
bytes, while the non-blocking pool, once initialized using the blocking
pool, uses a CPRNG to return an unlimited number of random bytes. With a
strong enough CPRNG however, the entropy estimation didn't contribute that
much towards security while being an excellent vector for DoS attacks. Thus,
the blocking pool was removed in kernel version 5.6.[^2] That patch did not
magically increase the quality of the non-blocking pool, however, so we can
safely consider it strong enough even in older kernel versions and use it
unconditionally.

One additional consideration to make is that the non-blocking pool is not
always initialized during early boot. We want the best quality of randomness
for the output of `SystemRng` so we simply wait until it is initialized.
When `HashMap` keys however, this represents a potential source of
deadlocks, as the additional entropy may only be generated once the program
makes forward progress. In that case, we just use the best random data the
system has available at the time.

So in conclusion, we always want the output of the non-blocking pool, but
may need to wait until it is initialized. The default behavior of `getrandom`
is to wait until the non-blocking pool is initialized and then draw from there,
so if `getrandom` is available, we use its default to generate the bytes. For
`HashMap`, however, we need to specify the `GRND_INSECURE` flags, but that
is only available starting with kernel version 5.6. Thus, if we detect that
the flag is unsupported, we try `GRND_NONBLOCK` instead, which will only
succeed if the pool is initialized. If it isn't, we fall back to the file
access method.

The behavior of `/dev/urandom` is inverse to that of `getrandom`: it always
yields data, even when the pool is not initialized. For generating `HashMap`
keys, this is not important, so we can use it directly. For secure data
however, we need to wait until initialization, which we can do by `poll`ing
`/dev/random`.

TLDR: our fallback strategies are:

Secure data                                 | `HashMap` keys
--------------------------------------------|------------------
getrandom(0)                                | getrandom(GRND_INSECURE)
poll("/dev/random") && read("/dev/urandom") | getrandom(GRND_NONBLOCK)
                                            | read("/dev/urandom")

[^1]: <https://lwn.net/Articles/606141/>
[^2]: <https://lwn.net/Articles/808575/>