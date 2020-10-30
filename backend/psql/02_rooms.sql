CREATE TABLE IF NOT EXISTS "rooms"
(
    "id"      VARCHAR(32),
    "name"    VARCHAR(255) NOT NULL,
    "price"   INTEGER,
    "host_id" VARCHAR(32),
    PRIMARY KEY ("id"),
    CONSTRAINT "fk_rooms_host" FOREIGN KEY ("host_id") REFERENCES "hosts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "price_dom_checker" CHECK (price >= 0)
);

create index price_idx on rooms (price);
create index host_id_idx on rooms (host_id);
