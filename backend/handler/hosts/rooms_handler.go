package hosts

import (
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/rs/xid"

	"github.com/atrn0/le4db/entity"
	oapi "github.com/atrn0/le4db/gen/openapi"
	"github.com/atrn0/le4db/handler/errors"
	"github.com/atrn0/le4db/middleware/auth"
)

type RoomsHandlerImpl struct {
	db *sqlx.DB
}

type HostsRoomsHandler interface {
	HostsGetRooms(ctx echo.Context) error
	HostsPostRooms(ctx echo.Context) error
	HostsPutRooms(ctx echo.Context, roomId string) error
	HostsDeleteRooms(ctx echo.Context, roomId string) error
}

func NewRoomsHandler(db *sqlx.DB) HostsRoomsHandler {
	return &RoomsHandlerImpl{db}
}

func (h *RoomsHandlerImpl) HostsGetRooms(ctx echo.Context) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	var rooms []entity.Room
	err := h.db.Select(
		&rooms,
		"select * from rooms where host_id = $1",
		userId,
	)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: err.Error()})
	}

	var roomsRes []oapi.HostsRoom
	for _, room := range rooms {
		roomsRes = append(roomsRes, oapi.HostsRoom{
			Id:    room.ID,
			Name:  room.Name,
			Price: room.Price,
		})
	}

	return ctx.JSON(http.StatusOK, oapi.HostsGetRoomsRes{
		Rooms: roomsRes,
	})
}

func (h *RoomsHandlerImpl) HostsPostRooms(ctx echo.Context) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	req := new(oapi.HostsPostRoomsReq)
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: err.Error()},
		)
	}

	roomCreate := entity.Room{
		ID:     xid.New().String(),
		Name:   req.Name,
		Price:  req.Price,
		HostID: userId,
	}

	_, err := h.db.NamedExec(`
	INSERT INTO rooms (id, name, price, host_id) 
	VALUES (:id, :name, :price, :host_id) 
	`, roomCreate)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: err.Error()})
	}

	return ctx.NoContent(http.StatusNoContent)
}

func (h *RoomsHandlerImpl) HostsPutRooms(ctx echo.Context, roomId string) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	tx := h.db.MustBegin()

	var room entity.Room
	err := tx.Get(&room, `
		SELECT * from rooms where id = $1
	`, roomId)
	if err != nil {
		return ctx.JSON(http.StatusNotFound,
			errors.ErrorRes{Message: "the room not found"})
	}

	if room.HostID != userId {
		return ctx.JSON(http.StatusUnauthorized, errors.ErrorRes{Message: "not authorized"})
	}

	req := new(oapi.HostsPutRoomsReq)
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: err.Error()},
		)
	}

	if req.Name != "" {
		_, err = tx.Exec(`
		UPDATE rooms SET name = $1 WHERE id = $3
	`, req.Name, roomId)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError,
				errors.ErrorRes{Message: err.Error()})
		}
	}

	if req.Price > 0 {
		_, err = tx.Exec(`
		UPDATE rooms SET price = $1 WHERE id = $3
	`, req.Price, roomId)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError,
				errors.ErrorRes{Message: err.Error()})
		}
	}

	err = tx.Commit()
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: err.Error()})
	}

	return ctx.NoContent(http.StatusNoContent)
}

func (h *RoomsHandlerImpl) HostsDeleteRooms(ctx echo.Context, roomId string) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	var room entity.Room
	err := h.db.Get(&room, `
		SELECT * from rooms where id = $1
	`, roomId)
	if err != nil {
		return ctx.JSON(http.StatusNotFound,
			errors.ErrorRes{Message: "the room not found"})
	}

	if room.HostID != userId {
		return ctx.JSON(http.StatusUnauthorized, errors.ErrorRes{Message: "not authorized"})
	}

	_, err = h.db.Exec(`
		DELETE FROM rooms WHERE id = $1
		`, roomId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: err.Error()})
	}

	return ctx.NoContent(http.StatusNoContent)
}
