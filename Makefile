DB_SCHEMA_DIR=backend/psql
OPENAPI_SPEC=openapi/spec/openapi.yml
BACKEND_OPENAPI_GEN_DIR=backend/gen/openapi
FRONTEND_OPENAPI_GEN_DIR=frontend/src/gen/openapi

start-server:
	docker-compose up --build app postgres

db-upgrade:
	cat backend/psql/*.sql | psql -h localhost -U le4db

gen:
	make openapi-gen

## OpenAPI

openapi-gen:
	rm -rf ${PWD}/${BACKEND_OPENAPI_GEN_DIR}/* || true
	mkdir ${PWD}/${BACKEND_OPENAPI_GEN_DIR} || true
	oapi-codegen -generate spec ${OPENAPI_SPEC} > ${PWD}/${BACKEND_OPENAPI_GEN_DIR}/spec.gen.go && \
	oapi-codegen -generate types ${OPENAPI_SPEC} > ${PWD}/${BACKEND_OPENAPI_GEN_DIR}/types.gen.go && \
	oapi-codegen -generate server ${OPENAPI_SPEC} > ${PWD}/${BACKEND_OPENAPI_GEN_DIR}/server.gen.go

openapi-gen-frontend:
	docker run --rm -v ${PWD}:/local \
		openapitools/openapi-generator-cli:v4.3.1 generate \
		-i /local/${OPENAPI_SPEC} \
		-g typescript-axios \
		-o /local/${FRONTEND_OPENAPI_GEN_DIR}
