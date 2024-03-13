![stream](assets/logo.png)

## Description

Stream is a simple note taking app designed for destractable people who just want to write.

## Manefesto

stream should...
- be minimalistic
- discourage perfectionism
- assist in the consolidation and organization of ideas
- save data in an accessible and open standard
- streamline the sharing of ideas
- accommodate for multiple platforms

## Development

Stream is built in React Native and uses Expo and Tauri to manage cross-platform
deployment.

### Setup

> [!IMPORTANT]
> Most platforms have prerequisites that can not be installed with a JS package manager. To develop for the following platforms, please install their required packages:
>
> - [Desktop](https://tauri.app/v1/guides/getting-started/prerequisites/)
> - [iOS](https://docs.expo.dev/guides/local-app-development/#ios)
> - [Android](https://docs.expo.dev/guides/local-app-development/#android)

> [!TIP]
> Bun.js is the preferred JS runtime and package manager for this
> project. You can install it [here](https://bun.sh/docs/installation).

```sh
    git clone https://github.com/scribhneoir/stream.git
    cd stream
    bun install
    bun dev
```

### Scripts

```sh
    #maintenance scripts
    bun lint
    bun format

    #dev scripts
    bun dev
    bun android
    bun ios
    bun web
    bun desktop

    #build scripts
    bun build:web
    bun build:ios
    bun build:android
    bun build:desktop
```
