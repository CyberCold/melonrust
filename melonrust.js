console.log('%c Version: ', 'color: white; background-color: #f2a358', '0.0.7');
console.log('%c Author: ', 'color: white; background-color: #696969', 'CyberCold');

const event = new CustomEvent("setCustomConfig");
window.productsGrid = 4;
window.currency = 'руб';
window.defaultPaymentAmount = 150;
window.zeroToFree = true;
window.sidebarStoreToRight = true;
window.sidebarProfileToRight = true;
window.dispatchEvent(event);

function loadSwiperLibrary() {
    if (document.getElementById('swiper-script')) return;
    const swiperScript = document.createElement("script");
    swiperScript.id = 'swiper-script';
    swiperScript.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js";
    swiperScript.onerror = () => {
        console.error('Failed to load Swiper CDN, trying fallback');
        swiperScript.src = "https://unpkg.com/swiper@11/swiper-element-bundle.min.js";
    };
    swiperScript.onload = () => console.log('Swiper loaded');
    document.body.appendChild(swiperScript);
}

function injectStyles() {
    if (document.getElementById('gs-swiper-styles')) return;
    const style = document.createElement('style');
    style.id = 'gs-swiper-styles';
    style.textContent = `
        /* Контейнер слайдера */
        .gs-swiper-slider-container {
          width: 100% !important;
          max-width: 1300px !important;
          margin: 8px auto !important; /* Минимальные отступы сверху и снизу */
          padding: 0 !important;
          border-radius: 40px !important;
          position: relative !important;
        }

        /* Сам swiper */
        .gs-swiper-container {
          width: 100% !important;
          max-width: 1300px !important;
          height: auto !important;
          margin: 0 auto !important;
          border-radius: 40px !important;
          overflow: hidden !important;
          position: relative !important;
          visibility: visible !important;
          opacity: 1 !important;
          aspect-ratio: 16 / 6;
          box-sizing: border-box !important;
        }

        /* Слайды */
        .gs-swiper-slide {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          border-radius: 40px !important;
          overflow: hidden !important;
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box !important;
        }

        /* Обертка изображения */
        .gs-swiper-slide-img-wrapper {
          width: 100% !important;
          height: 100% !important;
          border-radius: 40px !important;
          overflow: hidden !important;
          position: relative !important;
          box-sizing: border-box !important;
        }

        /* Изображения */
        .gs-swiper-slide img {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          object-position: center !important;
          border-radius: 40px !important;
          box-sizing: border-box !important;
        }

        /* Пагинация */
        .swiper-pagination {
          position: absolute !important;
          bottom: 12px !important;
          left: 0 !important;
          width: 100% !important;
          text-align: center !important;
          z-index: 20 !important;
          pointer-events: auto !important;
        }

        .swiper-pagination-bullet {
          width: 14px !important;
          height: 14px !important;
          background: #7c7c7c !important;
          opacity: 0.5 !important;
          margin: 0 5px !important;
          transition: opacity 0.3s;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: var(--swiper-theme-color, #2cd8a9) !important;
        }

        /* Стрелки — меньшие и ближе к баннеру */
        .swiper-button-next, .swiper-button-prev {
          width: 28px !important;
          height: 28px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          background: rgba(0,0,0,0.25) !important;
          border-radius: 50% !important;
          color: white !important;
          position: absolute !important;
          z-index: 30 !important;
          cursor: pointer !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          transition: background-color 0.3s;
        }
        .swiper-button-next {
          right: -20px !important; /* снаружи, ближе */
        }
        .swiper-button-prev {
          left: -20px !important; /* снаружи, ближе */
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0,0,0,0.5) !important;
        }

        /* Мобильные: убираем стрелки, увеличиваем точки */
        @media (max-width: 768px) {
          .gs-swiper-container {
            aspect-ratio: 4 / 3 !important;
          }
          .swiper-pagination-bullet {
            width: 18px !important;
            height: 18px !important;
          }
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }

        /* Убираем верхние отступы только у баннера */
        main, .Page-module__pageContent {
          padding-top: 0 !important;
          margin-top: 0 !important;
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }
    `;
    document.head.appendChild(style);
}

