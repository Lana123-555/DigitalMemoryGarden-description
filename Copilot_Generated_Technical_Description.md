# Digital Memory Garden - Technical Description

## Project Overview

Digital Memory Garden is a comprehensive memorial platform developed as part of academic work at the University of Edinburgh. The platform provides a digital space where users can share stories, memories, and tributes to loved ones through various mediums including flowers, candles, archives, and gallery submissions. The project combines modern web technologies to create an emotional, accessible, and multilingual experience for preserving and sharing memories.

**Author**: Lana Sokoliuk, The University of Edinburgh, Edinburgh, UK  
**License**: ISC

---

## Architecture Overview

The Digital Memory Garden follows a modern full-stack architecture with clear separation of concerns:

- **Frontend**: React-based single-page application with TypeScript
- **Backend**: Node.js/Express RESTful API server
- **Database**: MongoDB for data persistence
- **Media Storage**: Cloudinary for image, audio, and video files
- **Deployment**: Vercel for frontend hosting, with backend API deployment

### System Architecture Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│  React Frontend │◄──►│ Express Backend │◄──►│   MongoDB       │
│  (TypeScript)   │    │   (Node.js)     │    │   Database      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │
│    Vercel       │    │   Cloudinary    │
│   (Hosting)     │    │ (Media Storage) │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
```

---

## Backend Architecture

### Technology Stack

**Core Technologies:**
- **Node.js**: Runtime environment
- **Express 5.1.0**: Web framework with ES modules support
- **MongoDB 8.15.1**: NoSQL database via Mongoose ODM
- **Cloudinary 2.7.0**: Cloud-based media management
- **Multer 2.0.1**: Multipart form data handling for file uploads

**Development & Quality:**
- **Nodemon 3.1.10**: Development server with hot reloading
- **Pino**: High-performance JSON logger
- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting

**Security & Validation:**
- **Joi 17.13.3**: Schema validation
- **CORS 2.8.5**: Cross-origin resource sharing
- **HTTP-Errors 2.0.0**: HTTP error handling
- **Custom authentication middleware**: Admin panel access control

### Project Structure

```
backend/
├── src/
│   ├── constants/           # Application constants
│   ├── controllers/         # Business logic handlers
│   │   ├── category.js      # Category CRUD operations
│   │   ├── story.js         # Story management
│   │   ├── mapEvent.js      # Interactive map events
│   │   └── candleType.js    # Candle type management
│   ├── database/
│   │   └── initMongoDB.js   # Database connection setup
│   ├── middlewares/         # Express middleware functions
│   │   ├── authAdmin.js     # Admin authentication
│   │   ├── errorHandler.js  # Global error handling
│   │   ├── isValidId.js     # MongoDB ObjectId validation
│   │   ├── multer.js        # File upload configuration
│   │   ├── notFoundHandler.js # 404 error handling
│   │   ├── validateBody.js   # Request validation
│   │   └── handleMulterError.js # File upload error handling
│   ├── models/             # Mongoose schemas and models
│   │   ├── category.js     # Category data model
│   │   ├── story.js        # Story data model
│   │   ├── mapEvent.js     # Map event data model
│   │   └── candleType.js   # Candle type data model
│   ├── routers/            # API route definitions
│   │   ├── index.js        # Main router with admin login
│   │   ├── category.js     # Category routes
│   │   ├── story.js        # Story routes
│   │   ├── mapEvent.js     # Map event routes
│   │   └── candleType.js   # Candle type routes
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   ├── validation/         # Joi validation schemas
│   ├── server.js           # Express server setup
│   └── index.js            # Application entry point
├── temp/                   # Temporary file storage
├── uploads/                # File upload directory
├── .env.example            # Environment variables template
├── .editorconfig           # Editor configuration
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── eslint.config.mjs       # ESLint configuration
└── package.json            # Node.js dependencies and scripts
```

### API Endpoints

**Authentication:**
- `POST /api/admin/login` - Admin authentication

**Categories:**
- `GET /api/categories` - Retrieve all categories
- `POST /api/categories` - Create new category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

**Stories:**
- `GET /api/stories` - Retrieve stories with filtering options
- `GET /api/stories/:id` - Retrieve specific story
- `POST /api/stories` - Create new story
- `PUT /api/stories/:id` - Update story (admin)
- `DELETE /api/stories/:id` - Delete story (admin)

**Map Events:**
- `GET /api/map-events` - Retrieve all map events
- `POST /api/map-events` - Create map event (admin)
- `PUT /api/map-events/:id` - Update map event (admin)
- `DELETE /api/map-events/:id` - Delete map event (admin)

**Candle Types:**
- `GET /api/candle-types` - Retrieve all candle types
- `POST /api/candle-types` - Create candle type (admin)
- `PUT /api/candle-types/:id` - Update candle type (admin)
- `DELETE /api/candle-types/:id` - Delete candle type (admin)

### Database Models

#### Story Model
```javascript
{
  title: String,           // Story title
  comment: String,         // Main story content
  name: String,           // Person's name
  age: Number,            // Person's age
  location: String,       // Geographic location
  dateOfBirth: Date,      // Birth date
  dateOfDeath: Date,      // Death date
  category: ObjectId,     // Reference to Category
  candleType: ObjectId,   // Reference to CandleType (conditional)
  createdAt: Date,        // Creation timestamp
  media: {
    photo: String,        // Photo file path
    audio: String,        // Audio file path
    video: String         // Video file path
  },
  storyId: String,        // Unique story identifier (pattern: ^[FCAG]\d{8}$)
  source: String          // Source type: 'flower', 'candle', 'archive', 'gallery'
}
```

#### MapEvent Model
```javascript
{
  x: Number,              // X coordinate (0-100)
  y: Number,              // Y coordinate (0-100)
  category: ObjectId,     // Reference to Category
  title: String,          // Event title
  miniatureImage: String, // Image file path
  zIndex: Number,         // Display layer (1-10)
  createdAt: Date         // Creation timestamp
}
```

#### Category Model
```javascript
{
  name: String,           // Category name
  description: String,    // Category description
  color: String,          // Hex color code
  createdAt: Date         // Creation timestamp
}
```

#### CandleType Model
```javascript
{
  name: String,           // Candle type name
  description: String,    // Type description
  imageUrl: String,       // Candle image URL
  createdAt: Date         // Creation timestamp
}
```

### Environment Configuration

Required environment variables:
```bash
PORT=3000                           # Server port
MONGODB_USER=username               # MongoDB username
MONGODB_PASSWORD=password           # MongoDB password
MONGODB_URL=mongodb://localhost     # MongoDB connection URL
MONGODB_DB=digital_memory_garden    # Database name
JWT_SECRET=your-secret-key          # JWT signing secret
APP_DOMAIN=http://localhost:3000    # Backend domain
ADMIN_PASSWORD=admin-password       # Admin panel password
CLIENT_DOMAIN=http://localhost:5173 # Frontend domain for CORS
```

### Security Features

1. **CORS Configuration**: Restricts API access to specified client domains
2. **Admin Authentication**: Password-based authentication for admin operations
3. **Request Validation**: Joi schema validation for all incoming requests
4. **File Upload Security**: Multer configuration with file type and size limits
5. **Error Handling**: Comprehensive error handling with proper HTTP status codes
6. **MongoDB Injection Protection**: Mongoose built-in protection against NoSQL injection

---

## Frontend Architecture

### Technology Stack

**Core Framework:**
- **React 19.1.0**: Component-based UI library with latest features
- **TypeScript 5.8.3**: Static type checking and enhanced development experience
- **Vite 6.3.5**: Fast build tool and development server

**Styling & UI:**
- **Tailwind CSS 4.1.10**: Utility-first CSS framework
- **Framer Motion 12.23.12**: Animation library for smooth interactions
- **React Hot Toast 2.5.2**: Toast notifications
- **React Spinners 0.17.0**: Loading indicators

**State Management & Forms:**
- **Formik 2.4.6**: Form management library
- **Yup 1.6.1**: Schema validation for forms
- **Axios 1.9.0**: HTTP client for API communication

**Routing & Navigation:**
- **React Router DOM 7.6.2**: Client-side routing

**Internationalization:**
- **i18next 25.3.2**: Internationalization framework
- **react-i18next 15.6.1**: React bindings for i18next
- **i18next-browser-languagedetector 8.2.0**: Automatic language detection

**Utilities:**
- **clsx 2.1.1**: Conditional className utility
- **react-intersection-observer 9.16.0**: Scroll-based animations

### Project Structure

```
frontend/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Images, icons, and media files
│   ├── components/              # Reusable UI components
│   │   ├── App/                 # Main application component
│   │   ├── Layout/              # Page layout components
│   │   ├── Loader/              # Loading components
│   │   └── admin/               # Admin panel components
│   │       ├── FormComponents.tsx    # Reusable form elements
│   │       ├── FileUploadField.tsx   # File upload component
│   │       ├── constants.ts          # Admin constants
│   │       ├── utils.ts              # Admin utility functions
│   │       └── README.md             # Admin components documentation
│   ├── data/                    # Static data and mock data
│   ├── hooks/                   # Custom React hooks
│   ├── i18n/                    # Internationalization setup
│   │   ├── index.ts             # i18n configuration
│   │   └── locales/             # Translation files
│   │       ├── en.json          # English translations
│   │       └── uk.json          # Ukrainian translations
│   ├── pages/                   # Page components
│   │   ├── HomePage/            # Landing page
│   │   ├── GardenPage/          # Interactive memory garden
│   │   ├── CandlesPage/         # Candle lighting interface
│   │   ├── ArchivesPage/        # Story archives
│   │   ├── GalleryPage/         # Photo gallery
│   │   ├── DonatePage/          # Donation information
│   │   ├── AboutPage/           # About information
│   │   └── admin/               # Admin panel pages
│   │       ├── AdminLoginPage/      # Admin authentication
│   │       ├── AdminHomePage/       # Admin dashboard
│   │       ├── AdminCategoryPage/   # Category management
│   │       ├── AdminMapEventPage/   # Map event management
│   │       └── AdminCandleTypePage/ # Candle type management
│   ├── services/                # API service modules
│   │   ├── apiClient.ts         # Axios configuration
│   │   ├── story.ts             # Story API calls
│   │   ├── category.ts          # Category API calls
│   │   ├── mapEvent.ts          # Map event API calls
│   │   ├── candleType.ts        # Candle type API calls
│   │   └── gallery.ts           # Gallery API calls
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   ├── index.css                # Global styles
│   ├── main.tsx                 # Application entry point
│   └── vite-env.d.ts           # Vite environment types
├── index.html                   # HTML template
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.node.json           # Node-specific TypeScript config
├── vite.config.ts               # Vite configuration
├── eslint.config.js             # ESLint configuration
└── package.json                 # Dependencies and scripts
```

### Key Features & Components

#### 1. Multi-Page Application Structure
- **Home Page**: Landing page with hero section and navigation
- **Garden Page**: Interactive memory garden with map visualization
- **Candles Page**: Virtual candle lighting interface
- **Archives Page**: Story browsing and search functionality
- **Gallery Page**: Photo gallery with grid layout
- **Donate Page**: Information about supporting the project
- **About Page**: Project information and contact details

#### 2. Admin Panel
Comprehensive administrative interface for content management:
- **Authentication System**: Password-based login with session persistence
- **Category Management**: CRUD operations for story categories
- **Map Event Management**: Interactive map event creation and editing
- **Candle Type Management**: Candle type configuration
- **Reusable Components**: Standardized form components and utilities

#### 3. Internationalization (i18n)
- **Multi-language Support**: English and Ukrainian translations
- **Automatic Language Detection**: Browser language detection
- **Dynamic Content**: All UI text is translatable
- **Namespace Organization**: Structured translation keys

#### 4. Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices
- **Tailwind CSS**: Utility-first responsive design
- **Flexible Layouts**: Adaptive grid and flexbox layouts
- **Touch-Friendly**: Optimized touch interactions

#### 5. Interactive Features
- **Animated Transitions**: Framer Motion animations
- **Scroll-Based Effects**: Intersection Observer for scroll animations
- **Toast Notifications**: User feedback for actions
- **Loading States**: Comprehensive loading indicators

### API Integration

The frontend communicates with the backend through a centralized API client:

```typescript
// API Client Configuration
const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Request Interceptor for Admin Authentication
apiClient.interceptors.request.use((config) => {
    const adminData = JSON.parse(localStorage.getItem("adminPassword") || "{}");
    if (adminData.password) {
        config.headers["x-admin-password"] = adminData.password;
    }
    return config;
});

