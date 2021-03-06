package guests

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

type ReservationsHandlerImpl struct {
	db *sqlx.DB
}

type GuestsReservationsHandler interface {
	GuestsGetReservations(ctx echo.Context) error
	PostReservations(ctx echo.Context) error
}

func NewReservationsHandler(db *sqlx.DB) GuestsReservationsHandler {
	return &ReservationsHandlerImpl{db}
}

func (h *ReservationsHandlerImpl) GuestsGetReservations(ctx echo.Context) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	var reservations []entity.ReservationWithRoomName
	err := h.db.Select(&reservations, `
		select res.id as id, check_in, check_out, room_id, r.name  as room_name
		from reservations as res inner join rooms r on r.id = res.room_id 
		where guest_id = $1
		`, userId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: "db error"})
	}

	reservationsRes := []oapi.GuestsReservation{}
	for _, r := range reservations {
		reservationsRes = append(reservationsRes, oapi.GuestsReservation{
			Id:       r.ID,
			CheckIn:  r.CheckIn,
			CheckOut: r.CheckOut,
			RoomId:   r.RoomID,
			RoomName: r.RoomName,
		})
	}

	return ctx.JSON(
		http.StatusOK,
		oapi.GuestsGetReservationsRes{
			Reservations: reservationsRes,
		})
}

func (h *ReservationsHandlerImpl) PostReservations(ctx echo.Context) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	req := new(oapi.PostReservationsReq)
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: err.Error()},
		)
	}

	reservationCreate := entity.ReservationCreate{
		ID:       xid.New().String(),
		CheckIn:  req.CheckIn,
		CheckOut: req.CheckOut,
		RoomID:   req.RoomId,
		GuestID:  userId,
	}

	tx := h.db.MustBegin()

	_, err := tx.NamedExec(`
		INSERT INTO reservations (id, check_in, check_out, room_id, guest_id)
		VALUES (:id, :check_in, :check_out, :room_id, :guest_id)
		`, reservationCreate)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: err.Error()})
	}

	var r entity.ReservationWithRoomName
	err = tx.Get(&r, `
		SELECT res.id as id, check_in, check_out, room_id, r.name as room_name 
		FROM reservations as res INNER JOIN rooms r on r.id = res.room_id
		WHERE res.id = $1
	`, reservationCreate.ID)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: err.Error()})
	}

	err = tx.Commit()
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: err.Error()})
	}

	return ctx.JSON(http.StatusCreated, oapi.GuestsReservation{
		CheckIn:  r.CheckIn,
		CheckOut: r.CheckOut,
		Id:       r.ID,
		RoomId:   r.RoomID,
		RoomName: r.RoomName,
	})
}
