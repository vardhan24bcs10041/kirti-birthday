# GitHub Pages Deployment Guide

## Step-by-Step Instructions

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `kirti-birthday` (or any name you like)
   - **Description**: "Interactive birthday website for Kirti"
   - **Visibility**: Choose **Public** (required for free GitHub Pages) or **Private** (if you have GitHub Pro)
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

### Step 2: Initialize Git and Push Your Code

Open your terminal/PowerShell in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Kirti's birthday website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important**: Replace `YOUR_USERNAME` with your GitHub username and `REPO_NAME` with the repository name you created.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Scroll down to **"Pages"** (left sidebar)
4. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **"Save"**

### Step 4: Wait for Deployment

- GitHub will build your site (takes 1-2 minutes)
- You'll see a green checkmark when it's ready
- Your site URL will be: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Step 5: Share the Link! 🎉

Your site is now live! Share the GitHub Pages URL with Kirti.

---

## Updating the Site

To make changes and update the live site:

```bash
# Make your changes to files
# Then:

git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will automatically rebuild (takes 1-2 minutes).

---

## Troubleshooting

### Site not loading?
- Check that the repository is **Public** (or you have GitHub Pro for private repos)
- Wait 2-3 minutes after enabling Pages
- Check the "Actions" tab for any build errors

### Files not showing?
- Make sure `index.html` is in the root folder
- Check that all file paths are relative (not absolute)
- Clear browser cache (Ctrl+Shift+R)

### Custom Domain (Optional)
If you want a custom domain like `kirti-birthday.com`:
1. Buy a domain
2. In GitHub Pages settings, add your custom domain
3. Follow GitHub's DNS configuration guide

---

## Quick Commands Reference

```bash
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "Your update message"
git push
```

---

That's it! Your site should be live in a few minutes. 🚀

