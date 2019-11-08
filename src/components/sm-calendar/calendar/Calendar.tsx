import {h} from "@stencil/core";
import header from './header/Header';
import dayView from './views/day/Day';
import weekView from './views/week/Week';
import {VIEWS} from "./constants";

class Calendar {

  getViewRenderer(component) {
    if (component.view === VIEWS.day)
      return dayView;
    else if (component.view === VIEWS.week)
      return weekView;
  }

  render(component) {
    const viewRenderer = this.getViewRenderer(component);

    component.viewRenderer = viewRenderer;
    component.eventsInViewRange = viewRenderer.getEventsInViewRange(component);

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
