import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
  endOfDay,
  endOfMonth,
  endOfWeek,
  getDate,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getYear,
  isSameDay,
  isSameMonth,
  isSameSecond,
  max,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setYear,
  startOfDay,
  startOfMinute,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks
} from "./chunk-NL7H6VDX.js";
import "./chunk-3OV72XIM.js";

// node_modules/.pnpm/calendar-utils@0.12.4_date-fns@4.1.0/node_modules/calendar-utils/date-adapters/esm/date-fns/index.js
function getTimezoneOffset(date) {
  return new Date(date).getTimezoneOffset();
}
function adapterFactory() {
  return {
    addDays,
    addHours,
    addMinutes,
    addSeconds,
    differenceInDays,
    differenceInMinutes,
    differenceInSeconds,
    endOfDay,
    endOfMonth,
    endOfWeek,
    getDay,
    getMonth,
    isSameDay,
    isSameMonth,
    isSameSecond,
    max,
    setHours,
    setMinutes,
    startOfDay,
    startOfMinute,
    startOfMonth,
    startOfWeek,
    getHours,
    getMinutes,
    getTimezoneOffset
  };
}

// node_modules/.pnpm/angular-calendar@0.32.0_@angular+core@20.3.5_@angular+compiler@20.3.5_rxjs@7.8.2_zone.j_e32436efe93554fbc8a285c4d54998f6/node_modules/angular-calendar/date-adapters/esm/date-fns/index.js
function adapterFactory2() {
  return Object.assign(Object.assign({}, adapterFactory()), {
    addWeeks,
    addMonths,
    subDays,
    subWeeks,
    subMonths,
    getISOWeek,
    setDate,
    setMonth,
    setYear,
    getDate,
    getYear
  });
}
export {
  adapterFactory2 as adapterFactory
};
//# sourceMappingURL=angular-calendar_date-adapters_date-fns.js.map
