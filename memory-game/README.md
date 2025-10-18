# 🧠 Enhanced Memory Game

A modern, feature-rich memory game built with React and Vite. Test your memory skills with beautiful animations, sound effects, and multiple difficulty levels!

## ✨ Features

### 🎮 **Core Gameplay**
- **Card Matching**: Classic memory game with beautiful animations
- **Timer System**: Track your completion time with best time records
- **Score System**: Earn points based on speed and accuracy
- **Difficulty Levels**: Easy (4×4) and Hard (6×6) modes

### 🎨 **Visual & Audio**
- **Sound Effects**: Flip, match, and win sounds using Web Audio API
- **Confetti Animation**: Celebratory particles on game completion
- **Modern UI**: Glassmorphism design with cool color gradients
- **Smooth Animations**: Card flips, hover effects, and transitions

### 📱 **Responsive Design**
- **No Scrolling**: Perfect fit on any screen size
- **Touch Friendly**: Optimized for mobile and tablet devices
- **Adaptive Layout**: Cards and controls adjust to screen size
- **Cross-Platform**: Works on desktop, tablet, and mobile

### 🎯 **Enhanced UX**
- **Theme Support**: Light and dark mode toggle
- **Progress Tracking**: Real-time stats display
- **Best Time Records**: Persistent storage of personal bests
- **Visual Feedback**: Clear match/mismatch indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd memory-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## 🛠️ Building for Production

```bash
# Clean build
npm run build:prod

# Or standard build
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎮 How to Play

1. **Select Difficulty**: Choose between Easy (4×4) or Hard (6×6) mode
2. **Flip Cards**: Click cards to reveal their images
3. **Match Pairs**: Find matching card pairs to score points
4. **Beat Records**: Try to complete the game in the fastest time
5. **Enjoy**: Watch confetti celebration when you win!

## 🎨 Customization

### Colors
The game uses CSS custom properties for easy theming:
- `--bg-gradient`: Background gradient
- `--accent-color`: Primary accent color
- `--success-color`: Match success color
- `--warning-color`: Warning/record color
- `--error-color`: Mismatch color

### Sounds
Sound effects are generated using Web Audio API and can be easily customized in the `playSound()` function.

## 📁 Project Structure

```
memory-game/
├── src/
│   ├── components/
│   │   ├── MemoryGame.jsx    # Main game component
│   │   └── Card.jsx          # Individual card component
│   ├── helper/
│   │   └── elements.js       # Game elements and logic
│   ├── App.jsx              # Main app component
│   ├── App.css              # Complete styling
│   └── main.jsx             # App entry point
├── public/assets/           # Game images
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
└── CHANGELOG.md            # Detailed change log
```

## 🛠️ Technologies Used

- **React 19**: Modern React with latest features
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with custom properties
- **Web Audio API**: Dynamic sound generation
- **LocalStorage**: Persistent best time storage
- **ES6+**: Modern JavaScript features

## 🌐 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📊 Performance

- **Bundle Size**: Optimized for fast loading
- **Animations**: Hardware-accelerated CSS animations
- **Memory**: Efficient state management
- **Responsive**: Adapts to any screen size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- React team for the amazing framework
- Vite for the lightning-fast build tool
- All contributors who helped improve this game

---

**Enjoy playing and testing your memory skills! 🧠✨**