// Response Interceptor for Error Handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle file upload errors
        if (error.response?.status === 400) {
            // Custom error handling for file uploads
        }
        return Promise.reject(error);
    }
);
```

### Build Process

**Development:**
```bash
npm run dev          # Start development server with HMR
```

**Production Build:**
```bash
npm run build        # TypeScript compilation + Vite build
npm run preview      # Preview production build
```

**Code Quality:**
```bash
npm run lint         # ESLint code analysis
```

The build process produces optimized assets:
- **Code Splitting**: Automatic code splitting for efficient loading
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Image and CSS optimization
- **Modern JavaScript**: ES2020+ output with fallbacks

---

## Database Schema & Relationships

### Entity Relationship Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Category   │    │    Story    │    │ CandleType  │
│             │◄──┐│             │┌──►│             │
│ - _id       │   ││ - _id       ││   │ - _id       │
│ - name      │   ││ - title     ││   │ - name      │
│ - description│   ││ - comment   ││   │ - description│
│ - color     │   ││ - name      ││   │ - imageUrl  │
│ - createdAt │   ││ - age       ││   │ - createdAt │
└─────────────┘   ││ - location  ││   └─────────────┘
                  ││ - dateOfBirth│
┌─────────────┐   ││ - dateOfDeath│
│  MapEvent   │   ││ - category  │ (FK)
│             │   ││ - candleType│ (FK, conditional)
│ - _id       │   ││ - media     │
│ - x         │   ││ - storyId   │
│ - y         │   ││ - source    │
│ - category  │◄──┘│ - createdAt │
│ - title     │    └─────────────┘
│ - miniatureImage
│ - zIndex    │
│ - createdAt │
└─────────────┘
```

