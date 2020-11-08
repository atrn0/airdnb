package entity

import "time"

type Reservation struct {
	ID       string    `db:"id"`
	CheckIn  time.Time `db:"check_in"`
	CheckOut time.Time `db:"check_out"`
	RoomID   string    `db:"room_id"`
	GuestID  string    `db:"guest_id"`
}
