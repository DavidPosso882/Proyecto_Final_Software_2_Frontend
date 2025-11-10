import {
  DragAndDropModule,
  DraggableDirective,
  DroppableDirective
} from "./chunk-JFP7NXQX.js";
import {
  ResizableDirective,
  ResizableModule,
  ResizeHandleDirective
} from "./chunk-PCDDX53E.js";
import {
  AsyncPipe,
  NgClass,
  NgStyle,
  NgTemplateOutlet,
  SlicePipe,
  formatDate
} from "./chunk-7T4NGYKG.js";
import "./chunk-LTDZUQ43.js";
import {
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  LOCALE_ID,
  NgModule,
  NgZone,
  Output,
  Pipe,
  Renderer2,
  ViewContainerRef,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵanimateLeave,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵpureFunction4,
  ɵɵpureFunction5,
  ɵɵpureFunction7,
  ɵɵpureFunctionV,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-Q2IM4WOY.js";
import {
  BehaviorSubject,
  Observable,
  Subject,
  interval,
  map,
  of,
  startWith,
  switchMap,
  takeUntil,
  timer
} from "./chunk-3NTDFDXB.js";
import {
  __objRest,
  __spreadValues
} from "./chunk-3OV72XIM.js";

// node_modules/.pnpm/positioning@3.0.1/node_modules/positioning/dist/positioning.js
var Positioning = class {
  getAllStyles(element) {
    return window.getComputedStyle(element);
  }
  getStyle(element, prop) {
    return this.getAllStyles(element)[prop];
  }
  isStaticPositioned(element) {
    return (this.getStyle(element, "position") || "static") === "static";
  }
  offsetParent(element) {
    let offsetParentEl = element.offsetParent || document.documentElement;
    while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
      offsetParentEl = offsetParentEl.offsetParent;
    }
    return offsetParentEl || document.documentElement;
  }
  position(element, round = true) {
    let elPosition;
    let parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
    if (this.getStyle(element, "position") === "fixed") {
      elPosition = element.getBoundingClientRect();
      elPosition = {
        top: elPosition.top,
        bottom: elPosition.bottom,
        left: elPosition.left,
        right: elPosition.right,
        height: elPosition.height,
        width: elPosition.width
      };
    } else {
      const offsetParentEl = this.offsetParent(element);
      elPosition = this.offset(element, false);
      if (offsetParentEl !== document.documentElement) {
        parentOffset = this.offset(offsetParentEl, false);
      }
      parentOffset.top += offsetParentEl.clientTop;
      parentOffset.left += offsetParentEl.clientLeft;
    }
    elPosition.top -= parentOffset.top;
    elPosition.bottom -= parentOffset.top;
    elPosition.left -= parentOffset.left;
    elPosition.right -= parentOffset.left;
    if (round) {
      elPosition.top = Math.round(elPosition.top);
      elPosition.bottom = Math.round(elPosition.bottom);
      elPosition.left = Math.round(elPosition.left);
      elPosition.right = Math.round(elPosition.right);
    }
    return elPosition;
  }
  offset(element, round = true) {
    const elBcr = element.getBoundingClientRect();
    const viewportOffset = {
      top: window.pageYOffset - document.documentElement.clientTop,
      left: window.pageXOffset - document.documentElement.clientLeft
    };
    let elOffset = {
      height: elBcr.height || element.offsetHeight,
      width: elBcr.width || element.offsetWidth,
      top: elBcr.top + viewportOffset.top,
      bottom: elBcr.bottom + viewportOffset.top,
      left: elBcr.left + viewportOffset.left,
      right: elBcr.right + viewportOffset.left
    };
    if (round) {
      elOffset.height = Math.round(elOffset.height);
      elOffset.width = Math.round(elOffset.width);
      elOffset.top = Math.round(elOffset.top);
      elOffset.bottom = Math.round(elOffset.bottom);
      elOffset.left = Math.round(elOffset.left);
      elOffset.right = Math.round(elOffset.right);
    }
    return elOffset;
  }
  /*
    Return false if the element to position is outside the viewport
  */
  positionElements(hostElement, targetElement, placement, appendToBody) {
    const [placementPrimary = "top", placementSecondary = "center"] = placement.split("-");
    const hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
    const targetElStyles = this.getAllStyles(targetElement);
    const marginTop = parseFloat(targetElStyles.marginTop);
    const marginBottom = parseFloat(targetElStyles.marginBottom);
    const marginLeft = parseFloat(targetElStyles.marginLeft);
    const marginRight = parseFloat(targetElStyles.marginRight);
    let topPosition = 0;
    let leftPosition = 0;
    switch (placementPrimary) {
      case "top":
        topPosition = hostElPosition.top - (targetElement.offsetHeight + marginTop + marginBottom);
        break;
      case "bottom":
        topPosition = hostElPosition.top + hostElPosition.height;
        break;
      case "left":
        leftPosition = hostElPosition.left - (targetElement.offsetWidth + marginLeft + marginRight);
        break;
      case "right":
        leftPosition = hostElPosition.left + hostElPosition.width;
        break;
    }
    switch (placementSecondary) {
      case "top":
        topPosition = hostElPosition.top;
        break;
      case "bottom":
        topPosition = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
        break;
      case "left":
        leftPosition = hostElPosition.left;
        break;
      case "right":
        leftPosition = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
        break;
      case "center":
        if (placementPrimary === "top" || placementPrimary === "bottom") {
          leftPosition = hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2;
        } else {
          topPosition = hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2;
        }
        break;
    }
    targetElement.style.transform = `translate(${Math.round(leftPosition)}px, ${Math.round(topPosition)}px)`;
    const targetElBCR = targetElement.getBoundingClientRect();
    const html = document.documentElement;
    const windowHeight = window.innerHeight || html.clientHeight;
    const windowWidth = window.innerWidth || html.clientWidth;
    return targetElBCR.left >= 0 && targetElBCR.top >= 0 && targetElBCR.right <= windowWidth && targetElBCR.bottom <= windowHeight;
  }
};
var placementSeparator = /\s+/;
var positionService = new Positioning();
function positionElements(hostElement, targetElement, placement, appendToBody, baseClass) {
  let placementVals = Array.isArray(placement) ? placement : placement.split(placementSeparator);
  const allowedPlacements = [
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "left-top",
    "left-bottom",
    "right-top",
    "right-bottom"
  ];
  const classList = targetElement.classList;
  const addClassesToTarget = (targetPlacement) => {
    const [primary, secondary] = targetPlacement.split("-");
    const classes = [];
    if (baseClass) {
      classes.push(`${baseClass}-${primary}`);
      if (secondary) {
        classes.push(`${baseClass}-${primary}-${secondary}`);
      }
      classes.forEach((classname) => {
        classList.add(classname);
      });
    }
    return classes;
  };
  if (baseClass) {
    allowedPlacements.forEach((placementToRemove) => {
      classList.remove(`${baseClass}-${placementToRemove}`);
    });
  }
  let hasAuto = placementVals.findIndex((val) => val === "auto");
  if (hasAuto >= 0) {
    allowedPlacements.forEach(function(obj) {
      if (placementVals.find((val) => val.search("^" + obj) !== -1) == null) {
        placementVals.splice(hasAuto++, 1, obj);
      }
    });
  }
  const style = targetElement.style;
  style.position = "absolute";
  style.top = "0";
  style.left = "0";
  style["will-change"] = "transform";
  let testPlacement;
  let isInViewport = false;
  for (testPlacement of placementVals) {
    let addedClasses = addClassesToTarget(testPlacement);
    if (positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody)) {
      isInViewport = true;
      break;
    }
    if (baseClass) {
      addedClasses.forEach((classname) => {
        classList.remove(classname);
      });
    }
  }
  if (!isInViewport) {
    testPlacement = placementVals[0];
    addClassesToTarget(testPlacement);
    positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody);
  }
  return testPlacement;
}

// node_modules/.pnpm/calendar-utils@0.12.4_date-fns@4.1.0/node_modules/calendar-utils/calendar-utils.js
var DAYS_OF_WEEK;
(function(DAYS_OF_WEEK2) {
  DAYS_OF_WEEK2[DAYS_OF_WEEK2["SUNDAY"] = 0] = "SUNDAY";
  DAYS_OF_WEEK2[DAYS_OF_WEEK2["MONDAY"] = 1] = "MONDAY";
  DAYS_OF_WEEK2[DAYS_OF_WEEK2["TUESDAY"] = 2] = "TUESDAY";
  DAYS_OF_WEEK2[DAYS_OF_WEEK2["WEDNESDAY"] = 3] = "WEDNESDAY";
  DAYS_OF_WEEK2[DAYS_OF_WEEK2["THURSDAY"] = 4] = "THURSDAY";
  DAYS_OF_WEEK2[DAYS_OF_WEEK2["FRIDAY"] = 5] = "FRIDAY";
  DAYS_OF_WEEK2[DAYS_OF_WEEK2["SATURDAY"] = 6] = "SATURDAY";
})(DAYS_OF_WEEK || (DAYS_OF_WEEK = {}));
var DEFAULT_WEEKEND_DAYS = [
  DAYS_OF_WEEK.SUNDAY,
  DAYS_OF_WEEK.SATURDAY
];
var DAYS_IN_WEEK = 7;
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var SECONDS_IN_DAY = 60 * 60 * 24;
function getExcludedSeconds(dateAdapter, { startDate, seconds, excluded, precision }) {
  if (excluded.length < 1) {
    return 0;
  }
  const { addSeconds, getDay, addDays } = dateAdapter;
  const endDate = addSeconds(startDate, seconds - 1);
  const dayStart = getDay(startDate);
  const dayEnd = getDay(endDate);
  let result = 0;
  let current = startDate;
  while (current < endDate) {
    const day = getDay(current);
    if (excluded.some((excludedDay) => excludedDay === day)) {
      result += calculateExcludedSeconds(dateAdapter, {
        dayStart,
        dayEnd,
        day,
        precision,
        startDate,
        endDate
      });
    }
    current = addDays(current, 1);
  }
  return result;
}
function calculateExcludedSeconds(dateAdapter, { precision, day, dayStart, dayEnd, startDate, endDate }) {
  const { differenceInSeconds, endOfDay, startOfDay } = dateAdapter;
  if (precision === "minutes") {
    if (day === dayStart) {
      return differenceInSeconds(endOfDay(startDate), startDate) + 1;
    } else if (day === dayEnd) {
      return differenceInSeconds(endDate, startOfDay(endDate)) + 1;
    }
  }
  return SECONDS_IN_DAY;
}
function getWeekViewEventSpan(dateAdapter, { event, offset, startOfWeekDate, excluded, precision, totalDaysInView }) {
  const { max, differenceInSeconds, addDays, endOfDay, differenceInDays } = dateAdapter;
  let span = SECONDS_IN_DAY;
  const begin = max([event.start, startOfWeekDate]);
  if (event.end) {
    switch (precision) {
      case "minutes":
        span = differenceInSeconds(event.end, begin);
        break;
      default:
        span = differenceInDays(addDays(endOfDay(event.end), 1), begin) * SECONDS_IN_DAY;
        break;
    }
  }
  const offsetSeconds = offset * SECONDS_IN_DAY;
  const totalLength = offsetSeconds + span;
  const secondsInView = totalDaysInView * SECONDS_IN_DAY;
  if (totalLength > secondsInView) {
    span = secondsInView - offsetSeconds;
  }
  span -= getExcludedSeconds(dateAdapter, {
    startDate: begin,
    seconds: span,
    excluded,
    precision
  });
  return span / SECONDS_IN_DAY;
}
function getWeekViewEventOffset(dateAdapter, { event, startOfWeek: startOfWeekDate, excluded, precision }) {
  const { differenceInDays, startOfDay, differenceInSeconds } = dateAdapter;
  if (event.start < startOfWeekDate) {
    return 0;
  }
  let offset = 0;
  switch (precision) {
    case "days":
      offset = differenceInDays(startOfDay(event.start), startOfWeekDate) * SECONDS_IN_DAY;
      break;
    case "minutes":
      offset = differenceInSeconds(event.start, startOfWeekDate);
      break;
  }
  offset -= getExcludedSeconds(dateAdapter, {
    startDate: startOfWeekDate,
    seconds: offset,
    excluded,
    precision
  });
  return Math.abs(offset / SECONDS_IN_DAY);
}
function isEventIsPeriod(dateAdapter, { event, periodStart, periodEnd }) {
  const { isSameSecond } = dateAdapter;
  const eventStart = event.start;
  const eventEnd = event.end || event.start;
  if (eventStart > periodStart && eventStart < periodEnd) {
    return true;
  }
  if (eventEnd > periodStart && eventEnd < periodEnd) {
    return true;
  }
  if (eventStart < periodStart && eventEnd > periodEnd) {
    return true;
  }
  if (isSameSecond(eventStart, periodStart) || isSameSecond(eventStart, periodEnd)) {
    return true;
  }
  if (isSameSecond(eventEnd, periodStart) || isSameSecond(eventEnd, periodEnd)) {
    return true;
  }
  return false;
}
function getEventsInPeriod(dateAdapter, { events, periodStart, periodEnd }) {
  return events.filter((event) => isEventIsPeriod(dateAdapter, { event, periodStart, periodEnd }));
}
function getWeekDay(dateAdapter, { date, weekendDays = DEFAULT_WEEKEND_DAYS }) {
  const { startOfDay, isSameDay, getDay } = dateAdapter;
  const today = startOfDay(/* @__PURE__ */ new Date());
  const day = getDay(date);
  return {
    date,
    day,
    isPast: date < today,
    isToday: isSameDay(date, today),
    isFuture: date > today,
    isWeekend: weekendDays.indexOf(day) > -1
  };
}
function getWeekViewHeader(dateAdapter, { viewDate, weekStartsOn, excluded = [], weekendDays, viewStart = dateAdapter.startOfWeek(viewDate, { weekStartsOn }), viewEnd = dateAdapter.addDays(viewStart, DAYS_IN_WEEK) }) {
  const { addDays, getDay } = dateAdapter;
  const days = [];
  let date = viewStart;
  while (date < viewEnd) {
    if (!excluded.some((e) => getDay(date) === e)) {
      days.push(getWeekDay(dateAdapter, { date, weekendDays }));
    }
    date = addDays(date, 1);
  }
  return days;
}
function getDifferenceInDaysWithExclusions(dateAdapter, { date1, date2, excluded }) {
  let date = date1;
  let diff = 0;
  while (date < date2) {
    if (excluded.indexOf(dateAdapter.getDay(date)) === -1) {
      diff++;
    }
    date = dateAdapter.addDays(date, 1);
  }
  return diff;
}
function getAllDayWeekEvents(dateAdapter, { events = [], excluded = [], precision = "days", absolutePositionedEvents = false, viewStart, viewEnd }) {
  viewStart = dateAdapter.startOfDay(viewStart);
  viewEnd = dateAdapter.endOfDay(viewEnd);
  const { differenceInSeconds, differenceInDays } = dateAdapter;
  const maxRange = getDifferenceInDaysWithExclusions(dateAdapter, {
    date1: viewStart,
    date2: viewEnd,
    excluded
  });
  const totalDaysInView = differenceInDays(viewEnd, viewStart) + 1;
  const eventsMapped = events.filter((event) => event.allDay).map((event) => {
    const offset = getWeekViewEventOffset(dateAdapter, {
      event,
      startOfWeek: viewStart,
      excluded,
      precision
    });
    const span = getWeekViewEventSpan(dateAdapter, {
      event,
      offset,
      startOfWeekDate: viewStart,
      excluded,
      precision,
      totalDaysInView
    });
    return { event, offset, span };
  }).filter((e) => e.offset < maxRange).filter((e) => e.span > 0).map((entry) => ({
    event: entry.event,
    offset: entry.offset,
    span: entry.span,
    startsBeforeWeek: entry.event.start < viewStart,
    endsAfterWeek: (entry.event.end || entry.event.start) > viewEnd
  })).sort((itemA, itemB) => {
    const startSecondsDiff = differenceInSeconds(itemA.event.start, itemB.event.start);
    if (startSecondsDiff === 0) {
      return differenceInSeconds(itemB.event.end || itemB.event.start, itemA.event.end || itemA.event.start);
    }
    return startSecondsDiff;
  });
  const allDayEventRows = [];
  const allocatedEvents = [];
  eventsMapped.forEach((event, index) => {
    if (allocatedEvents.indexOf(event) === -1) {
      allocatedEvents.push(event);
      let rowSpan = event.span + event.offset;
      const otherRowEvents = eventsMapped.slice(index + 1).filter((nextEvent) => {
        if (nextEvent.offset >= rowSpan && rowSpan + nextEvent.span <= totalDaysInView && allocatedEvents.indexOf(nextEvent) === -1) {
          const nextEventOffset = nextEvent.offset - rowSpan;
          if (!absolutePositionedEvents) {
            nextEvent.offset = nextEventOffset;
          }
          rowSpan += nextEvent.span + nextEventOffset;
          allocatedEvents.push(nextEvent);
          return true;
        }
      });
      const weekEvents = [event, ...otherRowEvents];
      const id = weekEvents.filter((weekEvent) => weekEvent.event.id).map((weekEvent) => weekEvent.event.id).join("-");
      allDayEventRows.push(Object.assign({ row: weekEvents }, id ? { id } : {}));
    }
  });
  return allDayEventRows;
}
function getWeekViewHourGrid(dateAdapter, { events, viewDate, hourSegments, hourDuration, dayStart, dayEnd, weekStartsOn, excluded, weekendDays, segmentHeight, viewStart, viewEnd, minimumEventHeight }) {
  const dayViewHourGrid = getDayViewHourGrid(dateAdapter, {
    viewDate,
    hourSegments,
    hourDuration,
    dayStart,
    dayEnd
  });
  const weekDays = getWeekViewHeader(dateAdapter, {
    viewDate,
    weekStartsOn,
    excluded,
    weekendDays,
    viewStart,
    viewEnd
  });
  const { setHours, setMinutes, getHours, getMinutes } = dateAdapter;
  return weekDays.map((day) => {
    const dayView = getDayView(dateAdapter, {
      events,
      viewDate: day.date,
      hourSegments,
      dayStart,
      dayEnd,
      segmentHeight,
      eventWidth: 1,
      hourDuration,
      minimumEventHeight
    });
    const hours = dayViewHourGrid.map((hour) => {
      const segments = hour.segments.map((segment) => {
        const date = setMinutes(setHours(day.date, getHours(segment.date)), getMinutes(segment.date));
        return Object.assign(Object.assign({}, segment), { date });
      });
      return Object.assign(Object.assign({}, hour), { segments });
    });
    function getColumnCount(allEvents, prevOverlappingEvents) {
      const columnCount = Math.max(...prevOverlappingEvents.map((iEvent) => iEvent.left + 1));
      const nextOverlappingEvents = allEvents.filter((iEvent) => iEvent.left >= columnCount).filter((iEvent) => {
        return getOverLappingWeekViewEvents(prevOverlappingEvents, iEvent.top, iEvent.top + iEvent.height).length > 0;
      });
      if (nextOverlappingEvents.length > 0) {
        return getColumnCount(allEvents, nextOverlappingEvents);
      } else {
        return columnCount;
      }
    }
    const mappedEvents = dayView.events.map((event) => {
      const columnCount = getColumnCount(dayView.events, getOverLappingWeekViewEvents(dayView.events, event.top, event.top + event.height));
      const width = 100 / columnCount;
      return Object.assign(Object.assign({}, event), { left: event.left * width, width });
    });
    return {
      hours,
      date: day.date,
      events: mappedEvents.map((event) => {
        const overLappingEvents = getOverLappingWeekViewEvents(mappedEvents.filter((otherEvent) => otherEvent.left > event.left), event.top, event.top + event.height);
        if (overLappingEvents.length > 0) {
          return Object.assign(Object.assign({}, event), { width: Math.min(...overLappingEvents.map((otherEvent) => otherEvent.left)) - event.left });
        }
        return event;
      })
    };
  });
}
function getWeekView(dateAdapter, { events = [], viewDate, weekStartsOn, excluded = [], precision = "days", absolutePositionedEvents = false, hourSegments, hourDuration, dayStart, dayEnd, weekendDays, segmentHeight, minimumEventHeight, viewStart = dateAdapter.startOfWeek(viewDate, { weekStartsOn }), viewEnd = dateAdapter.endOfWeek(viewDate, { weekStartsOn }) }) {
  if (!events) {
    events = [];
  }
  const { startOfDay, endOfDay } = dateAdapter;
  viewStart = startOfDay(viewStart);
  viewEnd = endOfDay(viewEnd);
  const eventsInPeriod = getEventsInPeriod(dateAdapter, {
    events,
    periodStart: viewStart,
    periodEnd: viewEnd
  });
  const header = getWeekViewHeader(dateAdapter, {
    viewDate,
    weekStartsOn,
    excluded,
    weekendDays,
    viewStart,
    viewEnd
  });
  return {
    allDayEventRows: getAllDayWeekEvents(dateAdapter, {
      events: eventsInPeriod,
      excluded,
      precision,
      absolutePositionedEvents,
      viewStart,
      viewEnd
    }),
    period: {
      events: eventsInPeriod,
      start: header[0].date,
      end: endOfDay(header[header.length - 1].date)
    },
    hourColumns: getWeekViewHourGrid(dateAdapter, {
      events,
      viewDate,
      hourSegments,
      hourDuration,
      dayStart,
      dayEnd,
      weekStartsOn,
      excluded,
      weekendDays,
      segmentHeight,
      viewStart,
      viewEnd,
      minimumEventHeight
    })
  };
}
function getMonthView(dateAdapter, { events = [], viewDate, weekStartsOn, excluded = [], viewStart = dateAdapter.startOfMonth(viewDate), viewEnd = dateAdapter.endOfMonth(viewDate), weekendDays }) {
  if (!events) {
    events = [];
  }
  const { startOfWeek, endOfWeek, differenceInDays, startOfDay, addHours, endOfDay, isSameMonth, getDay } = dateAdapter;
  const start = startOfWeek(viewStart, { weekStartsOn });
  const end = endOfWeek(viewEnd, { weekStartsOn });
  const eventsInMonth = getEventsInPeriod(dateAdapter, {
    events,
    periodStart: start,
    periodEnd: end
  });
  const initialViewDays = [];
  let previousDate;
  for (let i = 0; i < differenceInDays(end, start) + 1; i++) {
    let date;
    if (previousDate) {
      date = startOfDay(addHours(previousDate, HOURS_IN_DAY));
      if (previousDate.getTime() === date.getTime()) {
        date = startOfDay(addHours(previousDate, HOURS_IN_DAY + 1));
      }
      previousDate = date;
    } else {
      date = previousDate = start;
    }
    if (!excluded.some((e) => getDay(date) === e)) {
      const day = getWeekDay(dateAdapter, {
        date,
        weekendDays
      });
      const eventsInPeriod = getEventsInPeriod(dateAdapter, {
        events: eventsInMonth,
        periodStart: startOfDay(date),
        periodEnd: endOfDay(date)
      });
      day.inMonth = isSameMonth(date, viewDate);
      day.events = eventsInPeriod;
      day.badgeTotal = eventsInPeriod.length;
      initialViewDays.push(day);
    }
  }
  let days = [];
  const totalDaysVisibleInWeek = DAYS_IN_WEEK - excluded.length;
  if (totalDaysVisibleInWeek < DAYS_IN_WEEK) {
    for (let i = 0; i < initialViewDays.length; i += totalDaysVisibleInWeek) {
      const row = initialViewDays.slice(i, i + totalDaysVisibleInWeek);
      const isRowInMonth = row.some((day) => viewStart <= day.date && day.date < viewEnd);
      if (isRowInMonth) {
        days = [...days, ...row];
      }
    }
  } else {
    days = initialViewDays;
  }
  const rows = Math.floor(days.length / totalDaysVisibleInWeek);
  const rowOffsets = [];
  for (let i = 0; i < rows; i++) {
    rowOffsets.push(i * totalDaysVisibleInWeek);
  }
  return {
    rowOffsets,
    totalDaysVisibleInWeek,
    days,
    period: {
      start: days[0].date,
      end: endOfDay(days[days.length - 1].date),
      events: eventsInMonth
    }
  };
}
function getOverLappingWeekViewEvents(events, top, bottom) {
  return events.filter((previousEvent) => {
    const previousEventTop = previousEvent.top;
    const previousEventBottom = previousEvent.top + previousEvent.height;
    if (top < previousEventBottom && previousEventBottom < bottom) {
      return true;
    } else if (top < previousEventTop && previousEventTop < bottom) {
      return true;
    } else if (previousEventTop <= top && bottom <= previousEventBottom) {
      return true;
    }
    return false;
  });
}
function getDayView(dateAdapter, { events, viewDate, hourSegments, dayStart, dayEnd, eventWidth, segmentHeight, hourDuration, minimumEventHeight }) {
  const { setMinutes, setHours, startOfDay, startOfMinute, endOfDay, differenceInMinutes } = dateAdapter;
  const startOfView = setMinutes(setHours(startOfDay(viewDate), sanitiseHours(dayStart.hour)), sanitiseMinutes(dayStart.minute));
  const endOfView = setMinutes(setHours(startOfMinute(endOfDay(viewDate)), sanitiseHours(dayEnd.hour)), sanitiseMinutes(dayEnd.minute));
  endOfView.setSeconds(59, 999);
  const previousDayEvents = [];
  const eventsInPeriod = getEventsInPeriod(dateAdapter, {
    events: events.filter((event) => !event.allDay),
    periodStart: startOfView,
    periodEnd: endOfView
  });
  const dayViewEvents = eventsInPeriod.sort((eventA, eventB) => {
    return eventA.start.valueOf() - eventB.start.valueOf();
  }).map((event) => {
    const eventStart = event.start;
    const eventEnd = event.end || eventStart;
    const startsBeforeDay = eventStart < startOfView;
    const endsAfterDay = eventEnd > endOfView;
    const hourHeightModifier = hourSegments * segmentHeight / (hourDuration || MINUTES_IN_HOUR);
    let top = 0;
    if (eventStart > startOfView) {
      const eventOffset = dateAdapter.getTimezoneOffset(eventStart);
      const startOffset = dateAdapter.getTimezoneOffset(startOfView);
      const diff = startOffset - eventOffset;
      top += differenceInMinutes(eventStart, startOfView) + diff;
    }
    top *= hourHeightModifier;
    top = Math.floor(top);
    const startDate = startsBeforeDay ? startOfView : eventStart;
    const endDate = endsAfterDay ? endOfView : eventEnd;
    const timezoneOffset = dateAdapter.getTimezoneOffset(startDate) - dateAdapter.getTimezoneOffset(endDate);
    let height = differenceInMinutes(endDate, startDate) + timezoneOffset;
    if (!event.end) {
      height = segmentHeight;
    } else {
      height *= hourHeightModifier;
    }
    if (minimumEventHeight && height < minimumEventHeight) {
      height = minimumEventHeight;
    }
    height = Math.floor(height);
    const bottom = top + height;
    const overlappingPreviousEvents = getOverLappingWeekViewEvents(previousDayEvents, top, bottom);
    let left = 0;
    while (overlappingPreviousEvents.some((previousEvent) => previousEvent.left === left)) {
      left += eventWidth;
    }
    const dayEvent = {
      event,
      height,
      width: eventWidth,
      top,
      left,
      startsBeforeDay,
      endsAfterDay
    };
    previousDayEvents.push(dayEvent);
    return dayEvent;
  });
  const width = Math.max(...dayViewEvents.map((event) => event.left + event.width));
  const allDayEvents = getEventsInPeriod(dateAdapter, {
    events: events.filter((event) => event.allDay),
    periodStart: startOfDay(startOfView),
    periodEnd: endOfDay(endOfView)
  });
  return {
    events: dayViewEvents,
    width,
    allDayEvents,
    period: {
      events: eventsInPeriod,
      start: startOfView,
      end: endOfView
    }
  };
}
function sanitiseHours(hours) {
  return Math.max(Math.min(23, hours), 0);
}
function sanitiseMinutes(minutes) {
  return Math.max(Math.min(59, minutes), 0);
}
function getDayViewHourGrid(dateAdapter, { viewDate, hourSegments, hourDuration, dayStart, dayEnd }) {
  const { setMinutes, setHours, startOfDay, startOfMinute, endOfDay, addMinutes, addDays } = dateAdapter;
  const hours = [];
  let startOfView = setMinutes(setHours(startOfDay(viewDate), sanitiseHours(dayStart.hour)), sanitiseMinutes(dayStart.minute));
  let endOfView = setMinutes(setHours(startOfMinute(endOfDay(viewDate)), sanitiseHours(dayEnd.hour)), sanitiseMinutes(dayEnd.minute));
  const segmentDuration = (hourDuration || MINUTES_IN_HOUR) / hourSegments;
  let startOfViewDay = startOfDay(viewDate);
  const endOfViewDay = endOfDay(viewDate);
  let dateAdjustment = (d) => d;
  if (dateAdapter.getTimezoneOffset(startOfViewDay) !== dateAdapter.getTimezoneOffset(endOfViewDay)) {
    startOfViewDay = addDays(startOfViewDay, 1);
    startOfView = addDays(startOfView, 1);
    endOfView = addDays(endOfView, 1);
    dateAdjustment = (d) => addDays(d, -1);
  }
  const dayDuration = hourDuration ? HOURS_IN_DAY * 60 / hourDuration : MINUTES_IN_HOUR;
  for (let i = 0; i < dayDuration; i++) {
    const segments = [];
    for (let j = 0; j < hourSegments; j++) {
      const date = addMinutes(addMinutes(startOfView, i * (hourDuration || MINUTES_IN_HOUR)), j * segmentDuration);
      if (date >= startOfView && date < endOfView) {
        segments.push({
          date: dateAdjustment(date),
          displayDate: date,
          isStart: j === 0
        });
      }
    }
    if (segments.length > 0) {
      hours.push({ segments });
    }
  }
  return hours;
}
var EventValidationErrorMessage;
(function(EventValidationErrorMessage2) {
  EventValidationErrorMessage2["NotArray"] = "Events must be an array";
  EventValidationErrorMessage2["StartPropertyMissing"] = "Event is missing the `start` property";
  EventValidationErrorMessage2["StartPropertyNotDate"] = "Event `start` property should be a javascript date object. Do `new Date(event.start)` to fix it.";
  EventValidationErrorMessage2["EndPropertyNotDate"] = "Event `end` property should be a javascript date object. Do `new Date(event.end)` to fix it.";
  EventValidationErrorMessage2["EndsBeforeStart"] = "Event `start` property occurs after the `end`";
})(EventValidationErrorMessage || (EventValidationErrorMessage = {}));
function validateEvents(events, log) {
  let isValid = true;
  function isError(msg, event) {
    log(msg, event);
    isValid = false;
  }
  if (!Array.isArray(events)) {
    log(EventValidationErrorMessage.NotArray, events);
    return false;
  }
  events.forEach((event) => {
    if (!event.start) {
      isError(EventValidationErrorMessage.StartPropertyMissing, event);
    } else if (!(event.start instanceof Date)) {
      isError(EventValidationErrorMessage.StartPropertyNotDate, event);
    }
    if (event.end) {
      if (!(event.end instanceof Date)) {
        isError(EventValidationErrorMessage.EndPropertyNotDate, event);
      }
      if (event.start > event.end) {
        isError(EventValidationErrorMessage.EndsBeforeStart, event);
      }
    }
  });
  return isValid;
}

