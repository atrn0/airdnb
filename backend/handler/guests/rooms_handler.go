package guests

import (
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"

	"github.com/atrn0/le4db/entity"
	oapi "github.com/atrn0/le4db/gen/openapi"
	"github.com/atrn0/le4db/handler/errors"
	"github.com/atrn0/le4db/middleware/auth"
)

type RoomsHandlerImpl struct {
	db *sqlx.DB
}

type GuestsRoomsHandler interface {
	GuestsGetRooms(ctx echo.Context) error
	GuestsGetRoom(ctx echo.Context, roomId string) error
}

func NewRoomsHandler(db *sqlx.DB) GuestsRoomsHandler {
	return &RoomsHandlerImpl{
		db,
	}
}

func (h *RoomsHandlerImpl) GuestsGetRooms(ctx echo.Context) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	var rooms []entity.Room
	err := h.db.Select(&rooms, "select * from rooms limit 20")
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: "db error"})
	}
	var roomsRes []oapi.GuestsRoom
	for _, room := range rooms {
		roomsRes = append(roomsRes, oapi.GuestsRoom{
			HostId: room.HostID,
			Id:     room.ID,
			Name:   room.Name,
			Price:  room.Price,
		})
	}
	return ctx.JSON(http.StatusOK, oapi.GuestsGetRoomsRes{
		Rooms: roomsRes,
	})
}

func (h *RoomsHandlerImpl) GuestsGetRoom(ctx echo.Context, roomId string) error {
	panic("implement me")
}
