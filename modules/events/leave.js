module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người rời khỏi nhóm",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝙩𝙪̛̣ 𝙘𝙪́𝙩" : "𝙗𝙞̣ 𝙦𝙪𝙖̉𝙣 𝙩𝙧𝙞̣ 𝙫𝙞𝙚̂𝙣 đ𝙪𝙤̂̉𝙞";
	const path = join(__dirname, "cache", "leaveGif");
	const gifPath = join(path, `outbox.gif`);
	var msg, formPush
	
	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = "𝘾𝙤𝙣 𝙫𝙤̛̣  {name} 𝙫𝙞̀ 𝙠𝙝𝙤̂𝙣𝙜 𝙩𝙖́𝙣 đ𝙤̂̉ 𝙚𝙢 𝙣𝙖̀𝙤 𝙣𝙚̂𝙣 đ𝙖̃ {type} 𝙠𝙝𝙤̉𝙞 𝙣𝙝𝙤́𝙢, 𝙑𝙞̃𝙣𝙝 𝙗𝙞𝙚̣̂𝙩 𝙚𝙢 𝙣𝙝𝙚́ ❤" : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}
