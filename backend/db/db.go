package db

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func NewDB() (*sqlx.DB, error) {
	dsn := "host=postgres user=le4db password=pass dbname=le4db port=5432 sslmode=disable TimeZone=Asia/Tokyo"
	db, err := sqlx.Connect("postgres", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}
