import { useMemo } from "react";

// routes
import Router from "../src/routes/index";
// theme
import ThemeProvider from "../src/theme";
// hooks
import { useScrollToTop } from "../src/hooks/use-scroll-to-top";
// components
import ProgressBar from "../src/components/progress-bar";
import { MotionLazy } from "../src/components/animate/motion-lazy";
import SnackbarProvider from "../src/components/snackbar/snackbar-provider";
import { SettingsProvider, SettingsDrawer } from "../src/components/settings";

// auth
import { AuthProvider, AuthConsumer } from "../src/auth/context/jwt";
import { QueryClient, QueryClientProvider } from "react-query";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          suspense: true,
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocalizationProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: "light", // 'light' | 'dark'
              themeDirection: "ltr", //  'rtl' | 'ltr'
              themeContrast: "default", // 'default' | 'bold'
              themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  <SettingsDrawer />
                  <ProgressBar />
                  <AuthConsumer>
                    <Router />
                  </AuthConsumer>
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
