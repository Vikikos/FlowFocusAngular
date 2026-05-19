import { CardDesktopCalendar } from "../components/calendar/card-desktop-calendar/card-desktop-calendar";
import { CardDesktopChronometer } from "../components/chronometer/card-desktop-chronometer/card-desktop-chronometer";
import { ProgressColumn } from "../components/kanban/progress-column/progress-column";
import { CardDesktopNote } from "../components/note/card-desktop-note/card-desktop-note";

export const COMPONENT_MAP: { [key: string]: any } = {
    marks: CardDesktopNote,
    kanban: ProgressColumn,
    chronometers: CardDesktopChronometer,
    calendars: CardDesktopCalendar,
    pomodoro: ''
};