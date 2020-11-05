package entity

type Room struct {
	ID           string
	Name         string
	Price        int
	HostID       string
	Host         Host
	Reservations []Reservation
}
