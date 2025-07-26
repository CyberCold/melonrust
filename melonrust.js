console.log('%c Version: ', 'color: white; background-color: #f2a358', '0.0.1');
console.log('%c Author: ', 'color: white; background-color: #696969', 'CyberCold');


// [Конфиг магазина]
const event = new CustomEvent("setCustomConfig")
window.productsGrid = 4; // Устанавливает сетку продуктов 
window.currency = 'руб' // Устанавливает кастомную валюту
window.defaultPaymentAmount = 150 // Устанавливает значение для пополнения по умолчанию
window.zeroToFree = true // Заменяет 0 на бесплатно
window.sidebarStoreToRight = true // Устанавливает виджеты справа
window.sidebarProfileToRight = true // Устанавливает навигацию в профиле справа
window.dispatchEvent(event);
// [/Конфиг магазина]

// [Загрузка Swiper библиотеки]
function loadSwiperLibrary() {
    if (document.getElementById('swiper-script')) {
        console.log('Swiper library already loaded');
        return;
    }
    var swiperScript = document.createElement("script");
    swiperScript.id = 'swiper-script';
    swiperScript.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js";
    swiperScript.onerror = function() {
        console.error('Failed to load Swiper from CDN, trying fallback');
        swiperScript.src = "https://unpkg.com/swiper@11/swiper-element-bundle.min.js";
    };
    swiperScript.onload = function() {
        console.log('Swiper library loaded successfully');
    };
    document.body.appendChild(swiperScript);
}

if (window.isAppReady) {
    loadSwiperLibrary();
} else {
    window.addEventListener('appReady', () => {
        loadSwiperLibrary();
    });
}
// [/Загрузка Swiper библиотеки]

// [Настройка виджета Discord]
function loadDiscordStats() {
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://discord.com/api/v9/invites/2D456zDGj3?with_counts=true')}`)
    .then(response => response.json())
    .then(data => {
      const parsed = JSON.parse(data.contents);
      const presenceCountElement = document.querySelector('.presenceCount');
      const memberCountElement = document.querySelector('.memberCount');

      if (presenceCountElement) presenceCountElement.textContent = `${parsed.approximate_presence_count} в сети`;
      if (memberCountElement) memberCountElement.textContent = `${parsed.approximate_member_count} участ.`;
    })
    .catch(err => console.error('Discord API error:', err));
}

loadDiscordStats();
setInterval(loadDiscordStats, 10000);
// [/Настройка виджета Discord]


// [Настройка виджета мониторинга для нескольких серверов]

function GSMonit() {
  window.dispatchEvent(new CustomEvent("initState"));
  window.dispatchEvent(new CustomEvent("initComponentsManager"));

  function monit() {
    const fetchDataServers = () => {
      fetch('https://testmelon.gamestores.app/api/v1/widgets.monitoring')
        .then(response => {
          if (!response.ok) throw new Error('Нет ответа от сети!');
          return response.json();
        })
        .then(data => {
          if (data.result === "success" && data.data && data.data.servers) {
            const servers = data.data.servers;

            // Здесь задаёшь фейковые бусты по ID сервера
            const fakeBoosts = {
              40273: 14,
              40274: 0
            };

            document.querySelectorAll('[data-server-id]').forEach(widget => {
              const serverID = parseInt(widget.getAttribute('data-server-id'));
              const server = servers.find(s => s.id === serverID);

              if (server) {
                const playersElement = widget.querySelector('.players');
                const playersMaxElement = widget.querySelector('.playersMax');
                const connectBtn = widget.querySelector('.copybtn');

                // Применяем фейк буст
                const boost = fakeBoosts[serverID] ?? 0;
                const shownPlayers = (server.players ?? 0) + boost;

                if (playersElement) playersElement.textContent = shownPlayers;
                if (playersMaxElement) playersMaxElement.textContent = server.playersMax ?? 0;

                if (connectBtn) {
                  let connectAddress = server.connect ?? '';
                  if (!connectAddress.trim().startsWith('connect')) {
                    connectAddress = `connect ${connectAddress}`;
                  }
                  connectBtn.innerText = connectAddress.trim();
                }
              } else {
                console.warn(`Сервер с ID ${serverID} не найден!`);
              }
            });

          } else {
            console.error('Некорректные данные!');
          }
        })
        .catch(error => console.error('Ошибка: ', error));
    };

    fetchDataServers();
  }

  ['SHOP_PAGE', 'SUPPORT_PAGE', 'CUSTOM_PAGE'].forEach(page =>
    window.componentsManager.addListener(page, 'DID_MOUNT', () => {
      monit();
      setInterval(monit, 10000);
    })
  );

  window.componentsManager.load();
}

