import joplin from 'api';
import { ToolbarButtonLocation, MenuItemLocation } from 'api/types';

joplin.plugins.register({
  onStart: async () => {
    console.info('[Pastel Highlighter] démarrage');
    await joplin.commands.register({
      name: 'quenaPastelHighlightGreen',
      label: 'Surligner en vert pastel (test)',
      iconName: 'fas fa-highlighter',
      execute: async () => {
        console.info('[Pastel Highlighter] commande appelée');
        try {
          await joplin.commands.execute('editor.execCommand', {
            name: 'HiliteColor', value: '#C9EED2', ui: false,
          });
        } catch (e) { console.error('[Pastel Highlighter] erreur', e); }
      },
    });
    await joplin.views.toolbarButtons.create('quenaPastelGreenButton', 'quenaPastelHighlightGreen', ToolbarButtonLocation.EditorToolbar);
    await joplin.views.menuItems.create('quenaPastelGreenMenu', 'quenaPastelHighlightGreen', MenuItemLocation.Tools);
    console.info('[Pastel Highlighter] commandes enregistrées');
  },
});
