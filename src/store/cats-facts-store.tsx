import { observable, action, makeObservable } from "mobx";

class CatsFactsStore {
  constructor() {
    makeObservable(this);
  }
  @observable catsFacts = [] as any;

  @action getCatsFacts = async () => {
    await fetch("https://meowfacts.herokuapp.com/?count=12")
      .then((res) => res.json())
      .then((res) =>
        Object.values(res.data).map((_, key) =>
          this.catsFacts.push({
            id: key,
            text: _,
            like: false,
          })
        )
      )
      .catch((err) => console.error(err));
  };

  @action
  removeCatsFact = (catsFact: any) => {
    this.catsFacts.splice(this.catsFacts.indexOf(catsFact), 1);
  };

  @action
  likeCatsFact = (catsFact: any) => {
    this.catsFacts[this.catsFacts.indexOf(catsFact)].like =
      !this.catsFacts[this.catsFacts.indexOf(catsFact)].like;
  };
}
export const catsFactsStore = new CatsFactsStore();
