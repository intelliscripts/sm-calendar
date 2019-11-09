import {h} from "@stencil/core";
import header from './header/Header';
import dayView from './views/day/Day';
import weekView from './views/week/Week';
import {VIEWS} from "./constants";
import {getMomentsInBetween} from "./utils/common/date-utils";

class Calendar {

  getViewRenderer(component) {
    if (component.view === VIEWS.day)
      return dayView;
    else if (component.view === VIEWS.week)
      return weekView;
  }

  render(component) {
    component.viewRenderer = this.getViewRenderer(component);

    const {startMoment, endMoment} = component;
    component.viewRange = {
      events: component.viewRenderer.getEventsInViewRange(component),
      dates: getMomentsInBetween(startMoment, endMoment)
    };

    return (
      <div class='sm-calendar-container' style={{'--header-height': '50px'}}>
        <header class='sm-calendar-header'>
          {header.render(component)}
        </header>
        <div class='sm-calendar-body'>
          {component.viewRenderer.render(component)}
        </div>
      </div>
    );
  }

}

export default new Calendar();
