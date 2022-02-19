function ibg() {

	let ibg = document.querySelectorAll("._ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();

var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iOS/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

//Слайдер
let sliders = document.querySelectorAll('._swiper');
if(sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//.slider.data('LightGallry').destroy(true);
		}
	}
	sliders_bild_callback();
}

let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observerParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollBar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize;
	}
}

function sliders_bild_callback(params) { }

if (document.querySelector('.slider-main__body')) {
	new Swiper('.slider-main__body', {
		observer: true,
		observerParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dots
		pagination: {
			el: '.controls-slider-main__dots',
			type: 'bullets',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-main .slider-arrow_next',
			prevEl: '.slider-main .slider-arrow_prev',
		}
	});
}

if (document.querySelector('.slider-rooms__body')) {
	new Swiper('.slider-rooms__body', {
		observer: true,
		observerParents: true,
		slidesPerView: 'auto',
		spaceBetween: 24,
		speed: 800,
		loop: true,
		watchOverflow: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dots
		pagination: {
			el: '.slider-rooms__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-rooms .slider-arrow_next',
			prevEl: '.slider-rooms .slider-arrow_prev',
		}
	});
}

if (document.querySelector('.slider-tips__body')) {
	new Swiper('.slider-tips__body', {
		observer: true,
		observerParents: true,
		slidesPerView: 3,
		spaceBetween: 32,
		speed: 800,
		loop: true,
		watchOverflow: true,
		// Dots
		pagination: {
			el: '.slider-tips__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-tips .slider-arrow_next',
			prevEl: '.slider-tips .slider-arrow_prev',
		},
		breakpoints: {
			// when window sidth is >= 320px
			320: {
				slidesPerView: 1.1,
				spaceBetween: 16
			},
			// when window width is >= 768px
			768: {
				slidesPerView: 2,
				spaceBetween: 24
			},
			// when window width is >= 992px
			992: {
				slidesPerView: 3,
				spaceBetween: 32
			}
		}
	});
};

// Удаление классов у коллекции элементов
function _removeClasses(elements, classes) {
	elements.forEach(element => {
		element.classList.remove(classes);
	});
}

// Спойлеры
const spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length > 0) {
	// Получение обычных спойлеров
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		return !item.dataset.spoilers.split(",")[0];
	});
	// Инициализация обычных спойлеров
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}

	// Получение спойлеров с медиа запросами
	const spoilersMedia = Array.from(spoilersArray).filter(function (item,index, self) {
		return item.dataset.spoilers.split(",")[0];
	});
	// Инициализация спойлеров с медиа запросами
	if (spoilersMedia.length > 0) {
		const breakpointsArray = [];
		spoilersMedia.forEach(item => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получам уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + '-width:' + item.value + "px)," + item.value + ',' +item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spoilersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpoilers(spoilersArray, matchMedia);
			});
			initSpoilers(spoilersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add('_init');
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				spoilersBlock.classList.remove('_init');
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		});
	}
	// Работа с контентом
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute('tabindex');
					if (!spoilerTitle.classList.contains('_active')) {
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spoilerTitle.setAttribute('tabindex', '-1');
					spoilerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpoilerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			if (!spoilersBlock.querySelectorAll('._slide').length) {
				if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
					hideSpoilersBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle('_active');
				_slideToggle(spoilerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpoilersBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove('_active');
			_slideUp(spoilerActiveTitle.nextElementSibling, 500);
		}
	}
}

//=================================================================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
};


// Бургер
const menuIcon = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
const body = document.querySelector('body');

menuIcon.addEventListener("click", function (event) {
	menuIcon.classList.toggle('_active');
	menuBody.classList.toggle('_active');
	body.classList.toggle('_lock');
});


// Проверка email
const emails = document.querySelectorAll('._email');

if (emails.length > 0) {
	emails.forEach(email => {
		email.parentElement.addEventListener("submit", function (event) {
			if (emailTest(email) && !email.parentElement.lastElementChild.classList.contains("form__error")) {
				email.parentElement.insertAdjacentHTML(
					"beforeend",
					`<div class="form__error">
						Wrong email
					</div>`
				);
				event.preventDefault();
			}
		});

		email.addEventListener("focus", function (event) {
			if (email.parentElement.lastElementChild.classList.contains("form__error")) {
				email.parentElement.lastElementChild.remove();
			}
		});
	})
}

