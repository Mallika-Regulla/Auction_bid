const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
// Home page (keep the same as before)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BidMaster - Premium Auction Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%);
                color: #ffffff;
                min-height: 100vh;
                overflow-x: hidden;
            }
            
            .glass-effect {
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
            }
            
            .glow-effect {
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            }
            
            .navbar {
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding: 1rem 2rem;
                position: fixed;
                width: 100%;
                top: 0;
                z-index: 1000;
            }
            
            .nav-container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .logo {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1.5rem;
                font-weight: 700;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .nav-links {
                display: flex;
                gap: 2rem;
            }
            
            .nav-link {
                color: #ffffff;
                text-decoration: none;
                font-weight: 500;
                padding: 0.5rem 1rem;
                border-radius: 10px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .nav-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                transition: left 0.5s;
            }
            
            .nav-link:hover::before {
                left: 100%;
            }
            
            .nav-link:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
            }
            
            .hero {
                padding: 120px 2rem 80px;
                text-align: center;
                background: radial-gradient(circle at top right, rgba(102, 126, 234, 0.1), transparent 400px),
                          radial-gradient(circle at bottom left, rgba(118, 75, 162, 0.1), transparent 400px);
            }
            
            .hero-content {
                max-width: 800px;
                margin: 0 auto;
            }
            
            .hero h1 {
                font-size: 4rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                line-height: 1.1;
            }
            
            .hero p {
                font-size: 1.3rem;
                color: #b0b0b0;
                margin-bottom: 3rem;
                line-height: 1.6;
            }
            
            .cta-button {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1.2rem 2.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 15px;
                font-weight: 600;
                font-size: 1.1rem;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
            }
            
            .cta-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
            }
            
            .features {
                padding: 80px 2rem;
                max-width: 1200px;
                margin: 0 auto;
            }
            
            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-top: 3rem;
            }
            
            .feature-card {
                padding: 2.5rem;
                text-align: center;
                transition: all 0.3s ease;
            }
            
            .feature-card:hover {
                transform: translateY(-10px);
                background: rgba(255, 255, 255, 0.08);
            }
            
            .feature-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
                display: block;
            }
            
            .feature-card h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: #ffffff;
            }
            
            .feature-card p {
                color: #b0b0b0;
                line-height: 1.6;
            }
            
            .floating-particles {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            }
            
            .particle {
                position: absolute;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                opacity: 0.1;
                animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
            
            @media (max-width: 768px) {
                .hero h1 { font-size: 2.5rem; }
                .nav-links { gap: 1rem; }
                .features-grid { grid-template-columns: 1fr; }
            }
        </style>
    </head>
    <body>
        <div class="floating-particles" id="particles"></div>
        
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo">
                    <span>🎯</span>
                    BidMaster
                </div>
                <div class="nav-links">
                    <a href="/" class="nav-link">Home</a>
                    <a href="/dashboard" class="nav-link">Dashboard</a>
                    <a href="/bidding" class="nav-link">Live Auction</a>
                </div>
            </div>
        </nav>

        <section class="hero">
            <div class="hero-content">
                <h1>Experience Premium<br>Real-Time Auctions</h1>
                <p>Join the ultimate bidding experience with intelligent AI competitors, real-time updates, and stunning visuals. Your next treasure awaits!</p>
                <a href="/bidding" class="cta-button">
                    🚀 Start Bidding Now
                </a>
            </div>
        </section>

        <section class="features">
            <div class="glass-effect glow-effect" style="padding: 3rem; text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Why Choose BidMaster?</h2>
                <p style="color: #b0b0b0; font-size: 1.2rem;">Premium features for the modern bidder</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card glass-effect glow-effect">
                    <span class="feature-icon">⚡</span>
                    <h3>Lightning Fast</h3>
                    <p>Real-time bidding with instant updates and seamless performance across all devices.</p>
                </div>
                
                <div class="feature-card glass-effect glow-effect">
                    <span class="feature-icon">🤖</span>
                    <h3>AI Competitors</h3>
                    <p>Challenge intelligent AI bidders that adapt to your strategy and provide real competition.</p>
                </div>
                
                <div class="feature-card glass-effect glow-effect">
                    <span class="feature-icon">📊</span>
                    <h3>Advanced Analytics</h3>
                    <p>Track your performance with detailed statistics and real-time dashboard updates.</p>
                </div>
            </div>
        </section>

        <script>
            // Create floating particles
            function createParticles() {
                const particlesContainer = document.getElementById('particles');
                const particleCount = 15;
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    
                    const size = Math.random() * 100 + 50;
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 3 + 3;
                    
                    particle.style.width = size + 'px';
                    particle.style.height = size + 'px';
                    particle.style.left = posX + '%';
                    particle.style.top = posY + '%';
                    particle.style.animationDelay = delay + 's';
                    particle.style.animationDuration = duration + 's';
                    
                    particlesContainer.appendChild(particle);
                }
            }
            
            document.addEventListener('DOMContentLoaded', createParticles);
        </script>
    </body>
    </html>
    `);
});

// Dashboard page (keep the same as before)
app.get('/dashboard', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - BidMaster</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%);
                color: #ffffff;
                min-height: 100vh;
                padding: 2rem;
            }
            
            .glass-effect {
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
            }
            
            .glow-effect {
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            }
            
            .container {
                max-width: 1400px;
                margin: 0 auto;
            }
            
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .logo {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1.8rem;
                font-weight: 700;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .nav-links {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .nav-link {
                color: #ffffff;
                text-decoration: none;
                padding: 0.8rem 1.5rem;
                border-radius: 12px;
                transition: all 0.3s ease;
                background: rgba(255, 255, 255, 0.05);
            }
            
            .nav-link:hover, .nav-link.active {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                transform: translateY(-2px);
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .stat-card {
                padding: 2rem;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .stat-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                transition: left 0.5s;
            }
            
            .stat-card:hover::before {
                left: 100%;
            }
            
            .stat-card:hover {
                transform: translateY(-5px);
                background: rgba(255, 255, 255, 0.08);
            }
            
            .stat-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                display: block;
            }
            
            .stat-number {
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .stat-label {
                color: #b0b0b0;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .action-section {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            @media (max-width: 1024px) {
                .action-section {
                    grid-template-columns: 1fr;
                }
            }
            
            .start-auction-btn {
                width: 100%;
                padding: 1.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 15px;
                font-size: 1.2rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            
            .start-auction-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
            }
            
            .activity-section {
                padding: 2rem;
            }
            
            .activity-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            
            .activity-title {
                font-size: 1.5rem;
                font-weight: 600;
            }
            
            .activity-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .activity-item {
                padding: 1.5rem;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.03);
                border-left: 4px solid #667eea;
                transition: all 0.3s ease;
            }
            
            .activity-item:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateX(5px);
            }
            
            .status-message {
                padding: 1rem;
                border-radius: 12px;
                margin-bottom: 1rem;
                text-align: center;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .floating-animation {
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            /* Scrollbar Styling */
            .activity-list::-webkit-scrollbar {
                width: 6px;
            }
            
            .activity-list::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 3px;
            }
            
            .activity-list::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 3px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <span>📊</span>
                    BidMaster Dashboard
                </div>
                <div class="nav-links">
                    <a href="/" class="nav-link">Home</a>
                    <a href="/dashboard" class="nav-link active">Dashboard</a>
                    <a href="/bidding" class="nav-link">Live Auction</a>
                </div>
            </div>

            <div id="statusMessage" class="status-message glass-effect">
                🔄 Dashboard is live and listening for auction events...
            </div>

            <div class="stats-grid">
                <div class="stat-card glass-effect glow-effect">
                    <span class="stat-icon">🎯</span>
                    <div class="stat-number" id="totalBids">0</div>
                    <div class="stat-label">Total Bids</div>
                </div>
                
                <div class="stat-card glass-effect glow-effect">
                    <span class="stat-icon">🏆</span>
                    <div class="stat-number" id="auctionsWon">0</div>
                    <div class="stat-label">Auctions Won</div>
                </div>
                
                <div class="stat-card glass-effect glow-effect">
                    <span class="stat-icon">💰</span>
                    <div class="stat-number" id="totalSpent">$0</div>
                    <div class="stat-label">Total Spent</div>
                </div>
                
                <div class="stat-card glass-effect glow-effect">
                    <span class="stat-icon">📈</span>
                    <div class="stat-number" id="winRate">0%</div>
                    <div class="stat-label">Win Rate</div>
                </div>
            </div>

            <div class="action-section">
                <button onclick="startAuction()" class="start-auction-btn glass-effect glow-effect floating-animation">
                    🚀 Start New Auction
                </button>
                
                <div class="activity-section glass-effect glow-effect">
                    <div class="activity-header">
                        <h2 class="activity-title">Recent Activity</h2>
                    </div>
                    <div class="activity-list" id="recentActivity">
                        <div class="activity-item">No recent activity. Start bidding to see your activity here!</div>
                    </div>
                </div>
            </div>
        </div>

        <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket = io();
            
            // Initialize user stats
            let userStats = {
                totalBids: 0,
                auctionsWon: 0,
                totalSpent: 0,
                recentActivity: []
            };

            // Update status message
            function updateStatus(message, isError = false) {
                const statusElement = document.getElementById('statusMessage');
                statusElement.textContent = message;
                statusElement.style.background = isError ? 
                    'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)' : 
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                statusElement.style.color = 'white';
                console.log('Dashboard Status:', message);
            }

            // Load stats from localStorage when page loads
            function loadStats() {
                const saved = localStorage.getItem('userStats');
                if (saved) {
                    userStats = JSON.parse(saved);
                    updateDashboard();
                    updateStatus('✅ Dashboard loaded with saved data');
                } else {
                    updateStatus('🆕 New dashboard session started');
                }
            }

            // Save stats to localStorage
            function saveStats() {
                localStorage.setItem('userStats', JSON.stringify(userStats));
                console.log('Stats saved:', userStats);
            }

            // Update dashboard display
            function updateDashboard() {
                document.getElementById('totalBids').textContent = userStats.totalBids;
                document.getElementById('auctionsWon').textContent = userStats.auctionsWon;
                document.getElementById('totalSpent').textContent = '$' + userStats.totalSpent;
                
                const winRate = userStats.totalBids > 0 ? 
                    Math.round((userStats.auctionsWon / userStats.totalBids) * 100) : 0;
                document.getElementById('winRate').textContent = winRate + '%';
                
                updateActivityList();
            }

            // Update activity list
            function updateActivityList() {
                const activityContainer = document.getElementById('recentActivity');
                if (userStats.recentActivity.length === 0) {
                    activityContainer.innerHTML = '<div class="activity-item">No recent activity. Start bidding to see your activity here!</div>';
                    return;
                }
                
                activityContainer.innerHTML = userStats.recentActivity
                    .map(function(activity) { 
                        return '<div class="activity-item">' + activity + '</div>'; 
                    })
                    .join('');
            }

            // Socket event listeners
            socket.on('connect', function() {
                console.log('Dashboard: Connected to server');
                updateStatus('✅ Connected to auction server - Listening for events...');
            });

            socket.on('disconnect', function() {
                console.log('Dashboard: Disconnected from server');
                updateStatus('❌ Disconnected from server', true);
            });

            // Listen for auction results
            socket.on('auctionEnded', function(data) {
                console.log('Dashboard: Received auctionEnded event:', data);
                updateStatus('🎉 Auction completed! Updating stats...');
                
                if (data.winner === 'You') {
                    userStats.auctionsWon++;
                    userStats.totalSpent += data.winningPrice;
                    userStats.recentActivity.unshift('🏆 Won "' + data.item.name + '" for $' + data.winningPrice);
                    updateStatus('🎊 You won the auction! $' + data.winningPrice);
                } else {
                    userStats.recentActivity.unshift('❌ Lost "' + data.item.name + '" - ' + data.winner + ' won for $' + data.winningPrice);
                    updateStatus('💸 ' + data.winner + ' won the auction for $' + data.winningPrice);
                }
                userStats.totalBids++;
                
                // Keep only last 10 activities
                if (userStats.recentActivity.length > 10) {
                    userStats.recentActivity = userStats.recentActivity.slice(0, 10);
                }
                
                saveStats();
                updateDashboard();
                
                // Auto-clear status after 3 seconds
                setTimeout(() => {
                    updateStatus('✅ Dashboard updated - Ready for next auction');
                }, 3000);
            });

            // Listen for bid updates to count user bids
            socket.on('bidUpdate', function(data) {
                console.log('Dashboard: Received bidUpdate event:', data);
                
                if (data.bidder === 'You') {
                    userStats.totalBids++;
                    saveStats();
                    updateDashboard();
                    updateStatus('💰 You placed a bid: $' + data.amount);
                    
                    // Auto-clear status after 2 seconds
                    setTimeout(() => {
                        updateStatus('✅ Dashboard updated - Ready for next bid');
                    }, 2000);
                }
            });

            // Listen for any other relevant events
            socket.on('auctionStarted', function(data) {
                console.log('Dashboard: Auction started', data);
                updateStatus('🚀 New auction started: ' + data.item.name);
                
                // Auto-clear status after 2 seconds
                setTimeout(() => {
                    updateStatus('✅ Dashboard ready - Waiting for bids...');
                }, 2000);
            });

            function startAuction() {
                window.location.href = '/bidding';
            }

            // Initialize dashboard when page loads
            document.addEventListener('DOMContentLoaded', function() {
                console.log('Dashboard: Page loaded, initializing...');
                loadStats();
                
                // Test connection
                socket.emit('dashboardReady', { message: 'Dashboard is ready to receive events' });
            });
        </script>
    </body>
    </html>
    `);
});