function GSslider() {
    window.dispatchEvent(new CustomEvent("initState"));
    window.dispatchEvent(new CustomEvent("initComponentsManager"));

    function initializeSlider() {
        if (document.querySelector('.gs-swiper-container')) return;

        const sliderHTML = `
            <swiper-container class="gs-swiper-container mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="30"
                centered-slides="true" autoplay-delay="5000" autoplay-disable-on-interaction="false">
                <swiper-slide class="gs-swiper-slide"><div class="gs-swiper-slide-img-wrapper"><img src="https://gspics.org/images/2024/02/23/0bZXu7.png" alt="slide1"></div></swiper-slide>
                <swiper-slide class="gs-swiper-slide"><div class="gs-swiper-slide-img-wrapper"><img src="https://gspics.org/images/2024/02/15/0bi9NR.png" alt="slide2"></div></swiper-slide>
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
            contentArea = document.createElement('div');
            contentArea.className = 'gs-swiper-fallback-container';
            document.body.appendChild(contentArea);
        }

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'gs-swiper-slider-container';
        sliderContainer.innerHTML = sliderHTML;

        const header = document.querySelector('.container.headerContainer') ||
                       document.querySelector('.Header-module__wrapper') ||
                       document.querySelector('header') ||
                       document.querySelector('[class*="header"]');

        if (header) {
            if (header.parentNode === contentArea) {
                contentArea.insertBefore(sliderContainer, header.nextSibling);
            } else {
                header.parentNode.insertBefore(sliderContainer, header.nextSibling);
            }
        } else {
            contentArea.insertBefore(sliderContainer, contentArea.firstChild);
        }

        if (window.customElements && customElements.whenDefined) {
            customElements.whenDefined('swiper-container').then(() => {
                const swiperEl = sliderContainer.querySelector('swiper-container');
                if (swiperEl && swiperEl.swiper) {
                    swiperEl.swiper.update();
                    swiperEl.swiper.autoplay.start();
                }
            });
        }
    }

    ['SHOP_PAGE', 'SUPPORT_PAGE', 'CUSTOM_PAGE'].forEach(page => {
        if(window.componentsManager && window.componentsManager.addListener) {
            window.componentsManager.addListener(page, 'DID_MOUNT', () => {
                initializeSlider();
            });
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        initializeSlider();
    });

    window.componentsManager && window.componentsManager.load && window.componentsManager.load();
}

if (window.isAppReady) {
    loadSwiperLibrary();
    injectStyles();
    GSslider();
} else {
    window.addEventListener('appReady', () => {
        loadSwiperLibrary();
        injectStyles();
        GSslider();
    });
}

// [Настройка виджета Discord]
const INVITE = '2D456zDGj3';

function updateDiscordStats() {
  fetch(`https://discord.com/api/v9/invites/${INVITE}?with_counts=true`)
    .then(r => r.json())
    .then(data => {
      const members = data.approximate_member_count ?? '0';
      const presence = data.approximate_presence_count ?? '0';

      document.getElementById('membersCount').textContent = members;
      document.getElementById('presenceCount').textContent = presence;
    })
    .catch(err => console.error('Discord API error:', err));
}

updateDiscordStats();
setInterval(updateDiscordStats, 10000);
// [/Настройка виджета Discord]


// [Настройка виджета мониторинга для нескольких серверов]

function GSMonit() {
  window.dispatchEvent(new CustomEvent("initState"));
  window.dispatchEvent(new CustomEvent("initComponentsManager"));

  function monit() {
    const fetchDataServers = function() {
      fetch('https://melonproject.gamestores.app/api/v1/widgets.monitoring')
        .then(function(response) {
          if (!response.ok) throw new Error('Нет ответа от сети!');
          return response.json();
        })
        .then(function(data) {
          if (data.result === "success" && data.data && data.data.servers) {
            var servers = data.data.servers;

            // Фейковые бусты по ID сервера
            var fakeBoosts = {
              39965: 14,
              39966: 0
            };

            // Обновляем каждый виджет
            document.querySelectorAll('[data-server-id]').forEach(function(widget) {
              var serverID = parseInt(widget.getAttribute('data-server-id'));
              var server = servers.find(function(s) { return s.id === serverID; });

              if (server) {
                var playersElement = widget.querySelector('.players');
                var playersMaxElement = widget.querySelector('.playersMax');
                var connectBtn = widget.querySelector('.copybtn');

                var boost = fakeBoosts[serverID] || 0;
                var shownPlayers = (server.players || 0) + boost;

                if (playersElement) playersElement.textContent = shownPlayers;
                if (playersMaxElement) playersMaxElement.textContent = server.playersMax || 0;

                if (connectBtn) {
                  var connectAddress = server.connect || '';
                  if (connectAddress.trim().indexOf('connect') !== 0) {
                    connectAddress = 'connect ' + connectAddress;
                  }
                  connectBtn.innerText = connectAddress.trim();
                }
              } else {
                console.warn('Сервер с ID ' + serverID + ' не найден!');
              }
            });

            // Навешиваем обработчики копирования на кнопки
            document.querySelectorAll('[data-server-id]').forEach(function(widget) {
              var copyBtns = widget.querySelectorAll('.copybtn');
              copyBtns.forEach(function(btn) {
                btn.onclick = function() {
                  var textToCopy = this.innerText.trim();
                  if (!textToCopy) return;

                  var button = this;

                  function showCopyMessage() {
                    // Если уже есть сообщение - удалить
                    var existingMsg = button.parentNode.querySelector('.copy-message');
                    if (existingMsg) {
                      existingMsg.remove();
                    }

                    var msg = document.createElement('span');
                    msg.className = 'copy-message';
                    msg.style.position = 'absolute';
                    msg.style.background = '#4C2A12';
                    msg.style.color = '#fff';
                    msg.style.padding = '4px 8px';
                    msg.style.borderRadius = '4px';
                    msg.style.fontSize = '12px';
                    msg.style.top = '-30px';
                    msg.style.left = '50%';
                    msg.style.transform = 'translateX(-50%)';
                    msg.style.whiteSpace = 'nowrap';
                    msg.style.zIndex = '9999';
                    msg.textContent = 'Успешно скопировано';

                    // Относительный родитель для позиционирования
                    if (button.parentNode.style.position === '' || button.parentNode.style.position === 'static') {
                      button.parentNode.style.position = 'relative';
                    }

                    button.parentNode.appendChild(msg);

                    setTimeout(function() {
                      if (msg.parentNode) {
                        msg.parentNode.removeChild(msg);
                      }
                    }, 700);
                  }

                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy).then(showCopyMessage).catch(function() {
                      fallbackCopyTextToClipboard(textToCopy, showCopyMessage);
                    });
                  } else {
                    fallbackCopyTextToClipboard(textToCopy, showCopyMessage);
                  }
                };
              });
            });

          } else {
            console.error('Некорректные данные!');
          }
        })
        .catch(function(error) {
          console.error('Ошибка: ', error);
        });
    };

    // Резервный вариант копирования
    function fallbackCopyTextToClipboard(text, callback) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        if (typeof callback === 'function') callback();
      } catch (err) {
        console.error('Fallback: Невозможно скопировать', err);
      }

      document.body.removeChild(textArea);
    }

    fetchDataServers();
  }

  ['SHOP_PAGE', 'SUPPORT_PAGE', 'CUSTOM_PAGE'].forEach(function(page) {
    window.componentsManager.addListener(page, 'DID_MOUNT', function() {
      monit();
      setInterval(monit, 10000);
    });
  });

  window.componentsManager.load();
}

