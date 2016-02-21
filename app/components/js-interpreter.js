import Ember from 'ember';

import template from '../templates/components/js-interpreter';

export default Ember.Component.extend({
  layout: template,
  myInterpreter: null,
  result: null,
  editMode: true,
  iterations: 0,
  codeHeight: 0,
  graph: null,
  running: false,

  myStyle: function(aaa){
    var style = 'height: ${aaa}px\;';
    return style.htmlSafe();
  },

  // make graph bar data
  resultChanged: Ember.observer('result', function() {
    var self = this;
    var numArr = null;
    if(this.get('result')) {
      numArr = self.get('result').split(",");
    }
    this.set("graph", numArr);
  }),

  // change of algorithm -> reinit data
  codeChange: Ember.observer("code", function() {
    this.set('myInterpreter', null);
    this.set('result', null);
    this.set('editMode', true);
    this.set('iterations', 0);
    this.set('codeHeight', 0);
    this.set('graph', null);
    this.set("running", false);
  }),
  createSelection(start, end) {
    var field = document.getElementById('code');
    if(field) {
      if (field.createTextRange) {
        var selRange = field.createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end);
        selRange.select();
      } else if (field.setSelectionRange) {
        field.setSelectionRange(start, end);
      } else if (field.selectionStart) {
        field.selectionStart = start;
        field.selectionEnd = end;
      }
      field.focus();
    }
  },
  initInterpreter(code) {
    var self = this;
    var initFunc = function(interpreter, scope) {

      // callback function from runnable code
      var inspect = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(self.set("result", text));
      };
      interpreter.setProperty(scope, 'inspect', interpreter.createNativeFunction(inspect));

      // callback function from runnable code
      var wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(alert(text));
      };
      interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
    };

    this.myInterpreter = new Interpreter(code, initFunc);
  },
  getNodesStartEnd(interpreter){
    if (interpreter.stateStack[0]) {
      var node = interpreter.stateStack[0].node;
      var start = node.start;
      var end = node.end;
    } else {
      var start = 0;
      var end = 0;
    }
    return [start, end];
  },
  runCode(self, interpreter, recursive) {
    Ember.run.later(function() {
      if(self.get("running") === true) {
        var startEnd = self.getNodesStartEnd(interpreter);
        self.createSelection(startEnd[0], startEnd[1]);

        try {
          var ok = interpreter.step()
          if(ok){
            self.set("iterations", self.get("iterations")+1);
            if(recursive) {
              self.runCode(self, interpreter, recursive);
            }
          }
        } finally {
          if(!ok){
            self.set("running", false);
          }
        }
      }
    }, 1)
  },
  actions: {
    startEdition() {
      this.set("editMode", true);
      this.set("running", false);
    },
    parseButton(code) {
      this.set("codeHeight", $(".cm-s-solarized").height()+100);
      this.set("editMode", false);
      this.initInterpreter(code);
    },
    stepButton(code) {
      this.set("running", true);
      this.runCode(this, this.myInterpreter, false);
    },
    runSlowButton(code) {
      this.set("running", true);
      this.runCode(this, this.myInterpreter, true);
    },
    runButton(code) {
      this.set("iterations", 0);
      this.set("running", true);
      this.myInterpreter.run();
      this.initInterpreter(code);
      this.set("running", false);
    },
    pauseButton() {
      this.set("running", false);
    },
  }
});
