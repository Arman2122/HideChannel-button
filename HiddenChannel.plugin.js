/**
 * @name HideChannels
 * @displayName HideChannels
 * @authorId 460692713025830912
 * @website https://github.com/Arman2122
 * @source https://github.com/Arman2122/HiddenChannel
 * @telegram t.me/Arman_HC
 */


module.exports = (() => {
	const config = {
		info: {
			name: "HideChannels",
			authors: [
				{
					name: "ArmanHC",
					discord_id: "460692713025830912",
					github_username: "Arman2122"
				}
			],
			version: "1.0",
			description: "See Any Channel And Hidden Channel On Any Discord :)",
			github: "https://github.com/Arman2122/HiddenChannel/blob/main/HiddenChannel.plugin.js",
		},
		changelog: [
			{
				title: "Plugin rewrite",
				type: "added",
				items: [
					"The plugin got rewritten."
				]
			}
		]
	};

	return !global.ZeresPluginLibrary ? class {
		constructor() { this._config = config; }
		getName() { return config.info.name; }
		getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
		getDescription() { return config.info.description; }
		getVersion() { return config.info.version; }
		load() {
			BdApi.showConfirmationModal("Library plugin is needed",
				[`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`], {
				confirmText: "Download",
				cancelText: "Cancel",
				onConfirm: () => {
					require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
					if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
						await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
					});
				}
			});
		}
		start() { }
		stop() { }
	} : (([Plugin, Api]) => {
		const plugin = (Plugin, Api) => {
			const { PluginUtilities, Patcher } = Api;

			const buttonName = 'toggleChannels',
				buttonHideName = 'channelsVisible',
				buttonShowName = 'channelsHidden',
				hideElementsName = 'hideElement',
				targetElement = '.container-1r6BKw',
				sidebarName = '.sidebar-2K8pFh';

			return class HideChannels extends Plugin {

				onStart() {
					PluginUtilities.addStyle(config.info.name + 'CSS',
						`
						#toggleChannels { position: absolute; width: 24px; height: 24px; top: 0; left: 8px; bottom: 0; margin: auto 0; background-position: center; background-size: 100%; opacity: 0.8; z-index: 2; cursor: pointer; }
						.theme-dark #toggleChannels.channelsVisible { background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCI+PHBhdGggZD0iTTE4LjQxIDE2LjU5TDEzLjgyIDEybDQuNTktNC41OUwxNyA2bC02IDYgNiA2ek02IDZoMnYxMkg2eiIvPjxwYXRoIGQ9Ik0yNCAyNEgwVjBoMjR2MjR6IiBmaWxsPSJub25lIi8+PC9zdmc+); }
						.theme-dark #toggleChannels.channelsHidden { background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTUuNTkgNy40MUwxMC4xOCAxMmwtNC41OSA0LjU5TDcgMThsNi02LTYtNnpNMTYgNmgydjEyaC0yeiIvPjwvc3ZnPg==); }
						.theme-light #toggleChannels.channelsVisible { background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzRmNTY2MCIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCI+PHBhdGggZD0iTTE4LjQxIDE2LjU5TDEzLjgyIDEybDQuNTktNC41OUwxNyA2bC02IDYgNiA2ek02IDZoMnYxMkg2eiIvPjxwYXRoIGQ9Ik0yNCAyNEgwVjBoMjR2MjR6IiBmaWxsPSJub25lIi8+PC9zdmc+); }
						.theme-light #toggleChannels.channelsHidden { background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzRmNTY2MCIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTUuNTkgNy40MUwxMC4xOCAxMmwtNC41OSA0LjU5TDcgMThsNi02LTYtNnpNMTYgNmgydjEyaC0yeiIvPjwvc3ZnPg==); }
						.hideElement { width: 0 !important; }
						.sidebar-2K8pFh .container-3baos1 { transition: 400ms ease all; }
						.sidebar-2K8pFh.hideElement .container-3baos1 { position: absolute; box-sizing: border-box; width: 240px; height: 68px; bottom: 0; margin-bottom: 0; padding: 0 8px; z-index: 2; }
						.sidebar-2K8pFh.hideElement .container-3baos1 { background-color: var(--background-primary); }
						.sidebar-2K8pFh + .chat-3bRxxu .messagesWrapper-1sRNjr + .form-2fGMdU { margin-left: 0; transition: 400ms ease margin-left; }
						.sidebar-2K8pFh.hideElement + .chat-3bRxxu .messagesWrapper-1sRNjr + .form-2fGMdU { margin-left: 240px; }
						.sidebar-2K8pFh, .hideElement { transition: width 400ms ease; }
						.children-19S4PO { padding-left: 24px; }`
					);

					this.renderButton();
					this.addExtras();
				}

				onStop() {
					PluginUtilities.removeStyle(config.info.name + 'CSS');
					Patcher.unpatchAll();

					this.removeExtras();
				}

				onSwitch() {
					this.renderButton();
				}

				renderButton() {
					const button = document.createElement('div'),
						titleBar = document.querySelector(targetElement),
						settings = this.loadSettings();

					var buttonClass;

					if (settings.HideChannels.channelsHidden == true)
						buttonClass = buttonShowName;
					else
						buttonClass = buttonHideName;

					button.setAttribute('id', buttonName);
					button.setAttribute('class', buttonClass);

					titleBar.append(button);

					let buttonAction = document.getElementById(buttonName);
					buttonAction.addEventListener('click', ()=> this.toggleChannels());

				}

				toggleChannels() {
					const button = document.querySelector('#' + buttonName),
						sidebar = document.querySelector(sidebarName);

					if (button.classList.contains(buttonHideName)) {
						button.setAttribute('class', buttonShowName);
						sidebar.classList.add(hideElementsName);

						this.saveSettings(true);
					} else if (button.classList.contains(buttonShowName)) {
						button.setAttribute('class', buttonHideName);
						sidebar.classList.remove(hideElementsName);

						this.saveSettings(false);
					}
				}

				addExtras() {
					const sidebar = document.querySelector(sidebarName),
						settings = this.loadSettings();

					if (settings.HideChannels.channelsHidden == true) {
						setTimeout(function() {
							sidebar.classList.add(hideElementsName);
						}, 2500);
					}
				}

				removeExtras() {
					const button = document.querySelector('#' + buttonName);
					if (button) button.remove();

					const sidebar = document.querySelector(sidebarName);
					if (sidebar.classList.contains(hideElementsName))
						sidebar.classList.remove(hideElementsName);
				}

				get defaultSettings() {
					return {
						HideChannels: {
							channelsHidden: false
						}
					}
				}

				loadSettings() {
					BdApi.loadData(this.getName(), 'settings');
					var settings = (BdApi.loadData(this.getName(), 'settings')) ? BdApi.loadData(this.getName(), 'settings') : this.defaultSettings;

					return settings;
				}

				saveSettings(status) {
					const settings = this.loadSettings();

					settings.HideChannels.channelsHidden = status;
					BdApi.saveData(this.getName(), 'settings', settings);
				}
			};
		};

		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