if (window.isAppReady) {
  GSMonit();
} else {
  window.addEventListener('appReady', GSMonit);
}

// [/Настройка виджета мониторинга]

// [Слайдер]
function GSslider() {
    window.dispatchEvent(new CustomEvent("initState"));
    window.dispatchEvent(new CustomEvent("initComponentsManager"));

    function initializeSlider() {
        console.log('Attempting to initialize slider');
        const slider = `
            <swiper-container class="gs-swiper-container mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30"
                centered-slides="true" autoplay-delay="5000" autoplay-disable-on-interaction="false">
                <swiper-slide class="gs-swiper-slide"><div class="gs-swiper-slide-img-wrapper"><img src="https://gspics.org/images/2024/02/23/0bZXu7.png"></div></swiper-slide>
                <swiper-slide class="gs-swiper-slide"><div class="gs-swiper-slide-img-wrapper"><img src="https://gspics.org/images/2024/02/15/0bi9NR.png"></div></swiper-slide>
                <div class="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span></span>
                </div>
            </swiper-container>
        `;
        
        let contentArea = document.querySelector('main') || document.querySelector('.Page-module__pageContent');
        if (!contentArea) {
            console.warn('Main or .Page-module__pageContent not found, creating fallback container');
            contentArea = document.createElement('div');
            contentArea.className = 'gs-swiper-fallback-container';
            document.body.appendChild(contentArea); // Изменили prepend на append
        }
        console.log('Content area found:', contentArea);

        if (document.querySelector('.gs-swiper-container')) {
            console.log('Slider already exists, skipping');
            return;
        }

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'gs-swiper-slider-container';
        sliderContainer.innerHTML = slider;

        // Попробуем найти шапку через разные селекторы
        const header = document.querySelector('.container.headerContainer') || 
                      document.querySelector('.Header-module__wrapper') || 
                      document.querySelector('header') || 
                      document.querySelector('[class*="header"]');
        
        if (header) {
            console.log('Header found:', header);
            console.log('Header parent:', header.parentNode);
            // Если шапка в contentArea, вставляем после неё
            if (header.parentNode === contentArea) {
                contentArea.insertBefore(sliderContainer, header.nextSibling);
                console.log('Slider inserted after header inside content area');
            } else {
                // Если шапка вне contentArea (например, в body), вставляем после неё в body
                header.parentNode.insertBefore(sliderContainer, header.nextSibling);
                console.log('Slider inserted after header in parent (likely body)');
            }
        } else {
            // Если шапка не найдена, вставляем в начало contentArea
            contentArea.insertBefore(sliderContainer, contentArea.firstChild);
            console.warn('Header not found, slider inserted at top of content area');
        }

        // Дебаг: логируем примененные стили
        setTimeout(() => {
            const img = document.querySelector('.gs-swiper-slide-img-wrapper img');
            const slide = document.querySelector('.gs-swiper-slide');
            if (img && slide) {
                const imgStyles = window.getComputedStyle(img);
                const slideStyles = window.getComputedStyle(slide);
                console.log('Image border-radius:', imgStyles.borderRadius);
                console.log('Slide border-radius:', slideStyles.borderRadius);
                console.log('Image overflow:', imgStyles.overflow);
                console.log('Wrapper overflow:', window.getComputedStyle(img.parentElement).overflow);
            } else {
                console.error('Image or slide not found for debugging');
            }
        }, 1000); // Даем время на рендеринг
    }

    ['SHOP_PAGE', 'SUPPORT_PAGE', 'CUSTOM_PAGE'].forEach(page => {
        window.componentsManager.addListener(page, 'DID_MOUNT', () => {
            console.log(`${page} DID_MOUNT triggered for slider`);
            initializeSlider();
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded triggered for slider');
        initializeSlider();
    });

    window.componentsManager.load();
}

if (window.isAppReady) {
    GSslider();
} else {
    window.addEventListener('appReady', () => {
        GSslider();
    });
}
// [/Слайдер]

// [Загрузка стилей для Swiper]
function loadSwiperStyles() {
    window.dispatchEvent(new CustomEvent("initState"));
    window.dispatchEvent(new CustomEvent("initComponentsManager"));

    function injectStyles() {
        console.log('Loading Swiper styles');
        if (document.getElementById('gs-swiper-styles')) {
            console.log('Swiper styles already loaded');
            return;
        }

        const styleElement = document.createElement('style');
        styleElement.id = 'gs-swiper-styles';
        styleElement.textContent = `
            .gs-swiper-container {
                width: 100%;
                height: 300px;
                margin: 0 auto !important;
                padding: 0 15px !important;
                position: relative !important;
                z-index: 1 !important;
                visibility: visible !important;
                border-radius: 40px !important;
            }

            .gs-swiper-slide {
                text-align: center !important;
                background: transparent !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                border-radius: 40px !important;
                overflow: hidden !important;
            }

            .gs-swiper-slide-img-wrapper {
                width: 100% !important;
                height: 100% !important;
                border-radius: 40px !important;
                overflow: hidden !important;
                position: relative !important;
            }

            .gs-swiper-slide img {
                display: block !important;
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                object-position: center !important;
                border-radius: 40px !important;
                box-sizing: border-box !important;
            }

            .autoplay-progress {
                position: absolute !important;
                right: 16px !important;
                bottom: 16px !important;
                z-index: 10 !important;
                width: 48px !important;
                height: 48px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-weight: bold !important;
                color: var(--swiper-theme-color, #2cd8a9) !important;
            }

            .autoplay-progress svg {
                --progress: 0;
                position: absolute !important;
                left: 0 !important;
                top: 0px !important;
                z-index: 10 !important;
                width: 100% !important;
                height: 100% !important;
                stroke-width: 4px !important;
                stroke: var(--swiper-theme-color, #2cd8a9) !important;
                fill: none !important;
                stroke-dashoffset: calc(125.6 * (1 - var(--progress))) !important;
                stroke-dasharray: 125.6 !important;
                transform: rotate(-90deg) !important;
            }

            .swiper-button-next svg, .swiper-button-prev svg {
                width: 50% !important;
                height: 50% !important;
                object-fit: contain !important;
                transform-origin: center center !important;
                color: #7c7c7c !important;
            }

            .swiper-pagination-bullet {
                width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px)) !important;
                height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px)) !important;
                display: inline-block !important;
                border-radius: var(--swiper-pagination-bullet-border-radius, 50%) !important;
                background: #7c7c7c !important;
                opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2) !important;
            }

            .swiper {
                width: 100% !important;
                height: 100% !important;
                margin-left: auto !important;
                margin-right: auto !important;
                position: relative !important;
                overflow: hidden !important;
                list-style: none !important;
                padding: 0px !important;
                z-index: 1 !important;
                display: block !important;
                border-radius: 40px !important;
            }

            .gs-swiper-slider-container {
                width: 100% !important;
                max-width: 1300px !important;
                margin: 10px auto !important; /* Небольшой отступ сверху */
                padding: 0 15px !important;
                border-radius: 40px !important;
            }
        `;
        document.head.appendChild(styleElement);
        console.log('Swiper styles injected');
    }

    ['SHOP_PAGE', 'SUPPORT_PAGE', 'CUSTOM_PAGE'].forEach(page => {
        window.componentsManager.addListener(page, 'DID_MOUNT', () => {
            console.log(`${page} DID_MOUNT triggered for styles`);
            injectStyles();
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded triggered for styles');
        injectStyles();
    });

    window.componentsManager.load();
}

if (window.isAppReady) {
    loadSwiperStyles();
} else {
    window.addEventListener('appReady', () => {
        loadSwiperStyles();
    });
}
// [/Загрузка стилей для Swiper]



// JQuery Provider
var jqueryScript = document.createElement("script");
jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js",
document.body.append(jqueryScript);

// [Аватар пользователя]
function useravatar() {
    window.dispatchEvent(new CustomEvent("initState"));
    window.dispatchEvent(new CustomEvent("initComponentsManager"));

    window.componentsManager.addListener('HEADER', 'DID_MOUNT', () => {
        const { player } = window.getState().player

        if(!player) return

        const userAvatar = `
            <div class="user-avatar">
                <img class="user-avatar-pic" src="${player.avatar}"></img>
            </div>
        `
        const profileLink = document.querySelector('.PlayerMenu-module__profileLink')

        profileLink.insertAdjacentHTML('beforebegin', userAvatar)
    })

    window.componentsManager.load()
}
if(window.isAppReady) {
  useravatar()
} else {
    window.addEventListener('appReady', () => {
    useravatar()
  })
}
// [/Аватар пользователя]

// [Иконка для кнопки "Войти"]
function GSiconlogin() {
window.dispatchEvent(new CustomEvent("initState"));
window.dispatchEvent(new CustomEvent("initComponentsManager"));

function rustageiconlogin() {
const buttons = document.querySelectorAll(".PlayerMenu-module__loginLink");
            const settings = [{
                src: "https://gspics.org/images/2025/02/04/IVDVpe.png",
                id: "user-icon",
            }, ];

            buttons.forEach((button,index)=>{
                if (index < settings.length) {
                    const img = document.createElement("img");
                    img.src = settings[index].src;
                    img.id = settings[index].id;

                    const buttonContent = document.createElement("div");
                    buttonContent.appendChild(img);
                    button.appendChild(buttonContent);
                }
            });
}

window.componentsManager.addListener('HEADER', 'DID_MOUNT', () => {
  rustageiconlogin();
});

window.componentsManager.load()
}
if (window.isAppReady) {
GSiconlogin();
} else {
window.addEventListener('appReady', () => {
  GSiconlogin();
});
}
// [/Иконка для кнопки "Войти"]

// [Иконка для кнопки "Профиль"]
function GSiconprofile() {
window.dispatchEvent(new CustomEvent("initState"));
window.dispatchEvent(new CustomEvent("initComponentsManager"));

function rustageiconprofile() {
const buttons = document.querySelectorAll(".PlayerMenu-module__profileLink");
            const settings = [{
                src: "https://gspics.org/images/2025/02/04/IVDrIX.png",
                id: "user-icon",
            }, ];

            buttons.forEach((button,index)=>{
                if (index < settings.length) {
                    const img = document.createElement("img");
                    img.src = settings[index].src;
                    img.id = settings[index].id;

                    const buttonContent = document.createElement("div");
                    buttonContent.appendChild(img);
                    button.appendChild(buttonContent);
                }
            });
}

window.componentsManager.addListener('HEADER', 'DID_MOUNT', () => {
  rustageiconprofile();
});

window.componentsManager.load()
}
if (window.isAppReady) {
GSiconprofile();
} else {
window.addEventListener('appReady', () => {
  GSiconprofile();
});
}
// [/Иконка для кнопки "Профиль"]

// [Иконки для навигации]
function GSicons() {
window.dispatchEvent(new CustomEvent("initState"));
window.dispatchEvent(new CustomEvent("initComponentsManager"));

function rustageicons() {
  
  var main= document.getElementsByClassName("HeaderNav-module__link")[0];
  var str = '<img class="nav-icon" src="https://gspics.org/images/2025/02/04/IVDBPO.png">';
  main.innerHTML += str;
   
  var main= document.getElementsByClassName("SupportLink-module__link")[0];
  var str = '<img class="nav-icon" src="https://gspics.org/images/2025/02/04/IVDs4i.png">';
  main.innerHTML += str;
  
}

window.componentsManager.addListener('HEADER', 'DID_MOUNT', () => {
  rustageicons();
});

window.componentsManager.load()
}
if (window.isAppReady) {
GSicons();
} else {
window.addEventListener('appReady', () => {
  GSicons();
});
}
// [/Иконки для навигации]

// [Иконка для баланса]
function GSiconbalance() {
window.dispatchEvent(new CustomEvent("initState"));
window.dispatchEvent(new CustomEvent("initComponentsManager"));

function rustageiconbalance() {
const buttons = document.querySelectorAll(".PlayerBalance-module__wrapper button");
            const settings = [{
                src: "https://gspics.org/images/2025/02/04/IVDJj3.png",
                id: "balance-icon",
            }, ];

            buttons.forEach((button,index)=>{
                if (index < settings.length) {
                    const img = document.createElement("img");
                    img.src = settings[index].src;
                    img.id = settings[index].id;

                    const buttonContent = document.createElement("div");
                    buttonContent.appendChild(img);
                    button.appendChild(buttonContent);
                }
            });
}

window.componentsManager.addListener('HEADER', 'DID_MOUNT', () => {
  rustageiconbalance();
});

window.componentsManager.load()
}
if (window.isAppReady) {
GSiconbalance();
} else {
window.addEventListener('appReady', () => {
  GSiconbalance();
});
}
// [/Иконка для баланса]

// [Иконки социальных сетей]
function GSiconssocials() {
window.dispatchEvent(new CustomEvent("initState"));
window.dispatchEvent(new CustomEvent("initComponentsManager"));

function rustageiconssocials() {
  var main= document.getElementsByClassName("LangSwitcher-module__wrapper")[0];
 var str = '<div class="socials"><a href="https://t.me/MelonRust" target="_blank" class="socials-telegram" title="Наш Telegram канал"><img class="socials-icon" src="https://gspics.org/images/2025/02/04/IVDhcL.png"></a><a href="https://discord.gg/2D456zDGj3"  target="_blank" class="socials-discord" title="Наш Discord"><img class="socials-icon" src="https://gspics.org/images/2025/02/04/IVDtgy.png"></a></div>';
  main.innerHTML += str;
  
}

window.componentsManager.addListener('HEADER', 'DID_MOUNT', () => {
  rustageiconssocials();
});

window.componentsManager.load()
}
if (window.isAppReady) {
GSiconssocials();
} else {
window.addEventListener('appReady', () => {
  GSiconssocials();
});
}
// [/Иконки социальных сетей]

console.log('%c Kits Init', 'color: white; background: #f2a358');

const ALL_KITS = {
  "СПАВН": {
    description: "Выдаётся при спавне",
    items: [
      { image: "https://via.placeholder.com/50", count: "x5,000", name: "5.56 (обычные)" },
      { image: "https://via.placeholder.com/50", count: "x1", name: "Калаш" }
    ]
  },
  "ПВП": {
    description: "PvP набор",
    items: [
      { image: "https://via.placeholder.com/50", count: "x20", name: "Бинты" },
      { image: "https://via.placeholder.com/50", count: "x1", name: "M249" }
    ]
  }
};

let initialized = false;
let modalOpenedByButton = false;

function initKitsModal() {
  if (initialized) return true;

  const modal = document.getElementById('kitsModal');
  const container = document.getElementById('kitsContainer');
  const closeBtn = document.getElementById('closeModalButton');

  if (!modal || !container || !closeBtn) {
    console.log('❌ Элементы модалки не найдены. Ждём...');
    return false;
  }

  console.log('✅ Модалка найдена, вешаем обработчики');

  modal.style.display = 'none';
  document.body.style.overflow = '';

  closeBtn.onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalOpenedByButton = false;
  };

  modal.onclick = e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      modalOpenedByButton = false;
    }
  };

  document.querySelectorAll('.viewKitsButton').forEach(btn => {
    btn.onclick = () => {
      const kitsAttr = btn.dataset.kits;
      if (!kitsAttr) return;

      const kits = kitsAttr.split(',').map(s => s.trim());
      container.innerHTML = '';

      kits.forEach(name => {
        const kit = ALL_KITS[name];
        if (!kit) return;

        const block = document.createElement('div');
        block.style.marginBottom = '20px';

        block.innerHTML = `
          <h4 style="color:#8000ff; text-shadow: 0 0 6px #8000ff; margin: 0 0 5px 0;">${name}</h4>
          <div style="display:inline-block; background:#8000ff; color:#fff; border-radius:4px; padding:4px 8px; font-size:12px; box-shadow: 0 0 8px #8000ff; margin-bottom:10px;">
            ${kit.description}
          </div>
          <div style="display:flex; gap:10px; flex-wrap: wrap;">
            ${kit.items.map(item => `
              <div style="background:#222; padding:10px; border-radius:6px; min-width: 80px; text-align:center; box-shadow: 0 0 6px #8000ff;">
                <img src="${item.image}" style="width:50px; height:50px; object-fit: cover; border-radius:4px;">
                <div style="font-weight:bold; margin-top:5px; color:#8000ff; text-shadow: 0 0 6px #8000ff;">${item.count}</div>
                <div style="font-size:12px; color:#fff;">${item.name}</div>
              </div>
            `).join('')}
          </div>`;

        container.appendChild(block);
      });

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      modalOpenedByButton = true;
    };
  });

  const observerModal = new MutationObserver(() => {
    if (modal.style.display === 'flex' && !modalOpenedByButton) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      console.log('❌ Авто-открытие модалки отменено');
    }
  });

  observerModal.observe(modal, { attributes: true, attributeFilter: ['style'] });

  initialized = true;
  return true;
}

