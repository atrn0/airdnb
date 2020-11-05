package server

import (
	"log"

	"github.com/jmoiron/sqlx"
)

type Server struct {
	db *sqlx.DB
}

func NewServer(db *sqlx.DB) *Server {
	return &Server{db: db}
}

func (s *Server) Start() {
	log.Println("starting server...")
}
