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

  filter() {
    return this.state.deals;
  }

  setDeals(data) {

    /*

    * Normalise

    * 'Broadband' and 'Fibre Broadband' should be considered the same product.
    * 'Phone' should be ignored.

    ! favour Broadband over Fibre Broadband for filter match type

    */

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].productTypes.length; j++) {

        if (data[i].productTypes[j] === "Phone") {
          data[i].productTypes.splice(j, 1);
        }

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
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
