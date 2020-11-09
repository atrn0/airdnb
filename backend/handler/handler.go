package handler

import (
	"github.com/jmoiron/sqlx"

	"github.com/atrn0/le4db/handler/guests"
	"github.com/atrn0/le4db/handler/hosts"
)

type Impl struct {
	guests.GuestsRoomsHandler
	guests.GuestsReservationsHandler
	guests.GuestsUsersHandler
	hosts.HostsRoomsHandler
	hosts.HostsReservationsHandler
}

func NewHandler(db *sqlx.DB) *Impl {
	return &Impl{
		guests.NewRoomsHandler(db),
		guests.NewReservationsHandler(db),
		guests.NewUsersHandler(),
		hosts.NewRoomsHandler(),
		hosts.NewReservationsHandler(),
	}
}
