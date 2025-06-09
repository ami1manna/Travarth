"use client"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export default function ChatbotButton() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your EcoTravelAI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI typing
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = {
        hello: "Hi there! How can I assist with your sustainable travel plans today?",
        help: "I can help you with planning eco-friendly trips, finding sustainable accommodations, calculating your carbon footprint, or connecting with local communities. What would you like to know more about?",
        eco: "Eco-friendly travel involves minimizing your environmental impact while traveling. This includes choosing sustainable transportation, staying in eco-certified accommodations, respecting local cultures, and supporting local businesses.",
        carbon:
          "You can offset your carbon footprint by contributing to verified carbon offset projects. Would you like me to recommend some reliable carbon offset programs?",
        local:
          "Supporting local communities is a key aspect of sustainable travel. You can do this by staying in locally-owned accommodations, hiring local guides, eating at local restaurants, and purchasing souvenirs directly from artisans.",
      }

      // Default response if no keywords match
      let responseText =
        "I'm here to help with all your sustainable travel needs. Feel free to ask about eco-friendly accommodations, local experiences, or how to reduce your travel footprint."

      // Check for keywords in the user's message
      const lowercaseInput = input.toLowerCase()
      for (const [keyword, response] of Object.entries(aiResponses)) {
        if (lowercaseInput.includes(keyword)) {
          responseText = response
          break
        }
      }

      const aiMessage = { role: "assistant", content: responseText }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-20 h-12 w-12 rounded-full shadow-lg bg-primary border-0 text-primary-foreground"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Open chatbot</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 rounded-full p-1">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <SheetTitle>EcoTravel Assistant</SheetTitle>
            </div>
            <SheetClose className="rounded-full p-1 hover:bg-muted">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <SheetDescription>Ask me anything about sustainable travel</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Send
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
