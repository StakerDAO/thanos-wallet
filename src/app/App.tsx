import * as React from "react";
import * as Woozie from "lib/woozie";
import { ThanosProvider } from "lib/thanos/front";
import { AppEnvProvider } from "app/env";
import DisableOutlinesForClick from "app/a11y/DisableOutlinesForClick";
import AwaitI18N from "app/a11y/AwaitI18N";
import AwaitFonts from "app/a11y/AwaitFonts";
import BootAnimation from "app/a11y/BootAnimation";
import RootSuspenseFallback from "app/a11y/RootSuspenseFallback";
import ErrorBoundary from "app/ErrorBoundary";
import PageRouter from "app/PageRouter";
import ConfirmPage from "app/ConfirmPage";

type AppProps = {
  env: React.ComponentProps<typeof AppEnvProvider>;
};

const App: React.FC<AppProps> = ({ env }) => (
  <ErrorBoundary whileMessage="booting a wallet" className="min-h-screen">
    <React.Suspense fallback={<RootSuspenseFallback />}>
      <AppProvider env={env}>
        <DisableOutlinesForClick />

        <AwaitI18N />

        <AwaitFonts
          name="Inter"
          weights={[300, 400, 500, 600]}
          className="antialiased font-inter"
        >
          <BootAnimation>
            {env.confirmWindow ? <ConfirmPage /> : <PageRouter />}
          </BootAnimation>
        </AwaitFonts>
      </AppProvider>
    </React.Suspense>
  </ErrorBoundary>
);

export default App;

const AppProvider: React.FC<AppProps> = ({ children, env }) => (
  <AppEnvProvider {...env}>
    <Woozie.Provider>
      <ThanosProvider>{children}</ThanosProvider>
    </Woozie.Provider>
  </AppEnvProvider>
);
