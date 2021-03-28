import Store from "../Store";
import mockData from "../../../public/db.json";

const ArrEmpty = [],
  StrEmpty = null;

describe("filters", () => {

  it("should return all deals when no filters applied", () => {
    // Arrange
    const sut = new Store();
    sut.setDeals(mockData.deals);

    // Act
    const result = sut.deals;

    // Assert
    expect(result).toEqual(mockData.deals);
  });

  // ! return empty filter list when empty`
  it("should return empty filter list when no filters selected", () => {
    const st = new Store();
    const result = st.filters;
    expect(result).toEqual(ArrEmpty);
  })

  // ! return empty provider list when empty
  it("should return empty provider list when no filters selected", () => {
    const st = new Store();
    const result = st.provider;
    expect(result).toBeNull();
  })

  // ! return !empty filter list when !empty
  it("should return empty filter list when no filters selected", () => {
    const st = new Store();
    const result = st.filters;

    expect(result).toEqual(ArrEmpty);
  })

  // ! return !empty provider list when !empty
  it("should return empty provider list when no filters selected", () => {
    const st = new Store();
    const result = st.provider;

    expect(result).toBeNull();
  })

  // ! should add to filter to empty filter list
  it("should return value when adding to empty filter list", () => {
    const st = new Store();

    st.setProductFilter("Broadband");

    const result = st.filters;
    expect(result).toHaveLength(1)

  })

  // ! WHEN filtering by broadband THEN show the 4 broadband only deals
  it("should return two filters when two filters selected", () => {

    const st = new Store();
    st.setDeals(mockData.deals);

    st.setProductFilter("Broadband");
    st.setProductFilter("TV");

    const result = st.filters;
    expect(result).toHaveLength(2);

    expect(result).toEqual(
      expect.arrayContaining(["broadband", "tv"])
    )

  })

  it("should return four broadband only deals when filtering by broadband", () => {

    const st = new Store();
    st.setDeals(mockData.deals);

    st.setProductFilter("Broadband")

    const expected = [
      {
        "id": 6158,
        "title": "Unlimited Broadband",
        "provider": {
          "id": 116,
          "name": "Origin Broadband"
        },
        "cost": {
          "upfrontCost": 0.00,
          "totalContractCost": 233.88
        },
        "productTypes": ["Broadband"],
        "contractLength": 12
      }, {
        "id": 4359,
        "title": "Unlimited Broadband & Unlimited UK & Mobile Calls",
        "provider": {
          "id": 42,
          "name": "Plusnet"
        },
        "cost": {
          "upfrontCost": 10.00,
          "totalContractCost": 383.87
        },
        "productTypes": ["Broadband"],
        "contractLength": 18
      }, {
        "id": 4371,
        "title": "Unlimited Fibre Extra",
        "provider": {
          "id": 42,
          "name": "Plusnet"
        },
        "cost": {
          "upfrontCost": 25.00,
          "totalContractCost": 564.82
        },
        "productTypes": ["Broadband"],
        "contractLength": 18
      }, {
        "id": 5459,
        "title": "Unlimited Fibre Extra & Evening & Weekend UK & Mobile Calls",
        "provider": {
          "id": 42,
          "name": "Plusnet"
        },
        "cost": {
          "upfrontCost": 25.00,
          "totalContractCost": 636.82
        },
        "productTypes": ["Broadband"],
        "contractLength": 18
      }



    ]

    const result = st.deals;
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual(expected)

  })

  it("should return no data only tv is selected", () => {

    const st = new Store()
    st.setDeals(mockData.deals);

    st.setProductFilter("TV");
    const result = st.deals;
    expect(result).toStrictEqual([])

  });

  it("should return no data only mobile is selected", () => {

    const st = new Store()
    st.setDeals(mockData.deals);

    st.setProductFilter("Mobile");
    const result = st.deals;
    expect(result).toStrictEqual([])

  });

  // ! WHEN filtering by broadband AND tv THEN show the 4 deals for broadband and tv only
  it("should return four broadband and tv only deals when filtering by broadband and tv", () => {

    const st = new Store()
    st.setDeals(mockData.deals)

    const expected = [
      {
        "id": 6074,
        "title": "Starter + Unlimited Infinity 1 + Weekend Calls",
        "provider": {
          "id": 3,
          "name": "BT"
        },
        "cost": {
          "upfrontCost": 34.99,
          "totalContractCost": 436.87
        },
        "productTypes": ["TV", "Broadband"],
        "contractLength": 12
      },
      {
        "id": 5738,
        "title": "Starter + Unlimited Broadband + Weekend Calls",
        "provider": {
          "id": 3,
          "name": "BT"
        },
        "cost": {
          "upfrontCost": 59.99,
          "totalContractCost": 383.87
        },
        "productTypes": ["TV", "Broadband"],
        "contractLength": 12
      },
      {
        "id": 6165,
        "title": "TV & Superfast Fibre & Weekend Calls",
        "provider": {
          "id": 48,
          "name": "EE"
        },
        "cost": {
          "upfrontCost": 32.00,
          "totalContractCost": 689.00
        },
        "productTypes": ["TV", "Broadband"],
        "contractLength": 18
      }
      , {
        "id": 6468,
        "title": "Sports Bundle 2 Packs + Broadband Unlimited",
        "provider": {
          "id": 1,
          "name": "Sky"
        },
        "cost": {
          "upfrontCost": 39.95,
          "totalContractCost": 1263.77
        },
        "productTypes": ["TV", "Broadband"],
        "contractLength": 18
      }

    ]

    st.setProductFilter("Broadband")
    st.setProductFilter("TV")

    const result = st.deals;
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual(expected);


  })


  // ! WHEN filtering by broadband AND mobile THEN show the 1 deal for broadband and mobile only
  it("should return one broadband and mobile only deal when filtering by broadband and mobile", () => {

    const st = new Store();
    st.setDeals(mockData.deals);

    st.setProductFilter('Broadband');
    st.setProductFilter('Mobile');

    const expected = [{
      "id": 4276,
      "title": "Unlimited Broadband + Weekend Calls + BT Mobile",
      "provider": {
        "id": 3,
        "name": "BT"
      },
      "cost": {
        "upfrontCost": 9.99,
        "totalContractCost": 393.87
      },
      "productTypes": ["Broadband", "Mobile"],
      "contractLength": 12
    }];
    const result = st.deals;
    expect(result).toStrictEqual(expected)

  })


  // ! WHEN filtering by Sky THEN show the 1 deal for Sky only
  it("should return one sky only deal when filtering by Sky", () => {
    const st = new Store();
    st.setDeals(mockData.deals);

    st.setProviderFilter(1);

    const expected = [{
      "id": 6468,
      "title": "Sports Bundle 2 Packs + Broadband Unlimited",
      "provider": {
        "id": 1,
        "name": "Sky"
      },
      "cost": {
        "upfrontCost": 39.95,
        "totalContractCost": 1263.77
      },
      "productTypes": ["TV", "Broadband", "Phone"],
      "contractLength": 18
    }];
    const result = st.deals;
    expect(result).toStrictEqual(expected);

  })

  // ! WHEN filtering by BT, broadband AND tv THEN show the 2 deals for BT with broadband and tv only
  it("should return two deals for BT with broadband and tv only when filtering by BT, broadband and tv", () => {

    const st = new Store();
    st.setDeals(mockData.deals);

    st.setProviderFilter(3);
    st.setProductFilter("Broadband")
    st.setProductFilter("TV")

    const expected = [
      {
        "id": 6074,
        "title": "Starter + Unlimited Infinity 1 + Weekend Calls",
        "provider": {
          "id": 3,
          "name": "BT"
        },
        "cost": {
          "upfrontCost": 34.99,
          "totalContractCost": 436.87
        },
        "productTypes": ["TV", "Broadband"],
        "contractLength": 12
      }, {
        "id": 5738,
        "title": "Starter + Unlimited Broadband + Weekend Calls",
        "provider": {
          "id": 3,
          "name": "BT"
        },
        "cost": {
          "upfrontCost": 59.99,
          "totalContractCost": 383.87
        },
        "productTypes": ["TV", "Broadband"],
        "contractLength": 12
      }
    ];
    const result = st.deals;
    expect(result).toStrictEqual(expected);

  })


});
