# Firebase Auth Dashboard

A web application with Firebase authentication and dashboard functionality.

## Features

- User authentication (signup/login)
- Admin and user dashboards
- Product management
- Firebase Firestore integration
- Responsive design with Tailwind CSS

## Deployment to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your project:
```bash
vercel
```

4. Follow the prompts to configure your deployment.

### Method 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up or login to your account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the configuration and deploy

### Method 3: Using GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub account to Vercel
3. Import the repository
4. Vercel will automatically deploy on every push

## Project Structure

```
Project/
├── src/
│   ├── app.js (Firebase configuration and logic)
│   ├── signup.html (Signup page)
│   ├── input.css (Tailwind input)
│   └── output.css (Compiled CSS)
├── Other Files/
│   ├── login.html (Login page)
│   ├── dashboard.html (Admin dashboard)
│   └── userDashboard.html (User dashboard)
├── vercel.json (Vercel configuration)
├── package.json (Dependencies and scripts)
└── tailwind.config.js (Tailwind configuration)
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Build Tailwind CSS:
```bash
npm run build
```

3. Start development server:
```bash
npm run dev
```

## Environment Variables

Make sure your Firebase configuration is properly set up in `src/app.js`.

## Troubleshooting

If deployment fails:

1. Check that all files are committed to your repository
2. Ensure `vercel.json` is in the root directory
3. Verify that all HTML files have correct paths
4. Check the Vercel deployment logs for specific errors

## Support

For deployment issues, check the Vercel documentation or contact Vercel support.
