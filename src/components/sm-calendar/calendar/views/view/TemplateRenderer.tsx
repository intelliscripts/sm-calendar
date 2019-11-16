import CalendarEvent from "../../utils/events/CalendarEvent";
import {h} from "@stencil/core";

export class TemplateRenderer {

  public eventContainer(event: CalendarEvent) {
    return (<div class="event-container">
      <div class="event-title">
        {event.title}
      </div>
    </div>);
  }
}

export default new TemplateRenderer();
