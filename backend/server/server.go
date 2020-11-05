package server

import (
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	oapi "github.com/atrn0/le4db/gen/openapi"
	"github.com/atrn0/le4db/handler"
)

type Server struct {
	db *sqlx.DB
	e  *echo.Echo
}

func NewServer(db *sqlx.DB) *Server {
	return &Server{db: db, e: echo.New()}
}

func (s *Server) Start() {
	log.Println("starting server...")

	e := s.e
	e.Use(middleware.CORS())

	h := handler.NewHandler()

	oapi.RegisterHandlers(e, h)
}