// Bidding page - UPDATED WITH MUSIC AND SOUND EFFECTS
app.get('/bidding', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Auction - BidMaster</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%);
                color: #ffffff;
                min-height: 100vh;
                padding: 2rem;
            }
            
            .glass-effect {
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
            }
            
            .glow-effect {
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            }
            
            .container {
                max-width: 1400px;
                margin: 0 auto;
            }
            
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .logo {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1.8rem;
                font-weight: 700;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .nav-links {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .nav-link {
                color: #ffffff;
                text-decoration: none;
                padding: 0.8rem 1.5rem;
                border-radius: 12px;
                transition: all 0.3s ease;
                background: rgba(255, 255, 255, 0.05);
            }
            
            .nav-link:hover, .nav-link.active {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                transform: translateY(-2px);
            }
            
            .auction-header {
                text-align: center;
                padding: 2rem;
                margin-bottom: 2rem;
                position: relative;
                overflow: hidden;
            }
            
            .auction-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent);
            }
            
            .timer {
                font-size: 3rem;
                font-weight: 700;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
            }
            
            .current-bid {
                font-size: 4rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: #4CAF50;
                text-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
            }
            
            .item-info {
                font-size: 1.3rem;
                color: #b0b0b0;
                margin-bottom: 1rem;
            }
            
            .auction-room {
                display: grid;
                grid-template-columns: 1fr 2fr 1fr;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            @media (max-width: 1024px) {
                .auction-room {
                    grid-template-columns: 1fr;
                }
            }
            
            .panel {
                padding: 2rem;
                min-height: 500px;
                transition: all 0.3s ease;
            }
            
            .panel:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateY(-5px);
            }
            
            .panel-title {
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .user-card {
                padding: 1rem;
                margin-bottom: 0.8rem;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.03);
                border-left: 3px solid #667eea;
                transition: all 0.3s ease;
            }
            
            .user-card:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateX(5px);
            }
            
            .item-display {
                text-align: center;
                font-size: 8rem;
                margin: 2rem 0;
                filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.3));
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            .item-name {
                font-size: 2rem;
                font-weight: 600;
                margin-bottom: 1rem;
                text-align: center;
            }
            
            .item-description {
                color: #b0b0b0;
                text-align: center;
                margin-bottom: 2rem;
                line-height: 1.6;
            }
            
            .bid-controls {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .bid-btn {
                padding: 1.2rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            
            .bid-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
            }
            
            .bid-btn.custom {
                background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
            }
            
            .bid-btn.custom:hover {
                box-shadow: 0 10px 25px rgba(255, 152, 0, 0.4);
            }
            
            .custom-bid {
                grid-column: span 2;
                display: flex;
                gap: 1rem;
            }
            
            .custom-bid-input {
                flex: 1;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                color: white;
                font-size: 1rem;
            }
            
            .custom-bid-input::placeholder {
                color: #b0b0b0;
            }
            
            .custom-bid-input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
            }
            
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                z-index: 1000;
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                padding: 3rem;
                border-radius: 20px;
                text-align: center;
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                max-width: 500px;
                width: 90%;
            }
            
            .winner-message {
                font-size: 1.5rem;
                margin-bottom: 2rem;
                line-height: 1.6;
            }
            
            .modal-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .close-modal, .next-auction-btn {
                padding: 1rem 2rem;
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .close-modal {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .close-modal:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }
            
            .next-auction-btn {
                background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
                color: white;
            }
            
            .next-auction-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(33, 150, 243, 0.4);
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            /* Music Controls */
            .music-controls {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                gap: 10px;
                z-index: 1000;
            }
            
            .music-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            }
            
            .music-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            }
            
            .music-btn.muted {
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
            }
        </style>
    </head>
    <body>
        <!-- Audio Elements -->
        <audio id="backgroundMusic" loop>
            <source src="/Background.mp3" type="audio/mpeg">
        </audio>
        
        <audio id="timerSound">
            <source src=".mp3" type="audio/mpeg">
        </audio>
        
        <audio id="bidSound">
            <source src="bid.mp3" type="audio/mpeg">
        </audio>
        
        <audio id="winSound">
            <source src="/win.mp3" type="audio/mpeg">
        </audio>
        
        <audio id="loseSound">
            <source src="lose.mp3" type="audio/mpeg">
        </audio>
        
        <audio id="countdownSound">
            <source src="/Timer.mp3" type="audio/mpeg">
        </audio>

        <div class="container">
            <div class="header">
                <div class="logo">
                    <span>🏷️</span>
                    Live Auction Room
                </div>
                <div class="nav-links">
                    <a href="/" class="nav-link">Home</a>
                    <a href="/dashboard" class="nav-link">Dashboard</a>
                    <a href="/bidding" class="nav-link active">Live Auction</a>
                </div>
            </div>

            <div class="auction-header glass-effect glow-effect">
                <div class="timer" id="timer">Time Left: 60s</div>
                <div class="current-bid pulse" id="currentBid">$100</div>
                <div class="item-info" id="itemInfo">Loading item...</div>
            </div>

            <div class="auction-room">
                <div class="panel glass-effect glow-effect">
                    <div class="panel-title">
                        <span>🤖</span>
                        AI Bidders
                    </div>
                    <div id="aiUsers">
                        <div class="user-card">AI_Bidder_1</div>
                        <div class="user-card">AI_Bidder_2</div>
                        <div class="user-card">AI_Bidder_3</div>
                        <div class="user-card">AI_Bidder_4</div>
                    </div>
                </div>

                <div class="panel glass-effect glow-effect">
                    <div class="item-display" id="itemDisplay">🔄</div>
                    <div class="item-name" id="itemName">Loading...</div>
                    <div class="item-description" id="itemDescription">Please wait for auction to start</div>
                    
                    <div class="bid-controls">
                        <button class="bid-btn" onclick="placeBid(10)">
                            <span>💰</span>
                            +$10
                        </button>
                        <button class="bid-btn" onclick="placeBid(50)">
                            <span>💰</span>
                            +$50
                        </button>
                        <button class="bid-btn" onclick="placeBid(100)">
                            <span>💰</span>
                            +$100
                        </button>
                        <div class="custom-bid">
                            <input type="number" id="customBid" class="custom-bid-input" placeholder="Enter custom amount">
                            <button class="bid-btn custom" onclick="placeCustomBid()">
                                <span>🎯</span>
                                Custom Bid
                            </button>
                        </div>
                    </div>
                </div>

                <div class="panel glass-effect glow-effect">
                    <div class="panel-title">
                        <span>📝</span>
                        Bid History
                    </div>
                    <div id="bidHistory">
                        <div class="user-card">Waiting for auction to start...</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Music Controls -->
        <div class="music-controls">
            <button class="music-btn" id="musicToggle" onclick="toggleMusic()">🎵</button>
            <button class="music-btn" id="soundToggle" onclick="toggleSound()">🔊</button>
        </div>

        <div id="resultModal" class="modal">
            <div class="modal-content">
                <div id="winnerMessage"></div>
                <div class="modal-buttons">
                    <button class="close-modal" onclick="closeModal()">Go to Dashboard</button>
                    <button class="next-auction-btn" onclick="startNextAuction()">Start Next Auction</button>
                </div>
            </div>
        </div>

        <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket = io();
            let currentBid = 100;
            let timeLeft = 60;
            let isAuctionActive = false;
            
            // Audio elements
            const backgroundMusic = document.getElementById('backgroundMusic');
            const timerSound = document.getElementById('timerSound');
            const bidSound = document.getElementById('bidSound');
            const winSound = document.getElementById('winSound');
            const loseSound = document.getElementById('loseSound');
            const countdownSound = document.getElementById('countdownSound');
            
            // Sound settings
            let musicEnabled = true;
            let soundEnabled = true;
            let countdownPlayed = false;

            const currentBidElement = document.getElementById('currentBid');
            const timerElement = document.getElementById('timer');
            const bidHistoryElement = document.getElementById('bidHistory');
            const resultModal = document.getElementById('resultModal');
            const winnerMessage = document.getElementById('winnerMessage');
            const itemDisplay = document.getElementById('itemDisplay');
            const itemName = document.getElementById('itemName');
            const itemDescription = document.getElementById('itemDescription');
            const itemInfo = document.getElementById('itemInfo');

            // Sound control functions
            function toggleMusic() {
                musicEnabled = !musicEnabled;
                const musicBtn = document.getElementById('musicToggle');
                
                if (musicEnabled) {
                    backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
                    musicBtn.textContent = '🎵';
                    musicBtn.classList.remove('muted');
                } else {
                    backgroundMusic.pause();
                    musicBtn.textContent = '🔇';
                    musicBtn.classList.add('muted');
                }
            }

            function toggleSound() {
                soundEnabled = !soundEnabled;
                const soundBtn = document.getElementById('soundToggle');
                
                if (soundEnabled) {
                    soundBtn.textContent = '🔊';
                    soundBtn.classList.remove('muted');
                } else {
                    soundBtn.textContent = '🔈';
                    soundBtn.classList.add('muted');
                }
            }

            function playSound(sound) {
                if (!soundEnabled) return;
                
                sound.currentTime = 0;
                sound.play().catch(e => console.log('Sound play failed:', e));
            }

            // Start background music when page loads
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(() => {
                    if (musicEnabled) {
                        backgroundMusic.volume = 0.3;
                        backgroundMusic.play().catch(e => console.log('Background music autoplay blocked:', e));
                    }
                }, 1000);
            });

            // Socket event listeners
            socket.on('connect', function() {
                console.log('Bidding: Connected to server');
            });

            socket.on('auctionState', function(state) {
                console.log('Bidding: Received auction state:', state);
                updateAuctionState(state);
            });

            socket.on('bidUpdate', function(data) {
                console.log('Bidding: Received bid update:', data);
                addBidToHistory(data);
                updateCurrentBid(data.amount);
                
                // Play bid sound for user bids
                if (data.bidder === 'You') {
                    playSound(bidSound);
                }
            });

            socket.on('timerUpdate', function(time) {
                updateTimer(time);
            });

            socket.on('auctionEnded', function(data) {
                console.log('Bidding: Auction ended:', data);
                showResultModal(data);
            });

            socket.on('auctionStarted', function(state) {
                console.log('Bidding: Auction started:', state);
                resetAuction(state);
                countdownPlayed = false;
                
                // Play timer sound when auction starts
                playSound(timerSound);
            });

            socket.on('itemChanged', function(itemData) {
                console.log('Bidding: Item changed:', itemData);
                updateAuctionItem(itemData);
            });

            function placeBid(increment) {
                if (!isAuctionActive) {
                    alert('Auction is not active! Please wait for the auction to start.');
                    return;
                }
                const newBid = currentBid + increment;
                console.log('Bidding: Placing bid:', newBid);
                socket.emit('placeBid', { amount: newBid });
            }

            function placeCustomBid() {
                const customAmount = parseInt(document.getElementById('customBid').value);
                if (customAmount && customAmount > currentBid) {
                    console.log('Bidding: Placing custom bid:', customAmount);
                    socket.emit('placeBid', { amount: customAmount });
                    document.getElementById('customBid').value = '';
                } else {
                    alert('Please enter a valid bid higher than current bid!');
                }
            }

            function updateCurrentBid(amount) {
                currentBid = amount;
                currentBidElement.textContent = '$' + amount;
                // Add pulse animation on bid update
                currentBidElement.classList.add('pulse');
                setTimeout(() => currentBidElement.classList.remove('pulse'), 1000);
            }

            function updateTimer(time) {
                timeLeft = time;
                timerElement.textContent = 'Time Left: ' + time + 's';
                
                // Play countdown sound for last 10 seconds
                if (time <= 10 && time > 0 && !countdownPlayed) {
                    playSound(countdownSound);
                    countdownPlayed = true;
                }
                
                if (time <= 10) {
                    timerElement.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
                    timerElement.style.webkitBackgroundClip = 'text';
                    timerElement.style.webkitTextFillColor = 'transparent';
                    timerElement.classList.add('pulse');
                } else {
                    timerElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    timerElement.style.webkitBackgroundClip = 'text';
                    timerElement.style.webkitTextFillColor = 'transparent';
                    timerElement.classList.remove('pulse');
                }
            }

            function addBidToHistory(bidData) {
                const bidElement = document.createElement('div');
                bidElement.className = 'user-card';
                bidElement.innerHTML = '<strong>' + bidData.bidder + '</strong> bid $' + bidData.amount +
                    (bidData.isAI ? ' <span style="color: #ff9800;">(AI)</span>' : '');
                bidHistoryElement.prepend(bidElement);
            }

            function updateAuctionState(state) {
                isAuctionActive = state.isActive;
                updateCurrentBid(state.currentBid);
                updateTimer(state.timeLeft);
                
                // Update item info
                if (state.item) {
                    updateAuctionItem(state.item);
                }
            }

            function updateAuctionItem(itemData) {
                console.log('Bidding: Updating item display with:', itemData);
                itemDisplay.textContent = itemData.emoji || '🎁';
                itemName.textContent = itemData.name || 'Mystery Item';
                itemDescription.textContent = itemData.description || 'An amazing item up for auction!';
                itemInfo.textContent = (itemData.name || 'Mystery Item') + ' - ' + (itemData.description || 'An amazing item');
            }

            function resetAuction(state) {
                isAuctionActive = state.isActive;
                currentBid = state.currentBid;
                timeLeft = state.timeLeft;
                
                currentBidElement.textContent = '$' + currentBid;
                timerElement.textContent = 'Time Left: ' + timeLeft + 's';
                bidHistoryElement.innerHTML = '<div class="user-card">System started at $' + currentBid + '</div>';
                
                if (state.item) {
                    updateAuctionItem(state.item);
                }
            }

            function showResultModal(data) {
                isAuctionActive = false;
                winnerMessage.innerHTML = '<h2 style="font-size: 2.5rem; margin-bottom: 1rem; background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🎉 Auction Finished!</h2>' +
                    '<p style="font-size: 1.2rem; margin-bottom: 1rem;"><strong>Item:</strong> ' + (data.item?.name || 'Unknown Item') + '</p>' +
                    '<p style="font-size: 1.2rem; margin-bottom: 1rem;"><strong>Winner:</strong> ' + data.winner + '</p>' +
                    '<p style="font-size: 1.2rem; margin-bottom: 2rem;"><strong>Winning Price:</strong> $' + data.winningPrice + '</p>';
                resultModal.style.display = 'block';
                
                // Play win/lose sound
                if (data.winner === 'You') {
                    playSound(winSound);
                } else {
                    playSound(loseSound);
                }
                
                // Stop background music when auction ends
                backgroundMusic.pause();
            }

            function closeModal() {
                resultModal.style.display = 'none';
                window.location.href = '/dashboard';
            }

            function startNextAuction() {
                resultModal.style.display = 'none';
                socket.emit('startNextAuction');
                
                // Restart background music for new auction
                if (musicEnabled) {
                    backgroundMusic.currentTime = 0;
                    backgroundMusic.play().catch(e => console.log('Music play failed:', e));
                }
            }

            // Start first auction when page loads
            console.log('Bidding: Requesting auction start...');
            socket.emit('startAuction');
        </script>
    </body>
    </html>
    `);
});

// ... (Keep the same backend auction logic from previous version)

// Auction items
const auctionItems = [
    {
        emoji: '🎨',
        name: 'Vintage Painting',
        description: 'Beautiful antique artwork from 19th century',
        startingBid: 100
    },
    {
        emoji: '⌚',
        name: 'Antique Watch',
        description: 'Rare vintage timepiece from 1920s',
        startingBid: 150
    },
    {
        emoji: '💎',
        name: 'Diamond Necklace',
        description: 'Exquisite jewelry with precious stones',
        startingBid: 200
    },
    {
        emoji: '🏺',
        name: 'Ancient Vase',
        description: 'Historical artifact from ancient civilization',
        startingBid: 120
    },
    {
        emoji: '📚',
        name: 'Rare Book Collection',
        description: 'First edition books from famous authors',
        startingBid: 180
    }
];

let auctionState = {
    isActive: false,
    currentBid: 100,
    currentBidder: null,
    timeLeft: 60,
    item: auctionItems[0],
    winner: null,
    winningPrice: 0,
    currentItemIndex: 0
};

const AI_USERS = ["AI_Bidder_1", "AI_Bidder_2", "AI_Bidder_3", "AI_Bidder_4"];

io.on('connection', function(socket) {
    console.log('User connected:', socket.id);

    // Send current auction state to newly connected client
    socket.emit('auctionState', auctionState);

    // Handle dashboard ready event
    socket.on('dashboardReady', function(data) {
        console.log('Dashboard is ready:', data.message);
        // Send current state to dashboard
        socket.emit('auctionState', auctionState);
    });

    socket.on('placeBid', function(data) {
        console.log('Received bid:', data);
        if (!auctionState.isActive) return;

        const newBid = data.amount;
        if (newBid > auctionState.currentBid) {
            auctionState.currentBid = newBid;
            auctionState.currentBidder = 'You';

            // Emit to ALL connected clients including dashboard
            io.emit('bidUpdate', {
                bidder: 'You',
                amount: newBid,
                isAI: false
            });

            // Simulate AI bidding
            setTimeout(function() {
                simulateAIBid();
            }, Math.random() * 2000 + 500);
        }
    });

    socket.on('startAuction', function() {
        console.log('Starting auction request received');
        if (!auctionState.isActive) {
            startNewAuction(0);
        }
    });

    socket.on('startNextAuction', function() {
        console.log('Starting next auction request received');
        startNewAuction();
    });
});

function startNewAuction(specificIndex = null) {
    // Move to next item or use specific index
    if (specificIndex !== null) {
        auctionState.currentItemIndex = specificIndex;
    } else {
        auctionState.currentItemIndex = (auctionState.currentItemIndex + 1) % auctionItems.length;
    }
    
    const nextItem = auctionItems[auctionState.currentItemIndex];
    console.log('Starting new auction with item:', nextItem);
    
    auctionState.isActive = true;
    auctionState.currentBid = nextItem.startingBid;
    auctionState.currentBidder = null;
    auctionState.timeLeft = 60;
    auctionState.winner = null;
    auctionState.winningPrice = 0;
    auctionState.item = nextItem;

    // Emit to ALL connected clients
    io.emit('itemChanged', nextItem);
    io.emit('auctionStarted', auctionState);
    startAuctionTimer();
}

function simulateAIBid() {
    if (!auctionState.isActive) {
        console.log('AI: Auction not active, skipping bid');
        return;
    }

    const aiBidder = AI_USERS[Math.floor(Math.random() * AI_USERS.length)];
    const bidIncrement = [10, 50, 100][Math.floor(Math.random() * 3)];
    const newBid = auctionState.currentBid + bidIncrement;

    if (Math.random() > 0.2) {
        console.log(`AI ${aiBidder} bidding $${newBid} (increment: $${bidIncrement})`);
        
        auctionState.currentBid = newBid;
        auctionState.currentBidder = aiBidder;

        // Emit to ALL connected clients including dashboard
        io.emit('bidUpdate', {
            bidder: aiBidder,
            amount: newBid,
            isAI: true
        });

        if (Math.random() > 0.5 && auctionState.timeLeft > 10) {
            setTimeout(function() {
                simulateAIBid();
            }, Math.random() * 1500 + 500);
        }
    } else {
        console.log(`AI ${aiBidder} decided not to bid`);
    }
}

function startAuctionTimer() {
    const timer = setInterval(function() {
        if (auctionState.isActive) {
            auctionState.timeLeft--;
            // Emit to ALL connected clients
            io.emit('timerUpdate', auctionState.timeLeft);

            if (Math.random() > 0.8 && auctionState.timeLeft > 10) {
                setTimeout(function() {
                    simulateAIBid();
                }, Math.random() * 1000);
            }

            if (auctionState.timeLeft <= 0) {
                auctionState.isActive = false;
                clearInterval(timer);
                
                auctionState.winner = auctionState.currentBidder || 'No one';
                auctionState.winningPrice = auctionState.currentBid;

                console.log('Auction ended. Winner:', auctionState.winner, 'Price:', auctionState.winningPrice);
                
                // Emit to ALL connected clients including dashboard
                io.emit('auctionEnded', {
                    winner: auctionState.winner,
                    winningPrice: auctionState.winningPrice,
                    item: auctionState.item
                });
            }
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    console.log('🚀 Premium Auction Platform with Audio running on http://localhost:' + PORT);
    console.log('📁 Available pages:');
    console.log('   Home: http://localhost:' + PORT + '/');
    console.log('   Dashboard: http://localhost:' + PORT + '/dashboard');
    console.log('   Bidding: http://localhost:' + PORT + '/bidding');
});