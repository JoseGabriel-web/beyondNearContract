import * as contract from "../index";

describe("Create campaing tests", () => {
  it("Should create a campaing and not trow error", () => {
    expect(() => {
      contract.createCampaing(
        "test",
        "For testing purposes.",
        "RD, Dominican Republic.",
        10
      );
    }).not.toThrow();
  });
  it("Should fail with empty categorie", () => {
    expect(() => {
      contract.createCampaing(
        "",
        "For testing purposes.",
        "RD, Dominican Republic.",
        10
      );
    }).toThrow();
  });
  it("Should fail with empty objectives", () => {
    expect(() => {
      contract.createCampaing("test", "", "RD, Dominican Republic.", 10);
    }).toThrow();
  });
  it("Should fail with empty location", () => {
    expect(() => {
      contract.createCampaing("test", "For testing purposes.", "", 10);
    }).toThrow();
  });
  it("Should fail with negative goal", () => {
    expect(() => {
      contract.createCampaing("test", "For testing purposes.", "", -1);
    }).toThrow();
  });
});

describe("Get Campaing tests", () => {
  it("Should get a campaing and not trow error", () => {
    expect(() => {
      contract.getCampaing(0);
    }).not.toThrow();
  });
  it("Should fail with negative number", () => {
    expect(() => {
      contract.getCampaing(-1);
    }).toThrow();
  });
});