// Функция теста email
function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

//Динамический адаптив
class DynamicAdapt {
	constructor(type) {
		this.type = type;
	}

	init() {
		// массив объектов
		this.оbjects = [];
		this.daClassname = '_dynamic_adapt_';
		// массив DOM-элементов
		this.nodes = [...document.querySelectorAll('[data-da]')];

		// наполнение оbjects объктами
		this.nodes.forEach((node) => {
			const data = node.dataset.da.trim();
			const dataArray = data.split(',');
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
			оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		});

		this.arraySort(this.оbjects);

		// массив уникальных медиа-запросов
		this.mediaQueries = this.оbjects
			.map(({
				breakpoint
			}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
			.filter((item, index, self) => self.indexOf(item) === index);

		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		this.mediaQueries.forEach((media) => {
			const mediaSplit = media.split(',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = this.оbjects.filter(
				({
					breakpoint
				}) => breakpoint === mediaBreakpoint
			);
			matchMedia.addEventListener('change', () => {
				this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		});
	}

	// Основная функция
	mediaHandler(matchMedia, оbjects) {
		if (matchMedia.matches) {
			оbjects.forEach((оbject) => {
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			});
		} else {
			оbjects.forEach(
				({ parent, element, index }) => {
					if (element.classList.contains(this.daClassname)) {
						this.moveBack(parent, element, index);
					}
				}
			);
		}
	}

	// Функция перемещения
	moveTo(place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			console.log(element);
			destination.append(element);
			return;
		}
		if (place === 'first') {
			destination.prepend(element);
			return;
		}
		destination.children[place].before(element);
	}

	// Функция возврата
	moveBack(parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].before(element);
		} else {
			parent.append(element);
		}
	}

	// Функция получения индекса внутри родителя
	indexInParent(parent, element) {
		return [...parent.children].indexOf(element);
	}

	// Функция сортировки массива по breakpoint и place 
	// по возрастанию для this.type = min
	// по убыванию для this.type = max
	arraySort(arr) {
		if (this.type === 'min') {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
					if (a.place === 'first' || b.place === 'last') {
						return -1;
					}
					if (a.place === 'last' || b.place === 'first') {
						return 1;
					}
					return a.place - b.place;
				}
				return a.breakpoint - b.breakpoint;
			});
		} else {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
					if (a.place === 'first' || b.place === 'last') {
						return 1;
					}
					if (a.place === 'last' || b.place === 'first') {
						return -1;
					}
					return b.place - a.place;
				}
				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	}
}
;