const observer = new MutationObserver(() => {
  const success = initKitsModal();
  if (success) observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });

console.log('%c Kits Observer запущен', 'color: white; background: #f2a358');

document.addEventListener('mouseover', function(e) {
  if (e.target.classList.contains('question-mark')) {
    const tooltip = e.target.nextElementSibling;
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
  }
});
document.addEventListener('mouseout', function(e) {
  if (e.target.classList.contains('question-mark')) {
    const tooltip = e.target.nextElementSibling;
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
  }
});
  

//[защита]

(function () {
  var blocked = false;
  var BLOCK_TEXT = '⛔ Доступ к коду заблокирован!';
  var BLOCK_IMAGE = 'https://i.imgur.com/0XJ0SgD.png';

  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  document.addEventListener('selectstart', function (e) { e.preventDefault(); });
  document.addEventListener('copy', function (e) { e.preventDefault(); });

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.keyCode === 85) e.preventDefault();
    if (e.ctrlKey && e.keyCode === 83) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) e.preventDefault();
  });

  function blockPage() {
    if (blocked) return;
    blocked = true;

    ['script', 'style', 'link'].forEach(function (tag) {
      var els = document.getElementsByTagName(tag);
      for (var i = els.length - 1; i >= 0; i--) {
        if (tag === 'link' && els[i].rel !== 'stylesheet') continue;
        if (els[i].parentNode) els[i].parentNode.removeChild(els[i]);
      }
    });

    document.body.removeAttribute('style');
    document.head.removeAttribute('style');

    document.body.innerHTML = '';

    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = '#000';
    overlay.style.color = '#fff';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '999999';

    var img = document.createElement('img');
    img.src = BLOCK_IMAGE;
    img.style.maxWidth = '200px';
    img.style.marginBottom = '20px';

    var text = document.createElement('div');
    text.style.fontSize = '24px';
    text.style.fontFamily = 'sans-serif';
    text.textContent = BLOCK_TEXT;

    overlay.appendChild(img);
    overlay.appendChild(text);
    document.body.appendChild(overlay);
  }

  var devtoolsOpened = false;

  // Проверка DevTools через геттер в console.log
  function detectConsoleGetter() {
    var start = Date.now();
    var element = new Image();
    Object.defineProperty(element, 'id', {
      get: function () {
        var duration = Date.now() - start;
        if (duration > 100) {
          if (!devtoolsOpened) {
            devtoolsOpened = true;
            blockPage();
          }
        }
        return '';
      }
    });
    console.log(element);
  }

  // Проверка DevTools через таймер и debugger без остановки
  function detectDebuggerTiming() {
    var start = Date.now();
    // обход debugger без реальной паузы
    try {
      // eslint-disable-next-line no-unused-expressions
      Function('')();
    } catch (e) { }
    var duration = Date.now() - start;
    if (duration > 100) {
      if (!devtoolsOpened) {
        devtoolsOpened = true;
        blockPage();
      }
    }
  }

  // Проверка по размеру с фильтрацией ложных срабатываний
  var lastCheck = { widthDiff: 0, heightDiff: 0 };
  function detectSizeChange() {
    var widthDiff = window.outerWidth - window.innerWidth;
    var heightDiff = window.outerHeight - window.innerHeight;

    var threshold = 160;
    if (
      (widthDiff > threshold && Math.abs(widthDiff - lastCheck.widthDiff) > 20) ||
      (heightDiff > threshold && Math.abs(heightDiff - lastCheck.heightDiff) > 20)
    ) {
      if (!devtoolsOpened) {
        devtoolsOpened = true;
        blockPage();
      }
    }
    lastCheck = { widthDiff: widthDiff, heightDiff: heightDiff };
  }

  // Интервалы детекции
  setInterval(detectConsoleGetter, 1000);
  setInterval(detectDebuggerTiming, 1500);
  setInterval(detectSizeChange, 2000);

})();

//[защита]