# Treasureland Elementary School - Modern Website

A modern, responsive website for Treasureland Elementary School built with HTML5, TailwindCSS, and vanilla JavaScript.

## Features

### 🎨 Modern Design
- Clean, professional interface with a green-and-gold palette
- Responsive design that works on all devices
- Smooth animations and transitions
- Modern UI components (cards, buttons, navigation)

### 📱 Mobile-First Approach
- Fully responsive layout
- Mobile-optimized navigation menu
- Touch-friendly interface elements
- Optimized performance for mobile devices

### 🖼️ Image Gallery
- Beautiful gallery showcasing school images
- Lightbox functionality for full-screen viewing
- Keyboard navigation support
- Smooth transitions and hover effects
- Dedicated albums for campus life and Inter-house Sports

### ⚡ Interactive Features
- Smooth scrolling navigation
- Sticky header with scroll effects
- Randomized homepage photo carousel with captions and pause controls
- Interactive gallery with lightbox
- Hover animations on cards
- Mobile menu toggle
- Form submission handling
- Notification system

### 🎯 Accessibility
- Semantic HTML5 structure
- Keyboard navigation support
- Screen reader friendly
- ARIA labels where appropriate
- Focus management

## Technologies Used

- **HTML5** - Semantic markup and structure
- **TailwindCSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Interactive features and animations
- **Font Awesome** - Icon library
- **Google Fonts (Inter)** - Typography

## File Structure

```
TES/
├── index.html
├── admissions.html
├── campus-life.html
├── ...                 # Other public pages stay at the root for simple static hosting
├── assets/
│   ├── css/            # Shared stylesheets
│   ├── js/             # Site scripts and homepage slideshow
│   └── images/
│       ├── brand/
│       ├── campus/     # Buildings, classrooms, and facilities
│       ├── gallery/    # Inter-house sports and prefects
│       └── staff/      # Teachers, school leaders, and administrators
├── tools/              # Standalone utilities
└── README.md
```

Open `index.html` to view the homepage. Local development can use any static web server; page URLs remain at the repository root.

## Sections

### 1. Navigation
- Fixed header with smooth scroll effects
- Dropdown menu for About section
- Mobile-responsive hamburger menu
- Call-to-action "Apply Now" button

### 2. Hero Section
- Eye-catching gradient background
- Compelling welcome message
- Call-to-action buttons for tours and information
- Featured school image with overlay badge

### 3. Our Roots
- School history and establishment information
- Three core value cards with icons
- Child-centered approach messaging
- Hover animations on cards

### 4. Photo Gallery
- Grid layout showcasing 6 school images
- Lightbox functionality for full-screen viewing
- Image captions and descriptions
- "View Full Gallery" call-to-action

### 5. Academics
- Colorful subject cards
- Core subjects, arts, sports, and technology
- Gradient backgrounds for visual appeal
- Hover animations

### 6. Contact Section
- Contact information with icons
- Social media links
- Admission inquiry buttons
- Registration form download options

### 7. Footer
- School branding
- Quick navigation links
- Program information
- Contact details
- Copyright information

## Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional for development)

### Setup
1. Clone or download the project files
2. Ensure all images (assets/images/campus/buildings/img1.jpeg - assets/images/campus/buildings/img6.jpeg) are in the root directory
3. Open `index.html` in a web browser
4. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Customization

#### Colors
The site uses a green-and-gold palette. To customize:
- Update the brand color variables and matching utility classes in the page styles
- Keep text and interactive states accessible against their backgrounds

#### Images
- Keep images in the appropriate subfolder under `assets/images/`
- Update references in the HTML or JavaScript when replacing or moving images
- Maintain aspect ratios for best results
- Optimize images for web (recommended: 1920x1080px max)

#### Content
- Edit text content directly in `index.html`
- Update contact information in the footer
- Modify navigation links as needed

#### Fonts
- Currently using Inter font from Google Fonts
- Change the font import in the `<head>` section
- Update font-family in the CSS

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Optimized for fast loading
- Lazy loading for images
- Efficient JavaScript animations
- Minimal external dependencies

## SEO Features

- Semantic HTML5 structure
- Proper heading hierarchy
- Meta tags for responsive design
- Alt text for all images
- Descriptive link text

## Security

- No external API calls
- No server-side processing required
- Safe for static hosting
- HTTPS ready

## Deployment

### Static Hosting
The website can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3

### Deployment Steps
1. Upload all files to your hosting provider
2. Ensure the images are included
3. Set the default document to `index.html`
4. Enable HTTPS if available

## Maintenance

### Regular Updates
- Update school information as needed
- Add new images to the gallery
- Refresh content periodically
- Check for broken links

### Adding New Pages
1. Create new HTML files following the same structure
2. Update navigation links
3. Maintain consistent styling
4. Add to mobile menu

## Support

For questions or support regarding this website:
- Email: hello@treasurelandschools.com
- Phone: +234 807 455 2156

## License

© 2024 Treasureland Elementary School. All rights reserved.

---

**Note**: This website is designed to be a modern replacement for the original Treasureland Elementary School website, incorporating all the original content with enhanced design, functionality, and user experience.
