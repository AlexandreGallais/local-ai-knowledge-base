# Sujet « containers » : images, Podman et dev containers

Ce dossier aide l'IA à écrire un `Dockerfile` et un `devcontainer.json` justes, et à expliquer un
problème de conteneur. Chaque règle donne l'outil qui la contrôle.

| Fichier | Ce qu'il contient |
| --- | --- |
| `dockerfile-rules.md` | Les règles d'un `Dockerfile` (deux étapes, version épinglée, utilisateur non root, forme exec), chacune avec un exemple faux et un juste. |
| `dockerfile-checks.md` | hadolint et les contrôles de construction de Docker : commandes, codes de règle et corrections. |
| `dotnet-images.md` | Les images .NET : port 8080, utilisateur `app`, Ubuntu depuis .NET 10, publication d'image par le SDK. |
| `angular-image.md` | Construire une application Angular et servir son dossier `browser/` avec un NGINX sans privilège. |
| `podman-vs-docker.md` | Ce qui change avec Podman : nom d'image complet, ports hauts sans root, réseau « pasta », miroirs. |
| `podman-quadlet-kube.md` | Lancer un conteneur en service systemd (Quadlet) et un YAML Kubernetes en local (`podman kube play`). |
| `devcontainer-json.md` | Les propriétés de `devcontainer.json` et l'ordre de ses commandes de cycle de vie. |
| `devcontainer-run.md` | L'assistant de code installé dans l'image du dev container, et les autres façons d'y lancer une commande. |
| `container-problems.md` | Un symptôme, sa cause probable, sa correction. |
