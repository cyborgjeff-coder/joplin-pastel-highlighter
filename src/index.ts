import joplin from 'api';
import { ToolbarButtonLocation, MenuItemLocation } from 'api/types';

const pastelColors = [
  { key: 'yellow', label: 'Jaune pastel', color: '#FFF2A8' },
  { key: 'green', label: 'Vert pastel', color: '#C9EED2' },
  { key: 'pink', label: 'Rose pastel', color: '#F8CBDD' },
  { key: 'blue', label: 'Bleu pastel', color: '#CBE8FA' },
  { key: 'lavender', label: 'Lavande pastel', color: '#E2D5FA' },
  { key: 'peach', label: 'Pêche pastel', color: '#FFDCC4' },
];

async function applyHighlight(color: string) {
  await joplin.commands.execute('editor.execCommand', {
    name: 'HiliteColor', value: color, ui: false,
  });
}

async function clearHighlight() {
  // Supprime le format de fond dans TinyMCE, sans toucher au gras, à l'italique ou aux liens.
  // Contrairement à RemoveFormat, cette commande ne retire pas tous les styles.
  await joplin.commands.execute('editor.execCommand', {
    name: 'mceRemoveTextcolor', ui: 'hilitecolor', value: null,
  });
}

joplin.plugins.register({
  onStart: async () => {
    console.info('[Pastel Highlighter 0.4.5] démarrage');
    let currentColor = '#C9EED2';
    // Un dialogue unique : Joplin ne permet pas de recréer le même identifiant à chaque clic.
    const dialog = await joplin.views.dialogs.create('quenaPastelColorDialog');
    await joplin.commands.register({
      name: 'quenaPastelApplyCurrent', label: 'Surligner avec la couleur actuelle',
      iconName: 'fas fa-highlighter',
      execute: async () => { try { await applyHighlight(currentColor); } catch (e) { console.error(e); } },
    });
    await joplin.views.toolbarButtons.create(
      'quenaPastelApplyCurrentButton', 'quenaPastelApplyCurrent', ToolbarButtonLocation.EditorToolbar
    );
    await joplin.commands.register({
      name: 'quenaPastelOpenPalette',
      label: 'Surlignage pastel : choisir une couleur',
      iconName: 'fas fa-palette',
      execute: async () => {
        try {
        const rows = pastelColors.map((c, i) =>
          `<label style="display:flex;align-items:center;gap:10px;margin:9px 0;cursor:pointer">` +
          `<input type="radio" name="pastelColor" value="${c.key}" ${i === 1 ? 'checked' : ''}>` +
          `<span style="width:28px;height:20px;border:1px solid #999;border-radius:4px;background:${c.color}"></span>` +
          `${c.label}</label>`
        ).join('');
        await joplin.views.dialogs.setHtml(dialog,
          `<div style="font:14px sans-serif;padding:12px 20px;min-width:230px">` +
          `<h3 style="margin:0 0 12px">Surlignage pastel</h3>` +
          `<form name="pastelPicker">${rows}` +
          `<hr><label style="display:flex;gap:10px;align-items:center">` +
          `<input type="radio" name="pastelColor" value="erase">` +
          `🧽 Supprimer le surlignage</label></form></div>`
        );
        await joplin.views.dialogs.setButtons(dialog, [
          { id: 'ok', title: 'Appliquer' }, { id: 'cancel', title: 'Annuler' },
        ]);
          const result = await joplin.views.dialogs.open(dialog);
          if (result.id !== 'ok') return;
          const choice = result.formData?.pastelPicker?.pastelColor;
          // Le dialogue ferme, rendre le focus a l'editeur avant d'appliquer.
          // Attention : TinyMCE peut ne pas conserver la selection initiale.
          await joplin.commands.execute('editor.focus');
          if (choice === 'erase') await clearHighlight();
          else {
            const color = pastelColors.find(c => c.key === choice);
            if (color) { currentColor = color.color; await applyHighlight(color.color); }
          }
        } catch (error) { console.error('[Pastel Highlighter] palette', error); }
      },
    });
    await joplin.views.toolbarButtons.create(
      'quenaPastelPaletteButton', 'quenaPastelOpenPalette', ToolbarButtonLocation.EditorToolbar
    );
    const menuCommands: string[] = [];
    for (const c of pastelColors) {
      const name = `quenaPastelApply${c.key}`;
      await joplin.commands.register({
        name, label: c.label, iconName: 'fas fa-highlighter',
        execute: async () => { try { await applyHighlight(c.color); } catch (e) { console.error(e); } },
      });
      menuCommands.push(name);
    }
    await joplin.commands.register({
      name: 'quenaPastelErase', label: 'Supprimer le surlignage', iconName: 'fas fa-eraser',
      execute: async () => { try { await clearHighlight(); } catch (e) { console.error(e); } },
    });
    menuCommands.push('quenaPastelErase');
    await joplin.views.menus.create('quenaPastelToolsSubmenu', 'Surligner', menuCommands.map(commandName => ({ commandName })), MenuItemLocation.Tools);
    console.info('[Pastel Highlighter 0.4.5] deux boutons et sous-menu enregistrés');
  },
});