### Data Relationships

1. **Story → Category**: Many-to-One relationship
   - Each story belongs to exactly one category
   - Categories can have multiple stories

2. **Story → CandleType**: Many-to-One relationship (conditional)
   - Required only when story source is 'candle'
   - CandleTypes can be used by multiple stories

3. **MapEvent → Category**: Many-to-One relationship
   - Each map event is associated with one category
   - Categories can have multiple map events

### Data Flow

1. **Story Creation Flow**:
   ```
   User Input → Form Validation → File Upload (Cloudinary) → 
   Database Storage → Response → UI Update
   ```

2. **Admin Management Flow**:
   ```
   Admin Login → Authentication → CRUD Operations → 
   Database Update → Cache Invalidation → UI Refresh
   ```

---

## Deployment & Infrastructure

### Frontend Deployment (Vercel)

**Configuration (vercel.json):**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This configuration enables client-side routing by redirecting all requests to the index.html file.

**Build Settings:**
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: Configuration for API endpoints

### Backend Deployment

The backend can be deployed to various platforms:

**Recommended Platforms:**
- **Render**: For managed Node.js hosting
- **Railway**: For containerized deployment
- **DigitalOcean App Platform**: For scalable deployment
- **Heroku**: For quick deployment (with MongoDB Atlas)

