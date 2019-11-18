import {TemplateRenderer} from "../view/TemplateRenderer";
import CalendarEvent from "../../utils/events/CalendarEvent";
import {h} from "@stencil/core";
import {INTERNAL_FORMAT} from "../../constants";

export class MonthTemplateRenderer extends TemplateRenderer{
  constructor() {
    super();
  }

  eventContainer(event: CalendarEvent) {
    const start = event.startMoment.format(INTERNAL_FORMAT.DISPLAY_TIME);
    const end = event.endMoment.format(INTERNAL_FORMAT.DISPLAY_TIME);
    return (<div class="event-container">
      <div class="event-title">
        <span>{start} - {end}</span>
         : {event.title}
      </div>
    </div>);
  }
}

export default new MonthTemplateRenderer();
