CREATE TABLE IF NOT EXISTS "reservations"
(
    "id"        VARCHAR(32),
    "check_in"  timestamptz,
    "check_out" timestamptz,
    "room_id"   VARCHAR(32),
    "guest_id"  VARCHAR(32),
    PRIMARY KEY ("id"),
    CONSTRAINT "fk_guests_reservation" FOREIGN KEY ("guest_id") REFERENCES "guests" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fk_rooms_reservations" FOREIGN KEY ("room_id") REFERENCES "rooms" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "chk_reservations_check_out" CHECK (check_in < check_out)
);

create index on reservations (guest_id);
create index on reservations (check_in, check_out);
create index on reservations (room_id);
