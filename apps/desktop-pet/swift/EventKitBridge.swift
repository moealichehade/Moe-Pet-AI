import EventKit
import Foundation

// ── Output shapes ─────────────────────────────────────────────────────────
struct EventOut: Codable {
    let id: String
    let title: String
    let startTime: String
    let endTime: String
    let calendar: String
    let minutesUntil: Int
}

struct ReminderOut: Codable {
    let id: String
    let title: String
    let dueDate: String?
    let completed: Bool
    let list: String
}

struct Output: Codable {
    let events: [EventOut]
    let reminders: [ReminderOut]
    let fetchedAt: String
    let permissionStatus: String
}

// ── Helpers ───────────────────────────────────────────────────────────────
let iso = ISO8601DateFormatter()

func isoString(_ date: Date?) -> String {
    guard let d = date else { return "" }
    return iso.string(from: d)
}

func minutesUntil(_ date: Date) -> Int {
    return Int(date.timeIntervalSinceNow / 60)
}

// ── Main ──────────────────────────────────────────────────────────────────
let store = EKEventStore()
let sema  = DispatchSemaphore(value: 0)

var calStatus  = "denied"
var remStatus  = "denied"
var events:    [EventOut]   = []
var reminders: [ReminderOut] = []

// Request Calendar access
store.requestFullAccessToEvents { granted, _ in
    calStatus = granted ? "granted" : "denied"
    sema.signal()
}
sema.wait()

// Request Reminders access
store.requestFullAccessToReminders { granted, _ in
    remStatus = granted ? "granted" : "denied"
    sema.signal()
}
sema.wait()

// ── Fetch today's calendar events ─────────────────────────────────────────
if calStatus == "granted" {
    let now   = Date()
    let end   = Calendar.current.date(byAdding: .hour, value: 24, to: now)!
    let pred  = store.predicateForEvents(withStart: now, end: end, calendars: nil)
    let ekEvs = store.events(matching: pred)

    events = ekEvs.map { e in
        EventOut(
            id:           e.eventIdentifier ?? UUID().uuidString,
            title:        e.title ?? "Untitled",
            startTime:    isoString(e.startDate),
            endTime:      isoString(e.endDate),
            calendar:     e.calendar?.title ?? "",
            minutesUntil: minutesUntil(e.startDate ?? now)
        )
    }
}

// ── Fetch reminders ───────────────────────────────────────────────────────
if remStatus == "granted" {
    let remSema = DispatchSemaphore(value: 0)
    let pred    = store.predicateForIncompleteReminders(withDueDateStarting: nil,
                                                        ending: nil,
                                                        calendars: nil)
    store.fetchReminders(matching: pred) { ekRems in
        reminders = (ekRems ?? []).prefix(20).map { r in
            ReminderOut(
                id:        r.calendarItemIdentifier,
                title:     r.title ?? "Untitled",
                dueDate:   r.dueDateComponents?.date.map { isoString($0) } ?? nil,
                completed: r.isCompleted,
                list:      r.calendar?.title ?? ""
            )
        }
        remSema.signal()
    }
    remSema.wait()
}

// ── Emit JSON ─────────────────────────────────────────────────────────────
let permissionStatus = (calStatus == "granted" || remStatus == "granted")
    ? "granted" : "denied"

let out = Output(
    events:           events,
    reminders:        reminders,
    fetchedAt:        isoString(Date()),
    permissionStatus: permissionStatus
)

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
if let data = try? encoder.encode(out),
   let json = String(data: data, encoding: .utf8) {
    print(json)
}
