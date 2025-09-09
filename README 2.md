# Kumbh Mela Guide App

A comprehensive digital guide for the Kumbh Mela festival, featuring real-time translation powered by Bhashini APIs, offline capabilities, and both user and admin interfaces.

## Features

### User Features
- **Live Map & Info**: Real-time crowd levels and weather updates
- **Event Management**: Browse events, join activities, AR/VR tours
- **Pilgrim Information**: Guidelines, facilities, and helpful resources
- **Eco Gamification**: Environmental challenges and point system
- **Lost & Found**: Report and search for lost items
- **Multi-language Support**: English/Hindi with Bhashini API translation
- **Offline Mode**: Cached content for offline access
- **Voice Search**: Web Speech API integration
- **Kiosk Mode**: Fullscreen interface for public terminals

### Admin Features
- **Dashboard**: KPI monitoring and analytics
- **Event Management**: Create, edit, and manage events
- **Lost & Found Management**: Handle reported items and tickets
- **Content Management**: Update information and alerts
- **Gamification Management**: Manage challenges and rewards

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **UI**: Tailwind CSS + shadcn/ui components
- **Translation**: Bhashini API integration
- **State Management**: SWR for data fetching and caching
- **Offline Support**: localStorage-based caching
- **Voice**: Web Speech API
- **Deployment**: Vercel

## Environment Variables

To enable Bhashini API translation, add these environment variables:

\`\`\`env
NEXT_PUBLIC_BHASHINI_API_KEY=your_bhashini_api_key
NEXT_PUBLIC_BHASHINI_USER_ID=your_bhashini_user_id
NEXT_PUBLIC_BHASHINI_BASE_URL=https://meity-auth.ulcacontrib.org
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Add environment variables for Bhashini API
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Bhashini API Integration

The app integrates with India's Bhashini APIs for real-time translation between English and Hindi. The integration includes:

- **Pipeline Search**: Find available translation models
- **Pipeline Config**: Get configuration for selected pipelines  
- **Pipeline Compute**: Perform actual translations

For production use, contact the Bhashini team for API keys and pricing plans.

## Usage

### User Flow
1. Start at Home with live map and alerts
2. Browse events and join activities
3. Access pilgrim information and guidelines
4. Participate in eco challenges for points
5. Report lost items or search found items
6. Switch languages and enable offline mode

### Admin Flow
1. Login to admin dashboard
2. Monitor KPIs and system status
3. Manage events and content
4. Handle lost & found tickets
5. Configure gamification challenges

## Offline Support

The app includes offline capabilities:
- Cache critical data locally
- Continue core functionality without internet
- Sync when connection is restored

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