// node_modules/.pnpm/angular-calendar@0.32.0_@angular+core@20.3.5_@angular+compiler@20.3.5_rxjs@7.8.2_zone.j_e32436efe93554fbc8a285c4d54998f6/node_modules/angular-calendar/fesm2022/angular-calendar.mjs
var _c0 = (a0) => ({
  event: a0
});
var _c1 = (a0) => ({
  action: a0
});
var _forTrack0 = ($index, $item) => $item.id ?? $item;
function CalendarEventActionsComponent_ng_template_0_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 4);
    ɵɵpipe(1, "calendarA11y");
    ɵɵlistener("mwlClick", function CalendarEventActionsComponent_ng_template_0_Conditional_0_For_2_Template_a_mwlClick_0_listener($event) {
      const action_r2 = ɵɵrestoreView(_r1).$implicit;
      const event_r3 = ɵɵnextContext(2).event;
      return ɵɵresetView(action_r2.onClick({
        event: event_r3,
        sourceEvent: $event
      }));
    })("mwlKeydownEnter", function CalendarEventActionsComponent_ng_template_0_Conditional_0_For_2_Template_a_mwlKeydownEnter_0_listener($event) {
      const action_r2 = ɵɵrestoreView(_r1).$implicit;
      const event_r3 = ɵɵnextContext(2).event;
      return ɵɵresetView(action_r2.onClick({
        event: event_r3,
        sourceEvent: $event
      }));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const action_r2 = ctx.$implicit;
    ɵɵproperty("ngClass", action_r2.cssClass)("innerHtml", action_r2.label, ɵɵsanitizeHtml);
    ɵɵattribute("aria-label", ɵɵpipeBind2(1, 3, ɵɵpureFunction1(6, _c1, action_r2), "actionButtonLabel"));
  }
}
function CalendarEventActionsComponent_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 2);
    ɵɵrepeaterCreate(1, CalendarEventActionsComponent_ng_template_0_Conditional_0_For_2_Template, 2, 8, "a", 3, _forTrack0);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const event_r3 = ɵɵnextContext().event;
    ɵɵadvance();
    ɵɵrepeater(event_r3.actions);
  }
}
function CalendarEventActionsComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, CalendarEventActionsComponent_ng_template_0_Conditional_0_Template, 3, 0, "span", 2);
  }
  if (rf & 2) {
    const event_r3 = ctx.event;
    ɵɵconditional(event_r3.actions ? 0 : -1);
  }
}
function CalendarEventActionsComponent_ng_template_2_Template(rf, ctx) {
}
var _c2 = (a0, a1) => ({
  event: a0,
  view: a1
});
var _c3 = () => ({});
function CalendarEventTitleComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 2);
    ɵɵpipe(1, "calendarEventTitle");
    ɵɵpipe(2, "calendarA11y");
  }
  if (rf & 2) {
    const event_r1 = ctx.event;
    const view_r2 = ctx.view;
    ɵɵproperty("innerHTML", ɵɵpipeBind3(1, 2, event_r1.title, view_r2, event_r1), ɵɵsanitizeHtml);
    ɵɵattribute("aria-hidden", ɵɵpipeBind2(2, 6, ɵɵpureFunction0(9, _c3), "hideEventTitle"));
  }
}
function CalendarEventTitleComponent_ng_template_2_Template(rf, ctx) {
}
var _c4 = (a0, a1, a2) => ({
  contents: a0,
  placement: a1,
  event: a2
});
function CalendarTooltipWindowComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵelement(1, "div", 3)(2, "div", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const contents_r1 = ctx.contents;
    const placement_r2 = ctx.placement;
    ɵɵproperty("ngClass", "cal-tooltip-" + placement_r2);
    ɵɵadvance(2);
    ɵɵproperty("innerHtml", contents_r1, ɵɵsanitizeHtml);
  }
}
function CalendarTooltipWindowComponent_ng_template_2_Template(rf, ctx) {
}
var _c5 = (a0, a1) => ({
  days: a0,
  locale: a1
});
var _forTrack1 = ($index, $item) => $item.date.toISOString();
function CalendarMonthViewHeaderComponent_ng_template_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵlistener("click", function CalendarMonthViewHeaderComponent_ng_template_0_For_2_Template_div_click_0_listener($event) {
      const day_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.columnHeaderClicked.emit({
        isoDayNumber: day_r2.day,
        sourceEvent: $event
      }));
    });
    ɵɵtext(1);
    ɵɵpipe(2, "calendarDate");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const day_r2 = ctx.$implicit;
    const locale_r4 = ɵɵnextContext().locale;
    ɵɵclassProp("cal-past", day_r2.isPast)("cal-today", day_r2.isToday)("cal-future", day_r2.isFuture)("cal-weekend", day_r2.isWeekend);
    ɵɵproperty("ngClass", day_r2.cssClass);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind3(2, 10, day_r2.date, "monthViewColumnHeader", locale_r4), " ");
  }
}
function CalendarMonthViewHeaderComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵrepeaterCreate(1, CalendarMonthViewHeaderComponent_ng_template_0_For_2_Template, 3, 14, "div", 3, _forTrack1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const days_r5 = ctx.days;
    ɵɵadvance();
    ɵɵrepeater(days_r5);
  }
}
function CalendarMonthViewHeaderComponent_ng_template_2_Template(rf, ctx) {
}
var _c6 = (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) => ({
  day: a0,
  openDay: a1,
  locale: a2,
  tooltipPlacement: a3,
  highlightDay: a4,
  unhighlightDay: a5,
  eventClicked: a6,
  tooltipTemplate: a7,
  tooltipAppendToBody: a8,
  tooltipDelay: a9,
  validateDrag: a10
});
var _c7 = (a0, a1) => ({
  day: a0,
  locale: a1
});
var _c8 = (a0) => ({
  backgroundColor: a0
});
var _c9 = (a0, a1) => ({
  event: a0,
  draggedFrom: a1
});
var _c10 = (a0, a1) => ({
  x: a0,
  y: a1
});
var _c11 = () => ({
  delay: 300,
  delta: 30
});
function CalendarMonthCellComponent_ng_template_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const day_r1 = ɵɵnextContext().day;
    ɵɵadvance();
    ɵɵtextInterpolate(day_r1.badgeTotal);
  }
}
function CalendarMonthCellComponent_ng_template_0_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 8);
    ɵɵpipe(1, "calendarEventTitle");
    ɵɵpipe(2, "calendarA11y");
    ɵɵlistener("mouseenter", function CalendarMonthCellComponent_ng_template_0_Conditional_7_For_2_Template_div_mouseenter_0_listener() {
      const event_r3 = ɵɵrestoreView(_r2).$implicit;
      const highlightDay_r4 = ɵɵnextContext(2).highlightDay;
      return ɵɵresetView(highlightDay_r4.emit({
        event: event_r3
      }));
    })("mouseleave", function CalendarMonthCellComponent_ng_template_0_Conditional_7_For_2_Template_div_mouseleave_0_listener() {
      const event_r3 = ɵɵrestoreView(_r2).$implicit;
      const unhighlightDay_r5 = ɵɵnextContext(2).unhighlightDay;
      return ɵɵresetView(unhighlightDay_r5.emit({
        event: event_r3
      }));
    })("mwlClick", function CalendarMonthCellComponent_ng_template_0_Conditional_7_For_2_Template_div_mwlClick_0_listener($event) {
      const event_r3 = ɵɵrestoreView(_r2).$implicit;
      const eventClicked_r6 = ɵɵnextContext(2).eventClicked;
      return ɵɵresetView(eventClicked_r6.emit({
        event: event_r3,
        sourceEvent: $event
      }));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const event_r3 = ctx.$implicit;
    const ctx_r6 = ɵɵnextContext(2);
    const day_r1 = ctx_r6.day;
    const tooltipPlacement_r8 = ctx_r6.tooltipPlacement;
    const tooltipTemplate_r9 = ctx_r6.tooltipTemplate;
    const tooltipAppendToBody_r10 = ctx_r6.tooltipAppendToBody;
    const tooltipDelay_r11 = ctx_r6.tooltipDelay;
    const validateDrag_r12 = ctx_r6.validateDrag;
    ɵɵclassProp("cal-draggable", event_r3.draggable);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(22, _c8, event_r3.color == null ? null : event_r3.color.primary))("ngClass", event_r3 == null ? null : event_r3.cssClass)("mwlCalendarTooltip", ɵɵpipeBind3(1, 15, event_r3.title, "monthTooltip", event_r3))("tooltipPlacement", tooltipPlacement_r8)("tooltipEvent", event_r3)("tooltipTemplate", tooltipTemplate_r9)("tooltipAppendToBody", tooltipAppendToBody_r10)("tooltipDelay", tooltipDelay_r11)("dropData", ɵɵpureFunction2(24, _c9, event_r3, day_r1))("dragAxis", ɵɵpureFunction2(27, _c10, event_r3.draggable, event_r3.draggable))("validateDrag", validateDrag_r12)("touchStartLongPress", ɵɵpureFunction0(30, _c11));
    ɵɵattribute("aria-hidden", ɵɵpipeBind2(2, 19, ɵɵpureFunction0(31, _c3), "hideMonthCellEvents"));
  }
}
function CalendarMonthCellComponent_ng_template_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵrepeaterCreate(1, CalendarMonthCellComponent_ng_template_0_Conditional_7_For_2_Template, 3, 32, "div", 7, _forTrack0);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const day_r1 = ɵɵnextContext().day;
    ɵɵadvance();
    ɵɵrepeater(day_r1.events);
  }
}
function CalendarMonthCellComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵpipe(1, "calendarA11y");
    ɵɵelementStart(2, "span", 3);
    ɵɵconditionalCreate(3, CalendarMonthCellComponent_ng_template_0_Conditional_3_Template, 2, 1, "span", 4);
    ɵɵelementStart(4, "span", 5);
    ɵɵtext(5);
    ɵɵpipe(6, "calendarDate");
    ɵɵelementEnd()()();
    ɵɵconditionalCreate(7, CalendarMonthCellComponent_ng_template_0_Conditional_7_Template, 3, 0, "div", 6);
  }
  if (rf & 2) {
    const day_r1 = ctx.day;
    const locale_r13 = ctx.locale;
    ɵɵattribute("aria-label", ɵɵpipeBind2(1, 4, ɵɵpureFunction2(11, _c7, day_r1, locale_r13), "monthCell"));
    ɵɵadvance(3);
    ɵɵconditional(day_r1.badgeTotal > 0 ? 3 : -1);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind3(6, 7, day_r1.date, "monthViewDayNumber", locale_r13));
    ɵɵadvance(2);
    ɵɵconditional(day_r1.events.length > 0 ? 7 : -1);
  }
}
function CalendarMonthCellComponent_ng_template_2_Template(rf, ctx) {
}
var _c12 = (a0, a1, a2, a3) => ({
  events: a0,
  eventClicked: a1,
  isOpen: a2,
  validateDrag: a3
});
var _c13 = (a0, a1) => ({
  date: a0,
  locale: a1
});
var _c14 = (a0, a1) => ({
  event: a0,
  locale: a1
});
function CalendarOpenDayEventsComponent_ng_template_0_Conditional_0_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 6);
    ɵɵelement(1, "span", 7);
    ɵɵtext(2, " ");
    ɵɵelementStart(3, "mwl-calendar-event-title", 8);
    ɵɵpipe(4, "calendarA11y");
    ɵɵlistener("mwlClick", function CalendarOpenDayEventsComponent_ng_template_0_Conditional_0_For_6_Template_mwl_calendar_event_title_mwlClick_3_listener($event) {
      const event_r2 = ɵɵrestoreView(_r1).$implicit;
      const eventClicked_r3 = ɵɵnextContext(2).eventClicked;
      return ɵɵresetView(eventClicked_r3.emit({
        event: event_r2,
        sourceEvent: $event
      }));
    })("mwlKeydownEnter", function CalendarOpenDayEventsComponent_ng_template_0_Conditional_0_For_6_Template_mwl_calendar_event_title_mwlKeydownEnter_3_listener($event) {
      const event_r2 = ɵɵrestoreView(_r1).$implicit;
      const eventClicked_r3 = ɵɵnextContext(2).eventClicked;
      return ɵɵresetView(eventClicked_r3.emit({
        event: event_r2,
        sourceEvent: $event
      }));
    });
    ɵɵelementEnd();
    ɵɵtext(5, " ");
    ɵɵelement(6, "mwl-calendar-event-actions", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const event_r2 = ctx.$implicit;
    const validateDrag_r4 = ɵɵnextContext(2).validateDrag;
    const ctx_r4 = ɵɵnextContext();
    ɵɵclassProp("cal-draggable", event_r2.draggable);
    ɵɵproperty("ngClass", event_r2 == null ? null : event_r2.cssClass)("dropData", ɵɵpureFunction1(16, _c0, event_r2))("dragAxis", ɵɵpureFunction2(18, _c10, event_r2.draggable, event_r2.draggable))("validateDrag", validateDrag_r4)("touchStartLongPress", ɵɵpureFunction0(21, _c11));
    ɵɵadvance();
    ɵɵproperty("ngStyle", ɵɵpureFunction1(22, _c8, event_r2.color == null ? null : event_r2.color.primary));
    ɵɵadvance(2);
    ɵɵproperty("event", event_r2)("customTemplate", ctx_r4.eventTitleTemplate);
    ɵɵattribute("aria-label", ɵɵpipeBind2(4, 13, ɵɵpureFunction2(24, _c14, event_r2, ctx_r4.locale), "eventDescription"));
    ɵɵadvance(3);
    ɵɵproperty("event", event_r2)("customTemplate", ctx_r4.eventActionsTemplate);
  }
}
function CalendarOpenDayEventsComponent_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵanimateLeave("cal-open-day-events-closing");
    ɵɵelement(1, "span", 3);
    ɵɵpipe(2, "calendarA11y");
    ɵɵelement(3, "span", 4);
    ɵɵpipe(4, "calendarA11y");
    ɵɵrepeaterCreate(5, CalendarOpenDayEventsComponent_ng_template_0_Conditional_0_For_6_Template, 7, 27, "div", 5, _forTrack0);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const events_r6 = ɵɵnextContext().events;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵattribute("aria-label", ɵɵpipeBind2(2, 2, ɵɵpureFunction2(8, _c13, ctx_r4.date, ctx_r4.locale), "openDayEventsAlert"));
    ɵɵadvance(2);
    ɵɵattribute("aria-label", ɵɵpipeBind2(4, 5, ɵɵpureFunction2(11, _c13, ctx_r4.date, ctx_r4.locale), "openDayEventsLandmark"));
    ɵɵadvance(2);
    ɵɵrepeater(events_r6);
  }
}
function CalendarOpenDayEventsComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, CalendarOpenDayEventsComponent_ng_template_0_Conditional_0_Template, 7, 14, "div", 2);
  }
  if (rf & 2) {
    const isOpen_r7 = ctx.isOpen;
    ɵɵconditional(isOpen_r7 ? 0 : -1);
  }
}
function CalendarOpenDayEventsComponent_ng_template_2_Template(rf, ctx) {
}
function CalendarMonthViewComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mwl-calendar-month-cell", 6);
    ɵɵpipe(1, "calendarA11y");
    ɵɵlistener("mwlClick", function CalendarMonthViewComponent_For_4_For_3_Template_mwl_calendar_month_cell_mwlClick_0_listener($event) {
      const day_r3 = ɵɵrestoreView(_r2).$implicit;
      const ctx_r3 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r3.dayClicked.emit({
        day: day_r3,
        sourceEvent: $event
      }));
    })("mwlKeydownEnter", function CalendarMonthViewComponent_For_4_For_3_Template_mwl_calendar_month_cell_mwlKeydownEnter_0_listener($event) {
      const day_r3 = ɵɵrestoreView(_r2).$implicit;
      const ctx_r3 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r3.dayClicked.emit({
        day: day_r3,
        sourceEvent: $event
      }));
    })("highlightDay", function CalendarMonthViewComponent_For_4_For_3_Template_mwl_calendar_month_cell_highlightDay_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r3 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r3.toggleDayHighlight($event.event, true));
    })("unhighlightDay", function CalendarMonthViewComponent_For_4_For_3_Template_mwl_calendar_month_cell_unhighlightDay_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r3 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r3.toggleDayHighlight($event.event, false));
    })("drop", function CalendarMonthViewComponent_For_4_For_3_Template_mwl_calendar_month_cell_drop_0_listener($event) {
      const day_r3 = ɵɵrestoreView(_r2).$implicit;
      const ctx_r3 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r3.eventDropped(day_r3, $event.dropData.event, $event.dropData.draggedFrom));
    })("eventClicked", function CalendarMonthViewComponent_For_4_For_3_Template_mwl_calendar_month_cell_eventClicked_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r3 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r3.eventClicked.emit({
        event: $event.event,
        sourceEvent: $event.sourceEvent
      }));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const day_r3 = ctx.$implicit;
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", day_r3 == null ? null : day_r3.cssClass)("day", day_r3)("openDay", ctx_r3.openDay)("locale", ctx_r3.locale)("tooltipPlacement", ctx_r3.tooltipPlacement)("tooltipAppendToBody", ctx_r3.tooltipAppendToBody)("tooltipTemplate", ctx_r3.tooltipTemplate)("tooltipDelay", ctx_r3.tooltipDelay)("customTemplate", ctx_r3.cellTemplate)("ngStyle", ɵɵpureFunction1(15, _c8, day_r3.backgroundColor))("clickListenerDisabled", !ctx_r3.dayClicked.observed);
    ɵɵattribute("tabindex", ɵɵpipeBind2(1, 12, ɵɵpureFunction0(17, _c3), "monthCellTabIndex"));
  }
}
function CalendarMonthViewComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div")(1, "div", 3);
    ɵɵrepeaterCreate(2, CalendarMonthViewComponent_For_4_For_3_Template, 2, 18, "mwl-calendar-month-cell", 4, _forTrack1);
    ɵɵpipe(4, "slice");
    ɵɵelementEnd();
    ɵɵelementStart(5, "mwl-calendar-open-day-events", 5);
    ɵɵlistener("eventClicked", function CalendarMonthViewComponent_For_4_Template_mwl_calendar_open_day_events_eventClicked_5_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.eventClicked.emit({
        event: $event.event,
        sourceEvent: $event.sourceEvent
      }));
    })("drop", function CalendarMonthViewComponent_For_4_Template_mwl_calendar_open_day_events_drop_5_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.eventDropped(ctx_r3.openDay, $event.dropData.event, $event.dropData.draggedFrom));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const rowIndex_r5 = ctx.$implicit;
    const ctx_r3 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵrepeater(ɵɵpipeBind3(4, 7, ctx_r3.view.days, rowIndex_r5, rowIndex_r5 + ctx_r3.view.totalDaysVisibleInWeek));
    ɵɵadvance(3);
    ɵɵproperty("locale", ctx_r3.locale)("isOpen", ctx_r3.openRowIndex === rowIndex_r5)("events", ctx_r3.openDay == null ? null : ctx_r3.openDay.events)("date", ctx_r3.openDay == null ? null : ctx_r3.openDay.date)("customTemplate", ctx_r3.openDayEventsTemplate)("eventTitleTemplate", ctx_r3.eventTitleTemplate)("eventActionsTemplate", ctx_r3.eventActionsTemplate);
  }
}
var _c15 = (a0, a1, a2, a3, a4) => ({
  days: a0,
  locale: a1,
  dayHeaderClicked: a2,
  eventDropped: a3,
  dragEnter: a4
});
function CalendarWeekViewHeaderComponent_ng_template_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵlistener("mwlClick", function CalendarWeekViewHeaderComponent_ng_template_0_For_2_Template_div_mwlClick_0_listener($event) {
      const day_r2 = ɵɵrestoreView(_r1).$implicit;
      const dayHeaderClicked_r3 = ɵɵnextContext().dayHeaderClicked;
      return ɵɵresetView(dayHeaderClicked_r3.emit({
        day: day_r2,
        sourceEvent: $event
      }));
    })("drop", function CalendarWeekViewHeaderComponent_ng_template_0_For_2_Template_div_drop_0_listener($event) {
      const day_r2 = ɵɵrestoreView(_r1).$implicit;
      const eventDropped_r4 = ɵɵnextContext().eventDropped;
      return ɵɵresetView(eventDropped_r4.emit({
        event: $event.dropData.event,
        newStart: day_r2.date
      }));
    })("dragEnter", function CalendarWeekViewHeaderComponent_ng_template_0_For_2_Template_div_dragEnter_0_listener() {
      const day_r2 = ɵɵrestoreView(_r1).$implicit;
      const dragEnter_r5 = ɵɵnextContext().dragEnter;
      return ɵɵresetView(dragEnter_r5.emit({
        date: day_r2.date
      }));
    });
    ɵɵelementStart(1, "b");
    ɵɵtext(2);
    ɵɵpipe(3, "calendarDate");
    ɵɵelementEnd();
    ɵɵelement(4, "br");
    ɵɵelementStart(5, "span");
    ɵɵtext(6);
    ɵɵpipe(7, "calendarDate");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const day_r2 = ctx.$implicit;
    const locale_r6 = ɵɵnextContext().locale;
    ɵɵclassProp("cal-past", day_r2.isPast)("cal-today", day_r2.isToday)("cal-future", day_r2.isFuture)("cal-weekend", day_r2.isWeekend);
    ɵɵproperty("ngClass", day_r2.cssClass);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind3(3, 11, day_r2.date, "weekViewColumnHeader", locale_r6));
    ɵɵadvance(4);
    ɵɵtextInterpolate(ɵɵpipeBind3(7, 15, day_r2.date, "weekViewColumnSubHeader", locale_r6));
  }
}
function CalendarWeekViewHeaderComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵrepeaterCreate(1, CalendarWeekViewHeaderComponent_ng_template_0_For_2_Template, 8, 19, "div", 3, _forTrack1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const days_r7 = ctx.days;
    ɵɵadvance();
    ɵɵrepeater(days_r7);
  }
}
function CalendarWeekViewHeaderComponent_ng_template_2_Template(rf, ctx) {
}
var _c16 = (a0, a1, a2, a3, a4, a5, a6, a7, a8) => ({
  weekEvent: a0,
  tooltipPlacement: a1,
  eventClicked: a2,
  tooltipTemplate: a3,
  tooltipAppendToBody: a4,
  tooltipDisabled: a5,
  tooltipDelay: a6,
  column: a7,
  daysInWeek: a8
});
var _c17 = (a0, a1, a2) => ({
  color: a0,
  backgroundColor: a1,
  borderColor: a2
});
function CalendarWeekViewEventComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵpipe(1, "calendarEventTitle");
    ɵɵpipe(2, "calendarA11y");
    ɵɵlistener("mwlClick", function CalendarWeekViewEventComponent_ng_template_0_Template_div_mwlClick_0_listener($event) {
      const eventClicked_r2 = ɵɵrestoreView(_r1).eventClicked;
      return ɵɵresetView(eventClicked_r2.emit({
        sourceEvent: $event
      }));
    })("mwlKeydownEnter", function CalendarWeekViewEventComponent_ng_template_0_Template_div_mwlKeydownEnter_0_listener($event) {
      const eventClicked_r2 = ɵɵrestoreView(_r1).eventClicked;
      return ɵɵresetView(eventClicked_r2.emit({
        sourceEvent: $event
      }));
    });
    ɵɵelement(3, "mwl-calendar-event-actions", 3);
    ɵɵtext(4, " ");
    ɵɵelement(5, "mwl-calendar-event-title", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const weekEvent_r3 = ctx.weekEvent;
    const tooltipPlacement_r4 = ctx.tooltipPlacement;
    const tooltipTemplate_r5 = ctx.tooltipTemplate;
    const tooltipAppendToBody_r6 = ctx.tooltipAppendToBody;
    const tooltipDisabled_r7 = ctx.tooltipDisabled;
    const tooltipDelay_r8 = ctx.tooltipDelay;
    const daysInWeek_r9 = ctx.daysInWeek;
    const ctx_r9 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ɵɵpureFunction3(20, _c17, weekEvent_r3.event.color == null ? null : weekEvent_r3.event.color.secondaryText, weekEvent_r3.event.color == null ? null : weekEvent_r3.event.color.secondary, weekEvent_r3.event.color == null ? null : weekEvent_r3.event.color.primary))("mwlCalendarTooltip", !tooltipDisabled_r7 ? ɵɵpipeBind3(1, 13, weekEvent_r3.event.title, daysInWeek_r9 === 1 ? "dayTooltip" : "weekTooltip", weekEvent_r3.tempEvent || weekEvent_r3.event) : "")("tooltipPlacement", tooltipPlacement_r4)("tooltipEvent", weekEvent_r3.tempEvent || weekEvent_r3.event)("tooltipTemplate", tooltipTemplate_r5)("tooltipAppendToBody", tooltipAppendToBody_r6)("tooltipDelay", tooltipDelay_r8);
    ɵɵattribute("aria-label", ɵɵpipeBind2(2, 17, ɵɵpureFunction2(24, _c14, weekEvent_r3.tempEvent || weekEvent_r3.event, ctx_r9.locale), "eventDescription"));
    ɵɵadvance(3);
    ɵɵproperty("event", weekEvent_r3.tempEvent || weekEvent_r3.event)("customTemplate", ctx_r9.eventActionsTemplate);
    ɵɵadvance(2);
    ɵɵproperty("event", weekEvent_r3.tempEvent || weekEvent_r3.event)("customTemplate", ctx_r9.eventTitleTemplate)("view", daysInWeek_r9 === 1 ? "day" : "week");
  }
}
function CalendarWeekViewEventComponent_ng_template_2_Template(rf, ctx) {
}
var _c18 = (a0, a1, a2, a3, a4) => ({
  segment: a0,
  locale: a1,
  segmentHeight: a2,
  isTimeLabel: a3,
  daysInWeek: a4
});
function CalendarWeekViewHourSegmentComponent_ng_template_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3);
    ɵɵtext(1);
    ɵɵpipe(2, "calendarDate");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const segment_r2 = ctx_r0.segment;
    const locale_r3 = ctx_r0.locale;
    const daysInWeek_r4 = ctx_r0.daysInWeek;
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ɵɵpipeBind3(2, 1, segment_r2.displayDate, daysInWeek_r4 === 1 ? "dayViewHour" : "weekViewHour", locale_r3), " ");
  }
}
function CalendarWeekViewHourSegmentComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵpipe(1, "calendarA11y");
    ɵɵconditionalCreate(2, CalendarWeekViewHourSegmentComponent_ng_template_0_Conditional_2_Template, 3, 5, "div", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const segment_r2 = ctx.segment;
    const segmentHeight_r5 = ctx.segmentHeight;
    const isTimeLabel_r6 = ctx.isTimeLabel;
    const daysInWeek_r4 = ctx.daysInWeek;
    ɵɵstyleProp("height", segmentHeight_r5, "px");
    ɵɵclassProp("cal-hour-start", segment_r2.isStart)("cal-after-hour-start", !segment_r2.isStart);
    ɵɵproperty("ngClass", segment_r2.cssClass);
    ɵɵattribute("aria-hidden", ɵɵpipeBind2(1, 9, ɵɵpureFunction0(12, _c3), daysInWeek_r4 === 1 ? "hideDayHourSegment" : "hideWeekHourSegment"));
    ɵɵadvance(2);
    ɵɵconditional(isTimeLabel_r6 ? 2 : -1);
  }
}
function CalendarWeekViewHourSegmentComponent_ng_template_2_Template(rf, ctx) {
}
var _c19 = (a0, a1, a2, a3, a4, a5, a6) => ({
  columnDate: a0,
  dayStartHour: a1,
  dayStartMinute: a2,
  dayEndHour: a3,
  dayEndMinute: a4,
  isVisible: a5,
  topPx: a6
});
function CalendarWeekViewCurrentTimeMarkerComponent_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 3);
  }
  if (rf & 2) {
    const topPx_r1 = ɵɵnextContext().topPx;
    ɵɵstyleProp("top", topPx_r1, "px");
  }
}
function CalendarWeekViewCurrentTimeMarkerComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, CalendarWeekViewCurrentTimeMarkerComponent_ng_template_0_Conditional_0_Template, 1, 2, "div", 2);
  }
  if (rf & 2) {
    const isVisible_r2 = ctx.isVisible;
    ɵɵconditional(isVisible_r2 ? 0 : -1);
  }
}
function CalendarWeekViewCurrentTimeMarkerComponent_ng_template_2_Template(rf, ctx) {
}
var _c20 = (a0, a1) => ({
  left: a0,
  right: a1
});
var _c21 = (a0, a1) => ({
  event: a0,
  calendarId: a1
});
var _c22 = (a0) => ({
  x: a0
});
var _c23 = () => ({
  left: true
});
var _c24 = () => ({
  right: true
});
var _c25 = (a0, a1, a2, a3) => ({
  left: a0,
  right: a1,
  top: a2,
  bottom: a3
});
var _c26 = () => ({
  left: true,
  top: true
});
var _c27 = () => ({
  right: true,
  bottom: true
});
var _forTrack2 = ($index, $item) => $item.hours[0] ? $item.hours[0].segments[0].date.toISOString() : $item;
var _forTrack3 = ($index, $item) => $item.id;
var _forTrack4 = ($index, $item) => $item.event.id ?? $item.event;
var _forTrack5 = ($index, $item) => $item.segments[0].date.toISOString();
function CalendarWeekViewComponent_Conditional_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function CalendarWeekViewComponent_Conditional_2_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 16);
    ɵɵlistener("drop", function CalendarWeekViewComponent_Conditional_2_For_6_Template_div_drop_0_listener($event) {
      const day_r5 = ɵɵrestoreView(_r4).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.eventDropped($event, day_r5.date, true));
    })("dragEnter", function CalendarWeekViewComponent_Conditional_2_For_6_Template_div_dragEnter_0_listener() {
      const day_r5 = ɵɵrestoreView(_r4).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.dateDragEnter(day_r5.date));
    });
    ɵɵelementEnd();
  }
}
function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 19);
  }
  if (rf & 2) {
    ɵɵproperty("resizeEdges", ɵɵpureFunction0(1, _c23));
  }
}
function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 21);
  }
  if (rf & 2) {
    ɵɵproperty("resizeEdges", ɵɵpureFunction0(1, _c24));
  }
}
function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 18, 3);
    ɵɵlistener("resizeStart", function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template_div_resizeStart_0_listener($event) {
      const allDayEvent_r7 = ɵɵrestoreView(_r6).$implicit;
      ɵɵnextContext();
      const eventRowContainer_r8 = ɵɵreference(1);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.allDayEventResizeStarted(eventRowContainer_r8, allDayEvent_r7, $event));
    })("resizing", function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template_div_resizing_0_listener($event) {
      const allDayEvent_r7 = ɵɵrestoreView(_r6).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.allDayEventResizing(allDayEvent_r7, $event, ctx_r2.dayColumnWidth));
    })("resizeEnd", function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template_div_resizeEnd_0_listener() {
      const allDayEvent_r7 = ɵɵrestoreView(_r6).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.allDayEventResizeEnded(allDayEvent_r7));
    })("dragStart", function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template_div_dragStart_0_listener() {
      const allDayEvent_r7 = ɵɵrestoreView(_r6).$implicit;
      const event_r9 = ɵɵreference(1);
      ɵɵnextContext();
      const eventRowContainer_r8 = ɵɵreference(1);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.dragStarted(eventRowContainer_r8, event_r9, allDayEvent_r7, false));
    })("dragging", function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template_div_dragging_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.allDayEventDragMove());
    })("dragEnd", function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template_div_dragEnd_0_listener($event) {
      const allDayEvent_r7 = ɵɵrestoreView(_r6).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.dragEnded(allDayEvent_r7, $event, ctx_r2.dayColumnWidth));
    });
    ɵɵconditionalCreate(2, CalendarWeekViewComponent_Conditional_2_For_8_For_3_Conditional_2_Template, 1, 2, "div", 19);
    ɵɵelementStart(3, "mwl-calendar-week-view-event", 20);
    ɵɵlistener("eventClicked", function CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template_mwl_calendar_week_view_event_eventClicked_3_listener($event) {
      const allDayEvent_r7 = ɵɵrestoreView(_r6).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.eventClicked.emit({
        event: allDayEvent_r7.event,
        sourceEvent: $event.sourceEvent
      }));
    });
    ɵɵelementEnd();
    ɵɵconditionalCreate(4, CalendarWeekViewComponent_Conditional_2_For_8_For_3_Conditional_4_Template, 1, 2, "div", 21);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const allDayEvent_r7 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵstyleProp("width", 100 / ctx_r2.days.length * allDayEvent_r7.span, "%")("margin-left", ctx_r2.rtl ? null : 100 / ctx_r2.days.length * allDayEvent_r7.offset, "%")("margin-right", ctx_r2.rtl ? 100 / ctx_r2.days.length * allDayEvent_r7.offset : null, "%");
    ɵɵclassProp("cal-draggable", allDayEvent_r7.event.draggable && ctx_r2.allDayEventResizes.size === 0)("cal-starts-within-week", !allDayEvent_r7.startsBeforeWeek)("cal-ends-within-week", !allDayEvent_r7.endsAfterWeek);
    ɵɵproperty("ngClass", allDayEvent_r7.event == null ? null : allDayEvent_r7.event.cssClass)("resizeCursors", ctx_r2.resizeCursors)("resizeSnapGrid", ɵɵpureFunction2(33, _c20, ctx_r2.dayColumnWidth, ctx_r2.dayColumnWidth))("validateResize", ctx_r2.validateResize)("dropData", ɵɵpureFunction2(36, _c21, allDayEvent_r7.event, ctx_r2.calendarId))("dragAxis", ɵɵpureFunction2(39, _c10, allDayEvent_r7.event.draggable && ctx_r2.allDayEventResizes.size === 0, !ctx_r2.snapDraggedEvents && allDayEvent_r7.event.draggable && ctx_r2.allDayEventResizes.size === 0))("dragSnapGrid", ctx_r2.snapDraggedEvents ? ɵɵpureFunction1(42, _c22, ctx_r2.dayColumnWidth) : ɵɵpureFunction0(44, _c3))("validateDrag", ctx_r2.validateDrag)("touchStartLongPress", ɵɵpureFunction0(45, _c11));
    ɵɵadvance(2);
    ɵɵconditional((allDayEvent_r7.event == null ? null : allDayEvent_r7.event.resizable == null ? null : allDayEvent_r7.event.resizable.beforeStart) && !allDayEvent_r7.startsBeforeWeek ? 2 : -1);
    ɵɵadvance();
    ɵɵproperty("locale", ctx_r2.locale)("weekEvent", allDayEvent_r7)("tooltipPlacement", ctx_r2.tooltipPlacement)("tooltipTemplate", ctx_r2.tooltipTemplate)("tooltipAppendToBody", ctx_r2.tooltipAppendToBody)("tooltipDelay", ctx_r2.tooltipDelay)("customTemplate", ctx_r2.eventTemplate)("eventTitleTemplate", ctx_r2.eventTitleTemplate)("eventActionsTemplate", ctx_r2.eventActionsTemplate)("daysInWeek", ctx_r2.daysInWeek);
    ɵɵadvance();
    ɵɵconditional((allDayEvent_r7.event == null ? null : allDayEvent_r7.event.resizable == null ? null : allDayEvent_r7.event.resizable.afterEnd) && !allDayEvent_r7.endsAfterWeek ? 4 : -1);
  }
}
function CalendarWeekViewComponent_Conditional_2_For_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15, 2);
    ɵɵrepeaterCreate(2, CalendarWeekViewComponent_Conditional_2_For_8_For_3_Template, 5, 46, "div", 17, _forTrack4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const eventRow_r10 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵrepeater(eventRow_r10.row);
  }
}
function CalendarWeekViewComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 12, 1);
    ɵɵlistener("dragEnter", function CalendarWeekViewComponent_Conditional_2_Template_div_dragEnter_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.dragEnter("allDay"));
    })("dragLeave", function CalendarWeekViewComponent_Conditional_2_Template_div_dragLeave_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.dragLeave("allDay"));
    });
    ɵɵelementStart(2, "div", 10)(3, "div", 9);
    ɵɵtemplate(4, CalendarWeekViewComponent_Conditional_2_ng_container_4_Template, 1, 0, "ng-container", 13);
    ɵɵelementEnd();
    ɵɵrepeaterCreate(5, CalendarWeekViewComponent_Conditional_2_For_6_Template, 1, 0, "div", 14, _forTrack1);
    ɵɵelementEnd();
    ɵɵrepeaterCreate(7, CalendarWeekViewComponent_Conditional_2_For_8_Template, 4, 0, "div", 15, _forTrack3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.allDayEventsLabelTemplate);
    ɵɵadvance();
    ɵɵrepeater(ctx_r2.days);
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r2.view.allDayEventRows);
  }
}
function CalendarWeekViewComponent_Conditional_4_For_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "mwl-calendar-week-view-hour-segment", 25);
  }
  if (rf & 2) {
    const segment_r11 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵstyleProp("height", ctx_r2.hourSegmentHeight, "px");
    ɵɵproperty("segment", segment_r11)("segmentHeight", ctx_r2.hourSegmentHeight)("locale", ctx_r2.locale)("customTemplate", ctx_r2.hourSegmentTemplate)("isTimeLabel", true)("daysInWeek", ctx_r2.daysInWeek);
  }
}
function CalendarWeekViewComponent_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 23);
    ɵɵrepeaterCreate(1, CalendarWeekViewComponent_Conditional_4_For_2_For_2_Template, 1, 8, "mwl-calendar-week-view-hour-segment", 24, _forTrack1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const hour_r12 = ctx.$implicit;
    const ɵ$index_38_r13 = ctx.$index;
    ɵɵclassProp("cal-hour-odd", ɵ$index_38_r13 % 2 !== 0);
    ɵɵadvance();
    ɵɵrepeater(hour_r12.segments);
  }
}
function CalendarWeekViewComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵrepeaterCreate(1, CalendarWeekViewComponent_Conditional_4_For_2_Template, 3, 2, "div", 22, _forTrack5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵrepeater(ctx_r2.view.hourColumns[0].hours);
  }
}
function CalendarWeekViewComponent_For_8_For_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 19);
  }
  if (rf & 2) {
    ɵɵproperty("resizeEdges", ɵɵpureFunction0(1, _c26));
  }
}
function CalendarWeekViewComponent_For_8_For_4_ng_template_3_Template(rf, ctx) {
}
function CalendarWeekViewComponent_For_8_For_4_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mwl-calendar-week-view-event", 31);
    ɵɵlistener("eventClicked", function CalendarWeekViewComponent_For_8_For_4_ng_template_4_Template_mwl_calendar_week_view_event_eventClicked_0_listener($event) {
      ɵɵrestoreView(_r18);
      const timeEvent_r15 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.eventClicked.emit({
        event: timeEvent_r15.event,
        sourceEvent: $event.sourceEvent
      }));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const timeEvent_r15 = ɵɵnextContext().$implicit;
    const column_r19 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("locale", ctx_r2.locale)("weekEvent", timeEvent_r15)("tooltipPlacement", ctx_r2.tooltipPlacement)("tooltipTemplate", ctx_r2.tooltipTemplate)("tooltipAppendToBody", ctx_r2.tooltipAppendToBody)("tooltipDisabled", ctx_r2.dragActive || ctx_r2.timeEventResizes.size > 0)("tooltipDelay", ctx_r2.tooltipDelay)("customTemplate", ctx_r2.eventTemplate)("eventTitleTemplate", ctx_r2.eventTitleTemplate)("eventActionsTemplate", ctx_r2.eventActionsTemplate)("column", column_r19)("daysInWeek", ctx_r2.daysInWeek);
  }
}
function CalendarWeekViewComponent_For_8_For_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 21);
  }
  if (rf & 2) {
    ɵɵproperty("resizeEdges", ɵɵpureFunction0(1, _c27));
  }
}
function CalendarWeekViewComponent_For_8_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 29, 3);
    ɵɵlistener("resizeStart", function CalendarWeekViewComponent_For_8_For_4_Template_div_resizeStart_0_listener($event) {
      const timeEvent_r15 = ɵɵrestoreView(_r14).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      const dayColumns_r16 = ɵɵreference(6);
      return ɵɵresetView(ctx_r2.timeEventResizeStarted(dayColumns_r16, timeEvent_r15, $event));
    })("resizing", function CalendarWeekViewComponent_For_8_For_4_Template_div_resizing_0_listener($event) {
      const timeEvent_r15 = ɵɵrestoreView(_r14).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.timeEventResizing(timeEvent_r15, $event));
    })("resizeEnd", function CalendarWeekViewComponent_For_8_For_4_Template_div_resizeEnd_0_listener() {
      const timeEvent_r15 = ɵɵrestoreView(_r14).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.timeEventResizeEnded(timeEvent_r15));
    })("dragStart", function CalendarWeekViewComponent_For_8_For_4_Template_div_dragStart_0_listener() {
      const timeEvent_r15 = ɵɵrestoreView(_r14).$implicit;
      const event_r17 = ɵɵreference(1);
      const ctx_r2 = ɵɵnextContext(2);
      const dayColumns_r16 = ɵɵreference(6);
      return ɵɵresetView(ctx_r2.dragStarted(dayColumns_r16, event_r17, timeEvent_r15, true));
    })("dragging", function CalendarWeekViewComponent_For_8_For_4_Template_div_dragging_0_listener($event) {
      const timeEvent_r15 = ɵɵrestoreView(_r14).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.dragMove(timeEvent_r15, $event));
    })("dragEnd", function CalendarWeekViewComponent_For_8_For_4_Template_div_dragEnd_0_listener($event) {
      const timeEvent_r15 = ɵɵrestoreView(_r14).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.dragEnded(timeEvent_r15, $event, ctx_r2.dayColumnWidth, true));
    });
    ɵɵconditionalCreate(2, CalendarWeekViewComponent_For_8_For_4_Conditional_2_Template, 1, 2, "div", 19);
    ɵɵtemplate(3, CalendarWeekViewComponent_For_8_For_4_ng_template_3_Template, 0, 0, "ng-template", 30)(4, CalendarWeekViewComponent_For_8_For_4_ng_template_4_Template, 1, 12, "ng-template", null, 4, ɵɵtemplateRefExtractor);
    ɵɵconditionalCreate(6, CalendarWeekViewComponent_For_8_For_4_Conditional_6_Template, 1, 2, "div", 21);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const timeEvent_r15 = ctx.$implicit;
    const weekEventTemplate_r20 = ɵɵreference(5);
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵstyleProp("top", timeEvent_r15.top, "px")("height", timeEvent_r15.height, "px")("left", timeEvent_r15.left, "%")("width", timeEvent_r15.width, "%");
    ɵɵclassProp("cal-draggable", timeEvent_r15.event.draggable && ctx_r2.timeEventResizes.size === 0)("cal-starts-within-day", !timeEvent_r15.startsBeforeDay)("cal-ends-within-day", !timeEvent_r15.endsAfterDay);
    ɵɵproperty("ngClass", timeEvent_r15.event.cssClass)("hidden", timeEvent_r15.height === 0 && timeEvent_r15.width === 0)("resizeCursors", ctx_r2.resizeCursors)("resizeSnapGrid", ɵɵpureFunction4(30, _c25, ctx_r2.dayColumnWidth, ctx_r2.dayColumnWidth, ctx_r2.eventSnapSize || ctx_r2.hourSegmentHeight, ctx_r2.eventSnapSize || ctx_r2.hourSegmentHeight))("validateResize", ctx_r2.validateResize)("allowNegativeResizes", true)("dropData", ɵɵpureFunction2(35, _c21, timeEvent_r15.event, ctx_r2.calendarId))("dragAxis", ɵɵpureFunction2(38, _c10, timeEvent_r15.event.draggable && ctx_r2.timeEventResizes.size === 0, timeEvent_r15.event.draggable && ctx_r2.timeEventResizes.size === 0))("dragSnapGrid", ctx_r2.snapDraggedEvents ? ɵɵpureFunction2(41, _c10, ctx_r2.dayColumnWidth, ctx_r2.eventSnapSize || ctx_r2.hourSegmentHeight) : ɵɵpureFunction0(44, _c3))("touchStartLongPress", ɵɵpureFunction0(45, _c11))("ghostDragEnabled", !ctx_r2.snapDraggedEvents)("ghostElementTemplate", weekEventTemplate_r20)("validateDrag", ctx_r2.validateDrag);
    ɵɵadvance(2);
    ɵɵconditional((timeEvent_r15.event == null ? null : timeEvent_r15.event.resizable == null ? null : timeEvent_r15.event.resizable.beforeStart) && !timeEvent_r15.startsBeforeDay ? 2 : -1);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", weekEventTemplate_r20);
    ɵɵadvance(3);
    ɵɵconditional((timeEvent_r15.event == null ? null : timeEvent_r15.event.resizable == null ? null : timeEvent_r15.event.resizable.afterEnd) && !timeEvent_r15.endsAfterDay ? 6 : -1);
  }
}
function CalendarWeekViewComponent_For_8_For_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mwl-calendar-week-view-hour-segment", 33);
    ɵɵlistener("mwlClick", function CalendarWeekViewComponent_For_8_For_6_For_2_Template_mwl_calendar_week_view_hour_segment_mwlClick_0_listener($event) {
      const segment_r22 = ɵɵrestoreView(_r21).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.hourSegmentClicked.emit({
        date: segment_r22.date,
        sourceEvent: $event
      }));
    })("drop", function CalendarWeekViewComponent_For_8_For_6_For_2_Template_mwl_calendar_week_view_hour_segment_drop_0_listener($event) {
      const segment_r22 = ɵɵrestoreView(_r21).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.eventDropped($event, segment_r22.date, false));
    })("dragEnter", function CalendarWeekViewComponent_For_8_For_6_For_2_Template_mwl_calendar_week_view_hour_segment_dragEnter_0_listener() {
      const segment_r22 = ɵɵrestoreView(_r21).$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.dateDragEnter(segment_r22.date));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const segment_r22 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵstyleProp("height", ctx_r2.hourSegmentHeight, "px");
    ɵɵproperty("segment", segment_r22)("segmentHeight", ctx_r2.hourSegmentHeight)("locale", ctx_r2.locale)("customTemplate", ctx_r2.hourSegmentTemplate)("daysInWeek", ctx_r2.daysInWeek)("clickListenerDisabled", !ctx_r2.hourSegmentClicked.observed)("dragOverClass", !ctx_r2.dragActive || !ctx_r2.snapDraggedEvents ? "cal-drag-over" : null)("isTimeLabel", ctx_r2.daysInWeek === 1);
  }
}
function CalendarWeekViewComponent_For_8_For_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 23);
    ɵɵrepeaterCreate(1, CalendarWeekViewComponent_For_8_For_6_For_2_Template, 1, 10, "mwl-calendar-week-view-hour-segment", 32, _forTrack1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const hour_r23 = ctx.$implicit;
    const ɵ$index_68_r24 = ctx.$index;
    ɵɵclassProp("cal-hour-odd", ɵ$index_68_r24 % 2 !== 0);
    ɵɵadvance();
    ɵɵrepeater(hour_r23.segments);
  }
}
function CalendarWeekViewComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵelement(1, "mwl-calendar-week-view-current-time-marker", 26);
    ɵɵelementStart(2, "div", 27);
    ɵɵrepeaterCreate(3, CalendarWeekViewComponent_For_8_For_4_Template, 7, 46, "div", 28, _forTrack4);
    ɵɵelementEnd();
    ɵɵrepeaterCreate(5, CalendarWeekViewComponent_For_8_For_6_Template, 3, 2, "div", 22, _forTrack5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const column_r19 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("columnDate", column_r19.date)("dayStartHour", ctx_r2.dayStartHour)("dayStartMinute", ctx_r2.dayStartMinute)("dayEndHour", ctx_r2.dayEndHour)("dayEndMinute", ctx_r2.dayEndMinute)("hourSegments", ctx_r2.hourSegments)("hourDuration", ctx_r2.hourDuration)("hourSegmentHeight", ctx_r2.hourSegmentHeight)("customTemplate", ctx_r2.currentTimeMarkerTemplate);
    ɵɵadvance(2);
    ɵɵrepeater(column_r19.events);
    ɵɵadvance(2);
    ɵɵrepeater(column_r19.hours);
  }
}
var _ClickDirective = class _ClickDirective {
  constructor() {
    this.clickListenerDisabled = false;
    this.click = new EventEmitter();
    this.destroy$ = new Subject();
    this.renderer = inject(Renderer2);
    this.elm = inject(ElementRef);
  }
  ngOnInit() {
    if (!this.clickListenerDisabled) {
      this.listen().pipe(takeUntil(this.destroy$)).subscribe((event) => {
        event.stopPropagation();
        this.click.emit(event);
      });
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
  listen() {
    return new Observable((observer) => {
      return this.renderer.listen(this.elm.nativeElement, "click", (event) => {
        observer.next(event);
      });
    });
  }
};
_ClickDirective.ɵfac = function ClickDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ClickDirective)();
};
_ClickDirective.ɵdir = ɵɵdefineDirective({
  type: _ClickDirective,
  selectors: [["", "mwlClick", ""]],
  inputs: {
    clickListenerDisabled: "clickListenerDisabled"
  },
  outputs: {
    click: "mwlClick"
  }
});
var ClickDirective = _ClickDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClickDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlClick]"
    }]
  }], null, {
    clickListenerDisabled: [{
      type: Input
    }],
    click: [{
      type: Output,
      args: ["mwlClick"]
    }]
  });
})();
var _KeydownEnterDirective = class _KeydownEnterDirective {
  constructor() {
    this.keydown = new EventEmitter();
    this.keydownListener = null;
    this.host = inject(ElementRef);
    this.ngZone = inject(NgZone);
    this.renderer = inject(Renderer2);
  }
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.keydownListener = this.renderer.listen(this.host.nativeElement, "keydown", (event) => {
        if (event.keyCode === 13 || event.which === 13 || event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          this.ngZone.run(() => {
            this.keydown.emit(event);
          });
        }
      });
    });
  }
  ngOnDestroy() {
    if (this.keydownListener !== null) {
      this.keydownListener();
      this.keydownListener = null;
    }
  }
};
_KeydownEnterDirective.ɵfac = function KeydownEnterDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _KeydownEnterDirective)();
};
_KeydownEnterDirective.ɵdir = ɵɵdefineDirective({
  type: _KeydownEnterDirective,
  selectors: [["", "mwlKeydownEnter", ""]],
  outputs: {
    keydown: "mwlKeydownEnter"
  }
});
var KeydownEnterDirective = _KeydownEnterDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KeydownEnterDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlKeydownEnter]"
    }]
  }], null, {
    keydown: [{
      type: Output,
      args: ["mwlKeydownEnter"]
    }]
  });
})();
var _CalendarA11y = class _CalendarA11y {
  /**
   * Aria label for the badges/date of a cell
   * @example: `Saturday October 19 1 event click to expand`
   */
  monthCell({
    day,
    locale
  }) {
    if (day.badgeTotal > 0) {
      return `
        ${formatDate(day.date, "EEEE MMMM d", locale)},
        ${this.pluralizeEvents(day.badgeTotal, locale)},
         click to expand
      `;
    } else {
      return `${formatDate(day.date, "EEEE MMMM d", locale)}`;
    }
  }
  /**
   * Helper method to pluralize event count using native Intl.PluralRules API
   */
  pluralizeEvents(count, locale) {
    const pluralRules = new Intl.PluralRules(locale);
    const rule = pluralRules.select(count);
    const mapping = {
      zero: "no events",
      one: "1 event",
      other: `${count} events`
    };
    return mapping[rule] ?? mapping.other;
  }
  /**
   * Aria label for the open day events start landmark
   * @example: `Saturday October 19 expanded view`
   */
  openDayEventsLandmark({
    date,
    locale
  }) {
    return `
      Beginning of expanded view for ${formatDate(date, "EEEE MMMM dd", locale)}
    `;
  }
  /**
   * Aria label for alert that a day in the month view was expanded
   * @example: `Saturday October 19 expanded`
   */
  openDayEventsAlert({
    date,
    locale
  }) {
    return `${formatDate(date, "EEEE MMMM dd", locale)} expanded`;
  }
  /**
   * Descriptive aria label for an event
   * @example: `Saturday October 19th, Scott's Pizza Party, from 11:00am to 5:00pm`
   */
  eventDescription({
    event,
    locale
  }) {
    if (event.allDay === true) {
      return this.allDayEventDescription({
        event,
        locale
      });
    }
    const aria = `
      ${formatDate(event.start, "EEEE MMMM dd", locale)},
      ${event.title}, from ${formatDate(event.start, "hh:mm a", locale)}
    `;
    if (event.end) {
      return aria + ` to ${formatDate(event.end, "hh:mm a", locale)}`;
    }
    return aria;
  }
  /**
   * Descriptive aria label for an all day event
   * @example:
   * `Scott's Party, event spans multiple days: start time October 19 5:00pm, no stop time`
   */
  allDayEventDescription({
    event,
    locale
  }) {
    const aria = `
      ${event.title}, event spans multiple days:
      start time ${formatDate(event.start, "MMMM dd hh:mm a", locale)}
    `;
    if (event.end) {
      return aria + `, stop time ${formatDate(event.end, "MMMM d hh:mm a", locale)}`;
    }
    return aria + `, no stop time`;
  }
  /**
   * Aria label for the calendar event actions icons
   * @returns 'Edit' for fa-pencil icons, and 'Delete' for fa-times icons
   */
  actionButtonLabel({
    action
  }) {
    return action.a11yLabel;
  }
  /**
   * @returns {number} Tab index to be given to month cells
   */
  monthCellTabIndex() {
    return 0;
  }
  /**
   * @returns true if the events inside the month cell should be aria-hidden
   */
  hideMonthCellEvents() {
    return true;
  }
  /**
   * @returns true if event titles should be aria-hidden (global)
   */
  hideEventTitle() {
    return true;
  }
  /**
   * @returns true if hour segments in the week view should be aria-hidden
   */
  hideWeekHourSegment() {
    return true;
  }
  /**
   * @returns true if hour segments in the day view should be aria-hidden
   */
  hideDayHourSegment() {
    return true;
  }
};
_CalendarA11y.ɵfac = function CalendarA11y_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarA11y)();
};
_CalendarA11y.ɵprov = ɵɵdefineInjectable({
  token: _CalendarA11y,
  factory: _CalendarA11y.ɵfac
});
var CalendarA11y = _CalendarA11y;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarA11y, [{
    type: Injectable
  }], null, null);
})();
var _CalendarA11yPipe = class _CalendarA11yPipe {
  constructor() {
    this.calendarA11y = inject(CalendarA11y);
    this.locale = inject(LOCALE_ID);
  }
  transform(a11yParams, method) {
    a11yParams.locale = a11yParams.locale || this.locale;
    if (typeof this.calendarA11y[method] === "undefined") {
      const allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarA11y.prototype)).filter((iMethod) => iMethod !== "constructor");
      throw new Error(`${method} is not a valid a11y method. Can only be one of ${allowedMethods.join(", ")}`);
    }
    return this.calendarA11y[method](a11yParams);
  }
};
_CalendarA11yPipe.ɵfac = function CalendarA11yPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarA11yPipe)();
};
_CalendarA11yPipe.ɵpipe = ɵɵdefinePipe({
  name: "calendarA11y",
  type: _CalendarA11yPipe,
  pure: true
});
var CalendarA11yPipe = _CalendarA11yPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarA11yPipe, [{
    type: Pipe,
    args: [{
      name: "calendarA11y"
    }]
  }], null, null);
})();
var _CalendarEventActionsComponent = class _CalendarEventActionsComponent {
};
_CalendarEventActionsComponent.ɵfac = function CalendarEventActionsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarEventActionsComponent)();
};
_CalendarEventActionsComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarEventActionsComponent,
  selectors: [["mwl-calendar-event-actions"]],
  inputs: {
    event: "event",
    customTemplate: "customTemplate"
  },
  decls: 3,
  vars: 4,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-event-actions"], ["href", "javascript:;", "tabindex", "0", "role", "button", 1, "cal-event-action", 3, "ngClass", "innerHtml"], ["href", "javascript:;", "tabindex", "0", "role", "button", 1, "cal-event-action", 3, "mwlClick", "mwlKeydownEnter", "ngClass", "innerHtml"]],
  template: function CalendarEventActionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarEventActionsComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarEventActionsComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r4 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r4)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx.event));
    }
  },
  dependencies: [NgClass, ClickDirective, KeydownEnterDirective, NgTemplateOutlet, CalendarA11yPipe],
  encapsulation: 2
});
var CalendarEventActionsComponent = _CalendarEventActionsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarEventActionsComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-event-actions",
      template: `
    <ng-template #defaultTemplate let-event="event">
      @if (event.actions) {
        <span class="cal-event-actions">
          @for (action of event.actions; track action.id ?? action) {
            <a
              class="cal-event-action"
              href="javascript:;"
              (mwlClick)="action.onClick({ event: event, sourceEvent: $event })"
              (mwlKeydownEnter)="
                action.onClick({ event: event, sourceEvent: $event })
              "
              [ngClass]="action.cssClass"
              [innerHtml]="action.label"
              tabindex="0"
              role="button"
              [attr.aria-label]="
                { action: action } | calendarA11y: 'actionButtonLabel'
              "
            >
            </a>
          }
        </span>
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
      }"
    />
  `,
      imports: [NgClass, ClickDirective, KeydownEnterDirective, NgTemplateOutlet, CalendarA11yPipe]
    }]
  }], null, {
    event: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }]
  });
})();
var CalendarEventTitleFormatter = class {
  /**
   * The month view event title.
   */
  month(event, title) {
    return event.title;
  }
  /**
   * The month view event tooltip. Return a falsey value from this to disable the tooltip.
   */
  monthTooltip(event, title) {
    return event.title;
  }
  /**
   * The week view event title.
   */
  week(event, title) {
    return event.title;
  }
  /**
   * The week view event tooltip. Return a falsey value from this to disable the tooltip.
   */
  weekTooltip(event, title) {
    return event.title;
  }
  /**
   * The day view event title.
   */
  day(event, title) {
    return event.title;
  }
  /**
   * The day view event tooltip. Return a falsey value from this to disable the tooltip.
   */
  dayTooltip(event, title) {
    return event.title;
  }
};
var _CalendarEventTitlePipe = class _CalendarEventTitlePipe {
  constructor() {
    this.calendarEventTitle = inject(CalendarEventTitleFormatter);
  }
  transform(title, titleType, event) {
    return this.calendarEventTitle[titleType](event, title);
  }
};
_CalendarEventTitlePipe.ɵfac = function CalendarEventTitlePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarEventTitlePipe)();
};
_CalendarEventTitlePipe.ɵpipe = ɵɵdefinePipe({
  name: "calendarEventTitle",
  type: _CalendarEventTitlePipe,
  pure: true
});
var CalendarEventTitlePipe = _CalendarEventTitlePipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarEventTitlePipe, [{
    type: Pipe,
    args: [{
      name: "calendarEventTitle"
    }]
  }], null, null);
})();
var _CalendarEventTitleComponent = class _CalendarEventTitleComponent {
};
_CalendarEventTitleComponent.ɵfac = function CalendarEventTitleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarEventTitleComponent)();
};
_CalendarEventTitleComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarEventTitleComponent,
  selectors: [["mwl-calendar-event-title"]],
  inputs: {
    event: "event",
    customTemplate: "customTemplate",
    view: "view"
  },
  decls: 3,
  vars: 5,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-event-title", 3, "innerHTML"]],
  template: function CalendarEventTitleComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarEventTitleComponent_ng_template_0_Template, 3, 10, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarEventTitleComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r3 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r3)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c2, ctx.event, ctx.view));
    }
  },
  dependencies: [NgTemplateOutlet, CalendarEventTitlePipe, CalendarA11yPipe],
  encapsulation: 2
});
var CalendarEventTitleComponent = _CalendarEventTitleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarEventTitleComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-event-title",
      template: `
    <ng-template #defaultTemplate let-event="event" let-view="view">
      <span
        class="cal-event-title"
        [innerHTML]="event.title | calendarEventTitle: view : event"
        [attr.aria-hidden]="{} | calendarA11y: 'hideEventTitle'"
      >
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view,
      }"
    />
  `,
      imports: [NgTemplateOutlet, CalendarEventTitlePipe, CalendarA11yPipe]
    }]
  }], null, {
    event: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }],
    view: [{
      type: Input
    }]
  });
})();
var _CalendarTooltipWindowComponent = class _CalendarTooltipWindowComponent {
};
_CalendarTooltipWindowComponent.ɵfac = function CalendarTooltipWindowComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarTooltipWindowComponent)();
};
_CalendarTooltipWindowComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarTooltipWindowComponent,
  selectors: [["mwl-calendar-tooltip-window"]],
  inputs: {
    contents: "contents",
    placement: "placement",
    event: "event",
    customTemplate: "customTemplate"
  },
  decls: 3,
  vars: 6,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-tooltip", 3, "ngClass"], [1, "cal-tooltip-arrow"], [1, "cal-tooltip-inner", 3, "innerHtml"]],
  template: function CalendarTooltipWindowComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarTooltipWindowComponent_ng_template_0_Template, 3, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarTooltipWindowComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r3 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r3)("ngTemplateOutletContext", ɵɵpureFunction3(2, _c4, ctx.contents, ctx.placement, ctx.event));
    }
  },
  dependencies: [NgClass, NgTemplateOutlet],
  encapsulation: 2
});
var CalendarTooltipWindowComponent = _CalendarTooltipWindowComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarTooltipWindowComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-tooltip-window",
      template: `
    <ng-template
      #defaultTemplate
      let-contents="contents"
      let-placement="placement"
      let-event="event"
    >
      <div class="cal-tooltip" [ngClass]="'cal-tooltip-' + placement">
        <div class="cal-tooltip-arrow"></div>
        <div class="cal-tooltip-inner" [innerHtml]="contents"></div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        contents: contents,
        placement: placement,
        event: event,
      }"
    />
  `,
      imports: [NgClass, NgTemplateOutlet]
    }]
  }], null, {
    contents: [{
      type: Input
    }],
    placement: [{
      type: Input
    }],
    event: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }]
  });
})();
var _CalendarTooltipDirective = class _CalendarTooltipDirective {
  constructor() {
    this.placement = "auto";
    this.delay = null;
    this.elementRef = inject(ElementRef);
    this.injector = inject(Injector);
    this.viewContainerRef = inject(ViewContainerRef);
    this.document = inject(DOCUMENT);
    this.cancelTooltipDelay$ = new Subject();
  }
  ngOnChanges(changes) {
    if (this.tooltipRef && (changes.contents || changes.customTemplate || changes.event)) {
      this.tooltipRef.instance.contents = this.contents;
      this.tooltipRef.instance.customTemplate = this.customTemplate;
      this.tooltipRef.instance.event = this.event;
      this.tooltipRef.changeDetectorRef.markForCheck();
      if (!this.contents) {
        this.hide();
      }
    }
  }
  ngOnDestroy() {
    this.hide();
  }
  onMouseOver() {
    const delay$ = this.delay === null ? of("now") : timer(this.delay);
    delay$.pipe(takeUntil(this.cancelTooltipDelay$)).subscribe(() => {
      this.show();
    });
  }
  onMouseOut() {
    this.hide();
  }
  show() {
    if (!this.tooltipRef && this.contents) {
      this.tooltipRef = this.viewContainerRef.createComponent(CalendarTooltipWindowComponent, {
        index: 0,
        injector: this.injector,
        projectableNodes: []
      });
      this.tooltipRef.instance.contents = this.contents;
      this.tooltipRef.instance.customTemplate = this.customTemplate;
      this.tooltipRef.instance.event = this.event;
      if (this.appendToBody) {
        this.document.body.appendChild(this.tooltipRef.location.nativeElement);
      }
      requestAnimationFrame(() => {
        this.positionTooltip();
      });
    }
  }
  hide() {
    if (this.tooltipRef) {
      this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
      this.tooltipRef = null;
    }
    this.cancelTooltipDelay$.next();
  }
  positionTooltip(previousPositions = []) {
    if (this.tooltipRef) {
      this.tooltipRef.changeDetectorRef.detectChanges();
      this.tooltipRef.instance.placement = positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
      if (previousPositions.indexOf(this.tooltipRef.instance.placement) === -1) {
        this.positionTooltip([...previousPositions, this.tooltipRef.instance.placement]);
      }
    }
  }
};
_CalendarTooltipDirective.ɵfac = function CalendarTooltipDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarTooltipDirective)();
};
_CalendarTooltipDirective.ɵdir = ɵɵdefineDirective({
  type: _CalendarTooltipDirective,
  selectors: [["", "mwlCalendarTooltip", ""]],
  hostBindings: function CalendarTooltipDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("mouseenter", function CalendarTooltipDirective_mouseenter_HostBindingHandler() {
        return ctx.onMouseOver();
      })("mouseleave", function CalendarTooltipDirective_mouseleave_HostBindingHandler() {
        return ctx.onMouseOut();
      });
    }
  },
  inputs: {
    contents: [0, "mwlCalendarTooltip", "contents"],
    placement: [0, "tooltipPlacement", "placement"],
    customTemplate: [0, "tooltipTemplate", "customTemplate"],
    event: [0, "tooltipEvent", "event"],
    appendToBody: [0, "tooltipAppendToBody", "appendToBody"],
    delay: [0, "tooltipDelay", "delay"]
  },
  features: [ɵɵNgOnChangesFeature]
});
var CalendarTooltipDirective = _CalendarTooltipDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarTooltipDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlCalendarTooltip]"
    }]
  }], null, {
    contents: [{
      type: Input,
      args: ["mwlCalendarTooltip"]
    }],
    placement: [{
      type: Input,
      args: ["tooltipPlacement"]
    }],
    customTemplate: [{
      type: Input,
      args: ["tooltipTemplate"]
    }],
    event: [{
      type: Input,
      args: ["tooltipEvent"]
    }],
    appendToBody: [{
      type: Input,
      args: ["tooltipAppendToBody"]
    }],
    delay: [{
      type: Input,
      args: ["tooltipDelay"]
    }],
    onMouseOver: [{
      type: HostListener,
      args: ["mouseenter"]
    }],
    onMouseOut: [{
      type: HostListener,
      args: ["mouseleave"]
    }]
  });
})();
var DateAdapter = class {
};
var CalendarView;
(function(CalendarView2) {
  CalendarView2["Month"] = "month";
  CalendarView2["Week"] = "week";
  CalendarView2["Day"] = "day";
})(CalendarView || (CalendarView = {}));
var validateEvents2 = (events) => {
  const warn = (...args) => console.warn("angular-calendar", ...args);
  return validateEvents(events, warn);
};
function isInsideLeftAndRight(outer, inner) {
  return Math.floor(outer.left) <= Math.ceil(inner.left) && Math.floor(inner.left) <= Math.ceil(outer.right) && Math.floor(outer.left) <= Math.ceil(inner.right) && Math.floor(inner.right) <= Math.ceil(outer.right);
}
function isInsideTopAndBottom(outer, inner) {
  return Math.floor(outer.top) <= Math.ceil(inner.top) && Math.floor(inner.top) <= Math.ceil(outer.bottom) && Math.floor(outer.top) <= Math.ceil(inner.bottom) && Math.floor(inner.bottom) <= Math.ceil(outer.bottom);
}
function isInside(outer, inner) {
  return isInsideLeftAndRight(outer, inner) && isInsideTopAndBottom(outer, inner);
}
function roundToNearest(amount, precision) {
  return Math.round(amount / precision) * precision;
}
var MINUTES_IN_HOUR2 = 60;
function getPixelAmountInMinutes(hourSegments, hourSegmentHeight, hourDuration) {
  return (hourDuration || MINUTES_IN_HOUR2) / (hourSegments * hourSegmentHeight);
}
function getMinutesMoved(movedY, hourSegments, hourSegmentHeight, eventSnapSize, hourDuration) {
  const draggedInPixelsSnapSize = roundToNearest(movedY, eventSnapSize || hourSegmentHeight);
  const pixelAmountInMinutes = getPixelAmountInMinutes(hourSegments, hourSegmentHeight, hourDuration);
  return draggedInPixelsSnapSize * pixelAmountInMinutes;
}
function getDefaultEventEnd(dateAdapter, event, minimumMinutes) {
  if (event.end) {
    return event.end;
  } else {
    return dateAdapter.addMinutes(event.start, minimumMinutes);
  }
}
function addDaysWithExclusions(dateAdapter, date, days, excluded) {
  let daysCounter = 0;
  let daysToAdd = 0;
  const changeDays = days < 0 ? dateAdapter.subDays : dateAdapter.addDays;
  let result = date;
  while (daysToAdd <= Math.abs(days)) {
    result = changeDays(date, daysCounter);
    const day = dateAdapter.getDay(result);
    if (excluded.indexOf(day) === -1) {
      daysToAdd++;
    }
    daysCounter++;
  }
  return result;
}
function isDraggedWithinPeriod(newStart, newEnd, period) {
  const end = newEnd || newStart;
  return period.start <= newStart && newStart <= period.end || period.start <= end && end <= period.end;
}
function shouldFireDroppedEvent(dropEvent, date, allDay, calendarId) {
  return dropEvent.dropData && dropEvent.dropData.event && (dropEvent.dropData.calendarId !== calendarId || dropEvent.dropData.event.allDay && !allDay || !dropEvent.dropData.event.allDay && allDay);
}
function getWeekViewPeriod(dateAdapter, viewDate, weekStartsOn, excluded = [], daysInWeek) {
  let viewStart = daysInWeek ? dateAdapter.startOfDay(viewDate) : dateAdapter.startOfWeek(viewDate, {
    weekStartsOn
  });
  const endOfWeek = dateAdapter.endOfWeek(viewDate, {
    weekStartsOn
  });
  while (excluded.indexOf(dateAdapter.getDay(viewStart)) > -1 && viewStart < endOfWeek) {
    viewStart = dateAdapter.addDays(viewStart, 1);
  }
  if (daysInWeek) {
    const viewEnd = dateAdapter.endOfDay(addDaysWithExclusions(dateAdapter, viewStart, daysInWeek - 1, excluded));
    return {
      viewStart,
      viewEnd
    };
  } else {
    let viewEnd = endOfWeek;
    while (excluded.indexOf(dateAdapter.getDay(viewEnd)) > -1 && viewEnd > viewStart) {
      viewEnd = dateAdapter.subDays(viewEnd, 1);
    }
    return {
      viewStart,
      viewEnd
    };
  }
}
function isWithinThreshold({
  x,
  y
}) {
  const DRAG_THRESHOLD = 1;
  return Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;
}
var _CalendarPreviousViewDirective = class _CalendarPreviousViewDirective {
  constructor() {
    this.excludeDays = [];
    this.viewDateChange = new EventEmitter();
    this.dateAdapter = inject(DateAdapter);
  }
  /**
   * @hidden
   */
  onClick() {
    const subFn = {
      day: this.dateAdapter.subDays,
      week: this.dateAdapter.subWeeks,
      month: this.dateAdapter.subMonths
    }[this.view];
    if (this.view === CalendarView.Day) {
      this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -1, this.excludeDays));
    } else if (this.view === CalendarView.Week && this.daysInWeek) {
      this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -this.daysInWeek, this.excludeDays));
    } else {
      this.viewDateChange.emit(subFn(this.viewDate, 1));
    }
  }
};
_CalendarPreviousViewDirective.ɵfac = function CalendarPreviousViewDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarPreviousViewDirective)();
};
_CalendarPreviousViewDirective.ɵdir = ɵɵdefineDirective({
  type: _CalendarPreviousViewDirective,
  selectors: [["", "mwlCalendarPreviousView", ""]],
  hostBindings: function CalendarPreviousViewDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function CalendarPreviousViewDirective_click_HostBindingHandler() {
        return ctx.onClick();
      });
    }
  },
  inputs: {
    view: "view",
    viewDate: "viewDate",
    excludeDays: "excludeDays",
    daysInWeek: "daysInWeek"
  },
  outputs: {
    viewDateChange: "viewDateChange"
  }
});
var CalendarPreviousViewDirective = _CalendarPreviousViewDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarPreviousViewDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlCalendarPreviousView]"
    }]
  }], null, {
    view: [{
      type: Input
    }],
    viewDate: [{
      type: Input
    }],
    excludeDays: [{
      type: Input
    }],
    daysInWeek: [{
      type: Input
    }],
    viewDateChange: [{
      type: Output
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _CalendarNextViewDirective = class _CalendarNextViewDirective {
  constructor() {
    this.excludeDays = [];
    this.viewDateChange = new EventEmitter();
    this.dateAdapter = inject(DateAdapter);
  }
  /**
   * @hidden
   */
  onClick() {
    const addFn = {
      day: this.dateAdapter.addDays,
      week: this.dateAdapter.addWeeks,
      month: this.dateAdapter.addMonths
    }[this.view];
    if (this.view === CalendarView.Day) {
      this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 1, this.excludeDays));
    } else if (this.view === CalendarView.Week && this.daysInWeek) {
      this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, this.daysInWeek, this.excludeDays));
    } else {
      this.viewDateChange.emit(addFn(this.viewDate, 1));
    }
  }
};
_CalendarNextViewDirective.ɵfac = function CalendarNextViewDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarNextViewDirective)();
};
_CalendarNextViewDirective.ɵdir = ɵɵdefineDirective({
  type: _CalendarNextViewDirective,
  selectors: [["", "mwlCalendarNextView", ""]],
  hostBindings: function CalendarNextViewDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function CalendarNextViewDirective_click_HostBindingHandler() {
        return ctx.onClick();
      });
    }
  },
  inputs: {
    view: "view",
    viewDate: "viewDate",
    excludeDays: "excludeDays",
    daysInWeek: "daysInWeek"
  },
  outputs: {
    viewDateChange: "viewDateChange"
  }
});
var CalendarNextViewDirective = _CalendarNextViewDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarNextViewDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlCalendarNextView]"
    }]
  }], null, {
    view: [{
      type: Input
    }],
    viewDate: [{
      type: Input
    }],
    excludeDays: [{
      type: Input
    }],
    daysInWeek: [{
      type: Input
    }],
    viewDateChange: [{
      type: Output
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _CalendarTodayDirective = class _CalendarTodayDirective {
  constructor() {
    this.viewDateChange = new EventEmitter();
    this.dateAdapter = inject(DateAdapter);
  }
  /**
   * @hidden
   */
  onClick() {
    this.viewDateChange.emit(this.dateAdapter.startOfDay(/* @__PURE__ */ new Date()));
  }
};
_CalendarTodayDirective.ɵfac = function CalendarTodayDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarTodayDirective)();
};
_CalendarTodayDirective.ɵdir = ɵɵdefineDirective({
  type: _CalendarTodayDirective,
  selectors: [["", "mwlCalendarToday", ""]],
  hostBindings: function CalendarTodayDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function CalendarTodayDirective_click_HostBindingHandler() {
        return ctx.onClick();
      });
    }
  },
  inputs: {
    viewDate: "viewDate"
  },
  outputs: {
    viewDateChange: "viewDateChange"
  }
});
var CalendarTodayDirective = _CalendarTodayDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarTodayDirective, [{
    type: Directive,
    args: [{
      selector: "[mwlCalendarToday]"
    }]
  }], null, {
    viewDate: [{
      type: Input
    }],
    viewDateChange: [{
      type: Output
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _CalendarAngularDateFormatter = class _CalendarAngularDateFormatter {
  constructor() {
    this.dateAdapter = inject(DateAdapter);
  }
  /**
   * The month view header week day labels
   */
  monthViewColumnHeader({
    date,
    locale
  }) {
    return formatDate(date, "EEEE", locale);
  }
  /**
   * The month view cell day number
   */
  monthViewDayNumber({
    date,
    locale
  }) {
    return formatDate(date, "d", locale);
  }
  /**
   * The month view title
   */
  monthViewTitle({
    date,
    locale
  }) {
    return formatDate(date, "LLLL y", locale);
  }
  /**
   * The week view header week day labels
   */
  weekViewColumnHeader({
    date,
    locale
  }) {
    return formatDate(date, "EEEE", locale);
  }
  /**
   * The week view sub header day and month labels
   */
  weekViewColumnSubHeader({
    date,
    locale
  }) {
    return formatDate(date, "MMM d", locale);
  }
  /**
   * The week view title
   */
  weekViewTitle({
    date,
    locale,
    weekStartsOn,
    excludeDays,
    daysInWeek
  }) {
    const {
      viewStart,
      viewEnd
    } = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek);
    const format = (dateToFormat, showYear) => formatDate(dateToFormat, "MMM d" + (showYear ? ", yyyy" : ""), locale);
    return `${format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear())} - ${format(viewEnd, true)}`;
  }
  /**
   * The time formatting down the left hand side of the week view
   */
  weekViewHour({
    date,
    locale
  }) {
    return formatDate(date, "h a", locale);
  }
  /**
   * The time formatting down the left hand side of the day view
   */
  dayViewHour({
    date,
    locale
  }) {
    return formatDate(date, "h a", locale);
  }
  /**
   * The day view title
   */
  dayViewTitle({
    date,
    locale
  }) {
    return formatDate(date, "EEEE, MMMM d, y", locale);
  }
};
_CalendarAngularDateFormatter.ɵfac = function CalendarAngularDateFormatter_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarAngularDateFormatter)();
};
_CalendarAngularDateFormatter.ɵprov = ɵɵdefineInjectable({
  token: _CalendarAngularDateFormatter,
  factory: _CalendarAngularDateFormatter.ɵfac
});
var CalendarAngularDateFormatter = _CalendarAngularDateFormatter;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarAngularDateFormatter, [{
    type: Injectable
  }], null, null);
})();
var _CalendarDateFormatter = class _CalendarDateFormatter extends CalendarAngularDateFormatter {
};
_CalendarDateFormatter.ɵfac = /* @__PURE__ */ (() => {
  let ɵCalendarDateFormatter_BaseFactory;
  return function CalendarDateFormatter_Factory(__ngFactoryType__) {
    return (ɵCalendarDateFormatter_BaseFactory || (ɵCalendarDateFormatter_BaseFactory = ɵɵgetInheritedFactory(_CalendarDateFormatter)))(__ngFactoryType__ || _CalendarDateFormatter);
  };
})();
_CalendarDateFormatter.ɵprov = ɵɵdefineInjectable({
  token: _CalendarDateFormatter,
  factory: _CalendarDateFormatter.ɵfac
});
var CalendarDateFormatter = _CalendarDateFormatter;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarDateFormatter, [{
    type: Injectable
  }], null, null);
})();
var _CalendarDatePipe = class _CalendarDatePipe {
  constructor() {
    this.dateFormatter = inject(CalendarDateFormatter);
    this.locale = inject(LOCALE_ID);
  }
  transform(date, method, locale = this.locale, weekStartsOn = 0, excludeDays = [], daysInWeek) {
    if (typeof this.dateFormatter[method] === "undefined") {
      const allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarDateFormatter.prototype)).filter((iMethod) => iMethod !== "constructor");
      throw new Error(`${method} is not a valid date formatter. Can only be one of ${allowedMethods.join(", ")}`);
    }
    return this.dateFormatter[method]({
      date,
      locale,
      weekStartsOn,
      excludeDays,
      daysInWeek
    });
  }
};
_CalendarDatePipe.ɵfac = function CalendarDatePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarDatePipe)();
};
_CalendarDatePipe.ɵpipe = ɵɵdefinePipe({
  name: "calendarDate",
  type: _CalendarDatePipe,
  pure: true
});
var CalendarDatePipe = _CalendarDatePipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarDatePipe, [{
    type: Pipe,
    args: [{
      name: "calendarDate"
    }]
  }], null, null);
})();
var _CalendarUtils = class _CalendarUtils {
  constructor() {
    this.dateAdapter = inject(DateAdapter);
  }
  getMonthView(args) {
    return getMonthView(this.dateAdapter, args);
  }
  getWeekViewHeader(args) {
    return getWeekViewHeader(this.dateAdapter, args);
  }
  getWeekView(args) {
    return getWeekView(this.dateAdapter, args);
  }
};
_CalendarUtils.ɵfac = function CalendarUtils_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarUtils)();
};
_CalendarUtils.ɵprov = ɵɵdefineInjectable({
  token: _CalendarUtils,
  factory: _CalendarUtils.ɵfac
});
var CalendarUtils = _CalendarUtils;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarUtils, [{
    type: Injectable
  }], null, null);
})();
var MOMENT = new InjectionToken("Moment");
var _CalendarMomentDateFormatter = class _CalendarMomentDateFormatter {
  constructor() {
    this.moment = inject(MOMENT);
    this.dateAdapter = inject(DateAdapter);
  }
  /**
   * The month view header week day labels
   */
  monthViewColumnHeader({
    date,
    locale
  }) {
    return this.moment(date).locale(locale).format("dddd");
  }
  /**
   * The month view cell day number
   */
  monthViewDayNumber({
    date,
    locale
  }) {
    return this.moment(date).locale(locale).format("D");
  }
  /**
   * The month view title
   */
  monthViewTitle({
    date,
    locale
  }) {
    return this.moment(date).locale(locale).format("MMMM YYYY");
  }
  /**
   * The week view header week day labels
   */
  weekViewColumnHeader({
    date,
    locale
  }) {
    return this.moment(date).locale(locale).format("dddd");
  }
  /**
   * The week view sub header day and month labels
   */
  weekViewColumnSubHeader({
    date,
    locale
  }) {
    return this.moment(date).locale(locale).format("MMM D");
  }
  /**
   * The week view title
   */
  weekViewTitle({
    date,
    locale,
    weekStartsOn,
    excludeDays,
    daysInWeek
  }) {
    const {
      viewStart,
      viewEnd
    } = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek);
    const format = (dateToFormat, showYear) => this.moment(dateToFormat).locale(locale).format("MMM D" + (showYear ? ", YYYY" : ""));
    return `${format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear())} - ${format(viewEnd, true)}`;
  }
  /**
   * The time formatting down the left hand side of the week view
   */
  weekViewHour({
    date,
    locale
  }) {
    return this.moment(date).locale(locale).format("ha");
  }
  /**
   * The time formatting down the left hand side of the day view
   */
  dayViewHour({
    date,
    locale
  }) {
    return this.moment(date).locale(locale).format("ha");
  }
  /**
   * The day view title
   */
  dayViewTitle({
    date,
    locale
  }) {
    return this.moment(date).locale(locale).format("dddd, LL");
  }
};
_CalendarMomentDateFormatter.ɵfac = function CalendarMomentDateFormatter_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarMomentDateFormatter)();
};
_CalendarMomentDateFormatter.ɵprov = ɵɵdefineInjectable({
  token: _CalendarMomentDateFormatter,
  factory: _CalendarMomentDateFormatter.ɵfac
});
var CalendarMomentDateFormatter = _CalendarMomentDateFormatter;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarMomentDateFormatter, [{
    type: Injectable
  }], null, null);
})();
var _CalendarNativeDateFormatter = class _CalendarNativeDateFormatter {
  constructor() {
    this.dateAdapter = inject(DateAdapter);
  }
  /**
   * The month view header week day labels
   */
  monthViewColumnHeader({
    date,
    locale
  }) {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long"
    }).format(date);
  }
  /**
   * The month view cell day number
   */
  monthViewDayNumber({
    date,
    locale
  }) {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric"
    }).format(date);
  }
  /**
   * The month view title
   */
  monthViewTitle({
    date,
    locale
  }) {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long"
    }).format(date);
  }
  /**
   * The week view header week day labels
   */
  weekViewColumnHeader({
    date,
    locale
  }) {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long"
    }).format(date);
  }
  /**
   * The week view sub header day and month labels
   */
  weekViewColumnSubHeader({
    date,
    locale
  }) {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short"
    }).format(date);
  }
  /**
   * The week view title
   */
  weekViewTitle({
    date,
    locale,
    weekStartsOn,
    excludeDays,
    daysInWeek
  }) {
    const {
      viewStart,
      viewEnd
    } = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek);
    const format = (dateToFormat, showYear) => new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: showYear ? "numeric" : void 0
    }).format(dateToFormat);
    return `${format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear())} - ${format(viewEnd, true)}`;
  }
  /**
   * The time formatting down the left hand side of the week view
   */
  weekViewHour({
    date,
    locale
  }) {
    return new Intl.DateTimeFormat(locale, {
      hour: "numeric"
    }).format(date);
  }
  /**
   * The time formatting down the left hand side of the day view
   */
  dayViewHour({
    date,
    locale
  }) {
    return new Intl.DateTimeFormat(locale, {
      hour: "numeric"
    }).format(date);
  }
  /**
   * The day view title
   */
  dayViewTitle({
    date,
    locale
  }) {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long"
    }).format(date);
  }
};
_CalendarNativeDateFormatter.ɵfac = function CalendarNativeDateFormatter_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarNativeDateFormatter)();
};
_CalendarNativeDateFormatter.ɵprov = ɵɵdefineInjectable({
  token: _CalendarNativeDateFormatter,
  factory: _CalendarNativeDateFormatter.ɵfac
});
var CalendarNativeDateFormatter = _CalendarNativeDateFormatter;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarNativeDateFormatter, [{
    type: Injectable
  }], null, null);
})();
var CalendarEventTimesChangedEventType;
(function(CalendarEventTimesChangedEventType2) {
  CalendarEventTimesChangedEventType2["Drag"] = "drag";
  CalendarEventTimesChangedEventType2["Drop"] = "drop";
  CalendarEventTimesChangedEventType2["Resize"] = "resize";
})(CalendarEventTimesChangedEventType || (CalendarEventTimesChangedEventType = {}));
function provideCalendar(dateAdapter, config = {}) {
  return [dateAdapter, config.eventTitleFormatter || CalendarEventTitleFormatter, config.dateFormatter || CalendarDateFormatter, config.utils || CalendarUtils, config.a11y || CalendarA11y];
}
var _CalendarCommonModule = class _CalendarCommonModule {
  static forRoot(dateAdapter, config = {}) {
    return {
      ngModule: _CalendarCommonModule,
      providers: [dateAdapter, config.eventTitleFormatter || CalendarEventTitleFormatter, config.dateFormatter || CalendarDateFormatter, config.utils || CalendarUtils, config.a11y || CalendarA11y]
    };
  }
};
_CalendarCommonModule.ɵfac = function CalendarCommonModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarCommonModule)();
};
_CalendarCommonModule.ɵmod = ɵɵdefineNgModule({
  type: _CalendarCommonModule,
  imports: [CalendarEventActionsComponent, CalendarEventTitleComponent, CalendarTooltipWindowComponent, CalendarTooltipDirective, CalendarPreviousViewDirective, CalendarNextViewDirective, CalendarTodayDirective, CalendarDatePipe, CalendarEventTitlePipe, CalendarA11yPipe, ClickDirective, KeydownEnterDirective],
  exports: [CalendarEventActionsComponent, CalendarEventTitleComponent, CalendarTooltipWindowComponent, CalendarTooltipDirective, CalendarPreviousViewDirective, CalendarNextViewDirective, CalendarTodayDirective, CalendarDatePipe, CalendarEventTitlePipe, CalendarA11yPipe, ClickDirective, KeydownEnterDirective]
});
_CalendarCommonModule.ɵinj = ɵɵdefineInjector({});
var CalendarCommonModule = _CalendarCommonModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarCommonModule, [{
    type: NgModule,
    args: [{
      imports: [CalendarEventActionsComponent, CalendarEventTitleComponent, CalendarTooltipWindowComponent, CalendarTooltipDirective, CalendarPreviousViewDirective, CalendarNextViewDirective, CalendarTodayDirective, CalendarDatePipe, CalendarEventTitlePipe, CalendarA11yPipe, ClickDirective, KeydownEnterDirective],
      exports: [CalendarEventActionsComponent, CalendarEventTitleComponent, CalendarTooltipWindowComponent, CalendarTooltipDirective, CalendarPreviousViewDirective, CalendarNextViewDirective, CalendarTodayDirective, CalendarDatePipe, CalendarEventTitlePipe, CalendarA11yPipe, ClickDirective, KeydownEnterDirective]
    }]
  }], null, null);
})();
var _CalendarMonthViewHeaderComponent = class _CalendarMonthViewHeaderComponent {
  constructor() {
    this.columnHeaderClicked = new EventEmitter();
  }
};
_CalendarMonthViewHeaderComponent.ɵfac = function CalendarMonthViewHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarMonthViewHeaderComponent)();
};
_CalendarMonthViewHeaderComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarMonthViewHeaderComponent,
  selectors: [["mwl-calendar-month-view-header"]],
  inputs: {
    days: "days",
    locale: "locale",
    customTemplate: "customTemplate"
  },
  outputs: {
    columnHeaderClicked: "columnHeaderClicked"
  },
  decls: 3,
  vars: 5,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["role", "row", 1, "cal-cell-row", "cal-header"], ["tabindex", "0", "role", "columnheader", 1, "cal-cell", 3, "cal-past", "cal-today", "cal-future", "cal-weekend", "ngClass"], ["tabindex", "0", "role", "columnheader", 1, "cal-cell", 3, "click", "ngClass"]],
  template: function CalendarMonthViewHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarMonthViewHeaderComponent_ng_template_0_Template, 3, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarMonthViewHeaderComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r6 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r6)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c5, ctx.days, ctx.locale));
    }
  },
  dependencies: [NgClass, NgTemplateOutlet, CalendarDatePipe],
  encapsulation: 2
});
var CalendarMonthViewHeaderComponent = _CalendarMonthViewHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarMonthViewHeaderComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-month-view-header",
      template: `
    <ng-template #defaultTemplate let-days="days" let-locale="locale">
      <div class="cal-cell-row cal-header" role="row">
        @for (day of days; track day.date.toISOString()) {
          <div
            class="cal-cell"
            [class.cal-past]="day.isPast"
            [class.cal-today]="day.isToday"
            [class.cal-future]="day.isFuture"
            [class.cal-weekend]="day.isWeekend"
            (click)="
              columnHeaderClicked.emit({
                isoDayNumber: day.day,
                sourceEvent: $event,
              })
            "
            [ngClass]="day.cssClass"
            tabindex="0"
            role="columnheader"
          >
            {{ day.date | calendarDate: 'monthViewColumnHeader' : locale }}
          </div>
        }
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
      }"
    />
  `,
      imports: [NgClass, NgTemplateOutlet, CalendarDatePipe]
    }]
  }], null, {
    days: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }],
    columnHeaderClicked: [{
      type: Output
    }]
  });
})();
var _CalendarMonthCellComponent = class _CalendarMonthCellComponent {
  constructor() {
    this.highlightDay = new EventEmitter();
    this.unhighlightDay = new EventEmitter();
    this.eventClicked = new EventEmitter();
    this.validateDrag = isWithinThreshold;
  }
};
_CalendarMonthCellComponent.ɵfac = function CalendarMonthCellComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarMonthCellComponent)();
};
_CalendarMonthCellComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarMonthCellComponent,
  selectors: [["mwl-calendar-month-cell"]],
  hostAttrs: [1, "cal-cell", "cal-day-cell"],
  hostVars: 18,
  hostBindings: function CalendarMonthCellComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("cal-past", ctx.day.isPast)("cal-today", ctx.day.isToday)("cal-future", ctx.day.isFuture)("cal-weekend", ctx.day.isWeekend)("cal-in-month", ctx.day.inMonth)("cal-out-month", !ctx.day.inMonth)("cal-has-events", ctx.day.events.length > 0)("cal-open", ctx.day === ctx.openDay)("cal-event-highlight", !!ctx.day.backgroundColor);
    }
  },
  inputs: {
    day: "day",
    openDay: "openDay",
    locale: "locale",
    tooltipPlacement: "tooltipPlacement",
    tooltipAppendToBody: "tooltipAppendToBody",
    customTemplate: "customTemplate",
    tooltipTemplate: "tooltipTemplate",
    tooltipDelay: "tooltipDelay"
  },
  outputs: {
    highlightDay: "highlightDay",
    unhighlightDay: "unhighlightDay",
    eventClicked: "eventClicked"
  },
  decls: 3,
  vars: 14,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-cell-top"], ["aria-hidden", "true"], [1, "cal-day-badge"], [1, "cal-day-number"], [1, "cal-events"], ["mwlDraggable", "", "dragActiveClass", "cal-drag-active", 1, "cal-event", 3, "ngStyle", "ngClass", "mwlCalendarTooltip", "tooltipPlacement", "tooltipEvent", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "cal-draggable", "dropData", "dragAxis", "validateDrag", "touchStartLongPress"], ["mwlDraggable", "", "dragActiveClass", "cal-drag-active", 1, "cal-event", 3, "mouseenter", "mouseleave", "mwlClick", "ngStyle", "ngClass", "mwlCalendarTooltip", "tooltipPlacement", "tooltipEvent", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "dropData", "dragAxis", "validateDrag", "touchStartLongPress"]],
  template: function CalendarMonthCellComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarMonthCellComponent_ng_template_0_Template, 8, 14, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarMonthCellComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r14 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r14)("ngTemplateOutletContext", ɵɵpureFunctionV(2, _c6, [ctx.day, ctx.openDay, ctx.locale, ctx.tooltipPlacement, ctx.highlightDay, ctx.unhighlightDay, ctx.eventClicked, ctx.tooltipTemplate, ctx.tooltipAppendToBody, ctx.tooltipDelay, ctx.validateDrag]));
    }
  },
  dependencies: [DraggableDirective, NgStyle, NgClass, CalendarTooltipDirective, ClickDirective, NgTemplateOutlet, CalendarDatePipe, CalendarEventTitlePipe, CalendarA11yPipe],
  encapsulation: 2
});
var CalendarMonthCellComponent = _CalendarMonthCellComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarMonthCellComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-month-cell",
      template: `
    <ng-template
      #defaultTemplate
      let-day="day"
      let-openDay="openDay"
      let-locale="locale"
      let-tooltipPlacement="tooltipPlacement"
      let-highlightDay="highlightDay"
      let-unhighlightDay="unhighlightDay"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDelay="tooltipDelay"
      let-validateDrag="validateDrag"
    >
      <div
        class="cal-cell-top"
        [attr.aria-label]="
          { day: day, locale: locale } | calendarA11y: 'monthCell'
        "
      >
        <span aria-hidden="true">
          @if (day.badgeTotal > 0) {
            <span class="cal-day-badge">{{ day.badgeTotal }}</span>
          }
          <span class="cal-day-number">{{
            day.date | calendarDate: 'monthViewDayNumber' : locale
          }}</span>
        </span>
      </div>
      @if (day.events.length > 0) {
        <div class="cal-events">
          @for (event of day.events; track event.id ?? event) {
            <div
              class="cal-event"
              [ngStyle]="{ backgroundColor: event.color?.primary }"
              [ngClass]="event?.cssClass"
              (mouseenter)="highlightDay.emit({ event: event })"
              (mouseleave)="unhighlightDay.emit({ event: event })"
              [mwlCalendarTooltip]="
                event.title | calendarEventTitle: 'monthTooltip' : event
              "
              [tooltipPlacement]="tooltipPlacement"
              [tooltipEvent]="event"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipDelay]="tooltipDelay"
              mwlDraggable
              [class.cal-draggable]="event.draggable"
              dragActiveClass="cal-drag-active"
              [dropData]="{ event: event, draggedFrom: day }"
              [dragAxis]="{ x: event.draggable, y: event.draggable }"
              [validateDrag]="validateDrag"
              [touchStartLongPress]="{ delay: 300, delta: 30 }"
              (mwlClick)="
                eventClicked.emit({ event: event, sourceEvent: $event })
              "
              [attr.aria-hidden]="{} | calendarA11y: 'hideMonthCellEvents'"
            ></div>
          }
        </div>
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        day: day,
        openDay: openDay,
        locale: locale,
        tooltipPlacement: tooltipPlacement,
        highlightDay: highlightDay,
        unhighlightDay: unhighlightDay,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDelay: tooltipDelay,
        validateDrag: validateDrag,
      }"
    />
  `,
      host: {
        class: "cal-cell cal-day-cell",
        "[class.cal-past]": "day.isPast",
        "[class.cal-today]": "day.isToday",
        "[class.cal-future]": "day.isFuture",
        "[class.cal-weekend]": "day.isWeekend",
        "[class.cal-in-month]": "day.inMonth",
        "[class.cal-out-month]": "!day.inMonth",
        "[class.cal-has-events]": "day.events.length > 0",
        "[class.cal-open]": "day === openDay",
        "[class.cal-event-highlight]": "!!day.backgroundColor"
      },
      imports: [DraggableDirective, NgStyle, NgClass, CalendarTooltipDirective, ClickDirective, NgTemplateOutlet, CalendarDatePipe, CalendarEventTitlePipe, CalendarA11yPipe]
    }]
  }], null, {
    day: [{
      type: Input
    }],
    openDay: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    tooltipPlacement: [{
      type: Input
    }],
    tooltipAppendToBody: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }],
    tooltipTemplate: [{
      type: Input
    }],
    tooltipDelay: [{
      type: Input
    }],
    highlightDay: [{
      type: Output
    }],
    unhighlightDay: [{
      type: Output
    }],
    eventClicked: [{
      type: Output
    }]
  });
})();
var _CalendarOpenDayEventsComponent = class _CalendarOpenDayEventsComponent {
  constructor() {
    this.isOpen = false;
    this.eventClicked = new EventEmitter();
    this.validateDrag = isWithinThreshold;
  }
};
_CalendarOpenDayEventsComponent.ɵfac = function CalendarOpenDayEventsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarOpenDayEventsComponent)();
};
_CalendarOpenDayEventsComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarOpenDayEventsComponent,
  selectors: [["mwl-calendar-open-day-events"]],
  inputs: {
    locale: "locale",
    isOpen: "isOpen",
    events: "events",
    customTemplate: "customTemplate",
    eventTitleTemplate: "eventTitleTemplate",
    eventActionsTemplate: "eventActionsTemplate",
    date: "date"
  },
  outputs: {
    eventClicked: "eventClicked"
  },
  decls: 3,
  vars: 7,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["role", "application", 1, "cal-open-day-events"], ["tabindex", "-1", "role", "alert"], ["tabindex", "0", "role", "landmark"], ["mwlDraggable", "", "dragActiveClass", "cal-drag-active", 3, "ngClass", "cal-draggable", "dropData", "dragAxis", "validateDrag", "touchStartLongPress"], ["mwlDraggable", "", "dragActiveClass", "cal-drag-active", 3, "ngClass", "dropData", "dragAxis", "validateDrag", "touchStartLongPress"], [1, "cal-event", 3, "ngStyle"], ["view", "month", "tabindex", "0", 3, "mwlClick", "mwlKeydownEnter", "event", "customTemplate"], [3, "event", "customTemplate"]],
  template: function CalendarOpenDayEventsComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarOpenDayEventsComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarOpenDayEventsComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r8 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r8)("ngTemplateOutletContext", ɵɵpureFunction4(2, _c12, ctx.events, ctx.eventClicked, ctx.isOpen, ctx.validateDrag));
    }
  },
  dependencies: [DraggableDirective, NgClass, NgStyle, CalendarEventTitleComponent, ClickDirective, KeydownEnterDirective, CalendarEventActionsComponent, NgTemplateOutlet, CalendarA11yPipe],
  encapsulation: 2
});
var CalendarOpenDayEventsComponent = _CalendarOpenDayEventsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarOpenDayEventsComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-open-day-events",
      template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked"
      let-isOpen="isOpen"
      let-validateDrag="validateDrag"
    >
      @if (isOpen) {
        <div
          class="cal-open-day-events"
          animate.leave="cal-open-day-events-closing"
          role="application"
        >
          <span
            tabindex="-1"
            role="alert"
            [attr.aria-label]="
              { date: date, locale: locale }
                | calendarA11y: 'openDayEventsAlert'
            "
          ></span>
          <span
            tabindex="0"
            role="landmark"
            [attr.aria-label]="
              { date: date, locale: locale }
                | calendarA11y: 'openDayEventsLandmark'
            "
          ></span>
          @for (event of events; track event.id ?? event) {
            <div
              [ngClass]="event?.cssClass"
              mwlDraggable
              [class.cal-draggable]="event.draggable"
              dragActiveClass="cal-drag-active"
              [dropData]="{ event: event }"
              [dragAxis]="{ x: event.draggable, y: event.draggable }"
              [validateDrag]="validateDrag"
              [touchStartLongPress]="{ delay: 300, delta: 30 }"
            >
              <span
                class="cal-event"
                [ngStyle]="{ backgroundColor: event.color?.primary }"
              >
              </span>
              &ngsp;
              <mwl-calendar-event-title
                [event]="event"
                [customTemplate]="eventTitleTemplate"
                view="month"
                (mwlClick)="
                  eventClicked.emit({ event: event, sourceEvent: $event })
                "
                (mwlKeydownEnter)="
                  eventClicked.emit({ event: event, sourceEvent: $event })
                "
                tabindex="0"
                [attr.aria-label]="
                  { event: event, locale: locale }
                    | calendarA11y: 'eventDescription'
                "
              />
              &ngsp;
              <mwl-calendar-event-actions
                [event]="event"
                [customTemplate]="eventActionsTemplate"
              />
            </div>
          }
        </div>
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        events: events,
        eventClicked: eventClicked,
        isOpen: isOpen,
        validateDrag: validateDrag,
      }"
    />
  `,
      imports: [DraggableDirective, NgClass, NgStyle, CalendarEventTitleComponent, ClickDirective, KeydownEnterDirective, CalendarEventActionsComponent, NgTemplateOutlet, CalendarA11yPipe]
    }]
  }], null, {
    locale: [{
      type: Input
    }],
    isOpen: [{
      type: Input
    }],
    events: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }],
    eventTitleTemplate: [{
      type: Input
    }],
    eventActionsTemplate: [{
      type: Input
    }],
    date: [{
      type: Input
    }],
    eventClicked: [{
      type: Output
    }]
  });
})();
var _CalendarMonthViewComponent = class _CalendarMonthViewComponent {
  constructor() {
    this.events = [];
    this.excludeDays = [];
    this.activeDayIsOpen = false;
    this.locale = inject(LOCALE_ID);
    this.tooltipPlacement = "auto";
    this.tooltipAppendToBody = true;
    this.tooltipDelay = null;
    this.beforeViewRender = new EventEmitter();
    this.dayClicked = new EventEmitter();
    this.eventClicked = new EventEmitter();
    this.columnHeaderClicked = new EventEmitter();
    this.eventTimesChanged = new EventEmitter();
    this.cdr = inject(ChangeDetectorRef);
    this.utils = inject(CalendarUtils);
    this.dateAdapter = inject(DateAdapter);
  }
  /**
   * @hidden
   */
  ngOnInit() {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }
  /**
   * @hidden
   */
  ngOnChanges(changes) {
    const refreshHeader = changes.viewDate || changes.excludeDays || changes.weekendDays;
    const refreshBody = changes.viewDate || changes.events || changes.excludeDays || changes.weekendDays;
    if (refreshHeader) {
      this.refreshHeader();
    }
    if (changes.events) {
      validateEvents2(this.events);
    }
    if (refreshBody) {
      this.refreshBody();
    }
    if (refreshHeader || refreshBody) {
      this.emitBeforeViewRender();
    }
    if (changes.activeDayIsOpen || changes.viewDate || changes.events || changes.excludeDays || changes.activeDay) {
      this.checkActiveDayIsOpen();
    }
  }
  /**
   * @hidden
   */
  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
  /**
   * @hidden
   */
  toggleDayHighlight(event, isHighlighted) {
    this.view.days.forEach((day) => {
      if (isHighlighted && day.events.indexOf(event) > -1) {
        day.backgroundColor = event.color && event.color.secondary || "#D1E8FF";
      } else {
        delete day.backgroundColor;
      }
    });
  }
  /**
   * @hidden
   */
  eventDropped(droppedOn, event, draggedFrom) {
    if (droppedOn !== draggedFrom) {
      const year = this.dateAdapter.getYear(droppedOn.date);
      const month = this.dateAdapter.getMonth(droppedOn.date);
      const date = this.dateAdapter.getDate(droppedOn.date);
      const newStart = this.dateAdapter.setDate(this.dateAdapter.setMonth(this.dateAdapter.setYear(event.start, year), month), date);
      let newEnd;
      if (event.end) {
        const secondsDiff = this.dateAdapter.differenceInSeconds(newStart, event.start);
        newEnd = this.dateAdapter.addSeconds(event.end, secondsDiff);
      }
      this.eventTimesChanged.emit({
        event,
        newStart,
        newEnd,
        day: droppedOn,
        type: CalendarEventTimesChangedEventType.Drop
      });
    }
  }
  refreshHeader() {
    this.columnHeaders = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays
    });
  }
  refreshBody() {
    this.view = this.utils.getMonthView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays
    });
  }
  checkActiveDayIsOpen() {
    if (this.activeDayIsOpen === true) {
      const activeDay = this.activeDay || this.viewDate;
      this.openDay = this.view.days.find((day) => this.dateAdapter.isSameDay(day.date, activeDay));
      const index = this.view.days.indexOf(this.openDay);
      this.openRowIndex = Math.floor(index / this.view.totalDaysVisibleInWeek) * this.view.totalDaysVisibleInWeek;
    } else {
      this.openRowIndex = null;
      this.openDay = null;
    }
  }
  refreshAll() {
    this.refreshHeader();
    this.refreshBody();
    this.emitBeforeViewRender();
    this.checkActiveDayIsOpen();
  }
  emitBeforeViewRender() {
    if (this.columnHeaders && this.view) {
      this.beforeViewRender.emit({
        header: this.columnHeaders,
        body: this.view.days,
        period: this.view.period
      });
    }
  }
};
_CalendarMonthViewComponent.ɵfac = function CalendarMonthViewComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarMonthViewComponent)();
};
_CalendarMonthViewComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarMonthViewComponent,
  selectors: [["mwl-calendar-month-view"]],
  inputs: {
    viewDate: "viewDate",
    events: "events",
    excludeDays: "excludeDays",
    activeDayIsOpen: "activeDayIsOpen",
    activeDay: "activeDay",
    refresh: "refresh",
    locale: "locale",
    tooltipPlacement: "tooltipPlacement",
    tooltipTemplate: "tooltipTemplate",
    tooltipAppendToBody: "tooltipAppendToBody",
    tooltipDelay: "tooltipDelay",
    weekStartsOn: "weekStartsOn",
    headerTemplate: "headerTemplate",
    cellTemplate: "cellTemplate",
    openDayEventsTemplate: "openDayEventsTemplate",
    eventTitleTemplate: "eventTitleTemplate",
    eventActionsTemplate: "eventActionsTemplate",
    weekendDays: "weekendDays"
  },
  outputs: {
    beforeViewRender: "beforeViewRender",
    dayClicked: "dayClicked",
    eventClicked: "eventClicked",
    columnHeaderClicked: "columnHeaderClicked",
    eventTimesChanged: "eventTimesChanged"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 5,
  vars: 3,
  consts: [["role", "grid", 1, "cal-month-view"], [3, "columnHeaderClicked", "days", "locale", "customTemplate"], [1, "cal-days"], ["role", "row", 1, "cal-cell-row"], ["role", "gridcell", "mwlDroppable", "", "dragOverClass", "cal-drag-over", 3, "ngClass", "day", "openDay", "locale", "tooltipPlacement", "tooltipAppendToBody", "tooltipTemplate", "tooltipDelay", "customTemplate", "ngStyle", "clickListenerDisabled"], ["mwlDroppable", "", "dragOverClass", "cal-drag-over", 3, "eventClicked", "drop", "locale", "isOpen", "events", "date", "customTemplate", "eventTitleTemplate", "eventActionsTemplate"], ["role", "gridcell", "mwlDroppable", "", "dragOverClass", "cal-drag-over", 3, "mwlClick", "mwlKeydownEnter", "highlightDay", "unhighlightDay", "drop", "eventClicked", "ngClass", "day", "openDay", "locale", "tooltipPlacement", "tooltipAppendToBody", "tooltipTemplate", "tooltipDelay", "customTemplate", "ngStyle", "clickListenerDisabled"]],
  template: function CalendarMonthViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "mwl-calendar-month-view-header", 1);
      ɵɵlistener("columnHeaderClicked", function CalendarMonthViewComponent_Template_mwl_calendar_month_view_header_columnHeaderClicked_1_listener($event) {
        return ctx.columnHeaderClicked.emit($event);
      });
      ɵɵelementEnd();
      ɵɵelementStart(2, "div", 2);
      ɵɵrepeaterCreate(3, CalendarMonthViewComponent_For_4_Template, 6, 11, "div", null, ɵɵrepeaterTrackByIdentity);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("days", ctx.columnHeaders)("locale", ctx.locale)("customTemplate", ctx.headerTemplate);
      ɵɵadvance(2);
      ɵɵrepeater(ctx.view.rowOffsets);
    }
  },
  dependencies: [CalendarMonthViewHeaderComponent, CalendarMonthCellComponent, DroppableDirective, NgClass, NgStyle, ClickDirective, KeydownEnterDirective, CalendarOpenDayEventsComponent, SlicePipe, CalendarA11yPipe],
  encapsulation: 2
});
var CalendarMonthViewComponent = _CalendarMonthViewComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarMonthViewComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-month-view",
      template: `
    <div class="cal-month-view" role="grid">
      <mwl-calendar-month-view-header
        [days]="columnHeaders"
        [locale]="locale"
        (columnHeaderClicked)="columnHeaderClicked.emit($event)"
        [customTemplate]="headerTemplate"
      />
      <div class="cal-days">
        @for (rowIndex of view.rowOffsets; track rowIndex) {
          <div>
            <div role="row" class="cal-cell-row">
              @for (
                day of view.days
                  | slice: rowIndex : rowIndex + view.totalDaysVisibleInWeek;
                track day.date.toISOString()
              ) {
                <mwl-calendar-month-cell
                  role="gridcell"
                  [ngClass]="day?.cssClass"
                  [day]="day"
                  [openDay]="openDay"
                  [locale]="locale"
                  [tooltipPlacement]="tooltipPlacement"
                  [tooltipAppendToBody]="tooltipAppendToBody"
                  [tooltipTemplate]="tooltipTemplate"
                  [tooltipDelay]="tooltipDelay"
                  [customTemplate]="cellTemplate"
                  [ngStyle]="{ backgroundColor: day.backgroundColor }"
                  (mwlClick)="
                    dayClicked.emit({ day: day, sourceEvent: $event })
                  "
                  [clickListenerDisabled]="!dayClicked.observed"
                  (mwlKeydownEnter)="
                    dayClicked.emit({ day: day, sourceEvent: $event })
                  "
                  (highlightDay)="toggleDayHighlight($event.event, true)"
                  (unhighlightDay)="toggleDayHighlight($event.event, false)"
                  mwlDroppable
                  dragOverClass="cal-drag-over"
                  (drop)="
                    eventDropped(
                      day,
                      $event.dropData.event,
                      $event.dropData.draggedFrom
                    )
                  "
                  (eventClicked)="
                    eventClicked.emit({
                      event: $event.event,
                      sourceEvent: $event.sourceEvent,
                    })
                  "
                  [attr.tabindex]="{} | calendarA11y: 'monthCellTabIndex'"
                />
              }
            </div>
            <mwl-calendar-open-day-events
              [locale]="locale"
              [isOpen]="openRowIndex === rowIndex"
              [events]="openDay?.events"
              [date]="openDay?.date"
              [customTemplate]="openDayEventsTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              [eventActionsTemplate]="eventActionsTemplate"
              (eventClicked)="
                eventClicked.emit({
                  event: $event.event,
                  sourceEvent: $event.sourceEvent,
                })
              "
              mwlDroppable
              dragOverClass="cal-drag-over"
              (drop)="
                eventDropped(
                  openDay,
                  $event.dropData.event,
                  $event.dropData.draggedFrom
                )
              "
            />
          </div>
        }
      </div>
    </div>
  `,
      imports: [CalendarMonthViewHeaderComponent, CalendarMonthCellComponent, DroppableDirective, NgClass, NgStyle, ClickDirective, KeydownEnterDirective, CalendarOpenDayEventsComponent, SlicePipe, CalendarA11yPipe]
    }]
  }], null, {
    viewDate: [{
      type: Input
    }],
    events: [{
      type: Input
    }],
    excludeDays: [{
      type: Input
    }],
    activeDayIsOpen: [{
      type: Input
    }],
    activeDay: [{
      type: Input
    }],
    refresh: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    tooltipPlacement: [{
      type: Input
    }],
    tooltipTemplate: [{
      type: Input
    }],
    tooltipAppendToBody: [{
      type: Input
    }],
    tooltipDelay: [{
      type: Input
    }],
    weekStartsOn: [{
      type: Input
    }],
    headerTemplate: [{
      type: Input
    }],
    cellTemplate: [{
      type: Input
    }],
    openDayEventsTemplate: [{
      type: Input
    }],
    eventTitleTemplate: [{
      type: Input
    }],
    eventActionsTemplate: [{
      type: Input
    }],
    weekendDays: [{
      type: Input
    }],
    beforeViewRender: [{
      type: Output
    }],
    dayClicked: [{
      type: Output
    }],
    eventClicked: [{
      type: Output
    }],
    columnHeaderClicked: [{
      type: Output
    }],
    eventTimesChanged: [{
      type: Output
    }]
  });
})();
var _CalendarMonthModule = class _CalendarMonthModule {
};
_CalendarMonthModule.ɵfac = function CalendarMonthModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarMonthModule)();
};
_CalendarMonthModule.ɵmod = ɵɵdefineNgModule({
  type: _CalendarMonthModule,
  imports: [DragAndDropModule, CalendarCommonModule, CalendarMonthViewComponent, CalendarMonthCellComponent, CalendarOpenDayEventsComponent, CalendarMonthViewHeaderComponent],
  exports: [DragAndDropModule, CalendarMonthViewComponent, CalendarMonthCellComponent, CalendarOpenDayEventsComponent, CalendarMonthViewHeaderComponent]
});
_CalendarMonthModule.ɵinj = ɵɵdefineInjector({
  imports: [DragAndDropModule, CalendarCommonModule, DragAndDropModule]
});
var CalendarMonthModule = _CalendarMonthModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarMonthModule, [{
    type: NgModule,
    args: [{
      imports: [DragAndDropModule, CalendarCommonModule, CalendarMonthViewComponent, CalendarMonthCellComponent, CalendarOpenDayEventsComponent, CalendarMonthViewHeaderComponent],
      exports: [DragAndDropModule, CalendarMonthViewComponent, CalendarMonthCellComponent, CalendarOpenDayEventsComponent, CalendarMonthViewHeaderComponent]
    }]
  }], null, null);
})();
var CalendarDragHelper = class {
  constructor(dragContainerElement, draggableElement) {
    this.dragContainerElement = dragContainerElement;
    this.startPosition = draggableElement.getBoundingClientRect();
  }
  validateDrag({
    x,
    y,
    snapDraggedEvents,
    dragAlreadyMoved,
    transform
  }) {
    const isDraggedWithinThreshold = isWithinThreshold({
      x,
      y
    }) || dragAlreadyMoved;
    if (snapDraggedEvents) {
      const inner = Object.assign({}, this.startPosition, {
        left: this.startPosition.left + transform.x,
        right: this.startPosition.right + transform.x,
        top: this.startPosition.top + transform.y,
        bottom: this.startPosition.bottom + transform.y
      });
      if (isDraggedWithinThreshold) {
        const outer = this.dragContainerElement.getBoundingClientRect();
        const isTopInside = outer.top < inner.top && inner.top < outer.bottom;
        const isBottomInside = outer.top < inner.bottom && inner.bottom < outer.bottom;
        return isInsideLeftAndRight(outer, inner) && (isTopInside || isBottomInside);
      }
      return false;
    } else {
      return isDraggedWithinThreshold;
    }
  }
};
var CalendarResizeHelper = class {
  constructor(resizeContainerElement, minWidth, rtl) {
    this.resizeContainerElement = resizeContainerElement;
    this.minWidth = minWidth;
    this.rtl = rtl;
  }
  validateResize({
    rectangle,
    edges
  }) {
    if (this.rtl) {
      if (typeof edges.left !== "undefined") {
        rectangle.left -= edges.left;
        rectangle.right += edges.left;
      } else if (typeof edges.right !== "undefined") {
        rectangle.left += edges.right;
        rectangle.right -= edges.right;
      }
      rectangle.width = rectangle.right - rectangle.left;
    }
    if (this.minWidth && Math.ceil(rectangle.width) < Math.ceil(this.minWidth)) {
      return false;
    }
    return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
  }
};
var _CalendarWeekViewHeaderComponent = class _CalendarWeekViewHeaderComponent {
  constructor() {
    this.dayHeaderClicked = new EventEmitter();
    this.eventDropped = new EventEmitter();
    this.dragEnter = new EventEmitter();
  }
};
_CalendarWeekViewHeaderComponent.ɵfac = function CalendarWeekViewHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarWeekViewHeaderComponent)();
};
_CalendarWeekViewHeaderComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarWeekViewHeaderComponent,
  selectors: [["mwl-calendar-week-view-header"]],
  inputs: {
    days: "days",
    locale: "locale",
    customTemplate: "customTemplate"
  },
  outputs: {
    dayHeaderClicked: "dayHeaderClicked",
    eventDropped: "eventDropped",
    dragEnter: "dragEnter"
  },
  decls: 3,
  vars: 8,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["role", "row", 1, "cal-day-headers"], ["mwlDroppable", "", "dragOverClass", "cal-drag-over", "tabindex", "0", "role", "columnheader", 1, "cal-header", 3, "cal-past", "cal-today", "cal-future", "cal-weekend", "ngClass"], ["mwlDroppable", "", "dragOverClass", "cal-drag-over", "tabindex", "0", "role", "columnheader", 1, "cal-header", 3, "mwlClick", "drop", "dragEnter", "ngClass"]],
  template: function CalendarWeekViewHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarWeekViewHeaderComponent_ng_template_0_Template, 3, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarWeekViewHeaderComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r8 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r8)("ngTemplateOutletContext", ɵɵpureFunction5(2, _c15, ctx.days, ctx.locale, ctx.dayHeaderClicked, ctx.eventDropped, ctx.dragEnter));
    }
  },
  dependencies: [DroppableDirective, NgClass, ClickDirective, NgTemplateOutlet, CalendarDatePipe],
  encapsulation: 2
});
var CalendarWeekViewHeaderComponent = _CalendarWeekViewHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarWeekViewHeaderComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-week-view-header",
      template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-dayHeaderClicked="dayHeaderClicked"
      let-eventDropped="eventDropped"
      let-dragEnter="dragEnter"
    >
      <div class="cal-day-headers" role="row">
        @for (day of days; track day.date.toISOString()) {
          <div
            class="cal-header"
            [class.cal-past]="day.isPast"
            [class.cal-today]="day.isToday"
            [class.cal-future]="day.isFuture"
            [class.cal-weekend]="day.isWeekend"
            [ngClass]="day.cssClass"
            (mwlClick)="
              dayHeaderClicked.emit({ day: day, sourceEvent: $event })
            "
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="
              eventDropped.emit({
                event: $event.dropData.event,
                newStart: day.date,
              })
            "
            (dragEnter)="dragEnter.emit({ date: day.date })"
            tabindex="0"
            role="columnheader"
          >
            <b>{{ day.date | calendarDate: 'weekViewColumnHeader' : locale }}</b
            ><br />
            <span>{{
              day.date | calendarDate: 'weekViewColumnSubHeader' : locale
            }}</span>
          </div>
        }
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
        dayHeaderClicked: dayHeaderClicked,
        eventDropped: eventDropped,
        dragEnter: dragEnter,
      }"
    />
  `,
      imports: [DroppableDirective, NgClass, ClickDirective, NgTemplateOutlet, CalendarDatePipe]
    }]
  }], null, {
    days: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }],
    dayHeaderClicked: [{
      type: Output
    }],
    eventDropped: [{
      type: Output
    }],
    dragEnter: [{
      type: Output
    }]
  });
})();
var _CalendarWeekViewEventComponent = class _CalendarWeekViewEventComponent {
  constructor() {
    this.eventClicked = new EventEmitter();
  }
};
_CalendarWeekViewEventComponent.ɵfac = function CalendarWeekViewEventComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarWeekViewEventComponent)();
};
_CalendarWeekViewEventComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarWeekViewEventComponent,
  selectors: [["mwl-calendar-week-view-event"]],
  inputs: {
    locale: "locale",
    weekEvent: "weekEvent",
    tooltipPlacement: "tooltipPlacement",
    tooltipAppendToBody: "tooltipAppendToBody",
    tooltipDisabled: "tooltipDisabled",
    tooltipDelay: "tooltipDelay",
    customTemplate: "customTemplate",
    eventTitleTemplate: "eventTitleTemplate",
    eventActionsTemplate: "eventActionsTemplate",
    tooltipTemplate: "tooltipTemplate",
    column: "column",
    daysInWeek: "daysInWeek"
  },
  outputs: {
    eventClicked: "eventClicked"
  },
  decls: 3,
  vars: 12,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["tabindex", "0", "role", "application", 1, "cal-event", 3, "mwlClick", "mwlKeydownEnter", "ngStyle", "mwlCalendarTooltip", "tooltipPlacement", "tooltipEvent", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay"], [3, "event", "customTemplate"], [3, "event", "customTemplate", "view"]],
  template: function CalendarWeekViewEventComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarWeekViewEventComponent_ng_template_0_Template, 6, 27, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarWeekViewEventComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r11 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r11)("ngTemplateOutletContext", ɵɵpureFunctionV(2, _c16, [ctx.weekEvent, ctx.tooltipPlacement, ctx.eventClicked, ctx.tooltipTemplate, ctx.tooltipAppendToBody, ctx.tooltipDisabled, ctx.tooltipDelay, ctx.column, ctx.daysInWeek]));
    }
  },
  dependencies: [NgStyle, CalendarTooltipDirective, ClickDirective, KeydownEnterDirective, CalendarEventActionsComponent, CalendarEventTitleComponent, NgTemplateOutlet, CalendarEventTitlePipe, CalendarA11yPipe],
  encapsulation: 2
});
var CalendarWeekViewEventComponent = _CalendarWeekViewEventComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarWeekViewEventComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-week-view-event",
      template: `
    <ng-template
      #defaultTemplate
      let-weekEvent="weekEvent"
      let-tooltipPlacement="tooltipPlacement"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody"
      let-tooltipDisabled="tooltipDisabled"
      let-tooltipDelay="tooltipDelay"
      let-column="column"
      let-daysInWeek="daysInWeek"
    >
      <div
        class="cal-event"
        [ngStyle]="{
          color: weekEvent.event.color?.secondaryText,
          backgroundColor: weekEvent.event.color?.secondary,
          borderColor: weekEvent.event.color?.primary,
        }"
        [mwlCalendarTooltip]="
          !tooltipDisabled
            ? (weekEvent.event.title
              | calendarEventTitle
                : (daysInWeek === 1 ? 'dayTooltip' : 'weekTooltip')
                : weekEvent.tempEvent || weekEvent.event)
            : ''
        "
        [tooltipPlacement]="tooltipPlacement"
        [tooltipEvent]="weekEvent.tempEvent || weekEvent.event"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipAppendToBody]="tooltipAppendToBody"
        [tooltipDelay]="tooltipDelay"
        (mwlClick)="eventClicked.emit({ sourceEvent: $event })"
        (mwlKeydownEnter)="eventClicked.emit({ sourceEvent: $event })"
        tabindex="0"
        role="application"
        [attr.aria-label]="
          { event: weekEvent.tempEvent || weekEvent.event, locale: locale }
            | calendarA11y: 'eventDescription'
        "
      >
        <mwl-calendar-event-actions
          [event]="weekEvent.tempEvent || weekEvent.event"
          [customTemplate]="eventActionsTemplate"
        />
        &ngsp;
        <mwl-calendar-event-title
          [event]="weekEvent.tempEvent || weekEvent.event"
          [customTemplate]="eventTitleTemplate"
          [view]="daysInWeek === 1 ? 'day' : 'week'"
        />
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        weekEvent: weekEvent,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody,
        tooltipDisabled: tooltipDisabled,
        tooltipDelay: tooltipDelay,
        column: column,
        daysInWeek: daysInWeek,
      }"
    />
  `,
      imports: [NgStyle, CalendarTooltipDirective, ClickDirective, KeydownEnterDirective, CalendarEventActionsComponent, CalendarEventTitleComponent, NgTemplateOutlet, CalendarEventTitlePipe, CalendarA11yPipe]
    }]
  }], null, {
    locale: [{
      type: Input
    }],
    weekEvent: [{
      type: Input
    }],
    tooltipPlacement: [{
      type: Input
    }],
    tooltipAppendToBody: [{
      type: Input
    }],
    tooltipDisabled: [{
      type: Input
    }],
    tooltipDelay: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }],
    eventTitleTemplate: [{
      type: Input
    }],
    eventActionsTemplate: [{
      type: Input
    }],
    tooltipTemplate: [{
      type: Input
    }],
    column: [{
      type: Input
    }],
    daysInWeek: [{
      type: Input
    }],
    eventClicked: [{
      type: Output
    }]
  });
})();
var _CalendarWeekViewHourSegmentComponent = class _CalendarWeekViewHourSegmentComponent {
};
_CalendarWeekViewHourSegmentComponent.ɵfac = function CalendarWeekViewHourSegmentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarWeekViewHourSegmentComponent)();
};
_CalendarWeekViewHourSegmentComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarWeekViewHourSegmentComponent,
  selectors: [["mwl-calendar-week-view-hour-segment"]],
  inputs: {
    segment: "segment",
    segmentHeight: "segmentHeight",
    locale: "locale",
    isTimeLabel: "isTimeLabel",
    daysInWeek: "daysInWeek",
    customTemplate: "customTemplate"
  },
  decls: 3,
  vars: 8,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-hour-segment", 3, "ngClass"], [1, "cal-time"]],
  template: function CalendarWeekViewHourSegmentComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarWeekViewHourSegmentComponent_ng_template_0_Template, 3, 13, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarWeekViewHourSegmentComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const defaultTemplate_r7 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r7)("ngTemplateOutletContext", ɵɵpureFunction5(2, _c18, ctx.segment, ctx.locale, ctx.segmentHeight, ctx.isTimeLabel, ctx.daysInWeek));
    }
  },
  dependencies: [NgClass, NgTemplateOutlet, CalendarDatePipe, CalendarA11yPipe],
  encapsulation: 2
});
var CalendarWeekViewHourSegmentComponent = _CalendarWeekViewHourSegmentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarWeekViewHourSegmentComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-week-view-hour-segment",
      template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale"
      let-segmentHeight="segmentHeight"
      let-isTimeLabel="isTimeLabel"
      let-daysInWeek="daysInWeek"
    >
      <div
        [attr.aria-hidden]="
          {}
            | calendarA11y
              : (daysInWeek === 1
                  ? 'hideDayHourSegment'
                  : 'hideWeekHourSegment')
        "
        class="cal-hour-segment"
        [style.height.px]="segmentHeight"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass"
      >
        @if (isTimeLabel) {
          <div class="cal-time">
            {{
              segment.displayDate
                | calendarDate
                  : (daysInWeek === 1 ? 'dayViewHour' : 'weekViewHour')
                  : locale
            }}
          </div>
        }
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale,
        segmentHeight: segmentHeight,
        isTimeLabel: isTimeLabel,
        daysInWeek: daysInWeek,
      }"
    />
  `,
      imports: [NgClass, NgTemplateOutlet, CalendarDatePipe, CalendarA11yPipe]
    }]
  }], null, {
    segment: [{
      type: Input
    }],
    segmentHeight: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    isTimeLabel: [{
      type: Input
    }],
    daysInWeek: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }]
  });
})();
var _CalendarWeekViewCurrentTimeMarkerComponent = class _CalendarWeekViewCurrentTimeMarkerComponent {
  constructor() {
    this.columnDate$ = new BehaviorSubject(void 0);
    this.dateAdapter = inject(DateAdapter);
    this.zone = inject(NgZone);
    this.marker$ = this.zone.onStable.pipe(switchMap(() => interval(60 * 1e3)), startWith(0), switchMap(() => this.columnDate$), map((columnDate) => {
      const startOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayStartHour), this.dayStartMinute);
      const endOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayEndHour), this.dayEndMinute);
      const hourHeightModifier = this.hourSegments * this.hourSegmentHeight / (this.hourDuration || 60);
      const now = /* @__PURE__ */ new Date();
      return {
        isVisible: this.dateAdapter.isSameDay(columnDate, now) && now >= startOfDay && now <= endOfDay,
        top: this.dateAdapter.differenceInMinutes(now, startOfDay) * hourHeightModifier
      };
    }));
  }
  ngOnChanges(changes) {
    if (changes.columnDate) {
      this.columnDate$.next(changes.columnDate.currentValue);
    }
  }
};
_CalendarWeekViewCurrentTimeMarkerComponent.ɵfac = function CalendarWeekViewCurrentTimeMarkerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarWeekViewCurrentTimeMarkerComponent)();
};
_CalendarWeekViewCurrentTimeMarkerComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarWeekViewCurrentTimeMarkerComponent,
  selectors: [["mwl-calendar-week-view-current-time-marker"]],
  inputs: {
    columnDate: "columnDate",
    dayStartHour: "dayStartHour",
    dayStartMinute: "dayStartMinute",
    dayEndHour: "dayEndHour",
    dayEndMinute: "dayEndMinute",
    hourSegments: "hourSegments",
    hourDuration: "hourDuration",
    hourSegmentHeight: "hourSegmentHeight",
    customTemplate: "customTemplate"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 5,
  vars: 14,
  consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-current-time-marker", 3, "top"], [1, "cal-current-time-marker"]],
  template: function CalendarWeekViewCurrentTimeMarkerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CalendarWeekViewCurrentTimeMarkerComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CalendarWeekViewCurrentTimeMarkerComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
      ɵɵpipe(3, "async");
      ɵɵpipe(4, "async");
    }
    if (rf & 2) {
      let tmp_2_0;
      const defaultTemplate_r3 = ɵɵreference(1);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || defaultTemplate_r3)("ngTemplateOutletContext", ɵɵpureFunction7(6, _c19, ctx.columnDate, ctx.dayStartHour, ctx.dayStartMinute, ctx.dayEndHour, ctx.dayEndMinute, (tmp_2_0 = ɵɵpipeBind1(3, 2, ctx.marker$)) == null ? null : tmp_2_0.isVisible, (tmp_2_0 = ɵɵpipeBind1(4, 4, ctx.marker$)) == null ? null : tmp_2_0.top));
    }
  },
  dependencies: [NgTemplateOutlet, AsyncPipe],
  encapsulation: 2
});
var CalendarWeekViewCurrentTimeMarkerComponent = _CalendarWeekViewCurrentTimeMarkerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarWeekViewCurrentTimeMarkerComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-week-view-current-time-marker",
      template: `
    <ng-template
      #defaultTemplate
      let-columnDate="columnDate"
      let-dayStartHour="dayStartHour"
      let-dayStartMinute="dayStartMinute"
      let-dayEndHour="dayEndHour"
      let-dayEndMinute="dayEndMinute"
      let-isVisible="isVisible"
      let-topPx="topPx"
    >
      @if (isVisible) {
        <div class="cal-current-time-marker" [style.top.px]="topPx"></div>
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute,
        isVisible: (marker$ | async)?.isVisible,
        topPx: (marker$ | async)?.top,
      }"
    />
  `,
      imports: [NgTemplateOutlet, AsyncPipe]
    }]
  }], null, {
    columnDate: [{
      type: Input
    }],
    dayStartHour: [{
      type: Input
    }],
    dayStartMinute: [{
      type: Input
    }],
    dayEndHour: [{
      type: Input
    }],
    dayEndMinute: [{
      type: Input
    }],
    hourSegments: [{
      type: Input
    }],
    hourDuration: [{
      type: Input
    }],
    hourSegmentHeight: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }]
  });
})();
var _CalendarWeekViewComponent = class _CalendarWeekViewComponent {
  constructor() {
    this.events = [];
    this.excludeDays = [];
    this.locale = inject(LOCALE_ID);
    this.tooltipPlacement = "auto";
    this.tooltipAppendToBody = true;
    this.tooltipDelay = null;
    this.precision = "days";
    this.snapDraggedEvents = true;
    this.hourSegments = 2;
    this.hourSegmentHeight = 30;
    this.minimumEventHeight = 30;
    this.dayStartHour = 0;
    this.dayStartMinute = 0;
    this.dayEndHour = 23;
    this.dayEndMinute = 59;
    this.dayHeaderClicked = new EventEmitter();
    this.eventClicked = new EventEmitter();
    this.eventTimesChanged = new EventEmitter();
    this.beforeViewRender = new EventEmitter();
    this.hourSegmentClicked = new EventEmitter();
    this.allDayEventResizes = /* @__PURE__ */ new Map();
    this.timeEventResizes = /* @__PURE__ */ new Map();
    this.eventDragEnterByType = {
      allDay: 0,
      time: 0
    };
    this.dragActive = false;
    this.dragAlreadyMoved = false;
    this.calendarId = Symbol("angular calendar week view id");
    this.rtl = false;
    this.cdr = inject(ChangeDetectorRef);
    this.utils = inject(CalendarUtils);
    this.dateAdapter = inject(DateAdapter);
    this.element = inject(ElementRef);
  }
  /**
   * @hidden
   */
  ngOnInit() {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }
  /**
   * @hidden
   */
  ngOnChanges(changes) {
    const refreshHeader = changes.viewDate || changes.excludeDays || changes.weekendDays || changes.daysInWeek || changes.weekStartsOn;
    const refreshBody = changes.viewDate || changes.dayStartHour || changes.dayStartMinute || changes.dayEndHour || changes.dayEndMinute || changes.hourSegments || changes.hourDuration || changes.weekStartsOn || changes.weekendDays || changes.excludeDays || changes.hourSegmentHeight || changes.events || changes.daysInWeek || changes.minimumEventHeight;
    if (refreshHeader) {
      this.refreshHeader();
    }
    if (changes.events) {
      validateEvents2(this.events);
    }
    if (refreshBody) {
      this.refreshBody();
    }
    if (refreshHeader || refreshBody) {
      this.emitBeforeViewRender();
    }
  }
  /**
   * @hidden
   */
  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
  /**
   * @hidden
   */
  ngAfterViewInit() {
    this.rtl = typeof window !== "undefined" && getComputedStyle(this.element.nativeElement).direction === "rtl";
    this.cdr.detectChanges();
  }
  /**
   * @hidden
   */
  timeEventResizeStarted(eventsContainer, timeEvent, resizeEvent) {
    this.timeEventResizes.set(timeEvent.event, resizeEvent);
    this.resizeStarted(eventsContainer, timeEvent);
  }
  /**
   * @hidden
   */
  timeEventResizing(timeEvent, resizeEvent) {
    this.timeEventResizes.set(timeEvent.event, resizeEvent);
    const adjustedEvents = /* @__PURE__ */ new Map();
    const tempEvents = [...this.events];
    this.timeEventResizes.forEach((lastResizeEvent, event) => {
      const newEventDates = this.getTimeEventResizedDates(event, lastResizeEvent);
      const adjustedEvent = __spreadValues(__spreadValues({}, event), newEventDates);
      adjustedEvents.set(adjustedEvent, event);
      const eventIndex = tempEvents.indexOf(event);
      tempEvents[eventIndex] = adjustedEvent;
    });
    this.restoreOriginalEvents(tempEvents, adjustedEvents, true);
  }
  /**
   * @hidden
   */
  timeEventResizeEnded(timeEvent) {
    this.view = this.getWeekView(this.events);
    const lastResizeEvent = this.timeEventResizes.get(timeEvent.event);
    if (lastResizeEvent) {
      this.timeEventResizes.delete(timeEvent.event);
      const newEventDates = this.getTimeEventResizedDates(timeEvent.event, lastResizeEvent);
      this.eventTimesChanged.emit({
        newStart: newEventDates.start,
        newEnd: newEventDates.end,
        event: timeEvent.event,
        type: CalendarEventTimesChangedEventType.Resize
      });
    }
  }
  /**
   * @hidden
   */
  allDayEventResizeStarted(allDayEventsContainer, allDayEvent, resizeEvent) {
    this.allDayEventResizes.set(allDayEvent, {
      originalOffset: allDayEvent.offset,
      originalSpan: allDayEvent.span,
      edge: typeof resizeEvent.edges.left !== "undefined" ? "left" : "right"
    });
    this.resizeStarted(allDayEventsContainer, allDayEvent, this.getDayColumnWidth(allDayEventsContainer));
  }
  /**
   * @hidden
   */
  allDayEventResizing(allDayEvent, resizeEvent, dayWidth) {
    const currentResize = this.allDayEventResizes.get(allDayEvent);
    const modifier = this.rtl ? -1 : 1;
    if (typeof resizeEvent.edges.left !== "undefined") {
      const diff = Math.round(+resizeEvent.edges.left / dayWidth) * modifier;
      allDayEvent.offset = currentResize.originalOffset + diff;
      allDayEvent.span = currentResize.originalSpan - diff;
    } else if (typeof resizeEvent.edges.right !== "undefined") {
      const diff = Math.round(+resizeEvent.edges.right / dayWidth) * modifier;
      allDayEvent.span = currentResize.originalSpan + diff;
    }
  }
  /**
   * @hidden
   */
  allDayEventResizeEnded(allDayEvent) {
    const currentResize = this.allDayEventResizes.get(allDayEvent);
    if (currentResize) {
      const allDayEventResizingBeforeStart = currentResize.edge === "left";
      let daysDiff;
      if (allDayEventResizingBeforeStart) {
        daysDiff = allDayEvent.offset - currentResize.originalOffset;
      } else {
        daysDiff = allDayEvent.span - currentResize.originalSpan;
      }
      allDayEvent.offset = currentResize.originalOffset;
      allDayEvent.span = currentResize.originalSpan;
      const newDates = this.getAllDayEventResizedDates(allDayEvent.event, daysDiff, allDayEventResizingBeforeStart);
      this.eventTimesChanged.emit({
        newStart: newDates.start,
        newEnd: newDates.end,
        event: allDayEvent.event,
        type: CalendarEventTimesChangedEventType.Resize
      });
      this.allDayEventResizes.delete(allDayEvent);
    }
  }
  /**
   * @hidden
   */
  getDayColumnWidth(eventRowContainer) {
    return Math.floor(eventRowContainer.offsetWidth / this.days.length);
  }
  /**
   * @hidden
   */
  dateDragEnter(date) {
    this.lastDragEnterDate = date;
  }
  /**
   * @hidden
   */
  eventDropped(dropEvent, date, allDay) {
    if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId) && this.lastDragEnterDate.getTime() === date.getTime() && (!this.snapDraggedEvents || dropEvent.dropData.event !== this.lastDraggedEvent)) {
      this.eventTimesChanged.emit({
        type: CalendarEventTimesChangedEventType.Drop,
        event: dropEvent.dropData.event,
        newStart: date,
        allDay
      });
    }
    this.lastDraggedEvent = null;
  }
  /**
   * @hidden
   */
  dragEnter(type) {
    this.eventDragEnterByType[type]++;
  }
  /**
   * @hidden
   */
  dragLeave(type) {
    this.eventDragEnterByType[type]--;
  }
  /**
   * @hidden
   */
  dragStarted(eventsContainerElement, eventElement, event, useY) {
    this.dayColumnWidth = this.getDayColumnWidth(eventsContainerElement);
    const dragHelper = new CalendarDragHelper(eventsContainerElement, eventElement);
    this.validateDrag = ({
      x,
      y,
      transform
    }) => {
      const isAllowed = this.allDayEventResizes.size === 0 && this.timeEventResizes.size === 0 && dragHelper.validateDrag({
        x,
        y,
        snapDraggedEvents: this.snapDraggedEvents,
        dragAlreadyMoved: this.dragAlreadyMoved,
        transform
      });
      if (isAllowed && this.validateEventTimesChanged) {
        const newEventTimes = this.getDragMovedEventTimes(event, {
          x,
          y
        }, this.dayColumnWidth, useY);
        return this.validateEventTimesChanged({
          type: CalendarEventTimesChangedEventType.Drag,
          event: event.event,
          newStart: newEventTimes.start,
          newEnd: newEventTimes.end
        });
      }
      return isAllowed;
    };
    this.dragActive = true;
    this.dragAlreadyMoved = false;
    this.lastDraggedEvent = null;
    this.eventDragEnterByType = {
      allDay: 0,
      time: 0
    };
    if (!this.snapDraggedEvents && useY) {
      this.view.hourColumns.forEach((column) => {
        const linkedEvent = column.events.find((columnEvent) => columnEvent.event === event.event && columnEvent !== event);
        if (linkedEvent) {
          linkedEvent.width = 0;
          linkedEvent.height = 0;
        }
      });
    }
    this.cdr.markForCheck();
  }
  /**
   * @hidden
   */
  dragMove(dayEvent, dragEvent) {
    const newEventTimes = this.getDragMovedEventTimes(dayEvent, dragEvent, this.dayColumnWidth, true);
    const originalEvent = dayEvent.event;
    const adjustedEvent = __spreadValues(__spreadValues({}, originalEvent), newEventTimes);
    const tempEvents = this.events.map((event) => {
      if (event === originalEvent) {
        return adjustedEvent;
      }
      return event;
    });
    this.restoreOriginalEvents(tempEvents, /* @__PURE__ */ new Map([[adjustedEvent, originalEvent]]), this.snapDraggedEvents);
    this.dragAlreadyMoved = true;
  }
  /**
   * @hidden
   */
  allDayEventDragMove() {
    this.dragAlreadyMoved = true;
  }
  /**
   * @hidden
   */
  dragEnded(weekEvent, dragEndEvent, dayWidth, useY = false) {
    this.view = this.getWeekView(this.events);
    this.dragActive = false;
    this.validateDrag = null;
    const {
      start,
      end
    } = this.getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY);
    if ((this.snapDraggedEvents || this.eventDragEnterByType[useY ? "time" : "allDay"] > 0) && isDraggedWithinPeriod(start, end, this.view.period)) {
      this.lastDraggedEvent = weekEvent.event;
      this.eventTimesChanged.emit({
        newStart: start,
        newEnd: end,
        event: weekEvent.event,
        type: CalendarEventTimesChangedEventType.Drag,
        allDay: !useY
      });
    }
  }
  refreshHeader() {
    this.days = this.utils.getWeekViewHeader(__spreadValues({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays
    }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
  }
  refreshBody() {
    this.view = this.getWeekView(this.events);
  }
  refreshAll() {
    this.refreshHeader();
    this.refreshBody();
    this.emitBeforeViewRender();
  }
  emitBeforeViewRender() {
    if (this.days && this.view) {
      this.beforeViewRender.emit(__spreadValues({
        header: this.days
      }, this.view));
    }
  }
  getWeekView(events) {
    return this.utils.getWeekView(__spreadValues({
      events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      hourDuration: this.hourDuration,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays,
      minimumEventHeight: this.minimumEventHeight
    }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
  }
  getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY) {
    const daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth * (this.rtl ? -1 : 1);
    const minutesMoved = useY ? getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize, this.hourDuration) : 0;
    const start = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.start, daysDragged, this.excludeDays), minutesMoved);
    let end;
    if (weekEvent.event.end) {
      end = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.end, daysDragged, this.excludeDays), minutesMoved);
    }
    return {
      start,
      end
    };
  }
  restoreOriginalEvents(tempEvents, adjustedEvents, snapDraggedEvents = true) {
    const previousView = this.view;
    if (snapDraggedEvents) {
      this.view = this.getWeekView(tempEvents);
    }
    const adjustedEventsArray = tempEvents.filter((event) => adjustedEvents.has(event));
    this.view.hourColumns.forEach((column, columnIndex) => {
      previousView.hourColumns[columnIndex].hours.forEach((hour, hourIndex) => {
        hour.segments.forEach((segment, segmentIndex) => {
          column.hours[hourIndex].segments[segmentIndex].cssClass = segment.cssClass;
        });
      });
      adjustedEventsArray.forEach((adjustedEvent) => {
        const originalEvent = adjustedEvents.get(adjustedEvent);
        const existingColumnEvent = column.events.find((columnEvent) => columnEvent.event === (snapDraggedEvents ? adjustedEvent : originalEvent));
        if (existingColumnEvent) {
          existingColumnEvent.event = originalEvent;
          existingColumnEvent["tempEvent"] = adjustedEvent;
          if (!snapDraggedEvents) {
            existingColumnEvent.height = 0;
            existingColumnEvent.width = 0;
          }
        } else {
          const event = {
            event: originalEvent,
            left: 0,
            top: 0,
            height: 0,
            width: 0,
            startsBeforeDay: false,
            endsAfterDay: false,
            tempEvent: adjustedEvent
          };
          column.events.push(event);
        }
      });
    });
    adjustedEvents.clear();
  }
  getTimeEventResizedDates(calendarEvent, resizeEvent) {
    const newEventDates = {
      start: calendarEvent.start,
      end: getDefaultEventEnd(this.dateAdapter, calendarEvent, this.minimumEventHeight)
    };
    const _a = calendarEvent, {
      end
    } = _a, eventWithoutEnd = __objRest(_a, [
      "end"
    ]);
    const smallestResizes = {
      start: this.dateAdapter.addMinutes(newEventDates.end, this.minimumEventHeight * -1),
      end: getDefaultEventEnd(this.dateAdapter, eventWithoutEnd, this.minimumEventHeight)
    };
    const modifier = this.rtl ? -1 : 1;
    if (typeof resizeEvent.edges.left !== "undefined") {
      const daysDiff = Math.round(+resizeEvent.edges.left / this.dayColumnWidth) * modifier;
      const newStart = addDaysWithExclusions(this.dateAdapter, newEventDates.start, daysDiff, this.excludeDays);
      if (newStart < smallestResizes.start) {
        newEventDates.start = newStart;
      } else {
        newEventDates.start = smallestResizes.start;
      }
    } else if (typeof resizeEvent.edges.right !== "undefined") {
      const daysDiff = Math.round(+resizeEvent.edges.right / this.dayColumnWidth) * modifier;
      const newEnd = addDaysWithExclusions(this.dateAdapter, newEventDates.end, daysDiff, this.excludeDays);
      if (newEnd > smallestResizes.end) {
        newEventDates.end = newEnd;
      } else {
        newEventDates.end = smallestResizes.end;
      }
    }
    if (typeof resizeEvent.edges.top !== "undefined") {
      const minutesMoved = getMinutesMoved(resizeEvent.edges.top, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize, this.hourDuration);
      const newStart = this.dateAdapter.addMinutes(newEventDates.start, minutesMoved);
      if (newStart < smallestResizes.start) {
        newEventDates.start = newStart;
      } else {
        newEventDates.start = smallestResizes.start;
      }
    } else if (typeof resizeEvent.edges.bottom !== "undefined") {
      const minutesMoved = getMinutesMoved(resizeEvent.edges.bottom, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize, this.hourDuration);
      const newEnd = this.dateAdapter.addMinutes(newEventDates.end, minutesMoved);
      if (newEnd > smallestResizes.end) {
        newEventDates.end = newEnd;
      } else {
        newEventDates.end = smallestResizes.end;
      }
    }
    return newEventDates;
  }
  resizeStarted(eventsContainer, event, dayWidth) {
    this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
    const resizeHelper = new CalendarResizeHelper(eventsContainer, dayWidth, this.rtl);
    this.validateResize = ({
      rectangle,
      edges
    }) => {
      const isWithinBoundary = resizeHelper.validateResize({
        rectangle: __spreadValues({}, rectangle),
        edges
      });
      if (isWithinBoundary && this.validateEventTimesChanged) {
        let newEventDates;
        if (!dayWidth) {
          newEventDates = this.getTimeEventResizedDates(event.event, {
            rectangle,
            edges
          });
        } else {
          const modifier = this.rtl ? -1 : 1;
          if (typeof edges.left !== "undefined") {
            const diff = Math.round(+edges.left / dayWidth) * modifier;
            newEventDates = this.getAllDayEventResizedDates(event.event, diff, !this.rtl);
          } else {
            const diff = Math.round(+edges.right / dayWidth) * modifier;
            newEventDates = this.getAllDayEventResizedDates(event.event, diff, this.rtl);
          }
        }
        return this.validateEventTimesChanged({
          type: CalendarEventTimesChangedEventType.Resize,
          event: event.event,
          newStart: newEventDates.start,
          newEnd: newEventDates.end
        });
      }
      return isWithinBoundary;
    };
    this.cdr.markForCheck();
  }
  /**
   * @hidden
   */
  getAllDayEventResizedDates(event, daysDiff, beforeStart) {
    let start = event.start;
    let end = event.end || event.start;
    if (beforeStart) {
      start = addDaysWithExclusions(this.dateAdapter, start, daysDiff, this.excludeDays);
    } else {
      end = addDaysWithExclusions(this.dateAdapter, end, daysDiff, this.excludeDays);
    }
    return {
      start,
      end
    };
  }
};
_CalendarWeekViewComponent.ɵfac = function CalendarWeekViewComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarWeekViewComponent)();
};
_CalendarWeekViewComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarWeekViewComponent,
  selectors: [["mwl-calendar-week-view"]],
  inputs: {
    viewDate: "viewDate",
    events: "events",
    excludeDays: "excludeDays",
    refresh: "refresh",
    locale: "locale",
    tooltipPlacement: "tooltipPlacement",
    tooltipTemplate: "tooltipTemplate",
    tooltipAppendToBody: "tooltipAppendToBody",
    tooltipDelay: "tooltipDelay",
    weekStartsOn: "weekStartsOn",
    headerTemplate: "headerTemplate",
    eventTemplate: "eventTemplate",
    eventTitleTemplate: "eventTitleTemplate",
    eventActionsTemplate: "eventActionsTemplate",
    precision: "precision",
    weekendDays: "weekendDays",
    snapDraggedEvents: "snapDraggedEvents",
    hourSegments: "hourSegments",
    hourDuration: "hourDuration",
    hourSegmentHeight: "hourSegmentHeight",
    minimumEventHeight: "minimumEventHeight",
    dayStartHour: "dayStartHour",
    dayStartMinute: "dayStartMinute",
    dayEndHour: "dayEndHour",
    dayEndMinute: "dayEndMinute",
    hourSegmentTemplate: "hourSegmentTemplate",
    eventSnapSize: "eventSnapSize",
    allDayEventsLabelTemplate: "allDayEventsLabelTemplate",
    daysInWeek: "daysInWeek",
    currentTimeMarkerTemplate: "currentTimeMarkerTemplate",
    validateEventTimesChanged: "validateEventTimesChanged",
    resizeCursors: "resizeCursors"
  },
  outputs: {
    dayHeaderClicked: "dayHeaderClicked",
    eventClicked: "eventClicked",
    eventTimesChanged: "eventTimesChanged",
    beforeViewRender: "beforeViewRender",
    hourSegmentClicked: "hourSegmentClicked"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 9,
  vars: 7,
  consts: [["dayColumns", ""], ["allDayEventsContainer", ""], ["eventRowContainer", ""], ["event", ""], ["weekEventTemplate", ""], ["role", "grid", 1, "cal-week-view"], [3, "dayHeaderClicked", "eventDropped", "dragEnter", "days", "locale", "customTemplate"], ["mwlDroppable", "", 1, "cal-all-day-events"], ["mwlDroppable", "", 1, "cal-time-events", 3, "dragEnter", "dragLeave"], [1, "cal-time-label-column"], [1, "cal-day-columns"], [1, "cal-day-column"], ["mwlDroppable", "", 1, "cal-all-day-events", 3, "dragEnter", "dragLeave"], [4, "ngTemplateOutlet"], ["mwlDroppable", "", "dragOverClass", "cal-drag-over", 1, "cal-day-column"], [1, "cal-events-row"], ["mwlDroppable", "", "dragOverClass", "cal-drag-over", 1, "cal-day-column", 3, "drop", "dragEnter"], ["mwlResizable", "", "mwlDraggable", "", "dragActiveClass", "cal-drag-active", 1, "cal-event-container", 3, "cal-draggable", "cal-starts-within-week", "cal-ends-within-week", "ngClass", "width", "marginLeft", "marginRight", "resizeCursors", "resizeSnapGrid", "validateResize", "dropData", "dragAxis", "dragSnapGrid", "validateDrag", "touchStartLongPress"], ["mwlResizable", "", "mwlDraggable", "", "dragActiveClass", "cal-drag-active", 1, "cal-event-container", 3, "resizeStart", "resizing", "resizeEnd", "dragStart", "dragging", "dragEnd", "ngClass", "resizeCursors", "resizeSnapGrid", "validateResize", "dropData", "dragAxis", "dragSnapGrid", "validateDrag", "touchStartLongPress"], ["mwlResizeHandle", "", 1, "cal-resize-handle", "cal-resize-handle-before-start", 3, "resizeEdges"], [3, "eventClicked", "locale", "weekEvent", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "customTemplate", "eventTitleTemplate", "eventActionsTemplate", "daysInWeek"], ["mwlResizeHandle", "", 1, "cal-resize-handle", "cal-resize-handle-after-end", 3, "resizeEdges"], [1, "cal-hour", 3, "cal-hour-odd"], [1, "cal-hour"], [3, "height", "segment", "segmentHeight", "locale", "customTemplate", "isTimeLabel", "daysInWeek"], [3, "segment", "segmentHeight", "locale", "customTemplate", "isTimeLabel", "daysInWeek"], [3, "columnDate", "dayStartHour", "dayStartMinute", "dayEndHour", "dayEndMinute", "hourSegments", "hourDuration", "hourSegmentHeight", "customTemplate"], [1, "cal-events-container"], ["mwlResizable", "", "mwlDraggable", "", "dragActiveClass", "cal-drag-active", 1, "cal-event-container", 3, "cal-draggable", "cal-starts-within-day", "cal-ends-within-day", "ngClass", "hidden", "top", "height", "left", "width", "resizeCursors", "resizeSnapGrid", "validateResize", "allowNegativeResizes", "dropData", "dragAxis", "dragSnapGrid", "touchStartLongPress", "ghostDragEnabled", "ghostElementTemplate", "validateDrag"], ["mwlResizable", "", "mwlDraggable", "", "dragActiveClass", "cal-drag-active", 1, "cal-event-container", 3, "resizeStart", "resizing", "resizeEnd", "dragStart", "dragging", "dragEnd", "ngClass", "hidden", "resizeCursors", "resizeSnapGrid", "validateResize", "allowNegativeResizes", "dropData", "dragAxis", "dragSnapGrid", "touchStartLongPress", "ghostDragEnabled", "ghostElementTemplate", "validateDrag"], [3, "ngTemplateOutlet"], [3, "eventClicked", "locale", "weekEvent", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDisabled", "tooltipDelay", "customTemplate", "eventTitleTemplate", "eventActionsTemplate", "column", "daysInWeek"], ["mwlDroppable", "", "dragActiveClass", "cal-drag-active", 3, "height", "segment", "segmentHeight", "locale", "customTemplate", "daysInWeek", "clickListenerDisabled", "dragOverClass", "isTimeLabel"], ["mwlDroppable", "", "dragActiveClass", "cal-drag-active", 3, "mwlClick", "drop", "dragEnter", "segment", "segmentHeight", "locale", "customTemplate", "daysInWeek", "clickListenerDisabled", "dragOverClass", "isTimeLabel"]],
  template: function CalendarWeekViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 5)(1, "mwl-calendar-week-view-header", 6);
      ɵɵlistener("dayHeaderClicked", function CalendarWeekViewComponent_Template_mwl_calendar_week_view_header_dayHeaderClicked_1_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.dayHeaderClicked.emit($event));
      })("eventDropped", function CalendarWeekViewComponent_Template_mwl_calendar_week_view_header_eventDropped_1_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.eventDropped({
          dropData: $event
        }, $event.newStart, true));
      })("dragEnter", function CalendarWeekViewComponent_Template_mwl_calendar_week_view_header_dragEnter_1_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.dateDragEnter($event.date));
      });
      ɵɵelementEnd();
      ɵɵconditionalCreate(2, CalendarWeekViewComponent_Conditional_2_Template, 9, 1, "div", 7);
      ɵɵelementStart(3, "div", 8);
      ɵɵlistener("dragEnter", function CalendarWeekViewComponent_Template_div_dragEnter_3_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.dragEnter("time"));
      })("dragLeave", function CalendarWeekViewComponent_Template_div_dragLeave_3_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.dragLeave("time"));
      });
      ɵɵconditionalCreate(4, CalendarWeekViewComponent_Conditional_4_Template, 3, 0, "div", 9);
      ɵɵelementStart(5, "div", 10, 0);
      ɵɵrepeaterCreate(7, CalendarWeekViewComponent_For_8_Template, 7, 9, "div", 11, _forTrack2);
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("days", ctx.days)("locale", ctx.locale)("customTemplate", ctx.headerTemplate);
      ɵɵadvance();
      ɵɵconditional(ctx.view.allDayEventRows.length > 0 ? 2 : -1);
      ɵɵadvance(2);
      ɵɵconditional(ctx.view.hourColumns.length > 0 && ctx.daysInWeek !== 1 ? 4 : -1);
      ɵɵadvance();
      ɵɵclassProp("cal-resize-active", ctx.timeEventResizes.size > 0);
      ɵɵadvance(2);
      ɵɵrepeater(ctx.view.hourColumns);
    }
  },
  dependencies: [CalendarWeekViewHeaderComponent, DroppableDirective, NgTemplateOutlet, ResizableDirective, DraggableDirective, NgClass, ResizeHandleDirective, CalendarWeekViewEventComponent, CalendarWeekViewHourSegmentComponent, CalendarWeekViewCurrentTimeMarkerComponent, ClickDirective],
  encapsulation: 2
});
var CalendarWeekViewComponent = _CalendarWeekViewComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarWeekViewComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-week-view",
      template: `
    <div class="cal-week-view" role="grid">
      <mwl-calendar-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
        (eventDropped)="
          eventDropped({ dropData: $event }, $event.newStart, true)
        "
        (dragEnter)="dateDragEnter($event.date)"
      />
      @if (view.allDayEventRows.length > 0) {
        <div
          class="cal-all-day-events"
          #allDayEventsContainer
          mwlDroppable
          (dragEnter)="dragEnter('allDay')"
          (dragLeave)="dragLeave('allDay')"
        >
          <div class="cal-day-columns">
            <div class="cal-time-label-column">
              <ng-container *ngTemplateOutlet="allDayEventsLabelTemplate" />
            </div>
            @for (day of days; track day.date.toISOString()) {
              <div
                class="cal-day-column"
                mwlDroppable
                dragOverClass="cal-drag-over"
                (drop)="eventDropped($event, day.date, true)"
                (dragEnter)="dateDragEnter(day.date)"
              ></div>
            }
          </div>
          @for (eventRow of view.allDayEventRows; track eventRow.id) {
            <div #eventRowContainer class="cal-events-row">
              @for (
                allDayEvent of eventRow.row;
                track allDayEvent.event.id ?? allDayEvent.event
              ) {
                <div
                  #event
                  class="cal-event-container"
                  [class.cal-draggable]="
                    allDayEvent.event.draggable && allDayEventResizes.size === 0
                  "
                  [class.cal-starts-within-week]="!allDayEvent.startsBeforeWeek"
                  [class.cal-ends-within-week]="!allDayEvent.endsAfterWeek"
                  [ngClass]="allDayEvent.event?.cssClass"
                  [style.width.%]="(100 / days.length) * allDayEvent.span"
                  [style.marginLeft.%]="
                    rtl ? null : (100 / days.length) * allDayEvent.offset
                  "
                  [style.marginRight.%]="
                    rtl ? (100 / days.length) * allDayEvent.offset : null
                  "
                  mwlResizable
                  [resizeCursors]="resizeCursors"
                  [resizeSnapGrid]="{
                    left: dayColumnWidth,
                    right: dayColumnWidth,
                  }"
                  [validateResize]="validateResize"
                  (resizeStart)="
                    allDayEventResizeStarted(
                      eventRowContainer,
                      allDayEvent,
                      $event
                    )
                  "
                  (resizing)="
                    allDayEventResizing(allDayEvent, $event, dayColumnWidth)
                  "
                  (resizeEnd)="allDayEventResizeEnded(allDayEvent)"
                  mwlDraggable
                  dragActiveClass="cal-drag-active"
                  [dropData]="{
                    event: allDayEvent.event,
                    calendarId: calendarId,
                  }"
                  [dragAxis]="{
                    x:
                      allDayEvent.event.draggable &&
                      allDayEventResizes.size === 0,
                    y:
                      !snapDraggedEvents &&
                      allDayEvent.event.draggable &&
                      allDayEventResizes.size === 0,
                  }"
                  [dragSnapGrid]="
                    snapDraggedEvents ? { x: dayColumnWidth } : {}
                  "
                  [validateDrag]="validateDrag"
                  [touchStartLongPress]="{ delay: 300, delta: 30 }"
                  (dragStart)="
                    dragStarted(eventRowContainer, event, allDayEvent, false)
                  "
                  (dragging)="allDayEventDragMove()"
                  (dragEnd)="dragEnded(allDayEvent, $event, dayColumnWidth)"
                >
                  @if (
                    allDayEvent.event?.resizable?.beforeStart &&
                    !allDayEvent.startsBeforeWeek
                  ) {
                    <div
                      class="cal-resize-handle cal-resize-handle-before-start"
                      mwlResizeHandle
                      [resizeEdges]="{ left: true }"
                    ></div>
                  }
                  <mwl-calendar-week-view-event
                    [locale]="locale"
                    [weekEvent]="allDayEvent"
                    [tooltipPlacement]="tooltipPlacement"
                    [tooltipTemplate]="tooltipTemplate"
                    [tooltipAppendToBody]="tooltipAppendToBody"
                    [tooltipDelay]="tooltipDelay"
                    [customTemplate]="eventTemplate"
                    [eventTitleTemplate]="eventTitleTemplate"
                    [eventActionsTemplate]="eventActionsTemplate"
                    [daysInWeek]="daysInWeek"
                    (eventClicked)="
                      eventClicked.emit({
                        event: allDayEvent.event,
                        sourceEvent: $event.sourceEvent,
                      })
                    "
                  />
                  @if (
                    allDayEvent.event?.resizable?.afterEnd &&
                    !allDayEvent.endsAfterWeek
                  ) {
                    <div
                      class="cal-resize-handle cal-resize-handle-after-end"
                      mwlResizeHandle
                      [resizeEdges]="{ right: true }"
                    ></div>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
      <div
        class="cal-time-events"
        mwlDroppable
        (dragEnter)="dragEnter('time')"
        (dragLeave)="dragLeave('time')"
      >
        @if (view.hourColumns.length > 0 && daysInWeek !== 1) {
          <div class="cal-time-label-column">
            @for (
              hour of view.hourColumns[0].hours;
              track hour.segments[0].date.toISOString();
              let odd = $odd
            ) {
              <div class="cal-hour" [class.cal-hour-odd]="odd">
                @for (
                  segment of hour.segments;
                  track segment.date.toISOString()
                ) {
                  <mwl-calendar-week-view-hour-segment
                    [style.height.px]="hourSegmentHeight"
                    [segment]="segment"
                    [segmentHeight]="hourSegmentHeight"
                    [locale]="locale"
                    [customTemplate]="hourSegmentTemplate"
                    [isTimeLabel]="true"
                    [daysInWeek]="daysInWeek"
                  />
                }
              </div>
            }
          </div>
        }
        <div
          class="cal-day-columns"
          [class.cal-resize-active]="timeEventResizes.size > 0"
          #dayColumns
        >
          @for (
            column of view.hourColumns;
            track column.hours[0]
              ? column.hours[0].segments[0].date.toISOString()
              : column
          ) {
            <div class="cal-day-column">
              <mwl-calendar-week-view-current-time-marker
                [columnDate]="column.date"
                [dayStartHour]="dayStartHour"
                [dayStartMinute]="dayStartMinute"
                [dayEndHour]="dayEndHour"
                [dayEndMinute]="dayEndMinute"
                [hourSegments]="hourSegments"
                [hourDuration]="hourDuration"
                [hourSegmentHeight]="hourSegmentHeight"
                [customTemplate]="currentTimeMarkerTemplate"
              />
              <div class="cal-events-container">
                @for (
                  timeEvent of column.events;
                  track timeEvent.event.id ?? timeEvent.event
                ) {
                  <div
                    #event
                    class="cal-event-container"
                    [class.cal-draggable]="
                      timeEvent.event.draggable && timeEventResizes.size === 0
                    "
                    [class.cal-starts-within-day]="!timeEvent.startsBeforeDay"
                    [class.cal-ends-within-day]="!timeEvent.endsAfterDay"
                    [ngClass]="timeEvent.event.cssClass"
                    [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
                    [style.top.px]="timeEvent.top"
                    [style.height.px]="timeEvent.height"
                    [style.left.%]="timeEvent.left"
                    [style.width.%]="timeEvent.width"
                    mwlResizable
                    [resizeCursors]="resizeCursors"
                    [resizeSnapGrid]="{
                      left: dayColumnWidth,
                      right: dayColumnWidth,
                      top: eventSnapSize || hourSegmentHeight,
                      bottom: eventSnapSize || hourSegmentHeight,
                    }"
                    [validateResize]="validateResize"
                    [allowNegativeResizes]="true"
                    (resizeStart)="
                      timeEventResizeStarted(dayColumns, timeEvent, $event)
                    "
                    (resizing)="timeEventResizing(timeEvent, $event)"
                    (resizeEnd)="timeEventResizeEnded(timeEvent)"
                    mwlDraggable
                    dragActiveClass="cal-drag-active"
                    [dropData]="{
                      event: timeEvent.event,
                      calendarId: calendarId,
                    }"
                    [dragAxis]="{
                      x:
                        timeEvent.event.draggable &&
                        timeEventResizes.size === 0,
                      y:
                        timeEvent.event.draggable &&
                        timeEventResizes.size === 0,
                    }"
                    [dragSnapGrid]="
                      snapDraggedEvents
                        ? {
                            x: dayColumnWidth,
                            y: eventSnapSize || hourSegmentHeight,
                          }
                        : {}
                    "
                    [touchStartLongPress]="{ delay: 300, delta: 30 }"
                    [ghostDragEnabled]="!snapDraggedEvents"
                    [ghostElementTemplate]="weekEventTemplate"
                    [validateDrag]="validateDrag"
                    (dragStart)="
                      dragStarted(dayColumns, event, timeEvent, true)
                    "
                    (dragging)="dragMove(timeEvent, $event)"
                    (dragEnd)="
                      dragEnded(timeEvent, $event, dayColumnWidth, true)
                    "
                  >
                    @if (
                      timeEvent.event?.resizable?.beforeStart &&
                      !timeEvent.startsBeforeDay
                    ) {
                      <div
                        class="cal-resize-handle cal-resize-handle-before-start"
                        mwlResizeHandle
                        [resizeEdges]="{
                          left: true,
                          top: true,
                        }"
                      ></div>
                    }
                    <ng-template [ngTemplateOutlet]="weekEventTemplate" />
                    <ng-template #weekEventTemplate>
                      <mwl-calendar-week-view-event
                        [locale]="locale"
                        [weekEvent]="timeEvent"
                        [tooltipPlacement]="tooltipPlacement"
                        [tooltipTemplate]="tooltipTemplate"
                        [tooltipAppendToBody]="tooltipAppendToBody"
                        [tooltipDisabled]="
                          dragActive || timeEventResizes.size > 0
                        "
                        [tooltipDelay]="tooltipDelay"
                        [customTemplate]="eventTemplate"
                        [eventTitleTemplate]="eventTitleTemplate"
                        [eventActionsTemplate]="eventActionsTemplate"
                        [column]="column"
                        [daysInWeek]="daysInWeek"
                        (eventClicked)="
                          eventClicked.emit({
                            event: timeEvent.event,
                            sourceEvent: $event.sourceEvent,
                          })
                        "
                      />
                    </ng-template>
                    @if (
                      timeEvent.event?.resizable?.afterEnd &&
                      !timeEvent.endsAfterDay
                    ) {
                      <div
                        class="cal-resize-handle cal-resize-handle-after-end"
                        mwlResizeHandle
                        [resizeEdges]="{
                          right: true,
                          bottom: true,
                        }"
                      ></div>
                    }
                  </div>
                }
              </div>
              @for (
                hour of column.hours;
                track hour.segments[0].date.toISOString();
                let odd = $odd
              ) {
                <div class="cal-hour" [class.cal-hour-odd]="odd">
                  @for (
                    segment of hour.segments;
                    track segment.date.toISOString()
                  ) {
                    <mwl-calendar-week-view-hour-segment
                      [style.height.px]="hourSegmentHeight"
                      [segment]="segment"
                      [segmentHeight]="hourSegmentHeight"
                      [locale]="locale"
                      [customTemplate]="hourSegmentTemplate"
                      [daysInWeek]="daysInWeek"
                      (mwlClick)="
                        hourSegmentClicked.emit({
                          date: segment.date,
                          sourceEvent: $event,
                        })
                      "
                      [clickListenerDisabled]="!hourSegmentClicked.observed"
                      mwlDroppable
                      [dragOverClass]="
                        !dragActive || !snapDraggedEvents
                          ? 'cal-drag-over'
                          : null
                      "
                      dragActiveClass="cal-drag-active"
                      (drop)="eventDropped($event, segment.date, false)"
                      (dragEnter)="dateDragEnter(segment.date)"
                      [isTimeLabel]="daysInWeek === 1"
                    />
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
      imports: [CalendarWeekViewHeaderComponent, DroppableDirective, NgTemplateOutlet, ResizableDirective, DraggableDirective, NgClass, ResizeHandleDirective, CalendarWeekViewEventComponent, CalendarWeekViewHourSegmentComponent, CalendarWeekViewCurrentTimeMarkerComponent, ClickDirective]
    }]
  }], null, {
    viewDate: [{
      type: Input
    }],
    events: [{
      type: Input
    }],
    excludeDays: [{
      type: Input
    }],
    refresh: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    tooltipPlacement: [{
      type: Input
    }],
    tooltipTemplate: [{
      type: Input
    }],
    tooltipAppendToBody: [{
      type: Input
    }],
    tooltipDelay: [{
      type: Input
    }],
    weekStartsOn: [{
      type: Input
    }],
    headerTemplate: [{
      type: Input
    }],
    eventTemplate: [{
      type: Input
    }],
    eventTitleTemplate: [{
      type: Input
    }],
    eventActionsTemplate: [{
      type: Input
    }],
    precision: [{
      type: Input
    }],
    weekendDays: [{
      type: Input
    }],
    snapDraggedEvents: [{
      type: Input
    }],
    hourSegments: [{
      type: Input
    }],
    hourDuration: [{
      type: Input
    }],
    hourSegmentHeight: [{
      type: Input
    }],
    minimumEventHeight: [{
      type: Input
    }],
    dayStartHour: [{
      type: Input
    }],
    dayStartMinute: [{
      type: Input
    }],
    dayEndHour: [{
      type: Input
    }],
    dayEndMinute: [{
      type: Input
    }],
    hourSegmentTemplate: [{
      type: Input
    }],
    eventSnapSize: [{
      type: Input
    }],
    allDayEventsLabelTemplate: [{
      type: Input
    }],
    daysInWeek: [{
      type: Input
    }],
    currentTimeMarkerTemplate: [{
      type: Input
    }],
    validateEventTimesChanged: [{
      type: Input
    }],
    resizeCursors: [{
      type: Input
    }],
    dayHeaderClicked: [{
      type: Output
    }],
    eventClicked: [{
      type: Output
    }],
    eventTimesChanged: [{
      type: Output
    }],
    beforeViewRender: [{
      type: Output
    }],
    hourSegmentClicked: [{
      type: Output
    }]
  });
})();
var _CalendarWeekModule = class _CalendarWeekModule {
};
_CalendarWeekModule.ɵfac = function CalendarWeekModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarWeekModule)();
};
_CalendarWeekModule.ɵmod = ɵɵdefineNgModule({
  type: _CalendarWeekModule,
  imports: [ResizableModule, DragAndDropModule, CalendarCommonModule, CalendarWeekViewComponent, CalendarWeekViewHeaderComponent, CalendarWeekViewEventComponent, CalendarWeekViewHourSegmentComponent, CalendarWeekViewCurrentTimeMarkerComponent],
  exports: [ResizableModule, DragAndDropModule, CalendarWeekViewComponent, CalendarWeekViewHeaderComponent, CalendarWeekViewEventComponent, CalendarWeekViewHourSegmentComponent, CalendarWeekViewCurrentTimeMarkerComponent]
});
_CalendarWeekModule.ɵinj = ɵɵdefineInjector({
  imports: [ResizableModule, DragAndDropModule, CalendarCommonModule, ResizableModule, DragAndDropModule]
});
var CalendarWeekModule = _CalendarWeekModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarWeekModule, [{
    type: NgModule,
    args: [{
      imports: [ResizableModule, DragAndDropModule, CalendarCommonModule, CalendarWeekViewComponent, CalendarWeekViewHeaderComponent, CalendarWeekViewEventComponent, CalendarWeekViewHourSegmentComponent, CalendarWeekViewCurrentTimeMarkerComponent],
      exports: [ResizableModule, DragAndDropModule, CalendarWeekViewComponent, CalendarWeekViewHeaderComponent, CalendarWeekViewEventComponent, CalendarWeekViewHourSegmentComponent, CalendarWeekViewCurrentTimeMarkerComponent]
    }]
  }], null, null);
})();
var _CalendarDayViewComponent = class _CalendarDayViewComponent {
  constructor() {
    this.events = [];
    this.hourSegments = 2;
    this.hourSegmentHeight = 30;
    this.minimumEventHeight = 30;
    this.dayStartHour = 0;
    this.dayStartMinute = 0;
    this.dayEndHour = 23;
    this.dayEndMinute = 59;
    this.tooltipPlacement = "auto";
    this.tooltipAppendToBody = true;
    this.tooltipDelay = null;
    this.snapDraggedEvents = true;
    this.eventClicked = new EventEmitter();
    this.hourSegmentClicked = new EventEmitter();
    this.eventTimesChanged = new EventEmitter();
    this.beforeViewRender = new EventEmitter();
  }
};
_CalendarDayViewComponent.ɵfac = function CalendarDayViewComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarDayViewComponent)();
};
_CalendarDayViewComponent.ɵcmp = ɵɵdefineComponent({
  type: _CalendarDayViewComponent,
  selectors: [["mwl-calendar-day-view"]],
  inputs: {
    viewDate: "viewDate",
    events: "events",
    hourSegments: "hourSegments",
    hourSegmentHeight: "hourSegmentHeight",
    hourDuration: "hourDuration",
    minimumEventHeight: "minimumEventHeight",
    dayStartHour: "dayStartHour",
    dayStartMinute: "dayStartMinute",
    dayEndHour: "dayEndHour",
    dayEndMinute: "dayEndMinute",
    refresh: "refresh",
    locale: "locale",
    eventSnapSize: "eventSnapSize",
    tooltipPlacement: "tooltipPlacement",
    tooltipTemplate: "tooltipTemplate",
    tooltipAppendToBody: "tooltipAppendToBody",
    tooltipDelay: "tooltipDelay",
    hourSegmentTemplate: "hourSegmentTemplate",
    eventTemplate: "eventTemplate",
    eventTitleTemplate: "eventTitleTemplate",
    eventActionsTemplate: "eventActionsTemplate",
    snapDraggedEvents: "snapDraggedEvents",
    allDayEventsLabelTemplate: "allDayEventsLabelTemplate",
    currentTimeMarkerTemplate: "currentTimeMarkerTemplate",
    validateEventTimesChanged: "validateEventTimesChanged",
    resizeCursors: "resizeCursors"
  },
  outputs: {
    eventClicked: "eventClicked",
    hourSegmentClicked: "hourSegmentClicked",
    eventTimesChanged: "eventTimesChanged",
    beforeViewRender: "beforeViewRender"
  },
  decls: 1,
  vars: 27,
  consts: [[1, "cal-day-view", 3, "eventClicked", "hourSegmentClicked", "eventTimesChanged", "beforeViewRender", "daysInWeek", "viewDate", "events", "hourSegments", "hourDuration", "hourSegmentHeight", "minimumEventHeight", "dayStartHour", "dayStartMinute", "dayEndHour", "dayEndMinute", "refresh", "locale", "eventSnapSize", "tooltipPlacement", "tooltipTemplate", "tooltipAppendToBody", "tooltipDelay", "resizeCursors", "hourSegmentTemplate", "eventTemplate", "eventTitleTemplate", "eventActionsTemplate", "snapDraggedEvents", "allDayEventsLabelTemplate", "currentTimeMarkerTemplate", "validateEventTimesChanged"]],
  template: function CalendarDayViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "mwl-calendar-week-view", 0);
      ɵɵlistener("eventClicked", function CalendarDayViewComponent_Template_mwl_calendar_week_view_eventClicked_0_listener($event) {
        return ctx.eventClicked.emit($event);
      })("hourSegmentClicked", function CalendarDayViewComponent_Template_mwl_calendar_week_view_hourSegmentClicked_0_listener($event) {
        return ctx.hourSegmentClicked.emit($event);
      })("eventTimesChanged", function CalendarDayViewComponent_Template_mwl_calendar_week_view_eventTimesChanged_0_listener($event) {
        return ctx.eventTimesChanged.emit($event);
      })("beforeViewRender", function CalendarDayViewComponent_Template_mwl_calendar_week_view_beforeViewRender_0_listener($event) {
        return ctx.beforeViewRender.emit($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("daysInWeek", 1)("viewDate", ctx.viewDate)("events", ctx.events)("hourSegments", ctx.hourSegments)("hourDuration", ctx.hourDuration)("hourSegmentHeight", ctx.hourSegmentHeight)("minimumEventHeight", ctx.minimumEventHeight)("dayStartHour", ctx.dayStartHour)("dayStartMinute", ctx.dayStartMinute)("dayEndHour", ctx.dayEndHour)("dayEndMinute", ctx.dayEndMinute)("refresh", ctx.refresh)("locale", ctx.locale)("eventSnapSize", ctx.eventSnapSize)("tooltipPlacement", ctx.tooltipPlacement)("tooltipTemplate", ctx.tooltipTemplate)("tooltipAppendToBody", ctx.tooltipAppendToBody)("tooltipDelay", ctx.tooltipDelay)("resizeCursors", ctx.resizeCursors)("hourSegmentTemplate", ctx.hourSegmentTemplate)("eventTemplate", ctx.eventTemplate)("eventTitleTemplate", ctx.eventTitleTemplate)("eventActionsTemplate", ctx.eventActionsTemplate)("snapDraggedEvents", ctx.snapDraggedEvents)("allDayEventsLabelTemplate", ctx.allDayEventsLabelTemplate)("currentTimeMarkerTemplate", ctx.currentTimeMarkerTemplate)("validateEventTimesChanged", ctx.validateEventTimesChanged);
    }
  },
  dependencies: [CalendarWeekViewComponent],
  encapsulation: 2
});
var CalendarDayViewComponent = _CalendarDayViewComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarDayViewComponent, [{
    type: Component,
    args: [{
      selector: "mwl-calendar-day-view",
      template: `
    <mwl-calendar-week-view
      class="cal-day-view"
      [daysInWeek]="1"
      [viewDate]="viewDate"
      [events]="events"
      [hourSegments]="hourSegments"
      [hourDuration]="hourDuration"
      [hourSegmentHeight]="hourSegmentHeight"
      [minimumEventHeight]="minimumEventHeight"
      [dayStartHour]="dayStartHour"
      [dayStartMinute]="dayStartMinute"
      [dayEndHour]="dayEndHour"
      [dayEndMinute]="dayEndMinute"
      [refresh]="refresh"
      [locale]="locale"
      [eventSnapSize]="eventSnapSize"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipAppendToBody]="tooltipAppendToBody"
      [tooltipDelay]="tooltipDelay"
      [resizeCursors]="resizeCursors"
      [hourSegmentTemplate]="hourSegmentTemplate"
      [eventTemplate]="eventTemplate"
      [eventTitleTemplate]="eventTitleTemplate"
      [eventActionsTemplate]="eventActionsTemplate"
      [snapDraggedEvents]="snapDraggedEvents"
      [allDayEventsLabelTemplate]="allDayEventsLabelTemplate"
      [currentTimeMarkerTemplate]="currentTimeMarkerTemplate"
      [validateEventTimesChanged]="validateEventTimesChanged"
      (eventClicked)="eventClicked.emit($event)"
      (hourSegmentClicked)="hourSegmentClicked.emit($event)"
      (eventTimesChanged)="eventTimesChanged.emit($event)"
      (beforeViewRender)="beforeViewRender.emit($event)"
    />
  `,
      imports: [CalendarWeekViewComponent]
    }]
  }], null, {
    viewDate: [{
      type: Input
    }],
    events: [{
      type: Input
    }],
    hourSegments: [{
      type: Input
    }],
    hourSegmentHeight: [{
      type: Input
    }],
    hourDuration: [{
      type: Input
    }],
    minimumEventHeight: [{
      type: Input
    }],
    dayStartHour: [{
      type: Input
    }],
    dayStartMinute: [{
      type: Input
    }],
    dayEndHour: [{
      type: Input
    }],
    dayEndMinute: [{
      type: Input
    }],
    refresh: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    eventSnapSize: [{
      type: Input
    }],
    tooltipPlacement: [{
      type: Input
    }],
    tooltipTemplate: [{
      type: Input
    }],
    tooltipAppendToBody: [{
      type: Input
    }],
    tooltipDelay: [{
      type: Input
    }],
    hourSegmentTemplate: [{
      type: Input
    }],
    eventTemplate: [{
      type: Input
    }],
    eventTitleTemplate: [{
      type: Input
    }],
    eventActionsTemplate: [{
      type: Input
    }],
    snapDraggedEvents: [{
      type: Input
    }],
    allDayEventsLabelTemplate: [{
      type: Input
    }],
    currentTimeMarkerTemplate: [{
      type: Input
    }],
    validateEventTimesChanged: [{
      type: Input
    }],
    resizeCursors: [{
      type: Input
    }],
    eventClicked: [{
      type: Output
    }],
    hourSegmentClicked: [{
      type: Output
    }],
    eventTimesChanged: [{
      type: Output
    }],
    beforeViewRender: [{
      type: Output
    }]
  });
})();
var _CalendarDayModule = class _CalendarDayModule {
};
_CalendarDayModule.ɵfac = function CalendarDayModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarDayModule)();
};
_CalendarDayModule.ɵmod = ɵɵdefineNgModule({
  type: _CalendarDayModule,
  imports: [CalendarDayViewComponent],
  exports: [CalendarDayViewComponent]
});
_CalendarDayModule.ɵinj = ɵɵdefineInjector({});
var CalendarDayModule = _CalendarDayModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarDayModule, [{
    type: NgModule,
    args: [{
      imports: [CalendarDayViewComponent],
      exports: [CalendarDayViewComponent]
    }]
  }], null, null);
})();
var _CalendarModule = class _CalendarModule {
  static forRoot(dateAdapter, config = {}) {
    return {
      ngModule: _CalendarModule,
      providers: [dateAdapter, config.eventTitleFormatter || CalendarEventTitleFormatter, config.dateFormatter || CalendarDateFormatter, config.utils || CalendarUtils, config.a11y || CalendarA11y]
    };
  }
};
_CalendarModule.ɵfac = function CalendarModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarModule)();
};
_CalendarModule.ɵmod = ɵɵdefineNgModule({
  type: _CalendarModule,
  imports: [CalendarCommonModule, CalendarMonthModule, CalendarWeekModule, CalendarDayModule],
  exports: [CalendarCommonModule, CalendarMonthModule, CalendarWeekModule, CalendarDayModule]
});
_CalendarModule.ɵinj = ɵɵdefineInjector({
  imports: [CalendarCommonModule, CalendarMonthModule, CalendarWeekModule, CalendarDayModule, CalendarCommonModule, CalendarMonthModule, CalendarWeekModule, CalendarDayModule]
});
var CalendarModule = _CalendarModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarModule, [{
    type: NgModule,
    args: [{
      imports: [CalendarCommonModule, CalendarMonthModule, CalendarWeekModule, CalendarDayModule],
      exports: [CalendarCommonModule, CalendarMonthModule, CalendarWeekModule, CalendarDayModule]
    }]
  }], null, null);
})();
export {
  CalendarA11y,
  CalendarA11yPipe,
  CalendarAngularDateFormatter,
  CalendarCommonModule,
  CalendarDateFormatter,
  CalendarDatePipe,
  CalendarDayModule,
  CalendarDayViewComponent,
  CalendarEventActionsComponent,
  CalendarEventTimesChangedEventType,
  CalendarEventTitleComponent,
  CalendarEventTitleFormatter,
  CalendarEventTitlePipe,
  CalendarModule,
  CalendarMomentDateFormatter,
  CalendarMonthCellComponent,
  CalendarMonthModule,
  CalendarMonthViewComponent,
  CalendarMonthViewHeaderComponent,
  CalendarNativeDateFormatter,
  CalendarNextViewDirective,
  CalendarOpenDayEventsComponent,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarTooltipDirective,
  CalendarTooltipWindowComponent,
  CalendarUtils,
  CalendarView,
  CalendarWeekModule,
  CalendarWeekViewComponent,
  CalendarWeekViewCurrentTimeMarkerComponent,
  CalendarWeekViewEventComponent,
  CalendarWeekViewHeaderComponent,
  CalendarWeekViewHourSegmentComponent,
  ClickDirective,
  DAYS_OF_WEEK,
  DateAdapter,
  KeydownEnterDirective,
  MOMENT,
  getWeekViewPeriod,
  provideCalendar
};
//# sourceMappingURL=angular-calendar.js.map
