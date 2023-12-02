/*
 * for attaching keybindings later on, see
 * https://towardsdatascience.com/how-to-customize-jupyterlab-keyboard-shortcuts-72321f73753d
 */

import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'
import { ICommandPalette } from '@jupyterlab/apputils'
import { INotebookTracker } from '@jupyterlab/notebook'
import { Cell } from '@jupyterlab/cells'

import { Scope, apply_on_cells } from 'jupyterlab-celltagsclasses'
import {
  md_insert,
  md_remove,
  md_toggle_multi
} from 'jupyterlab-celltagsclasses'

const PLUGIN_ID = 'jupyterlab-hidecell:plugin'

// as of version 0.2.0
// the hide-* variants only show a banner that says that under jupyter-book
// we would get a toggler to switch visibility
// adding the necessary callbacks to actually implement that is
// currently beyond my capabilities

const TAGS = [
  'hide-input',
  'hide-output',
  'hide-cell',
  'remove-input',
  'remove-output',
  'remove-cell'
]

const add_or_remove_debug_tag_on_all_cells = (
  notebookTracker: INotebookTracker,
  add_if_true: boolean
) => {
  apply_on_cells(notebookTracker, Scope.All, (cell: Cell) => {
    if (add_if_true) {
      md_insert(cell, 'tags', 'hidecell-debug')
    } else {
      md_remove(cell, 'tags', 'hidecell-debug')
    }
  })
}

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

    for (const tag of TAGS) {
      command = `hidecell:toggle-${tag}`
      app.commands.addCommand(command, {
        label: `toggle tag ${tag} on active cell`,
        execute: () =>
          apply_on_cells(notebookTracker, Scope.Active, (cell: Cell) => {
            md_toggle_multi(cell, 'tags', tag, TAGS)
          })
      })
      palette.addItem({ command, category: 'hidecell' })
      // too many keyboard shortcuts...
      const [op, scope] = tag.split('-')
      app.commands.addKeyBinding({
        command,
        keys: [
          'Accel 0',
          `${op[0].toUpperCase()}`,
          `${scope[0].toUpperCase()}`
        ],
        selector: '.jp-Notebook'
      })
    }
    command = 'hidecell:debug-on'
    app.commands.addCommand(command, {
      label: 'hidecell debug on: show cell parts regardless of their tags',
      execute: () => add_or_remove_debug_tag_on_all_cells(notebookTracker, true)
    })
    palette.addItem({ command, category: 'hidecell' })
    app.commands.addKeyBinding({
      command,
      keys: ['Accel 0', 'N'],
      selector: '.jp-Notebook'
    })

    command = 'hidecell:debug-off'
    app.commands.addCommand(command, {
      label: 'hidecell debug off',
      execute: () =>
        add_or_remove_debug_tag_on_all_cells(notebookTracker, false)
    })
    palette.addItem({ command, category: 'hidecell' })
    app.commands.addKeyBinding({
      command,
      keys: ['Accel 0', 'F'],
      selector: '.jp-Notebook'
    })
  }
}

export default plugin
