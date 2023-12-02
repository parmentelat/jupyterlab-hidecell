# jupyterlab_hidecell

[![Github Actions Status](https://github.com/parmentelat/jupyterlab-hidecell/workflows/Build/badge.svg)](https://github.com/parmentelat/jupyterlab-hidecell/actions/workflows/build.yml)

JupyterLab extension to

- tag cells so that they have their input, or output, or both, hidden or removed
- can replace former 'hide-input' extension in the classic notebook

## Compliance with Jupyter book

as far as possible we try to make this extension compatible with the tags used by jupyter-book as described here:
<https://jupyterbook.org/en/stable/interactive/hiding.html#hide-code-cell-content>

## Requirements

- JupyterLab >= 4.0.0

## Usage

### to convert your notebooks

that were using the former `hide-input` extension, you can use

```bash
hideinput-to-hidecell notebook1 .. notebookN
```

that will replace the old `hide_input: true` with the new `hide-input` tag in all
notebooks passed as arguments

### palette commands and keyboard shortcuts

all commands behave as togglers, so that you can use the same shortcut to hide
and show content; search for `hidecell` in the palette to display:

| shortcut      | command                         | description                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------------- |
| `Accel-0 H I` | `hidecell:toggle-hide-input`    | input area is hidden, a visual handle allows to toggle it back on |
| `Accel-0 H O` | `hidecell:toggle-hide-output`   | same for output                                                   |
| `Accel-0 H C` | `hidecell:toggle-hide-cell`     | same for whole cell                                               |
| `Accel-0 R I` | `hidecell:toggle-remove-input`  | input area is no longer visible at all                            |
| `Accel-0 R O` | `hidecell:toggle-remove-output` | same for output                                                   |
| `Accel-0 R C` | `hidecell:toggle-remove-cell`   | same for whole cell (vanishes)                                    |
| `Accel-0 N`   | `hidecell:debug-on`             | outline the cells subject to any of our tags                      |
| `Accel-0 F`   | `hidecell:debug-off`            | quit debug mode                                                   |

### other controls

since this exclusively relies on the presence of the above tags, you can also
use jupyterlab's so called "Property Inspector" feature; however in this case
you're in charge of avoiding duplicate tags...

### limitations

rendering is exclusively done in CSS; converting to a non-HTML format will ruin
this layout

## Install

To install the extension, execute:

```bash
pip install jupyterlab-hidecell
```

### Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab-hidecell
```

### Development install

**_WARNING_** from this point on, this is the boilerplate text that comes with
the extension cookie-cutter template; it is not guaranteed to be accurate

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_hidecell directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in
different terminals to watch for changes in the extension's source and
automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built
locally and available in your running JupyterLab. Refresh JupyterLab to load the
change in your browser (you may need to wait several seconds for the extension
to be rebuilt).

By default, the `jlpm build` command generates the source maps for this
extension to make it easier to debug using the browser dev tools. To also
generate source maps for the JupyterLab core extensions, you can run the
following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab-hidecell
```

In development mode, you will also need to remove the symlink created by
`jupyter labextension develop` command. To find its location, you can run
`jupyter labextension list` to figure out where the `labextensions` folder is
located. Then you can remove the symlink named `jupyterlab-hidecell` within
that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
