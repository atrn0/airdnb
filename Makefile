DB_SCHEMA_DIR=backend/psql
OPENAPI_SPEC=openapi/spec/openapi.yml
BACKEND_OPENAPI_GEN_DIR=backend/gen/openapi

gen:
	make openapi-gen

## OpenAPI

openapi-gen:
	rm -rf ${PWD}/${BACKEND_OPENAPI_GEN_DIR}/* || true
	mkdir ${PWD}/${BACKEND_OPENAPI_GEN_DIR} || true
	oapi-codegen -generate spec ${OPENAPI_SPEC} > ${PWD}/${BACKEND_OPENAPI_GEN_DIR}/spec.gen.go && \
	oapi-codegen -generate types ${OPENAPI_SPEC} > ${PWD}/${BACKEND_OPENAPI_GEN_DIR}/types.gen.go && \
	oapi-codegen -generate server ${OPENAPI_SPEC} > ${PWD}/${BACKEND_OPENAPI_GEN_DIR}/server.gen.go
