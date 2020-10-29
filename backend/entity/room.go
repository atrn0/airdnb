package entity

type Room struct {
	ID           string `gorm:"type:VARCHAR(32)"`
	Name         string `gorm:"type:VARCHAR(255);not null"`
	Price        int    `gorm:"index:idx_price;type:INTEGER;check:price_dom_checker,price >= 0"`
	HostID       string
	Host         Host `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Reservations []Reservation
}
