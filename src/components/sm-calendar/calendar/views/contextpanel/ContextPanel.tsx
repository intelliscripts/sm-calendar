import templateRenderer, {ContextPanelTemplateRenderer} from "./ContextPanelTemplateRenderer";
import {h} from "@stencil/core";

class ContextPanel {
  public templateRenderer: ContextPanelTemplateRenderer = templateRenderer;

  render(component) {
    if (!component.showContextPanel) {
      return;
    }
    return this.renderContextPanel(component);
  }

  renderContextPanel(component) {
    return (<div class='context-panel-container'>
      <div class='context-panel-wrapper'>
        {this.renderHeader(component)}
        {this.renderBody(component)}
      </div>
    </div>);
  }

  renderHeader(component) {
    return (<div class='context-panel-header'>
      <div class='context-date'>
        {component.contextMoment.format('DD MMM, YYYY')}
      </div>
    </div>);
  }

  renderBody(_component) {
    return (<div class='context-panel-body'>

    </div>);
  }
}

export default new ContextPanel();
