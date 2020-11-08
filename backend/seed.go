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
		tx := db.MustBegin()
		for i := 0; i < 100*100; i++ {
			guest := &entity.Guest{
				ID:   xid.New().String(),
				Name: randomdata.SillyName(),
			}
			_, err = tx.NamedExec("INSERT INTO guests (id, name) VALUES (:id, :name)", guest)
			if err != nil {
				log.Fatalln(err)
			}
			if i == 0 || randomdata.Number(10) < 3 {
				gGuest = *guest
			}

			host := &entity.Host{
				ID:   xid.New().String(),
				Name: randomdata.SillyName(),
			}
			_, err = tx.NamedExec("INSERT INTO hosts (id, name) VALUES (:id, :name)", host)
			if err != nil {
				log.Fatalln(err)
			}

			for j := 0; j < randomdata.Number(1, 10); j++ {
				room := entity.Room{
					ID:     xid.New().String(),
					Name:   randomdata.City(),
					Price:  randomdata.Number(2000, 30000),
					HostID: host.ID,
				}
				_, err = tx.NamedExec("INSERT INTO rooms (id, name, price, host_id) VALUES (:id, :name, :price, :host_id)", room)
				if i == 0 || randomdata.Number(10) < 3 {
					gRoom = room
				}
			}

			reservation := entity.Reservation{
				ID:       xid.New().String(),
				CheckIn:  time.Now(),
				CheckOut: time.Now().Add(24 * time.Hour),
				RoomID:   gRoom.ID,
				GuestID:  gGuest.ID,
			}
			_, err = tx.NamedExec(`
				INSERT INTO reservations (id, check_in, check_out, room_id, guest_id) 
				VALUES (:id, :check_in, :check_out, :room_id, :guest_id)
				`,
				reservation)

			if i%100 == 0 {
				log.Printf("seeding...: %d%%", (t*10000+(i+1))/1000)
			}
		}
		err = tx.Commit()
		if err != nil {
			log.Fatalln(err)
		}
	}

	log.Println("seed completed!")
}
