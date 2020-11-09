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

type ReservationsHandlerImpl struct {
	db *sqlx.DB
}

type HostsReservationsHandler interface {
	HostsGetReservations(ctx echo.Context) error
}

func NewReservationsHandler(db *sqlx.DB) HostsReservationsHandler {
	return &ReservationsHandlerImpl{db}
}

func (h *ReservationsHandlerImpl) HostsGetReservations(ctx echo.Context) error {
	userId := auth.GetUserId(ctx)
	if userId == "" {
		return ctx.JSON(
			http.StatusBadRequest,
			errors.ErrorRes{Message: "userId is required"},
		)
	}

	var reservations []entity.ReservationWithRoomNameAndGuestName
	err := h.db.Select(&reservations, `
		select res.id as id, check_in, check_out, room_id, r.name as room_name, guest_id, g.name as guest_name  
		from (reservations as res inner join rooms r on r.id = res.room_id)
		    inner join guests g on g.id = res.guest_id
		where host_id = $1
		`, userId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError,
			errors.ErrorRes{Message: "db error"})
	}

	reservationsRes := []oapi.HostsReservation{}
	for _, r := range reservations {
		reservationsRes = append(reservationsRes, oapi.HostsReservation{
			Id:        r.ID,
			CheckIn:   r.CheckIn,
			CheckOut:  r.CheckOut,
			GuestId:   r.GuestID,
			GuestName: r.GuestName,
			RoomId:    r.RoomID,
			RoomName:  r.RoomName,
		})
	}

	return ctx.JSON(http.StatusOK, &reservationsRes)
}
