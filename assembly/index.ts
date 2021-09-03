import { Context, PersistentVector, logging } from "near-sdk-as";
import Campaing from "./models/Campaing";

const campaingsList = new PersistentVector<Campaing>("Campaings");

export function createCampaing(
  categorie: string,
  objectives: string,
  location: string,
  goal: i32
): void {
  assert(categorie.length > 0, "Name field can not be empty.");
  assert(objectives.length > 0, "Description field can not be empty.");
  assert(location.length > 0, "Location field can not be empty.");
  assert(
    goal > 0,
    "Please select the desire funds (which can not be negative numbers or zero) for this campaing."
  );
  campaingsList.push(
    new Campaing(
      campaingsList.length + 1,
      Context.sender,
      categorie,
      objectives,
      location,
      goal
    )
  );
}

export function getCampaing(id: i32): Campaing {
  if (!campaingsList.containsIndex(id)) {
    throw new Error("Campaing not found");
  }
  return campaingsList[id];
}

export function getCampaings(): Campaing[] {
  const result: Campaing[] = new Array<Campaing>(campaingsList.length);
  for (let i = 0; i < campaingsList.length; i++) {
    result[i] = campaingsList[i];
  }
  return result;
}

export function donate(campaingID: i32, cuantity: i32): Campaing {
  if (!campaingsList.containsIndex(campaingID)) {
    throw new Error("Campaing not found");
  }
  if (cuantity < 1) {
    throw new Error("Donation cuantity should be more than 0.");
  }
  let campaing = campaingsList[campaingID];
  if (campaing.remaining === 0) {
    throw new Error("Goal has already been met, thanks for your donations.");
  }
  if (cuantity > campaing.remaining) {
    throw new Error("Donation cuantity will surpase goal.");
  }
  campaing.fundsRaised = cuantity + campaing.fundsRaised;
  campaing.remaining = campaing.remaining - cuantity;
  campaingsList.replace(campaingID, campaing);
  return campaing;
}

export function deleteCampaing(id: i32): void {
  if (!campaingsList.containsIndex(id)) {
    logging.log("Campaing not found");
    return;
  }
  let result = "";
  if (<String>campaingsList[id].nearAccountID == <String>Context.sender) {
    campaingsList.swap_remove(id);
    result = "Campaing successfully deleted.";
  } else {
    result = "Campaing can only be deleted by creator.";
  }
  logging.log(result);
}
