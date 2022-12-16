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
          items.map((_, key) =>
            this.props.showFavorites ? (
              _.like ? (
                <div key={key} className="brick">
                  <div className="brick-body">
                    <div className="text-area">
                      <p>{_.text}</p>
                    </div>
                    <div className="buttons-area">
                      <p
                        onClick={() => catsFactsStore.removeCatsFact(_)}
                        className="dislike"
                      >
                        <i className="fa fa-trash-alt" aria-hidden="true" />
                      </p>
                      <p
                        onClick={() => catsFactsStore.likeCatsFact(_)}
                        className={`${_.like && "true"} like`}
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
              <div key={key} className="brick">
                <div className="brick-body">
                  <div className="text-area">
                    <p>{_.text}</p>
                  </div>
                  <div className="buttons-area">
                    <p
                      onClick={() => catsFactsStore.removeCatsFact(_)}
                      className="dislike"
                    >
                      <i className="fa fa-trash-alt" aria-hidden="true" />
                    </p>
                    <p
                      onClick={() => catsFactsStore.likeCatsFact(_)}
                      className={`${_.like && "true"} like`}
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
