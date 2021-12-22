import Isvalidname from "../tools/isvalidname";

describe("validName", () => {
  it("should render components without crashing", () => {
    const wrapper = Isvalidname("*");
    expect(wrapper).toEqual("Name may only contain alpha-numeric characters");
  });
  it("should render components without crashing", () => {
    const wrapper = Isvalidname("*343455345345345634563456345635634563456345345634");
    expect(wrapper).toEqual("Name should be under 12 alpha-numeric characters");
  });
});
