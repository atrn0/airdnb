package entity

import "time"

type Reservation struct {
	ID       string    `gorm:"type:VARCHAR(32)"`
	CheckIn  time.Time `gorm:""`
	CheckOut time.Time `gorm:"check:check_in < check_out"`
	RoomID   string
	Room     Room `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	GuestID  string
	Guest    Guest `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
