package entity

type Hosts struct {
	ID   string `gorm:"type:VARCHAR(32)"`
	Name string `gorm:"type:VARCHAR(32);not null"`
}
