import CalendarEvent from "../../utils/events/CalendarEvent";
import templateRenderer, {TemplateRenderer} from './TemplateRenderer';
import {h} from "@stencil/core";
import {Moment} from "moment";

export class View {
  public templateRenderer: TemplateRenderer = templateRenderer;

  public render(component) {
    const cls: Array<string> = ['view-container', component.view];
    return (
      <div class={cls.join(' ')}>
        {this.renderView(component)}
      </div>
    );
  }

  public getDatesInViewRange(startDateMoment: Moment, endDateMoment: Moment): Array<Moment> {
    const dates: Array<Moment> = [];
    const startDateMomentClone: Moment = startDateMoment.clone();
    while(startDateMomentClone.valueOf() < endDateMoment.valueOf()) {
      dates.push(startDateMomentClone.clone());
      startDateMomentClone.add(1, 'days');
    }
    return dates;
  }

  public getEventsInViewRange(component): Array<CalendarEvent> {
    const events: Array<CalendarEvent> = component.eventStore.getEventsBetween(component.startMoment, component.endMoment);
    return this.processEventsInViewRange(component, events);
  }

  public processEventsInViewRange(_component, events: Array<CalendarEvent>): Array<CalendarEvent> {
    return events;
  }

  public chopEvents(component, events: Array<CalendarEvent>) {
    events.forEach((event) => {
      if (event.startMoment.isBefore(component.startMoment)) {
        event.startMoment = component.startMoment.clone();
      }
      if (event.endMoment.isAfter(component.endMoment)) {
        event.endMoment = component.endMoment.clone();
      }
      if (!event.startMoment.isSame(event.endMoment, 'day')){
        event.isMultiDay = true;
      }
    });
  }

  public renderView(_component: any) {

  }

  public getHeaderText(component) {
    return(<div>
      {component.startMoment.format('DD MMM, YYYY')} - {component.endMoment.format('DD MMM, YYYY')}
    </div>);
  }

  public getDatePickerLabel(component) {
    return component.startMoment.format('DD MMM, YYYY') + ' - ' + component.endMoment.format('DD MMM, YYYY');
  }

}
