
    /*
     * FD Calculator ViewModel
     */
    define(["knockout", "ojs/ojchart"], function(ko) {
      function FDCalculatorViewModel() {
        var self = this;
        // Inputs
        self.principal = ko.observable(0);
        self.rate = ko.observable(0); // annual interest rate in %
        self.tenure = ko.observable(1); // in years
        self.frequency = ko.observable(1); // compounding frequency per year (default yearly)

        // Computed maturity amount
        self.maturityAmount = ko.computed(function() {
          var P = parseFloat(self.principal());
          var r = parseFloat(self.rate()) / 100;
          var t = parseFloat(self.tenure());
          var n = parseInt(self.frequency());
          if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || P <= 0 || r <= 0 || t <= 0 || n <= 0) {
            return '';
          }
          var A = P * Math.pow(1 + r / n, n * t);
          return A.toFixed(2);
        });

        // Computed interest earned
        self.interestEarned = ko.computed(function() {
          var P = parseFloat(self.principal());
          var maturity = parseFloat(self.maturityAmount());
          if (isNaN(P) || isNaN(maturity)) {
            return '';
          }
          return (maturity - P).toFixed(2);
        });

        // Chart data for oj-chart
        self.chartData = ko.computed(function() {
          var invested = parseFloat(self.principal());
          var profit = parseFloat(self.interestEarned());
          if (isNaN(invested) || isNaN(profit) || invested <= 0 || profit < 0) {
            return [];
          }
          return [
            { name: 'Invested', items: [invested] },
            { name: 'Profit', items: [profit] }
          ];
        });
      }
      return FDCalculatorViewModel;
    });
