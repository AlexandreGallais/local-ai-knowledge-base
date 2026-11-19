---
name: network-debugging
description: "Debugs network problems from inside a container or the host - ports, DNS, proxy, TLS - with curl, ss, dig or getent, nc and tcpdump. Use when a service cannot reach another, a connection is refused or times out, a name does not resolve, a proxy blocks a request, or a TLS handshake fails."
metadata:
  id: DBG-09
  stars: "3"
  nature: reference
  mode: B
  wave: V3
  load: auto
---

# Network debugging

**Core rule:** test each layer in order - name resolution, TCP connection, TLS, HTTP - and stop at the first that fails.

## Procedure

1. Resolve the name: `getent hosts <name>` (or `dig +short <name>` if installed).
   - Check: an address is printed, or the failure is DNS.
2. Open the port: `nc -vz <host> <port>` (or `curl -v telnet://<host>:<port>`).
   - Check: connected, refused (nothing listens) or timeout (filtered).
3. Check TLS with `openssl s_client -connect <host>:<port> -servername <host> </dev/null 2>&1 | grep -E 'Verify return|subject|issuer'`.
   - Check: the handshake succeeds or the certificate error is named.
4. Check HTTP: `curl -sS -o /dev/null -w '%{http_code}\n' <address>`.
   - Check: the status code is known.
5. On the server side: `ss -ltnp | grep ':<port>'` shows what listens and on which address.
   - Check: the service listens on the expected interface (not only 127.0.0.1 when called from a container).

## This installation

<!-- FILL: what=proxy variables and no_proxy list for internal hosts; find=printenv http_proxy https_proxy no_proxy; verify=curl to an internal host succeeds with these values -->

<!-- FILL: what=network tools available in the dev container; find=command -v nc dig tcpdump ss getent; verify=each listed tool prints its help -->

<!-- FILL: what=how containers reach services on the host here; find=podman info and test host.containers.internal; verify=curl from a container to a host service answers -->

## Stop and ask the human if

- Capturing traffic (tcpdump) needs root or touches other people's traffic.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Timeout and refused are the same." | Refused: nothing listens. Timeout: something blocks. |
| "localhost works from the container." | Inside a container, localhost is the container itself. |

## Definition of done

- [ ] Failing layer identified with its command output; fix verified by rerunning that layer.

## Local completion checklist

- [ ] Proxy variables
- [ ] Network tools
- [ ] Container to host access
