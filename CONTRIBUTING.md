# Flujo de trabajo GameCrush Backend

Este proyecto sigue el siguiente flujo de ramas y Pull Requests.

## Ramas principales

- `main`: rama de producción. Solo recibe cambios desde `develop` mediante Pull Request.
- `develop`: rama de integración. Todos los cambios activos llegan aquí mediante PR.

## Ramas de trabajo

- Las nuevas tareas deben crearse siempre a partir de `develop` usando la convención:

Ejemplos:

- `feature/registro-de-usuarios`
- `feature/api-matchmaking`

## Pull Requests

- Todo Pull Request debe ser creado hacia la rama `develop`.
- No se permite merge directo a `main` ni a `develop`.
- Todo PR será revisado y aprobado por el revisor antes de ser mergeado.
- Los PR deben incluir descripción y checklist según el template.

## Protecciones

- Las ramas `main` y `develop` están protegidas.
- No se permiten force pushes ni eliminaciones.
- No se permite merge sin revisión.
