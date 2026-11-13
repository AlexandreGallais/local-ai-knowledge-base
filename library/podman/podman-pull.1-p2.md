---
title: "Pull from a container registry (part 2 of 2)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pull.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# Pull from a container registry (part 2 of 2)

## EXAMPLES
Pull a single image with short name resolution.
```
$ podman pull alpine:latest
Resolved "alpine" as an alias (/etc/containers/registries.conf.d/000-shortnames.conf)
Trying to pull docker.io/library/alpine:latest...
Getting image source signatures
Copying blob 5843afab3874 done
Copying config d4ff818577 done
Writing manifest to image destination
Storing signatures
d4ff818577bc193b309b355b02ebc9220427090057b54a59e73b79bdfe139b83
```

Pull multiple images with/without short name resolution.
```
$ podman pull busybox:musl alpine quay.io/libpod/cirros
Trying to pull docker.io/library/busybox:musl...
Getting image source signatures
Copying blob 0c52b060233b [--------------------------------------] 0.0b / 0.0b
Copying config 9ad2c435a8 done
Writing manifest to image destination
Storing signatures
9ad2c435a887e3f723654e09b48563de44aa3c7950246b2e9305ec85dd3422db
Trying to pull docker.io/library/alpine:latest...
Getting image source signatures
Copying blob 5843afab3874 [--------------------------------------] 0.0b / 0.0b
Copying config d4ff818577 done
Writing manifest to image destination
Storing signatures
d4ff818577bc193b309b355b02ebc9220427090057b54a59e73b79bdfe139b83
Trying to pull quay.io/libpod/cirros:latest...
Getting image source signatures
Copying blob 8da581cc9286 done
Copying blob 856628d95d17 done
Copying blob f513001ba4ab done
Copying config 3c82e4d066 done
Writing manifest to image destination
Storing signatures
3c82e4d066cf6f9e50efaead6e3ff7fddddf5527826afd68e5a969579fc4db4a
```

Pull an image using its digest.
```
$ podman pull alpine@sha256:d7342993700f8cd7aba8496c2d0e57be0666e80b4c441925fc6f9361fa81d10e
Trying to pull docker.io/library/alpine@sha256:d7342993700f8cd7aba8496c2d0e57be0666e80b4c441925fc6f9361fa81d10e...
Getting image source signatures
Copying blob 188c0c94c7c5 done
Copying config d6e46aa247 done
Writing manifest to image destination
Storing signatures
d6e46aa2470df1d32034c6707c8041158b652f38d2a9ae3d7ad7e7532d22ebe0
```

Pull an image by specifying an authentication file.
```
$ podman pull --authfile temp-auths/myauths.json docker://docker.io/umohnani/finaltest
Trying to pull docker.io/umohnani/finaltest:latest...Getting image source signatures
Copying blob sha256:6d987f6f42797d81a318c40d442369ba3dc124883a0964d40b0c8f4f7561d913
 1.90 MB / 1.90 MB [========================================================] 0s
Copying config sha256:ad4686094d8f0186ec8249fc4917b71faa2c1030d7b5a025c29f26e19d95c156
 1.41 KB / 1.41 KB [========================================================] 0s
Writing manifest to image destination
Storing signatures
03290064078cb797f3e0a530e78c20c13dd22a3dd3adf84a5da2127b48df0438
```

Pull an image by authenticating to a registry.
```
$ podman pull --creds testuser:testpassword docker.io/umohnani/finaltest
Trying to pull docker.io/umohnani/finaltest:latest...Getting image source signatures
Copying blob sha256:6d987f6f42797d81a318c40d442369ba3dc124883a0964d40b0c8f4f7561d913
 1.90 MB / 1.90 MB [========================================================] 0s
Copying config sha256:ad4686094d8f0186ec8249fc4917b71faa2c1030d7b5a025c29f26e19d95c156
 1.41 KB / 1.41 KB [========================================================] 0s
Writing manifest to image destination
Storing signatures
03290064078cb797f3e0a530e78c20c13dd22a3dd3adf84a5da2127b48df0438
```

Pull an image using tls verification.
```
$ podman pull --tls-verify=false --cert-dir image/certs docker.io/umohnani/finaltest
Trying to pull docker.io/umohnani/finaltest:latest...Getting image source signatures
Copying blob sha256:6d987f6f42797d81a318c40d442369ba3dc124883a0964d40b0c8f4f7561d913
 1.90 MB / 1.90 MB [========================================================] 0s
Copying config sha256:ad4686094d8f0186ec8249fc4917b71faa2c1030d7b5a025c29f26e19d95c156
 1.41 KB / 1.41 KB [========================================================] 0s
Writing manifest to image destination
Storing signatures
03290064078cb797f3e0a530e78c20c13dd22a3dd3adf84a5da2127b48df0438
```

Pull an image by overriding the host architecture.
```
$ podman pull --arch=arm arm32v7/debian:stretch
Trying to pull docker.io/arm32v7/debian:stretch...
Getting image source signatures
Copying blob b531ae4a3925 done
Copying config 3cba58dad5 done
Writing manifest to image destination
Storing signatures
3cba58dad5d9b35e755b48b634acb3fdd185ab1c996ac11510cc72c17780e13c
```

Pull an image with up to 6 retries, delaying 10 seconds between retries in quet mode.
```
$ podman --remote pull -q --retry 6 --retry-delay 10s ubi9
4d6addf62a90e392ff6d3f470259eb5667eab5b9a8e03d20b41d0ab910f92170
```

Pull an image only if not present locally.
```
$ podman pull --policy missing alpine:latest
```

Never pull the image, only use local version.
```
$ podman pull --policy never alpine:latest
```

Always pull the image even if present locally.
```
$ podman pull --policy always alpine:latest
Trying to pull docker.io/library/alpine:latest...
Getting image source signatures
Copying blob 5843afab3874 done
Copying config d4ff818577 done
Writing manifest to image destination
Storing signatures
d4ff818577bc193b309b355b02ebc9220427090057b54a59e73b79bdfe139b83
```

## SEE ALSO
**podman(1)**, **podman-push(1)**, **podman-login(1)**, **containers-certs.d(5)**, **containers-registries.conf(5)**, **containers-transports(5)**

### Troubleshooting

See podman-troubleshooting(7)
for solutions to common issues.

## HISTORY
July 2017, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
