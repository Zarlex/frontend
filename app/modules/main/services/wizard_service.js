/**
 * Created by zarges on 03/12/15.
 */
'use strict';

angular.module('ZeroDay')

  .service('Wizard', function () {

    var wizards = [];

    var Wizard = function (id) {

      var _steps = [],
        _currentlyActive = 0,
        _id = id;

      this._registerStep = function (step, id) {
        if (_steps.length < 1) {
          step._isActive = true;
        }
        step.slideId = id || _.uniqueId(_id + '_');
        _steps.push(step);
      };

      this._unRegisterStep = function (scope) {
        var scopeInArray = _.findWhere(_steps, {$id: scope.$id}),
          indexOfScope = _.indexOf(_steps, scopeInArray);

        if (indexOfScope > -1) {
          _steps.splice(indexOfScope, 1);
        }
      };

      this.destroy = function () {
        var self = this;
        _steps.forEach(function (step) {
          self._unRegisterStep(step);
        });
      };

      this.getId = function () {
        return _id;
      };

      this.getAllSteps = function () {
        return _steps;
      };

      this.getCurrentStep = function () {
        return _steps[_currentlyActive];
      };

      this.getCurrentStepNumber = function () {
        return _currentlyActive;
      };

      this.getCurrentStepId = function () {
        return _steps[_currentlyActive].slideId;
      };

      this.getTotalStepAmount = function () {
        return _steps.length;
      };

      this.hasNextStep = function () {
        return this.getCurrentStepNumber() < this.getTotalStepAmount() - 1;
      };

      this.hasPreviousStep = function () {
        return this.getCurrentStepNumber() > 0;
      };

      this.next = function () {
        this.goTo(_currentlyActive + 1);
      };

      this.back = function () {
        this.goTo(_currentlyActive - 1);
      };

      this.gotoStep = function (step) {

        if (typeof step === 'string') {
          step = _.findWhere(_steps, {slideId: step});
        }

        this.goTo(_.indexOf(_steps, step));
      };

      this.goTo = function (num) {
        _steps[_currentlyActive]._isActive = false;
        if (num >= _steps.length) {
          throw new Error('Step ' + (num + 1) + ' is not available');
        } else {
          _steps[num]._isActive = true;
          _currentlyActive = num;
        }
      };

    };

    var findWizard = function (id) {
      var _wizard = null;
      wizards.forEach(function (wizard) {
        if (wizard.getId === id) {
          _wizard = wizard;
        }
      });
      return _wizard;
    };

    var getWizard = function (id) {
      var _wizard = findWizard(id);
      if (!_wizard) {
        throw new Error('The wizard with the id ' + id + ' does not exist');
      } else {
        return _wizard;
      }

    };

    var createWizard = function (id) {
      if (findWizard(id)) {
        throw new Error('The wizard with the id ' + id + ' is already existing');
      } else {
        var wizard = new Wizard(id);
        wizards.push(wizard);
        return wizard;
      }
    };

    return {
      createWizard: createWizard,
      getWizard: getWizard
    };

  });

