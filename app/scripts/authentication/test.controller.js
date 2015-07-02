/*jshint -W003 */
(function() {
    'use strict';

    angular
        .module('module')
        .controller('Controller', Controller);

    Controller.$inject = ['dependencies'];

    function Controller(dependencies) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
