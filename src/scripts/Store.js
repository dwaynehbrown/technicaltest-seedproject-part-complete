import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null
    };
  }

  get deals() {
    return this.filter();
  }

  get filters() {
    // ! return providers 
    // ? Introduce filters here
    // ? return filters names from filters list

    return this.state.productFilters;
  }

  get provider() {
    // ! return provider filter
    return this.state.providerFilter;
  }

  filter() {

    // console.log(this.state);
    let count = 0, filteredDeals = [];

    if (this.state.productFilters.length == 0) {
      // * <no filters>

      filteredDeals = this.state.deals;

      // ! </no filters>
    } else if (this.state.productFilters.length == 1) {
      // * <single product filter>

      filteredDeals = this.state.deals
        /* 
        
        Phone is removed on entry
        Broadband is updated on entry
  
        ! focus on $filter only items and not $filter $and items
        
        */

        .filter(deal => deal.productTypes.length === 1)
        .filter(deal => deal.productTypes[0].toLowerCase() === this.state.productFilters[0].toLowerCase());

      // ! </single product filter>
    } else {
      /* 
      * <multiple product filters>
      ! show items that contain a list of BOTH $filters only
 
      */
      filteredDeals = this.state.deals
        .map(deal => {
          deal.matchTypes = deal.productTypes.map(type => type.toLowerCase())
          return deal;
        })
        .filter(deal => deal.matchTypes.length === this.state.productFilters.length)
        .filter(deal => {

          let matches = 0;

          for (let i = 0; i < this.state.productFilters.length; i++) {

            if (deal.matchTypes
              .includes(this.state.productFilters[i].toLowerCase())
            ) {
              matches++;
            }
          }

          delete deal.matchTypes;

          return (matches == this.state.productFilters.length);
        })


      // ! </multiple product filters>
    }

    // * <Provieder filters>
    // ! One provider at a time

    if (!! this.state.providerFilter) {

      // console.log ('filtered deals before filter  ', filteredDeals);

      filteredDeals = filteredDeals
        .filter(deal => deal.provider.id == this.state.providerFilter)

    }

    // ! </Provider filters>

    // * Return

    // console.log('filtered deals ', filteredDeals)
    return filteredDeals;

  }



  setDeals(data) {

    // remove "Phone"
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].productTypes.length; j++) {

        // ! 'Phone' should be ignored.
        if (data[i].productTypes[j] === "Phone") {
          data[i].productTypes.splice(j, 1);
        }

        // ! 'Broadband' and 'Fibre Broadband' should be considered the same product.
        if (data[i].productTypes[j] === "Fibre Broadband") {
          data[i].productTypes.splice(j, 1);
          data[i].productTypes.push("Broadband");
        }

      }

    }

    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
    console.log('set product filter: ', this.state)
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);

    console.log('set provider filter: ', this.state)

  }



}

export default Store;
