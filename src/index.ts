/*
 * for attaching keybindings later on, see
 * https://towardsdatascience.com/how-to-customize-jupyterlab-keyboard-shortcuts-72321f73753d
 */

/* eslint-disable prettier/prettier */

import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'
import { ICommandPalette } from '@jupyterlab/apputils'
import { INotebookTracker } from '@jupyterlab/notebook'
import { Cell } from '@jupyterlab/cells'

import { Scope, apply_on_cells } from 'jupyterlab-celltagsclasses'
import { md_toggle_multi } from 'jupyterlab-celltagsclasses'

const PLUGIN_ID = 'jupyterlab-hidecell:plugin'

const TAGS = [
  'hide-input', 'hide-output', 'hide-cell',
  'remove-input', 'remove-output', 'remove-cell',
]

const plugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    notebookTracker: INotebookTracker
  ) => {
    console.log('extension jupyterlab-hidecell is activating')

    let command

    // hidecell-1-2..hidecell-1-6
    for (const tag of TAGS) {
      command = `hidecell:toggle-${tag}`
      app.commands.addCommand(command, {
        label: `toggle tag ${tag} on active cell`,
        execute: () =>
          apply_on_cells(notebookTracker, Scope.Active, (cell: Cell) => {
            md_toggle_multi( cell, 'tags', tag, TAGS)
          })
      })
      palette.addItem({ command, category: 'hidecell' })
      const [op, what] = tag.split('-')
      app.commands.addKeyBinding({
        command,
        keys: [`Ctrl \\`, `Ctrl ${op[0]}`, `Ctrl ${what[0]}`],
        selector: '.jp-Notebook',
      })
    }
  }
}

export default plugin
