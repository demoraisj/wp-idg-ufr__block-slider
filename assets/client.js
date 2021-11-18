"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getPosts(_x, _x2, _x3, _x4) {
  return _getPosts.apply(this, arguments);
}

function _getPosts() {
  _getPosts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(postType, postCategory, postTag, postsQuantity) {
    var postsUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            postsUrl = ufrGlobals.siteUrl + "/wp-json/wp/v2/posts?_embed=&_locale=user&per_page=".concat(postsQuantity);
            _context.t0 = postType;
            _context.next = _context.t0 === 'most-recent' ? 4 : _context.t0 === 'most-seen' ? 7 : _context.t0 === 'category' ? 10 : _context.t0 === 'tag' ? 13 : 16;
            break;

          case 4:
            _context.next = 6;
            return fetch(postsUrl);

          case 6:
            return _context.abrupt("return", _context.sent.json());

          case 7:
            _context.next = 9;
            return fetch(ufrGlobals.siteUrl + "/wp-json/ufr/most-seen-posts?quantity=".concat(postsQuantity));

          case 9:
            return _context.abrupt("return", _context.sent.json());

          case 10:
            _context.next = 12;
            return fetch(postsUrl + "&categories=".concat(postCategory));

          case 12:
            return _context.abrupt("return", _context.sent.json());

          case 13:
            _context.next = 15;
            return fetch(postsUrl + "&tags=".concat(postTag));

          case 15:
            return _context.abrupt("return", _context.sent.json());

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPosts.apply(this, arguments);
}

function holdRenderForPosts(_x5) {
  return _holdRenderForPosts.apply(this, arguments);
}

function _holdRenderForPosts() {
  _holdRenderForPosts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
    var usePosts, useLegends, postType, postCategory, sliderID, postsQuantity, duration, postTag, ufrLoadPosts, mainSlider, thumbnailSlider, mainList, thumbnailList, posts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            usePosts = params.usePosts, useLegends = params.useLegends, postType = params.postType, postCategory = params.postCategory, sliderID = params.sliderID, postsQuantity = params.postsQuantity, duration = params.duration, postTag = params.postTag;
            ufrLoadPosts = new Event('ufrLoadPosts');

            if (usePosts) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", window.dispatchEvent(ufrLoadPosts));

          case 4:
            mainSlider = document.getElementById(sliderID);
            thumbnailSlider = document.getElementById("".concat(sliderID, "-thumbnail"));
            mainList = mainSlider.querySelector('.splide__list');
            thumbnailList = thumbnailSlider.querySelector('.splide__list'); // Loader

            _context2.next = 10;
            return getPosts(postType, postCategory, postTag, postsQuantity);

          case 10:
            posts = _context2.sent;

            if (posts) {
              posts.forEach(function (_ref) {
                var _embedded$wpFeatured, _embedded$wpFeatured$, _embedded$wpFeatured2, _embedded$wpFeatured3;

                var link = _ref.link,
                    title = _ref.title,
                    _embedded = _ref._embedded,
                    thumbnail = _ref.thumbnail;
                var img = ufrGlobals.themeUrl + '/assets/img/logo/ufr-bg.png';
                var imgAlt = '';
                var embeddedImgAltTxt = _embedded ? (_embedded$wpFeatured = _embedded['wp:featuredmedia']) === null || _embedded$wpFeatured === void 0 ? void 0 : (_embedded$wpFeatured$ = _embedded$wpFeatured[0]) === null || _embedded$wpFeatured$ === void 0 ? void 0 : _embedded$wpFeatured$.alt_text : undefined;
                var embeddedImg = _embedded ? (_embedded$wpFeatured2 = _embedded['wp:featuredmedia']) === null || _embedded$wpFeatured2 === void 0 ? void 0 : (_embedded$wpFeatured3 = _embedded$wpFeatured2[0]) === null || _embedded$wpFeatured3 === void 0 ? void 0 : _embedded$wpFeatured3.source_url : undefined;
                if (embeddedImg) img = embeddedImg;
                if (embeddedImgAltTxt) imgAlt = embeddedImgAltTxt;
                if (thumbnail) img = thumbnail;
                if (!(postType === 'most-seen')) title = title.rendered;
                var legend = useLegends ? "<div class=\"description\">".concat(title, "</div>") : '';
                mainList.innerHTML += "\n\t\t\t\t<li class=\"splide__slide\"\n\t\t\t\t\tdata-splide-interval=\"".concat(duration * 1000, "\"\n\t\t\t\t\tstyle=\"cursor: pointer;\"\n\t\t\t\t\tonclick=\"location.href = '").concat(link, "'\"\n\t\t\t\t\tonauxclick=\"window.open('").concat(link, "', '_blank')\"\n\t\t\t\t>\n\t\t\t\t\t<img src=\"").concat(img, "\" alt=\"").concat(imgAlt, "\" />\n\n\t\t\t\t\t").concat(legend, "\n\t\t\t\t</li>\n\t\t\t");
                thumbnailList.innerHTML += "\n\t\t\t\t<li class=\"splide__slide\">\n\t\t\t\t\t<img src=\"".concat(img, "\" alt=\"").concat(imgAlt, "\" />\n\t\t\t\t</li>\n\t\t\t");
              });
            }

            window.dispatchEvent(ufrLoadPosts);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _holdRenderForPosts.apply(this, arguments);
}

function ufrSetUpSliders(params) {
  var autoplay = params.autoplay,
      height = params.height,
      sliderID = params.sliderID;
  window.addEventListener('ufrLoadPosts', function () {
    var main = document.getElementById(sliderID);
    var thumb = document.getElementById("".concat(sliderID, "-thumbnail"));
    var splideMain = new Splide(main, {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: true,
      cover: true,
      height: height,
      autoplay: autoplay
    });
    var splideThumbnails = new Splide(thumb, {
      fixedWidth: 100,
      fixedHeight: 60,
      gap: 10,
      rewind: true,
      pagination: false,
      cover: true,
      arrows: false,
      isNavigation: true,
      breakpoints: {
        600: {
          fixedWidth: 60,
          fixedHeight: 44
        }
      }
    });
    splideMain.sync(splideThumbnails);
    splideMain.mount();
    splideThumbnails.mount();
  });
  void holdRenderForPosts(params);
}
