import { logging } from "near-sdk-as";
import { JSON } from "assemblyscript-json";
import { CampaingList } from "./models";

const campaingsList = new CampaingList();

export function createCampaing(
  name: string,
  description: string,
  location: string,
  goal: i64,
  passPhrase: string
): void {
  const result = campaingsList.createCampaing(
    name,
    description,
    location,
    goal,
    passPhrase
  );
  if (typeof result === "string") {
    logging.log(result);
  } else {
    // logging.log();
  }
}

export function getCampaing(name: string): void {
  const result = campaingsList.getCampaing(name);
  if (typeof result === "string") {
    logging.log(result);
  } else {
    // logging.log();
  }
}

export function getCampaingsList(): void {
  const result = campaingsList.getCampaingsList();
  if (typeof result === "string") {
    logging.log(result);
  } else {
    // logging.log();
  }
}

export function deleteCampaing(name: string, passPhrase: string): void {
  const result = campaingsList.deleteCampaing(name, passPhrase);
  if (typeof result === "string") {
    logging.log(result);
  } else {
    // logging.log();
  }
}
