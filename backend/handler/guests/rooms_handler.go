package guests

import "github.com/labstack/echo/v4"

type RoomsHandlerImpl struct {
}

type GuestsRoomsHandler interface {
	GuestsGetRooms(ctx echo.Context) error
	GuestsGetRoom(ctx echo.Context, roomId string) error
}

func NewRoomsHandler() GuestsRoomsHandler {
	return &RoomsHandlerImpl{}
}

func (h *RoomsHandlerImpl) GuestsGetRooms(ctx echo.Context) error {
	panic("implement me")
}

func (h *RoomsHandlerImpl) GuestsGetRoom(ctx echo.Context, roomId string) error {
	panic("implement me")
}
