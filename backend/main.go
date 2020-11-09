package main

import (
	"log"

	"github.com/pkg/errors"

	database "github.com/atrn0/le4db/db"
	"github.com/atrn0/le4db/server"
)

func main() {
	//	connect db
	db, err := database.NewDB()
	if err != nil {
		log.Printf("error %v\n", errors.WithStack(err))
		log.Fatalln("failed to connect db")
	}

	s := server.NewServer(db)
	log.Fatalln(s.Start())
}
