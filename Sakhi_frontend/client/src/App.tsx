import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import ChatWindow from "@/pages/ChatWindow";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import CreateAccount from "@/pages/CreateAccount";


function Router() {
  const isAuthenticated = true;
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-lavender-50 via-peach-50 to-blush-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-lavender-200 border-t-lavender-500" />
          <p className="text-lavender-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {/* Landing Page */}
      <Route path="/" component={Landing} />

      {/* Chat page */}
      <Route path="/chat" component={ChatWindow} />
      {/*login page*/}
      <Route path="/login" component={Login} />
      {/*create account*/}
      <Route path="/createAccount" component={CreateAccount} />
      {/* 404 */}
      <Route component={NotFound} />

    
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
