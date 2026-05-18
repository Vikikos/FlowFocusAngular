export interface ICalendar {
    id?: number
    name: string,
    view_calendar: string
}

export interface IEvent {
    id?: number,
    title: string,
    start: string,
    end: string,
    color: string
}
