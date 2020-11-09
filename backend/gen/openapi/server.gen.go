// Package Openapi provides primitives to interact the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen DO NOT EDIT.
package Openapi

import (
	"fmt"
	"net/http"

	"github.com/deepmap/oapi-codegen/pkg/runtime"
	"github.com/labstack/echo/v4"
)

// ServerInterface represents all server handlers.
type ServerInterface interface {

	// (GET /guests/reservations)
	GuestsGetReservations(ctx echo.Context) error

	// (POST /guests/reservations)
	PostReservations(ctx echo.Context) error

	// (GET /guests/rooms)
	GuestsGetRooms(ctx echo.Context) error

	// (GET /guests/rooms/{roomId})
	GuestsGetRoom(ctx echo.Context, roomId string) error

	// (POST /guests/users)
	GuestsPostUsers(ctx echo.Context) error

	// (GET /hosts/reservations)
	HostsGetReservations(ctx echo.Context) error

	// (GET /hosts/rooms)
	HostsGetRooms(ctx echo.Context) error

	// (POST /hosts/rooms)
	PostRooms(ctx echo.Context) error
}

// ServerInterfaceWrapper converts echo contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler ServerInterface
}

// GuestsGetReservations converts echo context to params.
func (w *ServerInterfaceWrapper) GuestsGetReservations(ctx echo.Context) error {
	var err error

	ctx.Set("Bearer.Scopes", []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GuestsGetReservations(ctx)
	return err
}

// PostReservations converts echo context to params.
func (w *ServerInterfaceWrapper) PostReservations(ctx echo.Context) error {
	var err error

	ctx.Set("Bearer.Scopes", []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostReservations(ctx)
	return err
}

// GuestsGetRooms converts echo context to params.
func (w *ServerInterfaceWrapper) GuestsGetRooms(ctx echo.Context) error {
	var err error

	ctx.Set("Bearer.Scopes", []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GuestsGetRooms(ctx)
	return err
}

// GuestsGetRoom converts echo context to params.
func (w *ServerInterfaceWrapper) GuestsGetRoom(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "roomId" -------------
	var roomId string

	err = runtime.BindStyledParameter("simple", false, "roomId", ctx.Param("roomId"), &roomId)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter roomId: %s", err))
	}

	ctx.Set("Bearer.Scopes", []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GuestsGetRoom(ctx, roomId)
	return err
}

// GuestsPostUsers converts echo context to params.
func (w *ServerInterfaceWrapper) GuestsPostUsers(ctx echo.Context) error {
	var err error

	ctx.Set("Bearer.Scopes", []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.GuestsPostUsers(ctx)
	return err
}

// HostsGetReservations converts echo context to params.
func (w *ServerInterfaceWrapper) HostsGetReservations(ctx echo.Context) error {
	var err error

	ctx.Set("Bearer.Scopes", []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.HostsGetReservations(ctx)
	return err
}

// HostsGetRooms converts echo context to params.
func (w *ServerInterfaceWrapper) HostsGetRooms(ctx echo.Context) error {
	var err error

	ctx.Set("Bearer.Scopes", []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.HostsGetRooms(ctx)
	return err
}

// PostRooms converts echo context to params.
func (w *ServerInterfaceWrapper) PostRooms(ctx echo.Context) error {
	var err error

	ctx.Set("Bearer.Scopes", []string{""})

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PostRooms(ctx)
	return err
}

// This is a simple interface which specifies echo.Route addition functions which
// are present on both echo.Echo and echo.Group, since we want to allow using
// either of them for path registration
type EchoRouter interface {
	CONNECT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	DELETE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	HEAD(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	OPTIONS(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PATCH(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	POST(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PUT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	TRACE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
}

// RegisterHandlers adds each server route to the EchoRouter.
func RegisterHandlers(router EchoRouter, si ServerInterface) {

	wrapper := ServerInterfaceWrapper{
		Handler: si,
	}

	router.GET("/guests/reservations", wrapper.GuestsGetReservations)
	router.POST("/guests/reservations", wrapper.PostReservations)
	router.GET("/guests/rooms", wrapper.GuestsGetRooms)
	router.GET("/guests/rooms/:roomId", wrapper.GuestsGetRoom)
	router.POST("/guests/users", wrapper.GuestsPostUsers)
	router.GET("/hosts/reservations", wrapper.HostsGetReservations)
	router.GET("/hosts/rooms", wrapper.HostsGetRooms)
	router.POST("/hosts/rooms", wrapper.PostRooms)

}
