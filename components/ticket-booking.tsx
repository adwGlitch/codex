"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TicketBookingProps {
  hasRoute: boolean;
  price?: number;
}

export function TicketBooking({ hasRoute, price = 24.50 }: TicketBookingProps) {
  const [step, setStep] = useState<"details" | "processing" | "success">("details");

  if (!hasRoute) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 p-4 text-center">
        <p>Plan a route first to view ticketing options.</p>
      </div>
    );
  }

  const handleCheckout = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full gap-4 p-4 relative">
      <AnimatePresence mode="wait">
        {step === "details" && (
          <motion.div 
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="text-xl font-medium tracking-tight text-white">Purchase Ticket</h3>
              <p className="text-sm text-zinc-400 mt-1">Direct route, standard class.</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Base Fare</span>
                <span className="text-white">${(price * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Taxes & Fees</span>
                <span className="text-white">${(price * 0.1).toFixed(2)}</span>
              </div>
              <div className="h-px w-full bg-white/10 my-1"></div>
              <div className="flex justify-between items-center font-medium">
                <span className="text-white">Total</span>
                <span className="text-primary text-xl">${price.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-3 px-4 bg-primary text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            >
              Checkout with Wallet
            </button>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-48 gap-4"
          >
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            <p className="text-zinc-400 font-medium animate-pulse">Processing payment...</p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-6 py-8"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-2xl border border-green-500/30">
              ✓
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium text-white mb-2">Ticket Booked!</h3>
              <p className="text-sm text-zinc-400">Your ticket has been added to your wallet.</p>
            </div>
            
            <div className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl relative overflow-hidden bg-black/40">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full"></div>
              <p className="text-xs text-zinc-500 mb-1">Ticket ID</p>
              <p className="font-mono text-zinc-300">FR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            
            <button 
              onClick={() => setStep("details")}
              className="text-sm text-primary hover:underline mt-2"
            >
              Book another ticket
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
