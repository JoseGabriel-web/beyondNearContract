import { PersistentUnorderedMap } from "near-sdk-as";

export class Campaing {
  name: string;
  description: string;
  location: string;
  goal: i64;
  #passPhrase: string;

  constructor(
    name: string,
    description: string,
    location: string,
    goal: i64,
    passPhrase: string
  ) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.goal = goal;
    this.#passPhrase = passPhrase;
  }

  isCreator(passPhrase: string) {
    return this.#passPhrase === passPhrase;
  }
}

export class CampaingList {
  campaingsList: PersistentUnorderedMap<String, Campaing>;

  constructor() {
    this.campaingsList = new PersistentUnorderedMap("C");
  }

  createCampaing(
    name: string,
    description: string,
    location: string,
    goal: i64,
    passPhrase: string
  ) {
    const newCampaing = new Campaing(
      name,
      description,
      location,
      goal,
      passPhrase
    );
    this.campaingsList.set(name, newCampaing);
  }

  getCampaing(name: string): Campaing | string {
    const campaing = this.campaingsList.get(name);
    let result: Campaing | string;
    if (campaing) {
      result = campaing;
    } else {
      result = "Campaing not found.";
    }
    return result;
  }

  getCampaingsList() {
    const campaingsKeys: String[] = this.campaingsList.keys(0, -1);
    let campaings: Array<Campaing> = [];
    for (let i = 0; i < campaingsKeys.length; i++) {
      if (typeof campaingsKeys[i] === "string") {
        const currentCampaing: Campaing | null = this.campaingsList.get(
          campaingsKeys[i]
        );
        if (currentCampaing) {
          campaings.push(currentCampaing);
        }
      }
    }
    return campaings;
  }

  deleteCampaing(name: string, passPhrase: string): void | string {
    const campaingToDelete = this.campaingsList.get(name);
    if (campaingToDelete) {
      if (campaingToDelete.isCreator(passPhrase)) {
        this.campaingsList.delete(name);
      } else {
        return "Incorrect passPhrase, try again.";
      }
    }
  }
}
