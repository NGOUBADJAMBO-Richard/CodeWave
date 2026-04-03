// Speed Insights initialization
// Import from the installed npm package
import { injectSpeedInsights } from '../../node_modules/@vercel/speed-insights/dist/index.mjs';

// Initialize Speed Insights when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectSpeedInsights();
  });
} else {
  // DOM is already ready
  injectSpeedInsights();
}