**Docker Configuration (Recommended):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Database Hosting

**MongoDB Atlas (Recommended):**
- Fully managed MongoDB hosting
- Automatic scaling and backups
- Global cluster deployment
- Built-in security features

**Self-hosted Options:**
- MongoDB on VPS (DigitalOcean, Linode)
- Docker containerized MongoDB
- MongoDB Compass for database management

### Media Storage (Cloudinary)

**Configuration Requirements:**
- Cloud name
- API key and secret
- Upload presets for different media types
- Transformation settings for optimization

**Features Used:**
- Image optimization and resizing
- Video compression
- Audio file handling
- CDN delivery for fast loading

### Environment Configuration

**Production Environment Variables:**
```bash
# Server Configuration
PORT=3000
NODE_ENV=production

# Database
MONGODB_USER=production_user
MONGODB_PASSWORD=secure_password
MONGODB_URL=mongodb+srv://cluster.mongodb.net
MONGODB_DB=digital_memory_garden_prod

# Security
JWT_SECRET=production_jwt_secret
ADMIN_PASSWORD=secure_admin_password

# External Services
APP_DOMAIN=https://api.digitalmemorygarden.com
CLIENT_DOMAIN=https://digitalmemorygarden.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Development Setup & Workflows

### Prerequisites

**Required Software:**
- Node.js 18+ (with npm)
- MongoDB 6.0+ (local or Atlas)
- Git for version control
- Code editor (VS Code recommended)

**Recommended Tools:**
- MongoDB Compass for database management
- Postman for API testing
- Docker for containerization

### Local Development Setup

1. **Clone Repository:**
   ```bash
   git clone https://github.com/TimohaVysochynskyi/DigitalMemoryGarden.git
   cd DigitalMemoryGarden
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure environment variables
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Database Setup:**
   - Install MongoDB locally or use MongoDB Atlas
   - Create database and configure connection string
   - Run any initialization scripts if provided

