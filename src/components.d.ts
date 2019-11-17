/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface SmCalendar {
    /**
    * availableViews
    */
    'availableViews': Array<string>;
    /**
    * contextDate
    */
    'contextDate': string;
    /**
    * events
    */
    'events': Array<object>;
    /**
    * Theme
    */
    'theme': string;
    /**
    * timezone
    */
    'timezone': string;
    /**
    * view
    */
    'view': string;
    /**
    * weekStartDay
    */
    'weekStartDay': string;
  }
  interface SmDemoCalendar {}
}

declare global {


  interface HTMLSmCalendarElement extends Components.SmCalendar, HTMLStencilElement {}
  var HTMLSmCalendarElement: {
    prototype: HTMLSmCalendarElement;
    new (): HTMLSmCalendarElement;
  };

  interface HTMLSmDemoCalendarElement extends Components.SmDemoCalendar, HTMLStencilElement {}
  var HTMLSmDemoCalendarElement: {
    prototype: HTMLSmDemoCalendarElement;
    new (): HTMLSmDemoCalendarElement;
  };
  interface HTMLElementTagNameMap {
    'sm-calendar': HTMLSmCalendarElement;
    'sm-demo-calendar': HTMLSmDemoCalendarElement;
  }
}

declare namespace LocalJSX {
  interface SmCalendar {
    /**
    * availableViews
    */
    'availableViews'?: Array<string>;
    /**
    * contextDate
    */
    'contextDate'?: string;
    /**
    * events
    */
    'events'?: Array<object>;
    /**
    * Events
    */
    'onEventClick'?: (event: CustomEvent<any>) => void;
    'onViewChange'?: (event: CustomEvent<any>) => void;
    /**
    * Theme
    */
    'theme'?: string;
    /**
    * timezone
    */
    'timezone'?: string;
    /**
    * view
    */
    'view'?: string;
    /**
    * weekStartDay
    */
    'weekStartDay'?: string;
  }
  interface SmDemoCalendar {}

  interface IntrinsicElements {
    'sm-calendar': SmCalendar;
    'sm-demo-calendar': SmDemoCalendar;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'sm-calendar': LocalJSX.SmCalendar & JSXBase.HTMLAttributes<HTMLSmCalendarElement>;
      'sm-demo-calendar': LocalJSX.SmDemoCalendar & JSXBase.HTMLAttributes<HTMLSmDemoCalendarElement>;
    }
  }
}


