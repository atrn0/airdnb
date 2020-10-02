package entity

type Host struct {
	ID   string `gorm:"type:VARCHAR(32)"`
	Name string `gorm:"type:VARCHAR(255);not null"`
}