### Development Workflow

**Code Quality Standards:**
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Conventional commits for commit messages

**Testing Strategy:**
- Manual testing for user interactions
- API testing with Postman or similar tools
- Cross-browser testing for frontend compatibility

**Version Control:**
- Feature branch workflow
- Pull request reviews
- Semantic versioning for releases

### Available Scripts

**Backend Scripts:**
```bash
npm run dev          # Development server with nodemon
npm start           # Production server
npm run lint        # ESLint code analysis
```

**Frontend Scripts:**
```bash
npm run dev         # Development server with HMR
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # ESLint code analysis
```

### Performance Considerations

**Frontend Optimization:**
- Lazy loading for page components
- Image optimization through Cloudinary
- Code splitting for reduced bundle size
- Caching strategies for API responses

**Backend Optimization:**
- MongoDB indexing for query performance
- Request validation to prevent malformed data
- Error handling to prevent crashes
- File upload limits to prevent abuse

**Security Best Practices:**
- Input validation and sanitization
- CORS configuration for API access
- Secure file upload handling
- Environment variable protection
- Regular dependency updates

---

## Key Features & Functionality

### 1. Memory Sharing Platform
- Multiple submission types: flowers, candles, archives, gallery
- Rich media support: photos, audio, video
- Structured story format with metadata
- Unique story identification system

### 2. Interactive Memory Garden
- Visual map interface for exploring memories
- Category-based filtering and organization
- Coordinate-based placement system
- Layered display with z-index management

### 3. Administrative Interface
- Secure admin authentication
- Content moderation capabilities
- Category and candle type management
- Map event creation and editing

### 4. Multilingual Support
- English and Ukrainian language support
- Automatic language detection
- Comprehensive translation coverage
- Cultural sensitivity considerations

### 5. Responsive Design
- Mobile-first approach
- Touch-optimized interactions
- Accessible design principles
- Cross-browser compatibility

---

## Technical Achievements

1. **Modern Architecture**: Utilizes latest web technologies and best practices
2. **Scalable Design**: Modular architecture supports future expansion
3. **Type Safety**: Comprehensive TypeScript implementation
4. **Performance**: Optimized build process and lazy loading
5. **Security**: Multiple layers of security implementation
6. **Accessibility**: Responsive and inclusive design
7. **Internationalization**: Multi-language support architecture
8. **Developer Experience**: Comprehensive tooling and documentation

---

## Future Enhancement Opportunities

### Technical Improvements
- GraphQL API implementation for better data fetching
- Real-time features with WebSocket integration
- Progressive Web App (PWA) capabilities
- Advanced caching strategies with Redis
- Automated testing suite implementation
- CI/CD pipeline setup

### Feature Enhancements
- Advanced search and filtering capabilities
- Social sharing integration
- Email notification system
- Advanced media editing tools
- Analytics and reporting dashboard
- API rate limiting and monitoring

### Performance Optimizations
- Database query optimization
- CDN implementation for static assets
- Service worker for offline functionality
- Image lazy loading and optimization
- Bundle size reduction strategies

---

This technical description provides a comprehensive overview of the Digital Memory Garden project, covering all aspects from architecture and implementation to deployment and development workflows. The platform represents a thoughtful approach to digital memorial services, combining modern web technologies with sensitive design considerations for its intended purpose.