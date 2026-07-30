# InventoryPilot

InventoryPilot is a full-stack inventory management system that helps businesses monitor inventory across multiple warehouses and generate intelligent reorder recommendations.

## Tech Stack

- Django
- Django REST Framework
- PostgreSQL
- React
- Axios

## Project Status

- [x] Repository Initialized
- [ ] Backend Setup
- [ ] Database Design
- [ ] APIs
- [ ] Frontend
- [ ] Reorder Engine

## Milestone 2 – Backend Foundation

Completed:

- Created an isolated Python virtual environment.
- Installed Django and Django REST Framework.
- Added PostgreSQL database driver.
- Configured environment variable support using `python-decouple`.
- Added CORS middleware to enable communication with the React frontend.

### Engineering Decision

The backend follows an API-first architecture where Django is responsible only for business logic and REST APIs. React will consume these APIs independently, allowing both applications to evolve separately.

## Backend Setup

- Django REST Framework
- PostgreSQL
- Environment variables using python-decouple
- CORS configured
- Initial migrations completed

## Current Features

- Product Management
- Warehouse Management
- Inventory Tracking
- Reorder Dashboard
- Multi-Warehouse Stock Aggregation
- Seed Data Command