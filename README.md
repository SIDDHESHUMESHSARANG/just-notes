# Just Notes

<p align="left">
<br/>
<a href="https://git.io/typing-svg"><img align="center" src="https://readme-typing-svg.herokuapp.com?font=Poppins&duration=500&pause=1000&width=450&size=35&color='fff'&lines=Aspire;+Inspire;+Transpire;+With+Just+Notes.;" alt="Typing SVG" /></a> 
</p>

<div align="left">
    <img 
        src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" 
        alt="react" 
    />
    <img 
        src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" 
        alt="tailwind" 
    />
    <img 
        src="https://img.shields.io/badge/daisyUI-1ad1a5?style=for-the-badge&logo=daisyui&logoColor=white" 
        alt="daisyui" 
    />
    <img 
        src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" 
        alt="reactrouter" 
    /> <br/>
    <img 
        src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" 
        alt="express" 
    />
    <img 
        src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" 
        alt="nodejs" 
    />
    <img 
        src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" 
        alt="mongodb" 
    />
    <img 
        src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" 
        alt="cloudinary"
    />
</div> <br/><br/>

A full-stack MERN (MongoDB, Express, React, Node.js) application built as a semester project for SYCS Sem 4. The app allows users to publish, browse and manage academic notes, with features such as search, filtering by subject/semester

## Project Structure

```text
just-notes/
├── backend/                    # Express API server (written in JS)
│   ├── package.json            # backend dependencies & scripts
│   ├── .env.example            # sample environment variables
│   ├── src/                    # source code
│   │   ├── server.js           # entry point, Express app setup
│   │   ├── config/             # configuration helpers
│   │   │   ├── cloudinary.js   # Cloudinary client setup
│   │   │   └── multer.js       # multer storage middleware
│   │   ├── controllers/        # request handlers
│   │   │   └── notesController.js
│   │   ├── db/                 # MongoDB connection logic
│   │   │   └── db.js
│   │   ├── routes/             # Express routers
│   │   │   └── notesRoutes.js
│   │   ├── schemas/            # Mongoose models
│   │   │   └── noteSchema.js
│   │   └── utils/              # shared utility functions
│   │       └── utils.js
│   └── ...                     # other root‑level config files (.gitignore, etc.)

├── frontend/                   # React user interface (Vite + TailwindCSS)
│   ├── package.json
│   ├── public/                 # static assets (html, images)
│   ├── src/
│   │   ├── assets/             # images / icons
│   │   ├── components/         # reusable UI components (Navbar, modal, cards)
│   │   ├── pages/              # view-level components (HomePage, CreatePage, etc.)
│   │   ├── utils/              # helper functions (axios instance, formatters)
│   │   ├── App.jsx             # root component and router setup
│   │   └── main.jsx            # React entrypoint
│   ├── eslint.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.cjs
│   └── vite.config.js
└── README.md                   # this documentation
```

## Features

- **Create, read, update, delete** notes with thumbnail and PDF upload
- Notes are stored in MongoDB via Mongoose schema
- Frontend uses React, TailwindCSS and DaisyUI v4.12.24 for responsive UI
- Search and filter by title / subject / semester / time range
- Grouping/count statistics endpoints for analytics pages
- Unpublished notes management page
- Issue reporting form that sends email via EmailJS
- Downloadable notes with cloud storage (Cloudinary)

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd just-notes/backend
   ```
2. Install dependencies:
   ```bash
   npm install or npm i
   ```
3. Copy `.env.example` to `.env` and configure your keys:
   ```env
   PORT=3000
   MONGO_URI=<your-mongo-connection-string>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

The server exposes endpoints under `/api/v1/notes` (see `routes/notesRoutes.js` for more reference).

## Frontend Setup

1. Change to frontend directory:
   ```bash
   cd just-notes/frontend
   ```
2. Install dependencies:
   ```bash
   npm install or npm i
   ```
3. Copy `.env.example` to `.env` and configure your keys
   ```env
   VITE_BACKEND_URL=http://localhost:3000/api/v1/notes
   VITE_EMAILJS_SERVICE_ID=<your-emailjs-service-id>
   VITE_EMAILJS_TEMPLATE_ID=<your-emailjs-template-id>
   VITE_EMAILJS_PUBLIC_KEY=<your-emailjs-public-id>
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

The frontend uses Vite; navigate to `http://localhost:5173` by default.

## Important Notes

- Axios instance in `src/utils/axios.js` points to `VITE_BACKEND_URL`.
- Modals (`ConfirmModal`) are reused for confirmations and reporting issues.
- Issue reports trigger EmailJS; configure service/template IDs accordingly.
- All user-generated content is stored in MongoDB; handle credentials securely.

## Testing & Debugging

- Use Postman or curl to exercise backend endpoints.
- Frontend routes are defined in `App.jsx` using React Router.
- Check console logs in both client and server for errors.
- In Backend, the server is constantly logging all API requests for monitoring reasons

## Deployment

Ensure environment variables are set in production (MongoDB URI, Cloudinary keys, EmailJS keys). Build frontend with `npm run build` and serve static files or deploy using platforms like Render/Netlify/Vercel/Firebase.

## Contribution

This project was created as an academic assignment, but feel free to fork and extend. Please keep licensing and attribution in mind.

&copy; SIDDHESHUMESHSARANG

---

_Last updated: March 2, 2026_
