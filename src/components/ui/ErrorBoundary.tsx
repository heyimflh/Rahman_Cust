"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { PartyCard } from "./PartyCard";

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in section:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="py-8 px-4 w-full flex justify-center items-center text-center">
          <PartyCard className="p-6 max-w-sm w-full bg-[#FFE4EC] border-none shadow-none">
            <p className="text-[#C91F5A] font-medium">
              {this.props.fallbackMessage || "bagian kecil ini lagi malu-malu. kejutan lain masih nunggu di bawah."}
            </p>
          </PartyCard>
        </div>
      );
    }

    return this.props.children;
  }
}
