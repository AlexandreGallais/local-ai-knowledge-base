---
title: "podman-ps.1 (part 2 of 2)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-ps.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-ps.1 (part 2 of 2)

## EXAMPLES

List running containers.
```
$ podman ps
CONTAINER ID  IMAGE                            COMMAND    CREATED        STATUS        PORTS                                                   NAMES
4089df24d4f3  docker.io/library/centos:latest  /bin/bash  2 minutes ago  Up 2 minutes  0.0.0.0:80->8080/tcp, 0.0.0.0:2000-2006->2000-2006/tcp  manyports
92f58933c28c  docker.io/library/centos:latest  /bin/bash  3 minutes ago  Up 3 minutes  192.168.99.100:1000-1006->1000-1006/tcp                 zen_sanderson
```

List all containers.
```
$ podman ps -a
CONTAINER ID   IMAGE         COMMAND         CREATED       STATUS                    PORTS     NAMES
02f65160e14ca  redis:alpine  "redis-server"  19 hours ago  Exited (-1) 19 hours ago  6379/tcp  k8s_podsandbox1-redis_podsandbox1_redhat.test.crio_redhat-test-crio_0
69ed779d8ef9f  redis:alpine  "redis-server"  25 hours ago  Created                   6379/tcp  k8s_container1_podsandbox1_redhat.test.crio_redhat-test-crio_1
```

List all containers including their size. Note: this can take longer since Podman needs to calculate the size from the file system.
```
$ podman ps -a -s
CONTAINER ID   IMAGE         COMMAND         CREATED       STATUS                    PORTS     NAMES                                                                  SIZE
02f65160e14ca  redis:alpine  "redis-server"  20 hours ago  Exited (-1) 20 hours ago  6379/tcp  k8s_podsandbox1-redis_podsandbox1_redhat.test.crio_redhat-test-crio_0  27.49 MB
69ed779d8ef9f  redis:alpine  "redis-server"  25 hours ago  Created                   6379/tcp  k8s_container1_podsandbox1_redhat.test.crio_redhat-test-crio_1         27.49 MB
```

List all containers, running or not, using a custom Go format.
```
$ podman ps -a --format "{{.ID}}  {{.Image}}  {{.Labels}}  {{.Mounts}}"
02f65160e14ca  redis:alpine  tier=backend  proc,tmpfs,devpts,shm,mqueue,sysfs,cgroup,/var/run/,/var/run/
69ed779d8ef9f  redis:alpine  batch=no,type=small  proc,tmpfs,devpts,shm,mqueue,sysfs,cgroup,/var/run/,/var/run/
```

List all containers and display their namespaces.
```
$ podman ps --ns -a
CONTAINER ID    NAMES                                                                   PID     CGROUP       IPC          MNT          NET          PIDNS        USER         UTS
3557d882a82e3   k8s_container2_podsandbox1_redhat.test.crio_redhat-test-crio_1          29910   4026531835   4026532585   4026532593   4026532508   4026532595   4026531837   4026532594
09564cdae0bec   k8s_container1_podsandbox1_redhat.test.crio_redhat-test-crio_1          29851   4026531835   4026532585   4026532590   4026532508   4026532592   4026531837   4026532591
a31ebbee9cee7   k8s_podsandbox1-redis_podsandbox1_redhat.test.crio_redhat-test-crio_0   29717   4026531835   4026532585   4026532587   4026532508   4026532589   4026531837   4026532588
```

List all containers including size sorted by names.
```
$ podman ps -a --size --sort names
CONTAINER ID   IMAGE         COMMAND         CREATED       STATUS                    PORTS     NAMES
69ed779d8ef9f  redis:alpine  "redis-server"  25 hours ago  Created                   6379/tcp  k8s_container1_podsandbox1_redhat.test.crio_redhat-test-crio_1
02f65160e14ca  redis:alpine  "redis-server"  19 hours ago  Exited (-1) 19 hours ago  6379/tcp  k8s_podsandbox1-redis_podsandbox1_redhat.test.crio_redhat-test-crio_0
```

List all external containers created by tools other than Podman.
```
$ podman ps --external -a
CONTAINER ID  IMAGE                             COMMAND  CREATED      STATUS  PORTS  NAMES
69ed779d8ef9f  redis:alpine  "redis-server"  25 hours ago  Created                   6379/tcp  k8s_container1_podsandbox1_redhat.test.crio_redhat-test-crio_1
38a8a78596f9  docker.io/library/busybox:latest  buildah  2 hours ago  storage        busybox-working-container
fd7b786b5c32  docker.io/library/alpine:latest   buildah  2 hours ago  storage        alpine-working-container
f78620804e00  scratch                           buildah  2 hours ago  storage        working-container
```

List containers with their associated pods.
```
$ podman ps --pod
CONTAINER ID  IMAGE                            COMMAND    CREATED        STATUS        PORTS     NAMES               POD ID        PODNAME
4089df24d4f3  docker.io/library/nginx:latest  nginx      2 minutes ago  Up 2 minutes  80/tcp    webserver           1234567890ab  web-pod
92f58933c28c  docker.io/library/redis:latest  redis      3 minutes ago  Up 3 minutes  6379/tcp  cache               1234567890ab  web-pod
a1b2c3d4e5f6  docker.io/library/centos:latest /bin/bash  1 minute ago   Up 1 minute             standalone-container
```

