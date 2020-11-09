package guests

import (
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"

	"github.com/atrn0/le4db/entity"
	oapi "github.com/atrn0/le4db/gen/openapi"
	"github.com/atrn0/le4db/handler/errors"
)

type UsersHandlerImpl struct {
	db *sqlx.DB
}

type GuestsUsersHandler interface {
	GuestsPostUsers(ctx echo.Context) error
}

func NewUsersHandler(db *sqlx.DB) GuestsUsersHandler {
	return &UsersHandlerImpl{db}
}

func (h *UsersHandlerImpl) GuestsPostUsers(ctx echo.Context) error {
	req := new(oapi.GuestsPostUsersReq)
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(
			http.StatusCreated,
			errors.ErrorRes{Message: err.Error()},
		)
	}

	if req.UserId == "" {
		return ctx.JSON(http.StatusBadRequest, errors.ErrorRes{
			Message: "userId is required",
		})
	}

	_, err := h.db.NamedExec(`
		INSERT INTO guests (id, name) VALUES (:id, :name)
		`, &entity.Guest{
		ID:   req.UserId,
		Name: req.Name,
	})
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: err.Error()})
	}

	return ctx.NoContent(http.StatusNoContent)
}
