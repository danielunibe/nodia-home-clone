/* Refactor loader for tinder-engine.js.
   Source split into <= 220 line components under ./refactor/js/tinder-engine-js/ */
(function () {
  'use strict';
  var parts = [
    './refactor/js/tinder-engine-js/part-001.jsfrag?v=1.3',
    './refactor/js/tinder-engine-js/part-002.jsfrag?v=1.3',
    './refactor/js/tinder-engine-js/part-003.jsfrag?v=1.3',
    './refactor/js/tinder-engine-js/part-004.jsfrag?v=1.3',
    './refactor/js/tinder-engine-js/part-005.jsfrag?v=1.3',
  ];
  var source = '';
  for (var i = 0; i < parts.length; i += 1) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', parts[i], false);
    xhr.send(null);
    if (xhr.status >= 200 && xhr.status < 300) {
      source += xhr.responseText + '\n';
      continue;
    }
    throw new Error('Failed to load refactor component: ' + parts[i] + ' (' + xhr.status + ')');
  }
  (0, eval)(source + '\n//# sourceURL=' + JSON.stringify('tinder-engine.js.bundle.js'));
})();
