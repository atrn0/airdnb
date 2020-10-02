package main

import (
	"log"
	"time"

	"github.com/Pallinder/go-randomdata"
	"github.com/rs/xid"

	database "github.com/atrn0/le4db/db"
	"github.com/atrn0/le4db/entity"
)

func main() {
	//	connect db
	db, err := database.NewDB()
	if err != nil {
		log.Fatalln("failed to connect db")
	}

	for i := 0; i < 100; i++ {
		guest := entity.Guest{
			ID:          xid.New().String(),
			Name:        randomdata.SillyName(),
			Reservation: []entity.Reservation{},
		}
		result := db.Create(&guest)
		if result.Error != nil {
			log.Println(result.Error)
		}

		host := entity.Host{
			ID:   xid.New().String(),
			Name: randomdata.SillyName(),
		}
		result = db.Create(&host)
		if result.Error != nil {
			log.Println(result.Error)
		}

		room := entity.Room{
			ID:           xid.New().String(),
			Name:         randomdata.City(),
			Price:        randomdata.Number(2000, 30000),
			Host:         host,
			Reservations: nil,
		}
		result = db.Create(&room)
		if result.Error != nil {
			log.Println(result.Error)
		}

		reservation := entity.Reservation{
			ID:       xid.New().String(),
			CheckIn:  time.Now(),
			CheckOut: time.Now().Add(24 * time.Hour),
			Room:     room,
			Guest:    guest,
		}
		result = db.Create(&reservation)
		if result.Error != nil {
			log.Println(result.Error)
		}
	}

	log.Println("seed completed!")
}
