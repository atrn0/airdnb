package hosts

import "github.com/labstack/echo/v4"

type RoomsHandlerImpl struct {
}

type HostsRoomsHandler interface {
	HostsGetRooms(ctx echo.Context) error
	PostRooms(ctx echo.Context) error
}

func NewRoomsHandler() HostsRoomsHandler {
	return &RoomsHandlerImpl{}
}

func (r RoomsHandlerImpl) HostsGetRooms(ctx echo.Context) error {
	panic("implement me")
}

func (r RoomsHandlerImpl) PostRooms(ctx echo.Context) error {
	panic("implement me")
}
