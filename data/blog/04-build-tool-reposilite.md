---
date: '2022-02-04'
title: Reposilite - Repository Manager
category: Repository Manager
tags:
  - reposilite
  - maven
---

# Reposilite

## What is a Repository Manager?

A repository manager is a server application designed to manage repositories of binary components.
To publish build dependencies to a central repository and have it hosted in internal network, we will need a Repository Manager.

There are many [repository managers](https://maven.apache.org/repository-management.html#available-repository-managers) in the market. [JFrog Artifactory](https://www.jfrog.com/open-source) and [Nexus](https://www.sonatype.com/products/repository-oss) are most used tools.

## How to choose?

My requirement for Repository Manager is as follows,

- [x] Hosting automation framework dependency
- [x] Support build output of around 6 jars
- [x] Allow versioning of dependency
- [x] Offer snapshots and releases
- [x] Have admin and user level privileges
- [x] Offer dockerized setup

[Reposilite](https://reposilite.com/) checked all of my items. It is a lightweight repository manager for Java based projects.

## Reposilite Setup

[Installation](https://reposilite.com/docs/install) is easy with minimal steps. I performed setup using [Docker](https://reposilite.com/docs/docker).

Ensure to link data folder as externally mounted volume to avoid data loss.

```sh
docker run -it -v reposilite-data:/app/data -p 80:80 dzikoysk/reposilite
```

It is better to configure the server using a [cdn](https://reposilite.com/docs/configuration#default-configuration) file. This allows user to pre-define the configuration with minimal command-line updates.

## User Management

We can access the CLI either via interactive mode or [browser](https://reposilite.com/docs/remote-cli).
Logged in user needs to have relevant privileges.

[Generate](https://reposilite.com/docs/authorization#generate-token) token for new users and save them locally. If you wish to [revoke](https://reposilite.com/docs/authorization#revoke-tokens) token, it can be done as well.

## Private Repositories

We can make certain repositories `private` and access driven. And have other repositories `public`.
This will be particularly helpful to mask unauthorized access.

Refer [private](https://reposilite.com/docs/repositories#private-repositories) and [hidden](https://reposilite.com/docs/repositories#hidden-repositories) repositories setup

## Deploy

I've used maven to [deploy](https://reposilite.com/docs/deploy) by creating `settings.xml` with required access token. Ensure to update the release version prior to deploy phase.

```sh
mvn deploy
```

## Access

After publishing version to server, we can share user token with read level access to team members. Version needs to be updated in client project.
The username and access token needs be updated on `settings.xml` for dependencies to be resolved.

```sh
mvn -s settings.xml dependency:resolve
```