List all containers with pod information, including those not in pods.
```
$ podman ps -a --pod
CONTAINER ID  IMAGE                            COMMAND    CREATED        STATUS                    PORTS     NAMES                POD ID        PODNAME
4089df24d4f3  docker.io/library/nginx:latest  nginx      2 minutes ago  Up 2 minutes              80/tcp    webserver            1234567890ab  web-pod
92f58933c28c  docker.io/library/redis:latest  redis      3 minutes ago  Up 3 minutes              6379/tcp  cache                1234567890ab  web-pod
69ed779d8ef9f redis:alpine                     redis      25 hours ago   Exited (0) 25 hours ago   6379/tcp  old-cache            5678901234cd  old-pod
a1b2c3d4e5f6  docker.io/library/centos:latest /bin/bash  1 minute ago   Up 1 minute                         standalone-container
```

Filter containers by pod name.
```
$ podman ps --filter pod=web-pod
CONTAINER ID  IMAGE                            COMMAND    CREATED        STATUS        PORTS     NAMES
4089df24d4f3  docker.io/library/nginx:latest  nginx      2 minutes ago  Up 2 minutes  80/tcp    webserver
92f58933c28c  docker.io/library/redis:latest  redis      3 minutes ago  Up 3 minutes  6379/tcp  cache
```
Filter containers by Status.
```
$ podman ps --filter status=running
CONTAINER ID  IMAGE                             COMMAND               CREATED         STATUS                  PORTS                           NAMES
ff660efda598  docker.io/library/nginx:latest    nginx -g daemon o...  3 minutes ago   Up 3 minutes            0.0.0.0:8080->80/tcp            webserver
5693e934f4c6  docker.io/library/redis:latest    redis-server          3 minutes ago   Up 3 minutes            6379/tcp                        cache
2b271d67dbb6                                                          3 minutes ago   Up 3 minutes            0.0.0.0:9090->80/tcp            463241862e7e-infra
23f99674da1c  docker.io/library/nginx:latest    nginx -g daemon o...  3 minutes ago   Up 3 minutes            0.0.0.0:9090->80/tcp            pod-nginx
62180adfbd42  docker.io/library/redis:latest    redis-server          3 minutes ago   Up 3 minutes            0.0.0.0:9090->80/tcp, 6379/tcp  pod-redis
5e3694604817  quay.io/centos/centos:latest      sleep 300             3 minutes ago   Up 3 minutes                                            centos-test
af3d8b3f5471  docker.io/library/busybox:latest  sleep 1000            3 minutes ago   Up 3 minutes                                            test-dev
b6ee47492b64  docker.io/library/nginx:latest    nginx -g daemon o...  3 minutes ago   Up 3 minutes (healthy)  80/tcp                          healthy-nginx
db75e6c397db  docker.io/library/busybox:latest  sleep 300             23 seconds ago  Up 23 seconds                                         test-volume-container
```
```
$ podman ps -a --filter status=exited
CONTAINER ID  IMAGE                            COMMAND     CREATED        STATUS                    PORTS                NAMES
94f211cc6e36  docker.io/library/alpine:latest  sleep 1     4 minutes ago  Exited (0) 4 minutes ago                       old-alpine
75a800cb848a  docker.io/library/mysql:latest   mysqld      3 minutes ago  Exited (1) 3 minutes ago  3306/tcp, 33060/tcp  db-container
2d9b3a94e31e  docker.io/library/nginx:latest   nginx       3 minutes ago  Exited (0) 3 minutes ago  80/tcp               nginx-cmd
```

Filter containers by name.
```
$ podman ps --filter name=webserver
CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS        PORTS                 NAMES
ff660efda598  docker.io/library/nginx:latest  nginx -g daemon o...  3 minutes ago  Up 3 minutes  0.0.0.0:8080->80/tcp  webserver
```

Filter containers by label.
```
$ podman ps --filter label=app=frontend
CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS        PORTS                 NAMES
ff660efda598  docker.io/library/nginx:latest  nginx -g daemon o...  3 minutes ago  Up 3 minutes  0.0.0.0:8080->80/tcp  webserver
```

Filter containers by annotation.
```
$ podman ps --filter annotation=io.podman.annotations.autoremove=false
CONTAINER ID  IMAGE                             COMMAND     CREATED        STATUS        PORTS       NAMES
5e3694604817  quay.io/centos/centos:latest      sleep 300   3 minutes ago  Up 3 minutes              centos-test
```

Filter containers by volume.
```
$ podman ps --filter volume=mydata
CONTAINER ID  IMAGE                             COMMAND     CREATED         STATUS         PORTS       NAMES
db75e6c397db  docker.io/library/busybox:latest  sleep 300   42 seconds ago  Up 42 seconds              test-volume-container
```

Filter containers by network.
```
$ podman ps --filter network=web-net
CONTAINER ID  IMAGE                         COMMAND     CREATED        STATUS        PORTS       NAMES
5e3694604817  quay.io/centos/centos:latest  sleep 300   3 minutes ago  Up 3 minutes              centos-test
```

Filter containers that need to be restarted after system reboot.
```
$ podman ps -a --filter should-start-on-boot=true
CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS                    PORTS                 NAMES
ff660efda598  docker.io/library/nginx:latest  nginx -g daemon o...  3 minutes ago  Up 3 minutes              0.0.0.0:8080->80/tcp  webserver
5693e934f4c6  docker.io/library/redis:latest  redis-server          3 minutes ago  Exited (0) 3 minutes ago  6379/tcp              cache
```

Use custom format to show container and pod information.
```
$ podman ps --format "{{.Names}} is in pod {{.PodName}} ({{.Pod}})"
webserver is in pod web-pod (1234567890ab)
cache is in pod web-pod (1234567890ab)
standalone-container is in pod  ()
```

## SEE ALSO
**podman(1)**, **buildah(1)**, **crio(8)**

## HISTORY
August 2017, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
