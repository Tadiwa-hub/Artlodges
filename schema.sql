-- Art Lodges D1 Schema

DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_type TEXT NOT NULL,
    check_in TEXT NOT NULL,
    check_out TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    guests_count INTEGER NOT NULL,
    occasion TEXT,
    requests TEXT,
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS availability;
CREATE TABLE availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_type TEXT NOT NULL,
    blocked_date TEXT NOT NULL, -- YYYY-MM-DD
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
