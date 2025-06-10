#!/bin/bash

echo "🔮 Arcane Power Nexus - Quick Deployment Options"
echo "================================================"

echo "✨ Current Status:"
echo "   Local: http://localhost:8080"
echo "   Network: http://10.0.2.129:8080"
echo ""

echo "🚀 Quick Deploy Options:"
echo ""

echo "1️⃣  GitHub Pages (Static):"
echo "   npm run build"
echo "   # Upload dist/ folder to GitHub Pages"
echo ""

echo "2️⃣  Vercel (Instant):"
echo "   npx vercel --prod"
echo ""

echo "3️⃣  Netlify (Drag & Drop):"
echo "   npm run build"
echo "   # Drag dist/ folder to netlify.com/drop"
echo ""

echo "4️⃣  Railway (Full Stack):"
echo "   # Connect GitHub repo to railway.app"
echo ""

echo "5️⃣  Heroku (Traditional):"
echo "   git add ."
echo "   git commit -m 'Deploy to production'"
echo "   git push heroku main"
echo ""

echo "🎯 For immediate public access, run:"
echo "   npx vercel --prod"
echo ""
