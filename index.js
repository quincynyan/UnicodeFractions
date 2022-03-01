const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { messages } = require("powercord/webpack");
const { replaceFractionsInString } = require("./script");

const { getModule } = require("powercord/webpack");
const { findInReactTree } = require("powercord/util");

module.exports = class UnicodeFractions extends Plugin {
	// toggled;
	startPlugin() {
		// this.toggled = this.settings.get("toggled", false);

		// powercord.api.commands.registerCommand({
		// 	command: "raw",
		// 	description: "Sends the input, without markdown",
		// 	usage: "{c} [...args]",
		// 	executor: (args) => {
		// 		if (args.length === 0) {
		// 			return {
		// 				send: false,
		// 				result: "That string is empty!"
		// 			};
		// 		}
		// 		let raw = this.rawify(args.join(" "));
		// 		return {
		// 			send: true,
		// 			result: raw
		// 		};
		// 	}
		// });

		// powercord.api.commands.registerCommand({
		// 	command: "toggleraw",
		// 	description:
		// 		"Toggles if the plugin should automatically make your messages raw.",
		// 	usage: "{c}",
		// 	executor: (args) => {
		// 		this.toggled = !this.toggled;
		// 		this.settings.set("toggled", this.toggled);
		// 		return {
		// 			send: false,
		// 			result: this.toggled
		// 				? "I will now be rawifying your messages automatically"
		// 				: "I will no longer be rawifying your messages automatically"
		// 		};
		// 	}
		// });

		// const CTAC = getModule(
		// 	(m) =>
		// 		m.default?.type?.render?.displayName ==
		// 		"ChannelTextAreaContainer",
		// 	false
		// ).default;

		// inject("UnicodeFractions", CTAC.type, "render", (_, res) => {
		// 	const editor = findInReactTree(
		// 		res,
		// 		(x) => x.props?.promptToUpload && x.props.onSubmit
		// 	);
		// 	editor.props.onSubmit = ((original) =>
		// 		function (...args) {
		// 			args[0] = replaceFractionsInString(args[0]);
		// 			return original(...args);
		// 		})(editor.props.onSubmit);
		// 	return res;
		// });
		// CTAC.type.render.displayName = "ChannelTextAreaContainer";

		inject(
			"UnicodeFractions",
			messages,
			"sendMessage",
			(args) => {
				// if (!this.toggled) return args;
				args[1].content = replaceFractionsInString(args[1].content);
				return args;
			},
			true
		);
	}
	pluginWillUnload() {
		// powercord.api.commands.unregisterCommand("raw");
		// powercord.api.commands.unregisterCommand("toggleraw");
		uninject("UnicodeFractions");
	}
};
