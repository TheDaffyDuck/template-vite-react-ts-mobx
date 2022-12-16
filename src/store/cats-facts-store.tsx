import { observable, action, makeObservable } from "mobx";

export type CatsFacts = {
  text: string;
  like: boolean;
};

class CatsFactsStore {
  constructor() {
    makeObservable(this);
  }
  @observable catsFacts: CatsFacts[] = [];

  @action getCatsFacts = async () => {
    await fetch("https://meowfacts.herokuapp.com/?count=12")
      .then((res) => res.json())
      .then((res) =>
        Object.values(res.data as [string]).map((_) =>
          this.catsFacts.push({
            text: _,
            like: false,
          })
        )
      )
      .catch((err) => console.error(err));
  };

  @action
  removeCatsFact = (catsFact: CatsFacts) => {
    this.catsFacts.splice(this.catsFacts.indexOf(catsFact), 1);
  };

  @action
  likeCatsFact = (catsFact: CatsFacts) => {
    this.catsFacts[this.catsFacts.indexOf(catsFact)].like =
      !this.catsFacts[this.catsFacts.indexOf(catsFact)].like;
  };
}
export const catsFactsStore = new CatsFactsStore();