window.onload = function () {
	document.addEventListener("click", documentActions)

	// Actions (делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth > 768 && isMobile.any()) {
			if(targetElement.classList.contains('menu__arrow')){
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				_removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
			}
		}
		if ((targetElement.classList.contains('search-form__icon'))) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
		if (!e.target.closest('.menu__list') && !e.target.closest('.icon-menu')) {
			menuIcon.classList.remove('_active');
			menuBody.classList.remove('_active');
			body.classList.remove('_lock');
		}
		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();
		}
		if (targetElement.classList.contains('actions-product__button')) {
			const productId = targetElement.closest('.item-product').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}
		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-header__list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle('_active');
			}
			e.preventDefault();
		} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
			document.querySelector('.cart-header').classList.remove('_active');
		}
		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}


	}

	const da = new DynamicAdapt("max");
	da.init();

	// Header
	const headerElement = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll');
		}	else {
			headerElement.classList.add('_scroll');
		}
	};
	
	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);

	// Загрузить больше товаров
	async function getProducts(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadProducts(result);
				ibg();
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert("Ошибка");
			}
		}
	}

	function loadProducts(data) {
		const productsItems = document.querySelector('.products__items');
		data.products.forEach(item => {
			const productId = item.id;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productText = item.text;
			const productPrice = item.price;
			const productOldPrice = item.priceOld;
			const productShareUrl = item.shareUrl;
			const productLikeUrl = item.likeUrl;
			const productLabels = item.labels;

			let productTemplateStart = `<article data-pid="${productId}" class="product__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
			<a href="${productUrl}" class="item-product__image _ibg">
				<img src="img/products/${productImage}" alt="${productTitle}">
			</a>
			`;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
				<div class="item-product__content">
					<h5 class="item-product__title">${productTitle}</h5>
					<div class="item-product__text">${productText}</div>
				</div>
			`;

			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
				<div class="item-product__actions actions-product">
					<div class="actions-product__body">
						<a href="" class="actions-product__button btn btn_white">Add to cart</a>
						<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
						<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
					</div>
				</div>
			`;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;

			productsItems.insertAdjacentHTML('beforeend', productTemplate);

		});
	}


	// Добавление в корзину
	function addToCart(productButton, productId) {
		if (!productButton.classList.contains('_hold')) {
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');

			const cart = document.querySelector('.cart-header__icon');
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const productImage = product.querySelector('.item-product__image');

			const productImageFly = productImage.cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;

			productImageFly.setAttribute('class', '_flyImage');
			productImageFly.style.cssText = 
			`
				left: ${productImageFlyLeft}px;
				top: ${productImageFlyTop}px;
				width: ${productImageFlyWidth}px;
				height: ${productImageFlyHeight}px;
			`;

			document.body.append(productImageFly);

			const cartFlyLeft = cart.getBoundingClientRect().left;
			const cartFlyTop = cart.getBoundingClientRect().top;

			productImageFly.style.cssText =
			`
				left: ${cartFlyLeft}px;
				top: ${cartFlyTop}px;
				width: 0px;
				height: 0px;
				opacity: 0;
			`;

			productImageFly.addEventListener('transitionend', function(){
				if (productButton.classList.contains('_fly')) {
					productImageFly.remove();
					updateCart(productButton, productId);
					productButton.classList.remove('_fly');
				}
			});

		}
	}

	function updateCart(productButton, productId, productAdd = true) {
		const cart =document.querySelector('.cart-header');
		const cartIcon = cart.querySelector('.cart-header__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		const cartList = document.querySelector('.cart-list');

		//Добавляем
		if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', '<span>1</span>');
			}
			if (!cartProduct) {
				const product = document.querySelector(`[data-pid="${productId}"]`);
				const cartProductImage = product.querySelector('.item-product__image').innerHTML;
				const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
				const cartProductContent = `
					<a href="" class="cart-list__image _ibg">${cartProductImage}</a>
					<div class="cart-list__body">
						<a href="" class="cart-list__title">${cartProductTitle}</a>
						<div class="cart-list__quantity">Quantity: <span>1</span></div>
						<a href="" class="cart-list__delete">Delete</a>
					</div>
				`;
				cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`)
			} else {
				const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}
			ibg();

			// После всех действий
			productButton.classList.remove('_hold');
		} else {
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}

			const cartQuantityValue = --cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('_active');
			}
		}
	}

	// Furniture Галерея
	const furniture = document.querySelector('.furniture__body');
	if (furniture && !isMobile.any()) {
		const furnitureItems = document.querySelector('.furniture__items');
		const furnitureColumn = document.querySelectorAll('.furniture__column');

		// Скорость анимации
		const speed = furniture.dataset.speed;

		// Объявление переменных
		let positionX = 0;
		let coordXprocent = 0;

		function setMouseGalleryStyle() {
			let furnitureItemsWidth = 0;
			furnitureColumn.forEach(element => {
				furnitureItemsWidth += element.offsetWidth;
			});

			const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
			const distX = Math.floor(coordXprocent - positionX);

			positionX = positionX + (distX * speed);
			let position = furnitureDifferent / 200 * positionX;

			furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

			if (Math.abs(distX) > 0) {
				requestAnimationFrame(setMouseGalleryStyle);
			} else {
				furniture.classList.remove('_init');
			}
		}
		furniture.addEventListener("mousemove", function (e) {
			// Получение ширины
			const furnitureWidth = furniture.offsetWidth;

			// Ноль по середине
			const coordX = e.pageX - furnitureWidth / 2;

			// Получаем проценты
			coordXprocent = coordX / furnitureWidth * 200;

			if (!furniture.classList.contains('_init')) {
				requestAnimationFrame(setMouseGalleryStyle);
				furniture.classList.add('_init');
			}
		})
	}


}
