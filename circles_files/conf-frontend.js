'use strict';

// Общий конфигурационный файл

var conf_frontend = {
	name_site: "CS.MONEY",
	domain_socket: "cs.money",
	site: "http://cs.money",
	domain: "cs.money",
	bonus_nick: "cs.money",
	link_image: "https://pic.money/",
	link_image_new: "https://s.cs.money/thumb/",
	view3d: 'https://3d.cs.money',
	link_image_new_postfix: "_mini",
	link_stickers: "https://pic.money/",
	short_link: "",
	idGame: "730",
	round: 2, // Округление цен до ... знаков после запятой
	numberRound: 100,

	images_version: 21,

	min_value_for_balance: 5, // Минимально возможный донат
	max_to_balance: 5000, // Максимально возможная начисленная сумма на баланс во время обмена
	balance_limit: 100000, // Максимально возможная сумма доната

	g2aBonus: 0.3, // Значение бонуса при зачислении на счет

	hint_timeout: 400, // Через данное время будет показана всплывающая подсказка

	default_interval_send_error: 8000, // Отправлять ошибки через определенный интервал (чтобы не захломлять логи)

	count_show_skins: 180, // Количество показываемых скинов в инвентарях

	time_show_popup_default: 4500, // Время показывания popupDefault

	time_can_show_popup: 200, // Время скрытия попапа при скролле

	/*id Блоков инвентарей*/
	user: "UserInventory",
	bot: "BotInventory",

	min_review_length: 10,
	screen_link: "https://s.cs.money",
	giveaway_key: 'vUCIs',
	screen: true,

	inspect_link: 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S',
	app_id_onesignal: "08ba9c9f-c979-40b0-a059-1210dad5c077"
};