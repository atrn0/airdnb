package entity

type Room struct {
	ID     string `db:"id"`
	Name   string `db:"name"`
	Price  int    `db:"price"`
	HostID string `db:"host_id"`
}
