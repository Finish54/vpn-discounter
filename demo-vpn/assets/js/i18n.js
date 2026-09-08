/* ═══ СЛОВАРЬ RU / EN ═══
   Ключ = значение атрибута data-i18n.
   Чтобы добавить язык — добавьте объект и кнопку в .lang в index.html. */
window.I18N = {

ru: {
  "meta.title":"VPN Discounter — быстрый VPN от 100 ₽ в месяц",
  "meta.desc":"Безлимитный VPN без логов. Серверы по всему миру, до 5 устройств, оплата картой и криптой. Подключение за 2 минуты через Telegram.",
  "a11y.skip":"К основному содержимому",

  "nav.servers":"Серверы","nav.services":"Сервисы","nav.pricing":"Тарифы","nav.install":"Установка","nav.cta":"Подключить",

  "hero.badge":"Работает в России · без логов · без рекламы",
  "hero.h1a":"Интернет без границ",
  "hero.h1b":"от 100 ₽ в месяц",
  "hero.sub":"Безлимитная скорость, серверы в 14 странах и подключение за две минуты прямо из Telegram. Никаких приложений-шпионов и скрытых списаний.",
  "hero.cta":"Подключить в Telegram",
  "hero.cta2":"Смотреть тарифы",

  "toggle.label":"Ваш IP-адрес сейчас",
  "toggle.detecting":"Определяем местоположение…",
  "toggle.failed":"Не удалось определить сеть — это нормально",
  "toggle.off":"Соединение не защищено — провайдер видит трафик",
  "toggle.on":"Защищено · трафик зашифрован AES-256",
  "toggle.masked":"Скрыто · выход через Амстердам",
  "toggle.hint":"Это демонстрация. Реальное подключение — через приложение.",

  "stats.countries":"стран","stats.uptime":"аптайм","stats.logs":"логов","stats.setup":"на настройку","stats.minSuffix":" мин",

  "servers.kicker":"Инфраструктура",
  "servers.h2":"Серверы там, где вам нужно",
  "servers.sub":"Только собственные ноды на 10 Гбит/с. Наведите на точку, чтобы увидеть пинг.",

  "services.kicker":"Доступ",
  "services.h2":"Всё, что перестало открываться — открывается",
  "services.sub":"Без капчи, без «сервис недоступен в вашем регионе», без падения скорости.",
  "services.note":"…и любые другие сайты и приложения — мы не режем протоколы и не ограничиваем торренты.",

  "pricing.kicker":"Тарифы",
  "pricing.h2":"Честная цена без автосписаний",
  "pricing.sub":"Платите за месяц — продлеваете, когда захотите. Оплата картой, СБП или криптой.",
  "pricing.pay":"Принимаем:",

  "calc.label":"Сколько устройств нужно?",
  "calc.cur":" ₽/мес",
  "calc.hintStd":"Тариф «Стандарт» — 1 устройство, 2 локации, безлимит",
  "calc.hintMob":"Тариф «Мобильный» — 3 устройства, 50 ГБ трафика",
  "calc.hintPrem":"Тариф «Премиум» — 5 устройств, все локации, безлимит",

  "plan.cur":"₽","plan.per":"/мес","plan.cta":"Выбрать","plan.best":"Выбирают чаще всего",
  "plan.std.name":"Стандарт","plan.std.f1":"1 устройство","plan.std.f2":"2 локации на выбор","plan.std.f3":"Безлимитный трафик","plan.std.f4":"Поддержка в Telegram",
  "plan.mob.name":"Мобильный","plan.mob.f1":"3 устройства","plan.mob.f2":"50 ГБ трафика","plan.mob.f3":"Все мобильные платформы","plan.mob.f4":"Поддержка в Telegram",
  "plan.prem.name":"Премиум","plan.prem.f1":"5 устройств","plan.prem.f2":"Все локации","plan.prem.f3":"Безлимитный трафик","plan.prem.f4":"Приоритетная поддержка",

  "install.kicker":"Установка","install.h2":"Три шага. Две минуты.",
  "step1.h":"Установите приложение Happ",
  "step1.p":"Откройте страницу в App Store и установите Happ. Запустите, в окне разрешения VPN-конфигурации нажмите Allow и введите свой пароль.",
  "step2.h":"Добавьте подписку одной кнопкой",
  "step2.p":"Оплатите тариф в боте и нажмите «Добавить подписку» — приложение откроется само, конфигурация подтянется автоматически. Ключи вводить не нужно.",
  "step2.cta":"Открыть бота",
  "step3.h":"Подключитесь",
  "step3.p":"В главном разделе нажмите большую кнопку включения в центре. Выберите сервер в списке — если скорость просела, просто переключитесь на другую локацию.",

  "scr.store":"App Store","scr.appsub":"Proxy & VPN client","scr.get":"Загрузить",
  "scr.bot":"VPN Discounter","scr.msg":"Подписка «Премиум» активна до 11.12.2027","scr.add":"+ Добавить подписку","scr.toast":"Конфигурация добавлена в Happ",
  "scr.happ":"Happ","scr.connected":"Подключено · 8 мс","scr.loc":"Нидерланды · Амстердам",

  "final.h2":"Первый месяц — 100 ₽. Дальше решаете вы.",
  "final.p":"Не подошло — просто не продлевайте. Мы не храним карту и не списываем автоматически.",
  "final.cta":"Подключить за 2 минуты",

  "foot.tag":"Приватность — это не опция, а настройка по умолчанию.",
  "foot.product":"Продукт","foot.help":"Поддержка","foot.contacts":"Контакты",
  "foot.support":"Написать в поддержку","foot.bot":"Telegram-бот",
  "foot.terms":"Пользовательское соглашение","foot.privacy":"Политика конфиденциальности",
  "foot.hours":"Отвечаем ежедневно, 10:00–23:00 МСК",
  "foot.legal":"Сервис предназначен для защиты личных данных и не предназначен для нарушения законодательства.",

  "ping":"пинг"
},

en: {
  "meta.title":"VPN Discounter — fast VPN from $1.2 / month",
  "meta.desc":"Unlimited no-log VPN. Servers worldwide, up to 5 devices, card and crypto payments. Set up in 2 minutes via Telegram.",
  "a11y.skip":"Skip to content",

  "nav.servers":"Servers","nav.services":"Services","nav.pricing":"Pricing","nav.install":"Setup","nav.cta":"Get started",

  "hero.badge":"Works in restricted regions · no logs · no ads",
  "hero.h1a":"Internet without borders",
  "hero.h1b":"from 100 ₽ a month",
  "hero.sub":"Unlimited speed, servers in 14 countries and a two-minute setup straight from Telegram. No spyware apps, no silent charges.",
  "hero.cta":"Get it on Telegram",
  "hero.cta2":"See pricing",

  "toggle.label":"Your IP address right now",
  "toggle.detecting":"Detecting your location…",
  "toggle.failed":"Couldn't detect your network — that's fine",
  "toggle.off":"Unprotected — your ISP can see your traffic",
  "toggle.on":"Protected · traffic encrypted with AES-256",
  "toggle.masked":"Hidden · exiting via Amsterdam",
  "toggle.hint":"This is a demo. The real tunnel runs in the app.",

  "stats.countries":"countries","stats.uptime":"uptime","stats.logs":"logs","stats.setup":"to set up","stats.minSuffix":" min",

  "servers.kicker":"Infrastructure",
  "servers.h2":"Servers where you need them",
  "servers.sub":"Bare-metal 10 Gbit/s nodes only. Hover a dot to see its ping.",

  "services.kicker":"Access",
  "services.h2":"Everything that stopped loading — loads again",
  "services.sub":"No captchas, no \"not available in your region\", no speed drop.",
  "services.note":"…and any other site or app — we don't throttle protocols or block torrents.",

  "pricing.kicker":"Pricing",
  "pricing.h2":"Fair price, no auto-renewals",
  "pricing.sub":"Pay per month, renew whenever you want. Card, SBP or crypto.",
  "pricing.pay":"We accept:",

  "calc.label":"How many devices do you need?",
  "calc.cur":" ₽/mo",
  "calc.hintStd":"Standard — 1 device, 2 locations, unlimited",
  "calc.hintMob":"Mobile — 3 devices, 50 GB of traffic",
  "calc.hintPrem":"Premium — 5 devices, all locations, unlimited",

  "plan.cur":"₽","plan.per":"/mo","plan.cta":"Choose","plan.best":"Most popular",
  "plan.std.name":"Standard","plan.std.f1":"1 device","plan.std.f2":"2 locations of your choice","plan.std.f3":"Unlimited traffic","plan.std.f4":"Telegram support",
  "plan.mob.name":"Mobile","plan.mob.f1":"3 devices","plan.mob.f2":"50 GB of traffic","plan.mob.f3":"All mobile platforms","plan.mob.f4":"Telegram support",
  "plan.prem.name":"Premium","plan.prem.f1":"5 devices","plan.prem.f2":"All locations","plan.prem.f3":"Unlimited traffic","plan.prem.f4":"Priority support",

  "install.kicker":"Setup","install.h2":"Three steps. Two minutes.",
  "step1.h":"Install the Happ app",
  "step1.p":"Open the App Store page and install Happ. Launch it, tap Allow in the VPN configuration prompt and enter your device password.",
  "step2.h":"Add your subscription with one tap",
  "step2.p":"Pay in the bot and tap \"Add subscription\" — the app opens by itself and pulls the config automatically. No keys to copy.",
  "step2.cta":"Open the bot",
  "step3.h":"Connect",
  "step3.p":"Tap the big power button on the main screen. Pick a server from the list — if speed drops, just switch to another location.",

  "scr.store":"App Store","scr.appsub":"Proxy & VPN client","scr.get":"GET",
  "scr.bot":"VPN Discounter","scr.msg":"Premium plan active until 11.12.2027","scr.add":"+ Add subscription","scr.toast":"Config added to Happ",
  "scr.happ":"Happ","scr.connected":"Connected · 8 ms","scr.loc":"Netherlands · Amsterdam",

  "final.h2":"First month is 100 ₽. After that it's your call.",
  "final.p":"Not for you? Just don't renew. We never store your card and never charge automatically.",
  "final.cta":"Set up in 2 minutes",

  "foot.tag":"Privacy isn't a feature. It's the default.",
  "foot.product":"Product","foot.help":"Support","foot.contacts":"Contacts",
  "foot.support":"Message support","foot.bot":"Telegram bot",
  "foot.terms":"Terms of Service","foot.privacy":"Privacy Policy",
  "foot.hours":"We reply daily, 10:00–23:00 MSK",
  "foot.legal":"The service is intended to protect personal data and must not be used to break the law.",

  "ping":"ping"
}
};

