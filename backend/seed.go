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

	var gRoom entity.Room
	var gGuest entity.Guest

	for t := 0; t < 10; t++ {
		tx := db.Begin()
		for i := 0; i < 100*100; i++ {
			guest := entity.Guest{
				ID:          xid.New().String(),
				Name:        randomdata.SillyName(),
				Reservation: []entity.Reservation{},
			}
			result := tx.Create(&guest)
			if result.Error != nil {
				log.Println(result.Error)
			}
			if i == 0 || randomdata.Number(10) < 3 {
				gGuest = guest
			}

			host := entity.Host{
				ID:   xid.New().String(),
				Name: randomdata.SillyName(),
			}
			result = tx.Create(&host)
			if result.Error != nil {
				log.Println(result.Error)
			}

			for j := 0; j < randomdata.Number(1, 10); j++ {
				room := entity.Room{
					ID:           xid.New().String(),
					Name:         randomdata.City(),
					Price:        randomdata.Number(2000, 30000),
					Host:         host,
					Reservations: nil,
				}
				result = tx.Create(&room)
				if result.Error != nil {
					log.Println(result.Error)
				}
				if i == 0 || randomdata.Number(10) < 3 {
					gRoom = room
				}
			}

			reservation := entity.Reservation{
				ID:       xid.New().String(),
				CheckIn:  time.Now(),
				CheckOut: time.Now().Add(24 * time.Hour),
				Room:     gRoom,
				Guest:    gGuest,
			}
			result = tx.Create(&reservation)
			if result.Error != nil {
				log.Println(result.Error)
			}

			if i%100 == 0 {
				log.Printf("seeding...: %d%%", (t*10000+(i+1))/1000)
			}
		}
		tx.Commit()
	}

	log.Println("seed completed!")
}
