function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  var $ = jQuery = $;
  var cc = {
    sections: []
  };
  theme.Shopify = {
    formatMoney: function formatMoney(t, r) {
      function e(t, r) {
        return void 0 === t ? r : t;
      }

      function a(t, r, a, o) {
        if (r = e(r, 2), a = e(a, ","), o = e(o, "."), isNaN(t) || null == t) return 0;
        t = (t / 100).toFixed(r);
        var n = t.split(".");
        return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (n[1] ? o + n[1] : "");
      }

      "string" == typeof t && (t = t.replace(".", ""));
      var o = "",
          n = /\{\{\s*(\w+)\s*\}\}/,
          i = r || this.money_format;

      switch (i.match(n)[1]) {
        case "amount":
          o = a(t, 2);
          break;

        case "amount_no_decimals":
          o = a(t, 0);
          break;

        case "amount_with_comma_separator":
          o = a(t, 2, ".", ",");
          break;

        case "amount_with_space_separator":
          o = a(t, 2, " ", ",");
          break;

        case "amount_with_period_and_space_separator":
          o = a(t, 2, " ", ".");
          break;

        case "amount_no_decimals_with_comma_separator":
          o = a(t, 0, ".", ",");
          break;

        case "amount_no_decimals_with_space_separator":
          o = a(t, 0, " ", "");
          break;

        case "amount_with_apostrophe_separator":
          o = a(t, 2, "'", ".");
      }

      return i.replace(n, o);
    },
    formatImage: function formatImage(originalImageUrl, format) {
      return originalImageUrl.replace(/^(.*)\.([^\.]*)$/g, '$1_' + format + '.$2');
    },
    Image: {
      imageSize: function imageSize(t) {
        var e = t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
        return null !== e ? e[1] : null;
      },
      getSizedImageUrl: function getSizedImageUrl(t, e) {
        if (null == e) return t;
        if ("master" == e) return this.removeProtocol(t);
        var o = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

        if (null != o) {
          var i = t.split(o[0]),
              r = o[0];
          return this.removeProtocol(i[0] + "_" + e + r);
        }

        return null;
      },
      removeProtocol: function removeProtocol(t) {
        return t.replace(/http(s)?:/, "");
      }
    }
  };
  theme.Sections = new function () {
    var _ = this;

    _._instances = [];
    _._sections = [];

    _.init = function () {
      $(document).on('shopify:section:load', function (e) {
        // load a new section
        var target = _._themeSectionTargetFromShopifySectionTarget(e.target);

        if (target) {
          _.sectionLoad(target);
        }
      }).on('shopify:section:unload', function (e) {
        // unload existing section
        var target = _._themeSectionTargetFromShopifySectionTarget(e.target);

        if (target) {
          _.sectionUnload(target);
        }
      });
    }; // register a type of section


    _.register = function (type, section, afterSectionLoadCallback, afterSectionUnloadCallback) {
      _._sections.push({
        type: type,
        section: section,
        afterSectionLoadCallback: afterSectionLoadCallback,
        afterSectionUnloadCallback: afterSectionUnloadCallback
      });

      $('[data-section-type="' + type + '"]').each(function () {
        _.sectionLoad(this);
      });
    }; // load in a section


    _.sectionLoad = function (target) {
      var target = target;

      var sectionObj = _._sectionForTarget(target);

      if (sectionObj.section) {
        var section = sectionObj.section;
      } else {
        var section = sectionObj;
      }

      if (section !== false) {
        _._instances.push({
          target: target,
          section: section
        });

        section.onSectionLoad(target);
        $(target).closest('.shopify-section').on('shopify:section:select', function (e) {
          _._callWith(section, 'onSectionSelect', e.target);
        }).on('shopify:section:deselect', function (e) {
          _._callWith(section, 'onSectionDeselect', e.target);
        });
        $(target).on('shopify:block:select', function (e) {
          _._callWith(section, 'onBlockSelect', e.target);
        }).on('shopify:block:deselect', function (e) {
          _._callWith(section, 'onBlockDeselect', e.target);
        });

        if (sectionObj.afterSectionLoadCallback) {
          sectionObj.afterSectionLoadCallback(target);
        }
      }
    }; // unload a section


    _.sectionUnload = function (target) {
      var sectionObj = _._sectionForTarget(target);

      var instanceIndex = -1;

      for (var i = 0; i < _._instances.length; i++) {
        if (_._instances[i].target == target) {
          instanceIndex = i;
        }
      }

      if (instanceIndex > -1) {
        $(target).off('shopify:block:select shopify:block:deselect');

        _._callWith(_._instances[instanceIndex].section, 'onSectionUnload', target);

        _._instances.splice(instanceIndex);

        if (sectionObj.afterSectionUnloadCallback) {
          sectionObj.afterSectionUnloadCallback(target);
        }
      }
    }; // helpers


    _._callWith = function (object, method, param) {
      if (typeof object[method] === 'function') {
        object[method](param);
      }
    };

    _._themeSectionTargetFromShopifySectionTarget = function (target) {
      var $target = $('[data-section-type]:first', target);

      if ($target.length > 0) {
        return $target[0];
      } else {
        return false;
      }
    };

    _._sectionForTarget = function (target) {
      var type = $(target).attr('data-section-type');

      for (var i = 0; i < _._sections.length; i++) {
        if (_._sections[i].type == type) {
          return _._sections[i];
        }
      }

      return false;
    };

    _._sectionAlreadyRegistered = function (type) {
      for (var i = 0; i < _._sections.length; i++) {
        if (_._sections[i].type == type) {
          return true;
        }
      }

      return false;
    };
  }();

  theme.Disclosure = function () {
    var selectors = {
      disclosureList: '[data-disclosure-list]',
      disclosureToggle: '[data-disclosure-toggle]',
      disclosureInput: '[data-disclosure-input]',
      disclosureOptions: '[data-disclosure-option]'
    };
    var classes = {
      listVisible: 'disclosure-list--visible'
    };

    function Disclosure($disclosure) {
      this.$container = $disclosure;
      this.cache = {};

      this._cacheSelectors();

      this._connectOptions();

      this._connectToggle();

      this._onFocusOut();
    }

    Disclosure.prototype = $.extend({}, Disclosure.prototype, {
      _cacheSelectors: function _cacheSelectors() {
        this.cache = {
          $disclosureList: this.$container.find(selectors.disclosureList),
          $disclosureToggle: this.$container.find(selectors.disclosureToggle),
          $disclosureInput: this.$container.find(selectors.disclosureInput),
          $disclosureOptions: this.$container.find(selectors.disclosureOptions)
        };
      },
      _connectToggle: function _connectToggle() {
        this.cache.$disclosureToggle.on('click', function (evt) {
          var ariaExpanded = $(evt.currentTarget).attr('aria-expanded') === 'true';
          $(evt.currentTarget).attr('aria-expanded', !ariaExpanded);
          this.cache.$disclosureList.toggleClass(classes.listVisible);
        }.bind(this));
      },
      _connectOptions: function _connectOptions() {
        this.cache.$disclosureOptions.on('click', function (evt) {
          evt.preventDefault();

          this._submitForm($(evt.currentTarget).data('value'));
        }.bind(this));
      },
      _onFocusOut: function _onFocusOut() {
        this.cache.$disclosureToggle.on('focusout', function (evt) {
          var disclosureLostFocus = this.$container.has(evt.relatedTarget).length === 0;

          if (disclosureLostFocus) {
            this._hideList();
          }
        }.bind(this));
        this.cache.$disclosureList.on('focusout', function (evt) {
          var childInFocus = $(evt.currentTarget).has(evt.relatedTarget).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(classes.listVisible);

          if (isVisible && !childInFocus) {
            this._hideList();
          }
        }.bind(this));
        this.$container.on('keyup', function (evt) {
          if (evt.which !== 27) return; // escape

          this._hideList();

          this.cache.$disclosureToggle.focus();
        }.bind(this));

        this.bodyOnClick = function (evt) {
          var isOption = this.$container.has(evt.target).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(classes.listVisible);

          if (isVisible && !isOption) {
            this._hideList();
          }
        }.bind(this);

        $('body').on('click', this.bodyOnClick);
      },
      _submitForm: function _submitForm(value) {
        this.cache.$disclosureInput.val(value);
        this.$container.parents('form').submit();
      },
      _hideList: function _hideList() {
        this.cache.$disclosureList.removeClass(classes.listVisible);
        this.cache.$disclosureToggle.attr('aria-expanded', false);
      },
      unload: function unload() {
        $('body').off('click', this.bodyOnClick);
        this.cache.$disclosureOptions.off();
        this.cache.$disclosureToggle.off();
        this.cache.$disclosureList.off();
        this.$container.off();
      }
    });
    return Disclosure;
  }(); /// Show a short-lived text popup above an element


  theme.showQuickPopup = function (message, $origin) {
    var $popup = $('<div class="simple-popup"/>');
    var offs = $origin.offset();
    $popup.html(message).css({
      'left': offs.left,
      'top': offs.top
    }).hide();
    $('body').append($popup);
    $popup.css({
      marginTop: -$popup.outerHeight() - 10,
      marginLeft: -($popup.outerWidth() - $origin.outerWidth()) / 2
    });
    $popup.fadeIn(200).delay(3500).fadeOut(400, function () {
      $(this).remove();
    });
  }; // Loading third party scripts


  theme.scriptsLoaded = {};

  theme.loadScriptOnce = function (src, callback, beforeRun, sync) {
    if (typeof theme.scriptsLoaded[src] === 'undefined') {
      theme.scriptsLoaded[src] = [];
      var tag = document.createElement('script');
      tag.src = src;

      if (sync || beforeRun) {
        tag.async = false;
      }

      if (beforeRun) {
        beforeRun();
      }

      if (typeof callback === 'function') {
        theme.scriptsLoaded[src].push(callback);

        if (tag.readyState) {
          // IE, incl. IE9
          tag.onreadystatechange = function () {
            if (tag.readyState == "loaded" || tag.readyState == "complete") {
              tag.onreadystatechange = null;

              for (var i = 0; i < theme.scriptsLoaded[this].length; i++) {
                theme.scriptsLoaded[this][i]();
              }

              theme.scriptsLoaded[this] = true;
            }
          }.bind(src);
        } else {
          tag.onload = function () {
            // Other browsers
            for (var i = 0; i < theme.scriptsLoaded[this].length; i++) {
              theme.scriptsLoaded[this][i]();
            }

            theme.scriptsLoaded[this] = true;
          }.bind(src);
        }
      }

      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      return true;
    } else if (_typeof(theme.scriptsLoaded[src]) === 'object' && typeof callback === 'function') {
      theme.scriptsLoaded[src].push(callback);
    } else {
      if (typeof callback === 'function') {
        callback();
      }

      return false;
    }
  };

  theme.loadStyleOnce = function (src) {
    var srcWithoutProtocol = src.replace(/^https?:/, '');

    if (!document.querySelector('link[href="' + encodeURI(srcWithoutProtocol) + '"]')) {
      var tag = document.createElement('link');
      tag.href = srcWithoutProtocol;
      tag.rel = 'stylesheet';
      tag.type = 'text/css';
      var firstTag = document.getElementsByTagName('link')[0];
      firstTag.parentNode.insertBefore(tag, firstTag);
    }
  }; // Turn a <select> tag into clicky boxes
  // Use with: $('select').clickyBoxes()


  $.fn.clickyBoxes = function (prefix) {
    if (prefix == 'destroy') {
      $(this).off('.clickyboxes');
      $(this).next('.clickyboxes').off('.clickyboxes');
    } else {
      return $(this).filter('select:not(.clickybox-replaced)').addClass('clickybox-replaced').each(function () {
        //Make sure rows are unique
        var prefix = prefix || $(this).attr('id'); //Create container

        var $optCont = $('<ul class="clickyboxes"/>').attr('id', 'clickyboxes-' + prefix).data('select', $(this)).insertAfter(this);
        var $label;

        if ($(this).is('[id]')) {
          $label = $('label[for="' + $(this).attr('id') + '"]'); // Grab real label
        } else {
          $label = $(this).siblings('label'); // Rough guess
        }

        if ($label.length > 0) {
          $optCont.addClass('options-' + removeDiacritics($label.text()).toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/-*$/, ''));
        } //Add options to container


        $(this).find('option').each(function () {
          $('<li/>').appendTo($optCont).append($('<a href="#"/>').attr('data-value', $(this).val()).html($(this).html()).addClass('opt--' + removeDiacritics($(this).text()).toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/-*$/, '')));
        }); //Select change event

        $(this).hide().addClass('replaced').on('change.clickyboxes keyup.clickyboxes', function () {
          //Choose the right option to show
          var val = $(this).val();
          $optCont.find('a').removeClass('active').filter(function () {
            return $(this).attr('data-value') == val;
          }).addClass('active');
        }).trigger('keyup'); //Initial value
        //Button click event

        $optCont.on('click.clickyboxes', 'a', function () {
          if (!$(this).hasClass('active')) {
            var $clicky = $(this).closest('.clickyboxes');
            $clicky.data('select').val($(this).data('value')).trigger('change');
            $clicky.trigger('change');
          }

          return false;
        });
      });
    }
  }; /// v1.0
  /// Restyling select dropdowns


  $.fn.selectReplace = function (prefix) {
    var chevronDown = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg>';

    if (prefix == 'destroy') {
      $(this).off('.selectreplace');
    } else {
      return $(this).filter('select:not(.replaced, .noreplace)').addClass('replaced').each(function () {
        //Add formatting containers
        var $opts = $(this).find('option');
        var initialText = $opts.filter(':selected').length > 0 ? $opts.filter(':selected').text() : $opts.first().text();
        var $cont = $(this).wrap('<div class="pretty-select">').parent().addClass('id-' + $(this).attr('id')).append('<span class="text"><span class="value">' + initialText + '</span></span>' + chevronDown);
        $cont.toggleClass('plaintext', $(this).hasClass('plaintext'));
      }).on('change.selectreplace keyup.selectreplace', function () {
        $(this).siblings('.text').find('.value').html($(this).find(':selected').html());
      });
    }
  }; // Manage videos


  theme.VideoManager = new function () {
    var _ = this; // Youtube


    _.youtubeVars = {
      incrementor: 0,
      apiReady: false,
      videoData: {},
      toProcessSelector: '.video-container[data-video-type="youtube"]:not(.video--init)'
    };

    _.youtubeApiReady = function () {
      _.youtubeVars.apiReady = true;

      _._loadYoutubeVideos();
    };

    _._loadYoutubeVideos = function (container) {
      if ($(_.youtubeVars.toProcessSelector, container).length) {
        if (_.youtubeVars.apiReady) {
          // play those videos
          $(_.youtubeVars.toProcessSelector, container).addClass('video--init').each(function () {
            _.youtubeVars.incrementor++;
            var containerId = 'theme-yt-video-' + _.youtubeVars.incrementor;
            $(this).data('video-container-id', containerId);
            var videoElement = $('<div class="video-container__video-element">').attr('id', containerId).appendTo(this);
            var autoplay = $(this).data('video-autoplay');
            var player = new YT.Player(containerId, {
              height: '390',
              width: '640',
              videoId: $(this).data('video-id'),
              playerVars: {
                iv_load_policy: 3,
                modestbranding: 1,
                autoplay: autoplay ? 1 : 0,
                loop: $(this).data('video-loop') ? 1 : 0,
                playlist: $(this).data('video-id'),
                rel: 0,
                showinfo: 0
              },
              events: {
                onReady: _._onYoutubePlayerReady.bind({
                  autoplay: autoplay
                }),
                onStateChange: _._onYoutubePlayerStateChange
              }
            });
            _.youtubeVars.videoData[containerId] = {
              id: containerId,
              container: this,
              videoElement: videoElement,
              player: player
            };
          });
        } else {
          // load api
          theme.loadScriptOnce('https://www.youtube.com/iframe_api');
        }
      }
    };

    _._onYoutubePlayerReady = function (event) {
      event.target.setPlaybackQuality('hd1080');

      if (this.autoplay) {
        event.target.mute();
      }
    };

    _._onYoutubePlayerStateChange = function (event) {};

    _._getYoutubeVideoData = function (event) {
      return _.youtubeVars.videoData[event.target.h.id];
    };

    _._unloadYoutubeVideos = function (container) {
      for (var dataKey in _.youtubeVars.videoData) {
        var data = _.youtubeVars.videoData[dataKey];

        if ($(container).find(data.container).length) {
          data.player.destroy();
          delete _.youtubeVars.videoData[dataKey];
          return;
        }
      }
    }; // Vimeo


    _.vimeoVars = {
      incrementor: 0,
      apiReady: false,
      videoData: {},
      toProcessSelector: '.video-container[data-video-type="vimeo"]:not(.video--init)'
    };

    _.vimeoApiReady = function () {
      _.vimeoVars.apiReady = true;

      _._loadVimeoVideos();
    };

    _._loadVimeoVideos = function (container) {
      if ($(_.vimeoVars.toProcessSelector, container).length) {
        if (_.vimeoVars.apiReady) {
          // play those videos
          $(_.vimeoVars.toProcessSelector, container).addClass('video--init').each(function () {
            _.vimeoVars.incrementor++;
            var $this = $(this);
            var containerId = 'theme-vi-video-' + _.vimeoVars.incrementor;
            $(this).data('video-container-id', containerId);
            var videoElement = $('<div class="video-container__video-element">').attr('id', containerId).appendTo(this);
            var autoplay = !!$(this).data('video-autoplay');
            var player = new Vimeo.Player(containerId, {
              url: $(this).data('video-url'),
              width: 640,
              loop: $(this).data('video-autoplay'),
              autoplay: autoplay
            });
            player.ready().then(function () {
              if (autoplay) {
                player.setVolume(0);
              }

              if (player.element && player.element.width && player.element.height) {
                var ratio = parseInt(player.element.height) / parseInt(player.element.width);
                $this.css('padding-bottom', ratio * 100 + '%');
              }
            });
            _.vimeoVars.videoData[containerId] = {
              id: containerId,
              container: this,
              videoElement: videoElement,
              player: player,
              autoPlay: autoplay
            };
          });
        } else {
          // load api
          if (window.define) {
            // workaround for third parties using RequireJS
            theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function () {
              _.vimeoVars.apiReady = true;

              _._loadVimeoVideos();

              window.define = window.tempDefine;
            }, function () {
              window.tempDefine = window.define;
              window.define = null;
            });
          } else {
            theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function () {
              _.vimeoVars.apiReady = true;

              _._loadVimeoVideos();
            });
          }
        }
      }
    };

    _._unloadVimeoVideos = function (container) {
      for (var dataKey in _.vimeoVars.videoData) {
        var data = _.vimeoVars.videoData[dataKey];

        if ($(container).find(data.container).length) {
          data.player.unload();
          delete _.vimeoVars.videoData[dataKey];
          return;
        }
      }
    }; // Compatibility with Sections


    this.onSectionLoad = function (container) {
      _._loadYoutubeVideos(container);

      _._loadVimeoVideos(container); // play button


      $('.video-container__play', container).on('click', function (evt) {
        evt.preventDefault();
        var $container = $(this).closest('.video-container'); // reveal

        $container.find('.video-container__cover').addClass('video-container__cover--playing'); // play

        var id = $container.data('video-container-id');

        if (id.indexOf('theme-yt-video') === 0) {
          _.youtubeVars.videoData[id].player.playVideo();
        } else {
          _.vimeoVars.videoData[id].player.play();
        }
      });
    };

    this.onSectionUnload = function (container) {
      $('.video-container__play', container).off('click');

      _._unloadYoutubeVideos(container);

      _._unloadVimeoVideos(container);
    };
  }(); // Youtube API callback

  window.onYouTubeIframeAPIReady = function () {
    theme.VideoManager.youtubeApiReady();
  }; // Register the section


  cc.sections.push({
    name: 'video',
    section: theme.VideoManager
  });
  theme.MapSection = new function () {
    var _ = this;

    _.config = {
      zoom: 14,
      styles: {
        "default": [],
        silver: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        }, {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#bdbdbd"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dadada"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#c9c9c9"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }],
        retro: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#ebe3cd"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#523735"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#f5f1e6"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#c9b2a6"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#dcd2be"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#ae9e90"
          }]
        }, {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#93817c"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#a5b076"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#447530"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f1e6"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#fdfcf8"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f8c967"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#e9bc62"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e98d58"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#db8555"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#806b63"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8f7d77"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#ebe3cd"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#b9d3c2"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#92998d"
          }]
        }],
        dark: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#212121"
          }]
        }, {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#212121"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#bdbdbd"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#181818"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1b1b1b"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#2c2c2c"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8a8a8a"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#373737"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3c3c3c"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [{
            "color": "#4e4e4e"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#000000"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3d3d3d"
          }]
        }],
        night: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#242f3e"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#746855"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#242f3e"
          }]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#263c3f"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#6b9a76"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#38414e"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#212a37"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9ca5b3"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#746855"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#1f2835"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#f3d19c"
          }]
        }, {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{
            "color": "#2f3948"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#17263c"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#515c6d"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#17263c"
          }]
        }],
        aubergine: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8ec3b9"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1a3646"
          }]
        }, {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#64779e"
          }]
        }, {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        }, {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#334e87"
          }]
        }, {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#283d6a"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#6f9ba5"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3C7680"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#304a7d"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#2c6675"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#255763"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#b0d5ce"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#283d6a"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3a4762"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#0e1626"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#4e6d70"
          }]
        }]
      }
    };
    _.apiStatus = null;
    _.mapsToLoad = [];

    this.geolocate = function ($map) {
      var deferred = $.Deferred();
      var geocoder = new google.maps.Geocoder();
      var address = $map.data('address-setting');
      geocoder.geocode({
        address: address
      }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          deferred.reject(status);
        }

        deferred.resolve(results);
      });
      return deferred;
    };

    this.createMap = function (container) {
      var $map = $('.map-section__map-container', container);
      return _.geolocate($map).then(function (results) {
        var mapOptions = {
          zoom: _.config.zoom,
          styles: _.config.styles[$(container).data('map-style')],
          center: results[0].geometry.location,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          disableDefaultUI: true,
          zoomControl: true
        };
        _.map = new google.maps.Map($map[0], mapOptions);
        _.center = _.map.getCenter();
        var marker = new google.maps.Marker({
          map: _.map,
          position: _.center,
          clickable: false
        });
        google.maps.event.addDomListener(window, 'resize', function () {
          google.maps.event.trigger(_.map, 'resize');

          _.map.setCenter(_.center);
        });
      }.bind(this)).fail(function () {
        var errorMessage;

        switch (status) {
          case 'ZERO_RESULTS':
            errorMessage = theme.strings.addressNoResults;
            break;

          case 'OVER_QUERY_LIMIT':
            errorMessage = theme.strings.addressQueryLimit;
            break;

          default:
            errorMessage = theme.strings.addressError;
            break;
        } // Only show error in the theme editor


        if (Shopify.designMode) {
          var $mapContainer = $map.parents('.map-section');
          $mapContainer.addClass('page-width map-section--load-error');
          $mapContainer.find('.map-section__wrapper').html('<div class="errors text-center">' + errorMessage + '</div>');
        }
      });
    };

    this.onSectionLoad = function (target) {
      var $container = $(target); // Global function called by Google on auth errors

      window.gm_authFailure = function () {
        if (!Shopify.designMode) return;
        $container.addClass('page-width map-section--load-error');
        $container.find('.map-section__wrapper').html('<div class="errors text-center">' + theme.strings.authError + '</div>');
      }; // create maps


      var key = $container.data('api-key');

      if (typeof key !== 'string' || key === '') {
        return;
      } // add to list of maps to assess


      _.mapsToLoad.push($container); // set up watcher for lazy-loading maps


      $(window).off('.themeMapSection').on('scroll.themeMapSection load.themeMapSection checkMapSections.themeMapSection', function () {
        // if any are on-screen
        $.each(_.mapsToLoad, function (index, $mapContainer) {
          if ($mapContainer !== false && $mapContainer.offset().top < $(window).scrollTop() + $(window).height() && $mapContainer.offset().top + $mapContainer.outerHeight() > $(window).scrollTop()) {
            _.mapsToLoad[index] = false; // load map

            theme.loadScriptOnce('https://maps.googleapis.com/maps/api/js?key=' + key, function () {
              _.createMap($mapContainer);
            });
          }
        });
      });
      $(window).trigger('checkMapSections');
    };

    this.onSectionUnload = function (target) {
      $(window).off('.themeMapSection');

      if (typeof window.google !== 'undefined' && typeof google.maps !== 'undefined') {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    };
  }(); // Register the section

  cc.sections.push({
    name: 'map',
    section: theme.MapSection
  }); // A section that contains other sections, e.g. story page

  theme.NestedSectionsSection = new function () {
    this.onSectionLoad = function (container) {
      // load child sections
      $('[data-nested-section-type]', container).each(function () {
        var type = $(this).attr('data-nested-section-type');
        var section = null;

        for (var i = 0; i < theme.Sections._sections.length; i++) {
          if (theme.Sections._sections[i].type == type) {
            section = theme.Sections._sections[i].section;
          }
        }

        if (section) {
          theme.Sections._instances.push({
            target: this,
            section: section
          });

          section.onSectionLoad(this);
        }
      });
    };

    this.onSectionUnload = function (container) {
      // unload child sections
      $('[data-nested-section-type]', container).each(function () {
        theme.Sections.sectionUnload(this);
      });
    };

    this.onBlockSelect = function (target) {
      // scroll to block
      $(window).scrollTop($(target).offset().top - 100);
    };
  }(); // Register the section

  cc.sections.push({
    name: 'nested-sections',
    section: theme.NestedSectionsSection
  });
  theme.icons = {
    left: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
    right: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
    close: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
    chevronLeft: '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 14.51,6.51 14,6 8,12 14,18 14.51,17.49 9.03,12 Z"></path></svg>',
    chevronRight: '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 10,6 9.49,6.51 14.97,12 9.49,17.49 10,18 16,12 Z"></path></svg>',
    tick: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>'
  }; // Manage option dropdowns

  theme.productData = {};
  theme.OptionManager = new function () {
    var _ = this;

    _._getVariantOptionElement = function (variant, $container) {
      return $container.find('select[name="id"] option[value="' + variant.id + '"]');
    };

    _.selectors = {
      container: '.product-container',
      gallery: '.product-gallery',
      priceArea: '.product-price',
      submitButton: '.product-form input[type=submit], .product-form button[type=submit]',
      multiOption: '.option-selectors'
    };
    _.strings = {
      priceNonExistent: theme.strings.priceNonExistent,
      buttonDefault: theme.strings.buttonDefault,
      buttonNoStock: theme.strings.buttonNoStock,
      buttonNoVariant: theme.strings.buttonNoVariant,
      unitPriceSeparator: theme.strings.unitPriceSeparator,
      inventoryNotice: theme.strings.onlyXLeft
    };

    _._getString = function (key, variant) {
      var string = _.strings[key];

      if (variant) {
        string = string.replace('[PRICE]', '<span class="theme-money">' + theme.Shopify.formatMoney(variant.price, theme.money_format) + '</span>');
      }

      return string;
    };

    _.getProductData = function ($form) {
      var productId = $form.data('product-id');
      var data = null;

      if (!theme.productData[productId]) {
        theme.productData[productId] = JSON.parse(document.getElementById('ProductJson-' + productId).innerHTML);
      }

      data = theme.productData[productId];

      if (!data) {
        console.log('Product data missing (id: ' + $form.data('product-id') + ')');
      }

      return data;
    };

    _.getBaseUnit = function (variant) {
      return variant.unit_price_measurement.reference_value === 1 ? variant.unit_price_measurement.reference_unit : variant.unit_price_measurement.reference_value + variant.unit_price_measurement.reference_unit;
    }, _.addVariantUrlToHistory = function (variant) {
      if (variant) {
        var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
        window.history.replaceState({
          path: newurl
        }, '', newurl);
      }
    };

    _.updateWeight = function (variant, $container) {
      var weightData = _._getVariantOptionElement(variant, $container).data('weight');

      if (weightData) {
        $container.find('.product-weight').removeClass('product-weight--no-weight').find('.product-weight__value').html(weightData);
      } else {
        $container.find('.product-weight').addClass('product-weight--no-weight').find('.product-weight__value').empty();
      }
    };

    _.updateSku = function (variant, $container) {
      $container.find('.sku .sku__value').html(variant ? variant.sku : '');
      $container.find('.sku').toggleClass('sku--no-sku', !variant || !variant.sku);
    };

    _.updateBarcode = function (variant, $container) {
      $container.find('.barcode .barcode__value').html(variant ? variant.barcode : '');
      $container.find('.barcode').toggleClass('barcode--no-barcode', !variant || !variant.barcode);
    };

    _.updateInventoryNotice = function (variant, $container) {
      var inventoryData = _._getVariantOptionElement(variant, $container).data('inventory');

      if (inventoryData) {
        $container.find('.product-inventory-notice').removeClass('product-inventory-notice--no-inventory').html(_._getString('inventoryNotice').replace('[[ quantity ]]', inventoryData));
      } else {
        $container.find('.product-inventory-notice').addClass('product-inventory-notice--no-inventory').empty();
      }
    };

    _.updateBackorder = function (variant, $container) {
      var $backorder = $container.find('.backorder');

      if ($backorder.length) {
        if (variant && variant.available) {
          if (variant.inventory_management && _._getVariantOptionElement(variant, $container).data('stock') == 'out') {
            var productData = _.getProductData($backorder.closest('form'));

            $backorder.find('.backorder__variant').html(productData.title + (variant.title.indexOf('Default') >= 0 ? '' : ' - ' + variant.title));
            $backorder.show();
          } else {
            $backorder.hide();
          }
        } else {
          $backorder.hide();
        }
      }
    };

    _.updatePrice = function (variant, $container) {
      var $priceArea = $container.find(_.selectors.priceArea);
      $priceArea.removeClass('on-sale');

      if (variant) {
        var $newPriceArea = $('<div>');
        $('<span class="current-price theme-money">').html(theme.Shopify.formatMoney(variant.price, theme.money_format)).appendTo($newPriceArea);

        if (variant.compare_at_price > variant.price) {
          $newPriceArea.append(' ');
          $('<span class="was-price theme-money">').html(theme.Shopify.formatMoney(variant.compare_at_price, theme.money_format)).appendTo($newPriceArea);
          $priceArea.addClass('on-sale');
        }

        if (variant.unit_price_measurement) {
          var $newUnitPriceArea = $('<div class="unit-price">').appendTo($newPriceArea);
          $('<span class="unit-price__price theme-money">').html(theme.Shopify.formatMoney(variant.unit_price, theme.money_format)).appendTo($newUnitPriceArea);
          $('<span class="unit-price__separator">').html(_._getString('unitPriceSeparator')).appendTo($newUnitPriceArea);
          $('<span class="unit-price__unit">').html(_.getBaseUnit(variant)).appendTo($newUnitPriceArea);
        }

        $priceArea.html($newPriceArea.html());
      } else {
        $priceArea.html(_._getString('priceNonExistent', variant));
      }
    };

    _._updateButtonText = function ($button, string, variant) {
      $button.each(function () {
        var newVal;
        newVal = _._getString('button' + string, variant);

        if (newVal !== false) {
          if ($(this).is('input')) {
            $(this).val(newVal);
          } else {
            $(this).html(newVal);
          }
        }
      });
    };

    _.updateButtons = function (variant, $container) {
      var $button = $container.find(_.selectors.submitButton);

      if (variant && variant.available == true) {
        $button.removeAttr('disabled');

        _._updateButtonText($button, 'Default', variant);
      } else {
        $button.attr('disabled', 'disabled');

        if (variant) {
          _._updateButtonText($button, 'NoStock', variant);
        } else {
          _._updateButtonText($button, 'NoVariant', variant);
        }
      }
    };

    _.updateContainerStatusClasses = function (variant, $container) {
      $container.toggleClass('variant-status--unavailable', !variant.available);
      $container.toggleClass('variant-status--backorder', variant.available && variant.inventory_management && _._getVariantOptionElement(variant, $container).data('stock') == 'out');
    };

    _.initProductOptions = function (originalInput) {
      $(originalInput).not('.theme-init').addClass('theme-init').each(function () {
        var $originalInput = $(this);

        if ($originalInput.is('select')) {
          var productData = _.getProductData($originalInput.closest('form')); // change state for original dropdown


          $originalInput.on('change.themeProductOptions firstrun.themeProductOptions', function (e, variant) {
            if ($(this).is('input[type=radio]:not(:checked)')) {
              return; // handle radios - only update for checked
            }

            var variant = variant;

            if (!variant && variant !== false) {
              for (var i = 0; i < productData.variants.length; i++) {
                if (productData.variants[i].id == $(this).val()) {
                  variant = productData.variants[i];
                }
              }
            }

            var $container = $(this).closest(_.selectors.container); // update price

            _.updatePrice(variant, $container); // update buttons


            _.updateButtons(variant, $container); // variant images


            if (variant && variant.featured_media) {
              $container.find(_.selectors.gallery).trigger('variantImageSelected', variant);
            } // extra details


            _.updateBarcode(variant, $container);

            _.updateWeight(variant, $container);

            _.updateSku(variant, $container);

            _.updateInventoryNotice(variant, $container);

            _.updateBackorder(variant, $container);

            _.updateContainerStatusClasses(variant, $container); // variant urls


            var $form = $(this).closest('form');

            if ($form.data('enable-history-state') && e.type == 'change') {
              _.addVariantUrlToHistory(variant);
            } // notify quickbuy of content change


            $container.find('.quickbuy-container').trigger('changedsize');
          }); // split-options wrapper

          $originalInput.closest(_.selectors.container).find(_.selectors.multiOption).on('change.themeProductOptions', 'select', function () {
            var selectedOptions = [];
            $(this).closest(_.selectors.multiOption).find('select').each(function () {
              selectedOptions.push($(this).val());
            }); // find variant

            var variant = false;

            for (var i = 0; i < productData.variants.length; i++) {
              var v = productData.variants[i];
              var matchCount = 0;

              for (var j = 0; j < selectedOptions.length; j++) {
                if (v.options[j] == selectedOptions[j]) {
                  matchCount++;
                }
              }

              if (matchCount == selectedOptions.length) {
                variant = v;
                break;
              }
            } // trigger change


            if (variant) {
              $originalInput.val(variant.id);
            }

            $originalInput.trigger('change', variant);
          }); // first-run

          $originalInput.trigger('firstrun');
        } // ajax


        theme.applyAjaxToProductForm($originalInput.closest('form'));
      });
    };

    _.unloadProductOptions = function (originalInput) {
      $(originalInput).removeClass('theme-init').each(function () {
        $(this).trigger('unloading').off('.themeProductOptions');
        $(this).closest(_.selectors.container).find(_.selectors.multiOption).off('.themeProductOptions');
        theme.removeAjaxFromProductForm($(this).closest('form'));
      });
    };
  }();

  theme.loadCartNoteMonitor = function (container) {
    $('.cart-form [name="note"]', container).on('change.themeLoadCartNoteMonitor', function () {
      $.post(theme.routes.cart_url + '/update.js', {
        note: $(this).val()
      }, function (data) {}, 'json');
    });
  };

  theme.unloadCartNoteMonitor = function (container) {
    $('.cart-form [name="note"]', container).off('change.themeLoadCartNoteMonitor');
  };

  theme.FooterSection = new function () {
    this.onSectionLoad = function (container) {
      $('.disclosure', container).each(function () {
        $(this).data('disclosure', new theme.Disclosure($(this)));
      });
    };

    this.onSectionUnload = function (container) {
      $('.disclosure', container).each(function () {
        $(this).data('disclosure').unload();
      });
    };
  }();
  theme.CartDrawerSection = new function () {
    this.onSectionLoad = function (container) {
      theme.applyAjaxToProductForm($('form.product-form', container));
      theme.loadCartNoteMonitor(container);
    };

    this.onSectionUnload = function (container) {
      theme.removeAjaxFromProductForm($('form.product-form', container));
      theme.unloadCartNoteMonitor(container);
    };

    this.onSectionSelect = function (container) {
      // display drawer
      if (!$('body').hasClass('show-cart-summary')) {
        $('.toggle-cart-summary:first').click();
      }
    };

    this.onSectionDeselect = function (container) {
      // hide drawer
      if ($('body').hasClass('show-cart-summary')) {
        $('.toggle-cart-summary:first').click();
      }
    };
  }();
  theme.SlideshowSection = new function () {
    this.onSectionLoad = function (target) {
      $('.slideshow', target).each(function () {
        var $slider = $(this);
        $('.slideshow .line-1, .slideshow .line-2, .slideshow .line-3', this).addClass('trans-out');
        $slider.on('init', function () {
          $('.lazyload--manual', this).removeClass('lazyload--manual').addClass('lazyload');
        }).slick({
          fade: true,
          autoplaySpeed: 7000,
          adaptiveHeight: $slider.hasClass('smoothheight'),
          arrows: true,
          dots: false,
          prevArrow: '<button type="button" class="slick-prev" aria-label="' + theme.strings.previous + '">' + theme.icons.chevronLeft + '</button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="' + theme.strings.next + '">' + theme.icons.chevronRight + '</button>',
          slidesToShow: 1,
          variableWidth: false,
          responsive: [{
            breakpoint: 768,
            settings: {
              fade: false,
              arrows: false,
              dots: true
            }
          }]
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          if (currentSlide != nextSlide) {
            $(slick.$slides[nextSlide]).find('.line-1, .line-2, .line-3').addClass('trans-out');
          }
        }).on('afterChange', function (event, slick, currentSlide, misc) {
          // transition in text
          var $thisSlide = $(slick.$slides[currentSlide]);
          $thisSlide.siblings().find('.line-1, .line-2, .line-3').addClass('trans-out');
          setTimeout(function () {
            $thisSlide.find('.line-1').removeClass('trans-out');
          }, 0);
          setTimeout(function () {
            $thisSlide.find('.line-2').removeClass('trans-out');
          }, 400);
          setTimeout(function () {
            $thisSlide.find('.line-3').removeClass('trans-out');
          }, 1000);
        });
        $slider.imagesLoaded(function () {
          $slider[0].slick.refresh(); // must call before slickPlay
          // start autoplay after images have loaded

          $slider.filter(':not(.shopify-block-paused)').slick('slickPlay');
          setTimeout(function () {
            $('.slideshow .line-1').removeClass('trans-out');
          }, 500);
          setTimeout(function () {
            $('.slideshow .line-2').removeClass('trans-out');
          }, 900);
          setTimeout(function () {
            $('.slideshow .line-3').removeClass('trans-out');
          }, 1500);
        });
      });
    };

    this.onSectionUnload = function (target) {
      $('.slick-slider', target).slick('unslick').off('init beforeChange afterChange');
    };

    this.onBlockSelect = function (target) {
      $(target).closest('.slick-slider').addClass('shopify-block-paused').slick('slickGoTo', $(target).data('slick-index')).slick('slickPause');
    };

    this.onBlockDeselect = function (target) {
      $(target).closest('.slick-slider').removeClass('shopify-block-paused').slick('slickPlay');
    };
  }();
  theme.ProductTemplateSection = new function () {
    var galleries = [];

    this.onSectionLoad = function (target) {
      $('.product-gallery', target).each(function () {
        galleries.push(new theme.ProductMediaGallery($(this)));
      });
      $('.product-gallery .thumbnails', target).on('init reInit setPosition', function ($slick) {
        var lastSlide = $(this).find('.slick-slide:last');

        if (lastSlide.length > 0) {
          var slideInnerWidth = lastSlide.position().left + lastSlide.outerWidth(true);
          var carouselWidth = $(this).width();
          $(this).toggleClass('slick-slider--all-visible', carouselWidth > slideInnerWidth);
        } // Enable tabbing between slides


        setTimeout(function () {
          $($slick.target).find('.slick-slide').attr('tabindex', '0');
        });
      }).slick({
        slidesToScroll: 1,
        variableWidth: true,
        infinite: false,
        speed: 200,
        swipeToSlide: true,
        prevArrow: '<button type="button" class="slick-prev" aria-label="' + theme.strings.previous + '">' + theme.icons.chevronLeft + '</button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="' + theme.strings.next + '">' + theme.icons.chevronRight + '</button>'
      });
      theme.initProductForm($('.product-form', target)); // reviews link

      if ($('#shopify-product-reviews').length) {
        $(target).on('click', '.themed-product-reviews .spr-badge', function () {
          $('html, body').animate({
            scrollTop: $('#shopify-product-reviews').offset().top - 10
          }, 1000);
          return false;
        });
      } // size chart link


      $(target).on('click', '.size-chart-link', function () {
        $.colorbox({
          inline: true,
          href: '#size-chart-content > .size-chart'
        });
      }); /// Grid item heights

      $(window).trigger('normheights');
    };

    this.onSectionUnload = function (target) {
      $(target).off('click');
      $('.product-gallery .thumbnails', target).slick('unslick');

      if (galleries.length) {
        for (var i = 0; i < galleries.length; i++) {
          galleries[i].destroy();
        }
      }

      theme.unloadProductForm($('.product-form', target));
    };
  }();
  theme.CollectionListingSection = new function () {
    this.onSectionLoad = function (target) {
      /// Grid item heights
      $(window).trigger('normheights');
      theme.loadProductGrid(target);
    };

    this.onSectionUnload = function (target) {
      theme.unloadProductGrid(target);
    };
  }();
  theme.FeaturedCollectionSection = new function () {
    this.onSectionLoad = function (target) {
      theme.loadProductGrid(target);
    };

    this.onSectionUnload = function (target) {
      theme.unloadProductGrid(target);
    };
  }();
  theme.FeaturedCollectionsSection = new function () {
    this.onSectionLoad = function (target) {
      /// Grid item heights
      $(window).trigger('normheights');
    };
  }();
  theme.SearchTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      theme.loadProductGrid(target);
    };

    this.onSectionUnload = function (target) {
      theme.unloadProductGrid(target);
    };
  }();
  theme.TiledImagesSection = new function () {
    var _ = this;

    this.renderTileGroup = function () {
      var $section = $(this);
      var $sectionContainer = $section.closest('.section');
      var $imgs = $(this).find('.rimage-wrapper, svg');
      var rows = [],
          sectionHeight = 0,
          sectionWidth = $section.width(),
          marginMultiplier = $(this).data('tiles-margin'),
          originalPerRow = $(this).data('tiles-per-row'),
          sectionPaddingBottom = parseInt($sectionContainer.css('padding-bottom')),
          sectionMarginBottom = parseInt($sectionContainer.css('margin-bottom'));
      var margin_px = sectionPaddingBottom > 0 ? sectionPaddingBottom * marginMultiplier : sectionMarginBottom * marginMultiplier;
      var margin_pc = 100.0 * margin_px / sectionWidth;
      var row_size = Math.max(1, sectionWidth >= 768 ? originalPerRow : Math.min(2, originalPerRow));

      if (sectionWidth < 400) {
        row_size = 1;
      } // Split into rows


      while ($imgs.length > 0) {
        var $row = $($imgs.splice(0, row_size));
        rows.push($row);
      }

      for (var r = 0; r < rows.length; r++) {
        var $rowImgs = rows[r]; // Calc ratios & % widths

        var totalFracWidth = 0;

        for (var i = 0; i < $rowImgs.length; i++) {
          var wh_ratio = $($rowImgs[i]).outerWidth() / $($rowImgs[i]).outerHeight();
          $($rowImgs[i]).data('wh_ratio', wh_ratio);
          totalFracWidth += wh_ratio;
        } // Total number of gaps this row, in %


        var gaps = ($rowImgs.length - 1) * margin_pc; // Set vals

        var xOffset = 0;

        for (var i = 0; i < $rowImgs.length; i++) {
          var thisWidth = (100.0 - gaps) * ($($rowImgs[i]).data('wh_ratio') / totalFracWidth);
          $($rowImgs[i]).closest('.tile').css({
            position: 'absolute',
            top: sectionHeight,
            left: xOffset + '%',
            width: thisWidth + '%'
          });
          xOffset += thisWidth + margin_pc;
        } // Calc height


        sectionHeight += Math.ceil($($rowImgs[0]).outerHeight() + margin_px);
      }

      $section.height(sectionHeight - Math.floor(margin_px) + 1);
    };

    this.onSectionLoad = function (target) {
      // lay out tiles
      _.renderTileGroup.bind($('.tile-group', target))(); // load image now at correct size


      $('.lazyload--manual', target).removeClass('lazyload--manual').addClass('lazyload'); // lay out tiles again on page resize

      $(window).off('.TiledImagesSection').on('debouncedresize.TiledImagesSection', function () {
        $('.tile-group').each(_.renderTileGroup);
      });
    };

    this.onSectionUnload = function (target) {
      $(window).off('.TiledImagesSection');
    };
  }();
  theme.HeaderSection = new function () {
    this.onSectionLoad = function (target) {
      /// Create mobile navigation
      $('body').append($('#mobile-navigation-template', target).html()); // disabling tabbing on all but first menu

      $('#mobile-nav .sub-nav a, #mobile-nav .sub-nav button').attr('tabindex', '-1'); // things for the standard nav

      if ($('.main-nav', target).length) {
        // always follow links
        $('.main-nav', target).on('click', '.sub-nav-item.has-dropdown > a', function () {
          // Sub sub nav
          $(this).attr('aria-expanded', !$(this).siblings().is(':visible'));
          $(this).parent().toggleClass('sub-nav-item--expanded', !$(this).siblings().is(':visible'));
          $(this).siblings().slideToggle(250);
          return false;
        }).filter('[data-col-limit]').each(function () {
          // Ensure no columns go over the per-column quota
          var perCol = $(this).data('col-limit');

          if (perCol > 0) {
            $('.nav-item.dropdown.drop-norm > .sub-nav', this).each(function () {
              var $items = $(this).find('.sub-nav-list:not(.sub-nav-image) > .sub-nav-item');
              var cols = Math.ceil($items.length / perCol);

              for (var i = 1; i < cols; i++) {
                var $list = $('<ul class="sub-nav-list"/>').append($items.slice(perCol * i)).insertAfter($(this).find('.sub-nav-list:not(.sub-nav-image):last'));
              }
            });
          }
        }); // hover events

        var navHoverDelay = 250;
        var $navLastOpenDropdown = $();
        var navOpenTimeoutId = -1;
        var $container = $(target);
        $('.main-nav', target).on('mouseenter mouseleave', '.nav-item.dropdown', function (evt) {
          var $dropdownContainer = $(evt.currentTarget); // delay on hover-out

          if (evt.type == 'mouseenter') {
            clearTimeout(navOpenTimeoutId);
            clearTimeout($dropdownContainer.data('navCloseTimeoutId'));
            var $openSiblings = $dropdownContainer.siblings('.open'); // close all menus but last opened

            $openSiblings.not($navLastOpenDropdown).removeClass('open');
            $navLastOpenDropdown = $dropdownContainer; // show after a delay, based on first-open or not

            var timeoutDelay = $openSiblings.length == 0 ? 0 : navHoverDelay; // open it

            var newNavOpenTimeoutId = setTimeout(function () {
              $dropdownContainer.addClass('open').siblings('.open').removeClass('open'); // look for a non-mega dropdown

              var $dropdown = $dropdownContainer.filter('.drop-norm').children('.sub-nav');

              if ($dropdown.length) {
                var transform = '',
                    rightEdge = $('#page-wrap').width() - 30; // centre-aligned menus

                if ($dropdownContainer.closest('.align-center').length) {
                  // check if left-edge is too far left
                  var leftOfDropdown = $dropdownContainer.offset().left + $dropdownContainer.outerWidth() / 2 - $dropdown.outerWidth() / 2;
                  var leftEdge = 30;
                  var leftOutsideAmount = leftOfDropdown - leftEdge;

                  if (leftOutsideAmount < 0) {
                    transform = 'translateX(calc(50% + ' + Math.round(Math.abs(leftOutsideAmount)) + 'px))';
                  } else {
                    // check if right-edge is too far right
                    var rightOfDropdown = $dropdownContainer.offset().left + $dropdownContainer.outerWidth() / 2 + $dropdown.outerWidth() / 2;
                    var rightOusideAmount = rightOfDropdown - rightEdge;

                    if (rightOusideAmount > 0) {
                      transform = 'translateX(calc(50% - ' + Math.round(rightOusideAmount) + 'px))';
                    }
                  }
                } else {
                  // left-aligned menus - check if right-edge is too far right
                  var rightOfDropdown = $dropdownContainer.offset().left + $dropdown.outerWidth();
                  var rightOusideAmount = rightOfDropdown - rightEdge;

                  if (rightOusideAmount > 0) {
                    transform = 'translateX(-' + Math.round(rightOusideAmount) + 'px)';
                  }
                }

                $dropdown.css('transform', transform);
              }
            }, timeoutDelay);
            navOpenTimeoutId = newNavOpenTimeoutId;
            $dropdownContainer.data('navOpenTimeoutId', newNavOpenTimeoutId);
          } else {
            // cancel opening, close after delay, and clear transforms
            clearTimeout($dropdownContainer.data('navOpenTimeoutId'));
            $dropdownContainer.data('navCloseTimeoutId', setTimeout(function () {
              $dropdownContainer.removeClass('open').children('.sub-nav').css('transform', '');
            }, navHoverDelay));
          } // a11y


          $dropdownContainer.children('[aria-expanded]').attr('aria-expanded', evt.type == 'mouseenter');
        }); // touch events

        $('.main-nav', target).on('touchstart touchend click', '.nav-item.dropdown > .nav-item-link', function (evt) {
          if (evt.type == 'touchstart') {
            $(this).data('touchstartedAt', evt.timeStamp);
          } else if (evt.type == 'touchend') {
            // down & up in under a second - presume tap
            if (evt.timeStamp - $(this).data('touchstartedAt') < 1000) {
              $(this).data('touchOpenTriggeredAt', evt.timeStamp);

              if ($(this).parent().hasClass('open')) {
                // trigger close
                $(this).parent().trigger('mouseleave');
              } else {
                // trigger close on any open items
                $('.nav-item.open').trigger('mouseleave'); // trigger open

                $(this).parent().trigger('mouseenter');
              } // prevent fake click


              return false;
            }
          } else if (evt.type == 'click') {
            // if touch open was triggered very recently, prevent click event
            if ($(this).data('touchOpenTriggeredAt') && evt.timeStamp - $(this).data('touchOpenTriggeredAt') < 1000) {
              return false;
            }
          }
        }); // keyboard events

        $('.main-nav', target).on('keydown', '.nav-item.dropdown > .nav-item-link', function (evt) {
          // space on parent link - toggle dropdown
          if (evt.which == 32) {
            var $parent = $(evt.target).parent();
            $parent.trigger($parent.hasClass('open') ? 'mouseleave' : 'mouseenter');
            return false;
          }
        }); /// Resize nav when it doesn't fit on one line...

        if ($('.main-nav > ul > li', target).length > 1) {
          $(window).on('debouncedresize.resizeNavFont load.resizeNavFont resizenav.resizeNavFont', function () {
            //create invisible clone of nav list with no css tweaks
            var $clone = $('.main-nav > ul', target).clone().addClass('clone').css({
              position: 'absolute',
              visibility: 'hidden',
              pointerEvents: 'none',
              left: 0,
              width: '100%'
            }).appendTo('.main-nav');
            var $samelineCheckA = $clone.children().first();
            var $samelineCheckB = $clone.children().last();
            var $cloneLinks = $clone.find('.nav-item-link').removeAttr('style');
            var includesLogo = $clone.children('.logo-item').length > 0;
            var sanity = 500;
            var padL = Math.floor(parseInt($($cloneLinks[1]).css('padding-left')));
            var fontSize = Math.floor(parseInt($cloneLinks.first().css('font-size')));
            var setStyles = false;
            var onSameLine;

            if (includesLogo) {
              onSameLine = function onSameLine() {
                return Math.floor($samelineCheckA.offset().top) + $samelineCheckA.height() != Math.floor($samelineCheckB.offset().top) + $samelineCheckB.height();
              };
            } else {
              onSameLine = function onSameLine() {
                return $samelineCheckA.offset().top != $samelineCheckB.offset().top;
              };
            }

            while (onSameLine() && sanity-- > 0) {
              padL = Math.max(0, padL - 0.5);
              fontSize = Math.max(12, fontSize - 0.5);
              $cloneLinks.each(function (index) {
                $(this).css(index == 0 ? {
                  fontSize: fontSize
                } : {
                  paddingLeft: padL,
                  fontSize: fontSize
                });
              });
              setStyles = true;
            }

            if (!setStyles) {
              padL = '';
              fontSize = '';
            } //Shunt data back


            $('.main-nav .nav-item-link', target).each(function (index) {
              $(this).css(index == 0 ? {
                fontSize: fontSize
              } : {
                paddingLeft: padL,
                fontSize: fontSize
              });
            });
            $clone.remove();
          }).trigger('resizenav');
        } // Ensuring sub nav dropdown does not go off the RHS of page


        $(window).on('debouncedresize.headerSection load.headerSection ensuredropdownposition.headerSection', function () {
          setTimeout(function () {
            var pw = $('.main-nav').width() + $('.main-nav').offset().left;
            $('.main-nav .nav-item.drop-norm .sub-nav').css('transform', '').each(function () {
              $(this).css({
                visibility: 'hidden',
                zIndex: -1
              }).css({
                display: 'block'
              });
              var oobr = pw - ($(this).offset().left + $(this).outerWidth());
              var oobl = $(this).offset().left;

              if (oobr < 0) {
                // off the right
                $(this).css('transform', 'translate(' + Math.ceil(oobr - 1) + 'px)');
              } else if (oobl < 0) {
                // off the left
                $(this).css('transform', 'translate(' + Math.ceil(-oobl) + 'px)');
              }

              $(this).css({
                visibility: '',
                zIndex: '',
                display: ''
              });
            });
          }, 50);
        }).trigger('ensuredropdownposition');
      }

      $(window).trigger('handledockednav'); /// Style any dropdowns

      $('select:not([name=id])', target).selectReplace();
      $('.disclosure', target).add('#mobile-nav .disclosure').each(function () {
        $(this).data('disclosure', new theme.Disclosure($(this)));
      }); // Announcement visibility on mobile

      var $announcementAbove = $('.header-announcement--above', target);

      if ($announcementAbove.length) {
        $(window).on('debouncedresize.headerSection load.headerSection setAnnouncementHeight.headerSection', function () {
          $announcementAbove.css('margin-top', $('#toolbar', target).outerHeight());
        }).trigger('setAnnouncementHeight');
      }
    };

    this.onSectionUnload = function (target) {
      $('.main-nav', target).off('click mouseenter mouseleave touchstart touchend keydown');
      $('body #mobile-nav').remove();
      $(window).off('.resizeNavFont .headerSection');
      $('.disclosure', target).add('#mobile-nav .disclosure').each(function () {
        $(this).data('disclosure').unload();
      });
      $('select.replaced', target).selectReplace('destroy');
    };
  }();
  theme.BlogTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      /// Style any dropdowns
      $('select:not([name=id])', target).selectReplace(); // Masonry

      $('.use-masonry', target).each(function () {
        var $toMasonry = $(this);
        window.$ = window.jQuery = $; // rebind jQuery

        theme.loadScriptOnce(theme.scripts.masonry, function () {
          $toMasonry.addClass('masonry').masonry({
            itemSelector: '.article',
            visibleStyle: {
              opacity: 1,
              transform: 'translate3d(0,0,0)'
            },
            hiddenStyle: {
              opacity: 0,
              transform: 'translate3d(0,20px,0)'
            }
          }); // hack: needs a second run, may as well do after load

          setTimeout(function () {
            $(window).on('load.blogTemplateMasonry', function () {
              $toMasonry.masonry();
            });
          }, 10);
        });
      }); // Infinite scroll

      $('.articles.use-infinite-scroll', target).each(function () {
        var $cont = $(this);
        window.$ = window.jQuery = $; // rebind jQuery

        theme.loadScriptOnce(theme.scripts.jqueryInfiniteScroll, function () {
          $cont.infinitescroll({
            navSelector: ".pagination",
            nextSelector: ".pagination .next",
            itemSelector: ".articles .article",
            loading: {
              img: theme.strings.infiniteScrollLoadingImg,
              msgText: theme.strings.infiniteScrollBlogLoading,
              finishedMsg: theme.strings.infiniteScrollBlogFinishedMsg
            },
            pathParse: function pathParse(path, nextPage) {
              return path.match(/^(.*page=)[0-9]*(&.*)?$/).splice(1);
            }
          }, function (newElements) {
            $cont.find('#infscr-loading').remove(); // for nth-child

            if ($cont.hasClass('masonry')) {
              $(newElements).hide().imagesLoaded(function () {
                $(newElements).show();
                $cont.masonry('appended', $(newElements), true);
              });
            }
          });
        });
      }); /// Check that tags fit in one line

      if ($('.page-title.opposing-items .tags', target).length > 0) {
        $(window).on('debouncedresize.checktagswidth load.checktagswidth checktagswidth.checktagswidth', function () {
          var $cont = $('.page-title.opposing-items');
          var $title = $cont.children('.left');
          var $tags = $cont.children('.tags');
          $cont.toggleClass('collapse-tags', $tags.outerWidth(true) > $cont.width() - $title.outerWidth(true));

          if ($cont.hasClass('collapse-tags')) {
            if ($cont.find('.more-link').length == 0) {
              $tags.before(['<a href="#" class="more-link">', theme.strings.blogsShowTags, '</a>'].join(''));
            }
          } else {
            $cont.find('.more-link').remove();
          }
        }).trigger('checktagswidth');
        $(document).on('click.checktagswidth', '.page-title.opposing-items.collapse-tags .more-link', function (e) {
          e.preventDefault();
          $(this).closest('.opposing-items').toggleClass('reveal-tags');
        });
      }
    };

    this.onSectionUnload = function (target) {
      $(window).off('.checktagswidth .blogTemplateMasonry');
      $(document).off('.checktagswidth');
      $('select.replaced', target).selectReplace('destroy');
    };
  }();
  theme.CartTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      // Show shipping calculator
      if ($('#shipping-calculator', target).length) {
        // load scripts in order
        theme.loadScriptOnce(theme.scripts.underscore, function () {
          theme.loadScriptOnce(theme.scripts.shopifyCommon, function () {
            // final script can be async
            theme.loadScriptOnce(theme.scripts.jqueryCart, function () {
              Shopify.Cart.ShippingCalculator.show({
                submitButton: theme.strings.shippingCalcSubmitButton,
                submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
                customerIsLoggedIn: theme.customerIsLoggedIn,
                moneyFormat: theme.shippingCalcMoneyFormat
              });
              $('select', this).selectReplace();
              setTimeout(function () {
                this.trigger('change');
              }.bind($('select', this)), 100);
            }.bind(target));
          }, null, true);
        }, null, true);
      }

      theme.loadCartNoteMonitor(target);
    };

    this.onSectionUnload = function (target) {
      // remove shipping calc events
      $('#shipping-calculator #address_country', target).off('change');
      $('#shipping-calculator .get-rates', target).off('click');
      $('select.replaced', target).selectReplace('destroy');
      theme.unloadCartNoteMonitor(target);
    };
  }();
  theme.CollectionTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      var target = target; // Infinite-scroll

      $('.product-list.use-infinite-scroll', target).each(function () {
        var $cont = $(this);
        theme.loadScriptOnce(theme.scripts.jqueryInfiniteScroll, function () {
          $cont.infinitescroll({
            navSelector: ".pagination",
            nextSelector: ".pagination .next",
            itemSelector: ".product-list .product-block",
            loading: {
              img: theme.strings.infiniteScrollLoadingImg,
              msgText: theme.strings.infiniteScrollCollectionLoading,
              finishedMsg: theme.strings.infiniteScrollCollectionFinishedMsg
            },
            pathParse: function pathParse(path, nextPage) {
              return path.match(/^(.*page=)[0-9]*(&.*)?$/).splice(1);
            }
          }, function (newElements) {
            $cont.find('#infscr-loading').remove(); // for nth-child

            $cont.find('.product-block:not(.product-block--flex-spacer):last').prevAll('.product-block--flex-spacer').remove();
            theme.loadProductGrid(target);
          });
        });
      }); // Sort-by

      if ($('.sort-by', target).length > 0) {
        queryParams = {};

        if (location.search.length) {
          for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
            aKeyValue = aCouples[i].split('=');

            if (aKeyValue.length > 1) {
              queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
            }
          }
        }

        $('.sort-by', target).each(function () {
          $(this).val($(this).data('default-value')).trigger('change');
        }).on('change', function () {
          queryParams.sort_by = $(this).val();
          location.search = $.param(queryParams).replace(/\+/g, '%20');
        });
      } /// Style any dropdowns


      $('select:not([name=id])', target).selectReplace();
      theme.loadProductGrid(target);
    };

    this.onSectionUnload = function (target) {
      $('.sort-by', target).off('change');
      $('select.replaced', target).selectReplace('destroy');
      theme.unloadProductGrid(target);
    };
  }();

  theme.loadProductGrid = function (container) {
    $(window).trigger('normheights');
    theme.loadInPlaceQuantityAdjustment(container);
    theme.applyAjaxToProductForm($('form.product-form', container));
  };

  theme.unloadProductGrid = function (container) {
    theme.unloadInPlaceQuantityAdjustment(container);
    theme.removeAjaxFromProductForm($('form.product-form', container));
  };

  theme.ProductMediaGallery = function ($gallery) {
    var _this = this;

    var currentMedia;
    var initialisedMedia = {};
    var $viewInSpaceButton = $gallery.find('.view-in-space');

    this.Image = function ($elem, autoplay) {
      this.show = function () {
        $elem.show();
      };

      this.destroy = function () {
        $gallery.trigger('zoom.destroy');
      };

      this.hide = function () {
        $gallery.trigger('zoom.destroy');
        $elem.hide();
      }; //Init the image


      this.show();
      $gallery.trigger('initzoom');

      if ($gallery.closest('.quickbuy-form').length) {
        $.colorbox.resize();
      }
    };

    this.Video = function ($elem, autoplay) {
      var _video = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var videoElement = $elem.find('video')[0];

      this.show = function () {
        $elem.show();
      };

      this.play = function () {
        _video.show();

        playerObj.play();
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();
      };

      this.destroy = function () {
        playerObj.destroy();
      }; //Init the video


      theme.loadStyleOnce('https://cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.css'); // set up a controller for Plyr video

      window.Shopify.loadFeatures([{
        name: 'video-ui',
        version: '1.0',
        onLoad: function () {
          playerObj = {
            playerType: 'html5',
            element: videoElement,
            plyr: new Shopify.Plyr(videoElement, {
              controls: ['play', 'progress', 'mute', 'volume', 'play-large', 'fullscreen'],
              loop: {
                active: $elem.data('enable-video-looping')
              },
              autoplay: $(window).width() >= 768 && autoplay,
              hideControlsOnPause: true,
              iconUrl: '//cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.svg',
              tooltips: {
                controls: false,
                seek: true
              }
            }),
            play: function play() {
              this.plyr.play();
            },
            pause: function pause() {
              this.plyr.pause();
            },
            destroy: function destroy() {
              this.plyr.destroy();
            }
          };
          $elem.addClass('product-media--video-loaded');
          initialisedMedia[$elem.data('media-id')] = _video;
        }.bind(this)
      }]);

      _video.show();
    };

    this.ExternalVideo = function ($elem, autoplay) {
      var _video = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var iframeElement = $elem.find('iframe')[0];

      this.play = function () {
        _video.show();

        playerObj.play();
      };

      this.show = function () {
        $elem.show();
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();
      };

      this.destroy = function () {
        playerObj.destroy();
      }; //Init the external video


      if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(iframeElement.src)) {
        var loadYoutubeVideo = function loadYoutubeVideo() {
          playerObj = {
            playerType: 'youtube',
            element: iframeElement,
            player: new YT.Player(iframeElement, {
              videoId: $elem.data('video-id'),
              events: {
                onReady: function onReady() {
                  initialisedMedia[$elem.data('media-id')] = _video;
                  $elem.addClass('product-media--video-loaded');

                  if (autoplay && $(window).width() >= 768) {
                    _video.play();
                  }
                },
                onStateChange: function onStateChange(event) {
                  if (event.data === 0 && $elem.data('enable-video-looping')) {
                    event.target.seekTo(0);
                  }
                }
              }
            }),
            play: function play() {
              this.player.playVideo();
            },
            pause: function pause() {
              this.player.pauseVideo();
            },
            destroy: function destroy() {
              this.player.destroy();
            }
          };
        };

        if (window.YT && window.YT.Player) {
          loadYoutubeVideo();
        } else {
          // set up a controller for YouTube video
          var temp = window.onYouTubeIframeAPIReady;

          window.onYouTubeIframeAPIReady = function () {
            temp();
            loadYoutubeVideo();
          };

          theme.loadScriptOnce('https://www.youtube.com/iframe_api');
        }
      }

      _video.show();
    };

    this.Model = function ($elem, autoplay, dontShow) {
      var _model = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var modelElement = $elem.find('model-viewer')[0];

      this.show = function () {
        $elem.show();

        if (window.ShopifyXR && $viewInSpaceButton.length) {
          //Change the view in space button to launch this model
          $viewInSpaceButton.attr('data-shopify-model3d-id', $elem.data('media-id'));
          window.ShopifyXR.setupXRElements();
        }
      };

      this.play = function () {
        _model.show();

        playerObj.play();
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();

        if (window.ShopifyXR && $viewInSpaceButton.length) {
          //Reset the view in space button to launch the first model
          $viewInSpaceButton.attr('data-shopify-model3d-id', $viewInSpaceButton.data('shopify-model3d-first-id'));
          $viewInSpaceButton.attr('data-shopify-title', $viewInSpaceButton.data('shopify-first-title'));
          window.ShopifyXR.setupXRElements();
        }
      };

      this.destroy = function () {//Nothing needed
      };

      this.initAugmentedReality = function () {
        if ($('.model-json', $gallery).length) {
          var doInit = function doInit() {
            if (!window.ShopifyXR) {
              document.addEventListener('shopify_xr_initialized', function shopifyXrEventListener(event) {
                doInit(); //Ensure this only fires once

                event.target.removeEventListener(event.type, shopifyXrEventListener);
              });
              return;
            }

            window.ShopifyXR.addModels(JSON.parse($('.model-json', $gallery).html()));
            window.ShopifyXR.setupXRElements();
          };

          window.Shopify.loadFeatures([{
            name: 'shopify-xr',
            version: '1.0',
            onLoad: doInit
          }]);
        }
      }; //Init the model


      theme.loadStyleOnce('https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css');
      window.Shopify.loadFeatures([{
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: function () {
          playerObj = new Shopify.ModelViewerUI(modelElement);
          $elem.addClass('product-media--model-loaded');

          if (autoplay && $(window).width() >= 768) {
            _model.play();
          }
        }.bind(this)
      }]);
      initialisedMedia[$elem.data('media-id')] = _model;

      if (!dontShow) {
        _model.show();
      }

      if (!window.ShopifyXR) {
        _model.initAugmentedReality();
      }
    };

    this.showMedia = function ($mediaToShow, autoplay) {
      //In with the new
      if ($mediaToShow.length) {
        //Out with the old
        if (currentMedia) {
          currentMedia.hide();
        } //Function to instantiate and return the relevant media


        var getMedia = function getMedia(MediaType) {
          var media;

          if (initialisedMedia.hasOwnProperty($mediaToShow.data('media-id'))) {
            media = initialisedMedia[$mediaToShow.data('media-id')];

            if (autoplay && $(window).width() >= 768) {
              media.show(); //Delay play so its easier for users to understand that it paused

              setTimeout(media.play, 250);
            } else {
              media.show();
            }
          } else {
            media = new MediaType($mediaToShow, autoplay);
          }

          return media;
        }; //Initialise the media


        if ($mediaToShow.data('media-type') === "image") {
          currentMedia = getMedia(_this.Image);
        } else if ($mediaToShow.data('media-type') === "video") {
          currentMedia = getMedia(_this.Video);
        } else if ($mediaToShow.data('media-type') === "external_video") {
          currentMedia = getMedia(_this.ExternalVideo);
        } else if ($mediaToShow.data('media-type') === "model") {
          currentMedia = getMedia(_this.Model);
        } else {
          console.warn('Media is unknown', $mediaToShow);
          $gallery.find('.product-media:visible').hide();
          $mediaToShow.show();
        }
      }
    };

    this.destroy = function () {
      for (var i = 0; i < initialisedMedia.length; i++) {
        initialisedMedia[i].destroy();
      }

      $('.main a.main-img-link--lightbox', $gallery).off('click');
      $('.thumbnails .thumbnail', $gallery).off('click');
    };

    var $mediaToInit = $gallery.find('.product-media:first'); //Init the first media item

    _this.showMedia($mediaToInit, false); // On mobile, init the first model (without showing it) to init the view in your space button


    if ($mediaToInit.data('media-type') !== 'model' && $(window).width() < 768) {
      var $firstModel = $gallery.find('.product-media[data-media-type="model"]:first');

      if ($firstModel.length) {
        new _this.Model($firstModel, false, true);
      }
    } //Clicking on a lightbox


    $gallery.on('click', '.main a.main-img-link--lightbox', function () {
      //Don't do anything if the screen isn't very large. Otherwise, lightbox ahoy...
      if ($(window).height() >= 580 && $(window).width() >= 768) {
        if ($gallery.find('img:not(.zoomImg)').length == 1) {
          //One image only?
          $.colorbox({
            href: $(this).attr('href'),
            minWidth: '200',
            maxWidth: '96%',
            maxHeight: '96%'
          });
        } else {
          //Many images. Dupe thumbs to create a faux-gallery
          $('#gallery-cont').remove();
          var $galleryCont = $('<div id="gallery-cont"/>').append($gallery.find('.thumbnails a[data-media-type=\'image\']').clone().attr({
            rel: 'gallery',
            title: ''
          })).hide().appendTo('body'); //Trigger box (on the right one)

          $galleryCont.children().colorbox({
            minWidth: '200',
            maxWidth: '96%',
            maxHeight: '96%'
          }).filter('[href="' + $(this).attr('href') + '"]').first().click();
        }
      }

      return false;
    }); // Product gallery thumbnail click

    $gallery.on('click', '.thumbnails .thumbnail', function (e) {
      e.preventDefault();
      $gallery.data('full-image-width', $(this).data('full-image-width'));
      $(this).addClass('active').siblings('.active').removeClass('active');
      var $mediaToShow = $gallery.find('.product-media[data-media-id="' + $(this).data('media-id') + '"]');

      _this.showMedia($mediaToShow, true);
    });
  }; /// Wide images inside rich text content
  // To use: add class 'uncontain' to image, or add alt text ending 'fullwidth'


  theme.uncontainImages = function (container) {
    // set up
    $('.reading-column [data-fullwidth]:not(.uncontain)', container).addClass('uncontain'); // event

    if ($('.reading-column .uncontain').length > 0) {
      $(window).on('resize.wideimgs load.wideimgs wideimgs.wideimgs', function () {
        var contW = $('#page-wrap-inner').css('border-color') == 'rgb(255, 0, 1)' ? $(window).width() : $('.container:visible:first').width();
        $('.reading-column .uncontain').each(function () {
          var thisContW = $(this).closest('div:not(.uncontain), p:not(.uncontain)').width();
          $(this).css({
            width: contW,
            marginLeft: -(contW - thisContW) / 2.0,
            maxWidth: 'none'
          });
        });
      }).trigger('wideimgs');
    } else {
      $(window).off('.wideimgs');
    }
  }; /// Cookie management


  theme.createCookie = function (name, value, days) {
    var expires = "";

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
  };

  theme.readCookie = function (name) {
    var nameEQ = name + "=";

    try {
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
    } catch (error) {}

    return null;
  };

  theme.eraseCookie = function (name) {
    theme.createCookie(name, "", -1);
  };

  theme.initProductForm = function ($form) {
    /// Product options
    theme.OptionManager.initProductOptions($('[name="id"]', $form)); // Product form button-options

    var toMakeClicky = ',' + $form.find('.option-selectors').data('box-options') + ',';
    var $clickies = $('.selector-wrapper:not(.has-clickyboxes) select', $form).clickyBoxes().parent().addClass('has-clickyboxes'); // If we have clicky boxes, add the disabled-state to options that have no valid variants

    if ($clickies.length > 0) {
      var productData = theme.OptionManager.getProductData($form); // each option

      for (var optionIndex = 0; optionIndex < productData.options.length; optionIndex++) {
        // list each value for this option
        var optionValues = {};

        for (var variantIndex = 0; variantIndex < productData.variants.length; variantIndex++) {
          var variant = productData.variants[variantIndex];

          if (typeof optionValues[variant.options[optionIndex]] === 'undefined') {
            optionValues[variant.options[optionIndex]] = false;
          } // mark true if an option is available


          if (variant.available) {
            optionValues[variant.options[optionIndex]] = true;
          }
        } // mark any completely unavailable options


        for (var key in optionValues) {
          if (!optionValues[key]) {
            $('.selector-wrapper:eq(' + optionIndex + ') .clickyboxes li a', $form).filter(function () {
              return $(this).attr('data-value') == key;
            }).addClass('unavailable');
          }
        }
      }
    } /// Style up select-dropdowns


    $form.find('select:not([name="id"])').selectReplace().closest('.selector-wrapper').addClass('has-pretty-select'); /// In lightbox? resize after any content changes

    if ($form.closest('.quickbuy-form').length) {
      $form.find('[name="id"]').on('change', function () {
        setTimeout(function () {
          $.colorbox.resize();
        }, 10);
      });
    } // quantity adjuster


    $form.find('.qty-adjuster').on('click', '.qty-adjuster__down, .qty-adjuster__up', function (e) {
      var $adjusterContainer = $(this).closest('.qty-adjuster'),
          $valueInput = $adjusterContainer.find('.qty-adjuster__value'),
          $adjusterDown = $adjusterContainer.find('.qty-adjuster__down'),
          newValue = parseInt($valueInput.val()) + ($(this).hasClass('qty-adjuster__down') ? -1 : 1);
      $valueInput.val(newValue).trigger('change');

      if (newValue > 1) {
        $adjusterDown.removeAttr('disabled');
      } else {
        $adjusterDown.attr('disabled', 'disabled');
      }

      return false;
    });
  };

  theme.unloadProductForm = function ($form) {
    theme.OptionManager.unloadProductOptions($('[name="id"]', $form));
    $form.find('[name="id"]').off('change');
    $form.find('.clickybox-replaced').clickyBoxes('destroy');
    $('select.replaced', $form).selectReplace('destroy');
    $form.find('.qty-adjuster').off('click');
  };

  theme.loadInPlaceQuantityAdjustment = function (container, itemData) {
    // handling both mini product forms and quantity updaters (inc in cart)
    if ($('.qty-adjuster:first', container).length) {
      var updateGridWithItemData = function updateGridWithItemData(data) {
        $('.product-form--mini', container).addClass('product-form--temp-could-remove');

        for (var i = 0; i < data.items.length; i++) {
          var item = data.items[i],
              $qtyAdj = null; // mini form

          var $form = $('.product-form--mini[data-product-id="' + item.product_id + '"]', container);

          if ($form) {
            $form.addClass('product-form--added').removeClass('product-form--temp-could-remove');
            $qtyAdj = $form.parent().find('.qty-adjuster').attr('data-line-item-id', item.id);
          } // any qty adjuster


          if (!$qtyAdj) {
            $qtyAdj = $('.qty-adjuster[data-line-item-id="' + item.id + '"]', container);
          }

          if ($qtyAdj) {
            $qtyAdj.find('.qty-adjuster__value').val(item.quantity);
            var limitReached = typeof $qtyAdj.data('limit') !== 'undefined' && item.quantity >= $qtyAdj.data('limit');

            if (limitReached) {
              $qtyAdj.find('.qty-adjuster__up').attr('disabled', 'disabled');
            } else {
              $qtyAdj.find('.qty-adjuster__up').removeAttr('disabled');
            }
          }
        }

        $('.product-form--temp-could-remove', container).removeClass('product-form--added product-form--temp-could-remove');
      };

      if (itemData) {
        updateGridWithItemData(itemData);
      } else {
        $.getJSON(theme.routes.cart_url + '.js', updateGridWithItemData);
      }
    }
  };

  theme.unloadInPlaceQuantityAdjustment = function (container) {};

  theme.cartUpdatingRemoveTimeout = -1;

  theme.cartLoadingStarted = function () {
    $('body').addClass('updating-cart');
  };

  theme.cartLoadingFinished = function () {
    clearTimeout(theme.cartUpdatingRemoveTimeout);
    setTimeout(function () {
      $('body').removeClass('updating-cart');
    }, 500);
  };

  theme.updateCartSummaries = function (showCartSummary) {
    theme.cartLoadingStarted();
    var itemListScrollTop = $('.cart-summary__item-list:first').scrollTop(),
        cartDrawerInnerScrollTop = $('.cart-summary__inner:first').scrollTop();
    $.get(theme.routes.search_url, function (data) {
      var selectors = ['.toolbar-cart .current-cart', '.cart-summary']; // some little fiddles to make it parseable and resilient to broken markup

      var $parsed = $($.parseHTML('<div>' + data + '</div>')).wrap('<div>').parent();

      for (var i = 0; i < selectors.length; i++) {
        var cartSummarySelector = selectors[i];
        var $newCartObj = $parsed.find(cartSummarySelector).clone(); // do not transition images in again

        $newCartObj.find('.fade-in').removeClass('fade-in');
        var $currCart = $(cartSummarySelector);
        $currCart.replaceWith($newCartObj);
      }

      var cartItemData = JSON.parse($('#LimitedCartJson').html());
      theme.loadInPlaceQuantityAdjustment($('body'), cartItemData);
      theme.applyAjaxToProductForm($('.cart-summary form.product-form'));
      theme.loadCartNoteMonitor($('.cart-summary'));
      $('.cart-summary__item-list:first').scrollTop(itemListScrollTop);
      $('.cart-summary__inner:first').scrollTop(cartDrawerInnerScrollTop);

      if (theme.cartType != 'page') {
        //Show cart dropdown, if on a product page
        if (showCartSummary) {
          setTimeout(function () {
            $('body').addClass('show-cart-summary');
          }, 20);
        } // Remove updating classes


        $('.cart-summary.updating, .cart-summary .updating').removeClass('updating');
      }
    }).complete(function () {
      theme.cartLoadingFinished();
    });
  };

  theme.applyAjaxToProductForm = function ($form_param) {
    var shopifyAjaxAddURL = theme.routes.cart_add_url + '.js';
    var shopifyAjaxCartURL = theme.routes.cart_url + '.js';
    $form_param.filter('[data-ajax-add-to-cart="true"]').on('submit', function (e) {
      e.preventDefault();
      var $form = $(this); // Disable add button

      $form.find(':submit').attr('disabled', 'disabled').each(function () {
        var contentFunc = $(this).is('button') ? 'html' : 'val';
        $(this).data('previous-value', $(this)[contentFunc]())[contentFunc](theme.strings.productAddingToCart);
      }); // add class to page

      theme.cartLoadingStarted(); // Add to cart

      $.post(shopifyAjaxAddURL, $form.serialize(), function (itemData) {
        theme.createCookie('theme_added_to_cart', 'justnow', 1); // Update persistent cart summaries

        if ($form.closest('.quickbuy-form').length == 0) {
          // enable add button
          var $btn = $form.find(':submit').each(function () {
            var $btn = $(this);
            var contentFunc = $(this).is('button') ? 'html' : 'val'; //Set to 'DONE', alter button style, wait a few secs, revert to normal

            $btn.removeAttr('disabled')[contentFunc](theme.strings.productAddedToCart);
            setTimeout(function () {
              $btn[contentFunc]($btn.data('previous-value'));
            }, 2000);
          }).first(); // update and reveal sidebar

          theme.updateCartSummaries(!$form.hasClass('product-form--mini'));
        } else {
          // transition out form
          var itemData = itemData; // get full product data

          if (!theme.productData[itemData.product_id]) {
            theme.productData[itemData.product_id] = JSON.parse(document.getElementById('ProductJson-' + itemData.product_id).innerHTML);
          }

          var productPrice = '';
          var productDiscounts = '';

          for (var i = 0; i < theme.productData[itemData.product_id].variants.length; i++) {
            var variant = theme.productData[itemData.product_id].variants[i];

            if (variant.id == itemData.variant_id) {
              if (itemData.final_price < itemData.original_price) {
                productPrice += ['<span class="added-notice__price-reduced theme-money">', theme.Shopify.formatMoney(itemData.final_price, theme.money_format), '</span> ', '<span class="added-notice__price-compare theme-money">', theme.Shopify.formatMoney(itemData.original_price, theme.money_format), '</span>'].join('');

                if (itemData.line_level_discount_allocations && itemData.line_level_discount_allocations.length > 0) {
                  productDiscounts = '<ul class="cart-discount-list">';

                  for (var j = 0; j < itemData.line_level_discount_allocations.length; j++) {
                    itemData.line_level_discount_allocations[j];
                    productDiscounts += ['<li class="cart-discount cart-discount--inline">', '<span class="cart-discount__label">', itemData.line_level_discount_allocations[j].discount_application.title, '</span>', '<span class="cart-discount__amount theme-money">', theme.Shopify.formatMoney(itemData.line_level_discount_allocations[j].amount, theme.money_format), '</span>', '</li>'].join('');
                  }

                  productDiscounts += '</ul>';
                }
              } else {
                productPrice += '<span class="theme-money">' + theme.Shopify.formatMoney(itemData.final_price, theme.money_format) + '</span>';
              }
            }
          }

          if (itemData.quantity > 1) {
            productPrice += '<span class="added-notice__quantity">x' + itemData.quantity + '</span>';
          }

          var productVariants = '';

          if (itemData.variant_options.length > 0) {
            // get option names from full product data
            var optionNames = theme.productData[itemData.product_id].options;
            productVariants = '<div class="added-notice__product__variants">';

            for (var i = 0; i < itemData.variant_options.length; i++) {
              if (itemData.variant_options[i].indexOf('Default Title') < 0) {
                productVariants += '<div class="added-notice__variant">';
                productVariants += '<span class="added-notice__variant-label">' + optionNames[i] + ':</span> ';
                productVariants += '<span class="added-notice__variant-value">' + itemData.variant_options[i] + '</span>';
                productVariants += '</div>';
              }
            }

            productVariants += '</div>';
          }

          $form.closest('.quickbuy-form').animate({
            opacity: 0
          }, 500, function () {
            // show 'thank you' message in lightbox
            var productImage = theme.Shopify.Image.getSizedImageUrl(itemData.image || '', '200x');
            var $template = $(['<div class="added-notice" style="opacity: 0">', '<div class="added-notice__title">' + theme.strings.quickbuyAdded + '</div>', '<div class="added-notice__tick" role="presentation">', theme.icons.tick, '</div>', '<div class="added-notice__product">', '<div class="added-notice__product-image"><img src="', productImage, '" alt="" role="presentation"></div>', '<div class="added-notice__product__description">', '<h2 class="added-notice__product-title">', itemData.product_title, '</h2>', '<div class="added-notice__price">', productPrice, '</div>', productDiscounts, productVariants, '</div>', '</div>', '<div class="added-notice__checkout"><a class="button" href="' + theme.routes.cart_url + '">' + theme.strings.cartSummary + '</a></div>', '<div class="added-notice__continue"><a class="close-box more-link" href="#">' + theme.strings.cartContinue + '</a></div>', '</div>'].join(''));
            $.colorbox({
              closeButton: false,
              preloading: false,
              open: true,
              speed: 200,
              transition: "elastic",
              html: ['<div class="action-icons">', '<a href="#" class="close-box action-icon" aria-label="', theme.strings.close, '">' + theme.icons.close + '</a>', '</div>', $template.wrap('<div>').parent().html()].join(''),
              onComplete: function onComplete() {
                $('.added-notice').animate({
                  opacity: 1
                }, 500);
              }
            });
          }); // update sidebar

          theme.updateCartSummaries(false);
        }
      }, 'json').error(function (data) {
        //Enable add button
        var $firstBtn = $form.find(':submit').removeAttr('disabled').each(function () {
          var $btn = $(this);
          var contentFunc = $btn.is('button') ? 'html' : 'val';
          $btn[contentFunc]($btn.data('previous-value'));
        }).first(); //Not added, show message

        if (typeof data != 'undefined' && typeof data.status != 'undefined') {
          var jsonRes = $.parseJSON(data.responseText);
          theme.showQuickPopup(jsonRes.description, $firstBtn);
        } else {
          //Some unknown error? Disable ajax and submit the old-fashioned way.
          $form.attr('ajax-add-to-cart', 'false').submit();
        }
      }).complete(function () {
        theme.cartLoadingFinished();
      });
    });
  };

  theme.removeAjaxFromProductForm = function ($form_param) {
    $form_param.off('submit');
  };

  $(function ($) {
    function isMobile() {
      return $(window).width() < 768; //blunt check for mobile view
    }

    $(document).on('keyup.themeTabCheck', function (evt) {
      if (evt.keyCode === 9) {
        $('body').addClass('tab-used');
        $(document).off('keyup.themeTabCheck');
      }
    }); /// Style dropdowns (outside of the product form)

    $('select:not([name=id])').filter(function () {
      $(this).closest('.product-form').length == 0;
    }).selectReplace(); /// Uncontained images

    theme.uncontainImages($('body')); /// General lightbox popups

    $('a[rel=lightbox]').colorbox({
      minWidth: '200',
      maxWidth: '96%',
      maxHeight: '96%'
    }); /// Any section load

    $(document).on('shopify:section:load', function (e) {
      /// Handle special wide images - available inside any rich text content
      theme.uncontainImages(e.target);
    }); /// Mobile sub-nav

    var navStack = [];
    $(document).on('click', '#mobile-nav .open-sub-nav', function () {
      // hide current & add to stack
      var $toHide = $('#mobile-nav .inner:not(.hide), #mobile-nav .sub-nav.show:not(.hide)').addClass('hide');
      $toHide.find('a, button').attr('tabindex', '-1');
      navStack.push($toHide); // show new

      var $toShow = $('#mobile-nav .sub-nav[data-is-subnav-for="' + $(this).data('sub-nav') + '"]').first().addClass('show');
      $toShow.find('a, button').removeAttr('tabindex');
      $(this).attr('aria-expanded', true);
      return false;
    }).on('click', '#mobile-nav .close-sub-nav', function () {
      // hide current
      $(this).closest('.sub-nav').removeClass('show').find('a, button').attr('tabindex', '-1'); // reveal last seen & pop off stack

      var $popped = navStack.pop().removeClass('hide');
      $popped.find('a, button').removeAttr('tabindex');
      $popped.find('[aria-expanded="true"]').removeAttr('aria-expanded');
      return false;
    }).on('click', '#mobile-nav a.nav-item-link[href="#"], #mobile-nav a.sub-nav-item-link[href="#"]', function () {
      // #-link opens child nav
      $(this).closest('li').find('button').click();
      return false;
    }); /// Dropdowns that redirect

    $(document).on('change', 'select.redirect', function () {
      window.location = $(this).val();
    }); /// Custom share buttons

    $(document).on('click', '.sharing a', function (e) {
      var $parent = $(this).parent();

      if ($parent.hasClass('twitter')) {
        e.preventDefault();
        var url = $(this).attr('href');
        var width = 575,
            height = 450,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            opts = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
        window.open(url, 'Twitter', opts);
      } else if ($parent.hasClass('facebook')) {
        e.preventDefault();
        var url = $(this).attr('href');
        var width = 626,
            height = 256,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            opts = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
        window.open(url, 'Facebook', opts);
      } else if ($parent.hasClass('pinterest')) {
        e.preventDefault();
        var url = $(this).attr('href');
        var width = 700,
            height = 550,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            opts = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
        window.open(url, 'Pinterest', opts);
      }
    }); /// Toggle classes

    $(document).on('click', '[data-toggle-class]', function (e) {
      e.preventDefault();
      var spl = $(this).data('toggle-class').split('|');
      $(spl[1]).toggleClass(spl[0]);
      $(window).trigger('resize');
    }); /// Accordions

    $(document).on('click', '.cart-accordion-btn', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var isHidden = $(this).parent().next().toggleClass('hidden').hasClass('hidden');
      $(this).toggleClass('cart-accordion-btn--collapsed', isHidden);

      if (!isHidden) {
        $(this).closest('.cart-summary').find('.cart-accordion-btn:not(.cart-accordion-btn--collapsed)').not(this).click();
      }
    });
    $(document).on('click', '.cart-accordion-btn-container', function (e) {
      e.preventDefault();
      $(this).find('.cart-accordion-btn').click();
    }); /// Close side-modals

    function sideModTransOutHelper() {
      //Speed up
      $('body').addClass('sidepanel-transitioning');
      setTimeout(function () {
        $('body').removeClass('sidepanel-transitioning');
      }, 510);
    }

    function fixedNavWebkitHack() {
      if ($('body').hasClass('show-mobile-nav') || $('body').hasClass('show-cart-summary')) {
        var $headerAbove = $('.header-announcement--above');
        $('.toolbar.docked').css({
          position: 'absolute',
          top: $(window).scrollTop() - ($headerAbove.length ? $headerAbove.outerHeight(true) : 0),
          left: -15,
          right: -15,
          width: 'auto'
        });
      } else {
        setTimeout(function () {
          $('.toolbar').css({
            position: '',
            top: '',
            left: '',
            right: '',
            width: ''
          });
        }, 500);
      }
    }

    $(document).on('click', '#page-overlay', function () {
      sideModTransOutHelper();
      $('body').removeClass('show-cart-summary show-mobile-nav');
      fixedNavWebkitHack();
      return false;
    }); /// Toggles for side-modals

    $(document).on('click', '.toggle-mob-nav', function () {
      //prep for reveal
      $('.cart-summary').removeClass('active');
      $('#mobile-nav').addClass('active'); //toggle

      if (!$('body').toggleClass('show-mobile-nav').hasClass('show-mobile-nav')) {
        sideModTransOutHelper();
        setTimeout(function () {
          $('#mobile-nav').removeAttr('tabindex');
          $('body a:first:visible').focus();
        }, 500);
      } else {
        // move focus to menu container
        setTimeout(function () {
          $('#mobile-nav').attr('tabindex', '0').focus();
        }, 500);
      }

      fixedNavWebkitHack();
      return false;
    });

    if (theme.useSideCartSummary != 'off') {
      $(document).on('click', '.toggle-cart-summary', function () {
        // check if cart is toggleable
        if ($('.cart-summary .toggle-cart-summary').is(':visible')) {
          //prep for reveal
          $('#mobile-nav').removeClass('active');
          $('.cart-summary').addClass('active'); //toggle

          if (!$('body').toggleClass('show-cart-summary').hasClass('show-cart-summary')) {
            sideModTransOutHelper();
          }

          fixedNavWebkitHack();
          return false;
        }
      });
    }

    $(document).on('click', '.qty-adjuster--ajax .qty-adjuster__down, .qty-adjuster--ajax .qty-adjuster__up', function (e) {
      e.preventDefault();
      var $value = $(this).siblings('.qty-adjuster__value');
      $value.val(parseInt($value.val()) + ($(this).hasClass('qty-adjuster__down') ? -1 : 1)).trigger('change');
    });
    $(document).on('click', '.qty-adjuster--ajax .qty-adjuster__remove', function (e) {
      e.preventDefault();
      $(this).closest('.qty-adjuster').find('.qty-adjuster__value').val(0).trigger('change');
    });
    var qtyAdjustXhttp = null,
        qtyAdjustDebounceTime = 700;
    $(document).on('change', '.qty-adjuster--ajax .qty-adjuster__value', function (e) {
      // debounce
      if ($(this).data('postTimeout')) {
        clearTimeout($(this).data('postTimeout'));

        if (qtyAdjustXhttp) {
          qtyAdjustXhttp.abort();
        }
      }

      theme.cartLoadingStarted();
      $(this).data('postTimeout', setTimeout(function () {
        var postData = {
          quantity: $(this).val(),
          id: $(this).closest('.qty-adjuster').data('line-item-id')
        };

        if (qtyAdjustXhttp) {
          qtyAdjustXhttp.abort();
        }

        theme.cartLoadingStarted();
        qtyAdjustXhttp = $.post(theme.routes.cart_url + '/change.js', postData, function (data) {
          theme.updateCartSummaries(false);
          theme.loadInPlaceQuantityAdjustment($('body'), data);
          qtyAdjustXhttp = null;
        }, 'json').complete(function () {
          theme.cartLoadingFinished();
        });
      }.bind(this), qtyAdjustDebounceTime));
    }); /// In-page links

    $(document).on('click', 'a[href^="#"]:not([href="#"]):not(.skip-link)', function (e) {
      var $target = $($(this).attr('href')).first();

      if ($target.length == 1) {
        $('html:not(:animated),body:not(:animated)').animate({
          scrollTop: $target.offset().top
        }, 500);
        e.preventDefault();
      }
    }); /// Revealables (sharing, cart in header, sidebar)

    $(document).on('click', '[data-revealable]', function () {
      $(this).closest($(this).data('revealable')).toggleClass('show');
      $(window).trigger('resize');
      return false;
    }); /// Reload cart summary on page load, if we added something on the previous page (in response to back-button use)

    if (typeof theme.readCookie('theme_added_to_cart') != 'undefined' && theme.readCookie('theme_added_to_cart') == 'justnow') {
      theme.eraseCookie('theme_added_to_cart');
      theme.updateCartSummaries(false);
    } /// Heights in grids


    $(window).on('debouncedresize load normheights', function () {
      $('[data-normheights]').each(function () {
        var $items = $(this).find($(this).data('normheights')),
            childFilter = $(this).data('normheights-inner'),
            tallest = 0,
            lastYOffset = 0,
            row = [];
        $items.each(function (index) {
          var $img = $(this).find(childFilter);
          var yOffset = $(this).position().top;

          if (index == 0) {
            lastYOffset = yOffset;
          } else if (yOffset != lastYOffset) {
            $(row).css('min-height', tallest);
            yOffset = $(this).position().top;
            row.length = 0;
            tallest = 0;
          }

          lastYOffset = yOffset;
          row.push(this);
          var h = $img.height();
          if (h > tallest) tallest = h;
        });
        $(row).css('min-height', tallest);
      }); // also asses grids that can only show on item per row

      $('.product-grid.one-row').each(function () {
        var tallestVisibleChild = 0;
        var $productBlocks = $(this).find('.product-block:not(.product-block--flex-spacer)');
        $(this).css('position', 'relative');
        $productBlocks.find('.product-block:not(.product-block--flex-spacer)').each(function (index) {
          if ($(this).position().top == 0) {
            var h = $(this).outerHeight(true);

            if (h > tallestVisibleChild) {
              tallestVisibleChild = h;
            }
          } else {
            return false;
          }
        });
        $(this).css('height', tallestVisibleChild);
        $productBlocks.removeClass('hidden').each(function (index) {
          if ($(this).position().top > 0) {
            $(this).addClass('hidden');
          }
        });
        $(this).css({
          height: '',
          position: ''
        });
      });
    }).trigger('normheights'); /// Gallery variant images

    $(document).on('variantImageSelected', '.product-gallery', function (e, data) {
      var variantSrc = data.featured_media.preview_image.src.split('?')[0].replace(/http[s]?:/, '');
      $('.thumbnails a.thumbnail', this).filter('[href^="' + variantSrc + '"]').trigger('click');
    }); /// Product gallery zoom

    $(document).on('initzoom', '.product-gallery[data-enable-zoom="true"]', function () {
      var $gallery = $(this);
      var $img = $(this).find('.main .product-media:visible .main-img-link');

      function refreshZoom() {
        if ($img.length) {
          // Only initialise zoom when device is not mobile and  original image is wider than container
          if (!isMobile() && $gallery.width() < $gallery.data('full-image-width')) {
            if (!$img.hasClass('zoom-enabled')) {
              $img.zoom({
                url: $img.attr('href')
              }).addClass('zoom-enabled');
            }
          } else if ($img.hasClass('zoom-enabled')) {
            $img.trigger('zoom.destroy').removeClass('zoom-enabled');
          }
        } else {
          console.warn('Unable for find image to init hover on zoom on');
        }
      }

      refreshZoom();
      $(window).on('debouncedresize', refreshZoom);
    }); /// Quick buy

    var activeQuickBuyRequest = null;
    $(document).on('click', '.quick-buy', function (e) {
      if (activeQuickBuyRequest) {
        return false;
      }

      var $this = $(this);
      var placeholder = $('.quickbuy-placeholder-template[data-product-id="' + $this.data('product-id') + '"]:first').html();
      var $template = $('<div class="quickbuy-container">' + placeholder + '</div>');
      var prevIndex,
          nextIndex,
          $prod = $(this).closest('.product-block');

      if ($prod.length) {
        prevIndex = $('.product-block').index($prod) - 1;
        nextIndex = $('.product-block').index($prod) + 1;
      }

      if (nextIndex > $('.product-block').length) {
        nextIndex = -1;
      }

      $.colorbox({
        closeButton: false,
        preloading: false,
        open: true,
        speed: 200,
        //transition: "none",
        html: ['<div class="action-icons">', $prod.length ? '<a href="#" class="prev-item action-icon" data-idx="' + prevIndex + '" aria-label="' + theme.strings.previous + '">' + theme.icons.left + '</span></a>' : '', $prod.length ? '<a href="#" class="next-item action-icon" data-idx="' + nextIndex + '" aria-label="' + theme.strings.next + '">' + theme.icons.right + '</a>' : '', '<a href="#" class="close-box action-icon" aria-label="', theme.strings.close, '">' + theme.icons.close + '</a>', '</div>', $template.wrap('<div>').parent().html()].join(''),
        onComplete: function onComplete() {
          loadQuickBuyContent($this.attr('href'));
        },
        onCleanup: function onCleanup() {
          $('.quickbuy-container .product-gallery .thumbnails').slick('unslick').off('init reInit setPosition');

          if (theme.activeQuickBuyMediaGallery) {
            theme.activeQuickBuyMediaGallery.destroy();
          }

          theme.unloadProductForm($('.quickbuy-container .product-form'));
        }
      });
      e.stopImmediatePropagation();
      return false;
    });

    var loadQuickBuyContent = function loadQuickBuyContent(href) {
      if (href.indexOf('?') > -1) {
        href += '&view=lightbox'; // in theme editor
      } else {
        href += '?view=lightbox';
      }

      activeQuickBuyRequest = $.get(href, function (data) {
        var $form = $('<div class="quickbuy-form quickbuy-form--overlay">' + data + '</div>'); // ensure ids and labels match up

        $form.find('label[for]').each(function () {
          $(this).attr('for', $(this).attr('for') + '-qb');
        });
        $form.find(':input[id]').each(function () {
          $(this).attr('id', $(this).attr('id') + '-qb');
        });
        var $quickbuyContainer = $('.quickbuy-container');
        $quickbuyContainer.append($form);
        var $gallery = $quickbuyContainer.find('.product-container .product-gallery');

        if ($gallery.length === 1) {
          theme.activeQuickBuyMediaGallery = new theme.ProductMediaGallery($gallery);
        } //Init product form, if required


        theme.initProductForm($quickbuyContainer.find('.product-form'));
        $('.quickbuy-container .product-gallery .thumbnails').on('init reInit setPosition', function ($slick) {
          var lastSlide = $(this).find('.slick-slide:last');

          if (lastSlide.length > 0) {
            var slideInnerWidth = lastSlide.position().left + lastSlide.outerWidth(true);
            var carouselWidth = $(this).width();
            $(this).find('.slick-next, .slick-prev').toggleClass('theme-unnecessary', carouselWidth > slideInnerWidth);
          } // Enable tabbing between slides


          setTimeout(function () {
            $($slick.target).find('.slick-slide').attr('tabindex', '0');
          });
        }).slick({
          slidesToScroll: 1,
          variableWidth: true,
          infinite: false,
          speed: 200,
          swipeToSlide: true,
          prevArrow: '<button type="button" class="slick-prev" aria-label="' + theme.strings.previous + '">' + theme.icons.chevronLeft + '</button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="' + theme.strings.next + '">' + theme.icons.chevronRight + '</button>'
        });
        $('.quickbuy-form').imagesLoaded(function () {
          $('.product-gallery').trigger('initzoom');
          setTimeout($.colorbox.resize, 10);
        });
        $form.hide().fadeIn(500, function () {
          $('.quickbuy-form.placeholder').remove();
          $form.removeClass('quickbuy-form--overlay');
          $.colorbox.resize();
        });

        if (Shopify.PaymentButton) {
          $(document).on('shopify:payment_button:loaded.themeQuickBuy', function () {
            $(document).off('shopify:payment_button:loaded.themeQuickBuy');
            $.colorbox.resize();
          });
          Shopify.PaymentButton.init();
        }

        activeQuickBuyRequest = null;
      });
    };

    $(document).on('click', '#colorbox .close-box', function () {
      $.colorbox.close();
      return false;
    }).on('click', '#colorbox .action-icons .prev-item, #colorbox .action-icons .next-item', function () {
      $('.product-block:eq(' + $(this).data('idx') + ') .quick-buy').click();

      if (theme.activeQuickBuyMediaGallery) {
        theme.activeQuickBuyMediaGallery.destroy();
      }

      return false;
    }); /// Search in header - for visual effect

    $(document).on('focusin focusout', '.toolbar .search-form input', function (e) {
      $(this).closest('.search-form').toggleClass('focus', e.type == 'focusin');
    }); /// Docked mobile nav

    var prevNavMargin = 0;
    var prevScroll = $(window).scrollTop();
    $(window).on('debouncedresize load handledockednav', function () {
      var $dockedMobNav = $('#toolbar'),
          $announcementAbove = $('.header-announcement--above'),
          $pageHeader = $('.page-header'),
          mobNavHeight = $dockedMobNav.outerHeight();
      $dockedMobNav.toggleClass('docked', $('.toolbar:first').css('min-height') == '1px');

      if ($dockedMobNav.hasClass('docked')) {
        mobNavHeight = $dockedMobNav.outerHeight();
      } else {
        mobNavHeight = '';
      }

      if ($announcementAbove.length) {
        $announcementAbove.css('margin-top', mobNavHeight);
        $pageHeader.css('padding-top', '');
      } else {
        $announcementAbove.css('margin-top', '');
        $pageHeader.css('padding-top', mobNavHeight);
      }
    });
    $(window).on('scroll handledockednav', function () {
      var $dockedMobNav = $('#toolbar'),
          mobNavHeight = $dockedMobNav.outerHeight();
      var scroll = $(window).scrollTop();

      if (scroll < mobNavHeight) {
        $dockedMobNav.css('top', 0);
      } else {
        prevNavMargin += prevScroll - scroll;
        prevNavMargin = Math.min(Math.max(-mobNavHeight, prevNavMargin), 0);
        $dockedMobNav.css('top', prevNavMargin);
      }

      prevScroll = scroll;
    }); /// Page height assessment

    $(window).on('debouncedresize load setminheight', function () {
      // inner wrap contains the border
      var $innerWrap = $('#page-wrap-inner').css('min-height', $(window).height());
    }).trigger('setminheight'); /// Translations for colorbox

    $.extend($.colorbox.settings, {
      previous: theme.strings.colorBoxPrevious,
      next: theme.strings.colorBoxNext,
      close: theme.strings.colorBoxClose
    }); /// Register all sections

    theme.Sections.init();
    theme.Sections.register('slideshow', theme.SlideshowSection);
    theme.Sections.register('header', theme.HeaderSection);
    theme.Sections.register('footer', theme.FooterSection);
    theme.Sections.register('cart-drawer', theme.CartDrawerSection);
    theme.Sections.register('tiled-images', theme.TiledImagesSection);
    theme.Sections.register('collection-template', theme.CollectionTemplateSection);
    theme.Sections.register('product-template', theme.ProductTemplateSection);
    theme.Sections.register('blog-template', theme.BlogTemplateSection);
    theme.Sections.register('cart-template', theme.CartTemplateSection);
    theme.Sections.register('collection-listing', theme.CollectionListingSection);
    theme.Sections.register('featured-collection', theme.FeaturedCollectionSection);
    theme.Sections.register('featured-collections', theme.FeaturedCollectionsSection);
    theme.Sections.register('search-template', theme.SearchTemplateSection);
  }); //Example registering a section manually with custom onload callback
  // theme.Sections.register('video', theme.VideoManager, function() {
  //   theme.checkViewportFillers();
  //   theme.assessAltLogo();
  // });
  //Register dynamically pulled in sections

  if (cc.sections.length) {
    cc.sections.forEach(function (section) {
      try {
        theme.Sections.register(section.name, section.section);
      } catch (err) {
        console.error("Unable to register section ".concat(section.name, "."), err);
      }
    });
  } else {
    console.warn('Barry: No common sections have been registered.');
  }
})(theme.jQuery);  
/* Built with Barry v1.0.7 */