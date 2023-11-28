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

const ALL_hidecellS = [
  '1-2',
  '1-3',
  '2-3',
  '1-4',
  '2-4',
  '3-4',
  '1-5',
  '2-5',
  '3-5',
  '4-5',
  '1-6',
  '2-6',
  '3-6',
  '4-6',
  '5-6'
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
    const ALL_hidecellS_FULL = ALL_hidecellS.map(
      hidecell => `hidecell-${hidecell}`
    )
    for (const hidecell of ALL_hidecellS) {
      const [num, den] = hidecell.split('-')
      command = `hidecell:toggle-${num}-${den}`
      app.commands.addCommand(command, {
        label: `cell to take ${num}/${den} space (toggle)`,
        execute: () =>
          apply_on_cells(notebookTracker, Scope.Active, (cell: Cell) => {
            md_toggle_multi(
              cell,
              'tags',
              `hidecell-${hidecell}`,
              ALL_hidecellS_FULL
            )
          })
      })
      palette.addItem({ command, category: 'hidecell' })
      app.commands.addKeyBinding({
        command,
        keys: [`Alt ${num}`, `Alt ${den}`],
        selector: '.jp-Notebook'
      })
    }
    // a shortcut to cancel all hidecells
    command = 'hidecell:cancel'
    app.commands.addCommand(command, {
      label: 'cancel all hidecells',
      execute: () =>
        apply_on_cells(notebookTracker, Scope.Active, (cell: Cell) => {
          console.log(`cancelling all hidecells for cell ${cell.model.id}`)
          md_toggle_multi(cell, 'tags', '', ALL_hidecellS_FULL)
        })
    })
    palette.addItem({ command, category: 'hidecell' })
    app.commands.addKeyBinding({
      command,
      keys: ['Alt 0'],
      selector: '.jp-Notebook'
    })
  }
}

export default plugin
