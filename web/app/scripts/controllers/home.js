(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];

  function HomeCtrl() {
    /* jshint validthis: true */
    var vm = this;
    vm.timeline = [{
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      title: 'Heading',
      content: 'More awesome content.',
      isMe: 1
    }];


    vm.animateElementIn = animateElementIn;
    vm.animateElementOut = animateElementOut;


    function animateElementIn($el) {
      $el.children().addClass('animated pulse');
    }
    function animateElementOut($el) {
      $el.children().removeClass('animated pulse');
    }
  }

})();
