import React from "react";
import { observer } from "mobx-react";
import "./style.css";
import { catsFactsStore } from "../store/cats-facts-store";

interface Props {
  showFavorites: boolean;
}

class FactGrid extends React.Component<Props> {
  componentDidMount() {
    void catsFactsStore.getCatsFacts();
  }

  render() {
    const items = catsFactsStore.catsFacts;
    return (
      <div className="masonry">
        {items ? (
          items.map((todo: any) =>
            this.props.showFavorites ? (
              todo.like ? (
                <div key={todo.id} className="brick">
                  <div className="brick-body">
                    <div className="text-area">
                      <p>{todo.text}</p>
                    </div>
                    <div className="buttons-area">
                      <p
                        onClick={() => catsFactsStore.removeCatsFact(todo)}
                        className="dislike"
                      >
                        <i className="fa fa-trash-alt" aria-hidden="true" />
                      </p>
                      <p
                        onClick={() => catsFactsStore.likeCatsFact(todo)}
                        className={`${todo.like && "true"} like`}
                      >
                        <i className="fa fa-heart" aria-hidden="true" />
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            ) : (
              <div key={todo.id} className="brick">
                <div className="brick-body">
                  <div className="text-area">
                    <p>{todo.text}</p>
                  </div>
                  <div className="buttons-area">
                    <p
                      onClick={() => catsFactsStore.removeCatsFact(todo)}
                      className="dislike"
                    >
                      <i className="fa fa-trash-alt" aria-hidden="true" />
                    </p>
                    <p
                      onClick={() => catsFactsStore.likeCatsFact(todo)}
                      className={`${todo.like && "true"} like`}
                    >
                      <i className="fa fa-heart" aria-hidden="true" />
                    </p>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <p>looks like there's nothing here</p>
        )}
      </div>
    );
  }
}

export default observer(FactGrid);
