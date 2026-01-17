# Quick Setup Instructions

## To Run the Website

1. **Navigate to the website directory:**
   ```bash
   cd website
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Go to [http://localhost:3000](http://localhost:3000)

## All Routes Should Work

- `/` - Homepage ✅
- `/projects` - Projects list ✅
- `/projects/[slug]` - Individual projects ✅
- `/writing` - Blog posts ✅
- `/writing/[slug]` - Individual posts ✅
- `/about` - About page ✅
- `/now` - Now page ✅

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

If you get 404 errors:
1. Make sure you're in the `website/` directory
2. Run `npm install` to ensure all dependencies are installed
3. Clear the `.next` cache: `rm -rf .next` (or `Remove-Item -Recurse -Force .next` on Windows)
4. Restart the dev server
