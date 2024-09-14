"use client";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    walletAddress: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        alert("Registration successful!");
        console.log("Registration successful:", result);
      } else {
        alert("Registration failed!");
        console.error("Failed to register");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[85vw] max-w-sm p-4 bg-[#0e0f11]">
        <CardHeader>
          <CardTitle className="text-3xl text-white">Register</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label className="text-white" htmlFor="username">
                Username
              </Label>
              <Input
                required
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white" htmlFor="walletAddress">
                Wallet Address
              </Label>
              <Input
                required
                id="walletAddress"
                name="walletAddress"
                placeholder="Enter your wallet address"
                value={formData.walletAddress}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white" htmlFor="password">
                Password
              </Label>
              <Input
                required
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
