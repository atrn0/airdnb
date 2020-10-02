package main

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/atrn0/le4db/entity"
)

func main() {
	//	connect db
	dsn := "host=postgres user=le4db password=password dbname=le4db port=5432 sslmode=disable TimeZone=Asia/Tokyo"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{Logger: logger.Default.LogMode(logger.Info)})
	if err != nil {
		log.Fatalln("failed to connect db")
	}

	//	auto migrate
	err = db.AutoMigrate(&entity.Hosts{})
	if err != nil {
		log.Fatalln("failed to migrate db schema")
	}
	log.Println("migrated")
}
