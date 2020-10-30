package entity

type Guest struct {
	ID          string
	Name        string
	Reservation []Reservation
}
