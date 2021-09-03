@nearBindgen
class Campaing {
  public id: number;
  public nearAccountID: string;
  public categorie: string;
  public objectives: string;
  public location: string;
  public goal: i32;
  public fundsRaised: i32;
  public remaining: i32;

  constructor(
    id: number,
    nearAccountID: string,
    name: string,
    description: string,
    location: string,
    goal: i32
  ) {
    this.id = id;
    this.nearAccountID = nearAccountID;
    this.categorie = name;
    this.objectives = description;
    this.location = location;
    this.goal = goal;
    this.fundsRaised = 0;
    this.remaining = goal;
  }
}

export default Campaing;
