package main

import (
	"log"

	"github.com/pkg/errors"

	database "github.com/atrn0/le4db/db"
	"github.com/atrn0/le4db/entity"
	"github.com/atrn0/le4db/server"
)

func main() {
	//	connect db
	db, err := database.NewDB()
	if err != nil {
		log.Printf("error %v\n", errors.WithStack(err))
		log.Fatalln("failed to connect db")
	}

	// seed
	_, _ = db.NamedExec(`INSERT INTO guests (id, name) VALUES (:id, :name)`, &entity.Guest{
		ID:   "buihg30jisednf53vmd0",
		Name: "さとう",
	})
	_, _ = db.NamedExec(`INSERT INTO hosts (id, name) VALUES (:id, :name)`, &entity.Host{
		ID:   "buihg30jisednf53vmdg",
		Name: "いとう",
	})

	s := server.NewServer(db)
	log.Fatalln(s.Start())
}
