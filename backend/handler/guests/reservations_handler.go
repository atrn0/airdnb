package guests

import "github.com/labstack/echo/v4"

type ReservationsHandlerImpl struct {
}

type GuestsReservationsHandler interface {
	GuestsGetReservations(ctx echo.Context) error
	PostReservations(ctx echo.Context) error
}

func NewReservationsHandler() GuestsReservationsHandler {
	return &ReservationsHandlerImpl{}
}

func (r *ReservationsHandlerImpl) GuestsGetReservations(ctx echo.Context) error {
	panic("implement me")
}

func (r *ReservationsHandlerImpl) PostReservations(ctx echo.Context) error {
	panic("implement me")
}
