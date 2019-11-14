import CalendarEvent from "../../utils/events/CalendarEvent";
import templateRenderer, {TemplateRenderer} from './TemplateRenderer';
import {h} from "@stencil/core";

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

  public getEventsInViewRange(component): Array<CalendarEvent> {
    const events: Array<CalendarEvent> = component.eventStore.getEventsBetween(component.startMoment, component.endMoment);
    return this.processEventsInViewRange(component, events);
  }

  public processEventsInViewRange(_component, events: Array<CalendarEvent>): Array<CalendarEvent> {
    return events;
  }

  public renderView(_component: any) {

  }
}
