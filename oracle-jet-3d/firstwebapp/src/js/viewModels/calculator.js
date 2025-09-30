define(["knockout","ojs/ojradioset","ojs/ojlabel","ojs/ojinputnumber"],function(ko) {
  function CalculatorViewModel() {
    var self=this;
  self.input1 = ko.observable(0);
  self.input2 = ko.observable(0);
  self.operation = ko.observable('add');

    self.result = ko.computed(function() {
      var val1 = parseFloat(self.input1());
      var val2 = parseFloat(self.input2());
      if (isNaN(val1) || isNaN(val2)) {
        return 'Invalid input';
      }
      switch (self.operation()) {
        case 'add':
          return val1 + val2;
        case 'subtract':
          return val1 - val2;
        case 'multiply':
          return val1 * val2;
        case 'divide':
          return val2 !== 0 ? val1 / val2 : 'Cannot divide by zero';
        default:
          return 'Unknown operation';
      }
    },self);
  }
  return CalculatorViewModel;
});