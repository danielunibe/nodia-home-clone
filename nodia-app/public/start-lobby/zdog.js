/* Refactor loader for zdog.js.
   Source split into <= 220 line components under ./refactor/js/zdog-js/ */
(function () {
  'use strict';
  var parts = [
    './refactor/js/zdog-js/part-001.jsfrag',
    './refactor/js/zdog-js/part-002.jsfrag',
    './refactor/js/zdog-js/part-003.jsfrag',
    './refactor/js/zdog-js/part-004.jsfrag',
    './refactor/js/zdog-js/part-005.jsfrag',
    './refactor/js/zdog-js/part-006.jsfrag',
    './refactor/js/zdog-js/part-007.jsfrag',
    './refactor/js/zdog-js/part-008.jsfrag',
    './refactor/js/zdog-js/part-009.jsfrag',
    './refactor/js/zdog-js/part-010.jsfrag',
    './refactor/js/zdog-js/part-011.jsfrag',
    './refactor/js/zdog-js/part-012.jsfrag',
    './refactor/js/zdog-js/part-013.jsfrag',
    './refactor/js/zdog-js/part-014.jsfrag',
    './refactor/js/zdog-js/part-015.jsfrag',
    './refactor/js/zdog-js/part-016.jsfrag',
    './refactor/js/zdog-js/part-017.jsfrag',
    './refactor/js/zdog-js/part-018.jsfrag',
    './refactor/js/zdog-js/part-019.jsfrag',
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
  (0, eval)(source + '\n//# sourceURL=' + JSON.stringify('zdog.js.bundle.js'));
})();
