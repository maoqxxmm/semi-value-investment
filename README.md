# semi-value-invest

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```

## Automated Release

This project is configured with GitHub Actions for automated building and releasing:

### How it works

1. **On push to master**: Automatically builds the application for all platforms (macOS, Windows, Linux) and uploads artifacts
2. **On tag push**: Creates a new GitHub Release with all platform builds attached

### Creating a new release

To create a new release, push a version tag:

```bash
# Create and push a new version tag
$ git tag v1.0.0
$ git push origin v1.0.0
```

This will trigger the GitHub Actions workflow to:
- Build the application for macOS, Windows, and Linux
- Create a new GitHub Release with the version tag
- Upload all build artifacts to the release
- Generate release notes automatically

### Viewing releases

All releases are available on the [GitHub Releases](../../releases) page.
