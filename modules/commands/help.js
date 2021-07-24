module.exports.config = {
	name: "help",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "[Tên module]",
	cooldowns: 5
};

module.exports.handleEvent = function ({ api, event }) {
	const { commands } = global.client;
	
	if (!event.body) return;

	const { threadID, messageID, body } = event;

	if (body.indexOf("help") != 0) return;

	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);


	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());

	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	return api.sendMessage(`『 ${command.config.name} 』\n${command.config.description}\n\n❯ Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯ Thuộc nhóm: ${command.config.commandCategory}\n❯ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯ Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n\n» Module code by ${command.config.credits} «`, threadID, messageID);
}

module.exports.run = function({ api, event, args }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	
	if (!command) {
		const command = commands.values();
		var group = [], msg = "";
		for (const commandConfig of command) {
			if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
			else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
		}
		group.forEach(commandGroup => msg += `『 ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} 』\n${commandGroup.cmds.join(', ')}\n\n`);
		return api.sendMessage(msg + `[ 𝙎𝙪̛̉ 𝙙𝙪̣𝙣𝙜 : "${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX}help 𝙩𝙪̛̀𝙣𝙜 𝙡𝙚̣̂𝙣𝙝 𝙤̛̉ 𝙩𝙧𝙚̂𝙣 đ𝙚̂̉ 𝙭𝙚𝙢 𝙘𝙝𝙞 𝙩𝙞𝙚̂́𝙩 𝙘𝙖́𝙘𝙝 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜! | 𝙃𝙞𝙚̣̂𝙣 𝙩𝙖̣𝙞 đ𝙖𝙣𝙜 𝙘𝙤́  ${commands.size} 𝙡𝙚̣̂𝙣𝙝 𝙘𝙤́ 𝙩𝙝𝙚̂̉ 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜 𝙩𝙧𝙚̂𝙣 𝙗𝙤𝙩 \n𝙈𝙤̣𝙞 𝙩𝙝𝙖̆́𝙘 𝙢𝙖̆́𝙘 𝙭𝙞𝙣 𝙡𝙞𝙚̂𝙣 𝙝𝙚̣̂  𝙦𝙪𝙖 𝘼𝙙𝙢𝙞𝙣 𝘽𝙤𝙩 \nFb : Https://www.facebook.com/Admin.HoangAnh.Booking \nZalo : 0392462491 \n𝘾𝙝𝙪́𝙘 𝙘𝙖́𝙘 𝙗𝙖̣𝙣 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜 𝘽𝙤𝙩 𝙫𝙪𝙞 𝙫𝙚̉ ♥ ]
\n📣 Help sẽ gỡ sau 60s`, event.threadID , (err, info)  => setTimeout ( () => { api.unsendMessage(info.messageID) } , 60000))

	}

	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	return api.sendMessage(`🔰 ${command.config.name} 🔰\n${command.config.description}\n\n❯ Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯ Thuộc nhóm: ${command.config.commandCategory}\n❯ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯ Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n\n» Module code by ${command.config.credits} «`, threadID, messageID);
}