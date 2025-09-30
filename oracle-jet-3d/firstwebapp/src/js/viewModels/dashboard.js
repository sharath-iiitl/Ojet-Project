/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['../accUtils','knockout','ojs/ojchart','text!data/data.json','ojs/ojarraydataprovider','ojs/ojselectsingle'],
 function(accUtils,ko,chart,file,ArrayDataProvider) {
    function DashboardViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      var self= this;
      self.name = ko.observable("Purushotham");
      // Add dob observable
      self.dob = ko.observable("");
      // Computed age from dob
      self.age = ko.computed(function() {
        var dobStr = self.dob();
        if (!dobStr) return "";
        var dob = new Date(dobStr);
        if (isNaN(dob.getTime())) return "Invalid date";
        var today = new Date();
        var age = today.getFullYear() - dob.getFullYear();
        var m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age;
      });
        
      var data = [
                    {name:"Pedestrians", items:[42]},
                    {name:"Vehicles", items:[82]},
                    {name:"Bicycles", items:[20]},
                    {name:"Busses", items:[76]},
                    {name:"Trains", items:[31]}
                  
                  ];

      self.datasource = ko.observableArray(data);

      var data2 = JSON.parse(file);
      self.datasource2 = ko.observableArray(data2);


      self.selectVal = ko.observable('pie');

    var chartoptions = [
        { value: 'pie', label: 'pie' },
        { value: 'bar', label: 'bar' }
      ];
  
    self.chartsDP = new ArrayDataProvider(chartoptions, { keyAttributes: 'value' });
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
