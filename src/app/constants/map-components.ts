import { CardDesktopCalendar } from "../components/calendar/card-desktop-calendar/card-desktop-calendar";
import { DetailChronometer } from "../components/chronometer/detail-chronometer/detail-chronometer";
import { ProgressColumn } from "../components/kanban/progress-column/progress-column";
import { CardNote } from "../components/note/card-note/card-note";

export const COMPONENT_MAP: { [key: string]: any } = {
    marks: CardNote,
    kanban: ProgressColumn,
    chronometers: DetailChronometer,
    calendars: CardDesktopCalendar,
    pomodoro: ''
};