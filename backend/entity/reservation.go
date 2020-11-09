package entity

import "time"

type Reservation struct {
	ID       string    `db:"id"`
	CheckIn  time.Time `db:"check_in"`
	CheckOut time.Time `db:"check_out"`
	RoomID   string    `db:"room_id"`
	GuestID  string    `db:"guest_id"`
}

type ReservationWithRoomName struct {
	Reservation
	RoomName string `db:"room_name"`
}

type ReservationWithRoomNameAndGuestName struct {
	ReservationWithRoomName
	GuestName string `db:"guest_name"`
}

type ReservationCreate = Reservation