/* Локации серверов: x/y — доля от ширины/высоты карты (эквидистантная проекция) */
window.SERVERS = [
  { id:"nl", x:.4997, y:.1910, ping:8,  ru:"Нидерланды · Амстердам", en:"Netherlands · Amsterdam" },
  { id:"de", x:.5106, y:.2082, ping:12, ru:"Германия · Франкфурт",   en:"Germany · Frankfurt" },
  { id:"fi", x:.5571, y:.1328, ping:14, ru:"Финляндия · Хельсинки",  en:"Finland · Helsinki" },
  { id:"se", x:.5374, y:.1396, ping:15, ru:"Швеция · Стокгольм",     en:"Sweden · Stockholm" },
  { id:"gb", x:.4853, y:.1978, ping:22, ru:"Великобритания · Лондон",en:"United Kingdom · London" },
  { id:"fr", x:.4924, y:.2175, ping:19, ru:"Франция · Париж",        en:"France · Paris" },
  { id:"pl", x:.5457, y:.1925, ping:11, ru:"Польша · Варшава",       en:"Poland · Warsaw" },
  { id:"tr", x:.5686, y:.2761, ping:24, ru:"Турция · Стамбул",       en:"Türkiye · Istanbul" },
  { id:"ae", x:.6437, y:.3933, ping:41, ru:"ОАЭ · Дубай",            en:"UAE · Dubai" },
  { id:"kz", x:.7054, y:.2597, ping:26, ru:"Казахстан · Алматы",     en:"Kazakhstan · Almaty" },
  { id:"us", x:.2743, y:.2784, ping:96, ru:"США · Нью-Йорк",         en:"USA · New York" },
  { id:"usw",x:.1480, y:.3280, ping:142,ru:"США · Лос-Анджелес",     en:"USA · Los Angeles" },
  { id:"sg", x:.7823, y:.5720, ping:118,ru:"Сингапур",               en:"Singapore" },
  { id:"jp", x:.8848, y:.3157, ping:124,ru:"Япония · Токио",         en:"Japan · Tokyo" }
];
