package hosts

import "github.com/labstack/echo/v4"

type ReservationsHandlerImpl struct {
}

type HostsReservationsHandler interface {
	HostsGetReservations(ctx echo.Context) error
}

func NewReservationsHandler() HostsReservationsHandler {
	return &ReservationsHandlerImpl{}
}

func (r *ReservationsHandlerImpl) HostsGetReservations(ctx echo.Context) error {
	panic("implement me")
}
