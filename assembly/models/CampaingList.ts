import { PersistentUnorderedMap, logging, PersistentSet } from "near-sdk-as";
import Campaing from "./Campaing";

@nearBindgen
class CampaingList {
  // campaingsList: PersistentUnorderedMap<String, Campaing>;
  campaingsList: PersistentSet<Campaing>;

  constructor() {
    // this.campaingsList = new PersistentUnorderedMap("C");
    this.campaingsList = new PersistentSet("C");
  }

  createCampaing( nearAccountID: string, name: string, description: string, location: string, funds: u64 ): void {
    assert(name.length > 0, "Name field can not be empty.")
    assert(description.length > 0, "Description field can not be empty.")
    assert(location.length > 0, "Location field can not be empty.")
    assert(funds > 0, "Please select the desire funds (which can not be negative numbers or zero) for this campaing.")    
    let result: Campaing | null = new Campaing( nearAccountID, name, description, location, funds );
    assert(result, "Opps, something went wrong, try again.")
    if(result) {
      // this.campaingsList.set(name, result);
      this.campaingsList.add(result)
      logging.log(`Campaing ${name} was created successfully`);
    }    
  }
  
  getCampaing(name: string): void {
    assert(name.length > 0, "Name field can not be empty")    
    let campaingsList: Campaing[] = this.campaingsList.values();    
    let result: Campaing | null = null;
    
    for(let i = 0; i < campaingsList.length; i++) {
      let currentCampaing = campaingsList[i]
      if(currentCampaing.categorie === name) {
        result = currentCampaing
      }
    }

    assert(result, "Campaing not found.")
    if(result) {
      logging.log(result);
    }
  }  

  // getCampaingsList(): void {
  //   this.campaingsList
  //     .values(0, this.campaingsList.length)
  //     .forEach((campaing: Campaing) => {
  //       log(campaing);
  //       log("This should be a campaing");
  //       logging.log(campaing);
  //   });
  // }

  // deleteCampaing(name: string): void {
  //   const campaingToDelete = this.campaingsList.get(name);
  //   if (campaingToDelete) {
  //     if (campaingToDelete.nearAccountID === Context.sender) {
  //       this.campaingsList.delete(name);
  //       logging.log("Campaing deleted, successfully.");
  //     } else {
  //       log("Campaing can only be deleted by creator.")
  //       logging.log("Campaing can only be deleted by creator.")  
  //     }
  //   } else {
  //     log("Campaing not found.")
  //     logging.log("Campaing not found.")
  //   }
  // }
}

export default CampaingList;
