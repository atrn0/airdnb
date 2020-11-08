package auth

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"golang.org/x/xerrors"

	"github.com/atrn0/le4db/handler/errors"
)

const userIdKey = "le4db:userId"

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		idToken, err := tokenFromHeader(ctx)
		if err != nil {
			return ctx.JSON(http.StatusUnauthorized, errors.ErrorRes{Message: "missing token"})
		}

		//TODO: get userId from idToken
		userId := idToken
		ctx.Set(userIdKey, userId)

		err = next(ctx)
		return err
	}
}

func GetUserId(ctx echo.Context) string {
	userId := ctx.Get(userIdKey)
	if v, ok := userId.(string); ok {
		return v
	}
	return ""
}

func tokenFromHeader(c echo.Context) (string, error) {
	authScheme := "Bearer"
	auth := c.Request().Header.Get(echo.HeaderAuthorization)
	l := len(authScheme)
	if len(auth) > l+1 && auth[:l] == authScheme {
		return strings.TrimSpace(auth[l+1:]), nil
	}
	return "", xerrors.New("missing or malformed token")
}
