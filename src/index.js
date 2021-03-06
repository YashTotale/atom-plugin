'use babel';

import AtomPluginView from './view';
import { CompositeDisposable } from 'atom';

export default {

  atomPluginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPluginView = new AtomPluginView(state.atomPluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomPluginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPluginView.destroy();
  },

  serialize() {
    return {
      atomPluginViewState: this.atomPluginView.serialize()
    };
  },

  toggle() {
    console.log('AtomPlugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
