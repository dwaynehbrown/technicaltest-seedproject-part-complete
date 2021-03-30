import mockData from "../../../public/db.json";

describe("api", () => {

    it("should be defined", () => {

        expect(mockData).toBeDefined();
        expect(mockData.deals).toBeDefined();
        expect(mockData).toEqual(expect.any(Object))
        expect(mockData.deals).toEqual(expect.any(Array))

    });

})