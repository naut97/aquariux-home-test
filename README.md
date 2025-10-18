# TTMD — React Native TMDB Client

A React Native application for browsing and managing movies from The Movie Database (TMDB): discover, search, view details, and manage your personal watchlist.

IMPORTANT: Configure your environment before running the app.
- You must input your ACCESS_TOKEN in the .env file.


## Features
- Discover movies by category (Now Playing, Popular, Upcoming)
- Sort and filter results
- Search with infinite scroll
- Movie details and posters
- Manage personal Watchlist (add/remove)
- Localization-ready (i18n)


## Tech Stack
- React Native 0.82, React 19
- TypeScript
- Redux Toolkit + redux-persist
- Axios for API calls
- react-native-dotenv for environment variables
- i18next for localization


## Prerequisites
- Node.js >= 20
- Yarn (recommended)
- Xcode (for iOS) or Android Studio + Android SDK (for Android)
- CocoaPods (for iOS): gem install cocoapods


## Environment Variables
The app reads environment variables via react-native-dotenv and configures Axios with a bearer token for TMDB requests.

Create a .env file in the project root (already present in this repo). Then set values as follows:

ACCESS_TOKEN=YOUR_TMDB_V4_READ_ACCESS_TOKEN

BASE_URL=https://api.themoviedb.org/

API_VERSION=3

Notes:
- ACCESS_TOKEN is the TMDB v4 API Read Access Token (not the v3 API key). You can create or find it in your TMDB account settings: Settings > API > API Read Access Token (v4 auth).
- The app attaches this token to the Authorization header: Authorization: Bearer <ACCESS_TOKEN>.
- BASE_URL and API_VERSION default to the TMDB API root and v3 routes (e.g., https://api.themoviedb.org/3). Keep them unless you know what you are doing.


## Installation
1) Install dependencies
- yarn install

2) iOS only — install pods
- cd ios && pod install && cd ..

3) Set up your environment file
- Open .env and input your ACCESS_TOKEN


## Run the App
Start the Metro bundler (optional, scripts will start it if needed):
- yarn start

Run on Android (emulator/device):
- yarn android

Run on iOS (simulator):
- yarn ios

If you change the .env file, stop Metro and rebuild the native app so new env values are picked up.


## Testing
- yarn test


## Project Structure (high level)
- src/apis: Axios instance and API endpoints
- src/hooks: Reusable hooks (e.g., account detail, infinite fetch)
- src/screens: App screens and feature-specific hooks
- src/assets/locales: i18n translation resources
- src/stores: Redux slices and store setup

Key files
- src/apis/axiosInstance.ts — configures Axios base URL and Authorization header from .env (BASE_URL, ACCESS_TOKEN)
- src/apis/endpoints.ts — TMDB endpoints mapping
- src/hooks/useAccountDetail.ts — account and watchlist actions
- src/screens/Home/hooks/useSearchMovies.ts — discover/search movies with sorting and pagination


## Troubleshooting
- No results / 401 Unauthorized: Ensure ACCESS_TOKEN is correctly set in .env and is a valid TMDB v4 Read Access Token.
- Network error alert: Check internet connectivity or TMDB API availability.
- iOS build issues: Run pod install in ios directory and ensure Xcode command line tools are installed.
- Android build issues: Ensure ANDROID_HOME/SDK is set and the emulator or device is connected.


## Licensing and Credits
- This project uses the TMDB API but is not endorsed or certified by TMDB.
- Movie data and images are provided by TMDB.
