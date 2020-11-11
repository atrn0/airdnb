package hosts

import (
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"

	"github.com/atrn0/le4db/entity"
	oapi "github.com/atrn0/le4db/gen/openapi"
	"github.com/atrn0/le4db/handler/errors"
	"github.com/atrn0/le4db/middleware/auth"
)

type UsersHandlerImpl struct {
	db *sqlx.DB
}

type HostsUsersHandler interface {
	HostsGetMe(ctx echo.Context) error
}

func NewUsersHandler(db *sqlx.DB) HostsUsersHandler {
	return &UsersHandlerImpl{db}
}

func (h *UsersHandlerImpl) HostsGetMe(ctx echo.Context) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	var me entity.Host
	err := h.db.Get(&me, `
		SELECT * from hosts WHERE id = $1
		`, userId)
	if err != nil {
		return ctx.JSON(http.StatusNotFound, errors.ErrorRes{Message: "not found"})
	}

	return ctx.JSON(http.StatusOK, oapi.HostsGetMeRes{
		Id:   me.ID,
		Name: me.Name,
	})
}
