import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocomotiveScroll from "@/components/LocomotiveScroll";
import HomePage from "@/pages/HomePage";
import MigrationPage from "@/pages/MigrationPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="text-center text-white">
        <h1 className="text-4xl font-nerko mb-4">404 — Page Not Found</h1>
        <a href="/" className="text-mumu-orange-6 underline font-nerko text-xl">Go Home</a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/migration" component={MigrationPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <LocomotiveScroll />
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
