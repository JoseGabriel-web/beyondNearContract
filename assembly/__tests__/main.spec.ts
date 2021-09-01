import * as contract from "../index";

const params = {
  name: "",
  description: "",
  location: "",
  goal: 0,
};

describe("Create campaings tests", () => {
  contract.createCampaing(params.name, params.description, params.location, params.goal);
});
describe("List campaings tests", () => {
  contract.getCampaingsList();
});
describe("Delete campaings tests", () => {
  contract.deleteCampaing();
});
