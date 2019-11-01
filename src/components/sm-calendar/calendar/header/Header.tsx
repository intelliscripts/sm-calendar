import {h} from "@stencil/core";
import {VIEW_LABELS, VIEWS} from "../constants";

class Header {

  render(component) {
    return (
        <div class='header-container'>
          <div class='header-section'>

          </div>
          <div class='header-section'>

          </div>
          <div class='header-section'>
            {this.renderViewButton(component)}
          </div>
        </div>
    );
  }

  renderViewButton(component) {
    const {availableViews} = component;
    const buttons = [];

    availableViews.forEach((view) => {
      const cls: Array<string> = ['view-name', 'sm-button primary'];
      if (view === component.view) {
        cls.push('active');
      }
      buttons.push(<button class={cls.join(' ')} onClick={() => {
        component.view = view;
      }}>
        {VIEW_LABELS[view]}
      </button>);
    });
    return (
      <div class='view-list'>
        {buttons}
      </div>
    );
  }
}


export default new Header();
