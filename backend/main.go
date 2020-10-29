package main

import (
	"log"

	database "github.com/atrn0/le4db/backend/db"
	"github.com/atrn0/le4db/backend/entity"
)

func main() {
	//	connect db
	db, err := database.NewDB()
	if err != nil {
		log.Fatalln("failed to connect db")
	}

	//	auto migrate
	err = db.AutoMigrate(
		&entity.Host{},
		&entity.Guest{},
		&entity.Room{},
		&entity.Reservation{},
	)
	if err != nil {
		log.Fatalln("failed to migrate db schema")
	}
	log.Println("migrated")
}