if (window.isAppReady) {
  GSMonit();
} else {
  window.addEventListener('appReady', GSMonit);
}

// [/Настройка виджета мониторинга]



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
    displayName: "Спавн",
    description: "Выдаётся при спавне",
    items: [
      { image: "https://via.placeholder.com/50", count: "x5,000", name: "5.56 (обычные)" },
      { image: "https://via.placeholder.com/50", count: "x1", name: "Калаш" }
    ]
  },
  "СПАВН2": {
    displayName: "Спавн",
    description: "Ещё один спавн-набор",
    items: [
      { image: "https://via.placeholder.com/50", count: "x3,000", name: "Патроны" },
      { image: "https://via.placeholder.com/50", count: "x1", name: "SMG" }
    ]
  },"СПАВН3": {
    displayName: "Спавн",
    description: "Выдаётся при спавне",
    items: [
      { image: "https://via.placeholder.com/50", count: "x5,000", name: "5.56 (обычные)" },
      { image: "https://via.placeholder.com/50", count: "x1", name: "Калаш" }
    ]
  },
  "СПАВН4": {
    displayName: "Спавн",
    description: "Ещё один спавн-набор",
    items: [
      { image: "https://via.placeholder.com/50", count: "x3,000", name: "Патроны" },
      { image: "https://via.placeholder.com/50", count: "x1", name: "SMG" }
    ]
  },"СПАВН5": {
    displayName: "Спавн",
    description: "Выдаётся при спавне",
    items: [
      { image: "https://via.placeholder.com/50", count: "x5,000", name: "5.56 (обычные)" },
      { image: "https://via.placeholder.com/50", count: "x1", name: "Калаш" }
    ]
  },
  "СПАВН6": {
    displayName: "Спавн",
    description: "Ещё один спавн-набор",
    items: [
      { image: "https://via.placeholder.com/50", count: "x3,000", name: "Патроны" },
      { image: "https://via.placeholder.com/50", count: "x1", name: "SMG" }
    ]
  },
  "ПВП": {
    displayName: "PvP",
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
          <h4 style="color:#8000ff; text-shadow: 0 0 6px #8000ff; margin: 0 0 5px 0;">${kit.displayName}</h4>
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

console.log('%c Kits Observer запущен', 'color: white; background: #f2a358');


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

