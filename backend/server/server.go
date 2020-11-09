package server

import (
	"context"
	"log"

	oapimiddleware "github.com/deepmap/oapi-codegen/pkg/middleware"
	"github.com/getkin/kin-openapi/openapi3filter"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	oapi "github.com/atrn0/le4db/gen/openapi"
	"github.com/atrn0/le4db/handler"
	"github.com/atrn0/le4db/middleware/auth"
)

type Server struct {
	db *sqlx.DB
	e  *echo.Echo
}

func NewServer(db *sqlx.DB) *Server {
	return &Server{db: db, e: echo.New()}
}

func (s *Server) Start() error {
	log.Println("starting server...")

	e := s.e
	e.Use(middleware.Logger())
	e.Use(middleware.CORS())
	swagger, err := oapi.GetSwagger()
	if err != nil {
		return err
	}
	swagger.Servers = nil
	swagger.Security = nil
	e.Use(oapimiddleware.OapiRequestValidatorWithOptions(
		swagger,
		&oapimiddleware.Options{
			Options: openapi3filter.Options{
				AuthenticationFunc: func(c context.Context, input *openapi3filter.AuthenticationInput) error {
					return nil
				},
			},
		},
	))
	e.Use(auth.AuthMiddleware)

	h := handler.NewHandler(s.db)

	oapi.RegisterHandlers(e, h)

	return e.Start(":8080")
}
