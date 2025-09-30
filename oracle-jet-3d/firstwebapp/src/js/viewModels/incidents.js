/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['../accUtils','knockout', 'ojs/ojcollectiondataprovider', "ojs/ojmodel", "ojs/ojtable"],
 function(accUtils, ko, CollectionDataProvider, Model, Table) {
    function IncidentsViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.



        var self = this;

        // Setup the service URL
        self.serviceURL = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";

        // Determine the structure/fields for the Model
        self.parseData = function(response) {
            return {name: response['name'], short_desc: response['short_desc']};
        };

        // Extend the model class for creating Department Model
        self.Department = Model.Model.extend({
            urlRoot: self.serviceURL,
            parse: self.parseData,
            idAttribute: 'id'
        });

        // We create a Model object
        self.myDept = new self.Department();

        // Extend the collection class 
        self.DeptCollection = Model.Collection.extend({
            url: self.serviceURL + "?limit=50",
            model: self.myDept
        });

        // We create the collection object
        self.DeptCol = ko.observable();
        self.DeptCol(new self.DeptCollection());

        // Connect the collection object to the table datasource
        self.datasource = ko.observable();
        self.datasource(new CollectionDataProvider(self.DeptCol()));


      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Incidents page loaded.', 'assertive');
        document.title = "Incidents";
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
    return IncidentsViewModel;
  }
);
