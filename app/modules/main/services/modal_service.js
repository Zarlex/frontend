/**
 * Created by zarges on 05/12/15.
 */
'use strict';

angular.module('ZeroDay')

  .service('Modal', function ($rootScope, $templateCache, $document, $compile, $controller, $q, $templateRequest, $timeout) {

    var _body = $document.find('body').eq(0),
      _openedModals = [];

    var Modal = function (modalOptions, bootStrapModalOptions) {

      var _id = modalOptions.templateUrl,
        _scope = modalOptions.scope || $rootScope,
        _scopeAttributes = modalOptions.scopeAttributes || {},
        _controller = modalOptions.controller,
        _class = modalOptions.class || '',
        _holderEl = modalOptions.el ? modalOptions.el : 'body .view',
        _bootStrapModalOptions = bootStrapModalOptions || {backdrop: 'static'},
        _modalOpened = false,
        _self = this,
        _modal,
        _usedScope,
        _bootstrapModal;

      var _getTemplate = function () {
        if (!_id) {
          throw new Error('Modal service: templateUrl options is required.');
        }
        return $templateRequest(_id);
      };

      var _bindModalCloseEvent = function () {
        _bootstrapModal.on('hidden.bs.modal', function () {
          _self.destroy();
        });
      };

      var _destroyOnRouteChange = function () {
        var changeLocationOff = $rootScope.$on('$locationChangeStart', function (ev, newUrl) {
          if (_bootstrapModal && _modalOpened) {
            ev.preventDefault();
            _self.hide().then(function () {
              document.location.href = newUrl;
              changeLocationOff();
            });
          } else {
            changeLocationOff();
          }
        });
      };

      var _buildModal = function () {
        var dfd = $q.defer();

        _usedScope = _scope.$new();

        _.extend(_usedScope, _scopeAttributes);

        if (_controller) {
          $controller(_controller, {$scope: _usedScope, modalId: _id});
        }

        _scope.hideModal = function () {
          return _self.hide();
        };

        _getTemplate().then(function (template) {
          _modal = $compile(template.trim())(_usedScope);
          _usedScope.$on('COMPILE:FINISHED', function () {
            _modal.addClass('zd-modal');
            _modal.addClass(_class);
            _bootstrapModal = _modal.find('.modal');
            _bootStrapModalOptions.show = false;
            _bootstrapModal.modal(_bootStrapModalOptions);

            _bootstrapModal.data()['bs.modal'].backdrop = function (callback) {
              $bootstrapBackdrop.call(_bootstrapModal.data()['bs.modal'], callback, $(_holderEl).find('.modal'));
            };
            /* jshint ignore:end */

            _bindModalCloseEvent();
            _destroyOnRouteChange();
            dfd.resolve();
          });
        });

        return dfd.promise;
      };

      this.id = _id;

      this.getScope = function () {
        return _scope;
      };

      this.show = function () {
        _body.css({
          height: '100%',
          width: '100%',
          overflow: 'hidden'
        });
        _buildModal().then(function () {
          angular.element(_holderEl).append(_modal);
          _bootstrapModal.modal('show');
          _modalOpened = true;
          _openedModals.push(this);
        }.bind(this));
      };


      this.setScopeAttributes = function (obj) {
        if (_.isObject(obj)) {
          _.extend(_scopeAttributes, obj);
        }
      };

      this.hide = function () {
        var dfd = $q.defer();
        if (_bootstrapModal && _modalOpened) {
          _bootstrapModal.one('hidden.bs.modal', function () {
            _bootstrapModal.off();
            _self.destroy();
            _modalOpened = false;
            dfd.resolve();
          });
          _bootstrapModal.modal('hide');
        } else {
          dfd.resolve();
        }

        return dfd.promise;
      };

      this.toggle = function () {
        _bootstrapModal.modal('toggle');
      };

      this.destroy = function () {
        _openedModals = _.without(_openedModals, this);

        $timeout(function () {
          _body.css({
            height: '',
            width: '',
            overflow: ''
          });
          if (_modal) {
            _modal.remove();
            _modalOpened = false;
          }

          if (_usedScope) {
            _usedScope.$destroy();
          }
        }.bind(this));
      };

      (function main() {

        _getTemplate();

        _scope.$on('$destroy', function () {
          _self.hide();
        });

      })();

    };

    this.create = function (modalOptions) {
      return new Modal(modalOptions);
    };

    this.prepare = function (modalOptions, bootstrapModalOptions) {
      var ModalDefinition = function () {
        return new Modal(modalOptions, bootstrapModalOptions);
      };
      return ModalDefinition;
    };

    this.getOpenedModals = function () {
      return _openedModals;
    };
  });

/* jshint ignore:start */
// This is the orginal bootstrap backdrop implementation with the only
// modification that the element can be defined as parameter where the backdrop should be placed
var $bootstrapBackdrop = function (callback, holderEl) {
  var animate = this.$element.hasClass('fade') ? 'fade' : '';

  if (this.isShown && this.options.backdrop) {
    var doAnimate = $.support.transition && animate;

    this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
      .appendTo(holderEl);

    this.$backdrop.on('click', $.proxy(function (e) {
      if (e.target !== e.currentTarget) {
        return;
      }
      this.options.backdrop == 'static'
        ? this.$element[0].focus.call(this.$element[0])
        : this.hide.call(this)
    }, this));

    if (doAnimate) {
      this.$backdrop[0].offsetWidth;
    } // force reflow

    this.$backdrop.addClass('in');

    if (!callback) return;

    doAnimate ?
      this.$backdrop
        .one($.support.transition.end, callback)
        .emulateTransitionEnd(150) :
      callback()

  } else if (!this.isShown && this.$backdrop) {
    this.$backdrop.removeClass('in');

    $.support.transition && this.$element.hasClass('fade') ?
      this.$backdrop
        .one($.support.transition.end, callback)
        .emulateTransitionEnd(150) :
      callback()

  } else if (callback) {
    callback()
  }
};
/* jshint ignore:end */
