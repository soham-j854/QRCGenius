# QRGenius Design Guidelines

## Design Approach
**Reference-Based**: Inspired by Canva meets Google's design language—intuitive, trustworthy, and delightful. Clean lines, ample whitespace, professional yet approachable aesthetic.

## Color Palette
- **Primary**: #4CAF50 (green) for CTAs and success states
- **Accent**: #2196F3 (blue) for interactive elements
- **Neutral Grays**: #333 for text, #2c3e50 for footer
- **Backgrounds**: Subtle gradient from #f0f4f8 to #ffffff for hero; white (#ffffff) for cards
- **Error States**: Red tones for validation messages
- **Dark Mode**: CSS variable-based system for toggle support

## Typography
- **Font Family**: Inter or Roboto via Google Fonts CDN
- **Base Size**: 16px body text with 1.5 line-height
- **Hierarchy**:
  - Hero Title: Bold, large sans-serif (48-56px desktop, 32-40px mobile)
  - Section Headers: Bold, 32-40px
  - Subtitles: Regular, 18-20px
  - Body: Regular, 16px
  - Button Text: Medium weight, 16-18px

## Layout System
**Tailwind Spacing Units**: Consistent use of `p-4`, `p-6`, `p-8`, `m-4`, `m-6`, `gap-4`, `gap-6` for spacing
- **Container**: Max-width 1200px, centered with padding
- **Card Elements**: Rounded corners (8-12px), subtle drop shadows (0 2px 8px rgba(0,0,0,0.1))
- **Responsive**: Mobile-first with Flexbox/Grid breakpoints at 768px (tablet), 1024px (desktop)

## Component Library

### Navigation Header
- **Style**: Fixed, slim top bar with white background
- **Logo**: "QRGenius" in modern font with stylized QR icon (SVG from Heroicons or Feather Icons)
- **Menu**: Horizontal links with smooth hover transitions, right-aligned dark mode toggle
- **Height**: 64px desktop, 56px mobile

### Hero Section
- **Layout**: Full-width banner with centered content and right-aligned demo QR code
- **Background**: Gradient from #f0f4f8 to #ffffff
- **Content**: Large title, subtitle, prominent green CTA button (#4CAF50)
- **Demo QR**: Small scannable QR code (200px) linking to homepage for visual appeal

### Generator Form Card
- **Container**: White background, centered, 800px max-width, 16px rounded corners, subtle shadow
- **Input Field**: Large auto-resizing textarea with light gray border, focus state with blue accent
- **Customization Panel**: Collapsible accordion with smooth expand/collapse animation
- **Sliders**: Modern range inputs with green track fill
- **Color Pickers**: Native inputs with preview swatches
- **Generate Button**: Large, prominent green button with white text, subtle hover lift effect, loading spinner overlay

### Output Section
- **Preview Area**: Centered large canvas display (300-500px) with white background
- **Action Buttons**: Row of secondary buttons (outline style) for Copy, Download PNG/SVG/EPS
- **Download Icons**: Use Feather Icons (download, copy, share icons)
- **Share Options**: Icon buttons for Twitter, email, link copy

### History Sidebar/Drawer
- **Position**: Right sidebar on desktop, bottom drawer on mobile
- **Items**: Card-based list of 5 recent QR codes with thumbnails (80px)
- **Actions**: Small icon buttons for regenerate and delete

### Footer
- **Background**: Dark (#2c3e50) with white text
- **Layout**: Three-column grid on desktop, stacked on mobile
- **Sections**: "Why Free?" bullet points, Quick Links, Social Icons
- **Height**: Auto-fit content with generous padding (60px top/bottom)

### Modals/Overlays
- **Style**: Centered overlay with semi-transparent dark backdrop (rgba(0,0,0,0.5))
- **Content**: White card with close button, max-width 600px, rounded corners
- **FAQ Accordion**: Expandable items with subtle arrow indicators

## Animations
- **Transitions**: CSS ease-in-out 0.3s for all interactive elements
- **Loading States**: Skeleton screens with subtle shimmer effect for form/output
- **Button Hovers**: Slight scale (1.02) and shadow increase
- **Accordions**: Smooth height transitions with overflow hidden
- **Generate Action**: Spinner rotation animation on button

## Accessibility Features
- **ARIA Labels**: Comprehensive labeling for form inputs, buttons, and dynamic content
- **Keyboard Navigation**: Full tab order, focus indicators (2px solid blue outline)
- **High Contrast**: Support for high contrast mode with increased border weights
- **Screen Reader**: aria-live regions for generation status updates
- **Color Contrast**: Minimum 4.5:1 ratio for all text

## Icons & Graphics
- **Icon Library**: Feather Icons via CDN for consistent, minimal SVG icons
- **Usage**: Download, copy, share, settings, menu, close icons
- **Size**: 20-24px for inline icons, 48-64px for section headers
- **Demo QR Code**: Include in hero section (right side) as visual proof-of-concept

## Responsive Behavior
- **Mobile (<768px)**: Single column, stacked sections, drawer-based history
- **Tablet (768-1024px)**: Two-column grid for examples gallery, sidebar history
- **Desktop (>1024px)**: Full multi-column layouts, fixed sidebar, spacious padding

## Images
- **Hero Section**: No photographic hero image; use gradient background with demo QR code graphic
- **Examples Gallery**: Pre-generated QR code images (WiFi, vCard, Geo) as clickable cards
- **How It Works**: SVG infographic icons for steps 1-4 (minimal, line-style illustrations)