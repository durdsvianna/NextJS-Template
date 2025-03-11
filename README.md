# Task Manager Application

A modern task management application built with Next.js, MongoDB, and Docker. The application allows users to create, view, edit, and delete tasks with support for different layouts (with and without sidebar).

![Task Manager](public/preview.png)

## 🚀 Features

- **Task Management:**
  - Create, read, update, and delete tasks
  - Filter tasks by status, tags, and search terms
  - View detailed task information

- **Modern UI:**
  - Two different layouts:
    - Base layout (clean and minimal)
    - Sidebar layout (for dashboard-like experience)
  - Responsive design for all device sizes
  - Dark/Light mode support

- **MongoDB Integration:**
  - Complete CRUD operations with MongoDB
  - Mongoose models with validation
  - Efficient database connection handling

- **Docker Support:**
  - Development setup with Docker Compose
  - Production-ready Dockerfile
  - MongoDB container for easy database setup

- **API:**
  - RESTful API endpoints for tasks
  - Error handling and validation

## 🔧 Tech Stack

- **Frontend:**
  - [Next.js 14](https://nextjs.org/) (React framework with App Router)
  - [Tailwind CSS](https://tailwindcss.com/) (Styling)
  - [React Icons](https://react-icons.github.io/react-icons/) (Icon library)
  - [React Query](https://tanstack.com/query/latest) (Data fetching)

- **Backend:**
  - [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (Server endpoints)
  - [MongoDB](https://www.mongodb.com/) (Database)
  - [Mongoose](https://mongoosejs.com/) (MongoDB ODM)

- **Infrastructure:**
  - [Docker](https://www.docker.com/) (Containerization)
  - [Docker Compose](https://docs.docker.com/compose/) (Multi-container setup)

## 📂 Project Structure

```
src/
├── app/
│   ├── (base)/                 # Base layout routes
│   │   ├── admin/              # Admin routes
│   │   ├── home/               # Home route
│   │   └── tasks/              # Task routes (list, create, view, edit)
│   ├── (sidebar)/              # Sidebar layout routes
│   │   └── sidelayout/         # All sidebar-enabled routes
│   ├── api/                    # API routes
│   │   └── tasks/              # Task API endpoints
│   ├── content/                # Content components
│   │   └── functionalities/    # Reusable functionality components
│   ├── contexts/               # React contexts
│   └── layouts/                # Layout components
│       ├── base/               # Base layout components
│       └── sidebar/            # Sidebar layout components
├── components/                 # Shared components
│   └── ui/                     # UI components
├── lib/                        # Utility libraries
│   └── mongodb.ts              # MongoDB connection utility
├── models/                     # Mongoose models
│   └── Task.ts                 # Task model
└── types/                      # TypeScript type definitions
```

## 📋 Data Models

### Task Model

```typescript
interface ITask {
  _id?: string;
  title: string;
  company: string;
  description: string;
  reward: number;
  dueDate: Date;
  tags: string[];
  status: 'Open' | 'In Progress' | 'Completed';
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🚢 API Endpoints

### Tasks API

- `GET /api/tasks` - List all tasks (with optional status filtering)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get details of a specific task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

## 🛠️ Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for containerized setup)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/aidev
```

### Development Setup

#### Option 1: With Docker (Recommended)

1. Start the MongoDB container:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

#### Option 2: Without Docker

1. Make sure you have MongoDB installed and running locally (or use a remote MongoDB instance).

2. Install dependencies:

```bash
npm install
```

3. Set the `MONGODB_URI` in `.env.local` to point to your MongoDB instance.

4. Run the development server:

```bash
npm run dev
```

### Production Deployment

1. Build and run the Docker containers:

```bash
docker-compose up -d
```

This will build the Next.js application and run it alongside MongoDB.

## 🧭 Navigation

The application offers two different layouts for accessing the same functionality:

1. **Base Layout** - Clean, minimal layout without sidebar
   - Access via: `/home`, `/tasks`, `/admin/profile`, etc.

2. **Sidebar Layout** - Dashboard-like experience with sidebar navigation
   - Access via: `/sidelayout/home`, `/sidelayout/tasks`, `/sidelayout/admin/profile`, etc.

## 🔄 App Flows

### Creating a Task

1. Navigate to `/tasks/create` or `/sidelayout/tasks/create`
2. Fill in the task details (title, company, description, reward, due date, tags, status)
3. Submit the form to create the task

### Managing Tasks

1. View all tasks on the task list page (`/tasks` or `/sidelayout/tasks`)
2. Use the filters to find specific tasks:
   - Search by title, description, or company
   - Filter by status (Open, In Progress, Completed)
   - Filter by tags
3. Click on a task to view details
4. Edit or delete tasks from the detail view

## 📱 Responsive Design

The application is fully responsive:
- Desktop: Full sidebar and expanded views
- Tablet: Collapsible sidebar with toggle
- Mobile: Optimized mobile view with hamburger menu

## 🛠️ Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Format code
npm run format
```

## 🐳 Docker Scripts

```bash
# Start MongoDB for development
docker-compose -f docker-compose.dev.yml up -d

# Start full application stack for production
docker-compose up -d

# Stop all containers
docker-compose down

# Stop development containers
docker-compose -f docker-compose.dev.yml down
```

## 📈 Future Enhancements

- User authentication and authorization
- Task assignments and ownership
- File/image attachments for tasks
- Email notifications
- Advanced filtering and sorting
- Task comments and collaboration
- Task dependencies and related tasks
- Reporting and analytics dashboard
- Kanban board view for tasks
- Push notifications

## 📄 License

This project is licensed under the MIT License.