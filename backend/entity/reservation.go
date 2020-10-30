package entity

import "time"

type Reservation struct {
	ID       string
	CheckIn  time.Time
	CheckOut time.Time
	RoomID   string
	Room     Room
	GuestID  string
	Guest    Guest
}
