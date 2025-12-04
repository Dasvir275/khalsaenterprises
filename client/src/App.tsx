import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import OnlineServices from "@/pages/online-services";
import NotFound from "@/pages/not-found";
import HiTechBot from "@/components/hitech-bot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/online-services" component={OnlineServices} />
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
        <HiTechBot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
