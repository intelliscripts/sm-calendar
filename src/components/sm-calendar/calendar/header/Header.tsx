import {h} from "@stencil/core";
import {INTERNAL_FORMAT, VIEW_LABELS} from "../constants";
import moment from "moment";

class Header {

  render(component) {
    return (
        <div class='header-container'>
          <div class='header-section'>
            {this.renderViewNavigation(component)}
          </div>
          <div class='header-section'>
            {this.renderViewButton(component)}
          </div>
        </div>
    );
  }

  renderViewRange(component) {
    return (<div class='view-range'>
      {component.viewRenderer.getHeaderText(component)}
    </div>);
  }

  renderViewNavigation(component) {
    return (
      <div class='view-navigation'>
        <div class='nav-item'>
          <div class="left-triangle" onClick={() => {
            component.viewRenderer.prev(component);
          }}>
          </div>
        </div>
        <div class='nav-item'>
          <button class='sm-button primary' onClick={() => {
            component.contextDate = moment().startOf('day').format(INTERNAL_FORMAT.DATE);
          }}>Today</button>
        </div>
        <div class='nav-item'>
          <div class="right-triangle" onClick={() => {
            component.viewRenderer.next(component);
          }}>
          </div>
        </div>
        <div class='nav-item'>
          <div class='date-picker'>
            <sm-date-picker onDateSelected={(payload) => {
              if (component.contextMoment.format(INTERNAL_FORMAT.DATE) !== payload.detail) {
                component.contextDate = payload.detail;
              }
            }} label={component.viewRenderer.getDatePickerLabel(component)} theme={component.theme} date={component.contextMoment.format(INTERNAL_FORMAT.DATE)} week-start-day={component.weekStartDay}></sm-date-picker>
          </div>
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
