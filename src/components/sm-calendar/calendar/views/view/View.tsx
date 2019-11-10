import CalendarEvent from "../../utils/events/CalendarEvent";
import templateRenderer, {TemplateRenderer} from './TemplateRenderer';

export class View {
  public templateRenderer: TemplateRenderer = templateRenderer;

  public getEventsInViewRange(component): Array<CalendarEvent> {
    const events: Array<CalendarEvent> = component.eventStore.getEventsBetween(component.startMoment, component.endMoment);
    return this.processEventsInViewRange(component, events);
  }

  public processEventsInViewRange(_component, events: Array<CalendarEvent>): Array<CalendarEvent> {
    return events;
  }

}
