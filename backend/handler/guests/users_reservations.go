package guests

import "github.com/labstack/echo/v4"

type UsersHandlerImpl struct {
}

type GuestsUsersHandler interface {
	GuestsPostUsers(ctx echo.Context) error
}

func NewUsersHandler() GuestsUsersHandler {
	return &UsersHandlerImpl{}
}

func (u *UsersHandlerImpl) GuestsPostUsers(ctx echo.Context) error {
	panic("implement me")
}
